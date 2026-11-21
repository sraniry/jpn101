// Kit survie Kyoto : gare, bus, temple, konbini, distributeurs.
// Même schéma que data/menus.js (kana = lecture complète ; romaji calculé par l'appli).
export const KIT_VOCAB = [
 {
  "id": "gare",
  "icon": "🚉",
  "title": "À la gare",
  "intro": "Les mots des gares de Kyoto : portiques, quais, trains, billets. Tu les vois en kanji sur les panneaux, souvent avec du romaji en dessous.",
  "items": [
   {
    "jp": "改札",
    "kana": "かいさつ",
    "fr": "portiques de la gare",
    "note": "Tu passes ton billet ou ta carte pour entrer et sortir."
   },
   {
    "jp": "改札口",
    "kana": "かいさつぐち",
    "fr": "accès aux portiques"
   },
   {
    "jp": "入口",
    "kana": "いりぐち",
    "fr": "entrée"
   },
   {
    "jp": "出口",
    "kana": "でぐち",
    "fr": "sortie",
    "note": "Les gares ont de nombreuses sorties : repère le nom de la tienne."
   },
   {
    "jp": "八条口",
    "kana": "はちじょうぐち",
    "fr": "sortie Hachijō (côté sud de la gare de Kyoto)",
    "note": "Côté Shinkansen."
   },
   {
    "jp": "中央口",
    "kana": "ちゅうおうぐち",
    "fr": "sortie centrale"
   },
   {
    "jp": "乗り換え",
    "kana": "のりかえ",
    "fr": "correspondance, changement de train"
   },
   {
    "jp": "乗り場",
    "kana": "のりば",
    "fr": "point d'embarquement (quai, arrêt)"
   },
   {
    "jp": "ホーム",
    "kana": "ホーム",
    "fr": "quai"
   },
   {
    "jp": "番線",
    "kana": "ばんせん",
    "fr": "numéro de quai",
    "note": "何番線 = quel quai ?"
   },
   {
    "jp": "〜行き",
    "kana": "ゆき",
    "fr": "à destination de 〜",
    "note": "京都行き = pour Kyoto."
   },
   {
    "jp": "各駅停車",
    "kana": "かくえきていしゃ",
    "fr": "omnibus (s'arrête à toutes les gares)"
   },
   {
    "jp": "普通",
    "kana": "ふつう",
    "fr": "train omnibus (« normal »)",
    "note": "Sur beaucoup de lignes, il s'arrête partout."
   },
   {
    "jp": "快速",
    "kana": "かいそく",
    "fr": "rapide",
    "note": "Saute certaines gares."
   },
   {
    "jp": "特急",
    "kana": "とっきゅう",
    "fr": "express limité",
    "note": "Le plus rapide, avec un supplément."
   },
   {
    "jp": "切符",
    "kana": "きっぷ",
    "fr": "billet"
   },
   {
    "jp": "乗車券",
    "kana": "じょうしゃけん",
    "fr": "billet de transport de base"
   },
   {
    "jp": "特急券",
    "kana": "とっきゅうけん",
    "fr": "supplément pour train express"
   },
   {
    "jp": "券売機",
    "kana": "けんばいき",
    "fr": "distributeur de billets"
   },
   {
    "jp": "精算機",
    "kana": "せいさんき",
    "fr": "machine de régularisation",
    "note": "Si tu as payé trop peu, tu complètes ici avant de sortir."
   },
   {
    "jp": "運賃",
    "kana": "うんちん",
    "fr": "tarif du trajet"
   },
   {
    "jp": "運賃表",
    "kana": "うんちんひょう",
    "fr": "tableau des tarifs",
    "note": "Au-dessus des distributeurs ; le prix dépend de la gare de destination."
   },
   {
    "jp": "ICカード",
    "kana": "アイシーカード",
    "fr": "carte à puce rechargeable",
    "note": "ICOCA, Suica, PASMO…"
   },
   {
    "jp": "ICOCA",
    "kana": "イコカ",
    "fr": "ICOCA (carte IC de JR Ouest)",
    "note": "Marche aussi pour les bus de Kyoto et le métro."
   },
   {
    "jp": "チャージ",
    "kana": "チャージ",
    "fr": "recharger (une carte)"
   },
   {
    "jp": "定期券",
    "kana": "ていきけん",
    "fr": "abonnement"
   },
   {
    "jp": "地下鉄",
    "kana": "ちかてつ",
    "fr": "métro",
    "note": "À Kyoto : lignes Karasuma (烏丸線) et Tōzai (東西線)."
   },
   {
    "jp": "JR",
    "kana": "ジェイアール",
    "fr": "JR (Japan Railways)"
   },
   {
    "jp": "京都駅",
    "kana": "きょうとえき",
    "fr": "gare de Kyoto"
   },
   {
    "jp": "次の駅",
    "kana": "つぎのえき",
    "fr": "prochaine gare"
   },
   {
    "jp": "始発",
    "kana": "しはつ",
    "fr": "premier train"
   },
   {
    "jp": "終電",
    "kana": "しゅうでん",
    "fr": "dernier train"
   },
   {
    "jp": "遅延",
    "kana": "ちえん",
    "fr": "retard"
   },
   {
    "jp": "運転見合わせ",
    "kana": "うんてんみあわせ",
    "fr": "circulation suspendue"
   },
   {
    "jp": "指定席",
    "kana": "していせき",
    "fr": "place réservée"
   },
   {
    "jp": "自由席",
    "kana": "じゆうせき",
    "fr": "place non réservée"
   },
   {
    "jp": "禁煙",
    "kana": "きんえん",
    "fr": "interdit de fumer"
   },
   {
    "jp": "優先席",
    "kana": "ゆうせんせき",
    "fr": "place prioritaire",
    "note": "Réservée aux personnes âgées, enceintes, handicapées."
   }
  ]
 },
 {
  "id": "bus",
  "icon": "🚌",
  "title": "Dans le bus",
  "intro": "Le bus est le meilleur moyen de rejoindre les temples de Kyoto. Les mots pour monter, payer et descendre.",
  "items": [
   {
    "jp": "バス停",
    "kana": "バスてい",
    "fr": "arrêt de bus"
   },
   {
    "jp": "乗車口",
    "kana": "じょうしゃぐち",
    "fr": "porte de montée"
   },
   {
    "jp": "降車口",
    "kana": "こうしゃぐち",
    "fr": "porte de descente"
   },
   {
    "jp": "後ろ乗り",
    "kana": "うしろのり",
    "fr": "montée par l'arrière",
    "note": "Dans le centre de Kyoto (zone à tarif unique), on monte en général par la porte arrière."
   },
   {
    "jp": "前降り",
    "kana": "まえおり",
    "fr": "descente par l'avant",
    "note": "On descend par l'avant et on paie en descendant, au chauffeur."
   },
   {
    "jp": "均一区間",
    "kana": "きんいつくかん",
    "fr": "zone à tarif unique",
    "note": "Au centre de Kyoto, le prix est le même quel que soit le trajet."
   },
   {
    "jp": "整理券",
    "kana": "せいりけん",
    "fr": "ticket numéroté",
    "note": "Hors de la zone à tarif unique, on le prend en montant. Il indique d'où tu es monté, et le prix se calcule à la descente."
   },
   {
    "jp": "運賃",
    "kana": "うんちん",
    "fr": "tarif"
   },
   {
    "jp": "運賃箱",
    "kana": "うんちんばこ",
    "fr": "boîte à tarifs, caisse du bus",
    "note": "Tu y mets l'argent ou tu touches ta carte."
   },
   {
    "jp": "両替",
    "kana": "りょうがえ",
    "fr": "changer de la monnaie",
    "note": "En général, un appareil près du chauffeur change les billets de 1 000 yens."
   },
   {
    "jp": "降車ボタン",
    "kana": "こうしゃボタン",
    "fr": "bouton pour demander l'arrêt",
    "note": "Appuie dessus avant ton arrêt."
   },
   {
    "jp": "一日乗車券",
    "kana": "いちにちじょうしゃけん",
    "fr": "pass de transport valable un jour",
    "note": "Les formules changent selon les années : vérifie l'offre actuelle."
   },
   {
    "jp": "系統",
    "kana": "けいとう",
    "fr": "ligne (numéro de ligne)",
    "note": "Le numéro de bus s'écrit sur le devant."
   },
   {
    "jp": "行き先",
    "kana": "いきさき",
    "fr": "destination"
   },
   {
    "jp": "次は",
    "kana": "つぎは",
    "fr": "le prochain (arrêt) est…",
    "note": "Annonce dans le bus : 次は〇〇です。"
   },
   {
    "jp": "停車します",
    "kana": "ていしゃします",
    "fr": "le bus s'arrête",
    "note": "Annonce quand le bus va à l'arrêt."
   },
   {
    "jp": "停車中",
    "kana": "ていしゃちゅう",
    "fr": "à l'arrêt"
   },
   {
    "jp": "乗り継ぎ",
    "kana": "のりつぎ",
    "fr": "correspondance entre véhicules"
   },
   {
    "jp": "路線図",
    "kana": "ろせんず",
    "fr": "plan des lignes"
   },
   {
    "jp": "時刻表",
    "kana": "じこくひょう",
    "fr": "horaires"
   },
   {
    "jp": "満員",
    "kana": "まんいん",
    "fr": "complet, bondé"
   },
   {
    "jp": "運転手",
    "kana": "うんてんしゅ",
    "fr": "chauffeur"
   },
   {
    "jp": "座席",
    "kana": "ざせき",
    "fr": "siège"
   }
  ]
 },
 {
  "id": "temple",
  "icon": "⛩️",
  "title": "Temples et sanctuaires",
  "intro": "Les mots des temples (お寺) et des sanctuaires (神社) : billetterie, règles et petits objets à rapporter.",
  "items": [
   {
    "jp": "拝観料",
    "kana": "はいかんりょう",
    "fr": "droit d'entrée (temple)",
    "note": "S'écrit sur le panneau à l'accueil."
   },
   {
    "jp": "拝観時間",
    "kana": "はいかんじかん",
    "fr": "heures de visite"
   },
   {
    "jp": "拝観受付",
    "kana": "はいかんうけつけ",
    "fr": "accueil des visiteurs"
   },
   {
    "jp": "拝観停止",
    "kana": "はいかんていし",
    "fr": "visite suspendue"
   },
   {
    "jp": "特別公開",
    "kana": "とくべつこうかい",
    "fr": "ouverture exceptionnelle",
    "note": "Certaines parties du temple ne sont ouvertes qu'à certaines dates."
   },
   {
    "jp": "入口",
    "kana": "いりぐち",
    "fr": "entrée"
   },
   {
    "jp": "出口",
    "kana": "でぐち",
    "fr": "sortie"
   },
   {
    "jp": "順路",
    "kana": "じゅんろ",
    "fr": "sens de la visite"
   },
   {
    "jp": "境内",
    "kana": "けいだい",
    "fr": "enceinte du temple ou du sanctuaire"
   },
   {
    "jp": "山門",
    "kana": "さんもん",
    "fr": "grande porte d'un temple"
   },
   {
    "jp": "本堂",
    "kana": "ほんどう",
    "fr": "salle principale du temple"
   },
   {
    "jp": "庭園",
    "kana": "ていえん",
    "fr": "jardin"
   },
   {
    "jp": "お寺",
    "kana": "おてら",
    "fr": "temple bouddhiste"
   },
   {
    "jp": "神社",
    "kana": "じんじゃ",
    "fr": "sanctuaire shintoïste"
   },
   {
    "jp": "鳥居",
    "kana": "とりい",
    "fr": "portique rouge d'un sanctuaire",
    "note": "On en voit surtout à l'entrée des sanctuaires, rarement dans les temples."
   },
   {
    "jp": "参道",
    "kana": "さんどう",
    "fr": "allée qui mène au sanctuaire"
   },
   {
    "jp": "手水舎",
    "kana": "ちょうずや",
    "fr": "fontaine de purification",
    "note": "On se rince les mains et la bouche avant de prier."
   },
   {
    "jp": "参拝",
    "kana": "さんぱい",
    "fr": "prière, visite pour prier"
   },
   {
    "jp": "賽銭",
    "kana": "さいせん",
    "fr": "offrande",
    "note": "On dit お賽銭 (おさいせん) ; on la dépose dans le grand coffre."
   },
   {
    "jp": "御朱印",
    "kana": "ごしゅいん",
    "fr": "tampon et calligraphie du temple",
    "note": "On les reçoit dans un carnet spécial."
   },
   {
    "jp": "御朱印帳",
    "kana": "ごしゅいんちょう",
    "fr": "carnet pour les 御朱印"
   },
   {
    "jp": "御守",
    "kana": "おまもり",
    "fr": "amulette, porte-bonheur",
    "note": "Souvent écrit お守り."
   },
   {
    "jp": "おみくじ",
    "kana": "おみくじ",
    "fr": "petit papier de divination"
   },
   {
    "jp": "住職",
    "kana": "じゅうしょく",
    "fr": "moine responsable du temple"
   },
   {
    "jp": "撮影禁止",
    "kana": "さつえいきんし",
    "fr": "photos interdites",
    "note": "Dans certains halls et devant certains objets."
   },
   {
    "jp": "土足禁止",
    "kana": "どそくきんし",
    "fr": "chaussures interdites",
    "note": "On les enlève avant d'entrer dans le bâtiment."
   },
   {
    "jp": "立入禁止",
    "kana": "たちいりきんし",
    "fr": "entrée interdite"
   },
   {
    "jp": "飲食禁止",
    "kana": "いんしょくきんし",
    "fr": "boire et manger interdits"
   },
   {
    "jp": "静かに",
    "kana": "しずかに",
    "fr": "calmement, en silence"
   },
   {
    "jp": "靴を脱いでください",
    "kana": "くつをぬいでください",
    "fr": "enlevez vos chaussures, s'il vous plaît"
   }
  ]
 },
 {
  "id": "konbini",
  "icon": "🏪",
  "title": "Au konbini",
  "intro": "Les mots de la caisse et des étiquettes du konbini : chauffer, sac, paiement, dates.",
  "items": [
   {
    "jp": "温めますか",
    "kana": "あたためますか",
    "fr": "je le chauffe ?",
    "note": "Le caissier le demande pour les repas."
   },
   {
    "jp": "温め",
    "kana": "あたため",
    "fr": "chauffage (au micro-ondes)"
   },
   {
    "jp": "袋",
    "kana": "ふくろ",
    "fr": "sac"
   },
   {
    "jp": "レジ袋",
    "kana": "レジぶくろ",
    "fr": "sac de caisse",
    "note": "Payant dans la plupart des magasins."
   },
   {
    "jp": "レジ",
    "kana": "レジ",
    "fr": "caisse"
   },
   {
    "jp": "セルフレジ",
    "kana": "セルフレジ",
    "fr": "caisse en libre-service"
   },
   {
    "jp": "ポイントカード",
    "kana": "ポイントカード",
    "fr": "carte de fidélité"
   },
   {
    "jp": "箸",
    "kana": "はし",
    "fr": "baguettes"
   },
   {
    "jp": "スプーン",
    "kana": "スプーン",
    "fr": "cuillère"
   },
   {
    "jp": "支払い方法",
    "kana": "しはらいほうほう",
    "fr": "moyen de paiement"
   },
   {
    "jp": "現金",
    "kana": "げんきん",
    "fr": "espèces"
   },
   {
    "jp": "電子マネー",
    "kana": "でんしマネー",
    "fr": "monnaie électronique (cartes IC, etc.)"
   },
   {
    "jp": "お釣り",
    "kana": "おつり",
    "fr": "monnaie rendue"
   },
   {
    "jp": "ATM",
    "kana": "エーティーエム",
    "fr": "distributeur de billets",
    "note": "Dans beaucoup de konbini ; la plupart acceptent en général les cartes étrangères (logo sur l'écran)."
   },
   {
    "jp": "コピー",
    "kana": "コピー",
    "fr": "photocopie"
   },
   {
    "jp": "公共料金",
    "kana": "こうきょうりょうきん",
    "fr": "factures (électricité, eau…)",
    "note": "On peut les payer au konbini avec le papier reçu."
   },
   {
    "jp": "賞味期限",
    "kana": "しょうみきげん",
    "fr": "date de préférence",
    "note": "Passé cette date, la qualité baisse ; ce n'est pas forcément dangereux."
   },
   {
    "jp": "消費期限",
    "kana": "しょうひきげん",
    "fr": "date limite de consommation",
    "note": "À respecter, surtout pour les repas."
   },
   {
    "jp": "加熱",
    "kana": "かねつ",
    "fr": "chauffage, cuisson"
   },
   {
    "jp": "弁当",
    "kana": "べんとう",
    "fr": "repas en boîte"
   },
   {
    "jp": "おにぎり",
    "kana": "おにぎり",
    "fr": "boule de riz garnie"
   },
   {
    "jp": "割引",
    "kana": "わりびき",
    "fr": "réduction"
   },
   {
    "jp": "領収書",
    "kana": "りょうしゅうしょ",
    "fr": "reçu officiel"
   },
   {
    "jp": "レシート",
    "kana": "レシート",
    "fr": "ticket de caisse"
   },
   {
    "jp": "イートイン",
    "kana": "イートイン",
    "fr": "espace pour manger sur place"
   },
   {
    "jp": "年齢確認",
    "kana": "ねんれいかくにん",
    "fr": "vérification de l'âge",
    "note": "Sur l'écran de la caisse pour l'alcool et le tabac : on touche le bouton."
   },
   {
    "jp": "無料",
    "kana": "むりょう",
    "fr": "gratuit"
   }
  ]
 },
 {
  "id": "distributeur",
  "icon": "🥤",
  "title": "Distributeurs automatiques",
  "intro": "Distributeurs de boissons et machines à tickets : les mots pour payer, choisir et récupérer.",
  "items": [
   {
    "jp": "自動販売機",
    "kana": "じどうはんばいき",
    "fr": "distributeur automatique",
    "note": "Souvent raccourci en 自販機 (じはんき)."
   },
   {
    "jp": "券売機",
    "kana": "けんばいき",
    "fr": "machine à tickets"
   },
   {
    "jp": "食券",
    "kana": "しょっけん",
    "fr": "ticket de repas",
    "note": "On l'achète à la machine et on le donne au personnel."
   },
   {
    "jp": "売り切れ",
    "kana": "うりきれ",
    "fr": "épuisé",
    "note": "Une lumière rouge ou un panneau l'indique."
   },
   {
    "jp": "硬貨",
    "kana": "こうか",
    "fr": "pièces"
   },
   {
    "jp": "紙幣",
    "kana": "しへい",
    "fr": "billets"
   },
   {
    "jp": "お札",
    "kana": "おさつ",
    "fr": "billets (mot courant)"
   },
   {
    "jp": "千円札",
    "kana": "せんえんさつ",
    "fr": "billet de 1 000 yens"
   },
   {
    "jp": "お釣り",
    "kana": "おつり",
    "fr": "monnaie rendue"
   },
   {
    "jp": "返却",
    "kana": "へんきゃく",
    "fr": "rendre, restituer",
    "note": "Sur le bouton qui rend ton argent."
   },
   {
    "jp": "返却レバー",
    "kana": "へんきゃくレバー",
    "fr": "levier de retour de monnaie"
   },
   {
    "jp": "投入口",
    "kana": "とうにゅうぐち",
    "fr": "fente pour l'argent"
   },
   {
    "jp": "取り出し口",
    "kana": "とりだしぐち",
    "fr": "bac où tombe la boisson"
   },
   {
    "jp": "ホット",
    "kana": "ホット",
    "fr": "chaud",
    "note": "Étiquette rouge en général."
   },
   {
    "jp": "冷たい",
    "kana": "つめたい",
    "fr": "froid",
    "note": "Étiquette bleue en général."
   },
   {
    "jp": "ボタン",
    "kana": "ボタン",
    "fr": "bouton"
   },
   {
    "jp": "現金のみ",
    "kana": "げんきんのみ",
    "fr": "espèces uniquement"
   },
   {
    "jp": "使用中",
    "kana": "しようちゅう",
    "fr": "occupé, en cours d'utilisation"
   },
   {
    "jp": "故障中",
    "kana": "こしょうちゅう",
    "fr": "en panne"
   },
   {
    "jp": "準備中",
    "kana": "じゅんびちゅう",
    "fr": "en préparation, pas encore ouvert"
   }
  ]
 }
];

