export const translations = {
  en: {
    nav: {
      en: 'EN',
      ua: 'UA'
    },
    hero: {
      tagline: 'SMM · Target · Content · UGC · Model',
      description: 'Elevating lifestyle brands and individuals through aesthetic social media strategy, authentic storytelling, and precise ad campaigns.',
      available: 'Available for projects',
      location: 'Kyiv, Ukraine',
      discover: 'Discover'
    },
    about: {
      vision: 'The Vision',
      heading: 'Creating meaningful digital presence for brands and individuals.',
      body: 'I don\'t just follow templates—I build custom promotion strategies tailored to specific business goals. By combining <span class="text-burgundy font-medium italic">SMM, content, and targeted ads</span> into a single ecosystem, I help brands increase awareness, engage audiences, and get real results. Together with my team, we provide full-cycle digital support.'
    },
    numbers: [
      { value: '2+', label: 'Years in digital' },
      { value: '20+', label: 'Brands elevated' },
      { value: '11', label: 'Niches mastered' },
      { value: '1M+', label: 'Monthly reach' }
    ],
    services: {
      heading: 'Expertise',
      badge: 'Skills',
      subtitle: 'A multidisciplinary approach to digital growth and visual storytelling.',
      items: [
        { id: '01', title: 'SMM', desc: 'Strategy, content planning, and authentic community engagement.', color: 'bg-nude' },
        { id: '02', title: 'Targeting', desc: 'Precise audience mapping and high-conversion ad campaigns.', color: 'bg-burgundy text-nude' },
        { id: '03', title: 'Content', desc: 'Photography, aesthetic reels, and cohesive brand storytelling.', color: 'bg-black-off text-nude' },
        { id: '04', title: 'UGC Creator', desc: 'Creating authentic user-generated content that builds trust and drives sales.', color: 'bg-rose-smoke' },
        { id: '05', title: 'Model', desc: 'Professional brand representation and visual presence for lifestyle campaigns.', color: 'bg-nude border border-burgundy/10' }
      ]
    },
    niches: {
      heading: 'Niches',
      subheading: 'Industries we\'ve elevated',
      items: [
        'Furniture', 'Clinic', 'Cosmetology', 'Beauty Salon', 'Auto Service',
        'Resort', 'Dance Studio', 'Photographer', 'Cleaning', 'Cafe & Bar', 'Food Court'
      ]
    },
    portfolio: {
      badge: 'Selection',
      heading: 'Selected Works',
      description: 'A curated collection of digital aesthetics and strategic growth.',
      works: [
        {
          tag: 'Photography / Art Direction',
          title: 'The Kinfolk Vision',
          desc: 'Visual storytelling for a boutique lifestyle brand, focusing on organic textures and natural light.'
        },
        {
          tag: 'SMM / Growth',
          title: 'Moonlight Label',
          desc: 'Comprehensive strategy and growth management for a sustainable fashion brand.'
        },
        {
          tag: 'Content / Reels',
          title: 'Summer Noir Series',
          desc: 'Cinematic social content and motion design for seasonal campaigns.'
        }
      ],
      cta: 'See All Chronicles'
    },
    clients: {
      badge: 'Collaborations',
      heading: 'Brands I\'ve Empowered',
      hint: 'Tap any card to open the full case',
      visit: 'View on Instagram',
      statsLabel: 'Results',
      galleryLabel: 'Selected media',
      mediaPlaceholder: 'Media coming soon',
      items: [
        {
          name: 'WAL Design', url: 'https://www.instagram.com/wal_design_studio', category: 'Furniture · Kyiv',
          services: ['SMM', 'Targeted Ads'],
          description: 'Full-cycle SMM and paid ads for a custom furniture studio. Production reels shot with our team\'s videographer, plus conversion-focused ad creatives that turned made-to-order pieces into a recognizable lifestyle brand.',
          stats: [
            { label: 'Followers from', value: '1 368' },
            { label: 'Ad period', value: '2.5 mo' }
          ],
          media: [
            { type: 'video', src: 'media/wal-design/IMG_0416.mp4', poster: 'media/wal-design/IMG_0416-poster.jpg' },
            { type: 'video', src: 'media/wal-design/IMG_1824.mp4', poster: 'media/wal-design/IMG_1824-poster.jpg' },
            { type: 'video', src: 'media/wal-design/IMG_4295.mp4', poster: 'media/wal-design/IMG_4295-poster.jpg' }
          ]
        },
        {
          name: 'Kutok House', url: 'https://www.instagram.com/kutok.house', category: 'Resort · near Kyiv',
          services: ['SMM', 'Targeted Ads'],
          description: 'Seasonal content and targeted campaigns for a recreation base with sauna, hot tubs, and a pool. Mood-driven storytelling about rest and nature that drove bookings and filled the calendar.',
          stats: [
            { label: 'Followers', value: '+695' },
            { label: 'In', value: '1 mo' },
            { label: 'Bookings', value: 'Full' }
          ],
          media: [
            { type: 'video', src: 'media/kutok-house/IMG_0653.mp4', poster: 'media/kutok-house/IMG_0653-poster.jpg' },
            { type: 'video', src: 'media/kutok-house/IMG_0800.mp4', poster: 'media/kutok-house/IMG_0800-poster.jpg' },
            { type: 'video', src: 'media/kutok-house/IMG_0871.mp4', poster: 'media/kutok-house/IMG_0871-poster.jpg' }
          ]
        },
        {
          name: 'OneCar', url: 'https://www.instagram.com/onecar_ua', category: 'Auto · Import',
          services: ['SMM'],
          description: 'Full-cycle turnkey SMM with the team for an auto service importing cars from Korea & the USA — service, rental, leasing. Trust-first content that communicates process, pricing, and reliability.',
          stats: [],
          media: [
            { type: 'video', src: 'media/onecar/IMG_7974.mp4', poster: 'media/onecar/IMG_7974-poster.jpg' },
            { type: 'video', src: 'media/onecar/IMG_8730.mp4', poster: 'media/onecar/IMG_8730-poster.jpg' }
          ]
        },
        {
          name: 'Dance by Sofi', url: 'https://www.instagram.com/dancecalgary_bysofi', category: 'Dance · Canada',
          services: ['Targeted Ads'],
          description: 'Targeted ad campaigns for a Calgary choreographer specializing in Latin and wedding dance. Ad creatives that filled classes and earned glowing student feedback.',
          stats: [],
          media: [
            { type: 'video', src: 'media/dance-calgary/IMG_5933.mp4', poster: 'media/dance-calgary/IMG_5933-poster.jpg' }
          ]
        },
        {
          name: 'Oh Baby Photo', url: 'https://www.instagram.com/oh_baby_photography_', category: 'Maternity Photo · USA',
          services: ['SMM'],
          description: 'SMM for a California maternity & newborn photographer. A more engaged audience and steady follower growth, with a thoughtful, creative approach the client praised by name.',
          stats: [],
          media: [
            { type: 'video', src: 'media/oh-baby-photo/oh-baby-1.mp4', poster: 'media/oh-baby-photo/oh-baby-1-poster.jpg' },
            { type: 'video', src: 'media/oh-baby-photo/oh-baby-2.mp4', poster: 'media/oh-baby-photo/oh-baby-2-poster.jpg' }
          ]
        },
        {
          name: 'MUA Anya', url: 'https://www.instagram.com/mua.anya', category: 'Makeup · USA',
          services: ['Targeted Ads'],
          description: 'Targeted ads for a makeup artist across Sacramento, the Bay Area, Tahoe & Monterey. The bookings spoke for themselves — the client was genuinely shocked at the results.',
          stats: [
            { label: 'Day 1 deposits', value: '$550' },
            { label: 'In 3 days', value: '$1 800' }
          ],
          media: [
            { type: 'video', src: 'media/mua-anya/IMG_7948.mp4', poster: 'media/mua-anya/IMG_7948-poster.jpg' }
          ]
        },
        {
          name: 'OK Cosmetology', url: 'https://www.instagram.com/ok.cosmetologyy__', category: 'Cosmetology · Kyiv',
          services: ['SMM'],
          description: 'SMM and a full page build from zero for a cosmetology & dermatology clinic (Ultraformer MPT). Educational, trust-building content balancing expertise with an elegant, approachable voice.',
          stats: [
            { label: 'Page built', value: 'From 0' }
          ],
          media: [
            { type: 'video', src: 'media/ok-cosmetology/IMG_6650.mp4', poster: 'media/ok-cosmetology/IMG_6650-poster.jpg' },
            { type: 'video', src: 'media/ok-cosmetology/IMG_7192.mp4', poster: 'media/ok-cosmetology/IMG_7192-poster.jpg' }
          ]
        },
        {
          name: 'Dr. Collins', url: 'https://www.instagram.com/dr.collins_clinic', category: 'Aesthetic Clinic · 4 cities',
          services: ['SMM'],
          description: 'A six-month SMM partnership with the team across four city pages — Kyiv, Odesa, Vinnytsia & Lviv. "Cosmetology of a new generation," carried by a consistent visual system across every location.',
          stats: [
            { label: 'Locations', value: '4 cities' },
            { label: 'Partnership', value: '6 mo' }
          ],
          media: [
            { type: 'video', src: 'media/dr-collins/IMG_8790.mp4', poster: 'media/dr-collins/IMG_8790-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_9956.mp4', poster: 'media/dr-collins/IMG_9956-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_9950.mp4', poster: 'media/dr-collins/IMG_9950-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_0331.mp4', poster: 'media/dr-collins/IMG_0331-poster.jpg' }
          ]
        },
        {
          name: 'Comedy Shelter', url: 'https://www.instagram.com/comedy_shelter.ua', category: 'Cafe-bar · Standup',
          services: ['SMM'],
          description: 'SMM for a standup comedy club & restaurant — page design and playful, share-worthy reels that match the venue\'s humor and bring people through the door.',
          stats: [],
          media: [
            { type: 'video', src: 'media/comedy-shelter/IMG_7730.mp4', poster: 'media/comedy-shelter/IMG_7730-poster.jpg' }
          ]
        }
      ]
    },
    ugc: {
      badge: 'Content Creator',
      heading: 'UGC & Content',
      description: 'Authentic, scroll-stopping user-generated content — the kind that feels native to the feed and quietly does the selling.',
      items: [
        { src: 'media/ugc/IMG_1057.mp4', poster: 'media/ugc/IMG_1057-poster.jpg' },
        { src: 'media/ugc/IMG_2613.mp4', poster: 'media/ugc/IMG_2613-poster.jpg' },
        { src: 'media/ugc/IMG_2594.mp4', poster: 'media/ugc/IMG_2594-poster.jpg' },
        { src: 'media/ugc/IMG_4399.mp4', poster: 'media/ugc/IMG_4399-poster.jpg' },
        { src: 'media/ugc/IMG_4400.mp4', poster: 'media/ugc/IMG_4400-poster.jpg' },
        { src: 'media/ugc/IMG_4190.mp4', poster: 'media/ugc/IMG_4190-poster.jpg' }
      ]
    },
    brands: {
      badge: 'In Front of the Camera',
      heading: 'Modeling & Brand Shoots',
      description: 'Featured in campaigns and content for established cosmetics and lifestyle brands.',
      items: [
        {
          name: 'Eva Beauty',
          media: [
            { src: 'media/brands/eva-beauty/IMG_0769.mp4', poster: 'media/brands/eva-beauty/IMG_0769-poster.jpg' },
            { src: 'media/brands/eva-beauty/IMG_2839.mp4', poster: 'media/brands/eva-beauty/IMG_2839-poster.jpg' },
            { src: 'media/brands/eva-beauty/IMG_7590.mp4', poster: 'media/brands/eva-beauty/IMG_7590-poster.jpg' }
          ]
        },
        {
          name: 'Glambee',
          media: [
            { src: 'media/brands/glambee/IMG_8105.mp4', poster: 'media/brands/glambee/IMG_8105-poster.jpg' },
            { src: 'media/brands/glambee/IMG_4099.mp4', poster: 'media/brands/glambee/IMG_4099-poster.jpg' },
            { src: 'media/brands/glambee/IMG_8104.mp4', poster: 'media/brands/glambee/IMG_8104-poster.jpg' }
          ]
        },
        { name: 'Krauff', media: [] },
        { name: 'Lovare', media: [] },
        { name: 'Thermoceutical', media: [] }
      ]
    },
    reviews: {
      badge: 'Feedback',
      heading: 'Client Stories',
      items: [
        {
          name: 'Resort Owner / Kutok House',
          text: 'Everything is so cool — I really love the page design. New followers every day (+500 a month), and after just one month the whole calendar was fully booked. Thank you so much!',
          date: '2026'
        },
        {
          name: 'Photographer / Oh Baby Photography',
          text: 'Huge thanks to our SMM manager Anastasia. Thanks to her professionalism and creative approach, our page grew noticeably — activity is up and followers are far more engaged. We recommend her as a reliable, creative specialist.',
          date: '2026'
        },
        {
          name: 'MUA Anya / California',
          text: 'Honestly, everything with the makeup bookings is going great — so many people signing up. $550 in deposits in a single day, $1,800 over three days. I\'m in shock, and it\'s all thanks to the ads.',
          date: '2026'
        }
      ]
    },
    marquee: [
      'CONTENT STRATEGY', 'BRAND IDENTITY', 'TARGETED ADS', 'AESTHETIC REELS', 'COMMUNITY BUILDING'
    ],
    journey: {
      heading: 'Journey',
      items: [
        {
          date: '2023 — Present',
          title: 'Freelance SMM & Content Creator',
          desc: 'Working with lifestyle brands, personal brands, and small businesses to elevate their digital footprint through organic aesthetics.'
        },
        {
          date: '2022 — 2023',
          title: 'Social Media Manager',
          desc: 'Brand collaboration, campaign management, and establishing visual identity for emerging labels.'
        }
      ]
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'What is the cost of your services?',
          a: 'The cost depends on your request, volume of work, and specific services your business needs. We tailor a format of cooperation and strategy for each individual project.'
        },
        {
          q: 'How soon can results be seen?',
          a: 'Initial results depend on the niche, starting point, and goals. Usually, the first month is for analysis, strategy building, testing, and process setup. Stable growth and efficiency are typically visible from the second month.'
        },
        {
          q: 'Do you work with different niches?',
          a: 'Yes, I have experience with various niches and business formats. Before starting, I conduct a detailed analysis of your project to select the most effective strategy for your audience.'
        },
        {
          q: 'What is included in your services?',
          a: 'Depending on the request, it may include social media management, content creation, targeted advertising, promotion strategy, video production, visual design, and comprehensive digital support.'
        },
        {
          q: 'Can I order just one service?',
          a: 'Yes, you can choose either comprehensive management or separate services—for example, only targeted advertising, content, or a consultation.'
        },
        {
          q: 'Do you work in a team?',
          a: 'Yes, I work with a team of specialists, allowing us to comprehensively cover all processes: from content creation to video filming and brand design.'
        },
        {
          q: 'How does cooperation begin?',
          a: 'First, we discuss your business, goals, and request. After that, I conduct an analysis and propose the optimal work format and promotion strategy.'
        }
      ]
    },
    contact: {
      badge: 'Collaboration',
      heading: "Let's Create Magic",
      description: 'Open to collaborations, brand partnerships, and new creative projects that push boundaries. Pricing is tailored individually for each project.',
      links: {
        insta: 'Instagram',
        email: 'Email',
        tele: 'Telegram',
        viber: 'Viber',
        wa: 'WhatsApp'
      }
    },
    footer: {
      rights: '© 2026 Anastasia. All rights reserved.',
      tagline: 'Designed with Intention'
    }
  },
  ua: {
    nav: {
      en: 'EN',
      ua: 'UA'
    },
    hero: {
      tagline: 'SMM · Target · Content · UGC · Модель',
      description: 'Допомагаю бізнесам будувати сильний візуал, розвивати соцмережі та залучати нову аудиторію. Понад 2 роки у digital-маркетингу.',
      available: 'Вільна для проектів',
      location: 'Київ, Україна',
      discover: 'Відкрити'
    },
    about: {
      vision: 'Візія',
      heading: 'Створюю значущу цифрову присутність для брендів та особистостей.',
      body: 'Я працюю не шаблонно, а будую стратегію просування під цілі конкретного бізнесу. Поєдную <span class="text-burgundy font-medium italic">SMM, контент і таргетовану рекламу</span> в єдину систему, яка допомагає брендам збільшувати впізнаваність, залучати аудиторію та отримувати результат. Разом із командою надаємо повний digital-супровід під ключ.'
    },
    numbers: [
      { value: '2+', label: 'Роки в digital' },
      { value: '20+', label: 'Брендів підсилено' },
      { value: '11', label: 'Освоєних ніш' },
      { value: '1М+', label: 'Охоплення / міс' }
    ],
    services: {
      heading: 'Експертність',
      badge: 'Навички',
      subtitle: 'Мультидисциплінарний підхід до цифрового зростання та візуального сторітелінгу.',
      items: [
        { id: '01', title: 'SMM', desc: 'Стратегія, контент-планування та щира взаємодія з ком\'юніті.', color: 'bg-nude' },
        { id: '02', title: 'Targeting', desc: 'Точне мапування аудиторії та рекламні кампанії з високою конверсією.', color: 'bg-burgundy text-nude' },
        { id: '03', title: 'Content', desc: 'Фотографія, естетичні Reels та цілісний брендовий сторітелінг.', color: 'bg-black-off text-nude' },
        { id: '04', title: 'UGC Creator', desc: 'Створення нативного контенту, який викликає довіру та стимулює продажі.', color: 'bg-rose-smoke' },
        { id: '05', title: 'Model', desc: 'Професійне позування та презентація брендів у лайфстайл-кампаніях.', color: 'bg-nude border border-burgundy/10' }
      ]
    },
    niches: {
      heading: 'Ніші',
      subheading: 'Галузі, з якими я працюю',
      items: [
        'Меблі', 'Клініки', 'Косметологія', 'Салони краси', 'СТО',
        'Бази відпочинку', 'Студії танців', 'Фотографи', 'Клінінг', 'Кафе та бари', 'Фудкорти'
      ]
    },
    portfolio: {
      badge: 'Вибірка',
      heading: 'Обрані роботи',
      description: 'Кураторська колекція цифрової естетики та стратегічного зростання.',
      works: [
        {
          tag: 'Фотографія / Арт-дирекшн',
          title: 'The Kinfolk Vision',
          desc: 'Візуальний сторітелінг для бутікового лайфстайл-бренду з фокусом на текстури та світло.'
        },
        {
          tag: 'SMM / Зростання',
          title: 'Moonlight Label',
          desc: 'Комплексна стратегія та управління розвитком для бренду екологічної моди.'
        },
        {
          tag: 'Контент / Reels',
          title: 'Summer Noir Series',
          desc: 'Кінематографічний соціальний контент та моушн-дизайн для сезонних кампаній.'
        }
      ],
      cta: 'Дивитися всі хроніки'
    },
    clients: {
      badge: 'Співпраця',
      heading: 'Бренди, які я підсилюю',
      hint: 'Натисніть на картку, щоб відкрити кейс',
      visit: 'Перейти в Instagram',
      statsLabel: 'Результати',
      galleryLabel: 'Обрані матеріали',
      mediaPlaceholder: 'Матеріали скоро',
      items: [
        {
          name: 'WAL Design', url: 'https://www.instagram.com/wal_design_studio', category: 'Меблі · Київ',
          services: ['SMM', 'Таргет'],
          description: 'Повний цикл SMM і таргетованої реклами для студії меблів під замовлення. Виробничі Reels, зняті з відеографом команди, та рекламні креативи з фокусом на конверсію, що перетворили вироби на впізнаваний лайфстайл-бренд.',
          stats: [
            { label: 'Підписників від', value: '1 368' },
            { label: 'Період реклами', value: '2.5 міс' }
          ],
          media: [
            { type: 'video', src: 'media/wal-design/IMG_0416.mp4', poster: 'media/wal-design/IMG_0416-poster.jpg' },
            { type: 'video', src: 'media/wal-design/IMG_1824.mp4', poster: 'media/wal-design/IMG_1824-poster.jpg' },
            { type: 'video', src: 'media/wal-design/IMG_4295.mp4', poster: 'media/wal-design/IMG_4295-poster.jpg' }
          ]
        },
        {
          name: 'Kutok House', url: 'https://www.instagram.com/kutok.house', category: 'База відпочинку · Київ',
          services: ['SMM', 'Таргет'],
          description: 'Сезонний контент і таргетовані кампанії для бази відпочинку з банею, чанами та басейном. Атмосферні історії про відпочинок і природу, що підняли бронювання та заповнили календар.',
          stats: [
            { label: 'Підписників', value: '+695' },
            { label: 'За', value: '1 міс' },
            { label: 'Бронювання', value: 'Повні' }
          ],
          media: [
            { type: 'video', src: 'media/kutok-house/IMG_0653.mp4', poster: 'media/kutok-house/IMG_0653-poster.jpg' },
            { type: 'video', src: 'media/kutok-house/IMG_0800.mp4', poster: 'media/kutok-house/IMG_0800-poster.jpg' },
            { type: 'video', src: 'media/kutok-house/IMG_0871.mp4', poster: 'media/kutok-house/IMG_0871-poster.jpg' }
          ]
        },
        {
          name: 'OneCar', url: 'https://www.instagram.com/onecar_ua', category: 'Авто · Пригін',
          services: ['SMM'],
          description: 'SMM під ключ з командою для автосервісу з пригоном авто з Кореї та США — сервіс, прокат, лізинг. Контент на довірі, що пояснює процес, ціни та надійність.',
          stats: [],
          media: [
            { type: 'video', src: 'media/onecar/IMG_7974.mp4', poster: 'media/onecar/IMG_7974-poster.jpg' },
            { type: 'video', src: 'media/onecar/IMG_8730.mp4', poster: 'media/onecar/IMG_8730-poster.jpg' }
          ]
        },
        {
          name: 'Dance by Sofi', url: 'https://www.instagram.com/dancecalgary_bysofi', category: 'Танці · Канада',
          services: ['Таргет'],
          description: 'Таргетовані рекламні кампанії для хореографки з Калгарі — латина та весільний танець. Рекламні креативи, що заповнили заняття та зібрали чудові відгуки учнів.',
          stats: [],
          media: [
            { type: 'video', src: 'media/dance-calgary/IMG_5933.mp4', poster: 'media/dance-calgary/IMG_5933-poster.jpg' }
          ]
        },
        {
          name: 'Oh Baby Photo', url: 'https://www.instagram.com/oh_baby_photography_', category: 'Фото вагітності · США',
          services: ['SMM'],
          description: 'SMM для каліфорнійської фотографки зйомок вагітності й новонароджених. Більш залучена аудиторія та стабільний приріст підписників, з креативним підходом, який клієнт відзначив особисто.',
          stats: [],
          media: [
            { type: 'video', src: 'media/oh-baby-photo/oh-baby-1.mp4', poster: 'media/oh-baby-photo/oh-baby-1-poster.jpg' },
            { type: 'video', src: 'media/oh-baby-photo/oh-baby-2.mp4', poster: 'media/oh-baby-photo/oh-baby-2-poster.jpg' }
          ]
        },
        {
          name: 'MUA Anya', url: 'https://www.instagram.com/mua.anya', category: 'Макіяж · США',
          services: ['Таргет'],
          description: 'Таргетована реклама для візажистки в Сакраменто, Bay Area, Тахо та Монтереї. Записи говорять самі за себе — клієнтка була щиро вражена результатом.',
          stats: [
            { label: 'Депозити за 1 день', value: '$550' },
            { label: 'За 3 дні', value: '$1 800' }
          ],
          media: [
            { type: 'video', src: 'media/mua-anya/IMG_7948.mp4', poster: 'media/mua-anya/IMG_7948-poster.jpg' }
          ]
        },
        {
          name: 'OK Cosmetology', url: 'https://www.instagram.com/ok.cosmetologyy__', category: 'Косметологія · Київ',
          services: ['SMM'],
          description: 'SMM і повне оформлення сторінки з нуля для косметології та дерматології (Ultraformer MPT). Освітній контент на довірі, що балансує експертизу й елегантний, доступний голос.',
          stats: [
            { label: 'Сторінка', value: 'З нуля' }
          ],
          media: [
            { type: 'video', src: 'media/ok-cosmetology/IMG_6650.mp4', poster: 'media/ok-cosmetology/IMG_6650-poster.jpg' },
            { type: 'video', src: 'media/ok-cosmetology/IMG_7192.mp4', poster: 'media/ok-cosmetology/IMG_7192-poster.jpg' }
          ]
        },
        {
          name: 'Dr. Collins', url: 'https://www.instagram.com/dr.collins_clinic', category: 'Клініка · 4 міста',
          services: ['SMM'],
          description: 'Піврічна співпраця з SMM і командою на чотирьох сторінках міст — Київ, Одеса, Вінниця та Львів. «Косметологія нового покоління» з єдиною візуальною системою для кожної локації.',
          stats: [
            { label: 'Локації', value: '4 міста' },
            { label: 'Співпраця', value: '6 міс' }
          ],
          media: [
            { type: 'video', src: 'media/dr-collins/IMG_8790.mp4', poster: 'media/dr-collins/IMG_8790-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_9956.mp4', poster: 'media/dr-collins/IMG_9956-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_9950.mp4', poster: 'media/dr-collins/IMG_9950-poster.jpg' },
            { type: 'video', src: 'media/dr-collins/IMG_0331.mp4', poster: 'media/dr-collins/IMG_0331-poster.jpg' }
          ]
        },
        {
          name: 'Comedy Shelter', url: 'https://www.instagram.com/comedy_shelter.ua', category: 'Кафе-бар · Стендап',
          services: ['SMM'],
          description: 'SMM для клубу стендапу та ресторану — оформлення сторінки й грайливі Reels, що відповідають гумору закладу та приводять гостей.',
          stats: [],
          media: [
            { type: 'video', src: 'media/comedy-shelter/IMG_7730.mp4', poster: 'media/comedy-shelter/IMG_7730-poster.jpg' }
          ]
        }
      ]
    },
    ugc: {
      badge: 'Контент-креатор',
      heading: 'UGC та контент',
      description: 'Нативний контент, що зупиняє скрол — такий, що органічно вписується у стрічку й тихо робить продажі.',
      items: [
        { src: 'media/ugc/IMG_1057.mp4', poster: 'media/ugc/IMG_1057-poster.jpg' },
        { src: 'media/ugc/IMG_2613.mp4', poster: 'media/ugc/IMG_2613-poster.jpg' },
        { src: 'media/ugc/IMG_2594.mp4', poster: 'media/ugc/IMG_2594-poster.jpg' },
        { src: 'media/ugc/IMG_4399.mp4', poster: 'media/ugc/IMG_4399-poster.jpg' },
        { src: 'media/ugc/IMG_4400.mp4', poster: 'media/ugc/IMG_4400-poster.jpg' },
        { src: 'media/ugc/IMG_4190.mp4', poster: 'media/ugc/IMG_4190-poster.jpg' }
      ]
    },
    brands: {
      badge: 'Перед камерою',
      heading: 'Модель та зйомки з брендами',
      description: 'Участь у кампаніях та контенті для відомих косметичних і лайфстайл-брендів.',
      items: [
        {
          name: 'Eva Beauty',
          media: [
            { src: 'media/brands/eva-beauty/IMG_0769.mp4', poster: 'media/brands/eva-beauty/IMG_0769-poster.jpg' },
            { src: 'media/brands/eva-beauty/IMG_2839.mp4', poster: 'media/brands/eva-beauty/IMG_2839-poster.jpg' },
            { src: 'media/brands/eva-beauty/IMG_7590.mp4', poster: 'media/brands/eva-beauty/IMG_7590-poster.jpg' }
          ]
        },
        {
          name: 'Glambee',
          media: [
            { src: 'media/brands/glambee/IMG_8105.mp4', poster: 'media/brands/glambee/IMG_8105-poster.jpg' },
            { src: 'media/brands/glambee/IMG_4099.mp4', poster: 'media/brands/glambee/IMG_4099-poster.jpg' },
            { src: 'media/brands/glambee/IMG_8104.mp4', poster: 'media/brands/glambee/IMG_8104-poster.jpg' }
          ]
        },
        { name: 'Krauff', media: [] },
        { name: 'Lovare', media: [] },
        { name: 'Thermoceutical', media: [] }
      ]
    },
    reviews: {
      badge: 'Відгуки',
      heading: 'Історії клієнтів',
      items: [
        {
          name: 'Власниця бази / Kutok House',
          text: 'Все дуже круто — дуже подобається оформлення сторінки. Нові підписники щодня (+500 на місяць), і вже за місяць календар був повністю заброньований. Дуже дякую!',
          date: '2026'
        },
        {
          name: 'Фотограф / Oh Baby Photography',
          text: 'Величезна подяка нашому SMM-менеджеру Анастасії. Завдяки її професіоналізму та креативному підходу наша сторінка помітно зросла — активність вища, підписники набагато залученіші. Рекомендуємо як надійного, креативного спеціаліста.',
          date: '2026'
        },
        {
          name: 'MUA Anya / Каліфорнія',
          text: 'Чесно, з записами на макіяж усе чудово — стільки людей записується. $550 депозитів за один день, $1 800 за три дні. Я в шоці, і це все завдяки рекламі.',
          date: '2026'
        }
      ]
    },
    marquee: [
      'КОНТЕНТ СТРАТЕГІЯ', 'АЙДЕНТИКА БРЕНДУ', 'ТАРГЕТОВАНА РЕКЛАМА', 'ЕСТЕТИЧНІ REELS', 'ПОБУДОВА КОМ\'ЮНІТІ'
    ],
    journey: {
      heading: 'Шлях',
      items: [
        {
          date: '2023 — Теперішній час',
          title: 'Freelance SMM & Content Creator',
          desc: 'Робота з лайфстайл-брендами, персональними брендами та малим бізнесом.'
        },
        {
          date: '2022 — 2023',
          title: 'Social Media Manager',
          desc: 'Колаборації з брендами, управління кампаніями та створення візуальної айдентики.'
        }
      ]
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          q: 'Яка вартість ваших послуг?',
          a: 'Вартість залежить від запиту, обсягу роботи та послуг, які потрібні саме вашому бізнесу. Для кожного проєкту підбирається індивідуальний формат співпраці.'
        },
        {
          q: 'Через який час можна побачити результат?',
          a: 'Зазвичай перший місяць — це аналіз, побудова стратегії, тестування, а вже з другого місяця можна побачити стабільний ріст.'
        },
        {
          q: 'Чи працюєте ви з різними нішами?',
          a: 'Так, маю досвід роботи з різними нішами. Перед початком співпраці детально аналізую ваш проєкт.'
        },
        {
          q: 'Що входить у ваші послуги?',
          a: 'Це може бути ведення соцмереж, створення контенту, таргетована реклама, стратегія просування та комплексний digital-супровід.'
        },
        {
          q: 'Чи можна замовити лише одну послугу?',
          a: 'Так, ви можете обрати як комплексне ведення, так і окремі послуги — наприклад, лише таргет або консультацію.'
        },
        {
          q: 'Чи працюєте ви в команді?',
          a: 'Так, разом зі мною працює команда спеціалістів, що дозволяє комплексно закривати всі процеси.'
        },
        {
          q: 'Як починається співпраця?',
          a: 'Спочатку ми обговорюємо ваш бізнес та цілі. Після цього я проводжу аналіз і пропоную формат роботи.'
        }
      ]
    },
    contact: {
      badge: 'Співпраця',
      heading: "Створимо магію разом",
      description: 'Відкрита до колаборацій, партнерства з брендами та нових креативних проєктів. Вартість послуг розраховується індивідуально.',
      links: {
        insta: 'Instagram',
        email: 'Email',
        tele: 'Telegram',
        viber: 'Viber',
        wa: 'WhatsApp'
      }
    },
    footer: {
      rights: '© 2026 Anastasia. Усі права захищені.',
      tagline: 'Спроектовано з наміром'
    }
  }
};
