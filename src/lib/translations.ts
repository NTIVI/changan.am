import { useState, useEffect } from "react";
import { useAppStore } from "./store";

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      models: "Модели",
      contacts: "Контакты",
      admin: "Панель",
      profile: "Профиль",
      login: "Войти",
      logout: "Выйти",
      adminPanel: "Админ-панель",
      loginCabinet: "Войти в личный кабинет",
      cabinet: "Личный кабинет"
    },
    hero: {
      tag: "Премиальный дилер в Ереване",
      title1: "CHANGAN",
      titleAccent: "Будущее",
      title2: "в Армении",
      desc: "Откройте новые грани динамики, премиального технологического комфорта и интеллектуальной безопасности с автомобилями CHANGAN.",
      btnModels: "Смотреть модели",
      btnTestDrive: "Запись на Тест-драйв",
      metric1Val: "5 лет",
      metric1Lbl: "Официальной гарантии",
      metric2Val: "0%",
      metric2Lbl: "Выгодный кредит",
      metric3Val: "24/7",
      metric3Lbl: "Сервисная поддержка",
      rotateHint: "Вращайте авто мышкой"
    },
    features: {
      tag: "Превосходство Технологий",
      title: "Преимущества CHANGAN",
      desc: "Инновационные решения в каждой детали. Мы разрабатываем интеллектуальные, надежные и эффектные автомобили для тех, кто не соглашается на компромиссы.",
      f1Title: "Высочайший Уровень Безопасности",
      f1Desc: "Максимальные 5 звезд в тестах C-NCAP. Автомобили укомплектованы усиленной стальной рамой и комплексом активного предотвращения столкновений.",
      f2Title: "Интеллектуальные Помощники",
      f2Desc: "Адаптивный круиз-контроль (ACC), автоматический парковщик (APA 5.0), круговой обзор 360° с 3D-режимом и ассистенты слепых зон.",
      f3Title: "Двигатели BlueCore",
      f3Desc: "Энергоэффективные турбодвигатели нового поколения обеспечивают ураганный разгон при рекордно низком расходе топлива.",
      f4Title: "Официальный Премиум Сервис",
      f4Desc: "Полноценная гарантия 5 лет или 150,000 км пробега в Армении, поддержка на дорогах 24/7 и оригинальные сертифицированные запчасти."
    },
    testimonials: {
      tag: "Отзывы Владельцев",
      title: "Слово Клиентам CHANGAN",
      desc: "Узнайте, почему автовладельцы в Армении выбирают инновационный модельный ряд CHANGAN для своих ежедневных поездок и путешествий.",
      t1Text: "Автомобиль превзошел все ожидания! Спортивный режим SUPER RACE дарит невероятные эмоции, а выдвижной спойлер привлекает взгляды всего Еревана. Очень доволен покупкой.",
      t1Author: "Артур Варданян",
      t1Owner: "Владелец Changan UNI-V",
      t1Date: "Апрель 2026",
      t2Text: "Прекрасный семейный внедорожник. Огромная панорамная крыша, невероятно просторный кожаный салон и очень мягкий ход. Обслуживание в салоне Исакова было на высшем уровне!",
      t2Author: "Елена Саргсян",
      t2Owner: "Владелец Changan CS75 Plus",
      t2Date: "Май 2026",
      t3Text: "Дизайн этой машины просто космический. Футуристичный салон, отличная динамика двигателя BlueCore и очень удобный автопарковщик. Расход по городу радует - около 7 литров.",
      t3Author: "Давид Симонян",
      t3Owner: "Владелец Changan UNI-T",
      t3Date: "Май 2026"
    },
    news: {
      tag: "Новости и События",
      title: "Быть в курсе событий",
      catalogLink: "Перейти в каталог моделей",
      readFull: "Читать полностью",
      n1Title: "Грандиозный запуск нового Changan UNI-V в Ереване",
      n1Desc: "Официальный представитель CHANGAN в Армении представил футуристичный седан UNI-V с выдвижным спойлером и пакетом SUPER RACE. Запишитесь на тест-драйв уже сегодня.",
      n1Date: "12 Мая, 2026",
      n1Cat: "Презентация",
      n2Title: "Специальные условия кредитования и трейд-ин в мае",
      n2Desc: "Совместно с ведущими банками Армении мы запускаем уникальную программу кредитования с процентной ставкой от 0% годовых и выгодой по трейд-ин до 1,000,000 AMD.",
      n2Date: "08 Мая, 2026",
      n2Cat: "Акции",
      n3Title: "CHANGAN вошел в ТОП-3 самых надежных брендов",
      n3Desc: "По результатам независимого исследования удовлетворенности клиентов и надежности двигателей BlueCore, бренд CHANGAN занял лидирующие позиции по оценкам экспертов.",
      n3Date: "28 Апреля, 2026",
      n3Cat: "Мировые новости"
    },
    contacts: {
      title: "Ждем вас в нашем дилерском центре",
      desc: "Официальный дилер CHANGAN в Ереване. Приезжайте на тест-драйв, мы с радостью подберем идеальный автомобиль для вас.",
      address: "Адрес",
      addressVal: "г. Ереван, ул. Адмирала Исакова, 123",
      phone: "Телефон",
      hours: "Режим работы",
      hoursVal: "Ежедневно с 09:00 до 20:00"
    },
    footer: {
      desc: "Официальный дилер CHANGAN в Армении. Инновации, премиальный комфорт и безопасность, созданные для вашего идеального пути. Пройдите тест-драйв в Ереване прямо сейчас.",
      copyright: "CHANGAN Armenia. Все права защищены. Разработано с любовью к деталям.",
      titleModels: "Модельный ряд",
      titleBuyers: "Покупателям",
      linkTestDrive: "Запись на тест-драйв",
      linkCredit: "Программа кредитования",
      linkContacts: "Наши контакты",
      linkCabinet: "Личный кабинет"
    },
    cars: {
      catalogTag: "Интерактивный Каталог CHANGAN",
      catalogTitle: "Модельный Ряд CHANGAN",
      catalogDesc: "Кликните на интересующий автомобиль, чтобы открыть интерактивное модальное окно. Рассматривайте 3D-модель, переключайте цвета кузова, открывайте двери и изучайте характеристики в реальном времени.",
      searchPlaceholder: "Поиск по названию модели (например, UNI-V)...",
      sortLabel: "Сортировка",
      sortNone: "Без сортировки",
      sortPriceAsc: "Сначала дешевле",
      sortPriceDesc: "Сначала дороже",
      sortPowerDesc: "Самые мощные",
      filterBodyType: "Тип кузова",
      filterDriveType: "Тип привода",
      filterMaxPrice: "Макс. цена",
      filterAll: "Все",
      detailsBtn: "Детали",
      toCartBtn: "В корзину",
      "3dViewBtn": "3D Обзор",
      fromPrice: "от",
      specPower: "Мощность",
      specAcceleration: "Разгон",
      specConsumption: "Расход"
    },
    modal: {
      releaseYear: "Выпуск",
      doors: "Двери",
      hood: "Капот",
      lights: "Фары",
      interior: "Салон",
      exterior: "Кузов",
      priceLabel: "Ориентировочная стоимость",
      trimLabel: "Комплектация",
      techSpecs: "Технические характеристики",
      specEngine: "Двигатель",
      specPower: "Мощность",
      specTransmission: "Трансмиссия",
      specDrive: "Привод",
      specAccel: "Разгон до 100 км/ч",
      specConsump: "Расход топлива",
      featuresLabel: "Особенности",
      addToCart: "Добавить в корзину",
      applyCredit: "Оформить в кредит"
    },
    cart: {
      backToCatalog: "Вернуться в каталог моделей",
      title: "Ваша корзина",
      successTitle: "Заказ успешно оформлен!",
      successDesc: "Ваш запрос передан официальному дилеру CHANGAN Armenia. Менеджер свяжется с вами по указанному в профиле номеру в течение 15 минут.",
      lastOrderNum: "Номер последнего заказа",
      toCabinet: "Перейти в личный кабинет",
      emptyTitle: "Корзина пуста",
      emptyDesc: "Вы еще не добавили ни одного автомобиля. Выберите модель из модельного ряда и нажмите кнопку «В корзину».",
      toCatalog: "Перейти в каталог",
      colorLabel: "Цвет:",
      clearCart: "Очистить корзину",
      yourOrder: "Ваш заказ",
      dealership: "CHANGAN Armenia Official Dealership",
      paymentMethod: "Способ оплаты",
      paymentCash: "Наличные",
      paymentCredit: "В кредит",
      carsCount: "Автомобили",
      delivery: "Доставка в Ереване",
      deliveryFree: "Бесплатно",
      total: "Итого",
      placeOrder: "Оформить заказ",
      gdprText: "Оформляя заказ, вы подтверждаете согласие на обработку персональных данных и передачу дилеру."
    },
    profile: {
      loading: "Загрузка профиля...",
      roleAdmin: "Администратор",
      roleClient: "Клиент CHANGAN",
      editBtn: "Редактировать профиль",
      logoutBtn: "Выйти из аккаунта",
      editTitle: "Редактирование данных профиля",
      cancel: "Отмена",
      save: "Сохранить",
      successMsg: "Профиль успешно обновлен! Изменения записаны в Supabase.",
      titleCars: "Мои автомобили CHANGAN",
      specColor: "Цвет кузова:",
      statusConfirmed: "Подтвержден",
      statusProcessing: "В обработке",
      paymentCredit: "Кредит",
      paymentCash: "Наличные",
      titleTestDrives: "Планируемые тест-драйвы",
      testDriveOpen: "Запись на тест-драйв открыта",
      testDriveDesc: "Выберите модель в каталоге и откройте 3D-обзор, чтобы записаться на пробную поездку по улицам Еревана с персональным менеджером.",
      selectModel: "Выбрать модель",
      labelName: "ФИО Клиента",
      labelPhone: "Телефонный номер",
      labelRegistration: "Регистрация"
    }
  },
  en: {
    nav: {
      home: "Home",
      models: "Models",
      contacts: "Contacts",
      admin: "Panel",
      profile: "Profile",
      login: "Sign In",
      logout: "Sign Out",
      adminPanel: "Admin Panel",
      loginCabinet: "Log In to Cabinet",
      cabinet: "Personal Cabinet"
    },
    hero: {
      tag: "Premium Dealer in Yerevan",
      title1: "CHANGAN",
      titleAccent: "Future",
      title2: "in Armenia",
      desc: "Discover new dimensions of dynamics, premium technological comfort and intelligent safety with CHANGAN vehicles.",
      btnModels: "View Models",
      btnTestDrive: "Book a Test Drive",
      metric1Val: "5 years",
      metric1Lbl: "Official warranty",
      metric2Val: "0%",
      metric2Lbl: "Favorable credit",
      metric3Val: "24/7",
      metric3Lbl: "Service support",
      rotateHint: "Rotate vehicle with mouse"
    },
    features: {
      tag: "Technological Superiority",
      title: "Advantages of CHANGAN",
      desc: "Innovative solutions in every detail. We design intelligent, reliable and stunning vehicles for those who refuse to compromise.",
      f1Title: "Highest Level of Safety",
      f1Desc: "Maximum 5 stars in C-NCAP tests. The vehicles are equipped with a reinforced steel frame and a package of active collision prevention.",
      f2Title: "Intelligent Assistants",
      f2Desc: "Adaptive Cruise Control (ACC), Auto Parker (APA 5.0), 360° Surround View with 3D mode and blind-spot monitors.",
      f3Title: "BlueCore Engines",
      f3Desc: "New-generation energy-efficient turbo engines deliver exhilarating acceleration with record-low fuel consumption.",
      f4Title: "Official Premium Service",
      f4Desc: "Full warranty for 5 years or 150,000 km in Armenia, 24/7 roadside assistance and original certified spare parts."
    },
    testimonials: {
      tag: "Owners Reviews",
      title: "Customer feedback about CHANGAN",
      desc: "Find out why car owners in Armenia choose the innovative CHANGAN lineup for their daily commutes and trips.",
      t1Text: "The car exceeded all expectations! The SUPER RACE sport mode gives incredible emotions, and the retractable spoiler attracts the views of the whole of Yerevan. Extremely satisfied with the purchase.",
      t1Author: "Artur Vardanyan",
      t1Owner: "Owner of Changan UNI-V",
      t1Date: "April 2026",
      t2Text: "A wonderful family SUV. Huge panoramic roof, incredibly spacious leather interior and very smooth ride. Service in the Isakov salon was at the highest level!",
      t2Author: "Elena Sargsyan",
      t2Owner: "Owner of Changan CS75 Plus",
      t2Date: "May 2026",
      t3Text: "The design of this machine is just cosmic. Futuristic interior, excellent BlueCore engine dynamics and a very convenient auto-parker. City consumption is pleasing - about 7 liters.",
      t3Author: "David Simonyan",
      t3Owner: "Owner of Changan UNI-T",
      t3Date: "May 2026"
    },
    news: {
      tag: "News and Events",
      title: "Stay updated",
      catalogLink: "Go to models catalog",
      readFull: "Read full story",
      n1Title: "Grand Launch of the new Changan UNI-V in Yerevan",
      n1Desc: "Official representative of CHANGAN in Armenia presented the futuristic UNI-V sedan with a retractable spoiler and SUPER RACE package. Book your test drive today.",
      n1Date: "May 12, 2026",
      n1Cat: "Presentation",
      n2Title: "Special conditions for lending and trade-in in May",
      n2Desc: "Together with leading banks in Armenia, we are launching a unique loan program with an interest rate starting from 0% per annum and trade-in benefits up to 1,000,000 AMD.",
      n2Date: "May 08, 2026",
      n2Cat: "Promotions",
      n3Title: "CHANGAN entered the TOP 3 most reliable brands",
      n3Desc: "According to the results of an independent study of customer satisfaction and BlueCore engine reliability, the CHANGAN brand took leading positions in expert ratings.",
      n3Date: "April 28, 2026",
      n3Cat: "Global news"
    },
    contacts: {
      title: "We are waiting for you in our dealership",
      desc: "Official dealer of CHANGAN in Yerevan. Come for a test drive, we will gladly select the perfect car for you.",
      address: "Address",
      addressVal: "Yerevan, Admiral Isakov Ave. 123",
      phone: "Phone",
      hours: "Working hours",
      hoursVal: "Daily from 09:00 to 20:00"
    },
    footer: {
      desc: "Official dealer of CHANGAN in Armenia. Innovation, premium comfort and safety created for your perfect journey. Take a test drive in Yerevan right now.",
      copyright: "CHANGAN Armenia. All rights reserved. Designed with love for details.",
      titleModels: "Model lineup",
      titleBuyers: "For buyers",
      linkTestDrive: "Book a test drive",
      linkCredit: "Loan program",
      linkContacts: "Our contacts",
      linkCabinet: "Personal cabinet"
    },
    cars: {
      catalogTag: "CHANGAN Interactive Catalog",
      catalogTitle: "CHANGAN Model Lineup",
      catalogDesc: "Click on the car you are interested in to open an interactive modal window. View the 3D model, change body colors, open doors and explore characteristics in real-time.",
      searchPlaceholder: "Search by model name (e.g. UNI-V)...",
      sortLabel: "Sort",
      sortNone: "No sorting",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
      sortPowerDesc: "Most powerful",
      filterBodyType: "Body Type",
      filterDriveType: "Drive Type",
      filterMaxPrice: "Max Price",
      filterAll: "All",
      detailsBtn: "Details",
      toCartBtn: "Add to Cart",
      "3dViewBtn": "3D View",
      fromPrice: "from",
      specPower: "Power",
      specAcceleration: "Acceleration",
      specConsumption: "Consumption"
    },
    modal: {
      releaseYear: "Release",
      doors: "Doors",
      hood: "Hood",
      lights: "Lights",
      interior: "Interior",
      exterior: "Exterior",
      priceLabel: "Estimated cost",
      trimLabel: "Trim level",
      techSpecs: "Technical specifications",
      specEngine: "Engine",
      specPower: "Power",
      specTransmission: "Transmission",
      specDrive: "Drive",
      specAccel: "Acceleration 0-100 km/h",
      specConsump: "Fuel consumption",
      featuresLabel: "Features",
      addToCart: "Add to Cart",
      applyCredit: "Apply for Loan"
    },
    cart: {
      backToCatalog: "Return to models catalog",
      title: "Your Cart",
      successTitle: "Order placed successfully!",
      successDesc: "Your request has been forwarded to the official dealer of CHANGAN Armenia. A manager will contact you at the number specified in your profile within 15 minutes.",
      lastOrderNum: "Last order number",
      toCabinet: "Go to personal cabinet",
      emptyTitle: "Your cart is empty",
      emptyDesc: "You haven't added any vehicles yet. Choose a model from the catalog and press the «Add to Cart» button.",
      toCatalog: "Go to catalog",
      colorLabel: "Color:",
      clearCart: "Clear cart",
      yourOrder: "Your order",
      dealership: "CHANGAN Armenia Official Dealership",
      paymentMethod: "Payment method",
      paymentCash: "Cash",
      paymentCredit: "On credit",
      carsCount: "Vehicles",
      delivery: "Delivery in Yerevan",
      deliveryFree: "Free",
      total: "Total",
      placeOrder: "Checkout",
      gdprText: "By placing an order, you confirm your consent to the processing of personal data and transmission to the dealer."
    },
    profile: {
      loading: "Loading profile...",
      roleAdmin: "Administrator",
      roleClient: "CHANGAN Client",
      editBtn: "Edit Profile",
      logoutBtn: "Log Out",
      editTitle: "Edit Profile Details",
      cancel: "Cancel",
      save: "Save",
      successMsg: "Profile successfully updated! Changes saved to Supabase.",
      titleCars: "My CHANGAN vehicles",
      specColor: "Body color:",
      statusConfirmed: "Confirmed",
      statusProcessing: "Processing",
      paymentCredit: "Credit",
      paymentCash: "Cash",
      titleTestDrives: "Planned test drives",
      testDriveOpen: "Test drive booking is open",
      testDriveDesc: "Choose a model in the catalog and open the 3D view to sign up for a trial trip through the streets of Yerevan with a personal manager.",
      selectModel: "Select model",
      labelName: "Full Name",
      labelPhone: "Phone Number",
      labelRegistration: "Registration"
    }
  },
  am: {
    nav: {
      home: "Գլխավոր",
      models: "Մոդելներ",
      contacts: "Կոնտակտներ",
      admin: "Վահանակ",
      profile: "Անձնական էջ",
      login: "Մուտք",
      logout: "Ելք",
      adminPanel: "Ադմին վահանակ",
      loginCabinet: "Մուտք անձնական էջ",
      cabinet: "Անձնական էջ"
    },
    hero: {
      tag: "Պրեմիում դիլեր Երևանում",
      title1: "CHANGAN",
      titleAccent: "Ապագան",
      title2: "Հայաստանում",
      desc: "Բացահայտեք դինամիկայի, պրեմիում տեխնոլոգիական հարմարավետության և ինտելեկտուալ անվտանգության նոր սահմանները CHANGAN ավտոմեքենաների հետ:",
      btnModels: "Դիտել մոդելները",
      btnTestDrive: "Գրանցվել Թեստ-դրայվի",
      metric1Val: "5 տարի",
      metric1Lbl: "Պաշտոնական երաշխիք",
      metric2Val: "0%",
      metric2Lbl: "Շահավետ վարկ",
      metric3Val: "24/7",
      metric3Lbl: "Սպասարկման աջակցություն",
      rotateHint: "Պտտեք մեքենան մկնիկով"
    },
    features: {
      tag: "Տեխնոլոգիական Գերազանցություն",
      title: "CHANGAN-ի Առավելությունները",
      desc: "Ինովացիոն լուծումներ յուրաքանչյուր դետալում: Մենք ստեղծում ենք ինտելեկտուալ, հուսալի և տպավորիչ ավտոմեքենաներ նրանց համար, ովքեր չեն գնում փոխզիջումների:",
      f1Title: "Անվտանգության Բարձրագույն Մակարդակ",
      f1Desc: "Առավելագույն 5 աստղ C-NCAP թեստերում: Մեքենաները հագեցած են ուժեղացված պողպատե շրջանակով և բախման կանխարգելման ակտիվ համակարգով:",
      f2Title: "Ինտելեկտուալ Օգնականներ",
      f2Desc: "Ադապտիվ կրուիզ-կոնտրոլ (ACC), ավտոմատ կայանող (APA 5.0), 360° շրջանաձև տեսադաշտ 3D ռեժիմով և կույր գոտիների վերահսկում:",
      f3Title: "BlueCore Շարժիչներ",
      f3Desc: "Նոր սերնդի էներգաարդյունավետ տուրբոշարժիչները ապահովում են հզոր արագացում՝ վառելիքի ռեկորդային ցածր սպառմամբ:",
      f4Title: "Պաշտոնական Պրեմիում Սպասարկում",
      f4Desc: "Լիարժեք երաշխիք 5 տարի կամ 150,000 կմ վազք Հայաստանում, 24/7 աջակցություն ճանապարհներին և օրիգինալ սերտիֆիկացված պահեստամասեր:"
    },
    testimonials: {
      tag: "Սեփականատերերի Կարծիքները",
      title: "Հաճախորդների Խոսքը CHANGAN-ի Մասին",
      desc: "Իմացեք, թե ինչու են Հայաստանում ավտոսեփականատերերը ընտրում CHANGAN-ի նորարարական մոդելները իրենց ամենօրյա ուղևորությունների համար:",
      t1Text: "Մեքենան գերազանցեց բոլոր սպասելիքները: SUPER RACE սպորտային ռեժիմը տալիս է անհավանական զգացողություններ, իսկ դուրս եկող սպոյլերը գրավում է ողջ Երևանի հայացքները: Շատ գոհ եմ գնումից:",
      t1Author: "Արթուր Վարդանյան",
      t1Owner: "Changan UNI-V-ի սեփականատեր",
      t1Date: "Ապրիլ 2026",
      t2Text: "Հիանալի ընտանեկան ամենագնաց: Հսկայական պանորամային տանիք, անհավանական ընդարձակ կաշվե սրահ և շատ մեղմ ընթացք: Իսակովի սրահում սպասարկումը բարձր մակարդակի վրա էր:",
      t2Author: "Ելենա Սարգսյան",
      t2Owner: "Changan CS75 Plus-ի սեփականատեր",
      t2Date: "Մայիս 2026",
      t3Text: "Այս մեքենայի դիզայնը պարզապես տիեզերական է: Ֆուտուրիստական սրահ, BlueCore շարժիչի գերազանց դինամիկա և շատ հարմար ավտոկայանող համակարգ: Քաղաքային ծախսը հաճելի է՝ մոտ 7 լիտր:",
      t3Author: "Դավիթ Սիմոնյան",
      t3Owner: "Changan UNI-T-ի սեփականատեր",
      t3Date: "Մայիս 2026"
    },
    news: {
      tag: "Նորություններ և Իրադարձություններ",
      title: "Լինել իրադարձությունների կենտրոնում",
      catalogLink: "Անցնել մոդելների կատալոգին",
      readFull: "Կարդալ ամբողջությամբ",
      n1Title: "Նոր Changan UNI-V-ի շքեղ շնորհանդեսը Երևանում",
      n1Desc: "CHANGAN-ի պաշտոնական ներկայացուցիչը Հայաստանում ներկայացրեց ֆուտուրիստիկ UNI-V սեդանը՝ դուրս եկող սպոյլերով և SUPER RACE փաթեթով: Գրանցվեք թեստ-դրայվի այսօր:",
      n1Date: "12 Մայիսի, 2026",
      n1Cat: "Շնորհանդես",
      n2Title: "Վարկավորման և Trade-In-ի հատուկ պայմաններ մայիսին",
      n2Desc: "Հայաստանի առաջատար բանկերի հետ համատեղ մեկնարկում ենք վարկավորման բացառիկ ծրագիր՝ տարեկան սկսած 0% տոկոսադրույքով և մինչև 1,000,000 AMD trade-in օգուտով:",
      n2Date: "08 Մայիսի, 2026",
      n2Cat: "Ակցիաներ",
      n3Title: "CHANGAN-ը մտել է ամենահուսալի բրենդների TOP-3-ի մեջ",
      n3Desc: "Հաճախորդների բավարարվածության և BlueCore շարժիչների հուսալիության անկախ հետազոտության արդյունքներով, CHANGAN ապրանքանիշը զբաղեցրել է առաջատար դիրքեր փորձագետների գնահատականներով:",
      n3Date: "28 Ապրիլի, 2026",
      n3Cat: "Համաշխարհային նորություններ"
    },
    contacts: {
      title: "Սպասում ենք ձեզ մեր դիլերային կենտրոնում",
      desc: "CHANGAN-ի պաշտոնական դիլերը Երևանում: Եկեք թեստ-դրայվի, մենք սիրով կընտրենք ձեզ համար կատարյալ մեքենան:",
      address: "Հասցե",
      addressVal: "ք. Երևան, Ադմիրալ Իսակովի պողոտա, 123",
      phone: "Հեռախոս",
      hours: "Աշխատանքային ռեժիմ",
      hoursVal: "Ամեն օր 09:00-ից մինչև 20:00"
    },
    footer: {
      desc: "CHANGAN-ի պաշտոնական դիլերը Հայաստանում: Ինովացիաներ, պրեմիում հարմարավետություն և անվտանգություն՝ ստեղծված ձեր կատարյալ ճանապարհի համար: Անցեք թեստ-դրայվ Երևանում հենց հիմա:",
      copyright: "CHANGAN Armenia. Բոլոր իրավունքները պաշտպանված են: Ստեղծված է սիրով դետալների հանդեպ:",
      titleModels: "Մոդելային շարք",
      titleBuyers: "Գնորդներին",
      linkTestDrive: "Գրանցում թեստ-դրայվի",
      linkCredit: "Վարկավորման ծրագիր",
      linkContacts: "Մեր կոնտակտները",
      linkCabinet: "Անձնական էջ"
    },
    cars: {
      catalogTag: "CHANGAN Ինտերակտիվ Կատալոգ",
      catalogTitle: "CHANGAN Մոդելային Շարքը",
      catalogDesc: "Կտտացրեք ձեզ հետաքրքրող մեքենայի վրա՝ ինտերակտիվ մոդալ պատուհանը բացելու համար: Դիտեք 3D մոդելը, փոխեք թափքի գույները, բացեք դռները և ուսումնասիրեք բնութագրերը իրական ժամանակում:",
      searchPlaceholder: "Փնտրել ըստ մոդելի անվանման (օրինակ՝ UNI-V)...",
      sortLabel: "Տեսակավորում",
      sortNone: "Առանց տեսակավորման",
      sortPriceAsc: "Սկզբում էժանները",
      sortPriceDesc: "Սկզբում թանկերը",
      sortPowerDesc: "Ամենահզորները",
      filterBodyType: "Թափքի տեսակ",
      filterDriveType: "Լիաքարշակություն",
      filterMaxPrice: "Առավելագույն գին",
      filterAll: "Բոլորը",
      detailsBtn: "Մանրամասն",
      toCartBtn: "Զամբյուղ",
      "3dViewBtn": "3D Դիտում",
      fromPrice: "սկսած",
      specPower: "Հզորություն",
      specAcceleration: "Թափավազք",
      specConsumption: "Ծախս"
    },
    modal: {
      releaseYear: "Թողարկում",
      doors: "Դռներ",
      hood: "Կապոտ",
      lights: "Լապտերներ",
      interior: "Սրահ",
      exterior: "Թափք",
      priceLabel: "Մոտավոր արժեքը",
      trimLabel: "Համալրում",
      techSpecs: "Տեխնիկական բնութագրեր",
      specEngine: "Շարժիչ",
      specPower: "Հզորություն",
      specTransmission: "Փոխանցման տուփ",
      specDrive: "Քարշակում",
      specAccel: "Թափավազք 0-100 կմ/ժ",
      specConsump: "Վառելիքի ծախս",
      featuresLabel: "Առանձնահատկություններ",
      addToCart: "Ավելացնել զամբյուղ",
      applyCredit: "Ձևակերպել վարկով"
    },
    cart: {
      backToCatalog: "Վերադառնալ մոդելների կատալոգ",
      title: "Ձեր զամբյուղը",
      successTitle: "Պատվերը հաջողությամբ ձևակերպվեց:",
      successDesc: "Ձեր հարցումը փոխանցվել է CHANGAN Armenia-ի պաշտոնական դիլերին: Մասնագետը կապ կհաստատի ձեզ հետ անձնական էջում նշված հեռախոսահամարով 15 րոպեի ընթացքում:",
      lastOrderNum: "Վերջին պատվերի համարը",
      toCabinet: "Անցնել անձնական էջ",
      emptyTitle: "Զամբյուղը դատարկ է",
      emptyDesc: "Դուք դեռ ոչ մի մեքենա չեք ավելացրել: Ընտրեք մոդելը կատալոգից և սեղմեք «Զամբյուղ» կոճակը:",
      toCatalog: "Անցնել կատալոգին",
      colorLabel: "Գույն՝",
      clearCart: "Դատարկել զամբյուղը",
      yourOrder: "Ձեր պատվերը",
      dealership: "CHANGAN Armenia Official Dealership",
      paymentMethod: "Վճարման եղանակ",
      paymentCash: "Կանխիկ",
      paymentCredit: "Վարկով",
      carsCount: "Ավտոմեքենաներ",
      delivery: "Առաքումը Երևանում",
      deliveryFree: "Անվճար",
      total: "Ընդամենը",
      placeOrder: "Ձևակերպել պատվերը",
      gdprText: "Ձևակերպելով պատվերը՝ դուք հաստատում եք ձեր համաձայնությունը անձնական տվյալների մշակմանը և փոխանցմանը դիլերին:"
    },
    profile: {
      loading: "Բեռնվում է...",
      roleAdmin: "Ադմինիստրատոր",
      roleClient: "CHANGAN Հաճախորդ",
      editBtn: "Խմբագրել անձնական էջը",
      logoutBtn: "Դուրս գալ համակարգից",
      editTitle: "Անձնական տվյալների խմբագրում",
      cancel: "Չեղարկել",
      save: "Պահպանել",
      successMsg: "Անձնական էջը հաջողությամբ թարմացվեց: Փոփոխությունները գրանցվել են Supabase-ում:",
      titleCars: "Իմ CHANGAN ավտոմեքենաները",
      specColor: "Թափքի գույնը՝",
      statusConfirmed: "Հաստատված",
      statusProcessing: "Մշակման մեջ",
      paymentCredit: "Վարկ",
      paymentCash: "Կանխիկ",
      titleTestDrives: "Պլանավորվող թեստ-դրայվներ",
      testDriveOpen: "Գրանցումը թեստ-դրայվին բաց է",
      testDriveDesc: "Ընտրեք մոդել կատալոգում և բացեք 3D դիտումը՝ անձնական մենեջերի հետ Երևանի փողոցներով փորձնական ուղևորություն գրանցելու համար:",
      selectModel: "Ընտրել մոդելը",
      labelName: "Հաճախորդի ԱԱՀ",
      labelPhone: "Հեռախոսահամար",
      labelRegistration: "Գրանցում"
    }
  }
};

