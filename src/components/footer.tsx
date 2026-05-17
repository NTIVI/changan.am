import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block text-white">
              CHANGAN
            </span>
          </Link>
          <p className="text-gray-400 max-w-sm mb-6">
            Официальный дилер CHANGAN в Армении. Премиальные автомобили, качественный сервис и выгодные условия покупки.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CHANGAN Armenia. Все права защищены.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-white">Модели</h4>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">UNI-K</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">UNI-T</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">CS55 PLUS</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">LAMORE</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-white">Покупателям</h4>
          <ul className="space-y-3 text-gray-400">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Тест-драйв</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Кредит и рассрочка</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Сервис</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Акции</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