export const KIT_PHRASES = [
 {
  "jp": "京都駅はどこですか。",
  "kana": "きょうと えき は どこ です か",
  "fr": "Où est la gare de Kyoto ?",
  "when": "Pour demander ton chemin"
 },
 {
  "jp": "この電車は京都駅に行きますか。",
  "kana": "この でんしゃ は きょうと えき に いきます か",
  "fr": "Ce train va-t-il à la gare de Kyoto ?",
  "when": "Avant de monter"
 },
 {
  "jp": "京都駅までいくらですか。",
  "kana": "きょうと えき まで いくら です か",
  "fr": "Combien coûte le trajet jusqu'à la gare de Kyoto ?",
  "when": "Au guichet ou devant la machine"
 },
 {
  "jp": "ICカードにチャージしたいです。",
  "kana": "アイシー カード に チャージ したい です",
  "fr": "Je voudrais recharger ma carte IC.",
  "when": "À la machine ou au guichet"
 },
 {
  "jp": "切符はどこで買えますか。",
  "kana": "きっぷ は どこ で かえます か",
  "fr": "Où peut-on acheter un billet ?",
  "when": "Dans une gare"
 },
 {
  "jp": "乗り換えはどこですか。",
  "kana": "のりかえ は どこ です か",
  "fr": "Où est la correspondance ?",
  "when": "Gare avec plusieurs lignes"
 },
 {
  "jp": "何番線ですか。",
  "kana": "なんばんせん です か",
  "fr": "C'est quel quai ?",
  "when": "Quand tu cherches ton train"
 },
 {
  "jp": "次の駅は何ですか。",
  "kana": "つぎ の えき は なん です か",
  "fr": "Quelle est la prochaine gare ?",
  "when": "Dans le train"
 },
 {
  "jp": "この席は空いていますか。",
  "kana": "この せき は あいています か",
  "fr": "Cette place est-elle libre ?",
  "when": "Dans le train ou le bus"
 },
 {
  "jp": "降ります。",
  "kana": "おります",
  "fr": "Je descends.",
  "when": "Pour passer devant quelqu'un à la sortie"
 },
 {
  "jp": "このバスは清水寺に行きますか。",
  "kana": "この バス は きよみずでら に いきます か",
  "fr": "Ce bus va-t-il à Kiyomizu-dera ?",
  "when": "À l'arrêt, avant de monter"
 },
 {
  "jp": "金閣寺に行くバス停はどこですか。",
  "kana": "きんかくじ に いく バスてい は どこ です か",
  "fr": "Quel est l'arrêt pour Kinkaku-ji ?",
  "when": "À demander au chauffeur ou à un passant"
 },
 {
  "jp": "京都駅に行くバスは何番ですか。",
  "kana": "きょうと えき に いく バス は なんばん です か",
  "fr": "Quel bus va à la gare de Kyoto ?",
  "when": "À l'arrêt"
 },
 {
  "jp": "両替できますか。",
  "kana": "りょうがえ できます か",
  "fr": "Peut-on faire de la monnaie ?",
  "when": "Quand tu n'as qu'un gros billet"
 },
 {
  "jp": "ICカードで払えますか。",
  "kana": "アイシー カード で はらえます か",
  "fr": "Puis-je payer avec une carte IC ?",
  "when": "Bus, boutique"
 },
 {
  "jp": "拝観料はいくらですか。",
  "kana": "はいかんりょう は いくら です か",
  "fr": "Combien coûte l'entrée ?",
  "when": "Devant le temple"
 },
 {
  "jp": "何時まで開いていますか。",
  "kana": "なんじ まで あいています か",
  "fr": "Jusqu'à quelle heure est-ce ouvert ?",
  "when": "Temple, magasin"
 },
 {
  "jp": "写真を撮ってもいいですか。",
  "kana": "しゃしん を とって も いい です か",
  "fr": "Puis-je prendre une photo ?",
  "when": "Dans un temple ou chez quelqu'un"
 },
 {
  "jp": "ここで靴を脱ぎますか。",
  "kana": "ここ で くつ を ぬぎます か",
  "fr": "On enlève ses chaussures ici ?",
  "when": "À l'entrée d'un bâtiment"
 },
 {
  "jp": "御朱印をお願いします。",
  "kana": "ごしゅいん を おねがいします",
  "fr": "Un 御朱印, s'il vous plaît.",
  "when": "En tendant ton carnet"
 },
 {
  "jp": "おみくじはいくらですか。",
  "kana": "おみくじ は いくら です か",
  "fr": "Combien coûte un omikuji ?",
  "when": "Dans un sanctuaire"
 },
 {
  "jp": "温めてください。",
  "kana": "あたためて ください",
  "fr": "Pouvez-vous le chauffer, s'il vous plaît ?",
  "when": "Au konbini"
 },
 {
  "jp": "袋は要りません。",
  "kana": "ふくろ は いりません",
  "fr": "Je n'ai pas besoin de sac.",
  "when": "Au konbini"
 },
 {
  "jp": "箸をください。",
  "kana": "はし を ください",
  "fr": "Des baguettes, s'il vous plaît.",
  "when": "Au konbini"
 },
 {
  "jp": "カードで払えますか。",
  "kana": "カード で はらえます か",
  "fr": "Puis-je payer par carte ?",
  "when": "Boutique, restaurant"
 },
 {
  "jp": "現金のみですか。",
  "kana": "げんきん のみ です か",
  "fr": "C'est espèces uniquement ?",
  "when": "Avant de commander"
 },
 {
  "jp": "領収書をお願いします。",
  "kana": "りょうしゅうしょ を おねがいします",
  "fr": "Un reçu, s'il vous plaît.",
  "when": "À la caisse"
 },
 {
  "jp": "助けてください。",
  "kana": "たすけて ください",
  "fr": "Aidez-moi, s'il vous plaît.",
  "when": "En cas de problème"
 },
 {
  "jp": "道に迷いました。",
  "kana": "みち に まよいました",
  "fr": "Je me suis perdu(e).",
  "when": "Pour demander de l'aide"
 },
 {
  "jp": "もう一度お願いします。",
  "kana": "もう いちど おねがいします",
  "fr": "Encore une fois, s'il vous plaît.",
  "when": "Quand tu n'as pas compris"
 },
 {
  "jp": "ゆっくり話してください。",
  "kana": "ゆっくり はなして ください",
  "fr": "Parlez lentement, s'il vous plaît.",
  "when": "Quand ça va trop vite"
 },
 {
  "jp": "英語は話せますか。",
  "kana": "えいご は はなせます か",
  "fr": "Parlez-vous anglais ?",
  "when": "En dernier recours"
 }
];

