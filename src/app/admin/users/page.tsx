"use client";

import { useAuth } from "@/hooks/use-auth";
import { User, Shield, ShieldAlert, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  createdAt: string;
}

export default function AdminUsers() {
  const [usersList, setUsersList] = useState<AdminUser[]>([
    {
      id: "u-1",
      name: "Артур Варданян",
      email: "artur@mail.ru",
      phone: "+374 (91) 40-50-60",
      role: "client",
      createdAt: "2026-05-10T12:00:00Z"
    },
    {
      id: "u-2",
      name: "Елена Саргсян",
      email: "elena@sargsyan.am",
      phone: "+374 (77) 12-34-56",
      role: "client",
      createdAt: "2026-05-12T14:30:00Z"
    },
    {
      id: "u-3",
      name: "Давид Симонян",
      email: "david.simonyan@gmail.com",
      phone: "+374 (99) 88-77-66",
      role: "client",
      createdAt: "2026-05-15T09:15:00Z"
    },
    {
      id: "u-4",
      name: "Администратор CHANGAN",
      email: "admin@changan.am",
      phone: "+374 (10) 50-60-70",
      role: "admin",
      createdAt: "2026-05-01T08:00:00Z"
    }
  ]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
          Управление пользователями
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 font-medium">
          Просматривайте список зарегистрированных клиентов, управляйте ролями сотрудников и контролируйте доступ.
        </p>
      </div>

      {/* Users table */}
      <div className="bg-white dark:bg-[#09090a] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider bg-gray-50/50 dark:bg-black/15">
                <th className="px-6 py-4.5">Пользователь</th>
                <th className="px-6 py-4.5">Email</th>
                <th className="px-6 py-4.5">Телефон</th>
                <th className="px-6 py-4.5">Роль доступа</th>
                <th className="px-6 py-4.5">Дата регистрации</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-black/20 transition-colors">
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-500 font-black text-sm flex items-center justify-center shrink-0">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-extrabold text-black dark:text-white text-sm block">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="inline-flex items-center gap-1.5 text-gray-650 dark:text-gray-300 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{user.email}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="inline-flex items-center gap-1.5 text-gray-650 dark:text-gray-300 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{user.phone}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === "admin" 
                        ? "bg-red-50 dark:bg-red-950/20 text-red-600" 
                        : "bg-gray-100 dark:bg-gray-850 text-gray-600 dark:text-gray-350"
                    }`}>
                      {user.role === "admin" ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-red-550" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-450" />
                      )}
                      <span>{user.role === "admin" ? "Администратор" : "Клиент"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className="inline-flex items-center gap-1.5 text-gray-550 dark:text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {new Date(user.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
