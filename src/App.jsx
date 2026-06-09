import { useState, useEffect, useRef, useMemo } from "react";

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
const ALL_Q = [
  // ── 🌏 AUSTRALIA & ITS PEOPLE ──
  {
    cat: "🌏 Australia & Its People",
    en: "Who were the first inhabitants of Australia?",
    opts: ["Aboriginal and Torres Strait Islander peoples","British settlers","Dutch explorers","Chinese migrants"],
    a: 0,
    ua: "Хто були першими жителями Австралії?",
    uaOpts: ["Аборигени та жителі островів Торресової протоки","Британські поселенці","Нідерландські дослідники","Китайські мігранти"],
    exp: "Australia's first inhabitants are the Aboriginal and Torres Strait Islander peoples, who have the oldest continuous cultures and traditions in the world. (Our Common Bond, Part 1)",
    uaExp: "Першими жителями Австралії є аборигени та жителі островів Торресової протоки — носії найдавніших безперервних культур у світі. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How long ago did Aboriginal peoples arrive in Australia according to archaeological records?",
    opts: ["Between 65,000 and 40,000 years ago","About 10,000 years ago","About 200 years ago","About 500 years ago"],
    a: 0,
    ua: "Скільки років тому, за даними археології, прибули аборигени до Австралії?",
    uaOpts: ["Між 65 000 і 40 000 років тому","Близько 10 000 років тому","Близько 200 років тому","Близько 500 років тому"],
    exp: "The archaeological record indicates that Aboriginal peoples arrived in Australia between 65,000 and 40,000 years ago. (Our Common Bond, Part 1)",
    uaExp: "Археологічні дані свідчать, що аборигени прибули до Австралії між 65 000 і 40 000 років тому. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Where do Torres Strait Islander people come from?",
    opts: ["Islands between the northern tip of Queensland and Papua New Guinea","The coast of Western Australia","Tasmania","The Northern Territory"],
    a: 0,
    ua: "Звідки походять жителі островів Торресової протоки?",
    uaOpts: ["Острови між північним краєм Квінсленду і Папуа Новою Гвінеєю","Узбережжя Західної Австралії","Тасманія","Північна Територія"],
    exp: "Torres Strait Islander people are from islands between the northern tip of Queensland and Papua New Guinea. (Our Common Bond, Part 1)",
    uaExp: "Жителі Торресової протоки — з островів між північним краєм Квінсленду та Папуа Новою Гвінеєю. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When did European settlement begin in Australia?",
    opts: ["26 January 1788","1 January 1901","25 April 1915","1 January 1851"],
    a: 0,
    ua: "Коли розпочалось європейське заселення Австралії?",
    uaOpts: ["26 січня 1788 року","1 січня 1901 року","25 квітня 1915 року","1 січня 1851 року"],
    exp: "European settlement started when the first 11 convict ships (the First Fleet) arrived from Great Britain on 26 January 1788. (Our Common Bond, Part 1)",
    uaExp: "Перший флот із 11 кораблів прибув з Великої Британії 26 січня 1788 року. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Who was the first Governor of the colony of New South Wales?",
    opts: ["Captain Arthur Phillip","Captain James Cook","Governor John Hunter","Lord Sydney"],
    a: 0,
    ua: "Хто був першим губернатором колонії Новий Південний Уельс?",
    uaOpts: ["Капітан Артур Філліп","Капітан Джеймс Кук","Губернатор Джон Хантер","Лорд Сідней"],
    exp: "The first Governor of the colony of New South Wales was Captain Arthur Phillip. (Our Common Bond, Part 1)",
    uaExp: "Першим губернатором колонії Новий Південний Уельс був капітан Артур Філліп. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When did the gold rush begin in Australia?",
    opts: ["1851","1788","1901","1945"],
    a: 0,
    ua: "Коли в Австралії розпочалась золота лихоманка?",
    uaOpts: ["1851","1788","1901","1945"],
    exp: "In 1851, a 'gold rush' began when gold was discovered in the colonies of New South Wales and Victoria. (Our Common Bond, Part 1)",
    uaExp: "У 1851 році розпочалась золота лихоманка після відкриття золота в колоніях Новий Південний Уельс та Вікторія. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When did Australia become a federation?",
    opts: ["1 January 1901","26 January 1788","25 April 1915","1 July 1900"],
    a: 0,
    ua: "Коли Австралія стала федерацією?",
    uaOpts: ["1 січня 1901 року","26 січня 1788 року","25 квітня 1915 року","1 липня 1900 року"],
    exp: "In 1901, the separate colonies were united into a federation of states called the Commonwealth of Australia. (Our Common Bond, Part 1)",
    uaExp: "У 1901 році окремі колонії об'єдналися у федерацію — Австралійський Союз. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "After which referendum were Aboriginal and Torres Strait Islander peoples included in official population estimates?",
    opts: ["1967 Referendum","1901 Referendum","1948 Referendum","1975 Referendum"],
    a: 0,
    ua: "Після якого референдуму аборигени були включені до офіційного підрахунку населення?",
    uaOpts: ["Референдум 1967 року","Референдум 1901 року","Референдум 1948 року","Референдум 1975 року"],
    exp: "It was not until after a Referendum in 1967 that Aboriginal and Torres Strait Islander peoples were included in official estimates of the Australian population. (Our Common Bond, Part 1)",
    uaExp: "Лише після референдуму 1967 року аборигени були включені до офіційних підрахунків населення. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many states does Australia have?",
    opts: ["6","7","5","8"],
    a: 0,
    ua: "Скільки штатів має Австралія?",
    uaOpts: ["6","7","5","8"],
    exp: "The Commonwealth of Australia is a federation of states and territories. There are six states and two mainland territories. (Our Common Bond, Part 1)",
    uaExp: "Австралійський Союз — федерація з шести штатів та двох материкових територій. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital city of Australia?",
    opts: ["Canberra","Sydney","Melbourne","Brisbane"],
    a: 0,
    ua: "Яка столиця Австралії?",
    uaOpts: ["Канберра","Сідней","Мельбурн","Брісбен"],
    exp: "Canberra is Australia's capital city. The Australian Capital Territory is located between Sydney and Melbourne, and is home to the nation's capital city, Canberra. (Our Common Bond, Part 1)",
    uaExp: "Канберра — столиця Австралії, розташована між Сіднеєм і Мельбурном. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which is the largest state in Australia?",
    opts: ["Western Australia","Queensland","New South Wales","Victoria"],
    a: 0,
    ua: "Який найбільший штат Австралії?",
    uaOpts: ["Західна Австралія","Квінсленд","Новий Південний Уельс","Вікторія"],
    exp: "Western Australia is the largest state. Perth is its capital city. (Our Common Bond, Part 1)",
    uaExp: "Західна Австралія — найбільший штат. Столиця — Перт. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which is the smallest mainland state in Australia?",
    opts: ["Victoria","Tasmania","South Australia","New South Wales"],
    a: 0,
    ua: "Який найменший материковий штат Австралії?",
    uaOpts: ["Вікторія","Тасманія","Південна Австралія","Новий Південний Уельс"],
    exp: "Victoria is the smallest of the mainland states. Victoria's capital city is Melbourne. (Our Common Bond, Part 1)",
    uaExp: "Вікторія — найменший материковий штат, столиця — Мельбурн. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is the capital city of the Northern Territory?",
    opts: ["Darwin","Alice Springs","Canberra","Katherine"],
    a: 0,
    ua: "Яка столиця Північної Території?",
    uaOpts: ["Дарвін","Аліс Спрінгс","Канберра","Кетрін"],
    exp: "The Northern Territory has a tropical environment in the north and dry red desert in the south. Darwin is its capital city. (Our Common Bond, Part 1)",
    uaExp: "Столиця Північної Території — Дарвін. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which state is separated from the mainland by Bass Strait?",
    opts: ["Tasmania","South Australia","Victoria","Queensland"],
    a: 0,
    ua: "Який штат відокремлений від материка протокою Басса?",
    uaOpts: ["Тасманія","Південна Австралія","Вікторія","Квінсленд"],
    exp: "Tasmania is the smallest state, separated from the mainland by the Bass Strait. Tasmania's capital city is Hobart. (Our Common Bond, Part 1)",
    uaExp: "Тасманія — найменший штат, відокремлений від материка протокою Басса. Столиця — Гобарт. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does Australia Day on 26 January commemorate?",
    opts: ["The anniversary of the arrival of the First Fleet in 1788","The federation of Australia","ANZAC Day","The end of World War II"],
    a: 0,
    ua: "Що відзначає День Австралії 26 січня?",
    uaOpts: ["Річниця прибуття Першого флоту у 1788 році","Федерація Австралії","День АНЗАК","Закінчення Другої світової війни"],
    exp: "Australia Day on 26 January is a public holiday — the anniversary of the arrival of the First Fleet from Great Britain in 1788. (Our Common Bond, Part 1)",
    uaExp: "День Австралії 26 січня відзначає річницю прибуття Першого флоту з Великої Британії у 1788 році. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "When is ANZAC Day commemorated?",
    opts: ["25 April","26 January","11 November","1 January"],
    a: 0,
    ua: "Коли відзначається День АНЗАК?",
    uaOpts: ["25 квітня","26 січня","11 листопада","1 січня"],
    exp: "ANZAC Day is commemorated on 25 April each year — named after the Australian and New Zealand Army Corps, which landed at Gallipoli in Türkiye during World War I on 25 April 1915. (Our Common Bond, Part 1)",
    uaExp: "День АНЗАК відзначається 25 квітня — на честь австрало-новозеландського корпусу, що висадився у Галліполі 25 квітня 1915 року. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are the colours of the Australian National Flag?",
    opts: ["Blue, white and red","Green, gold and red","Black, red and yellow","Blue, white and gold"],
    a: 0,
    ua: "Які кольори Національного прапора Австралії?",
    uaOpts: ["Синій, білий та червоний","Зелений, золотий та червоний","Чорний, червоний та жовтий","Синій, білий та золотий"],
    exp: "The Australian National Flag is blue, white and red. It features the Union Jack, the Commonwealth Star (seven points), and the Southern Cross. (Our Common Bond, Part 1)",
    uaExp: "Національний прапор Австралії — синій, білий та червоний. Містить Юніон Джек, Зірку Співдружності (7 кінців) і Південний Хрест. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are the colours of the Australian Aboriginal Flag?",
    opts: ["Black, red and yellow","Green, gold and black","Blue, white and red","Black, white and green"],
    a: 0,
    ua: "Які кольори прапора австралійських аборигенів?",
    uaOpts: ["Чорний, червоний та жовтий","Зелений, золотий та чорний","Синій, білий та червоний","Чорний, білий та зелений"],
    exp: "The Australian Aboriginal Flag is black (top half, representing Aboriginal peoples), red (bottom half, representing the earth) and yellow (the sun). (Our Common Bond, Part 1)",
    uaExp: "Прапор аборигенів: чорний верх (аборигени), червоний низ (земля), жовте коло (сонце). (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Which two animals appear on the Commonwealth Coat of Arms?",
    opts: ["A kangaroo and an emu","A kangaroo and a koala","An emu and a platypus","A wombat and a kangaroo"],
    a: 0,
    ua: "Які два тварини зображені на Гербі Співдружності?",
    uaOpts: ["Кенгуру та ему","Кенгуру та коала","Ему та качконіс","Вомбат та кенгуру"],
    exp: "The Commonwealth Coat of Arms features a shield supported by a kangaroo and an emu — both native Australian animals. A gold Commonwealth Star sits above the shield and the background is the golden wattle. (Our Common Bond, Part 1)",
    uaExp: "На гербі Співдружності — щит, який підтримують кенгуру та ему. Над щитом — золота Зірка Співдружності, фон — золота акація. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national flower?",
    opts: ["Golden wattle","Waratah","Banksia","Kangaroo paw"],
    a: 0,
    ua: "Яка національна квітка Австралії?",
    uaOpts: ["Золота акація","Варата","Банксія","Лапа кенгуру"],
    exp: "Australia's national flower is the golden wattle. This small tree grows mainly in south-eastern Australia, with bright green leaves and golden yellow flowers in spring. Australia's national colours (green and gold) reflect the colours of the golden wattle. (Our Common Bond, Part 1)",
    uaExp: "Національна квітка Австралії — золота акація. Національні кольори (зелений і золотий) відображають її кольори. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What are Australia's national colours?",
    opts: ["Green and gold","Blue and gold","Red and gold","Green and white"],
    a: 0,
    ua: "Які національні кольори Австралії?",
    uaOpts: ["Зелений та золотий","Синій та золотий","Червоний та золотий","Зелений та білий"],
    exp: "Australia's national colours are green and gold — the colours of the golden wattle. The uniforms of our national sports teams are usually green and gold. (Our Common Bond, Part 1)",
    uaExp: "Національні кольори Австралії — зелений та золотий, кольори золотої акації. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national gemstone?",
    opts: ["Opal","Diamond","Sapphire","Ruby"],
    a: 0,
    ua: "Який національний дорогоцінний камінь Австралії?",
    uaOpts: ["Опал","Діамант","Сапфір","Рубін"],
    exp: "The opal is Australia's national gemstone. According to Aboriginal legend, a rainbow touched the earth and created the colours of the opal. (Our Common Bond, Part 1)",
    uaExp: "Опал — національний дорогоцінний камінь Австралії. За легендою аборигенів, веселка торкнулась землі і створила його кольори. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national anthem?",
    opts: ["Advance Australia Fair","Waltzing Matilda","God Save the King","Song of Australia"],
    a: 0,
    ua: "Який національний гімн Австралії?",
    uaOpts: ["Advance Australia Fair","Waltzing Matilda","God Save the King","Song of Australia"],
    exp: "'Advance Australia Fair' is Australia's national anthem. It is sung at citizenship ceremonies and major sporting events. (Our Common Bond, Part 1)",
    uaExp: "'Advance Australia Fair' — національний гімн Австралії, виконується на церемоніях громадянства та спортивних подіях. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's national language?",
    opts: ["English","Aboriginal","French","There is no official language"],
    a: 0,
    ua: "Яка національна мова Австралії?",
    uaOpts: ["Англійська","Мова аборигенів","Французька","Офіційної мови немає"],
    exp: "Australia's national language is English. It is part of our national identity. Migrants should learn and use English to help them participate in Australian society. (Our Common Bond, Part 1)",
    uaExp: "Національна мова Австралії — англійська. Мігрантам рекомендується вивчати англійську для участі у суспільному житті. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the 'Welcome to Country' involve?",
    opts: ["A cultural practice by an Aboriginal or Torres Strait Islander custodian welcoming visitors to their traditional land","A government welcome letter for new migrants","An official ceremony for new citizens","A public holiday celebration"],
    a: 0,
    ua: "Що таке 'Welcome to Country'?",
    uaOpts: ["Культурна практика, де абориген вітає відвідувачів на традиційній землі","Урядовий лист привітання для мігрантів","Офіційна церемонія для нових громадян","Святкування державного свята"],
    exp: "A Welcome to Country is a cultural practice performed by an Aboriginal or Torres Strait Islander custodian of the local region, welcoming visitors to their traditional land. It can take place through songs, dances, smoking ceremonies or speeches. (Our Common Bond, Part 1)",
    uaExp: "Welcome to Country — культурна практика аборигена або жителя Торресової протоки, що вітає гостей на традиційній землі через пісні, танці, церемонії чи промови. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "How many points does the Commonwealth Star on the Australian flag have?",
    opts: ["7","5","6","8"],
    a: 0,
    ua: "Скільки кінців має Зірка Співдружності на австралійському прапорі?",
    uaOpts: ["7","5","6","8"],
    exp: "The Commonwealth Star has seven points — each point representing one of the six states and one point for the territories. (Our Common Bond, Part 1)",
    uaExp: "Зірка Співдружності має 7 кінців: по одному на кожен з 6 штатів і один — для територій. (Частина 1)"
  },

  // ── 🗳️ DEMOCRACY & RIGHTS ──
  {
    cat: "🗳️ Democracy & Rights",
    en: "What type of government system does Australia have?",
    opts: ["Parliamentary democracy","Presidential democracy","Constitutional monarchy with no parliament","Military government"],
    a: 0,
    ua: "Яку систему правління має Австралія?",
    uaOpts: ["Парламентська демократія","Президентська демократія","Конституційна монархія без парламенту","Військовий уряд"],
    exp: "Australia's system of government is a parliamentary democracy. The power of government comes from the Australian people because citizens vote for people to represent them in parliament. (Our Common Bond, Part 2)",
    uaExp: "Австралія має парламентську демократію. Влада уряду виходить від народу через вибори. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does the Rule of Law mean in Australia?",
    opts: ["No person or group is above the law, including those in positions of power","The government can make any laws it wants","Police are above the law","Only citizens must follow the law"],
    a: 0,
    ua: "Що означає верховенство права в Австралії?",
    uaOpts: ["Жодна особа чи група не є вищою за закон, навіть ті, хто при владі","Уряд може ухвалювати будь-які закони","Поліція стоїть вище закону","Лише громадяни повинні дотримуватись закону"],
    exp: "The Rule of Law means that no person, group or religious rule is above the law. Everyone, including government, community and religious leaders, as well as business people and the police, must obey Australia's laws. (Our Common Bond, Part 2)",
    uaExp: "Верховенство права означає: жодна особа чи група не є вищою за закон. Усі — включаючи уряд, релігійних лідерів і поліцію — зобов'язані дотримуватись законів. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "How do Australians believe change in society should occur?",
    opts: ["Through discussion, peaceful persuasion and the democratic process","Through revolution and violence if necessary","Only through decisions made by the government","Only through court orders"],
    a: 0,
    ua: "Як, на думку австралійців, повинні відбуватися зміни у суспільстві?",
    uaOpts: ["Через обговорення, мирне переконання та демократичний процес","Через революцію та насилля при необхідності","Лише через рішення уряду","Лише через судові накази"],
    exp: "Australians believe that change should occur through discussion, peaceful persuasion, and the democratic process. We reject violence as a way to change a person's mind or the law. (Our Common Bond, Part 2)",
    uaExp: "Австралійці вважають, що зміни мають відбуватись через обговорення, мирне переконання та демократичний процес. Насилля відкидається. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does freedom of speech allow people to do in Australia?",
    opts: ["Say and write what they think, and criticise the government, within the law","Say anything without any limits whatsoever","Only speak positively about the government","Only speak in English"],
    a: 0,
    ua: "Що дозволяє свобода слова в Австралії?",
    uaOpts: ["Говорити та писати те, що думаєш, критикувати уряд в межах закону","Говорити будь-що без жодних обмежень","Лише позитивно висловлюватись про уряд","Говорити лише англійською"],
    exp: "Freedom of speech means people can say and write what they think, and discuss their ideas with others. For example, people can criticise the government, protest peacefully and campaign to change laws — but must always obey Australian laws. (Our Common Bond, Part 2)",
    uaExp: "Свобода слова дозволяє говорити і писати те, що думаєш, критикувати уряд та мирно протестувати — але завжди в межах закону. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Does Australia have an official national religion?",
    opts: ["No, Australia has no official national religion","Yes, Christianity is the official religion","Yes, the Church of England is official","Yes, all religions are equally official"],
    a: 0,
    ua: "Чи має Австралія офіційну національну релігію?",
    uaOpts: ["Ні, Австралія не має офіційної національної релігії","Так, офіційна релігія — християнство","Так, офіційна — Церква Англії","Так, всі релігії однаково офіційні"],
    exp: "Australia has no official national religion. The government in Australia is secular, which means it operates separately from churches or other religious entities. People in Australia are free to follow any religion they choose, or no religion at all. (Our Common Bond, Part 2)",
    uaExp: "Австралія не має офіційної національної релігії. Уряд є світським. Люди вільні сповідувати будь-яку релігію або не сповідувати жодної. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What happens if there is a conflict between Australian law and a religious practice?",
    opts: ["Australian law prevails","Religious practice prevails","It depends on the religion","Both are equally valid"],
    a: 0,
    ua: "Що відбувається при конфлікті між австралійським законом і релігійною практикою?",
    uaOpts: ["Австралійський закон має пріоритет","Релігійна практика має пріоритет","Залежить від релігії","Обидва однаково дійсні"],
    exp: "Where there is a conflict between an Australian law and a religious practice, Australian law prevails. At all times, even while engaging in religious practices, the laws of Australia must be obeyed. (Our Common Bond, Part 2)",
    uaExp: "У разі конфлікту між австралійським законом і релігійною практикою — австралійський закон має пріоритет. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does 'gender equality' mean in Australia?",
    opts: ["Men and women have equal rights and it is against the law to discriminate based on gender","Women earn more than men","Men have more legal rights","Gender is not recognised by law"],
    a: 0,
    ua: "Що означає 'гендерна рівність' в Австралії?",
    uaOpts: ["Чоловіки та жінки мають рівні права і дискримінація за статтю незаконна","Жінки заробляють більше за чоловіків","Чоловіки мають більше юридичних прав","Стать юридично не визнається"],
    exp: "Men and women have equal rights in Australia. It is against the law to discriminate against a person because of their gender. (Our Common Bond, Part 2)",
    uaExp: "Чоловіки та жінки мають рівні права. Дискримінація за статтю є незаконною. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is the concept of a 'fair go' in Australia?",
    opts: ["What someone achieves in life should be due to their talents and effort, not wealth or background","Everyone should receive equal wages","The government provides everyone with a job","All Australians play cricket fairly"],
    a: 0,
    ua: "Що означає концепція 'fair go' в Австралії?",
    uaOpts: ["Досягнення в житті мають залежати від таланту та зусиль, а не багатства чи походження","Всі повинні отримувати однакову зарплату","Уряд надає всім роботу","Всі австралійці грають у крикет чесно"],
    exp: "Australians value equal opportunity — what is often called a 'fair go'. This means that what someone achieves in life should be as a result of their talents, work and effort, rather than their wealth or background. (Our Common Bond, Part 2)",
    uaExp: "'Fair go' означає, що досягнення людини мають залежати від її талантів та зусиль, а не від багатства чи походження. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which of the following is a RESPONSIBILITY of Australian citizenship?",
    opts: ["Voting in federal and state/territory elections","Applying for an Australian passport","Asking for consular assistance overseas","Applying for a job in the public service"],
    a: 0,
    ua: "Що є ОБОВ'ЯЗКОМ громадянства Австралії?",
    uaOpts: ["Голосування на федеральних і штатних/територіальних виборах","Подання заявки на австралійський паспорт","Звернення за консульською допомогою за кордоном","Подання заявки на роботу в держслужбі"],
    exp: "As an Australian citizen you must: obey the laws, vote in federal and state/territory elections and referendums, defend Australia should the need arise, and serve on a jury if called. Applying for a passport and consular assistance are privileges, not responsibilities. (Our Common Bond, Part 2)",
    uaExp: "Обов'язки громадянина: дотримуватись законів, голосувати на виборах і референдумах, захищати Австралію при необхідності, засідати в журі. Паспорт та консульська допомога — це привілеї. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Is voting in federal elections compulsory for Australian citizens?",
    opts: ["Yes, it is compulsory for citizens aged 18 and over","No, it is optional","Only for citizens born in Australia","Only for citizens over 21"],
    a: 0,
    ua: "Чи є голосування на федеральних виборах обов'язковим?",
    uaOpts: ["Так, обов'язково для громадян від 18 років","Ні, добровільно","Лише для тих, хто народився в Австралії","Лише для тих, кому більше 21 року"],
    exp: "Voting is compulsory in federal and state or territory elections for Australian citizens aged 18 years or over. It may not be compulsory to vote in local government elections in some states. (Our Common Bond, Part 2)",
    uaExp: "Голосування на федеральних та штатних виборах є обов'язковим для громадян від 18 років. На місцевих виборах у деяких штатах воно може бути необов'язковим. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is a jury?",
    opts: ["A group of ordinary Australians who decide if a person is guilty or not guilty","A group of judges","A panel of government lawyers","A police committee"],
    a: 0,
    ua: "Що таке журі присяжних?",
    uaOpts: ["Група звичайних австралійців, які вирішують, винна людина чи ні","Група суддів","Панель державних адвокатів","Поліцейський комітет"],
    exp: "A jury is a group of ordinary Australian men and women who listen to the evidence in a court case and decide if a person is guilty or not guilty. Jury service helps ensure the court system is open and fair. (Our Common Bond, Part 2)",
    uaExp: "Журі — група звичайних австралійців, які слухають докази та вирішують, винна особа чи ні. Це забезпечує відкритість і справедливість судової системи. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Who can seek election to parliament in Australia?",
    opts: ["Australian citizens aged 18 and over who are not dual citizens","Any permanent resident","Any Australian resident regardless of age","Only people born in Australia"],
    a: 0,
    ua: "Хто може балотуватися на виборах до парламенту Австралії?",
    uaOpts: ["Громадяни Австралії від 18 років без подвійного громадянства","Будь-який постійний резидент","Будь-який житель Австралії незалежно від віку","Лише народжені в Австралії"],
    exp: "Australian citizens who are aged 18 years or over, and who are not dual citizens, can seek election to parliament at the federal, state or territory level. (Our Common Bond, Part 2)",
    uaExp: "Балотуватись у парламент можуть громадяни Австралії від 18 років, які не мають подвійного громадянства. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is freedom of association?",
    opts: ["The right to form and join legal organisations such as political parties or trade unions","The right to meet secretly without government knowledge","The right to form illegal organisations","The right to exclude others from groups"],
    a: 0,
    ua: "Що таке свобода об'єднань?",
    uaOpts: ["Право створювати та вступати до законних організацій: партій, профспілок","Право зустрічатися таємно","Право створювати незаконні організації","Право виключати інших з груп"],
    exp: "Freedom of association is the right to form and join associations to pursue common goals — for example, joining a political party, trade union, religious, cultural or social group. At all times, Australian laws must be obeyed. (Our Common Bond, Part 2)",
    uaExp: "Свобода об'єднань — право вступати до законних організацій (партій, профспілок, соціальних груп). Всі зібрання мають бути мирними та в межах закону. (Частина 2)"
  },

  // ── 🏛️ GOVERNMENT & LAW ──
  {
    cat: "🏛️ Government & Law",
    en: "Who is the head of state of Australia?",
    opts: ["The King of Australia (King Charles III)","The Prime Minister","The Governor-General","The Chief Justice"],
    a: 0,
    ua: "Хто є главою держави Австралії?",
    uaOpts: ["Король Австралії (Король Чарльз III)","Прем'єр-міністр","Генерал-губернатор","Головний суддя"],
    exp: "Australia's head of state is the King of Australia (currently King Charles III). The King is represented in Australia by the Governor-General. (Our Common Bond, Part 3)",
    uaExp: "Главою держави Австралії є Король Австралії (зараз Король Чарльз III). Його представляє в Австралії Генерал-губернатор. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who represents the King in Australia?",
    opts: ["The Governor-General","The Prime Minister","The Speaker of the House","The President of the Senate"],
    a: 0,
    ua: "Хто представляє Короля в Австралії?",
    uaOpts: ["Генерал-губернатор","Прем'єр-міністр","Спікер палати","Президент Сенату"],
    exp: "The Governor-General is the representative of the King in Australia. Each state also has a Governor who represents the King at the state level. (Our Common Bond, Part 3)",
    uaExp: "Генерал-губернатор є представником Короля в Австралії. Кожен штат також має губернатора. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What are the two houses of the Australian Parliament?",
    opts: ["The Senate and the House of Representatives","The House of Lords and House of Commons","The Upper House and Lower Assembly","The State House and Federal House"],
    a: 0,
    ua: "Які дві палати австралійського парламенту?",
    uaOpts: ["Сенат та Палата представників","Палата лордів та Палата громад","Верхня палата та Нижня асамблея","Державна палата та Федеральна палата"],
    exp: "The Australian Parliament consists of two houses: the Senate (upper house) and the House of Representatives (lower house). Both houses must agree for a bill to become law. (Our Common Bond, Part 3)",
    uaExp: "Австралійський парламент складається з Сенату (верхня палата) та Палати представників (нижня палата). Обидві палати мають погодитися, щоб закон був прийнятий. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "How many senators does each Australian state elect?",
    opts: ["12","6","8","10"],
    a: 0,
    ua: "Скільки сенаторів обирає кожен штат Австралії?",
    uaOpts: ["12","6","8","10"],
    exp: "Each of the six Australian states elects 12 senators to the Senate. The territories elect 2 senators each. (Our Common Bond, Part 3)",
    uaExp: "Кожен із 6 штатів Австралії обирає 12 сенаторів. Кожна територія — по 2 сенатори. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Who becomes the Prime Minister of Australia?",
    opts: ["The leader of the party with majority support in the House of Representatives","The leader of the party with majority support in the Senate","The person appointed by the King","The person chosen by the Governor-General alone"],
    a: 0,
    ua: "Хто стає прем'єр-міністром Австралії?",
    uaOpts: ["Лідер партії з більшістю в Палаті представників","Лідер партії з більшістю в Сенаті","Особа, призначена Королем","Особа, обрана виключно Генерал-губернатором"],
    exp: "The leader of the political party (or coalition) that has majority support in the House of Representatives becomes the Prime Minister. The Prime Minister leads the Cabinet and the federal government. (Our Common Bond, Part 3)",
    uaExp: "Прем'єр-міністром стає лідер партії (або коаліції) з більшістю в Палаті представників. Він очолює кабінет та федеральний уряд. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What are the three levels of government in Australia?",
    opts: ["Federal, state/territory, and local","Federal, state, and city","National, regional, and council","Parliament, senate, and court"],
    a: 0,
    ua: "Які три рівні урядування в Австралії?",
    uaOpts: ["Федеральний, штатний/територіальний та місцевий","Федеральний, штатний та міський","Національний, регіональний та рада","Парламент, сенат та суд"],
    exp: "Australia has three levels of government: the federal (national) government, state and territory governments, and local governments (councils). Each level has different responsibilities. (Our Common Bond, Part 3)",
    uaExp: "В Австралії три рівні управління: федеральний (національний) уряд, уряди штатів і територій, та місцеве самоврядування (ради). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level of government is responsible for defence and immigration?",
    opts: ["Federal (national) government","State and territory governments","Local councils","The Governor-General's office"],
    a: 0,
    ua: "Який рівень урядування відповідає за оборону та імміграцію?",
    uaOpts: ["Федеральний (національний) уряд","Уряди штатів та територій","Місцеві ради","Офіс Генерал-губернатора"],
    exp: "The federal government is responsible for national matters including defence, foreign affairs, immigration, trade, and social security. (Our Common Bond, Part 3)",
    uaExp: "Федеральний уряд відповідає за оборону, зовнішню політику, імміграцію, торгівлю та соціальне забезпечення. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level of government is responsible for hospitals and schools?",
    opts: ["State and territory governments","Federal government","Local councils","All levels jointly"],
    a: 0,
    ua: "Який рівень урядування відповідає за лікарні та школи?",
    uaOpts: ["Уряди штатів та територій","Федеральний уряд","Місцеві ради","Всі рівні спільно"],
    exp: "State and territory governments are responsible for matters including hospitals and health services, schools and education, roads and public transport, and police. (Our Common Bond, Part 3)",
    uaExp: "Уряди штатів і територій відповідають за лікарні, школи, дороги, транспорт та поліцію. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the role of local government (councils)?",
    opts: ["Manage local services like rubbish collection, local roads and parks","Pass national laws","Control immigration","Manage public hospitals"],
    a: 0,
    ua: "Яка роль місцевого самоврядування?",
    uaOpts: ["Управляти місцевими послугами: збір сміття, місцеві дороги, парки","Ухвалювати національні закони","Контролювати імміграцію","Управляти державними лікарнями"],
    exp: "Local governments (councils) manage local community needs such as rubbish collection, local roads, parks, libraries and local planning. (Our Common Bond, Part 3)",
    uaExp: "Місцеве самоврядування керує місцевими потребами: збором сміття, місцевими дорогами, парками, бібліотеками та місцевим плануванням. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is a referendum in Australia?",
    opts: ["A vote to change the Australian Constitution","A vote to elect the Prime Minister","A vote to elect senators","A vote to change state laws"],
    a: 0,
    ua: "Що таке референдум в Австралії?",
    uaOpts: ["Голосування за зміну Конституції Австралії","Голосування за обрання прем'єр-міністра","Голосування за обрання сенаторів","Голосування за зміну законів штату"],
    exp: "A referendum is a vote to change the Australian Constitution. Australian citizens have a say in how Australia is governed by voting in elections and referendums. (Our Common Bond, Part 2 & 3)",
    uaExp: "Референдум — голосування за зміну Конституції Австралії. Громадяни беруть участь в управлінні країною через вибори та референдуми. (Частини 2 і 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the High Court of Australia?",
    opts: ["The highest court in Australia that interprets the Constitution","The court that handles criminal cases only","The state-level court","The court that handles immigration cases only"],
    a: 0,
    ua: "Що таке Верховний суд Австралії?",
    uaOpts: ["Найвищий суд Австралії, що тлумачить Конституцію","Суд, що розглядає лише кримінальні справи","Суд на рівні штату","Суд, що розглядає лише справи про імміграцію"],
    exp: "The High Court of Australia is the highest court in the land. It is located in Canberra, along with Parliament House and other national institutions. It interprets the Australian Constitution. (Our Common Bond, Part 3)",
    uaExp: "Верховний суд — найвищий суд Австралії, розташований у Канберрі. Він тлумачить Конституцію. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the Australian Defence Force made up of?",
    opts: ["The Army, Navy and Air Force","The Army and Police","The Navy and Border Force","The Army, Navy, Air Force and Police"],
    a: 0,
    ua: "З чого складаються Збройні сили Австралії?",
    uaOpts: ["Армія, Військово-морський флот та Повітряні сили","Армія та поліція","Флот та Прикордонна служба","Армія, флот, авіація та поліція"],
    exp: "Australian citizens have the right to apply for a job in the Australian Defence Force (the Army, Navy and Air Force). (Our Common Bond, Part 2)",
    uaExp: "Громадяни Австралії мають право подавати заявки на роботу в Збройних силах — Армії, Військово-морському флоті та Повітряних силах. (Частина 2)"
  },

  // ── 🇦🇺 AUSTRALIAN VALUES ──
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which of the following best describes an Australian value?",
    opts: ["Respect for the equal worth, dignity and freedom of the individual","Placing your own cultural practices above Australian law","Following only your community's rules","Obeying religious leaders above all others"],
    a: 0,
    ua: "Що найкраще описує австралійську цінність?",
    uaOpts: ["Повага до рівної цінності, гідності та свободи особистості","Ставлення власних культурних практик вище австралійського закону","Дотримання лише правил своєї громади","Підкорення релігійним лідерам понад усе"],
    exp: "Australians believe in shared values such as the dignity and freedom of each person, equal opportunity for men and women, and the Rule of Law. Australian citizenship is about living out these values in everyday life. (Our Common Bond, Part 4)",
    uaExp: "Австралійці вірять у спільні цінності: гідність і свободу особистості, рівні можливості для чоловіків і жінок, та верховенство права. (Частина 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "How should Australians treat each other regardless of their background?",
    opts: ["With dignity and respect","According to their wealth and status","Based on their country of origin","Depending on their religion"],
    a: 0,
    ua: "Як австралійці повинні ставитися один до одного незалежно від походження?",
    uaOpts: ["З гідністю та повагою","Відповідно до їхнього багатства та статусу","Залежно від країни походження","Залежно від релігії"],
    exp: "All Australians are expected to treat each other with dignity and respect, regardless of their race, country of origin, gender, sexual orientation, marital status, age, disability, heritage, culture, politics, wealth or religion. (Our Common Bond, Part 2)",
    uaExp: "Всі австралійці мають ставитись один до одного з гідністю та повагою — незалежно від раси, статі, віку, релігії, культури чи статку. (Частина 2)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "In Australia, is it acceptable to use violence to change laws or government policy?",
    opts: ["No, Australians reject violence as a way to change laws or minds","Yes, if it is for a good cause","Yes, if enough people agree","It depends on the situation"],
    a: 0,
    ua: "Чи прийнятно в Австралії використовувати насилля для зміни законів?",
    uaOpts: ["Ні, австралійці відкидають насилля як спосіб змін","Так, якщо це заради доброї справи","Так, якщо достатньо людей погоджуються","Залежить від ситуації"],
    exp: "We reject violence as a way to change a person's mind or the law. Australians believe that change should occur through discussion, peaceful persuasion, and the democratic process. (Our Common Bond, Part 2)",
    uaExp: "Австралійці відкидають насилля як засіб змін. Зміни мають відбуватися через обговорення, мирне переконання та демократичний процес. (Частина 2)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Freedom of religion in Australia means:",
    opts: ["People are free to follow any religion or no religion, within the law","Everyone must follow a religion","Only Christian religions are permitted","Religious practices always override Australian law"],
    a: 0,
    ua: "Свобода віросповідання в Австралії означає:",
    uaOpts: ["Люди вільні сповідувати будь-яку релігію або жодну, в межах закону","Кожен повинен сповідувати релігію","Дозволені лише християнські релігії","Релігійні практики завжди мають пріоритет над законом"],
    exp: "People in Australia are free to follow any religion they choose. They may also not choose to follow a religion. At all times, even while engaging in religious practices, the laws of Australia must be obeyed. (Our Common Bond, Part 2)",
    uaExp: "В Австралії люди вільні сповідувати будь-яку релігію або жодної. При цьому закони Австралії завжди мають дотримуватись. (Частина 2)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Is the Australian government secular?",
    opts: ["Yes, it operates separately from churches and religious entities","No, it is guided by Christian principles","No, the King is head of the church and government","It depends on which party is in power"],
    a: 0,
    ua: "Чи є австралійський уряд світським?",
    uaOpts: ["Так, він діє окремо від церков та релігійних організацій","Ні, він керується християнськими принципами","Ні, Король є главою церкви та уряду","Залежить від партії при владі"],
    exp: "The government in Australia is secular, which means it operates separately from churches or other religious entities. There is no official national religion. (Our Common Bond, Part 2)",
    uaExp: "Австралійський уряд є світським — він діє окремо від церков. Офіційної релігії немає. (Частина 2)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What does the Australian Citizenship Pledge include a promise to do?",
    opts: ["Share democratic beliefs, respect rights and liberties, and uphold and obey Australian laws","Only pay taxes and speak English","Only give up all other citizenships","Only serve in the military if asked"],
    a: 0,
    ua: "Що включає Клятва громадянства Австралії?",
    uaOpts: ["Поділяти демократичні переконання, поважати права та свободи, дотримуватися законів","Лише платити податки та розмовляти англійською","Лише відмовитись від інших громадянств","Лише служити в армії при необхідності"],
    exp: "The Australian Citizenship Pledge: 'I pledge my loyalty to Australia and its people, whose democratic beliefs I share, whose rights and liberties I respect, and whose laws I will uphold and obey.' (Our Common Bond, Introduction)",
    uaExp: "Клятва громадянства: 'Присягаю на вірність Австралії та її народу, поділяю демократичні переконання, поважаю права та свободи, і дотримуватимусь законів.' (Вступ)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which statement reflects Australian values about cultural practices?",
    opts: ["Cultural practices within Australian law are respected, but no cultural practice can override the law","All cultural practices are allowed regardless of Australian law","Only Australian-born cultural practices are accepted","Cultural practices from the UK have higher status"],
    a: 0,
    ua: "Яке твердження відображає цінності Австралії щодо культурних практик?",
    uaOpts: ["Культурні практики в межах закону поважаються, але жодна не може порушувати закон","Будь-які культурні практики дозволені незалежно від закону","Лише практики народжених в Австралії приймаються","Культурні практики з Великої Британії мають вищий статус"],
    exp: "Australians respect the differences between people but within Australian law. Where there is a conflict between Australian law and a cultural or religious practice, Australian law prevails. (Our Common Bond, Parts 2 & 4)",
    uaExp: "Австралійці поважають культурні відмінності, але в межах закону. У разі конфлікту між культурною практикою та австралійським законом — закон має пріоритет. (Частини 2 і 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What makes Australia a successful multicultural nation?",
    opts: ["Combining cultural diversity with national unity and shared values","Forcing everyone to adopt the same culture","Limiting immigration to only certain countries","Making everyone speak the same language at home"],
    a: 0,
    ua: "Що робить Австралію успішною багатокультурною нацією?",
    uaOpts: ["Поєднання культурного різноманіття з національною єдністю та спільними цінностями","Примус всіх прийняти однакову культуру","Обмеження імміграції лише з певних країн","Примус всіх розмовляти однією мовою вдома"],
    exp: "Australia successfully combines ethnic and cultural diversity with national unity. While we celebrate the diversity of Australia's people, we also aim to build a cohesive and unified nation. (Our Common Bond, Part 1)",
    uaExp: "Австралія успішно поєднує культурне різноманіття з національною єдністю. Різноманіття цінується, але метою є також єдина та згуртована нація. (Частина 1)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "When does a person officially become an Australian citizen at a citizenship ceremony?",
    opts: ["When they make the Australian Citizenship Pledge","When they receive their certificate","When they enter the ceremony venue","When they sing the national anthem"],
    a: 0,
    ua: "Коли людина офіційно стає громадянином Австралії?",
    uaOpts: ["Коли вони виголошують Клятву громадянства","Коли вони отримують свідоцтво","Коли вони входять до місця церемонії","Коли вони співають гімн"],
    exp: "You do not become an Australian citizen until you have made your pledge of commitment to Australia — the Australian Citizenship Pledge. This is the most important part of the ceremony. (Our Common Bond, Introduction)",
    uaExp: "Ви не стаєте громадянином Австралії до того, як виголосите Клятву громадянства — це найважливіша частина церемонії. (Вступ)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which of the following is NOT a shared Australian value?",
    opts: ["Placing family laws above Australian law","Respect for the law","Freedom of speech","Equality of opportunity"],
    a: 0,
    ua: "Що з наведеного НЕ є спільною австралійською цінністю?",
    uaOpts: ["Ставлення сімейних законів вище австралійського закону","Повага до закону","Свобода слова","Рівність можливостей"],
    exp: "Australian law prevails over any other set of rules — including family, cultural or religious rules. Respect for the law, freedom of speech, and equality of opportunity ARE Australian values. (Our Common Bond, Parts 2 & 4)",
    uaExp: "Австралійський закон має пріоритет над будь-якими іншими правилами — сімейними, культурними чи релігійними. Повага до закону, свобода слова та рівність можливостей — це австралійські цінності. (Частини 2 і 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which of the following is a shared value in Australian society?",
    opts: ["Respect for the law","Obedience to government at all times","Prioritising your own culture above others","Speaking only English"],
    a: 0,
    ua: "Яка з наведених є спільною цінністю австралійського суспільства?",
    uaOpts: ["Повага до закону","Беззаперечна слухняність уряду","Пріоритет власної культури над іншими","Розмова лише англійською"],
    exp: "Respect for the law is a core Australian value. The Rule of Law means everyone must obey Australia's laws — but this does not mean blind obedience; it means all are equal before the law. (Our Common Bond, Parts 2 & 4)",
    uaExp: "Повага до закону — ключова австралійська цінність. Верховенство права означає, що всі рівні перед законом. (Частини 2 і 4)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "In Australia, men and women have equal rights. Which statement is consistent with this value?",
    opts: ["Women and men have the same legal rights and freedoms","Men have more legal rights than women","Women must obey their husbands by law","Women cannot vote in elections"],
    a: 0,
    ua: "В Австралії чоловіки та жінки мають рівні права. Яке твердження відповідає цій цінності?",
    uaOpts: ["Жінки та чоловіки мають однакові юридичні права та свободи","Чоловіки мають більше юридичних прав","За законом жінки повинні підкорятися чоловікам","Жінки не можуть голосувати"],
    exp: "Men and women have equal rights in Australia. It is against the law to discriminate against a person because of their gender. This is a fundamental Australian value. (Our Common Bond, Parts 2 & 4)",
    uaExp: "Чоловіки та жінки мають рівні права. Дискримінація за статтю є незаконною — це фундаментальна австралійська цінність. (Частини 2 і 4)"
  },

  // ── 📋 TEST FORMAT ──
  {
    cat: "📋 Test Format",
    en: "How many questions are in the Australian citizenship test?",
    opts: ["20","25","15","30"],
    a: 0,
    ua: "Скільки питань у тесті на австралійське громадянство?",
    uaOpts: ["20","25","15","30"],
    exp: "The citizenship test consists of 20 randomly selected questions. As of 15 November 2020, it includes five questions on Australian values. (Our Common Bond, Introduction)",
    uaExp: "Тест складається з 20 випадкових питань. З 15 листопада 2020 року він включає 5 питань про австралійські цінності. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "What is the minimum passing score for the citizenship test?",
    opts: ["75% (15 out of 20)","50% (10 out of 20)","80% (16 out of 20)","100% (20 out of 20)"],
    a: 0,
    ua: "Який мінімальний прохідний бал для тесту на громадянство?",
    uaOpts: ["75% (15 з 20)","50% (10 з 20)","80% (16 з 20)","100% (20 з 20)"],
    exp: "To pass the test, you must answer all five of the values questions correctly, with a mark of at least 75 per cent overall (15 out of 20). (Our Common Bond, Introduction)",
    uaExp: "Для проходження потрібно набрати мінімум 75% (15 з 20) і відповісти правильно на всі 5 питань про цінності. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "How many Australian values questions must you answer correctly to pass?",
    opts: ["All 5","At least 3","At least 4","At least 2"],
    a: 0,
    ua: "На скільки питань про австралійські цінності потрібно відповісти правильно?",
    uaOpts: ["Всі 5","Принаймні 3","Принаймні 4","Принаймні 2"],
    exp: "From 15 November 2020, you must answer all five of the Australian values questions correctly in addition to achieving at least 75% overall. (Our Common Bond, Introduction)",
    uaExp: "З 15 листопада 2020 року: потрібно відповісти правильно на ВСІ 5 питань про цінності, плюс набрати мінімум 75% загалом. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "How long do you have to complete the citizenship test?",
    opts: ["45 minutes","30 minutes","60 minutes","20 minutes"],
    a: 0,
    ua: "Скільки часу відведено для проходження тесту на громадянство?",
    uaOpts: ["45 хвилин","30 хвилин","60 хвилин","20 хвилин"],
    exp: "You have 45 minutes to complete the citizenship test. The test is a computer-based, multiple choice test in English. (Our Common Bond, Introduction)",
    uaExp: "На проходження тесту відведено 45 хвилин. Тест — комп'ютерний, з варіантами відповідей, лише англійською. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "The citizenship test is available in which language?",
    opts: ["English only","Any language you choose","English and your native language","All official UN languages"],
    a: 0,
    ua: "Якою мовою доступний тест на громадянство?",
    uaOpts: ["Лише англійською","Будь-якою мовою за вибором","Англійською та рідною мовою","Всіма офіційними мовами ООН"],
    exp: "The citizenship test is a computer-based, multiple choice test in English. Text-to-speech technology is available to listen to questions. (Our Common Bond, Introduction)",
    uaExp: "Тест проводиться лише англійською мовою. Доступна технологія озвучення питань. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "What is the official study resource for the Australian citizenship test?",
    opts: ["Australian Citizenship: Our Common Bond","The Australian Constitution","The Australian Government website","The Immigration Handbook"],
    a: 0,
    ua: "Який офіційний навчальний ресурс для тесту на громадянство?",
    uaOpts: ["'Australian Citizenship: Our Common Bond'","Конституція Австралії","Сайт австралійського уряду","Довідник з імміграції"],
    exp: "To prepare for the citizenship test you will need to read the resource book 'Australian Citizenship: Our Common Bond'. All the information you need to pass the test is in the first four parts of this book. (Our Common Bond, Introduction)",
    uaExp: "Офіційний навчальний ресурс — книжка 'Australian Citizenship: Our Common Bond'. Вся необхідна інформація — у перших чотирьох частинах. (Вступ)"
  },

  // ── 🌏 AUSTRALIA & ITS PEOPLE (extra 9) ──
  {
    cat: "🌏 Australia & Its People",
    en: "What was the name of the first colony established by the British in Australia?",
    opts: ["New South Wales","Victoria","Queensland","South Australia"],
    a: 0,
    ua: "Як називалась перша колонія, заснована британцями в Австралії?",
    uaOpts: ["Новий Південний Уельс","Вікторія","Квінсленд","Південна Австралія"],
    exp: "New South Wales was the first colony established by the British. Sydney is its capital city and is the nation's largest city. (Our Common Bond, Part 1)",
    uaExp: "Новий Південний Уельс — перша британська колонія. Сідней є її столицею та найбільшим містом країни. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What is Australia's largest city?",
    opts: ["Sydney","Melbourne","Brisbane","Perth"],
    a: 0,
    ua: "Яке найбільше місто Австралії?",
    uaOpts: ["Сідней","Мельбурн","Брісбен","Перт"],
    exp: "Sydney is the capital city of New South Wales and is the nation's largest city. The Sydney Harbour Bridge and Opera House are national icons. (Our Common Bond, Part 1)",
    uaExp: "Сідней — столиця Нового Південного Уельсу та найбільше місто країни. Міст Харбор-Брідж та Опера — національні символи. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "Where are the Torres Strait Islands located?",
    opts: ["To the north of Queensland","To the south of Tasmania","Off the coast of Western Australia","Near Darwin in the Northern Territory"],
    a: 0,
    ua: "Де розташовані острови Торресової протоки?",
    uaOpts: ["На північ від Квінсленду","На південь від Тасманії","Біля узбережжя Західної Австралії","Поблизу Дарвіна в Північній Території"],
    exp: "The Torres Strait Islands lie to the north of Queensland and the world-famous Great Barrier Reef runs along its eastern coast. (Our Common Bond, Part 1)",
    uaExp: "Острови Торресової протоки розташовані на північ від Квінсленду. Вздовж східного узбережжя проходить Великий Бар'єрний риф. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What icons are associated with Victoria?",
    opts: ["Melbourne Cricket Ground, the 12 Apostles, and the Royal Exhibition Building","Sydney Opera House and Harbour Bridge","Uluru and Kings Canyon","Great Barrier Reef and Daintree Rainforest"],
    a: 0,
    ua: "Які символи пов'язані з Вікторією?",
    uaOpts: ["Мельбурнський крикетний стадіон, 12 апостолів та Королівська виставкова будівля","Сіднейська опера та міст Харбор-Брідж","Улуру та Кінгс Каньон","Великий Бар'єрний риф та ліс Дейнтрі"],
    exp: "Victoria's icons include the Melbourne Cricket Ground, the 12 Apostles, and the Royal Exhibition Building. Many fine buildings in Victoria were built from the wealth created by the gold rush of the 1850s. (Our Common Bond, Part 1)",
    uaExp: "Символи Вікторії: Мельбурнський крикетний стадіон, 12 апостолів та Королівська виставкова будівля. Багато будівель збудовані на кошти від золотої лихоманки 1850-х. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What iconic landmarks are found in the Northern Territory?",
    opts: ["Uluru, Kata Tjuta and Kings Canyon","The 12 Apostles and Great Ocean Road","The Barossa Valley and Flinders Ranges","Cradle Mountain and Port Arthur"],
    a: 0,
    ua: "Які знакові місця є в Північній Території?",
    uaOpts: ["Улуру, Ката Тьюта та Кінгс Каньон","12 апостолів та Грейт Оушен Роуд","Долина Бароса та гори Флінерс","Гора Крейдл та Порт-Артур"],
    exp: "Northern Territory icons include Uluru, Kata Tjuta and Kings Canyon. The Northern Territory has a tropical environment in the north and dry red desert in the south. (Our Common Bond, Part 1)",
    uaExp: "Символи Північної Території: Улуру, Ката Тьюта та Кінгс Каньон. На півночі — тропіки, на півдні — червона пустеля. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the black top half of the Aboriginal Flag represent?",
    opts: ["The Aboriginal peoples of Australia","The night sky","Coal and mining","Death and mourning"],
    a: 0,
    ua: "Що символізує чорна верхня половина прапора аборигенів?",
    uaOpts: ["Аборигенний народ Австралії","Нічне небо","Вугілля та видобуток","Смерть та жалоба"],
    exp: "On the Aboriginal Flag, the top half is black and represents the Aboriginal peoples of Australia. The bottom half is red representing the earth, and the yellow circle represents the sun. (Our Common Bond, Part 1)",
    uaExp: "Чорний верх прапора аборигенів символізує абор. народ. Червоний низ — землю. Жовте коло — сонце. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What does the green on the Torres Strait Islander Flag represent?",
    opts: ["The land","The sea","The Torres Strait Islander people","Peace"],
    a: 0,
    ua: "Що символізує зелений колір на прапорі жителів Торресової протоки?",
    uaOpts: ["Землю","Море","Народ Торресової протоки","Мир"],
    exp: "On the Torres Strait Islander Flag, the green stripes represent the land. The blue panel represents the sea, the black lines represent the Torres Strait Islander people, and white symbolises peace. (Our Common Bond, Part 1)",
    uaExp: "На прапорі Торресової протоки зелений — земля, синій — море, чорний — народ, білий — мир. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "What large wave of non-British migration came to Australia after World War II?",
    opts: ["Large numbers of Europeans came to build a new life","Chinese migrants during the gold rush","American soldiers who stayed after the war","Pacific Islander communities"],
    a: 0,
    ua: "Яка велика хвиля не-британської міграції прийшла до Австралії після Другої світової війни?",
    uaOpts: ["Велика кількість європейців приїхала будувати нове життя","Китайські мігранти під час золотої лихоманки","Американські солдати, які залишились після війни","Громади жителів Тихоокеанських островів"],
    exp: "A wave of non-British migration came after World War II, when millions of people in Europe had to leave their homelands. Large numbers of Europeans came to Australia to build a new life. (Our Common Bond, Part 1)",
    uaExp: "Після Другої світової війни велика кількість європейців, змушених залишити батьківщину, приїхала до Австралії будувати нове життя. (Частина 1)"
  },
  {
    cat: "🌏 Australia & Its People",
    en: "People from how many countries have made Australia their home?",
    opts: ["More than 200","More than 50","More than 100","More than 150"],
    a: 0,
    ua: "Люди з якої кількості країн зробили Австралію своїм домом?",
    uaOpts: ["Більше 200","Більше 50","Більше 100","Більше 150"],
    exp: "People from more than 200 countries have made Australia their home. As a result, our society is one of the most diverse in the world. (Our Common Bond, Part 1)",
    uaExp: "Люди з більш ніж 200 країн зробили Австралію своїм домом, що робить австралійське суспільство одним з найрізноманітніших у світі. (Частина 1)"
  },

  // ── 🗳️ DEMOCRACY & RIGHTS (extra 7) ──
  {
    cat: "🗳️ Democracy & Rights",
    en: "What is freedom of expression in Australia?",
    opts: ["The right to express views through art, film, music and literature","The right to say anything without legal consequences","The right to ignore copyright laws","The right to broadcast on any media channel"],
    a: 0,
    ua: "Що таке свобода самовираження в Австралії?",
    uaOpts: ["Право висловлювати погляди через мистецтво, кіно, музику та літературу","Право говорити будь-що без правових наслідків","Право ігнорувати авторське право","Право мовлення на будь-якому медіаканалі"],
    exp: "Freedom of expression means people can express their views, including through art, film, music and literature. People are free to meet in public or private places for social or political discussion. (Our Common Bond, Part 2)",
    uaExp: "Свобода самовираження — право висловлювати погляди через мистецтво, кіно, музику та літературу, а також збиратися для обговорення. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which of the following is a privilege ONLY available to Australian citizens (not permanent residents)?",
    opts: ["Applying for an Australian passport","Working in Australia","Using Medicare","Owning property in Australia"],
    a: 0,
    ua: "Що є привілеєм ЛИШЕ громадян Австралії (не постійних резидентів)?",
    uaOpts: ["Подання заявки на австралійський паспорт","Робота в Австралії","Використання Medicare","Власність на нерухомість в Австралії"],
    exp: "As an Australian citizen you can apply for an Australian passport and re-enter Australia freely. This privilege is not available to permanent residents. (Our Common Bond, Part 2)",
    uaExp: "Лише громадяни Австралії можуть отримати австралійський паспорт і вільно повертатися до Австралії без візи. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What can Australian citizens do if they are in trouble overseas?",
    opts: ["Ask for consular assistance from an Australian official","Only contact their home country's embassy","Call the Australian police","Contact the United Nations"],
    a: 0,
    ua: "Що можуть робити громадяни Австралії, якщо вони потрапили у скруту за кордоном?",
    uaOpts: ["Звернутися за консульською допомогою до австралійського чиновника","Лише контактувати з посольством рідної країни","Зателефонувати австралійській поліції","Звернутися до ООН"],
    exp: "Australian citizens can ask for consular assistance from an Australian official while overseas. Australian officials can help with emergency passports, and support in case of accident, serious illness or death. (Our Common Bond, Part 2)",
    uaExp: "Громадяни Австралії можуть звертатися за консульською допомогою за кордоном — з питань надзвичайних паспортів, нещасних випадків, хвороби чи смерті. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Which of the following is NOT a responsibility of Australian citizenship?",
    opts: ["Applying for an Australian passport","Voting in federal elections","Serving on a jury if called","Obeying Australian laws"],
    a: 0,
    ua: "Що з наведеного НЕ є обов'язком громадянства Австралії?",
    uaOpts: ["Подання заявки на австралійський паспорт","Голосування на федеральних виборах","Засідання в журі присяжних","Дотримання австралійських законів"],
    exp: "Applying for an Australian passport is a privilege, not a responsibility. Responsibilities include: obeying laws, voting, defending Australia if needed, and serving on a jury. (Our Common Bond, Part 2)",
    uaExp: "Отримання австралійського паспорту — це привілей, а не обов'язок. Обов'язки: дотримання законів, голосування, оборона країни, участь у журі. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Who is eligible to serve on a jury in Australia?",
    opts: ["Australian citizens aged 18 and over who are on the electoral roll","Any resident of Australia","Only lawyers and legal professionals","Only people who have lived in Australia for 10+ years"],
    a: 0,
    ua: "Хто має право засідати в журі присяжних в Австралії?",
    uaOpts: ["Громадяни Австралії від 18 років, які є у виборчих списках","Будь-який житель Австралії","Лише юристи та правові спеціалісти","Лише люди, що прожили в Австралії 10+ років"],
    exp: "Jury service is a responsibility for Australian citizens aged 18 years or over. Australian citizens who are on the electoral roll can be called to serve on a jury. (Our Common Bond, Part 2)",
    uaExp: "Засідати в журі можуть громадяни Австралії від 18 років, які внесені до виборчих списків. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "What does Australia's parliamentary democracy mean for elected representatives?",
    opts: ["They must answer to the people through elections for the decisions they make","They can make any decision without accountability","They serve for life once elected","They are appointed by the Governor-General"],
    a: 0,
    ua: "Що означає парламентська демократія Австралії для обраних представників?",
    uaOpts: ["Вони повинні звітувати перед народом через вибори за свої рішення","Вони можуть приймати будь-які рішення без відповідальності","Вони служать довічно після обрання","Вони призначаються Генерал-губернатором"],
    exp: "The representatives in parliament must answer to the people, through elections, for the decisions they make. The power of the government comes from the Australian people because citizens vote for people to represent them. (Our Common Bond, Part 2)",
    uaExp: "Представники в парламенті мають звітувати перед народом через вибори. Влада уряду виходить від громадян, які голосують. (Частина 2)"
  },
  {
    cat: "🗳️ Democracy & Rights",
    en: "Can Australian citizens apply for jobs in the Australian Public Service?",
    opts: ["Yes, this is a privilege of Australian citizenship","No, only permanent residents can apply","Yes, but only if born in Australia","No, all public service jobs are appointed by the government"],
    a: 0,
    ua: "Чи можуть громадяни Австралії подавати заявки на роботу в державних службах?",
    uaOpts: ["Так, це привілей австралійського громадянства","Ні, лише постійні резиденти можуть подавати заявки","Так, але лише народжені в Австралії","Ні, всі державні посади призначаються урядом"],
    exp: "A privilege of Australian citizenship is to apply for a job in the Australian Public Service, for example in Services Australia or the Australian Taxation Office (ATO). (Our Common Bond, Part 2)",
    uaExp: "Привілей громадянства — право подавати заявки на роботу в державних службах, наприклад у Services Australia або Податковому офісі (ATO). (Частина 2)"
  },

  // ── 🏛️ GOVERNMENT & LAW (extra 8) ──
  {
    cat: "🏛️ Government & Law",
    en: "What document sets out the rules for governing Australia?",
    opts: ["The Australian Constitution","The Bill of Rights","The Federation Charter","The Commonwealth Agreement"],
    a: 0,
    ua: "Який документ встановлює правила управління Австралією?",
    uaOpts: ["Конституція Австралії","Білль про права","Хартія федерації","Угода Співдружності"],
    exp: "In 1901, the colonies were united into a federation and national democratic institutions were established under the new Australian Constitution. The Constitution is the legal foundation of Australia's government. (Our Common Bond, Part 1 & 3)",
    uaExp: "У 1901 році під новою Конституцією Австралії були засновані національні демократичні інститути. Конституція — правова основа уряду. (Частини 1 і 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What role does the Governor play in each Australian state?",
    opts: ["The Governor represents the King in each state","The Governor is the elected head of state government","The Governor makes all state laws","The Governor controls state finances"],
    a: 0,
    ua: "Яку роль відіграє губернатор у кожному австралійському штаті?",
    uaOpts: ["Губернатор представляє Короля в кожному штаті","Губернатор є виборним главою уряду штату","Губернатор ухвалює всі закони штату","Губернатор контролює фінанси штату"],
    exp: "Each state also has a Governor who represents the King at the state level, just as the Governor-General represents the King at the national level. (Our Common Bond, Part 3)",
    uaExp: "Кожен штат має губернатора, який представляє Короля на рівні штату — так само, як Генерал-губернатор представляє Короля на національному рівні. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the role of the Senate in the Australian Parliament?",
    opts: ["To review and approve laws passed by the House of Representatives","To elect the Prime Minister","To appoint the Governor-General","To manage the national budget only"],
    a: 0,
    ua: "Яка роль Сенату в австралійському парламенті?",
    uaOpts: ["Перегляд та затвердження законів, прийнятих Палатою представників","Обрання прем'єр-міністра","Призначення Генерал-губернатора","Лише управління національним бюджетом"],
    exp: "The Australian Parliament consists of the Senate and the House of Representatives. Both houses must agree for a bill to become law — the Senate reviews legislation passed by the House of Representatives. (Our Common Bond, Part 3)",
    uaExp: "Парламент складається з Сенату та Палати представників. Обидві палати мають погодитися, щоб закон набув чинності. Сенат переглядає законодавство. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which level of government is responsible for police services?",
    opts: ["State and territory governments","Federal government","Local councils","The Governor-General"],
    a: 0,
    ua: "Який рівень урядування відповідає за поліцейські служби?",
    uaOpts: ["Уряди штатів та територій","Федеральний уряд","Місцеві ради","Генерал-губернатор"],
    exp: "State and territory governments are responsible for matters including police, hospitals, schools, roads and public transport. (Our Common Bond, Part 3)",
    uaExp: "Уряди штатів і територій відповідають за поліцію, лікарні, школи, дороги та громадський транспорт. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What are the three arms (branches) of Australian government?",
    opts: ["Legislature, Executive and Judiciary","Federal, State and Local","Parliament, Senate and Courts","King, Governor-General and Prime Minister"],
    a: 0,
    ua: "Які три гілки австралійського уряду?",
    uaOpts: ["Законодавча, виконавча та судова","Федеральна, штатна та місцева","Парламент, сенат та суди","Король, Генерал-губернатор та прем'єр-міністр"],
    exp: "The separation of powers divides government into three branches: the Legislature (parliament makes laws), the Executive (government implements laws), and the Judiciary (courts interpret laws). (Our Common Bond, Part 3)",
    uaExp: "Розподіл влад: законодавча (парламент ухвалює закони), виконавча (уряд виконує закони), судова (суди тлумачать закони). (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the primary role of the House of Representatives?",
    opts: ["To form government and pass laws that affect all Australians","To represent only the states","To manage foreign policy exclusively","To appoint all judges"],
    a: 0,
    ua: "Яка основна роль Палати представників?",
    uaOpts: ["Формувати уряд та ухвалювати закони, що стосуються всіх австралійців","Представляти лише штати","Виключно управляти зовнішньою політикою","Призначати всіх суддів"],
    exp: "The House of Representatives is where government is formed. The leader of the party with majority support in the House becomes Prime Minister. The House passes laws that affect all Australians. (Our Common Bond, Part 3)",
    uaExp: "У Палаті представників формується уряд. Лідер партії більшості стає прем'єром. Палата ухвалює закони для всіх австралійців. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "Which government level manages planning and building regulations locally?",
    opts: ["Local government (councils)","State government","Federal government","The Governor's office"],
    a: 0,
    ua: "Який рівень управління відповідає за місцеве планування та будівельні норми?",
    uaOpts: ["Місцеве самоврядування (ради)","Уряд штату","Федеральний уряд","Офіс губернатора"],
    exp: "Local governments (councils) manage local community needs such as rubbish collection, local roads, parks, libraries and local planning regulations. (Our Common Bond, Part 3)",
    uaExp: "Місцеві ради управляють місцевими потребами: збором сміття, дорогами, парками, бібліотеками та місцевим плануванням. (Частина 3)"
  },
  {
    cat: "🏛️ Government & Law",
    en: "What is the role of the Australian Federal Police?",
    opts: ["To enforce federal laws and protect national interests","To enforce state traffic laws only","To manage immigration at airports","To protect only the Prime Minister"],
    a: 0,
    ua: "Яка роль Австралійської федеральної поліції?",
    uaOpts: ["Забезпечення виконання федеральних законів та захист національних інтересів","Лише виконання законів штату про дорожній рух","Управління імміграцією в аеропортах","Лише захист прем'єр-міністра"],
    exp: "The federal government is responsible for national matters including law enforcement at the federal level through the Australian Federal Police, which enforces federal laws and protects national interests. (Our Common Bond, Part 3)",
    uaExp: "Федеральна поліція Австралії забезпечує виконання федеральних законів та захищає національні інтереси на федеральному рівні. (Частина 3)"
  },

  // ── 🇦🇺 AUSTRALIAN VALUES (extra 3) ──
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "Which of the following best describes how Australians view diversity?",
    opts: ["We celebrate diversity while striving for a unified and harmonious nation","Everyone must give up their culture to become Australian","Only Anglo-Australian culture is valued","Diversity is tolerated but not celebrated"],
    a: 0,
    ua: "Як австралійці ставляться до різноманіття?",
    uaOpts: ["Ми святкуємо різноманіття, прагнучи до єдиної та гармонійної нації","Кожен повинен відмовитись від своєї культури","Лише англо-австралійська культура цінується","Різноманіття терпиться, але не святкується"],
    exp: "We celebrate our diversity, and at the same time strive for a unified and harmonious nation. Australia successfully combines ethnic and cultural diversity with national unity. (Our Common Bond, Introduction & Part 1)",
    uaExp: "Австралійці святкують різноманіття, прагнучи водночас до єдиної та гармонійної нації. Різноманіття поєднується з національною єдністю. (Вступ і Частина 1)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "What is the significance of the Australian Citizenship Pledge?",
    opts: ["It is the moment you officially become an Australian citizen and commit to Australia's values","It is just a formality with no legal significance","It replaces the need to pass the citizenship test","It is optional for some applicants"],
    a: 0,
    ua: "Яке значення Клятви громадянства Австралії?",
    uaOpts: ["Це момент, коли ви офіційно стаєте громадянином та берете на себе зобов'язання перед цінностями Австралії","Це лише формальність без юридичного значення","Вона замінює необхідність складати тест","Вона є необов'язковою для деяких заявників"],
    exp: "The Australian Citizenship Pledge is the most important part of the ceremony. You do not become an Australian citizen until you have made your pledge of commitment to Australia. It is a public commitment to Australia and its values. (Our Common Bond, Introduction)",
    uaExp: "Клятва громадянства — найважливіша частина церемонії. Ви не стаєте громадянином до її виголошення. Це публічне зобов'язання перед Австралією та її цінностями. (Вступ)"
  },
  {
    cat: "🇦🇺 Australian Values ⭐",
    en: "In Australia, which of the following best describes the relationship between different cultures and Australian law?",
    opts: ["All people must obey Australian law regardless of their cultural background","Cultural background determines which laws apply to you","Religious leaders can exempt followers from Australian law","Each community can create its own separate legal system"],
    a: 0,
    ua: "В Австралії що найкраще описує стосунки між різними культурами та австралійським законом?",
    uaOpts: ["Всі люди повинні дотримуватись австралійського закону незалежно від культурного походження","Культурне походження визначає, які закони до вас застосовуються","Релігійні лідери можуть звільняти послідовників від австралійського закону","Кожна громада може створити власну окрему правову систему"],
    exp: "The Rule of Law means that no person, group or religious rule is above the law. Everyone must obey Australia's laws regardless of their background, culture or religion. Australian law prevails over cultural or religious practices. (Our Common Bond, Parts 2 & 4)",
    uaExp: "Верховенство права: жодна особа, група чи релігійне правило не є вищим за закон. Всі повинні дотримуватись законів Австралії незалежно від культури чи релігії. (Частини 2 і 4)"
  },

  // ── 📋 TEST FORMAT (extra 4) ──
  {
    cat: "📋 Test Format",
    en: "Where are Australian citizenship tests conducted?",
    opts: ["In Department of Home Affairs offices around Australia","Only in Canberra","Online from home","At local council offices"],
    a: 0,
    ua: "Де проводяться тести на австралійське громадянство?",
    uaOpts: ["В офісах Департаменту внутрішніх справ по всій Австралії","Лише в Канберрі","Онлайн вдома","В офісах місцевих рад"],
    exp: "Citizenship tests are conducted in Department of Home Affairs offices around Australia. Tests are also scheduled in a number of locations throughout regional Australia and in some overseas missions. (Our Common Bond, Introduction)",
    uaExp: "Тести проводяться в офісах Департаменту внутрішніх справ по всій Австралії, включаючи регіональні центри та деякі закордонні місії. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "What happens after you pass the citizenship test?",
    opts: ["Your application continues to be processed and you may be invited to a citizenship ceremony","You automatically become a citizen immediately","You receive your passport the same day","You must sit the test again in 6 months"],
    a: 0,
    ua: "Що відбувається після успішного складання тесту на громадянство?",
    uaOpts: ["Ваша заявка продовжує розглядатися, і вас можуть запросити на церемонію громадянства","Ви автоматично стаєте громадянином одразу","Ви отримуєте паспорт того ж дня","Вам потрібно скласти тест знову через 6 місяців"],
    exp: "If you pass the test, the application continues to be processed. If approved and required to attend a citizenship ceremony, you will receive a letter of invitation. Generally your ceremony will be held within six months from when your application is approved. (Our Common Bond, Introduction)",
    uaExp: "Після проходження тесту заявка продовжує розглядатися. Якщо схвалено — отримаєте запрошення на церемонію, зазвичай протягом 6 місяців. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "What technology is available to help during the citizenship test?",
    opts: ["Text-to-speech technology to listen to questions","A translator in the room","A printed dictionary","An interpreter on the phone"],
    a: 0,
    ua: "Яка технологія доступна під час тесту на громадянство?",
    uaOpts: ["Технологія озвучення тексту для прослуховування питань","Перекладач у кімнаті","Друкований словник","Перекладач по телефону"],
    exp: "Text-to-speech technology, which you can use to listen to the questions and choice of answers, is also available during the citizenship test. (Our Common Bond, Introduction)",
    uaExp: "Під час тесту доступна технологія озвучення тексту — можна прослухати питання та варіанти відповідей. (Вступ)"
  },
  {
    cat: "📋 Test Format",
    en: "What are the four testable parts of 'Our Common Bond'?",
    opts: ["Australia and its people; Democratic beliefs, rights and liberties; Government and the law; Australian values","History, Geography, Politics and Culture","Federation, Constitution, Rights and Responsibilities","Identity, Society, Law and Culture"],
    a: 0,
    ua: "Які чотири тестованих частини книжки 'Our Common Bond'?",
    uaOpts: ["Австралія та її народ; Демократичні переконання, права та свободи; Уряд та закон; Австралійські цінності","Історія, географія, політика та культура","Федерація, конституція, права та обов'язки","Ідентичність, суспільство, закон та культура"],
    exp: "The testable section covers: Part 1 — Australia and its people; Part 2 — Australia's democratic beliefs, rights and liberties; Part 3 — Government and the law in Australia; Part 4 — Australian values. (Our Common Bond, Introduction)",
    uaExp: "Тестовані частини: Частина 1 — Австралія та її народ; Частина 2 — Демократичні переконання, права та свободи; Частина 3 — Уряд та закон; Частина 4 — Австралійські цінності. (Вступ)"
  },
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
  const indices = [0, 1, 2, 3];
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
  "📋 Test Format": "#d35400",
};
const LETTERS = ["A","B","C","D"];

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
                <div style={{ fontSize:11, color:"#999", textAlign:"center", marginBottom:8 }}>Маєш питання або хочеш спілкуватись?</div>
                <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
                  <span style={{ fontSize:16 }}>✈️</span> Спільнота українців в Австралії
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
            <div style={{ fontSize:11, color:"#999", textAlign:"center", marginBottom:8 }}>Маєш питання або хочеш спілкуватись?</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Спільнота українців в Австралії
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
            <div style={{ fontSize:11, color:"#999", textAlign:"center", marginBottom:8 }}>Маєш питання або хочеш спілкуватись?</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Спільнота українців в Австралії
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
            <div style={{ fontSize:11, color:"#999", textAlign:"center", marginBottom:8 }}>Маєш питання або хочеш спілкуватись?</div>
            <a href="https://t.me/uainau" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"#229ED9", color:"white", borderRadius:10, padding:11, fontSize:13, fontWeight:600, textDecoration:"none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.483c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.08 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.447c.535-.194 1.003.13.769.167z"/></svg> Спільнота українців в Австралії
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