export const KIT_ASK = [
 {
  "topic": "gare",
  "q": "Tu cherches la gare de Kyoto. Que demandes-tu à un passant ?",
  "ok": "京都駅はどこですか。",
  "choices": [
   "京都駅はどこですか。",
   "京都駅はいくらですか。",
   "京都駅は何時ですか。",
   "京都駅はどうですか。"
  ],
  "explanation": "どこ = où. いくら = combien (prix), 何時 = quelle heure."
 },
 {
  "topic": "gare",
  "q": "Tu veux savoir si ce train va à Osaka. Que dis-tu ?",
  "ok": "この電車は大阪に行きますか。",
  "choices": [
   "この電車は大阪に行きますか。",
   "この電車は大阪から来ましたか。",
   "この電車は大阪にいますか。",
   "この電車はいくらですか。"
  ],
  "explanation": "に行きますか = « va-t-il à ? ». から来ました voudrait dire « est-il venu de ? »."
 },
 {
  "topic": "gare",
  "q": "Ta carte IC est presque vide. Tu veux l'alimenter. Que dis-tu ?",
  "ok": "ICカードにチャージしたいです。",
  "choices": [
   "ICカードにチャージしたいです。",
   "ICカードを買いたいです。",
   "ICカードを返したいです。",
   "ICカードを忘れました。"
  ],
  "explanation": "チャージ = recharger. Les autres phrases veulent dire acheter, rendre ou oublier."
 },
 {
  "topic": "gare",
  "q": "Tu cherches ton quai. Quelle question poses-tu ?",
  "ok": "何番線ですか。",
  "choices": [
   "何番線ですか。",
   "何時ですか。",
   "何円ですか。",
   "何人ですか。"
  ],
  "explanation": "番線 = numéro de quai. 何 + compteur = « quel nombre de… »."
 },
 {
  "topic": "gare",
  "q": "Tu veux savoir le nom de la prochaine gare. Que dis-tu ?",
  "ok": "次の駅は何ですか。",
  "choices": [
   "次の駅は何ですか。",
   "次の電車は何時ですか。",
   "終電は何時ですか。",
   "運賃はいくらですか。"
  ],
  "explanation": "次の駅 = la prochaine gare. 何ですか = c'est quoi ?"
 },
 {
  "topic": "gare",
  "q": "Tu veux savoir à quelle heure part le dernier train.",
  "ok": "終電は何時ですか。",
  "choices": [
   "終電は何時ですか。",
   "始発は何時ですか。",
   "次の駅は何ですか。",
   "運賃はいくらですか。"
  ],
  "explanation": "終電 = dernier train, 始発 = premier train."
 },
 {
  "topic": "gare",
  "q": "Tu dois changer de ligne. Que demandes-tu ?",
  "ok": "乗り換えはどこですか。",
  "choices": [
   "乗り換えはどこですか。",
   "出口はどこですか。",
   "入口はどこですか。",
   "トイレはどこですか。"
  ],
  "explanation": "乗り換え = correspondance. 出口 = sortie, 入口 = entrée."
 },
 {
  "topic": "gare",
  "q": "Tu vois un siège libre dans le train. Que demandes-tu ?",
  "ok": "この席は空いていますか。",
  "choices": [
   "この席は空いていますか。",
   "この席は禁煙ですか。",
   "この席はいくらですか。",
   "この席は何時ですか。"
  ],
  "explanation": "空いていますか = « est-ce libre ? »."
 },
 {
  "topic": "bus",
  "q": "Tu demandes si ce bus va à Kiyomizu-dera.",
  "ok": "このバスは清水寺に行きますか。",
  "choices": [
   "このバスは清水寺に行きますか。",
   "清水寺はどこですか。",
   "清水寺はいくらですか。",
   "このバスはいつですか。"
  ],
  "explanation": "に行きますか = « va-t-il à ? ». Les autres phrases demandent où est le temple ou le prix."
 },
 {
  "topic": "bus",
  "q": "Tu arrives à ton arrêt et tu veux descendre. Que dis-tu en passant devant quelqu'un ?",
  "ok": "降ります。",
  "choices": [
   "降ります。",
   "乗ります。",
   "行きます。",
   "待ちます。"
  ],
  "explanation": "降ります = je descends. 乗ります = je monte."
 },
 {
  "topic": "bus",
  "q": "Tu demandes quel arrêt prendre pour Kinkaku-ji.",
  "ok": "金閣寺に行くバス停はどこですか。",
  "choices": [
   "金閣寺に行くバス停はどこですか。",
   "金閣寺に行くバス停はいくらですか。",
   "金閣寺に行くバス停はいつですか。",
   "金閣寺に行くバス停は何番線ですか。"
  ],
  "explanation": "バス停 = arrêt de bus, どこ = où. 番線 est pour les trains."
 },
 {
  "topic": "bus",
  "q": "Tu veux savoir quel bus va à la gare de Kyoto.",
  "ok": "京都駅に行くバスは何番ですか。",
  "choices": [
   "京都駅に行くバスは何番ですか。",
   "京都駅に行くバスはいくらですか。",
   "京都駅に行くバスは何人ですか。",
   "京都駅は何番線ですか。"
  ],
  "explanation": "何番 = quel numéro (ici, quelle ligne)."
 },
 {
  "topic": "bus",
  "q": "Tu veux savoir si ta carte IC est acceptée.",
  "ok": "ICカードで払えますか。",
  "choices": [
   "ICカードで払えますか。",
   "ICカードで払いたくないです。",
   "ICカードを忘れました。",
   "ICカードはどこですか。"
  ],
  "explanation": "で払えますか = « peut-on payer avec ? »."
 },
 {
  "topic": "bus",
  "q": "Tu n'as pas compris l'annonce. Que dis-tu au chauffeur ?",
  "ok": "すみません、わかりません。",
  "choices": [
   "すみません、わかりません。",
   "すみません、いくらですか。",
   "すみません、どうぞ。",
   "すみません、ありがとう。"
  ],
  "explanation": "わかりません = je ne comprends pas."
 },
 {
  "topic": "temple",
  "q": "Tu es devant la billetterie et tu veux connaître le prix d'entrée.",
  "ok": "拝観料はいくらですか。",
  "choices": [
   "拝観料はいくらですか。",
   "拝観料は何時ですか。",
   "拝観料は誰ですか。",
   "拝観料を買いましたか。"
  ],
  "explanation": "いくら = combien. 拝観料 = prix d'entrée d'un temple."
 },
 {
  "topic": "temple",
  "q": "Tu veux prendre une photo de la salle. Que demandes-tu ?",
  "ok": "写真を撮ってもいいですか。",
  "choices": [
   "写真を撮ってもいいですか。",
   "写真を買ってもいいですか。",
   "写真をください。",
   "写真は好きですか。"
  ],
  "explanation": "〜てもいいですか = « puis-je… ? ». 撮る = prendre (une photo)."
 },
 {
  "topic": "temple",
  "q": "Tu tends ton carnet pour recevoir un tampon.",
  "ok": "御朱印をお願いします。",
  "choices": [
   "御朱印をお願いします。",
   "御朱印は要りません。",
   "御朱印は禁止ですか。",
   "御朱印を撮ってもいいですか。"
  ],
  "explanation": "をお願いします = « s'il vous plaît, donnez-moi… »."
 },
 {
  "topic": "temple",
  "q": "Devant l'entrée d'un bâtiment, tu hésites à garder tes chaussures. Que demandes-tu ?",
  "ok": "ここで靴を脱ぎますか。",
  "choices": [
   "ここで靴を脱ぎますか。",
   "ここで靴を買いますか。",
   "ここで靴を洗いますか。",
   "ここで靴を借りますか。"
  ],
  "explanation": "脱ぐ = enlever (un vêtement, des chaussures)."
 },
 {
  "topic": "temple",
  "q": "Tu veux savoir jusqu'à quelle heure le temple reste ouvert.",
  "ok": "何時まで開いていますか。",
  "choices": [
   "何時まで開いていますか。",
   "何人まで入れますか。",
   "いつ来ましたか。",
   "誰が開いていますか。"
  ],
  "explanation": "何時まで = jusqu'à quelle heure. 開いている = être ouvert."
 },
 {
  "topic": "temple",
  "q": "Tu veux le prix d'un petit papier de divination.",
  "ok": "おみくじはいくらですか。",
  "choices": [
   "おみくじはいくらですか。",
   "おみくじは何人ですか。",
   "おみくじはどこに行きますか。",
   "おみくじは誰ですか。"
  ],
  "explanation": "おみくじ = papier de divination. いくら = combien."
 },
 {
  "topic": "temple",
  "q": "Tu veux acheter une amulette. Tu dis au vendeur que tu en veux une.",
  "ok": "お守りをください。",
  "choices": [
   "お守りをください。",
   "お守りを洗ってください。",
   "お守りを食べてください。",
   "お守りは行きます。"
  ],
  "explanation": "をください = « donnez-moi… ». お守り = amulette."
 },
 {
  "topic": "konbini",
  "q": "Le caissier demande : 温めますか？ Tu veux que ce soit chauffé.",
  "ok": "はい、お願いします。",
  "choices": [
   "はい、お願いします。",
   "いいえ、お願いします。",
   "はい、温めません。",
   "いいえ、温かいです。"
  ],
  "explanation": "結構です est ambigu (« ça ira » ou « non merci ») : mieux vaut l'éviter. はい、お願いします = oui, s'il vous plaît."
 },
 {
  "topic": "konbini",
  "q": "Tu n'as pas besoin de sac. Que dis-tu ?",
  "ok": "袋は要りません。",
  "choices": [
   "袋は要りません。",
   "袋をください。",
   "袋は高いです。",
   "袋はどこですか。"
  ],
  "explanation": "要りません = je n'en ai pas besoin."
 },
 {
  "topic": "konbini",
  "q": "Tu veux des baguettes avec ton repas.",
  "ok": "箸をください。",
  "choices": [
   "箸をください。",
   "箸を洗います。",
   "箸は要りません。",
   "箸は行きます。"
  ],
  "explanation": "をください = « donnez-moi… ». 箸 = baguettes."
 },
 {
  "topic": "konbini",
  "q": "Tu veux payer par carte. Que demandes-tu ?",
  "ok": "カードで払えますか。",
  "choices": [
   "カードで払えますか。",
   "カードを作りたいです。",
   "カードを買いました。",
   "カードは安いです。"
  ],
  "explanation": "で払えますか = « puis-je payer avec ? »."
 },
 {
  "topic": "konbini",
  "q": "Tu as besoin d'un reçu officiel. Que dis-tu ?",
  "ok": "領収書をお願いします。",
  "choices": [
   "領収書をお願いします。",
   "領収書は要りません。",
   "領収書を忘れました。",
   "領収書は温かいです。"
  ],
  "explanation": "領収書 = reçu officiel (avec nom, pour une note de frais)."
 },
 {
  "topic": "konbini",
  "q": "Tu veux manger ton repas dans l'espace du konbini.",
  "ok": "ここで食べてもいいですか。",
  "choices": [
   "ここで食べてもいいですか。",
   "ここで食べません。",
   "ここは食べ物ですか。",
   "ここで買いました。"
  ],
  "explanation": "食べてもいいですか = « puis-je manger ? »."
 },
 {
  "topic": "konbini",
  "q": "Tu cherches un distributeur de billets.",
  "ok": "ATMはどこですか。",
  "choices": [
   "ATMはどこですか。",
   "ATMはいくらですか。",
   "ATMは何時ですか。",
   "ATMは誰ですか。"
  ],
  "explanation": "どこ = où. ATM se prononce « é-ti-é-mu »."
 },
 {
  "topic": "distributeur",
  "q": "Tu veux une boisson chaude. Quel mot cherches-tu sur l'étiquette ?",
  "ok": "ホット",
  "choices": [
   "ホット",
   "冷たい",
   "売り切れ",
   "返却"
  ],
  "explanation": "ホット = chaud. 冷たい = froid. 売り切れ = épuisé."
 },
 {
  "topic": "distributeur",
  "q": "Tu veux récupérer l'argent que tu viens de mettre. Quel mot cherches-tu ?",
  "ok": "返却",
  "choices": [
   "返却",
   "投入口",
   "売り切れ",
   "現金のみ"
  ],
  "explanation": "返却 = restituer. 投入口 est la fente où l'on met l'argent."
 },
 {
  "topic": "distributeur",
  "q": "Le distributeur ne rend pas ta monnaie. Que dis-tu au magasin ?",
  "ok": "お釣りが出ません。",
  "choices": [
   "お釣りが出ません。",
   "お釣りが出ます。",
   "お釣りは要りません。",
   "お釣りを買います。"
  ],
  "explanation": "出ません = ne sort pas. お釣り = monnaie."
 },
 {
  "topic": "distributeur",
  "q": "Tu veux savoir si la machine accepte un billet de 1 000 yens.",
  "ok": "千円札は使えますか。",
  "choices": [
   "千円札は使えますか。",
   "千円札は食べられますか。",
   "千円札は売り切れですか。",
   "千円札は冷たいですか。"
  ],
  "explanation": "使えますか = « peut-on l'utiliser ? »."
 },
 {
  "topic": "distributeur",
  "q": "Tu entres dans un petit restaurant avec une machine à l'entrée. Que fais-tu d'abord ?",
  "ok": "券売機で食券を買います。",
  "choices": [
   "券売機で食券を買います。",
   "席で食券を食べます。",
   "店員さんに食券を売ります。",
   "食券を返却します。"
  ],
  "explanation": "On paie à la machine, on reçoit un ticket 食券, puis on le donne au personnel."
 },
 {
  "topic": "distributeur",
  "q": "Le distributeur de boissons est en panne. Quel mot lis-tu sur le panneau ?",
  "ok": "故障中",
  "choices": [
   "故障中",
   "売り切れ",
   "使用中",
   "準備中"
  ],
  "explanation": "故障中 = en panne."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 改札 ?",
  "ok": "Portiques d'accès (contrôle des billets)",
  "choices": [
   "Portiques d'accès (contrôle des billets)",
   "Salle d'attente",
   "Consigne à bagages",
   "Objets trouvés"
  ],
  "explanation": "改札 = les portiques où l'on passe son billet."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 乗り換え ?",
  "ok": "Correspondance",
  "choices": [
   "Correspondance",
   "Sortie",
   "Réservé au personnel",
   "Interdit de fumer"
  ],
  "explanation": "乗り換え = changer de train ou de ligne."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 運転見合わせ ?",
  "ok": "Circulation suspendue",
  "choices": [
   "Circulation suspendue",
   "Train rapide",
   "Prochain train",
   "Place réservée"
  ],
  "explanation": "Panneau de gare ou annonce quand les trains ne roulent pas."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 優先席 ?",
  "ok": "Places prioritaires",
  "choices": [
   "Places prioritaires",
   "Places non réservées",
   "Sièges fumeurs",
   "Place du chauffeur"
  ],
  "explanation": "Pour les personnes âgées, enceintes ou handicapées."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 整理券 ?",
  "ok": "Ticket numéroté (à prendre en montant dans certains bus)",
  "choices": [
   "Ticket numéroté (à prendre en montant dans certains bus)",
   "Billet de train rapide",
   "Ticket de repas",
   "Carte de fidélité"
  ],
  "explanation": "Il sert à calculer le prix à la descente."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 撮影禁止 ?",
  "ok": "Photos interdites",
  "choices": [
   "Photos interdites",
   "Photos autorisées",
   "Silence demandé",
   "Chaussures interdites"
  ],
  "explanation": "撮影 = prise de vue, 禁止 = interdit."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 土足禁止 ?",
  "ok": "Chaussures interdites (à enlever)",
  "choices": [
   "Chaussures interdites (à enlever)",
   "Entrée interdite",
   "Chaussures obligatoires",
   "Photos interdites"
  ],
  "explanation": "土足 = avec les chaussures de la rue."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 立入禁止 ?",
  "ok": "Entrée interdite",
  "choices": [
   "Entrée interdite",
   "Sortie",
   "Défense de fumer",
   "Visite guidée"
  ],
  "explanation": "立入 = entrer, 禁止 = interdit."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 順路 ?",
  "ok": "Sens de la visite",
  "choices": [
   "Sens de la visite",
   "Sortie de secours",
   "Boutique de souvenirs",
   "Toilettes"
  ],
  "explanation": "Les flèches 順路 indiquent le parcours conseillé."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 拝観停止 ?",
  "ok": "Visite suspendue",
  "choices": [
   "Visite suspendue",
   "Visite libre",
   "Sortie",
   "Photos autorisées"
  ],
  "explanation": "Le temple est temporairement fermé aux visiteurs."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 売り切れ ?",
  "ok": "Épuisé",
  "choices": [
   "Épuisé",
   "Prix réduit",
   "Boisson chaude",
   "Nouveau"
  ],
  "explanation": "Voyant ou panneau sur un distributeur."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 現金のみ ?",
  "ok": "Espèces uniquement",
  "choices": [
   "Espèces uniquement",
   "Cartes acceptées",
   "Monnaie rendue",
   "Paiement par carte IC seulement"
  ],
  "explanation": "現金 = espèces, のみ = seulement."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 故障中 ?",
  "ok": "En panne",
  "choices": [
   "En panne",
   "En promotion",
   "Occupé",
   "Fermé pour la journée"
  ],
  "explanation": "故障 = panne, 中 = en cours."
 },
 {
  "topic": "panneau",
  "q": "Que signifie ce panneau : 賞味期限 ?",
  "ok": "Date de préférence (« à consommer de préférence avant »)",
  "choices": [
   "Date de préférence (« à consommer de préférence avant »)",
   "Date limite impérative",
   "Prix du jour",
   "Valeur énergétique"
  ],
  "explanation": "賞味 = goûter. Passé la date, le goût baisse. 消費期限 est la vraie date limite."
 }
];

