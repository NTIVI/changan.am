import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block text-white">
              CHANGAN<span className="text-red-500 font-light font-sans">.AM</span>
            </span>
          </Link>
          <p className="text-gray-400 max-w-md mb-8 text-base leading-relaxed">
            Официальный дилер CHANGAN в Армении. Инновации, премиальный комфорт и безопасность, созданные для вашего идеального пути. Пройдите тест-драйв в Ереване прямо сейчас.
          </p>
          <p className="text-gray-550 text-sm">
            © {new Date().getFullYear()} CHANGAN Armenia. Все права защищены. Разработано с любовью к деталям.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white text-lg tracking-tight">Модельный ряд</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Changan CS75 Plus</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Changan UNI-T</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Changan UNI-V</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Changan Lamore</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Changan Hunter</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-lg tracking-tight">Покупателям</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Запись на тест-драйв</Link></li>
            <li><Link href="/cars" className="hover:text-red-500 transition-colors">Программа кредитования</Link></li>
            <li><Link href="/#contacts" className="hover:text-red-500 transition-colors">Наши контакты</Link></li>
            <li><Link href="/profile" className="hover:text-red-500 transition-colors">Личный кабинет</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
