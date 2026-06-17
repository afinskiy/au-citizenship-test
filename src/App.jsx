import { useState, useEffect, useRef, useMemo } from "react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const ALL_Q = [
  {
    cat: "🌏 Australia & Its People",
    en: "Who are Australia's first inhabitants?",
    opts: [
      "British settlers",
      "Aboriginal and Torres Strait Islander peoples",
      "Dutch explorers"
    ],
    a: 1,
    ua: "Хто є першими жителями Австралії?",
    uaOpts: [
      "Британські поселенці",
      "Аборигени та жителі островів Торресової протоки",
      "Нідерландські дослідники"
    ],
    exp: "Australia's first inhabitants are the Aboriginal and Torres Strait Islander peoples, who have the oldest continuous cultures in the world. (Part 1)",
    uaExp: "Першими жителями Австралії є аборигени та жителі островів Торресової протоки — носії найдавніших безперервних культур. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When did European settlement of Australia begin?",
    opts: [
      "1901",
      "1851",
      "1788"
    ],
    a: 2,
    ua: "Коли почалося європейське заселення Австралії?",
    uaOpts: [
      "1901",
      "1851",
      "1788"
    ],
    exp: "European settlement started when the First Fleet arrived from Great Britain on 26 January 1788. (Part 1)",
    uaExp: "Європейське заселення почалося з прибуттям Першого флоту 26 січня 1788 року. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Who was the first Governor of New South Wales?",
    opts: [
      "Captain James Cook",
      "Governor Lachlan Macquarie",
      "Captain Arthur Phillip"
    ],
    a: 2,
    ua: "Хто був першим губернатором Нового Південного Уельсу?",
    uaOpts: [
      "Капітан Джеймс Кук",
      "Губернатор Лаклан Маккуорі",
      "Капітан Артур Філліп"
    ],
    exp: "The first Governor of the colony of New South Wales was Captain Arthur Phillip. (Part 1)",
    uaExp: "Першим губернатором колонії Новий Південний Уельс був капітан Артур Філліп. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "In what year did the gold rush begin?",
    opts: [
      "1788",
      "1901",
      "1851"
    ],
    a: 2,
    ua: "У якому році почалася золота лихоманка?",
    uaOpts: [
      "1788",
      "1901",
      "1851"
    ],
    exp: "In 1851 a 'gold rush' began when gold was discovered in New South Wales and Victoria. (Part 1)",
    uaExp: "У 1851 році почалася золота лихоманка після відкриття золота в Новому Південному Уельсі та Вікторії. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Who were the first large group of non-European migrants?",
    opts: [
      "Indians",
      "Chinese",
      "Greeks"
    ],
    a: 1,
    ua: "Хто був першою великою групою не-європейських мігрантів?",
    uaOpts: [
      "Індійці",
      "Китайці",
      "Греки"
    ],
    exp: "Chinese people arriving during the gold rush were the first large group of migrants not from Europe. (Part 1)",
    uaExp: "Китайці, що прибули під час золотої лихоманки, були першою великою групою мігрантів не з Європи. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When did the colonies federate into the Commonwealth of Australia?",
    opts: [
      "1901",
      "1788",
      "1851"
    ],
    a: 0,
    ua: "Коли колонії об'єдналися в Австралійський Союз?",
    uaOpts: [
      "1901",
      "1788",
      "1851"
    ],
    exp: "On 1 January 1901 the separate colonies were united into a federation called the Commonwealth of Australia. (Part 1)",
    uaExp: "1 січня 1901 року окремі колонії об'єдналися у федерацію — Австралійський Союз. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "After which referendum were Aboriginal peoples included in population counts?",
    opts: [
      "1901",
      "1948",
      "1967"
    ],
    a: 2,
    ua: "Після якого референдуму аборигенів включили до підрахунку населення?",
    uaOpts: [
      "1901",
      "1948",
      "1967"
    ],
    exp: "It was not until after the 1967 Referendum that Aboriginal and Torres Strait Islander peoples were included in official population estimates. (Part 1)",
    uaExp: "Лише після референдуму 1967 року аборигенів включили до офіційних підрахунків населення. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national language?",
    opts: [
      "There is no national language",
      "Aboriginal English",
      "English"
    ],
    a: 2,
    ua: "Яка національна мова Австралії?",
    uaOpts: [
      "Національної мови немає",
      "Аборигенна англійська",
      "Англійська"
    ],
    exp: "Australia's national language is English. It is part of our national identity. (Part 1)",
    uaExp: "Національна мова Австралії — англійська. Вона є частиною національної ідентичності. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many states does Australia have?",
    opts: [
      "Five",
      "Seven",
      "Six"
    ],
    a: 2,
    ua: "Скільки штатів в Австралії?",
    uaOpts: [
      "П'ять",
      "Сім",
      "Шість"
    ],
    exp: "The Commonwealth of Australia has six states and two mainland territories. (Part 1)",
    uaExp: "Австралійський Союз має шість штатів і дві материкові території. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many mainland territories does Australia have?",
    opts: [
      "One",
      "Two",
      "Three"
    ],
    a: 1,
    ua: "Скільки материкових територій в Австралії?",
    uaOpts: [
      "Одна",
      "Дві",
      "Три"
    ],
    exp: "Australia has two mainland territories: the Australian Capital Territory and the Northern Territory. (Part 1)",
    uaExp: "Австралія має дві материкові території: Австралійську столичну територію та Північну Територію. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital city of Australia?",
    opts: [
      "Canberra",
      "Sydney",
      "Melbourne"
    ],
    a: 0,
    ua: "Яка столиця Австралії?",
    uaOpts: [
      "Канберра",
      "Сідней",
      "Мельбурн"
    ],
    exp: "Canberra is Australia's capital city, located in the Australian Capital Territory between Sydney and Melbourne. (Part 1)",
    uaExp: "Канберра — столиця Австралії, розташована в АСТ між Сіднеєм і Мельбурном. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of New South Wales?",
    opts: [
      "Newcastle",
      "Canberra",
      "Sydney"
    ],
    a: 2,
    ua: "Яка столиця Нового Південного Уельсу?",
    uaOpts: [
      "Ньюкасл",
      "Канберра",
      "Сідней"
    ],
    exp: "Sydney is the capital city of New South Wales and the nation's largest city. (Part 1)",
    uaExp: "Сідней — столиця Нового Південного Уельсу та найбільше місто країни. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of Victoria?",
    opts: [
      "Melbourne",
      "Geelong",
      "Ballarat"
    ],
    a: 0,
    ua: "Яка столиця Вікторії?",
    uaOpts: [
      "Мельбурн",
      "Джілонг",
      "Балларат"
    ],
    exp: "Victoria's capital city is Melbourne. (Part 1)",
    uaExp: "Столиця Вікторії — Мельбурн. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of Queensland?",
    opts: [
      "Cairns",
      "Gold Coast",
      "Brisbane"
    ],
    a: 2,
    ua: "Яка столиця Квінсленду?",
    uaOpts: [
      "Кернс",
      "Голд-Кост",
      "Брісбен"
    ],
    exp: "Queensland's capital city is Brisbane. (Part 1)",
    uaExp: "Столиця Квінсленду — Брісбен. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of Western Australia?",
    opts: [
      "Perth",
      "Fremantle",
      "Broome"
    ],
    a: 0,
    ua: "Яка столиця Західної Австралії?",
    uaOpts: [
      "Перт",
      "Фрімантл",
      "Брум"
    ],
    exp: "Perth is the capital city of Western Australia, the largest state. (Part 1)",
    uaExp: "Перт — столиця Західної Австралії, найбільшого штату. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of South Australia?",
    opts: [
      "Adelaide",
      "Whyalla",
      "Port Augusta"
    ],
    a: 0,
    ua: "Яка столиця Південної Австралії?",
    uaOpts: [
      "Аделаїда",
      "Уайалла",
      "Порт-Огаста"
    ],
    exp: "Adelaide is the capital city of South Australia. (Part 1)",
    uaExp: "Аделаїда — столиця Південної Австралії. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of Tasmania?",
    opts: [
      "Launceston",
      "Devonport",
      "Hobart"
    ],
    a: 2,
    ua: "Яка столиця Тасманії?",
    uaOpts: [
      "Лонсестон",
      "Девонпорт",
      "Гобарт"
    ],
    exp: "Tasmania's capital city is Hobart. (Part 1)",
    uaExp: "Столиця Тасманії — Гобарт. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of the Northern Territory?",
    opts: [
      "Katherine",
      "Darwin",
      "Alice Springs"
    ],
    a: 1,
    ua: "Яка столиця Північної Території?",
    uaOpts: [
      "Кетрін",
      "Дарвін",
      "Аліс-Спрінгс"
    ],
    exp: "Darwin is the capital city of the Northern Territory. (Part 1)",
    uaExp: "Дарвін — столиця Північної Території. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital of the Australian Capital Territory?",
    opts: [
      "Goulburn",
      "Queanbeyan",
      "Canberra"
    ],
    a: 2,
    ua: "Яка столиця Австралійської столичної території?",
    uaOpts: [
      "Гулберн",
      "Куінбіян",
      "Канберра"
    ],
    exp: "The Australian Capital Territory is home to Canberra, the nation's capital. (Part 1)",
    uaExp: "В Австралійській столичній території розташована Канберра — столиця країни. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which is Australia's largest state?",
    opts: [
      "New South Wales",
      "Queensland",
      "Western Australia"
    ],
    a: 2,
    ua: "Який найбільший штат Австралії?",
    uaOpts: [
      "Новий Південний Уельс",
      "Квінсленд",
      "Західна Австралія"
    ],
    exp: "Western Australia is the largest state. (Part 1)",
    uaExp: "Західна Австралія — найбільший штат. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which is the second largest state?",
    opts: [
      "Queensland",
      "Victoria",
      "New South Wales"
    ],
    a: 0,
    ua: "Який другий за розміром штат?",
    uaOpts: [
      "Квінсленд",
      "Вікторія",
      "Новий Південний Уельс"
    ],
    exp: "Queensland is the second largest state. (Part 1)",
    uaExp: "Квінсленд — другий за розміром штат. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which is the smallest mainland state?",
    opts: [
      "South Australia",
      "Tasmania",
      "Victoria"
    ],
    a: 2,
    ua: "Який найменший материковий штат?",
    uaOpts: [
      "Південна Австралія",
      "Тасманія",
      "Вікторія"
    ],
    exp: "Victoria is the smallest of the mainland states. (Part 1)",
    uaExp: "Вікторія — найменший материковий штат. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which state is separated from the mainland by Bass Strait?",
    opts: [
      "Victoria",
      "Tasmania",
      "South Australia"
    ],
    a: 1,
    ua: "Який штат відокремлений від материка протокою Басса?",
    uaOpts: [
      "Вікторія",
      "Тасманія",
      "Південна Австралія"
    ],
    exp: "Tasmania is the smallest state, separated from the mainland by the Bass Strait. (Part 1)",
    uaExp: "Тасманія — найменший штат, відокремлений протокою Басса. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which national institutions are located in Canberra?",
    opts: [
      "The Opera House and Harbour Bridge",
      "Parliament House and the High Court",
      "The Reserve Bank and Stock Exchange"
    ],
    a: 1,
    ua: "Які національні установи розташовані в Канберрі?",
    uaOpts: [
      "Опера та міст Харбор-Брідж",
      "Будинок Парламенту та Верховний суд",
      "Резервний банк та Фондова біржа"
    ],
    exp: "Several national institutions are located in Canberra, including Parliament House and the High Court of Australia. (Part 1)",
    uaExp: "У Канберрі розташовані Будинок Парламенту та Верховний суд Австралії. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is a 'Welcome to Country'?",
    opts: [
      "A welcome by an Aboriginal or Torres Strait Islander custodian",
      "A government citizenship ceremony",
      "A national public holiday"
    ],
    a: 0,
    ua: "Що таке 'Welcome to Country'?",
    uaOpts: [
      "Вітання від аборигенного хранителя землі",
      "Урядова церемонія громадянства",
      "Національне державне свято"
    ],
    exp: "A Welcome to Country is performed by an Aboriginal or Torres Strait Islander custodian of the local region, welcoming visitors to their traditional land. (Part 1)",
    uaExp: "Welcome to Country виконує аборигенний хранитель місцевості, вітаючи гостей на традиційній землі. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Who can deliver an Acknowledgement of Country?",
    opts: [
      "Anyone",
      "Only an Aboriginal Elder",
      "Only a government official"
    ],
    a: 0,
    ua: "Хто може виголосити Acknowledgement of Country?",
    uaOpts: [
      "Будь-хто",
      "Лише старійшина аборигенів",
      "Лише урядовець"
    ],
    exp: "Anyone can deliver an Acknowledgement of Country. At events this is generally done by the Chair or MC. (Part 1)",
    uaExp: "Acknowledgement of Country може виголосити будь-хто. На заходах це зазвичай робить голова або ведучий. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does Australia Day commemorate?",
    opts: [
      "Federation in 1901",
      "The arrival of the First Fleet in 1788",
      "The Gallipoli landing"
    ],
    a: 1,
    ua: "Що відзначає День Австралії?",
    uaOpts: [
      "Федерацію 1901 року",
      "Прибуття Першого флоту у 1788 році",
      "Висадку в Галліполі"
    ],
    exp: "Australia Day on 26 January is the anniversary of the arrival of the First Fleet from Great Britain in 1788. (Part 1)",
    uaExp: "День Австралії 26 січня — річниця прибуття Першого флоту з Великої Британії у 1788 році. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "On what date is Australia Day?",
    opts: [
      "25 April",
      "26 January",
      "1 January"
    ],
    a: 1,
    ua: "Якого числа День Австралії?",
    uaOpts: [
      "25 квітня",
      "26 січня",
      "1 січня"
    ],
    exp: "Australia Day is celebrated on 26 January each year. (Part 1)",
    uaExp: "День Австралії відзначається 26 січня щороку. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the Prime Minister announce on Australia Day?",
    opts: [
      "The federal budget",
      "The election date",
      "The Australian of the Year Awards"
    ],
    a: 2,
    ua: "Що оголошує прем'єр-міністр у День Австралії?",
    uaOpts: [
      "Федеральний бюджет",
      "Дату виборів",
      "Нагороду 'Австралієць року'"
    ],
    exp: "During Australia Day celebrations, the Prime Minister announces the Australian of the Year Awards in Canberra. (Part 1)",
    uaExp: "Під час святкувань Дня Австралії прем'єр-міністр оголошує нагороду 'Австралієць року' в Канберрі. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "On what date is Anzac Day?",
    opts: [
      "11 November",
      "25 April",
      "26 January"
    ],
    a: 1,
    ua: "Якого числа День АНЗАК?",
    uaOpts: [
      "11 листопада",
      "25 квітня",
      "26 січня"
    ],
    exp: "Anzac Day is commemorated on 25 April each year. (Part 1)",
    uaExp: "День АНЗАК відзначається 25 квітня щороку. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does Anzac Day commemorate?",
    opts: [
      "The First Fleet's arrival",
      "Federation",
      "Australians who served and died in wars"
    ],
    a: 2,
    ua: "Що відзначає День АНЗАК?",
    uaOpts: [
      "Прибуття Першого флоту",
      "Федерацію",
      "Австралійців, які служили й загинули у війнах"
    ],
    exp: "On Anzac Day we remember the sacrifice of all Australians who served and died in wars, conflicts and peacekeeping operations. (Part 1)",
    uaExp: "У День АНЗАК ми вшановуємо жертву всіх австралійців, які служили й загинули у війнах та конфліктах. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Where did the Anzacs land on 25 April 1915?",
    opts: [
      "Gallipoli",
      "Egypt",
      "France"
    ],
    a: 0,
    ua: "Де висадилися АНЗАКи 25 квітня 1915 року?",
    uaOpts: [
      "Галліполі",
      "Єгипет",
      "Франція"
    ],
    exp: "Anzac Day is named after the Australian and New Zealand Army Corps, which landed at Gallipoli in Türkiye on 25 April 1915. (Part 1)",
    uaExp: "День АНЗАК названо на честь корпусу, що висадився у Галліполі (Туреччина) 25 квітня 1915 року. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are the colours of the Australian National Flag?",
    opts: [
      "Blue, white and red",
      "Black, red and yellow",
      "Green and gold"
    ],
    a: 0,
    ua: "Якого кольору Національний прапор Австралії?",
    uaOpts: [
      "Синій, білий і червоний",
      "Чорний, червоний і жовтий",
      "Зелений і золотий"
    ],
    exp: "The Australian National Flag is blue, white and red. (Part 1)",
    uaExp: "Національний прапор Австралії — синій, білий і червоний. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the Union Jack on the flag represent?",
    opts: [
      "The six states",
      "The Southern Cross",
      "British settlement history"
    ],
    a: 2,
    ua: "Що символізує Юніон Джек на прапорі?",
    uaOpts: [
      "Шість штатів",
      "Південний Хрест",
      "Історію британського заселення"
    ],
    exp: "The Union Jack represents our history of British settlement and the laws and institutions we inherited. (Part 1)",
    uaExp: "Юніон Джек символізує історію британського заселення та успадковані закони й інститути. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many points does the Commonwealth Star have?",
    opts: [
      "Five",
      "Seven",
      "Six"
    ],
    a: 1,
    ua: "Скільки кінців має Зірка Співдружності?",
    uaOpts: [
      "П'ять",
      "Сім",
      "Шість"
    ],
    exp: "The Commonwealth Star has seven points — one for each of the six states and one for the territories. (Part 1)",
    uaExp: "Зірка Співдружності має сім кінців — по одному на кожен з шести штатів і один для територій. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are the colours of the Australian Aboriginal Flag?",
    opts: [
      "Black, red and yellow",
      "Green, blue and white",
      "Blue, white and red"
    ],
    a: 0,
    ua: "Якого кольору прапор австралійських аборигенів?",
    uaOpts: [
      "Чорний, червоний і жовтий",
      "Зелений, синій і білий",
      "Синій, білий і червоний"
    ],
    exp: "The Australian Aboriginal Flag is black, red and yellow. (Part 1)",
    uaExp: "Прапор австралійських аборигенів — чорний, червоний і жовтий. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the yellow circle on the Aboriginal Flag represent?",
    opts: [
      "The earth",
      "The sun",
      "The people"
    ],
    a: 1,
    ua: "Що символізує жовте коло на прапорі аборигенів?",
    uaOpts: [
      "Землю",
      "Сонце",
      "Народ"
    ],
    exp: "On the Aboriginal Flag the yellow circle represents the sun. (Part 1)",
    uaExp: "На прапорі аборигенів жовте коло символізує сонце. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are the colours of the Torres Strait Islander Flag?",
    opts: [
      "Black, red and yellow",
      "Green, blue, black and white",
      "Blue, white and red"
    ],
    a: 1,
    ua: "Якого кольору прапор жителів Торресової протоки?",
    uaOpts: [
      "Чорний, червоний і жовтий",
      "Зелений, синій, чорний і білий",
      "Синій, білий і червоний"
    ],
    exp: "The Torres Strait Islander Flag is green, blue, black and white. (Part 1)",
    uaExp: "Прапор жителів Торресової протоки — зелений, синій, чорний і білий. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which two animals are on the Commonwealth Coat of Arms?",
    opts: [
      "A kangaroo and a koala",
      "A kangaroo and an emu",
      "An emu and a platypus"
    ],
    a: 1,
    ua: "Які дві тварини на Гербі Співдружності?",
    uaOpts: [
      "Кенгуру та коала",
      "Кенгуру та ему",
      "Ему та качконіс"
    ],
    exp: "A kangaroo and an emu support the shield on the Commonwealth Coat of Arms. Both are native Australian animals. (Part 1)",
    uaExp: "Кенгуру та ему підтримують щит на Гербі Співдружності. Обидві — корінні австралійські тварини. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national flower?",
    opts: [
      "The kangaroo paw",
      "The waratah",
      "The golden wattle"
    ],
    a: 2,
    ua: "Яка національна квітка Австралії?",
    uaOpts: [
      "Лапа кенгуру",
      "Варата",
      "Золота акація"
    ],
    exp: "Australia's national flower is the golden wattle. (Part 1)",
    uaExp: "Національна квітка Австралії — золота акація. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are Australia's national colours?",
    opts: [
      "Green and gold",
      "Red and gold",
      "Blue and white"
    ],
    a: 0,
    ua: "Які національні кольори Австралії?",
    uaOpts: [
      "Зелений і золотий",
      "Червоний і золотий",
      "Синій і білий"
    ],
    exp: "Australia's national colours are green and gold — the colours of the golden wattle. (Part 1)",
    uaExp: "Національні кольори Австралії — зелений і золотий, кольори золотої акації. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national gemstone?",
    opts: [
      "The diamond",
      "The opal",
      "The sapphire"
    ],
    a: 1,
    ua: "Який національний дорогоцінний камінь Австралії?",
    uaOpts: [
      "Діамант",
      "Опал",
      "Сапфір"
    ],
    exp: "The opal is Australia's national gemstone. (Part 1)",
    uaExp: "Опал — національний дорогоцінний камінь Австралії. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national anthem?",
    opts: [
      "Advance Australia Fair",
      "Waltzing Matilda",
      "God Save the King"
    ],
    a: 0,
    ua: "Який національний гімн Австралії?",
    uaOpts: [
      "Advance Australia Fair",
      "Waltzing Matilda",
      "God Save the King"
    ],
    exp: "'Advance Australia Fair' is Australia's national anthem. (Part 1)",
    uaExp: "'Advance Australia Fair' — національний гімн Австралії. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which heritage had a major influence on Australia's culture and politics?",
    opts: [
      "French and Dutch",
      "Spanish and Portuguese",
      "British and Irish"
    ],
    a: 2,
    ua: "Яка спадщина суттєво вплинула на культуру й політику Австралії?",
    uaOpts: [
      "Французька та нідерландська",
      "Іспанська та португальська",
      "Британська та ірландська"
    ],
    exp: "Early free settlers came from Great Britain and Ireland, and this heritage has had a major influence on Australia's history, culture and politics. (Part 1)",
    uaExp: "Перші вільні поселенці прибули з Британії та Ірландії, і ця спадщина суттєво вплинула на історію, культуру й політику. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many distinct Aboriginal and Torres Strait Islander languages exist?",
    opts: [
      "About 50",
      "About 20",
      "More than 100"
    ],
    a: 2,
    ua: "Скільки існує окремих аборигенних мов та мов Торресової протоки?",
    uaOpts: [
      "Близько 50",
      "Близько 20",
      "Понад 100"
    ],
    exp: "Other languages are valued in Australia, including more than 100 distinct Aboriginal and Torres Strait Islander languages. (Part 1)",
    uaExp: "В Австралії цінують й інші мови, включно з понад 100 окремими аборигенними мовами та мовами Торресової протоки. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Where are Torres Strait Islander people from?",
    opts: [
      "Islands north of Queensland",
      "Tasmania",
      "The central desert"
    ],
    a: 0,
    ua: "Звідки походять жителі Торресової протоки?",
    uaOpts: [
      "Острови на північ від Квінсленду",
      "Тасманія",
      "Центральна пустеля"
    ],
    exp: "Torres Strait Islander people are from islands between the northern tip of Queensland and Papua New Guinea. (Part 1)",
    uaExp: "Жителі Торресової протоки походять з островів між північним краєм Квінсленду та Папуа Новою Гвінеєю. (Частина 1)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What type of government does Australia have?",
    opts: [
      "Presidential republic",
      "Absolute monarchy",
      "Parliamentary democracy"
    ],
    a: 2,
    ua: "Який тип уряду в Австралії?",
    uaOpts: [
      "Президентська республіка",
      "Абсолютна монархія",
      "Парламентська демократія"
    ],
    exp: "Australia's system of government is a parliamentary democracy. (Part 2)",
    uaExp: "Австралія має парламентську демократію. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Where does the power of government come from?",
    opts: [
      "The Australian people",
      "The King",
      "The Governor-General"
    ],
    a: 0,
    ua: "Звідки походить влада уряду?",
    uaOpts: [
      "Від австралійського народу",
      "Від Короля",
      "Від Генерал-губернатора"
    ],
    exp: "The power of the government comes from the Australian people, because citizens vote for people to represent them in parliament. (Part 2)",
    uaExp: "Влада уряду походить від австралійського народу, бо громадяни обирають представників до парламенту. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does the Rule of Law mean?",
    opts: [
      "Police are above the law",
      "The King can change any law",
      "No one is above the law"
    ],
    a: 2,
    ua: "Що означає верховенство права?",
    uaOpts: [
      "Поліція стоїть вище закону",
      "Король може змінити будь-який закон",
      "Ніхто не стоїть вище закону"
    ],
    exp: "The Rule of Law means no person, group or religious rule is above the law. Everyone must obey Australia's laws. (Part 2)",
    uaExp: "Верховенство права означає, що ніхто не стоїть вище закону. Усі мають дотримуватись законів Австралії. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "How do Australians believe change should occur?",
    opts: [
      "Through peaceful, democratic means",
      "Only through the courts",
      "Through violence if needed"
    ],
    a: 0,
    ua: "Як, на думку австралійців, мають відбуватися зміни?",
    uaOpts: [
      "Мирним, демократичним шляхом",
      "Лише через суди",
      "Насиллям за потреби"
    ],
    exp: "Australians believe change should occur through discussion, peaceful persuasion and the democratic process. We reject violence. (Part 2)",
    uaExp: "Австралійці вважають, що зміни мають відбуватися через обговорення, мирне переконання та демократичний процес. Насилля відкидається. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does freedom of speech allow?",
    opts: [
      "Only praising the government",
      "Saying anything with no limits",
      "Saying and writing what you think, within the law"
    ],
    a: 2,
    ua: "Що дозволяє свобода слова?",
    uaOpts: [
      "Лише хвалити уряд",
      "Говорити будь-що без обмежень",
      "Говорити й писати, що думаєш, у межах закону"
    ],
    exp: "Freedom of speech means people can say and write what they think and criticise the government, so long as they obey Australian laws. (Part 2)",
    uaExp: "Свобода слова дозволяє говорити й писати, що думаєш, і критикувати уряд, дотримуючись законів. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is freedom of association?",
    opts: [
      "The right to form illegal groups",
      "The right to force others to join",
      "The right to join or leave any legal group"
    ],
    a: 2,
    ua: "Що таке свобода об'єднань?",
    uaOpts: [
      "Право створювати незаконні групи",
      "Право змушувати інших вступати",
      "Право вступати чи виходити з будь-якої законної групи"
    ],
    exp: "Freedom of association is the right to form and join legal organisations. People cannot be forced to join or leave. (Part 2)",
    uaExp: "Свобода об'єднань — право створювати й вступати до законних організацій. Нікого не можна змусити вступити чи вийти. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Does Australia have an official national religion?",
    opts: [
      "No",
      "Yes, Christianity",
      "Yes, the Church of England"
    ],
    a: 0,
    ua: "Чи має Австралія офіційну національну релігію?",
    uaOpts: [
      "Ні",
      "Так, християнство",
      "Так, Англіканську церкву"
    ],
    exp: "Australia has no official national religion. The government is secular and people are free to follow any religion or none. (Part 2)",
    uaExp: "Австралія не має офіційної релігії. Уряд світський, люди вільні сповідувати будь-яку релігію або жодну. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "If a religious practice conflicts with Australian law, which prevails?",
    opts: [
      "Australian law",
      "The religious practice",
      "Whichever the person chooses"
    ],
    a: 0,
    ua: "Якщо релігійна практика суперечить австралійському закону, що має перевагу?",
    uaOpts: [
      "Австралійський закон",
      "Релігійна практика",
      "Те, що обере людина"
    ],
    exp: "Where there is a conflict between Australian law and a religious practice, Australian law prevails. (Part 2)",
    uaExp: "У разі конфлікту між австралійським законом і релігійною практикою перевагу має закон. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does gender equality mean in Australia?",
    opts: [
      "Men and women have equal rights",
      "Men have more rights",
      "Women must obey men"
    ],
    a: 0,
    ua: "Що означає гендерна рівність в Австралії?",
    uaOpts: [
      "Чоловіки й жінки мають рівні права",
      "Чоловіки мають більше прав",
      "Жінки мають коритися чоловікам"
    ],
    exp: "Men and women have equal rights in Australia. It is against the law to discriminate because of gender. (Part 2)",
    uaExp: "Чоловіки й жінки мають рівні права. Дискримінація за статтю незаконна. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does a 'fair go' mean?",
    opts: [
      "Only the wealthy succeed",
      "Success comes from effort, not background",
      "Everyone earns the same"
    ],
    a: 1,
    ua: "Що означає 'fair go'?",
    uaOpts: [
      "Успіху досягають лише багаті",
      "Успіх залежить від зусиль, а не походження",
      "Усі заробляють однаково"
    ],
    exp: "A 'fair go' means what someone achieves should result from their talents and effort, not their wealth or background. (Part 2)",
    uaExp: "'Fair go' означає, що досягнення мають залежати від таланту й зусиль, а не багатства чи походження. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which is a responsibility of Australian citizens?",
    opts: [
      "Asking for consular help",
      "Applying for a passport",
      "Voting in elections"
    ],
    a: 2,
    ua: "Що є обов'язком громадян Австралії?",
    uaOpts: [
      "Звернення за консульською допомогою",
      "Подання на паспорт",
      "Голосування на виборах"
    ],
    exp: "Responsibilities include obeying laws, voting, defending Australia if needed, and jury service. A passport and consular help are privileges. (Part 2)",
    uaExp: "Обов'язки: дотримання законів, голосування, оборона за потреби, служба в журі. Паспорт і консульська допомога — привілеї. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which is a privilege of Australian citizenship?",
    opts: [
      "Obeying the law",
      "Defending Australia",
      "Applying for an Australian passport"
    ],
    a: 2,
    ua: "Що є привілеєм громадянства Австралії?",
    uaOpts: [
      "Дотримання закону",
      "Оборона Австралії",
      "Подання на австралійський паспорт"
    ],
    exp: "Privileges include applying for a passport, seeking election, and consular help. Obeying the law and defending Australia are responsibilities. (Part 2)",
    uaExp: "Привілеї: подання на паспорт, балотування, консульська допомога. Дотримання закону й оборона — обов'язки. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Is voting compulsory in federal elections?",
    opts: [
      "No",
      "Only for people born in Australia",
      "Yes"
    ],
    a: 2,
    ua: "Чи обов'язкове голосування на федеральних виборах?",
    uaOpts: [
      "Ні",
      "Лише для народжених в Австралії",
      "Так"
    ],
    exp: "Voting is compulsory in federal and state or territory elections for citizens aged 18 or over. (Part 2)",
    uaExp: "Голосування на федеральних і штатних виборах обов'язкове для громадян від 18 років. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is a jury?",
    opts: [
      "A group of judges",
      "Ordinary citizens who decide guilt in court",
      "A panel of lawyers"
    ],
    a: 1,
    ua: "Що таке журі присяжних?",
    uaOpts: [
      "Група суддів",
      "Звичайні громадяни, що вирішують винність у суді",
      "Колегія адвокатів"
    ],
    exp: "A jury is a group of ordinary Australian citizens who listen to evidence and decide if a person is guilty or not guilty. (Part 2)",
    uaExp: "Журі — група звичайних громадян, які слухають докази й вирішують, винна особа чи ні. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Who can serve on a jury?",
    opts: [
      "Citizens aged 18 or over on the electoral roll",
      "Any resident",
      "Only lawyers"
    ],
    a: 0,
    ua: "Хто може засідати в журі?",
    uaOpts: [
      "Громадяни від 18 років у виборчому списку",
      "Будь-який мешканець",
      "Лише юристи"
    ],
    exp: "Australian citizens aged 18 or over who are on the electoral roll can be called to serve on a jury. (Part 2)",
    uaExp: "Громадяни від 18 років, внесені до виборчого списку, можуть бути викликані до журі. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Who can seek election to parliament?",
    opts: [
      "Any permanent resident",
      "Citizens aged 18+ who are not dual citizens",
      "Anyone aged 16 or over"
    ],
    a: 1,
    ua: "Хто може балотуватися до парламенту?",
    uaOpts: [
      "Будь-який постійний резидент",
      "Громадяни від 18 років без подвійного громадянства",
      "Будь-хто від 16 років"
    ],
    exp: "Australian citizens aged 18 or over who are not dual citizens can seek election to parliament. (Part 2)",
    uaExp: "Балотуватися можуть громадяни від 18 років без подвійного громадянства. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Is paying tax required in Australia?",
    opts: [
      "Yes, it is required by law",
      "Only businesses pay tax",
      "No, it is voluntary"
    ],
    a: 0,
    ua: "Чи обов'язкова сплата податків в Австралії?",
    uaOpts: [
      "Так, це вимагається законом",
      "Податки платять лише підприємства",
      "Ні, це добровільно"
    ],
    exp: "Paying tax is required by law and is an important way you contribute to the community. It is collected by the ATO. (Part 2)",
    uaExp: "Сплата податків вимагається законом і є важливим внеском у суспільство. Збирає їх ATO. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which body collects taxes in Australia?",
    opts: [
      "The Australian Taxation Office (ATO)",
      "The Australian Electoral Commission",
      "The Reserve Bank"
    ],
    a: 0,
    ua: "Який орган збирає податки в Австралії?",
    uaOpts: [
      "Австралійське податкове управління (ATO)",
      "Австралійська виборча комісія",
      "Резервний банк"
    ],
    exp: "Tax is collected by the Australian Taxation Office (ATO) from both businesses and individuals. (Part 2)",
    uaExp: "Податки збирає Австралійське податкове управління (ATO) з підприємств і приватних осіб. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What are taxes used to pay for?",
    opts: [
      "Healthcare, education, roads and defence",
      "Only politicians' salaries",
      "Only the royal family"
    ],
    a: 0,
    ua: "На що витрачаються податки?",
    uaOpts: [
      "Охорона здоров'я, освіта, дороги й оборона",
      "Лише зарплати політиків",
      "Лише королівська родина"
    ],
    exp: "Taxes are spent on services including healthcare, education, defence, roads and railways, and social security. (Part 2)",
    uaExp: "Податки витрачаються на охорону здоров'я, освіту, оборону, дороги й соціальне забезпечення. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Who must obey Australia's laws?",
    opts: [
      "Only ordinary citizens",
      "Everyone, including leaders and police",
      "Only non-citizens"
    ],
    a: 1,
    ua: "Хто має дотримуватися законів Австралії?",
    uaOpts: [
      "Лише звичайні громадяни",
      "Усі, включно з лідерами й поліцією",
      "Лише негромадяни"
    ],
    exp: "Everyone, including government, community and religious leaders, business people and the police, must obey Australia's laws. (Part 2)",
    uaExp: "Усі — уряд, лідери громад і релігій, бізнесмени й поліція — мають дотримуватись законів. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Can you ask for help from an Australian official while overseas?",
    opts: [
      "No, never",
      "Yes, consular assistance",
      "Only if you pay a fee"
    ],
    a: 1,
    ua: "Чи можна просити допомоги в австралійського чиновника за кордоном?",
    uaOpts: [
      "Ні, ніколи",
      "Так, консульська допомога",
      "Лише за плату"
    ],
    exp: "While overseas, Australian citizens can ask for consular assistance from an Australian official in times of need. (Part 2)",
    uaExp: "За кордоном громадяни можуть звертатися за консульською допомогою до австралійського чиновника. (Частина 2)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who is Australia's Head of State?",
    opts: [
      "The King of Australia",
      "The Prime Minister",
      "The Governor-General"
    ],
    a: 0,
    ua: "Хто є главою держави Австралії?",
    uaOpts: [
      "Король Австралії",
      "Прем'єр-міністр",
      "Генерал-губернатор"
    ],
    exp: "Australia's Head of State is the King of Australia, His Majesty King Charles III. (Part 3)",
    uaExp: "Главою держави Австралії є Король Австралії, Його Величність Король Чарльз III. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who represents the King in Australia?",
    opts: [
      "The Governor-General",
      "The Prime Minister",
      "The Chief Justice"
    ],
    a: 0,
    ua: "Хто представляє Короля в Австралії?",
    uaOpts: [
      "Генерал-губернатор",
      "Прем'єр-міністр",
      "Головний суддя"
    ],
    exp: "The King appoints the Governor-General as his representative in Australia, on the advice of the Prime Minister. (Part 3)",
    uaExp: "Король призначає Генерал-губернатора своїм представником в Австралії за порадою прем'єр-міністра. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What kind of monarchy is Australia?",
    opts: [
      "An elected monarchy",
      "An absolute monarchy",
      "A constitutional monarchy"
    ],
    a: 2,
    ua: "Якою монархією є Австралія?",
    uaOpts: [
      "Виборною монархією",
      "Абсолютною монархією",
      "Конституційною монархією"
    ],
    exp: "Australia is a constitutional monarchy: the King is Head of State but must act in accordance with the Constitution. (Part 3)",
    uaExp: "Австралія — конституційна монархія: Король є главою держави, але має діяти згідно з Конституцією. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who is the leader of the Australian Government?",
    opts: [
      "The Governor-General",
      "The Prime Minister",
      "The King"
    ],
    a: 1,
    ua: "Хто є лідером австралійського уряду?",
    uaOpts: [
      "Генерал-губернатор",
      "Прем'єр-міністр",
      "Король"
    ],
    exp: "In the Australian system, the leader of the Australian Government is the Prime Minister. (Part 3)",
    uaExp: "В австралійській системі лідером уряду є прем'єр-міністр. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How is the Prime Minister chosen?",
    opts: [
      "Directly elected by all voters",
      "Leader of the majority party in the House of Representatives",
      "Appointed by the King"
    ],
    a: 1,
    ua: "Як обирають прем'єр-міністра?",
    uaOpts: [
      "Прямо обирається всіма виборцями",
      "Лідер партії більшості в Палаті представників",
      "Призначається Королем"
    ],
    exp: "The Government is formed by the party or coalition with the majority in the House of Representatives, and its leader becomes Prime Minister. (Part 3)",
    uaExp: "Уряд формує партія чи коаліція з більшістю в Палаті представників, а її лідер стає прем'єр-міністром. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What are the two houses of the Australian Parliament?",
    opts: [
      "House of Representatives and Senate",
      "House of Commons and House of Lords",
      "Upper Court and Lower Court"
    ],
    a: 0,
    ua: "Які дві палати австралійського парламенту?",
    uaOpts: [
      "Палата представників і Сенат",
      "Палата громад і Палата лордів",
      "Верхній суд і Нижній суд"
    ],
    exp: "The Australian Parliament consists of the House of Representatives and the Senate. (Part 3)",
    uaExp: "Австралійський парламент складається з Палати представників і Сенату. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How many senators are there in total?",
    opts: [
      "72",
      "76",
      "150"
    ],
    a: 1,
    ua: "Скільки всього сенаторів?",
    uaOpts: [
      "72",
      "76",
      "150"
    ],
    exp: "There is a total of 76 senators. Each state elects 12, and the ACT and NT elect two each. (Part 3)",
    uaExp: "Усього 76 сенаторів. Кожен штат обирає 12, а АСТ і ПТ — по два. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How many senators does each state elect?",
    opts: [
      "6",
      "12",
      "2"
    ],
    a: 1,
    ua: "Скільки сенаторів обирає кожен штат?",
    uaOpts: [
      "6",
      "12",
      "2"
    ],
    exp: "Each state elects 12 senators to the Senate, regardless of its size or population. (Part 3)",
    uaExp: "Кожен штат обирає 12 сенаторів незалежно від розміру чи населення. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How many senators does each mainland territory elect?",
    opts: [
      "2",
      "12",
      "6"
    ],
    a: 0,
    ua: "Скільки сенаторів обирає кожна материкова територія?",
    uaOpts: [
      "2",
      "12",
      "6"
    ],
    exp: "The Australian Capital Territory and the Northern Territory elect two senators each. (Part 3)",
    uaExp: "АСТ і Північна Територія обирають по два сенатори. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How many members are in the House of Representatives?",
    opts: [
      "About 76",
      "Over 150",
      "About 50"
    ],
    a: 1,
    ua: "Скільки членів у Палаті представників?",
    uaOpts: [
      "Близько 76",
      "Понад 150",
      "Близько 50"
    ],
    exp: "Overall, there are over 150 members elected to the House of Representatives. (Part 3)",
    uaExp: "Загалом до Палати представників обрано понад 150 членів. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is another name for the House of Representatives?",
    opts: [
      "The House of Review",
      "The States' House",
      "The Lower House"
    ],
    a: 2,
    ua: "Яка інша назва Палати представників?",
    uaOpts: [
      "Ревізійна палата",
      "Палата штатів",
      "Нижня палата"
    ],
    exp: "Other names for the House of Representatives are the Lower House or the People's House. (Part 3)",
    uaExp: "Інші назви Палати представників — Нижня палата або Палата народу. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is another name for the Senate?",
    opts: [
      "The People's House",
      "The Lower House",
      "The Upper House"
    ],
    a: 2,
    ua: "Яка інша назва Сенату?",
    uaOpts: [
      "Палата народу",
      "Нижня палата",
      "Верхня палата"
    ],
    exp: "The Senate is sometimes called the Upper House, the House of Review or the States' House. (Part 3)",
    uaExp: "Сенат іноді називають Верхньою палатою, Ревізійною палатою або Палатою штатів. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What are the three levels of government?",
    opts: [
      "Federal, state/territory and local",
      "Federal, regional and city",
      "National, county and town"
    ],
    a: 0,
    ua: "Які три рівні урядування?",
    uaOpts: [
      "Федеральний, штатний/територіальний і місцевий",
      "Федеральний, регіональний і міський",
      "Національний, окружний і селищний"
    ],
    exp: "Australia has three levels of government: federal, state/territory and local. (Part 3)",
    uaExp: "Австралія має три рівні урядування: федеральний, штатний/територіальний і місцевий. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level is responsible for defence and immigration?",
    opts: [
      "Local councils",
      "The federal government",
      "State governments"
    ],
    a: 1,
    ua: "Який рівень відповідає за оборону й імміграцію?",
    uaOpts: [
      "Місцеві ради",
      "Федеральний уряд",
      "Уряди штатів"
    ],
    exp: "The Australian (federal) Government is responsible for matters such as defence, immigration, taxation and foreign affairs. (Part 3)",
    uaExp: "Федеральний уряд відповідає за оборону, імміграцію, податки й зовнішні справи. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level is responsible for hospitals and schools?",
    opts: [
      "Local councils",
      "The federal government",
      "State and territory governments"
    ],
    a: 2,
    ua: "Який рівень відповідає за лікарні та школи?",
    uaOpts: [
      "Місцеві ради",
      "Федеральний уряд",
      "Уряди штатів і територій"
    ],
    exp: "State and territory governments are responsible for hospitals, schools, police, roads and public transport. (Part 3)",
    uaExp: "Уряди штатів і територій відповідають за лікарні, школи, поліцію, дороги й транспорт. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level is responsible for rubbish collection and local roads?",
    opts: [
      "The federal government",
      "Local government",
      "State government"
    ],
    a: 1,
    ua: "Який рівень відповідає за збір сміття й місцеві дороги?",
    uaOpts: [
      "Федеральний уряд",
      "Місцеве самоврядування",
      "Уряд штату"
    ],
    exp: "Local governments are responsible for local roads, rubbish collection, parks, libraries and building permits. (Part 3)",
    uaExp: "Місцеве самоврядування відповідає за місцеві дороги, збір сміття, парки, бібліотеки й дозволи на будівництво. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the leader of a state government called?",
    opts: [
      "The Prime Minister",
      "The Chief Minister",
      "The Premier"
    ],
    a: 2,
    ua: "Як називається лідер уряду штату?",
    uaOpts: [
      "Прем'єр-міністр",
      "Головний міністр",
      "Прем'єр (Premier)"
    ],
    exp: "The leader of a state government is the Premier. (Part 3)",
    uaExp: "Лідер уряду штату — Прем'єр (Premier). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the leader of a territory government called?",
    opts: [
      "The Premier",
      "The Chief Minister",
      "The Governor"
    ],
    a: 1,
    ua: "Як називається лідер уряду території?",
    uaOpts: [
      "Прем'єр (Premier)",
      "Головний міністр (Chief Minister)",
      "Губернатор"
    ],
    exp: "The leader of a territory government is the Chief Minister. (Part 3)",
    uaExp: "Лідер уряду території — Головний міністр (Chief Minister). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who represents the King in each state?",
    opts: [
      "An Administrator",
      "A Premier",
      "A Governor"
    ],
    a: 2,
    ua: "Хто представляє Короля в кожному штаті?",
    uaOpts: [
      "Адміністратор",
      "Прем'єр",
      "Губернатор"
    ],
    exp: "In each state, a Governor represents the King of Australia. (Part 3)",
    uaExp: "У кожному штаті Короля Австралії представляє губернатор. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the leader of a local government called?",
    opts: [
      "Premier",
      "Chief Minister",
      "Mayor or Shire President"
    ],
    a: 2,
    ua: "Як називається лідер місцевого самоврядування?",
    uaOpts: [
      "Прем'єр",
      "Головний міністр",
      "Мер або голова округу"
    ],
    exp: "The leader of a local government is the Mayor or Shire President. (Part 3)",
    uaExp: "Лідер місцевого самоврядування — мер або голова округу (Shire President). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the Australian Constitution?",
    opts: [
      "A list of all laws",
      "The national anthem",
      "The legal document setting out rules for government"
    ],
    a: 2,
    ua: "Що таке Конституція Австралії?",
    uaOpts: [
      "Перелік усіх законів",
      "Національний гімн",
      "Правовий документ із правилами врядування"
    ],
    exp: "The Australian Constitution is the legal document that sets out the basic rules for the government of Australia. (Part 3)",
    uaExp: "Конституція Австралії — правовий документ, що встановлює базові правила врядування. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How can the Australian Constitution be changed?",
    opts: [
      "By the Prime Minister alone",
      "By a referendum",
      "By the High Court"
    ],
    a: 1,
    ua: "Як можна змінити Конституцію Австралії?",
    uaOpts: [
      "Лише прем'єр-міністром",
      "Через референдум",
      "Верховним судом"
    ],
    exp: "The Australian people can change the Constitution by voting in a referendum. (Part 3)",
    uaExp: "Австралійці можуть змінити Конституцію, проголосувавши на референдумі. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is needed for a referendum to succeed?",
    opts: [
      "A double majority",
      "Approval by the King",
      "A simple majority of voters"
    ],
    a: 0,
    ua: "Що потрібно для успіху референдуму?",
    uaOpts: [
      "Подвійна більшість",
      "Схвалення Короля",
      "Проста більшість виборців"
    ],
    exp: "A referendum needs a 'double majority': a majority of voters nationally and a majority of voters in a majority of states. (Part 3)",
    uaExp: "Референдуму потрібна подвійна більшість: більшість виборців по країні й більшість у більшості штатів. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the highest court in Australia?",
    opts: [
      "The Federal Court",
      "The Supreme Court",
      "The High Court of Australia"
    ],
    a: 2,
    ua: "Який найвищий суд в Австралії?",
    uaOpts: [
      "Федеральний суд",
      "Вищий суд штату",
      "Верховний суд Австралії"
    ],
    exp: "The High Court of Australia has the ultimate power to apply and interpret the laws of Australia. (Part 3)",
    uaExp: "Верховний суд Австралії має найвищу владу застосовувати й тлумачити закони. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Into which three powers does the Constitution divide government?",
    opts: [
      "Legislative, executive and judicial",
      "Federal, state and local",
      "King, Parliament and people"
    ],
    a: 0,
    ua: "На які три влади Конституція ділить уряд?",
    uaOpts: [
      "Законодавчу, виконавчу й судову",
      "Федеральну, штатну й місцеву",
      "Короля, Парламент і народ"
    ],
    exp: "The Constitution divides power between the legislative (Parliament), executive (PM and Cabinet) and judicial (judges) powers. (Part 3)",
    uaExp: "Конституція ділить владу між законодавчою (Парламент), виконавчою (прем'єр і Кабінет) і судовою (судді). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is legislative power?",
    opts: [
      "The power to make laws",
      "The power to enforce laws",
      "The power to interpret laws"
    ],
    a: 0,
    ua: "Що таке законодавча влада?",
    uaOpts: [
      "Влада ухвалювати закони",
      "Влада виконувати закони",
      "Влада тлумачити закони"
    ],
    exp: "Legislative power is the power to make laws. Parliament has this power. (Part 3)",
    uaExp: "Законодавча влада — це влада ухвалювати закони. Її має Парламент. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is executive power?",
    opts: [
      "The power to put laws into practice",
      "The power to judge laws",
      "The power to make laws"
    ],
    a: 0,
    ua: "Що таке виконавча влада?",
    uaOpts: [
      "Влада втілювати закони в життя",
      "Влада судити за законами",
      "Влада ухвалювати закони"
    ],
    exp: "Executive power is the power to put laws into practice. It includes the Prime Minister, ministers and the Governor-General. (Part 3)",
    uaExp: "Виконавча влада — це влада втілювати закони в життя. Включає прем'єра, міністрів і Генерал-губернатора. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who has judicial power?",
    opts: [
      "The Prime Minister",
      "Parliament",
      "Judges"
    ],
    a: 2,
    ua: "Хто має судову владу?",
    uaOpts: [
      "Прем'єр-міністр",
      "Парламент",
      "Судді"
    ],
    exp: "Judges have judicial power: the power to interpret and apply the law. Courts are independent of parliament and government. (Part 3)",
    uaExp: "Судді мають судову владу: тлумачити й застосовувати закон. Суди незалежні від парламенту й уряду. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What does 'Royal Assent' mean?",
    opts: [
      "The King vetoes a law",
      "Parliament votes on a Bill",
      "The Governor-General signs a Bill into law"
    ],
    a: 2,
    ua: "Що означає 'Королівська згода' (Royal Assent)?",
    uaOpts: [
      "Король накладає вето на закон",
      "Парламент голосує за законопроект",
      "Генерал-губернатор підписує законопроект у закон"
    ],
    exp: "The Governor-General signs a Bill so it becomes law — this is called Royal Assent. (Part 3)",
    uaExp: "Генерал-губернатор підписує законопроект, і той стає законом — це Королівська згода. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is a proposed new law called before it is passed?",
    opts: [
      "A referendum",
      "A Bill",
      "An Act"
    ],
    a: 1,
    ua: "Як називається запропонований новий закон до ухвалення?",
    uaOpts: [
      "Референдум",
      "Законопроект (Bill)",
      "Акт"
    ],
    exp: "If a member of Parliament proposes a new law or a change, the proposal is called a 'Bill'. (Part 3)",
    uaExp: "Якщо член Парламенту пропонує новий закон, ця пропозиція називається законопроектом (Bill). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which body conducts federal elections?",
    opts: [
      "The High Court",
      "The Australian Electoral Commission (AEC)",
      "The Prime Minister's office"
    ],
    a: 1,
    ua: "Який орган проводить федеральні вибори?",
    uaOpts: [
      "Верховний суд",
      "Австралійська виборча комісія (AEC)",
      "Офіс прем'єр-міністра"
    ],
    exp: "The Australian Electoral Commission (AEC) conducts federal elections and referendums and is independent of the government. (Part 3)",
    uaExp: "Австралійська виборча комісія (AEC) проводить федеральні вибори й референдуми та незалежна від уряду. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How is voting conducted in Australian elections?",
    opts: [
      "By a show of hands",
      "By secret ballot",
      "By public declaration"
    ],
    a: 1,
    ua: "Як проводиться голосування на виборах в Австралії?",
    uaOpts: [
      "Підняттям рук",
      "Таємним бюлетенем",
      "Публічною заявою"
    ],
    exp: "Voting is by secret ballot, so no one is allowed to know whom you voted for unless you tell them. (Part 3)",
    uaExp: "Голосування таємне, тож ніхто не має права знати, за кого ви голосували, якщо ви самі не скажете. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What may happen if you don't vote without a good reason?",
    opts: [
      "You lose citizenship",
      "Nothing",
      "You may have to pay a fine"
    ],
    a: 2,
    ua: "Що може статися, якщо не проголосувати без поважної причини?",
    uaOpts: [
      "Втрата громадянства",
      "Нічого",
      "Можливо, доведеться сплатити штраф"
    ],
    exp: "If you do not vote and do not have a good reason, you may have to pay a fine. (Part 3)",
    uaExp: "Якщо не проголосувати без поважної причини, можливо, доведеться сплатити штраф. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Are the courts in Australia independent?",
    opts: [
      "No, the government controls them",
      "Yes",
      "Only state courts are"
    ],
    a: 1,
    ua: "Чи незалежні суди в Австралії?",
    uaOpts: [
      "Ні, ними керує уряд",
      "Так",
      "Лише суди штатів"
    ],
    exp: "The courts in Australia are independent. No one can tell a judge or magistrate what to decide. (Part 3)",
    uaExp: "Суди в Австралії незалежні. Ніхто не може вказувати судді, що вирішувати. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "In Australia's court system, a person is considered:",
    opts: [
      "Guilty until proven innocent",
      "Always guilty if charged",
      "Innocent until proven guilty"
    ],
    a: 2,
    ua: "У судовій системі Австралії особа вважається:",
    uaOpts: [
      "Винною, доки не доведено невинність",
      "Завжди винною, якщо обвинувачено",
      "Невинною, доки не доведено провину"
    ],
    exp: "In Australia's court system, people are considered innocent until they are found guilty in a court. (Part 3)",
    uaExp: "У судовій системі Австралії особа вважається невинною, доки суд не визнає її винною. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Are the police independent of the government?",
    opts: [
      "Only the federal police are",
      "No, politicians direct them",
      "Yes"
    ],
    a: 2,
    ua: "Чи незалежна поліція від уряду?",
    uaOpts: [
      "Лише федеральна поліція",
      "Ні, ними керують політики",
      "Так"
    ],
    exp: "The police are independent of the government. They protect life and property and maintain order. (Part 3)",
    uaExp: "Поліція незалежна від уряду. Вона захищає життя й майно та підтримує порядок. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is Australia's national police force called?",
    opts: [
      "The State Guard",
      "The National Militia",
      "The Australian Federal Police (AFP)"
    ],
    a: 2,
    ua: "Як називається національна поліція Австралії?",
    uaOpts: [
      "Національна гвардія",
      "Національна міліція",
      "Австралійська федеральна поліція (AFP)"
    ],
    exp: "Australia has a national police force called the Australian Federal Police (AFP), which investigates crimes against federal laws. (Part 3)",
    uaExp: "Австралія має національну поліцію — Австралійську федеральну поліцію (AFP), що розслідує злочини проти федеральних законів. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Is it a crime to offer a bribe to police in Australia?",
    opts: [
      "Yes, it is a serious crime",
      "Only if the police accept it",
      "No, it is allowed"
    ],
    a: 0,
    ua: "Чи є злочином пропонувати хабар поліції в Австралії?",
    uaOpts: [
      "Так, це серйозний злочин",
      "Лише якщо поліція візьме",
      "Ні, це дозволено"
    ],
    exp: "In Australia it is a serious crime to bribe the police. It is a crime to even offer a bribe to a police officer. (Part 3)",
    uaExp: "В Австралії хабар поліції — серйозний злочин. Навіть пропозиція хабаря є злочином. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Is ignorance of the law an excuse in Australia?",
    opts: [
      "Yes",
      "Only for new migrants",
      "No"
    ],
    a: 2,
    ua: "Чи є незнання закону виправданням в Австралії?",
    uaOpts: [
      "Так",
      "Лише для нових мігрантів",
      "Ні"
    ],
    exp: "If you break a law you did not know about, you could still be charged — not knowing the law is no excuse. (Part 3)",
    uaExp: "Якщо порушити закон, про який ви не знали, вас все одно можуть обвинуватити — незнання закону не виправдання. (Частина 3)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Under the Rule of Law, who is above the law?",
    opts: [
      "No one",
      "The King",
      "Religious leaders"
    ],
    a: 0,
    ua: "За верховенством права, хто стоїть вище закону?",
    uaOpts: [
      "Ніхто",
      "Король",
      "Релігійні лідери"
    ],
    exp: "Under the Rule of Law, all Australians are equal and no person or group is above the law. (Part 4)",
    uaExp: "За верховенством права всі австралійці рівні, і ніхто не стоїть вище закону. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Should you follow the law even if no one is watching?",
    opts: [
      "Only in public",
      "No",
      "Yes"
    ],
    a: 2,
    ua: "Чи слід дотримуватися закону, навіть коли ніхто не бачить?",
    uaOpts: [
      "Лише на людях",
      "Ні",
      "Так"
    ],
    exp: "In Australia, everybody should obey the law and not break it at any time. You should follow the law even if no one is watching. (Part 4)",
    uaExp: "В Австралії кожен має дотримуватися закону завжди. Слід дотримуватися закону, навіть коли ніхто не бачить. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Do Australian laws apply regardless of your background or culture?",
    opts: [
      "Only to citizens",
      "Yes",
      "No"
    ],
    a: 1,
    ua: "Чи діють австралійські закони незалежно від походження чи культури?",
    uaOpts: [
      "Лише для громадян",
      "Так",
      "Ні"
    ],
    exp: "Australian laws apply to all people in Australia. Regardless of your background or culture, you must follow Australian laws. (Part 4)",
    uaExp: "Австралійські закони діють для всіх в Австралії. Незалежно від походження чи культури, ви маєте їх дотримуватись. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is voting compulsory in Australia?",
    opts: [
      "No",
      "Only in referendums",
      "Yes"
    ],
    a: 2,
    ua: "Чи обов'язкове голосування в Австралії?",
    uaOpts: [
      "Ні",
      "Лише на референдумах",
      "Так"
    ],
    exp: "Voting is compulsory in Australia. This shows the importance of participating in elections. (Part 4)",
    uaExp: "Голосування в Австралії обов'язкове. Це показує важливість участі у виборах. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is it ever acceptable to promote violence against a group?",
    opts: [
      "No, never",
      "Yes, if provoked",
      "Yes, during protests"
    ],
    a: 0,
    ua: "Чи прийнятно колись закликати до насилля проти групи людей?",
    uaOpts: [
      "Ні, ніколи",
      "Так, якщо спровокували",
      "Так, під час протестів"
    ],
    exp: "It is never acceptable to promote violence against another person or group, because it is against Australian values and law. (Part 4)",
    uaExp: "Ніколи не прийнятно закликати до насилля проти людини чи групи — це проти австралійських цінностей і закону. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Can Australians peacefully protest against the government?",
    opts: [
      "Yes",
      "Only with police permission",
      "No"
    ],
    a: 0,
    ua: "Чи можуть австралійці мирно протестувати проти уряду?",
    uaOpts: [
      "Так",
      "Лише з дозволу поліції",
      "Ні"
    ],
    exp: "Australians are allowed to peacefully protest against the actions of the government, as tolerance of peaceful protest is essential to democracy. (Part 4)",
    uaExp: "Австралійці можуть мирно протестувати проти дій уряду — толерантність до мирного протесту є невід'ємною частиною демократії. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Can a person be forced to join an organisation in Australia?",
    opts: [
      "No",
      "Only political parties",
      "Yes"
    ],
    a: 0,
    ua: "Чи можна змусити людину вступити до організації в Австралії?",
    uaOpts: [
      "Ні",
      "Лише до партій",
      "Так"
    ],
    exp: "Individuals cannot be compelled to join an organisation or forced to leave it. (Part 4)",
    uaExp: "Нікого не можна примусити вступити до організації чи вийти з неї. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Do religious laws have legal status in Australia?",
    opts: [
      "Yes",
      "No",
      "Only for that religion's followers"
    ],
    a: 1,
    ua: "Чи мають релігійні закони юридичну силу в Австралії?",
    uaOpts: [
      "Так",
      "Ні",
      "Лише для вірян цієї релігії"
    ],
    exp: "Religious laws have no legal status in Australia. Australian law must be followed by everyone, even where it differs from religious laws. (Part 4)",
    uaExp: "Релігійні закони не мають юридичної сили в Австралії. Австралійський закон обов'язковий для всіх, навіть якщо відрізняється від релігійних. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is polygamy legal in Australia?",
    opts: [
      "Yes",
      "No, it is against the law",
      "Only with consent"
    ],
    a: 1,
    ua: "Чи легальне багатоженство в Австралії?",
    uaOpts: [
      "Так",
      "Ні, це проти закону",
      "Лише за згодою"
    ],
    exp: "Polygamy (being married to more than one person at the same time) is against the law in Australia and can result in severe penalties. (Part 4)",
    uaExp: "Багатоженство (шлюб з кількома особами одночасно) є проти закону в Австралії й карається суворо. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is forced marriage legal in Australia?",
    opts: [
      "Only if arranged by family",
      "Yes",
      "No, it is against the law"
    ],
    a: 2,
    ua: "Чи легальний примусовий шлюб в Австралії?",
    uaOpts: [
      "Лише якщо влаштований родиною",
      "Так",
      "Ні, це проти закону"
    ],
    exp: "Forced marriage is against the law in Australia and can result in severe legal penalties, including imprisonment. (Part 4)",
    uaExp: "Примусовий шлюб є проти закону в Австралії й карається суворо, включно з ув'язненням. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is religious intolerance acceptable in Australia?",
    opts: [
      "No",
      "Yes",
      "Only against minority faiths"
    ],
    a: 0,
    ua: "Чи прийнятна релігійна нетерпимість в Австралії?",
    uaOpts: [
      "Ні",
      "Так",
      "Лише проти меншин"
    ],
    exp: "Religious intolerance is not acceptable in Australian society. All people should have equal opportunity regardless of religion. (Part 4)",
    uaExp: "Релігійна нетерпимість неприйнятна в австралійському суспільстві. Усі мають рівні можливості незалежно від релігії. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Do men and women have equal rights in Australia?",
    opts: [
      "No",
      "Only in some states",
      "Yes"
    ],
    a: 2,
    ua: "Чи мають чоловіки й жінки рівні права в Австралії?",
    uaOpts: [
      "Ні",
      "Лише в деяких штатах",
      "Так"
    ],
    exp: "Men and women have equal rights in Australia and equal access to education, employment, voting and the courts. (Part 4)",
    uaExp: "Чоловіки й жінки мають рівні права в Австралії та рівний доступ до освіти, роботи, голосування й судів. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Can two men or two women marry each other in Australia?",
    opts: [
      "No",
      "Only with special permission",
      "Yes"
    ],
    a: 2,
    ua: "Чи можуть двоє чоловіків або двоє жінок одружитися в Австралії?",
    uaOpts: [
      "Ні",
      "Лише з особливого дозволу",
      "Так"
    ],
    exp: "Under Australian law, two people can marry each other, including marriage between two men or two women. (Part 4)",
    uaExp: "За австралійським законом двоє людей можуть одружитися, включно зі шлюбом між двома чоловіками або двома жінками. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is divorce acceptable in Australia?",
    opts: [
      "Yes",
      "No",
      "Only if both spouses agree"
    ],
    a: 0,
    ua: "Чи прийнятне розлучення в Австралії?",
    uaOpts: [
      "Так",
      "Ні",
      "Лише якщо обоє згодні"
    ],
    exp: "Divorce is acceptable in Australia. Either spouse may apply for a divorce, even if the other wishes to continue the marriage. (Part 4)",
    uaExp: "Розлучення прийнятне в Австралії. Будь-хто з подружжя може подати на розлучення, навіть якщо інший хоче зберегти шлюб. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is physical violence against a partner ever acceptable?",
    opts: [
      "Only in private",
      "Yes, sometimes",
      "No, never"
    ],
    a: 2,
    ua: "Чи прийнятне колись фізичне насилля над партнером?",
    uaOpts: [
      "Лише наодинці",
      "Так, іноді",
      "Ні, ніколи"
    ],
    exp: "Physical violence against a spouse or partner is never acceptable and is a criminal offence in Australia. (Part 4)",
    uaExp: "Фізичне насилля над подружжям чи партнером ніколи не прийнятне й є злочином в Австралії. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is domestic and family violence against the law?",
    opts: [
      "Only if it causes injury",
      "No",
      "Yes"
    ],
    a: 2,
    ua: "Чи є домашнє й сімейне насилля порушенням закону?",
    uaOpts: [
      "Лише якщо завдає травм",
      "Ні",
      "Так"
    ],
    exp: "Domestic and family violence is not accepted and is against the law. A person who commits it can go to jail, whether a man or a woman. (Part 4)",
    uaExp: "Домашнє й сімейне насилля неприйнятне й проти закону. Винний може потрапити до в'язниці — чоловік чи жінка. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Can a woman get a job ahead of a man in Australia?",
    opts: [
      "Only in certain jobs",
      "Yes, if she has better skills",
      "No, never"
    ],
    a: 1,
    ua: "Чи може жінка отримати роботу попереду чоловіка в Австралії?",
    uaOpts: [
      "Лише на певних роботах",
      "Так, якщо має кращі навички",
      "Ні, ніколи"
    ],
    exp: "It is a right for a woman to get a job ahead of a man if she has better qualifications and skills. The law supports hiring the best person. (Part 4)",
    uaExp: "Жінка має право отримати роботу попереду чоловіка, якщо має кращу кваліфікацію й навички. Закон підтримує вибір найкращого кандидата. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What should a job be based on?",
    opts: [
      "Family connections",
      "Gender and wealth",
      "Skills and experience"
    ],
    a: 2,
    ua: "На чому має ґрунтуватися працевлаштування?",
    uaOpts: [
      "Сімейні зв'язки",
      "Стать і багатство",
      "Навички та досвід"
    ],
    exp: "A person should get a job based on their skills and experience, not their gender, wealth or ethnicity. (Part 4)",
    uaExp: "Людина має отримувати роботу за навичками й досвідом, а не за статтю, багатством чи етнічністю. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is verbal abuse considered violence in Australia?",
    opts: [
      "No, only physical abuse counts",
      "Yes, it is illegal",
      "Only if repeated"
    ],
    a: 1,
    ua: "Чи вважається словесна образа насиллям в Австралії?",
    uaOpts: [
      "Ні, лише фізичне",
      "Так, це незаконно",
      "Лише якщо повторюється"
    ],
    exp: "Violence of any kind, including verbal and physical abuse, is illegal in Australia. (Part 4)",
    uaExp: "Будь-яке насилля, включно зі словесною й фізичною образою, є незаконним в Австралії. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Should you obey a lawful request from the police?",
    opts: [
      "No",
      "Only if you agree with it",
      "Yes"
    ],
    a: 2,
    ua: "Чи слід виконувати законну вимогу поліції?",
    uaOpts: [
      "Ні",
      "Лише якщо ви згодні",
      "Так"
    ],
    exp: "You should obey a lawful request from the police, because all Australians commit to following the law. (Part 4)",
    uaExp: "Слід виконувати законну вимогу поліції, бо всі австралійці зобов'язуються дотримуватись закону. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What does mutual respect and tolerance mean?",
    opts: [
      "Agreeing with everyone",
      "Ignoring other opinions",
      "Respecting others' views even when you disagree"
    ],
    a: 2,
    ua: "Що означає взаємна повага й толерантність?",
    uaOpts: [
      "Погоджуватися з усіма",
      "Ігнорувати чужі думки",
      "Поважати чужі погляди, навіть коли не згоден"
    ],
    exp: "Mutual respect and tolerance mean listening to others and respecting their views, even when they differ from your own. (Part 4)",
    uaExp: "Взаємна повага й толерантність означають слухати інших і поважати їхні погляди, навіть коли вони відрізняються. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Does racism have a place in Australia?",
    opts: [
      "Only as free speech",
      "Yes",
      "No"
    ],
    a: 2,
    ua: "Чи є місце расизму в Австралії?",
    uaOpts: [
      "Лише як свобода слова",
      "Так",
      "Ні"
    ],
    exp: "Racism has no place in Australia. This includes sharing racially offensive material online or making racially abusive comments in public. (Part 4)",
    uaExp: "Расизму немає місця в Австралії. Це включає поширення расистських матеріалів онлайн чи расистські висловлювання на людях. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Why is learning English important in Australia?",
    opts: [
      "It helps with education, jobs and community life",
      "Only native speakers can be citizens",
      "It is required to enter the country"
    ],
    a: 0,
    ua: "Чому важливо вивчати англійську в Австралії?",
    uaOpts: [
      "Це допомагає з освітою, роботою й життям у громаді",
      "Лише носії можуть бути громадянами",
      "Це потрібно для в'їзду в країну"
    ],
    exp: "Learning English helps to get an education, a job, and better integrate into the community. It is the national language. (Part 4)",
    uaExp: "Знання англійської допомагає здобути освіту, роботу й краще інтегруватися в громаду. Це національна мова. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What is the Australian value of 'mateship'?",
    opts: [
      "Keeping to yourself",
      "Competing with neighbours",
      "Helping each other in times of need"
    ],
    a: 2,
    ua: "Що таке австралійська цінність 'mateship'?",
    uaOpts: [
      "Триматися осторонь",
      "Змагатися із сусідами",
      "Допомагати одне одному в скруті"
    ],
    exp: "Australians value 'mateship' — we help each other in times of need, through community service and volunteering. (Part 4)",
    uaExp: "Австралійці цінують 'mateship' — ми допомагаємо одне одному в скруті через громадську службу й волонтерство. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What should you do if you know a child is being abused?",
    opts: [
      "Ignore it",
      "Handle it privately",
      "Report it to the police"
    ],
    a: 2,
    ua: "Що робити, якщо ви знаєте про насилля над дитиною?",
    uaOpts: [
      "Ігнорувати",
      "Вирішити приватно",
      "Повідомити поліцію"
    ],
    exp: "If a person sees or knows of a child being abused, they should report it to the police to investigate. (Part 4)",
    uaExp: "Якщо людина бачить чи знає про насилля над дитиною, слід повідомити поліцію для розслідування. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Can Australian citizens hold citizenship of another country?",
    opts: [
      "Only for those born overseas",
      "Yes, dual citizenship is allowed",
      "No, never"
    ],
    a: 1,
    ua: "Чи можуть громадяни Австралії мати громадянство іншої країни?",
    uaOpts: [
      "Лише для народжених за кордоном",
      "Так, подвійне громадянство дозволене",
      "Ні, ніколи"
    ],
    exp: "Australian citizens may hold the citizenship of another country if those countries' laws allow — this is dual citizenship. (Part 4)",
    uaExp: "Громадяни Австралії можуть мати громадянство іншої країни, якщо її закони це дозволяють — це подвійне громадянство. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Even with dual citizenship, what must an Australian citizen do?",
    opts: [
      "Follow all Australian laws",
      "Pay tax in both countries",
      "Choose one citizenship"
    ],
    a: 0,
    ua: "Навіть з подвійним громадянством, що має робити громадянин Австралії?",
    uaOpts: [
      "Дотримуватися всіх австралійських законів",
      "Платити податки в обох країнах",
      "Обрати одне громадянство"
    ],
    exp: "Even if also a citizen of another country, an Australian citizen within Australia must follow all Australian laws at all times. (Part 4)",
    uaExp: "Навіть будучи громадянином іншої країни, громадянин Австралії в Австралії має завжди дотримуватись усіх законів. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "When do you officially become an Australian citizen?",
    opts: [
      "When you make the citizenship pledge",
      "When you receive the letter",
      "When you pass the test"
    ],
    a: 0,
    ua: "Коли ви офіційно стаєте громадянином Австралії?",
    uaOpts: [
      "Коли виголошуєте клятву громадянства",
      "Коли отримуєте лист",
      "Коли складаєте тест"
    ],
    exp: "You do not become an Australian citizen until you have made your pledge of commitment at the ceremony. (Intro/Part 4)",
    uaExp: "Ви не стаєте громадянином, доки не виголосите клятву відданості на церемонії. (Вступ/Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What are Australian values based on?",
    opts: [
      "Freedom, respect, fairness and equality",
      "One religion",
      "Wealth and class"
    ],
    a: 0,
    ua: "На чому ґрунтуються австралійські цінності?",
    uaOpts: [
      "Свобода, повага, справедливість і рівність",
      "Одна релігія",
      "Багатство і клас"
    ],
    exp: "Australian values are based on freedom, respect, fairness and equality of opportunity. (Part 4)",
    uaExp: "Австралійські цінності ґрунтуються на свободі, повазі, справедливості й рівності можливостей. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which is legal in Australia?",
    opts: [
      "Divorce.",
      "Forced marriage.",
      "Having several wives."
    ],
    a: 0,
    ua: "Що є законним в Австралії?",
    uaOpts: [
      "Розлучення.",
      "Примусовий шлюб.",
      "Мати кілька дружин."
    ],
    exp: "Australian law protects equal rights and personal freedom. Divorce is legal, but forced marriage and polygamy are against the law. (Our Common Bond, Part 4)",
    uaExp: "Австралійський закон захищає рівні права та особисту свободу. Розлучення є законним, але примусовий шлюб і полігамія є протизаконними. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Religious or cultural practices must",
    opts: [
      "follow Australian law.",
      "replace Australian law.",
      "control the courts."
    ],
    a: 0,
    ua: "Релігійні або культурні практики повинні",
    uaOpts: [
      "відповідати австралійському закону.",
      "замінювати австралійський закон.",
      "контролювати суди."
    ],
    exp: "Religious and cultural practices must not break Australian laws. Where they conflict with Australian law, Australian law must be followed. (Our Common Bond, Parts 2 and 4)",
    uaExp: "Релігійні та культурні практики не повинні порушувати австралійські закони. Якщо вони суперечать австралійському закону, потрібно виконувати австралійський закон. (Частини 2 і 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "If someone is in danger from violence, they should contact",
    opts: [
      "the police.",
      "a political party.",
      "the ATO."
    ],
    a: 0,
    ua: "Якщо комусь загрожує насильство, потрібно звернутися до",
    uaOpts: [
      "поліції.",
      "політичної партії.",
      "ATO."
    ],
    exp: "No one should accept being treated badly or harmed. If you or someone you know is in danger, you should contact the police. (Our Common Bond, Part 3)",
    uaExp: "Ніхто не повинен приймати погане поводження або шкоду. Якщо ви або хтось, кого ви знаєте, у небезпеці, потрібно звернутися до поліції. (Частина 3)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "In Australia, a person can choose",
    opts: [
      "their partner.",
      "another person's vote.",
      "which laws apply."
    ],
    a: 0,
    ua: "В Австралії людина може обирати",
    uaOpts: [
      "свого партнера.",
      "голос іншої людини.",
      "які закони застосовуються."
    ],
    exp: "Australian values include freedom, dignity and equality under the law. Forced marriage is illegal because people must be free to make their own choices. (Our Common Bond, Part 4)",
    uaExp: "Австралійські цінності включають свободу, гідність і рівність перед законом. Примусовий шлюб незаконний, бо люди повинні мати свободу робити власний вибір. (Частина 4)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "If someone breaks the law, they may",
    opts: [
      "go to court.",
      "choose the judge.",
      "ignore police."
    ],
    a: 0,
    ua: "Якщо хтось порушує закон, він може",
    uaOpts: [
      "постати перед судом.",
      "обрати суддю.",
      "ігнорувати поліцію."
    ],
    exp: "People who break Australian laws may be arrested by police and have to go to court. (Our Common Bond, Part 3)",
    uaExp: "Людей, які порушують австралійські закони, може заарештувати поліція, і вони можуть постати перед судом. (Частина 3)"
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle answer options while tracking correct answer index
function shuffleOpts(q) {
  const indices = q.opts.map((_, i) => i);
  // Fisher-Yates shuffle on indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newA = indices.indexOf(q.a);
  return {
    ...q,
    opts: indices.map(i => q.opts[i]),
    uaOpts: indices.map(i => q.uaOpts[i]),
    a: newA,
  };
}

function pick20() {
  const values = shuffle(ALL_Q.filter(q => q.cat === "🇦🇺 Australian Values ⭐")).slice(0, 5);
  const rest = shuffle(ALL_Q.filter(q => q.cat !== "🇦🇺 Australian Values ⭐")).slice(0, 15);
  return shuffle([...values, ...rest]).map(shuffleOpts);
}

const CATS = [...new Set(ALL_Q.map(q => q.cat))];
const CAT_COLOR = {
  "🌏 Australia & Its People": "#2980b9",
  "🗳️ Democracy & Rights": "#8e44ad",
  "🏛️ Government & Law": "#27ae60",
  "🇦🇺 Australian Values ⭐": "#e74c3c",
};
const LETTERS = ["A","B","C"];

// ─── TIMER HOOK ───────────────────────────────────────────────────────────────
function useTimer(active, initialSeconds) {
  const [secs, setSecs] = useState(initialSeconds);
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    ref.current = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(ref.current);
  }, [active]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return { secs, display: `${mm}:${ss}`, reset: () => setSecs(initialSeconds) };
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("menu"); // menu | sim | practice | sim_result | prac_result
  const [simQ, setSimQ] = useState([]);
  const [pracQ, setPracQ] = useState([]);
  const [pracCat, setPracCat] = useState(null);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [showUa, setShowUa] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const timer = useTimer(screen === "sim", 45 * 60);

  useEffect(() => {
    if (screen === "sim" && timer.secs === 0) {
      setTimerDone(true);
      setScreen("sim_result");
    }
  }, [timer.secs, screen]);

  function startSim() {
    const q = pick20();
    setSimQ(q);
    setCur(0); setSel(null); setAnswered(false); setScore(0); setWrong([]); setShowUa(false); setTimerDone(false);
    setScreen("sim");
  }

  function startPrac(cat) {
    const q = shuffle(ALL_Q.filter(q => q.cat === cat)).map(shuffleOpts);
    setPracQ(q); setPracCat(cat);
    setCur(0); setSel(null); setAnswered(false); setScore(0); setWrong([]); setShowUa(false);
    setScreen("practice");
  }

  function handleSelect(idx) {
    if (answered) return;
    setSel(idx); setAnswered(true);
    const q = screen === "sim" ? simQ[cur] : pracQ[cur];
    if (idx === q.a) setScore(s => s + 1);
    else setWrong(w => [...w, cur]);
  }

  function handleNext() {
    const qs = screen === "sim" ? simQ : pracQ;
    if (cur + 1 < qs.length) {
      setCur(c => c + 1); setSel(null); setAnswered(false); setShowUa(false);
    } else {
      setScreen(screen === "sim" ? "sim_result" : "prac_result");
    }
  }

  // ── MENU ──
  if (screen === "menu") return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.flag}>🇦🇺</div>
        <h1 style={S.h1}>Australian Citizenship Test</h1>
        <p style={S.sub}>Тест на громадянство Австралії</p>
        <p style={{ color:"#666", fontSize:12, marginBottom:24 }}>{ALL_Q.length} питань · офіційний матеріал "Our Common Bond"</p>

        <div style={S.modeBox}>
          <div style={S.modeTitle}>🎯 Simulation Mode</div>
          <p style={S.modeDesc}>20 питань · таймер 45 хв · без пояснень<br/>Мінімум 75% + всі 5 Values правильно</p>
          <button onClick={startSim} style={{ ...S.btn, background:"#e74c3c" }}>▶ Почати симуляцію</button>
        </div>

        <div style={S.modeBox}>
          <div style={S.modeTitle}>📚 Practice Mode</div>
          <p style={S.modeDesc}>Всі питання по категоріях · пояснення після кожної відповіді</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => startPrac(cat)}
                style={{ ...S.catBtn, background: CAT_COLOR[cat] || "#555" }}>
                {cat.replace("⭐","").trim()} ({ALL_Q.filter(q=>q.cat===cat).length})
              </button>
            ))}
          </div>
        </div>

              <div style={{ borderTop:"0.5px solid #e8ecf0", paddingTop:14, marginTop:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1a1a2e", textAlign:"center", marginBottom:8 }}>Найбільша спільнота українців в Австралії</div>
                <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Приєднатись до спільноти
                </a>
              </div>
      </div>
    </div>
  );

  // ── QUIZ (sim or practice) ──
  if (screen === "sim" || screen === "practice") {
    const qs = screen === "sim" ? simQ : pracQ;
    const q = qs[cur];
    if (!q) return null;
    const color = CAT_COLOR[q.cat] || "#555";
    const isSim = screen === "sim";
    const pct = ((cur + 1) / qs.length) * 100;
    const timerColor = timer.secs < 300 ? "#e74c3c" : timer.secs < 600 ? "#d68910" : "#27ae60";

    return (
      <div style={S.page}>
        <div style={S.card}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ ...S.badge, background:color }}>{q.cat.replace("⭐","").trim()}</span>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              {isSim && <span style={{ fontFamily:"monospace", fontSize:15, fontWeight:700, color:timerColor }}>⏱ {timer.display}</span>}
              <span style={{ color:"#555", fontSize:12 }}>{cur+1}/{qs.length}</span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ background:"#e8ecf0", borderRadius:3, height:4, marginBottom:16, overflow:"hidden" }}>
            <div style={{ width:`${pct}%`, background:color, height:"100%", transition:"width 0.3s" }} />
          </div>

          {/* Lang toggle */}
          <button onClick={() => setShowUa(s => !s)} style={S.toggleBtn}>
            {showUa ? "🇬🇧 English" : "🇺🇦 Українська"}
          </button>

          {/* Question */}
          <div style={S.question}>{showUa ? q.ua : q.en}</div>

          {/* Options */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {(showUa ? q.uaOpts : q.opts).map((opt, idx) => {
              let bg="#f8f9fb", border="1px solid #e0e5ea", col="#333";
              if (answered) {
                if (idx === q.a) { bg="#e8f8ee"; border=`1.5px solid #27ae60`; col="#1a6e3a"; }
                else if (idx === sel) { bg="#fdecea"; border=`1.5px solid #e74c3c`; col="#c0392b"; }
              }
              return (
                <button key={idx} onClick={() => handleSelect(idx)}
                  style={{ ...S.opt, background:bg, border, color:col, cursor: answered?"default":"pointer" }}>
                  <span style={{ ...S.letter, background: answered && idx===q.a ? "#2ecc71" : color }}>{LETTERS[idx]}</span>
                  <span style={{ flex:1, textAlign:"left" }}>{opt}</span>
                  {answered && idx===q.a && <span style={{ fontSize:16 }}>✓</span>}
                  {answered && idx===sel && idx!==q.a && <span style={{ fontSize:16 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation — Practice only */}
          {answered && !isSim && (
            <div style={{ marginTop:14, background:"#f0f7ff", border:"1px solid #d0e8ff", borderRadius:12, padding:"14px 16px", borderLeft:`3px solid ${sel===q.a?"#27ae60":"#e74c3c"}` }}>
              <div style={{ fontSize:13, fontWeight:700, color: sel===q.a?"#27ae60":"#e74c3c", marginBottom:6 }}>
                {sel===q.a ? "✅ Correct! / Правильно!" : "❌ Wrong / Неправильно"}
              </div>
              <div style={{ fontSize:12.5, color:"#334", lineHeight:1.6 }}>
                <b style={{ color:"#1a1a2e" }}>📖 Explanation:</b> {q.exp}
              </div>
              {showUa && (
                <div style={{ fontSize:12, color:"#556", lineHeight:1.5, marginTop:6, borderTop:"1px solid #d0e8ff", paddingTop:6 }}>
                  <b style={{ color:"#334" }}>🇺🇦 Пояснення:</b> {q.uaExp}
                </div>
              )}
              <a
                href={`https://t.me/afinskiy?text=${encodeURIComponent("🚨 Report error in AU Citizenship Test\n\nQuestion: " + q.en + "\nCorrect answer: " + q.opts[q.a] + "\n\nPlease describe the issue:")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display:"inline-block", marginTop:10, padding:"5px 12px", background:"#fff3cd", border:"1px solid #ffc107", borderRadius:8, fontSize:11, color:"#856404", textDecoration:"none", fontWeight:600 }}
              >
                ⚠️ Report an error / Повідомити про помилку
              </a>
            </div>
          )}

          {/* Sim feedback (no explanation) */}
          {answered && isSim && (
            <div style={{ marginTop:12, padding:"10px 14px", background:"#f8f9fb", border:"1px solid #e8ecf0", borderRadius:10, fontSize:13, color: sel===q.a?"#27ae60":"#e74c3c" }}>
              {sel===q.a ? "✅ Correct!" : `❌ Correct answer: ${q.opts[q.a]}`}
            </div>
          )}

          {answered && (
            <button onClick={handleNext} style={{ ...S.btn, marginTop:14, background:color }}>
              {cur+1 < qs.length ? "Next →" : "See Results 📊"}
            </button>
          )}

          <div style={{ color:"#999", fontSize:11, textAlign:"center", marginTop:10 }}>
            ✅ {score} correct · {wrong.length} wrong
          </div>

          <div style={{ borderTop:"0.5px solid #e8ecf0", paddingTop:14, marginTop:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#1a1a2e", textAlign:"center", marginBottom:8 }}>Найбільша спільнота українців в Австралії</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Приєднатись до спільноти
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── SIM RESULT ──
  if (screen === "sim_result") {
    const total = simQ.length;
    const pct = total ? Math.round((score/total)*100) : 0;
    const valuesTotal = simQ.filter(q => q.cat==="🇦🇺 Australian Values ⭐").length;
    const valuesCorrect = simQ.filter((q,i) => q.cat==="🇦🇺 Australian Values ⭐" && !wrong.includes(i)).length;
    const passed = pct>=75 && valuesCorrect===valuesTotal;

    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:56 }}>{passed?"🎉":"📚"}</div>
            <div style={{ fontSize:64, fontWeight:900, color:passed?"#2ecc71":"#e74c3c", lineHeight:1 }}>{pct}%</div>
            <div style={{ fontSize:17, fontWeight:700, color:passed?"#2ecc71":"#e74c3c", marginTop:6 }}>
              {passed?"✅ PASSED — Склав!":"❌ NOT PASSED — Не склав"}
            </div>
            {timerDone && <div style={{ color:"#e74c3c", fontSize:12, marginTop:4 }}>⏱ Time ran out</div>}
          </div>

          <div style={{ margin:"16px 0", background:"#f8f9fb", border:"1px solid #e8ecf0", borderRadius:10, padding:14, fontSize:13 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:"#666" }}>Overall score</span>
              <span style={{ color: pct>=75?"#2ecc71":"#e74c3c", fontWeight:700 }}>{score}/{total} ({pct}%)</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"#666" }}>Values questions</span>
              <span style={{ color: valuesCorrect===valuesTotal?"#2ecc71":"#e74c3c", fontWeight:700 }}>{valuesCorrect}/{valuesTotal}</span>
            </div>
          </div>

          {wrong.length > 0 && (
            <div style={{ background:"#fff8f8", border:"1px solid #fce", borderRadius:10, padding:14, maxHeight:180, overflowY:"auto" }}>
              <p style={{ color:"#e74c3c", fontSize:12, fontWeight:700, marginBottom:8 }}>Питання з помилками:</p>
              {wrong.map(i => (
                <div key={i} style={{ fontSize:11.5, color:"#555", marginBottom:5, paddingBottom:5, borderBottom:"1px solid #eee" }}>
                  ❌ {simQ[i].en}
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            <button onClick={()=>setScreen("menu")} style={{ ...S.btn, flex:1, background:"#2a2a2a" }}>← Menu</button>
            <button onClick={startSim} style={{ ...S.btn, flex:1, background:"#e74c3c" }}>🔄 Try Again</button>
          </div>

          <div style={{ borderTop:"0.5px solid #e8ecf0", paddingTop:14, marginTop:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#1a1a2e", textAlign:"center", marginBottom:8 }}>Найбільша спільнота українців в Австралії</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Приєднатись до спільноти
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── PRACTICE RESULT ──
  if (screen === "prac_result") {
    const total = pracQ.length;
    const pct = total ? Math.round((score/total)*100) : 0;
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:48 }}>{pct>=80?"🌟":pct>=60?"👍":"📖"}</div>
            <div style={{ fontSize:56, fontWeight:900, color: pct>=75?"#2ecc71":"#f39c12", lineHeight:1 }}>{pct}%</div>
            <div style={{ fontSize:14, color:"#aaa", marginTop:6 }}>{pracCat}</div>
            <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginTop:4 }}>{score} / {total} correct</div>
          </div>

          {wrong.length > 0 && (
            <div style={{ marginTop:16, background:"#fff8f8", border:"1px solid #fce", borderRadius:10, padding:14, maxHeight:200, overflowY:"auto" }}>
              <p style={{ color:"#e74c3c", fontSize:12, fontWeight:700, marginBottom:8 }}>Повтори ці питання:</p>
              {wrong.map(i => (
                <div key={i} style={{ fontSize:11.5, color:"#555", marginBottom:5, paddingBottom:5, borderBottom:"1px solid #eee" }}>
                  ❌ {pracQ[i].en}
                </div>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            <button onClick={()=>setScreen("menu")} style={{ ...S.btn, flex:1, background:"#2a2a2a" }}>← Menu</button>
            <button onClick={()=>startPrac(pracCat)} style={{ ...S.btn, flex:1, background: CAT_COLOR[pracCat]||"#555" }}>🔄 Ще раз</button>
          </div>

          <div style={{ borderTop:"0.5px solid #e8ecf0", paddingTop:14, marginTop:16 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#1a1a2e", textAlign:"center", marginBottom:8 }}>Найбільша спільнота українців в Австралії</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Приєднатись до спільноти
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  page: { minHeight:"100vh", background:"#f0f4f8", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px 12px", fontFamily:"'Segoe UI',system-ui,sans-serif" },
  card: { background:"#ffffff", borderRadius:18, padding:"24px 20px", maxWidth:640, width:"100%", boxShadow:"0 4px 24px rgba(0,0,0,0.10)" },
  flag: { fontSize:52, textAlign:"center", marginBottom:4 },
  h1: { textAlign:"center", fontSize:20, fontWeight:800, color:"#1a1a2e", margin:0 },
  sub: { textAlign:"center", color:"#666", fontSize:13, margin:"4px 0 0" },
  modeBox: { background:"#f8f9fb", border:"1px solid #e8ecf0", borderRadius:12, padding:"16px", marginTop:16 },
  modeTitle: { fontWeight:700, color:"#1a1a2e", fontSize:15, marginBottom:6 },
  modeDesc: { color:"#666", fontSize:12.5, lineHeight:1.6, marginBottom:10 },
  btn: { width:"100%", padding:"13px", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", color:"#fff" },
  catBtn: { padding:"8px 14px", border:"none", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", color:"#fff" },
  badge: { padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:700, color:"#fff", letterSpacing:0.5 },
  question: { fontSize:16.5, fontWeight:600, color:"#1a1a2e", marginBottom:16, lineHeight:1.6 },
  opt: { display:"flex", alignItems:"center", gap:12, padding:"11px 14px", borderRadius:10, fontSize:13.5, transition:"all 0.15s", fontFamily:"inherit" },
  letter: { minWidth:26, height:26, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 },
  toggleBtn: { marginBottom:14, padding:"5px 12px", background:"#f0f4f8", color:"#666", border:"1px solid #dde3ea", borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:"inherit" },
};