export const KIT_TIPS = {
 "gare": [
  "Une carte IC (ICOCA, Suica, PASMO…) se recharge aux machines et marche presque partout : trains, métro, bus, konbini. Touche-la en entrant et en sortant.",
  "La gare de Kyoto est très grande : JR, Shinkansen, métro Karasuma et trains privés. Repère le nom de ta sortie (中央口, 八条口…).",
  "Les panneaux de quai donnent le nom de la gare en kanji et en romaji, avec la gare précédente et la suivante. Compare toujours ta destination avec le 〜行き affiché au-dessus du quai.",
  "Si ton billet ne suffit pas, va à la 精算機 avant de passer les portiques de sortie : pas de souci, tu paies juste la différence.",
  "Dans le train, on parle à voix basse et on met son téléphone en silencieux. Les 優先席 sont réservées à ceux qui en ont besoin."
 ],
 "bus": [
  "Dans le centre de Kyoto, on monte en général par la porte arrière et on descend par l'avant, en payant au chauffeur (tarif unique en 均一区間).",
  "Hors de cette zone, prends un 整理券 en montant : le prix se calcule à la descente, selon le numéro affiché sur l'écran.",
  "En général, avec une carte IC, touche le lecteur près du chauffeur en descendant. En espèces, mets la somme juste dans la 運賃箱.",
  "Appuie sur le 降車ボタン avant ton arrêt. Le nom de l'arrêt apparaît en japonais et souvent en anglais.",
  "Aux heures touristiques, certains bus sont bondés (満員). Prends un bus tôt le matin ou plus tard dans la journée pour plus de confort."
 ],
 "temple": [
  "Enlève tes chaussures là où c'est écrit 土足禁止. Porte des chaussettes propres et sans trou.",
  "Garde le silence dans les bâtiments. Dans certains halls, les photos sont interdites : cherche le panneau 撮影禁止.",
  "Sanctuaire (神社) : on salue au torii, on se rince les mains à la 手水舎, puis on fait deux courbettes, deux claquements de mains et une courbette. Temple (お寺) : on joint les mains en silence, sans claquer.",
  "Une pièce de 5 yens (ご縁) est une offrande appréciée, car 5 se dit « go-en », comme « lien » ou « chance ».",
  "Pour un 御朱印, prends un carnet spécial (御朱印帳) et prévois quelques centaines de yens en monnaie : on les paie en espèces, en général."
 ],
 "konbini": [
  "Au konbini, on te demande 温めますか ? Réponds « はい、お願いします » pour chauffer, ou « いいえ、大丈夫です » pour ne pas.",
  "Le sac plastique est payant dans la plupart des magasins. Dis 袋は要りません si tu as ton propre sac.",
  "Pour les baguettes ou la cuillère, demande : 箸をください ou スプーンをください.",
  "Les ATM des konbini (7-Eleven, Lawson, FamilyMart) acceptent, en général, les cartes étrangères : vérifie le logo sur l'écran.",
  "Certains konbini ont un coin イートイン pour manger sur place : demande avant de t'asseoir."
 ],
 "distributeur": [
  "Sur un distributeur de boissons, l'étiquette rouge veut dire ホット (chaud) et la bleue 冷たい (froid), en général.",
  "Mets l'argent d'abord, puis appuie sur le bouton qui s'allume. Pour récupérer la monnaie : 返却レバー.",
  "Beaucoup de machines n'acceptent que les pièces et les billets de 千円. Garde de la monnaie.",
  "Une machine à tickets (券売機) dans un restaurant : choisis ton plat, paie, prends le 食券 et donne-le au personnel.",
  "Si c'est écrit 売り切れ, ce produit est épuisé : choisis un autre bouton."
 ]
};

