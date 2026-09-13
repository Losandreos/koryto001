
import { Recipe } from './types';

export const INITIAL_RECIPES: Recipe[] = [
  // --- KATEGORIA 1: SNIADANIA NA LEKKIEJ (LIQUID/SHAKES) ---
  {
    id: 1101, title: "Szarlotka w Płynie (Яблочный бетон) 🍏", description: "Słodki grzech bez poczucia winy. Smakuje jak szarlotka mamy, działa jak paliwo rakietowe.", dzik_rationale: "Jeśli nie dodałeś cynamonu – uznam, że nie trenujesz.", protein: 55, carbs: 130, fat: 10, time: 2, price_est: 12, store: 'Biedronka', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Odżywka białkowa", amount: "60g" }, { item: "Mus jabłkowy", amount: "200g" }, { item: "Mleko", amount: "400ml" }], instructions: ["Wszystko do blendera.", "Miksuj do oporu."], image_url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1102, title: "Czekoladowy Wylew 🍫", description: "Gęsty, ciemny, niebezpieczny. Dla fanów czekolady i potężnych łap.", dzik_rationale: "Nie upaćkaj koszulki, czekoladowy Dzik wygląda podejrzanie.", protein: 60, carbs: 125, fat: 15, time: 2, price_est: 14, store: 'Lidl', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Odżywka czekolada", amount: "60g" }, { item: "Kakao", amount: "1 łyżka" }, { item: "Masło orzechowe", amount: "1 łyżka" }], instructions: ["Blender w dłoń i ładuj."], image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1103, title: "Leśny Dzik 🫐", description: "Jagodowy strzał energii. Odświeża głowę i nabija mięśnie glikogenem.", dzik_rationale: "Wygląda jak smoothie dla fitnesiary, ale to czysty anabolizm.", protein: 52, carbs: 128, fat: 8, time: 2, price_est: 15, store: 'Biedronka', ingredients: [{ item: "Mąka ryżowa", amount: "150g" }, { item: "Białko jagoda", amount: "60g" }, { item: "Owoce mrożone", amount: "100g" }], instructions: ["Mrożonki najpierw, potem reszta."], image_url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1104, title: "Rafaello Dla Ubogich 🥥", description: "Biały krem dla królów siłowni. Kokosowy raj w Twoim szejkerze.", dzik_rationale: "Uważaj, od tego smaku można zapomnieć o treningu nóg.", protein: 54, carbs: 125, fat: 20, time: 3, price_est: 18, store: 'Lidl', ingredients: [{ item: "Mąka ryżowa", amount: "150g" }, { item: "Odżywka wanilia", amount: "60g" }, { item: "Wiórki kokosowe", amount: "2 łyżki" }], instructions: ["Płyny, sypkie, kokos. Miksuj."], image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1105, title: "Zielona Masa 🟢", description: "Chcesz być jak Hulk? Pij zielone i nie marudź. Smakuje ananasem.", dzik_rationale: "Jeśli ktoś pyta co pijesz – mów 'krew suchoklatesów'.", protein: 53, carbs: 135, fat: 5, time: 3, price_est: 13, store: 'Biedronka', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Szpinak", amount: "garść" }, { item: "Sok ananasowy", amount: "300ml" }], instructions: ["Szpinak w pył, potem reszta."], image_url: "https://images.unsplash.com/photo-1610970882799-64a3e872b9a3?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1106, title: "Kawo-Beton ☕", description: "Kofeina i kalorie w jednym. Obudź się albo giń.", dzik_rationale: "Po tym szejku wyciśniesz sztangę samym wzrokiem.", protein: 58, carbs: 125, fat: 10, time: 2, price_est: 12, store: 'Lidl', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Kawa", amount: "2 łyżeczki" }, { item: "Mleko", amount: "450ml" }], instructions: ["Kawa, białko, owies. Proste."], image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },
  {
    id: 1107, title: "Elvis Presley 🍌", description: "Królewskie combo. Banan, orzech i tona węgli. Klasyka.", dzik_rationale: "Elvis nie żyje, ale jego masa rośnie w Tobie.", protein: 62, carbs: 130, fat: 25, time: 2, price_est: 14, store: 'Biedronka', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Banan XXL", amount: "1 szt" }, { item: "Masło orzechowe", amount: "2 łyżki" }], instructions: ["Miksuj na gładką śmietanę."], image_url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_LEKKIE']
  },

  // --- SNIADANIA KONKRETNE ---
  {
    id: 1111, title: "Jajówa Drwala 🍳", description: "Poczuj zapach mięsa i zwycięstwa. Góra białka i pół bochenka chleba.", dzik_rationale: "Bez chleba masa się nie liczy. Pamiętaj o tym.", protein: 55, carbs: 120, fat: 35, time: 10, price_est: 15, store: 'Lidl', ingredients: [{ item: "Jaja L", amount: "5 szt" }, { item: "Szynka", amount: "100g" }, { item: "Chleb pszenny", amount: "150g" }], instructions: ["Szynka na chrupko, jaja na to."], image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1112, title: "Wieża Babel 🥪", description: "Dwa piętra czystego anabolizmu. Gryź ostrożnie.", dzik_rationale: "To nie kanapka, to fundament Twojej sylwetki.", protein: 50, carbs: 125, fat: 20, time: 8, price_est: 18, store: 'Biedronka', ingredients: [{ item: "Chleb tostowy", amount: "4 kromki" }, { item: "Szynka indyk", amount: "150g" }, { item: "Ser żółty", amount: "2 plastry" }], instructions: ["Ładuj warstwy. Grubo soku."], image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1113, title: "Twaróg na Wypasie 🍚", description: "Klasyka w nowym wydaniu. Nie suchy wsad, a delikatny mus.", dzik_rationale: "Twaróg to gwarancja, że do obiadu będziesz syty.", protein: 55, carbs: 130, fat: 10, time: 5, price_est: 12, store: 'Lidl', ingredients: [{ item: "Twaróg chudy", amount: "250g" }, { item: "Skyr", amount: "150g" }, { item: "Dżem", amount: "100g" }], instructions: ["Mieszaj na krem. Wafle to łyżki."], image_url: "https://images.unsplash.com/photo-1551462147-37885acc3c44?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1114, title: "Placki Mutanty 🥞", description: "Wygląda jak naleśnik, działa jak gainer. Słodkie i potężne.", dzik_rationale: "Przewracanie tego placka to trening przedramion.", protein: 58, carbs: 128, fat: 15, time: 12, price_est: 14, store: 'Biedronka', ingredients: [{ item: "Mąka owsiana", amount: "150g" }, { item: "Jaja", amount: "2 szt" }, { item: "Białko", amount: "1 miarka" }], instructions: ["Smaż pod przykryciem na małym ogniu."], image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1115, title: "Pasta Rybaka 🐟", description: "Omega-3 i tona białka. Zapach specyficzny, ale masa rośnie.", dzik_rationale: "Nikt do Ciebie nie podejdzie w siłowni – skupienie 100%.", protein: 52, carbs: 120, fat: 20, time: 10, price_est: 16, store: 'Lidl', ingredients: [{ item: "Makrela wędzona", amount: "150g" }, { item: "Jaja gotowane", amount: "2 szt" }, { item: "Chleb czarny", amount: "150g" }], instructions: ["Rozgnieć, wymieszaj, ładuj na chleb."], image_url: "https://images.unsplash.com/photo-1599121231310-762bc2b059c8?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1116, title: "Angol na Masie 🥫", description: "Angielskie śniadanie dla tych, co chcą być więksi niż UK.", dzik_rationale: "Muzyka z brzucha po tym zestawie gwarantowana.", protein: 48, carbs: 135, fat: 30, time: 10, price_est: 18, store: 'Biedronka', ingredients: [{ item: "Fasola w sosie", amount: "1 puszka" }, { item: "Parówki 93%", amount: "3 szt" }, { item: "Chleb", amount: "3 kromki" }], instructions: ["Fasola ciepła, reszta podsmażona."], image_url: "https://images.unsplash.com/photo-1518013394806-5127f7517bbc?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },
  {
    id: 1117, title: "Gofry Zagłady  waffle", description: "Dla leniwych Dzików. Zero gotowania, tylko składanie.", dzik_rationale: "Wygląda jak cheatmeal, ale to czysty anabolizm.", protein: 50, carbs: 140, fat: 18, time: 5, price_est: 20, store: 'Lidl', ingredients: [{ item: "Gofry gotowe", amount: "4 szt" }, { item: "Skyr owocowy", amount: "2 szt" }, { item: "Banan", amount: "1 szt" }], instructions: ["Smaruj, układaj, jedz jak ciasto."], image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800", tags: ['SNIADANIA_KONKRETNE']
  },

  // --- SKLEPOWA AKCJA (20 pozycji) ---
  {
    id: 2001, title: "Waflowy Komandos", description: "Shake + Wafle + Sok. Biedronka Style.", protein: 50, carbs: 125, fat: 10, time: 2, price_est: 22, store: 'Biedronka', ingredients: [{item: "Shake Go Active", amount: "2 szt"}, {item: "Wafle ryżowe", amount: "100g"}, {item: "Sok", amount: "500ml"}], instructions: ["Kup, otwórz, zjedz. Proste."], image_url: "https://images.unsplash.com/photo-1598214817158-ab35539d0446?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2002, title: "Kajzerka Power", description: "Kwark + 4 bułki + banan. Klasyk Lidla.", protein: 52, carbs: 128, fat: 8, time: 3, price_est: 18, store: 'Lidl', ingredients: [{item: "Pilos Kwark", amount: "2 szt"}, {item: "Bułki kajzerki", amount: "4 szt"}, {item: "Banan", amount: "1 szt"}], instructions: ["Jedz i popijaj kwarkiem."], image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2003, title: "Sokowy Zalew", description: "Maksymalna prędkość dostawy białka.", protein: 50, carbs: 120, fat: 2, time: 1, price_est: 20, store: 'Biedronka', ingredients: [{item: "Shot Protein", amount: "2 szt"}, {item: "Sok jabłkowy 1L", amount: "1 szt"}], instructions: ["Pij na zmianę. Glikogen i białko."], image_url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2004, title: "Kabanos & Bagietka", description: "Solidna masa w trasie.", protein: 55, carbs: 130, fat: 28, time: 5, price_est: 25, store: 'Lidl', ingredients: [{item: "Kabanosy XXL", amount: "100g"}, {item: "Bagietka czosnkowa", amount: "1 szt"}, {item: "Szejk proteinowy", amount: "1 szt"}], instructions: ["Żuj kabanosy, zagryzaj bagietką."], image_url: "https://images.unsplash.com/photo-1511210142343-7f7a5542861a?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2005, title: "Skyr-Party", description: "Białkowa uczta dla fanów nabiału.", protein: 50, carbs: 125, fat: 6, time: 4, price_est: 19, store: 'Biedronka', ingredients: [{item: "Skyr 400g", amount: "1.5 szt"}, {item: "Płatki śniadaniowe", amount: "150g"}], instructions: ["Wymieszaj płatki w skyrze."], image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2006, title: "Łosoś na Szybko", description: "Zdrowe tłuszcze i góra węgli.", protein: 50, carbs: 125, fat: 22, time: 5, price_est: 35, store: 'Lidl', ingredients: [{item: "Łosoś wędzony", amount: "150g"}, {item: "Bułki wieloziarniste", amount: "4 szt"}], instructions: ["Rób kanapki w aucie."], image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2007, title: "Tortilla Cold-Mix", description: "Gotowiec podkręcony szejkiem.", protein: 52, carbs: 130, fat: 20, time: 3, price_est: 28, store: 'Biedronka', ingredients: [{item: "Tortilla z kurczakiem", amount: "1 szt"}, {item: "Shake protein", amount: "1 szt"}, {item: "Banan", amount: "1 szt"}], instructions: ["Zjedz tortillę, dopchnij bananem."], image_url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2008, title: "Tuńczykowy Strzał", description: "Czyste białko z puszki i wafle.", protein: 50, carbs: 120, fat: 5, time: 5, price_est: 24, store: 'Lidl', ingredients: [{item: "Tuńczyk w sosie", amount: "2 szt"}, {item: "Wafle kukurydziane", amount: "1 szt"}], instructions: ["Nabieraj tuńczyka na wafle."], image_url: "https://images.unsplash.com/photo-1599121231310-762bc2b059c8?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2009, title: "Mleczny Ryż Combo", description: "Węgle w formie deserowej dla Dzików.", protein: 48, carbs: 135, fat: 15, time: 4, price_est: 22, store: 'Biedronka', ingredients: [{item: "Shake Go Active", amount: "2 szt"}, {item: "Ryż na mleku", amount: "3 szt"}], instructions: ["Szybki miks."], image_url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2010, title: "Hummus & Wafle", description: "Gęste roślinne kalorie.", protein: 45, carbs: 125, fat: 25, time: 5, price_est: 20, store: 'Lidl', ingredients: [{item: "Hummus 300g", amount: "1 szt"}, {item: "Wafle", amount: "1 szt"}, {item: "Szejk", amount: "1 szt"}], instructions: ["Zanurzaj wafle w hummusie."], image_url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2011, title: "Serowy Dzik", description: "Mozzarella i szejk białkowy.", protein: 52, carbs: 128, fat: 30, time: 3, price_est: 26, store: 'Biedronka', ingredients: [{item: "Mozzarella light", amount: "2 paki"}, {item: "Szejk", amount: "1 szt"}, {item: "Paluszki", amount: "100g"}], instructions: ["Zagryzaj paluszkami mozzarellę."], image_url: "https://images.unsplash.com/photo-1523472721958-978152f4d69b?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2012, title: "Batony i Protein", description: "Zestaw ratunkowy na masę.", protein: 50, carbs: 130, fat: 18, time: 2, price_est: 30, store: 'Lidl', ingredients: [{item: "Shake protein", amount: "2 szt"}, {item: "Batony proteinowe", amount: "3 szt"}], instructions: ["Wsuwaj w biegu."], image_url: "https://images.unsplash.com/photo-1622484210811-37d86f78107c?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2013, title: "Kefir & Chleb", description: "Oldschoolowy sposób na masę.", protein: 48, carbs: 135, fat: 10, time: 5, price_est: 15, store: 'Biedronka', ingredients: [{item: "Kefir High Protein", amount: "1L"}, {item: "Bułki", amount: "4 szt"}], instructions: ["Pij i zagryzaj bułką."], image_url: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2014, title: "Sałatka Pasta", description: "Gotowe danie na zimno.", protein: 50, carbs: 125, fat: 22, time: 3, price_est: 24, store: 'Lidl', ingredients: [{item: "Sałatka z makaronem", amount: "1 szt"}, {item: "Szejk", amount: "1 szt"}], instructions: ["Szybki obiad z plastiku."], image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2015, title: "Bakaliowy Doładowca", description: "Gęste kalorie z Biedry.", protein: 45, carbs: 130, fat: 35, time: 2, price_est: 28, store: 'Biedronka', ingredients: [{item: "Pudding Protein", amount: "2 szt"}, {item: "Daktyle", amount: "100g"}], instructions: ["Wrzucaj daktyle do puddingu."], image_url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2016, title: "Serek Wiejski Style", description: "Białko i chrupkie dodatki.", protein: 55, carbs: 120, fat: 15, time: 5, price_est: 18, store: 'Lidl', ingredients: [{item: "Serek Wiejski", amount: "2 szt"}, {item: "Sucharki", amount: "100g"}], instructions: ["Serek jako dip do sucharków."], image_url: "https://images.unsplash.com/photo-1551462147-37885acc3c44?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2017, title: "Kurczak Strips-Ready", description: "Gotowe mięso z Biedry.", protein: 55, carbs: 125, fat: 15, time: 4, price_est: 32, store: 'Biedronka', ingredients: [{item: "Stripsy z kurczaka", amount: "1 paka"}, {item: "Bułki", amount: "3 szt"}], instructions: ["Zrób hot-dogi na zimno."], image_url: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2018, title: "Muesli & Drink", description: "Szybka granola z Lidla.", protein: 45, carbs: 135, fat: 12, time: 3, price_est: 22, store: 'Lidl', ingredients: [{item: "Musli", amount: "150g"}, {item: "Szejk proteinowy", amount: "2 szt"}], instructions: ["Zalej musli szejkiem."], image_url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2019, title: "Owoce & Protein", description: "Lekko i witaminowo na masie.", protein: 52, carbs: 130, fat: 5, time: 5, price_est: 25, store: 'Biedronka', ingredients: [{item: "Szejk", amount: "2 szt"}, {item: "Banany", amount: "2 szt"}], instructions: ["Ładuj wszystko na raz."], image_url: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },
  {
    id: 2020, title: "Sushi Bonus", description: "Sushi podkręcone białkiem.", protein: 45, carbs: 130, fat: 18, time: 5, price_est: 35, store: 'Biedronka', ingredients: [{item: "Sushi Box XXL", amount: "1 szt"}, {item: "Pudding Protein", amount: "1 szt"}], instructions: ["Niszcz sushi, dobij puddingiem."], image_url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", tags: ['OBIADY_AKCJA']
  },

  // --- DOPYCHACZ SOS (12 pozycji) ---
  {
    id: 8001, title: "Herbata z cukrem", description: "Płynny cukier ratuje Twoje mięśnie.", protein: 0, carbs: 20, fat: 0, time: 1, price_est: 1, store: 'Lidl', ingredients: [{item: "Cukier", amount: "3 łyżki"}], instructions: ["Pij gorące, ładuj węgle."], image_url: "https://images.unsplash.com/photo-1544787210-2211d44b886d?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8002, title: "Miód / Dżem", description: "Koncentrat energii prosto z łyżki.", protein: 0, carbs: 35, fat: 0, time: 1, price_est: 2, store: 'Biedronka', ingredients: [{item: "Miód", amount: "2 łyżki"}], instructions: ["Zliż z łyżki, nie marudź."], image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8003, title: "Sok Owocowy", description: "Węgle w płynie – najszybsza droga.", protein: 0, carbs: 30, fat: 0, time: 1, price_est: 3, store: 'Lidl', ingredients: [{item: "Sok", amount: "250ml"}], instructions: ["Pij duszkiem po treningu."], image_url: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8004, title: "Daktyle", description: "Naturalny energetyk dla Dzika.", protein: 1, carbs: 40, fat: 0, time: 1, price_est: 5, store: 'Biedronka', ingredients: [{item: "Daktyle suszone", amount: "5 szt"}], instructions: ["Żuj jak cukierki."], image_url: "https://images.unsplash.com/photo-1596500582235-961d15c8e31b?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8005, title: "Banan", description: "Klasyczne paliwo masowe.", protein: 1.5, carbs: 27, fat: 0.5, time: 1, price_est: 2, store: 'Lidl', ingredients: [{item: "Banan", amount: "1 szt"}], instructions: ["Obierz i niszcz."], image_url: "https://images.unsplash.com/photo-1571771894821-ad9902d73647?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8006, title: "Rodzynki", description: "Ultra-kompaktowa glukoza.", protein: 1, carbs: 30, fat: 0, time: 1, price_est: 3, store: 'Biedronka', ingredients: [{item: "Rodzynki", amount: "40g"}], instructions: ["Garść do ust i jedziesz."], image_url: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8007, title: "Kajzerka na Sucho", description: "Czysta skrobia w sekundę.", protein: 4, carbs: 30, fat: 1, time: 1, price_est: 0.5, store: 'Lidl', ingredients: [{item: "Bułka", amount: "1 szt"}], instructions: ["Zjedz, zapij wodą."], image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8008, title: "Szejk Białkowy", description: "Polisa ubezpieczeniowa dla mięśni.", protein: 35, carbs: 5, fat: 2, time: 2, price_est: 8, store: 'Biedronka', ingredients: [{item: "WPI/WPC", amount: "1.5 miarki"}], instructions: ["Wstrząśnij i pij."], image_url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8009, title: "Wafle z dżemem", description: "Ryż wstępnie strawiony z cukrem.", protein: 2, carbs: 35, fat: 0.5, time: 2, price_est: 4, store: 'Lidl', ingredients: [{item: "Wafle ryżowe", amount: "2 szt"}, {item: "Dżem", amount: "2 łyżki"}], instructions: ["Chrup mocno, rośnij wielki."], image_url: "https://images.unsplash.com/photo-1598214817158-ab35539d0446?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8010, title: "Żelki / Misie", description: "Szybki glikogen w formie zabawy.", protein: 3, carbs: 40, fat: 0, time: 1, price_est: 4, store: 'Biedronka', ingredients: [{item: "Żelki", amount: "50g"}], instructions: ["Najlepsze po treningu."], image_url: "https://images.unsplash.com/photo-1582050058244-4e18045f4535?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8011, title: "Mleko zagęszczone", description: "Słodka gęstość kaloryczna.", protein: 2, carbs: 25, fat: 5, time: 1, price_est: 2, store: 'Lidl', ingredients: [{item: "Mleko słodzone", amount: "2 łyżki"}], instructions: ["Wyliż łyżkę do czysta."], image_url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  },
  {
    id: 8012, title: "Coca-Cola", description: "Metoda ekstremalna na węgle.", protein: 0, carbs: 35, fat: 0, time: 1, price_est: 3, store: 'Biedronka', ingredients: [{item: "Cola klasyczna", amount: "330ml"}], instructions: ["Pij zimną, ładuj energię."], image_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800", tags: ['DOPYCHACZ']
  }
];
