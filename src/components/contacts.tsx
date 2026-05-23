"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function Contacts() {
  const { t } = useTranslation();

  return (
    <section id="contacts" className="py-24 bg-gray-50 dark:bg-[#040405] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column (Contacts detail list) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 text-left"
          >
            <div className="space-y-4">
              <span className="text-red-655 dark:text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-4 py-1.5 rounded-full inline-block">
                CHANGAN Armenia
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter leading-none">
                {t("contacts.title")}
              </h2>
              <p className="text-gray-650 dark:text-gray-400 font-medium leading-relaxed max-w-lg text-sm">
                {t("contacts.desc")}
              </p>
            </div>

            <div className="space-y-6">
              {/* Address detail card */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black dark:text-white text-sm">
                    {t("contacts.address")}
                  </h4>
                  <p className="text-gray-550 dark:text-gray-400 text-sm font-medium mt-1">
                    {t("contacts.addressVal")}
                  </p>
                </div>
              </div>

              {/* Phone detail card */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black dark:text-white text-sm">
                    {t("contacts.phone")}
                  </h4>
                  <a href="tel:+37410555555" className="text-gray-550 dark:text-gray-400 text-sm font-medium mt-1 block hover:text-red-600 dark:hover:text-red-550 transition-colors">
                    +374 (10) 55-55-55
                  </a>
                </div>
              </div>

              {/* Hours detail card */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black dark:text-white text-sm">
                    {t("contacts.hours")}
                  </h4>
                  <p className="text-gray-550 dark:text-gray-400 text-sm font-medium mt-1">
                    {t("contacts.hoursVal")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Premium interactive Yandex/Google Map Embed representation) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-[450px] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-[#09090a] shadow-xl relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.4975841026543!2d44.4754546!3d40.1534433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406ab9fb06b2e3bf%3A0xe54e6027c4fb7e0d!2sAdmiral%20Isakov%20Ave%2C%20Yerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1715970000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full opacity-90 dark:opacity-75 dark:invert dark:grayscale transition-all duration-300"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
