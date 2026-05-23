"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, Edit2, LogOut, CheckCircle, 
  Clock, Shield, Car, Settings, Check, X, Loader2, Sparkles, CreditCard
} from "lucide-react";
import { useTranslation, translateText } from "@/lib/translations";

export default function ProfilePage() {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const { t, language } = useTranslation();
  const router = useRouter();

  // Zustand Store orders
  const globalOrders = useAppStore((state) => state.orders);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone || "");
    }
  }, [profile]);

  // Shield route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const { error } = await updateProfile(name, phone);
      if (error) {
        setErrorMsg(error.message || "Ошибка при обновлении профиля");
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setIsEditing(false);
      }
    } catch {
      setErrorMsg("Не удалось сохранить профиль.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className="text-gray-550 font-medium">{t("profile.loading")}</p>
        </div>
      </div>
    );
  }

  // Filter global orders belonging to this mock user email or default orders
  const clientOrders = globalOrders.filter(
    (o) => o.user_email === user.email || o.user_name === profile?.name
  );

  const activeLocale = language === "am" ? "hy-AM" : language === "en" ? "en-US" : "ru-RU";

  // Fallback default mock orders if database has no active checkouts yet
  const displayOrders = clientOrders.length > 0 ? clientOrders.map(o => {
    const carNameParts = o.car_name.split(" (");
    const carName = carNameParts[0];
    const colorRaw = carNameParts[1] ? carNameParts[1].replace(")", "") : "Выбранный окрас кузова";
    return {
      id: o.id,
      carName: carName,
      color: translateText(colorRaw, language),
      status: o.status === "completed" ? t("profile.statusConfirmed") : t("profile.statusProcessing"),
      createdAt: o.created_at,
      price: o.price,
      paymentMethod: o.payment_method
    };
  }) : [
    {
      id: "ORD-9281",
      carName: "Changan CS75 Plus (Premium)",
      color: translateText("Кристально Белый", language),
      status: t("profile.statusConfirmed"),
      createdAt: new Date().toISOString(),
      price: 13750000,
      paymentMethod: "credit"
    },
    {
      id: "ORD-8711",
      carName: "Changan UNI-T (Comfort)",
      color: translateText("Матовый черный", language),
      status: t("profile.statusProcessing"),
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      price: 11000000,
      paymentMethod: "cash"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050506] text-black dark:text-white flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User details card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-2xl" />
              
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-md relative group">
                  <User className="w-12 h-12 text-red-650 dark:text-red-500" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-black mt-4 tracking-tight text-black dark:text-white">
                  {profile?.name || "Покупатель CHANGAN"}
                </h2>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-500 text-xs font-bold uppercase tracking-wider mt-3">
                  <Shield className="w-3.5 h-3.5" />
                  {profile?.role === "admin" ? t("profile.roleAdmin") : t("profile.roleClient")}
                </div>
              </div>

              {/* Data list */}
              <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-black/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-black/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("contacts.phone")}</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{profile?.phone || "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-black/30 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("profile.labelRegistration")}</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleDateString(activeLocale, { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 mt-8">
                {!isEditing && (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline"
                    className="w-full h-11 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {t("profile.editBtn")}
                  </Button>
                )}
                
                <Button 
                  onClick={handleSignOut} 
                  variant="ghost"
                  className="w-full h-11 rounded-xl text-xs font-bold text-red-500 hover:text-red-650 hover:bg-red-55/10 dark:hover:bg-red-95/10 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t("profile.logoutBtn")}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Active Forms & Account Orders */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Editing Box */}
            <AnimatePresence mode="popLayout">
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-[#09090a] border border-red-200 dark:border-red-900/30 rounded-3xl p-6 shadow-xl overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black flex items-center gap-2">
                      <Settings className="w-5 h-5 text-red-500" />
                      {t("profile.editTitle")}
                    </h3>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-black text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t("profile.labelName")}</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t("profile.labelPhone")}</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+374 (XX) XX-XX-XX"
                          className="w-full h-11 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-bold text-red-500 mt-2">{errorMsg}</p>
                    )}

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-150 dark:border-gray-855 mt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl h-10 px-6 font-bold"
                      >
                        {t("profile.cancel")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={saveLoading}
                        className="bg-red-650 hover:bg-red-750 text-white rounded-xl h-10 px-6 font-bold flex items-center gap-2"
                      >
                        {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span>{t("profile.save")}</span>
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save success toast */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-md"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
                  <span>{t("profile.successMsg")}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Account Orders */}
            <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl text-left">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Car className="w-6 h-6 text-red-500" />
                {t("profile.titleCars")}
              </h3>

              <div className="space-y-4">
                {displayOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-5 border border-gray-150 dark:border-gray-850 hover:border-red-500/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-gray-400 font-mono">{order.id}</span>
                        <span className="text-[10px] text-gray-550 font-medium">
                          • {new Date(order.createdAt).toLocaleDateString(activeLocale, { day: "numeric", month: "long" })}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-black dark:text-white">{order.carName}</h4>
                      <p className="text-xs text-gray-550 mt-0.5">{t("profile.specColor")} {order.color}</p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end w-full md:w-auto mt-2 md:mt-0 gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-200 dark:border-gray-800">
                      <p className="font-extrabold text-red-655 dark:text-red-500 text-lg">
                        {order.price.toLocaleString()} AMD
                      </p>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === t("profile.statusConfirmed") 
                            ? "bg-green-50 dark:bg-green-950/20 text-green-600" 
                            : "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                        }`}>
                          {order.status === t("profile.statusConfirmed") ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{order.status}</span>
                        </span>
                        
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-850 text-gray-550 dark:text-gray-400 text-[10px] font-bold uppercase">
                          <CreditCard className="w-2.5 h-2.5" />
                          <span>{order.paymentMethod === "credit" ? t("profile.paymentCredit") : t("profile.paymentCash")}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test drives information section */}
            <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl text-left">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-red-500" />
                {t("profile.titleTestDrives")}
              </h3>

              <div className="p-6 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-center">
                <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="text-sm font-extrabold text-black dark:text-white mb-1">{t("profile.testDriveOpen")}</h4>
                <p className="text-xs text-gray-550 max-w-sm mx-auto mb-4 leading-relaxed">
                  {t("profile.testDriveDesc")}
                </p>
                <Link href="/cars">
                  <Button size="sm" className="h-9 px-5 rounded-xl bg-red-655 hover:bg-red-750 text-white font-bold text-xs">
                    {t("profile.selectModel")}
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
