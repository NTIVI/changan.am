"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contacts() {
  return (
    <section id="contacts" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-6">
            Ждем вас <br />в нашем дилерском центре
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
            Официальный дилер CHANGAN в Ереване. Приезжайте на тест-драйв, мы с радостью подберем идеальный автомобиль для вас.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-black dark:text-white mb-1">Адрес</h4>
                <p className="text-gray-600 dark:text-gray-400">г. Ереван, ул. Адмирала Исакова, 123</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-black dark:text-white mb-1">Телефон</h4>
                <p className="text-gray-600 dark:text-gray-400">+374 (10) 12-34-56</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-black dark:text-white mb-1">Режим работы</h4>
                <p className="text-gray-600 dark:text-gray-400">Ежедневно с 09:00 до 20:00</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Яндекс.Карта или Google Maps iFrame */}
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aexample&source=constructor&ll=44.5152%2C40.1811&z=13" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            className="absolute inset-0 grayscale dark:invert-[90%] dark:hue-rotate-180 dark:contrast-150 transition-all duration-700"
            title="Map"
          />
        </motion.div>
      </div>
    </section>
  );
}
