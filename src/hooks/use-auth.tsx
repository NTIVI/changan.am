"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, AuthError } from "@supabase/supabase-js";

interface Profile {
  name: string;
  phone: string;
  role: "client" | "admin";
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<{ error: AuthError | Error | null }>;
  updateProfile: (name: string, phone: string) => Promise<{ error: AuthError | Error | null }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfileFromUser = (usr: User | null): Profile | null => {
    if (!usr) return null;
    const metadata = usr.user_metadata || {};
    
    // Auto-detect admin based on email or existing metadata
    const isAdminEmail = usr.email?.toLowerCase().startsWith("admin@") || usr.email === "admin@changan.am";
    const role = metadata.role === "admin" || isAdminEmail ? "admin" : "client";

    return {
      name: metadata.name || "Уважаемый клиент",
      phone: metadata.phone || "",
      role: role as "client" | "admin",
    };
  };

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setProfile(getProfileFromUser(session?.user ?? null));
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setProfile(getProfileFromUser(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data?.user) {
        setUser(data.user);
        setProfile(getProfileFromUser(data.user));
      }
      return { error };
    } catch (err: unknown) {
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);
    try {
      // Determine if they should be admin
      const isAdminEmail = email.toLowerCase().startsWith("admin@") || email === "admin@changan.am";
      const role = isAdminEmail ? "admin" : "client";

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            role,
          },
        },
      });
      if (data?.user) {
        setUser(data.user);
        setProfile(getProfileFromUser(data.user));
      }
      return { error };
    } catch (err: unknown) {
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      return { error };
    } catch (err: unknown) {
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name: string, phone: string) => {
    if (!user) return { error: new Error("No authenticated user") };
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name,
          phone,
        },
      });
      if (data?.user) {
        setUser(data.user);
        setProfile(getProfileFromUser(data.user));
      }
      return { error };
    } catch (err: unknown) {
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = profile?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
