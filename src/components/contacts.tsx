"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function Contacts() {
  const { t } = useTranslation();

  return (
    <section id="contacts" className="py-28 bg-[#030303] text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Background highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-red-950/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column (Contacts detail list) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-12 text-left"
          >
            <div className="space-y-6">
              <span className="text-red-500 font-bold text-[10px] font-orbitron tracking-widest bg-red-950/20 border border-red-900/30 px-4 py-1.5 rounded-full inline-block uppercase">
                CHANGAN Armenia
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-syncopate uppercase leading-tight">
                {t("contacts.title")}
              </h2>
              <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
                {t("contacts.desc")}
              </p>
            </div>

            <div className="space-y-8">
              {/* Address card */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-orbitron uppercase tracking-wider">
                    {t("contacts.address")}
                  </h4>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">
                    {t("contacts.addressVal")}
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-red-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-orbitron uppercase tracking-wider">
                    {t("contacts.phone")}
                  </h4>
                  <a href="tel:+37410555555" className="text-neutral-450 hover:text-red-500 text-xs sm:text-sm font-light mt-1.5 block transition-colors duration-300">
                    +374 (10) 55-55-55
                  </a>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-red-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm font-orbitron uppercase tracking-wider">
                    {t("contacts.hours")}
                  </h4>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">
                    {t("contacts.hoursVal")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Premium interactive Yandex/Google Map Embed representation) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-[450px] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 shadow-2xl relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.4975841026543!2d44.4754546!3d40.1534433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406ab9fb06b2e3bf%3A0xe54e6027c4fb7e0d!2sAdmiral%20Isakov%20Ave%2C%20Yerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1715970000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full opacity-80 dark:opacity-60 dark:invert dark:grayscale group-hover:scale-[1.01] transition-all duration-700"
            />
            {/* Dark vignette border overlay */}
            <div className="absolute inset-0 pointer-events-none border border-neutral-900 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