export function useTranslation() {
  const language = useAppStore((state) => state.language) || "ru";
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use 'ru' as server-side/hydration fallback to prevent HTML mismatches,
  // then hydrate the user's actual stored language on mount.
  const activeLang = mounted ? language : "ru";

  const t = (key: string, fallback?: string): string => {
    const parts = key.split(".");
    let current: Record<string, unknown> | string | undefined = translations[activeLang] as Record<string, unknown> | string;
    
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = (current as Record<string, unknown>)[part] as Record<string, unknown> | string;
      } else {
        // Fallback to Russian if not found in active language, then fallback string
        let ruCurrent: Record<string, unknown> | string | undefined = translations["ru"] as Record<string, unknown> | string;
        for (const ruPart of parts) {
          if (ruCurrent && typeof ruCurrent === "object" && ruPart in ruCurrent) {
            ruCurrent = (ruCurrent as Record<string, unknown>)[ruPart] as Record<string, unknown> | string;
          } else {
            ruCurrent = undefined;
            break;
          }
        }
        return (ruCurrent as string) || fallback || key;
      }
    }
    
    return typeof current === "string" ? current : fallback || key;
  };

  return { t, language: activeLang, setLanguage, mounted };
}

export function translateText(text: string, lang: 'ru' | 'en' | 'am'): string {
  if (lang === 'ru' || !text) return text;
  
  const dict: Record<string, Record<'en' | 'am', string>> = {
    // Body types
    "Все": { en: "All", am: "Բոլորը" },
    "Седан": { en: "Sedan", am: "Սեդան" },
    "Кроссовер": { en: "Crossover", am: "Կրոսովեր" },
    "Пикап": { en: "Pickup", am: "Պիկապ" },
    "Минивэн": { en: "Minivan", am: "Մինիվեն" },
    "SUV": { en: "SUV", am: "SUV" },
    
    // Drive types
    "FWD": { en: "FWD", am: "FWD" },
    "AWD": { en: "AWD", am: "AWD" },

    // Specs metrics suffixes
    "л.с.": { en: "hp", am: "ձ.ու." },
    "с": { en: "s", am: "վ" },
    "л/100 км": { en: "L/100 km", am: "լ/100 կմ" },
    "кг": { en: "kg", am: "կգ" },

    // Engine types
    "Атмосферный": { en: "Naturally Aspirated", am: "Մթնոլորտային" },
    "Дизель": { en: "Diesel", am: "Դիզել" },
    "Турбо": { en: "Turbo", am: "Տուրբո" },

    // Transmission types
    "мокрое сцепление": { en: "wet clutch", am: "թաց կցորդում" },
    "8-АКПП AISIN": { en: "8-speed AT Aisin", am: "8-ԱԿՓ Aisin" },
    "7-DCT (мокрое сцепление)": { en: "7-DCT (wet clutch)", am: "7-DCT (թաց կցորդում)" },
    "6-МКПП / 8-АКПП": { en: "6-MT / 8-AT", am: "6-ՄԿՓ / 8-ԱԿՓ" },
    
    // Colors
    "Белый перламутр": { en: "Pearl White", am: "Մարգարտյա սպիտակ" },
    "Черный металлик": { en: "Black Metallic", am: "Սև մետալիկ" },
    "Темно-серый": { en: "Dark Grey", am: "Մուգ մոխրագույն" },
    "Спортивный Серый": { en: "Sporty Grey", am: "Սպորտային մոխրագույն" },
    "Кристально Белый": { en: "Crystal White", am: "Բյուրեղյա սպիտակ" },
    "Глубокий Синий": { en: "Deep Blue", am: "Մուգ կապույտ" },
    "Матовый Серый (Shadow)": { en: "Matte Grey (Shadow)", am: "Մատովի մոխրագույն (Shadow)" },
    "Огненно-Красный": { en: "Fire Red", am: "Կրակոտ կարմիր" },
    "Иссиня-Черный": { en: "Bluish Black", am: "Կապտասև" },
    "Кристально-Белый": { en: "Crystal White", am: "Բյուրեղյա սպիտակ" },
    "Серебристый металлик": { en: "Silver Metallic", am: "Արծաթագույն մետալիկ" },
    "Стильный Синий": { en: "Stylish Blue", am: "Ոճային կապույտ" },
    "Платиновый Серый": { en: "Platinum Grey", am: "Պլատինե մոխրագույն" },
    "Жемчужно-Белый": { en: "Pearl White", am: "Մարգարտյա սպիտակ" },
    "Темно-Синий": { en: "Dark Blue", am: "Մուգ կապույտ" },
    "Пустынный песок": { en: "Desert Sand", am: "Անապատային ավազ" },
    "Военный зеленый": { en: "Military Green", am: "Ռազմական կանาչ" },
    "Матовый черный": { en: "Matte Black", am: "Մատովի սև" },

    // Features
    "Система предотвращения столкновений": { en: "Collision Avoidance System", am: "Բախման կանխարգելման համակարգ" },
    "Адаптивный круиз-контроль (ACC)": { en: "Adaptive Cruise Control (ACC)", am: "Ադապտիվ կրուիզ-կոնտրոլ (ACC)" },
    "Камеры кругового обзора 360°": { en: "360° Surround View Cameras", am: "360° շրջանաձև տեսադաշտի տեսախցիկներ" },
    "Панорамная крыша с люком": { en: "Panoramic Sunroof", am: "Պանորամային տանիք լյուկով" },
    "Уникальная радиаторная решетка без рамок": { en: "Unique Frameless Grille", am: "Անշրջանակ ռադիատորի վանդակացանց" },
    "Выдвижные ручки дверей": { en: "Retractable Door Handles", am: "Դուրս եկող դռների բռնակներ" },
    "Интеллектуальный автопарковщик (APA 5.0)": { en: "Intelligent Auto Parker (APA 5.0)", am: "Ինտելեկտուալ ավտոկայանող (APA 5.0)" },
    "Спортивный спойлер V-образного типа": { en: "Sporty V-shaped Spoiler", am: "Սպորտային V-աձև սպոյլեր" },
    "Активный задний спойлер (выдвижной)": { en: "Active Rear Spoiler (retractable)", am: "Ակտիվ հետևի սպոյլեր (դուրս եկող)" },
    "Спортивный режим разгона SUPER RACE": { en: "SUPER RACE Sport Mode", am: "SUPER RACE սպորտային ռեժիմ" },
    "Интегрированная выхлопная система": { en: "Integrated Exhaust System", am: "Ինտեգրված արտանետման համակարգ" },
    "Скрытые дверные ручки с подсветкой": { en: "Hidden Illuminated Door Handles", am: "Թաքնված լուսավորվող դռների բռնակներ" },
    "Камера заднего вида со статической разметкой": { en: "Rear View Camera with Static Grid", am: "Հետևի տեսախցիկ ստատիկ գծանշմամբ" },
    "Электронный круиз-контроль": { en: "Electronic Cruise Control", am: "Էլեկտրոնային կրուիզ-կոնտրոլ" },
    "Люк в крыше с электроприводом": { en: "Power Sunroof", am: "Էլեկտրական լյուկ տանիքում" },
    "Мультимедийная система с экраном 7\"": { en: "7\" Touchscreen Multimedia System", am: "7\" էկրանով մուլտիմեդիա համակարգ" },
    "Просторная 7-местная компоновка (2+2+3)": { en: "Spacious 7-seater layout (2+2+3)", am: "Ընդարձակ 7-տեղանոց դասավորություն (2+2+3)" },
    "Сдвижные боковые двери с электроприводом": { en: "Power Sliding Side Doors", am: "Էլեկտրական սահող կողային դռներ" },
    "Панорамное остекление крыши": { en: "Panoramic Roof Glazing", am: "Տանիքի պանորամային ապակեպատում" },
    "Система голосового управления функциями салона": { en: "Voice Control Cabin System", am: "Սրահի ֆունկցիաների ձայնային կառավարման համակարգ" },
    "Рамная конструкция повышенной прочности": { en: "High-strength Frame Structure", am: "Բարձր ամրության շրջանակային կառուցվածք" },
    "Подключаемый полный привод с блокировкой дифференциала": { en: "Part-time 4WD with Differential Lock", am: "Միացվող լիաքարշակ դիֆերենցիալի արգելափակմամբ" },
    "Грузоподъемность до 1000 кг": { en: "Payload capacity up to 1000 kg", am: "Բեռնատարողություն մինչև 1000 կգ" },
    "Защитное покрытие кузова повышенной стойкости": { en: "High-durability Protective Body Coating", am: "Թափքի բարձր դիմացկունության պաշտպանիչ ծածկույթ" }
  };

  // Check exact match
  if (text in dict) {
    return dict[text][lang];
  }

  // Handle composite specs strings like "167 л.с.", "9.2 с", "6.5 л/100 км", "1500 кг"
  let translated = text;
  
  if (lang === 'en') {
    translated = translated.replace("Дизель", "Diesel");
    translated = translated.replace("Атмосферный", "Naturally Aspirated");
    translated = translated.replace("мокрое сцепление", "wet clutch");
    translated = translated.replace("л.с.", "hp");
    translated = translated.replace("с", "s");
    translated = translated.replace("л/100 км", "L/100 km");
    translated = translated.replace("кг", "kg");
  } else if (lang === 'am') {
    translated = translated.replace("Дизель", "Դիզել");
    translated = translated.replace("Атмосферный", "Մթնոլորտային");
    translated = translated.replace("мокрое сцепление", "թաց կցորդում");
    translated = translated.replace("л.с.", "ձ.ու.");
    translated = translated.replace("с", "վ");
    translated = translated.replace("л/100 км", "լ/100 կմ");
    translated = translated.replace("кг", "կգ");
  }

  return translated;
}
