"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, Edit2, LogOut, CheckCircle, 
  Clock, Shield, Car, Settings, Check, X, Loader2 
} from "lucide-react";

export default function ProfilePage() {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const router = useRouter();

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state with profile
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone);
    }
  }, [profile]);

  // Redirect if not logged in
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
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-500 font-medium">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  // Mock data for premium aesthetic look
  const mockOrders = [
    { id: "ORD-9281", carName: "CHANGAN UNI-K", color: "Синий металлик", status: "Подтвержден", date: "15 мая 2026", price: 38000000 },
    { id: "ORD-8711", carName: "CHANGAN UNI-T", color: "Космический серый", status: "В обработке", date: "18 мая 2026", price: 32000000 }
  ];

  const mockTestDrives = [
    { id: "TD-003", carName: "CHANGAN CS55 PLUS", date: "22 мая 2026", time: "14:30", status: "Ожидает" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080808] text-black dark:text-white pb-16">
      <Header />

      <div className="pt-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: User Card & Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl" />
              
              {/* Profile Avatar & Metadata */}
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-md relative group">
                  <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Edit2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-black mt-4 tracking-tight">{profile?.name}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mt-2">
                  <Shield className="w-3.5 h-3.5" />
                  {profile?.role === "admin" ? "Администратор" : "Клиент CHANGAN"}
                </div>
              </div>

              {/* Quick Details */}
              <div className="space-y-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
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
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Телефон</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{profile?.phone || "Не указан"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-black/30 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Дата регистрации</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
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
                    className="w-full h-12 rounded-xl text-sm font-semibold border-2 dark:border-gray-800 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Редактировать профиль
                  </Button>
                )}
                
                <Button 
                  onClick={handleSignOut} 
                  variant="ghost"
                  className="w-full h-12 rounded-xl text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти из аккаунта
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Edit Forms & Account Data */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Edit Profile Form (Animated) */}
            <AnimatePresence mode="popLayout">
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-[#111] border border-blue-200 dark:border-blue-900/30 rounded-3xl p-6 shadow-xl overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      Редактирование профиля
                    </h3>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-black text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Имя и Фамилия</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Номер телефона</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+374 (XX) XX-XX-XX"
                          className="w-full h-12 px-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-sm font-medium text-red-500 mt-2">{errorMsg}</p>
                    )}

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl h-11 px-6 font-semibold"
                      >
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        disabled={saveLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 font-semibold flex items-center gap-2"
                      >
                        {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        Сохранить изменения
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
                  className="bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium shadow-md"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  Профиль успешно обновлен! Изменения сохранены в базе данных.
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. My Orders Grid */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Car className="w-6 h-6 text-blue-600" />
                Мои заказы автомобилей
              </h3>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-5 border border-gray-100 dark:border-gray-800/80 hover:border-blue-200 dark:hover:border-blue-900/30 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 font-mono">{order.id}</span>
                        <span className="text-xs text-gray-500">• {order.date}</span>
                      </div>
                      <h4 className="text-lg font-bold">{order.carName}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Цвет: {order.color}</p>
                    </div>

                    <div className="flex md:flex-col justify-between items-end w-full md:w-auto mt-2 md:mt-0 gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-50 dark:border-gray-900">
                      <p className="font-bold text-blue-600 dark:text-blue-500 text-lg">
                        {order.price.toLocaleString("ru-RU")} ֏
                      </p>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        order.status === "Подтвержден" 
                          ? "bg-green-50 dark:bg-green-950/20 text-green-600" 
                          : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 animate-pulse"
                      }`}>
                        {order.status === "Подтвержден" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Registered Test Drives */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-black tracking-tight mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Записи на тест-драйв
              </h3>

              <div className="space-y-4">
                {mockTestDrives.map((drive) => (
                  <div 
                    key={drive.id}
                    className="p-5 border border-gray-100 dark:border-gray-800/80 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <h4 className="text-lg font-bold">{drive.carName}</h4>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {drive.date} в {drive.time}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
                      <Clock className="w-3.5 h-3.5" />
                      {drive.status} подтверждения дилером
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