export const KIT_CHALLENGES = [
 {
  "id": "k-gare-vocab",
  "icon": "🚉",
  "title": "Les mots de la gare",
  "kind": "vocab",
  "ref": "gare",
  "goal": "Retiens 5 mots : 改札, 乗り場, 乗り換え, 切符, 運賃.",
  "tip": "Les mots clés sont toujours près des portiques et des machines."
 },
 {
  "id": "k-gare-ask",
  "icon": "🚆",
  "title": "Que dire à la gare ?",
  "kind": "ask",
  "ref": "gare",
  "goal": "Réponds à des situations de gare : quai, billet, correspondance.",
  "tip": "乗り換え = correspondance, 番線 = quai."
 },
 {
  "id": "k-bus-vocab",
  "icon": "🚌",
  "title": "Les mots du bus",
  "kind": "vocab",
  "ref": "bus",
  "goal": "Retiens 5 mots : バス停, 整理券, 運賃, 降車ボタン, 両替.",
  "tip": "Dans le centre de Kyoto, on monte par l'arrière et on descend par l'avant, en général."
 },
 {
  "id": "k-bus-ask",
  "icon": "🚏",
  "title": "Dans le bus de Kyoto",
  "kind": "ask",
  "ref": "bus",
  "goal": "Réponds à des situations de bus : arrêt, paiement, descente.",
  "tip": "降ります = je descends."
 },
 {
  "id": "k-temple-vocab",
  "icon": "⛩️",
  "title": "Les mots du temple",
  "kind": "vocab",
  "ref": "temple",
  "goal": "Retiens 5 mots : 拝観料, 御朱印, 土足禁止, 撮影禁止, 順路.",
  "tip": "Les panneaux d'interdiction finissent souvent par 禁止."
 },
 {
  "id": "k-temple-ask",
  "icon": "🙏",
  "title": "Visiter un temple",
  "kind": "ask",
  "ref": "temple",
  "goal": "Réponds à des situations de visite : prix, photo, chaussures.",
  "tip": "写真を撮ってもいいですか = puis-je prendre une photo ?"
 },
 {
  "id": "k-konbini-vocab",
  "icon": "🏪",
  "title": "Les mots du konbini",
  "kind": "vocab",
  "ref": "konbini",
  "goal": "Retiens 5 mots : 温めますか, 袋, 箸, 賞味期限, 領収書.",
  "tip": "温めますか = je le chauffe ? Réponds oui avec はい、お願いします."
 },
 {
  "id": "k-konbini-ask",
  "icon": "🍙",
  "title": "À la caisse du konbini",
  "kind": "ask",
  "ref": "konbini",
  "goal": "Réponds à des situations de caisse : chauffer, sac, carte.",
  "tip": "袋は要りません = je n'ai pas besoin de sac."
 },
 {
  "id": "k-distrib-vocab",
  "icon": "🥤",
  "title": "Les mots du distributeur",
  "kind": "vocab",
  "ref": "distributeur",
  "goal": "Retiens 5 mots : 売り切れ, 返却, お釣り, ホット, 現金のみ.",
  "tip": "Étiquette rouge = chaud, bleue = froid."
 },
 {
  "id": "k-phrases",
  "icon": "💬",
  "title": "Phrases de survie à Kyoto",
  "kind": "phrases",
  "ref": "phrases",
  "goal": "Écoute et répète 5 phrases : gare, bus, temple, konbini.",
  "tip": "助けてください et もう一度お願いします marchent partout."
 }
];
