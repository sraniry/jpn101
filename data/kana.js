// Hiragana & Katakana — hiragana et katakana toujours appariés (même son, l'un à côté de l'autre)
// mnemo = moyen mnémotechnique pour le katakana (forme plus anguleuse, plus dure à retenir)
// hmnemo = moyen mnémotechnique pour le hiragana (forme plus arrondie)

export const KANA_BASE = [
  { row:'Voyelles', items:[
    { h:'あ', k:'ア', romaji:'a', hmnemo:'あ : un arbre avec une branche transversale — “Ahh, un arbre !”', mnemo:'ア : la diagonale rappelle un “A” majuscule penché en arrière.' },
    { h:'い', k:'イ', romaji:'i', hmnemo:'い : deux bougies penchées l\'une vers l\'autre — “i-i”, deux “i” côte à côte.', mnemo:'イ : deux jambes qui marchent — pense à “il” qui avance.' },
    { h:'う', k:'ウ', romaji:'u', hmnemo:'う : un capuchon pointu vu de côté — un chapeau de pluie en forme de U.', mnemo:'ウ : un petit toit posé sur un crochet, comme un chapeau sur un “u”.' },
    { h:'え', k:'エ', romaji:'e', hmnemo:'え : une danseuse qui s\'incline, un bras tendu, l\'autre relevé — “é-légante”.', mnemo:'エ : la lettre “E” redressée — comme dans エレベーター (ascenseur).' },
    { h:'お', k:'オ', romaji:'o', hmnemo:'お : une ballerine sur pointes qui lève une jambe — “oh !” de surprise.', mnemo:'オ : un bonhomme qui lève les bras en criant “Oh !”.' },
  ]},
  { row:'K', items:[
    { h:'か', k:'カ', romaji:'ka', hmnemo:'か : deux personnes assises en tailleur face à face — “ka!” en s\'asseyant.', mnemo:'カ : ressemble à une faucille qui “coupe” — comme un couteau.' },
    { h:'き', k:'キ', romaji:'ki', hmnemo:'き : une personne avec deux bras écartés et deux jambes — comme une croix animée.', mnemo:'キ : ressemble à une clé (“key”) avec ses dents.' },
    { h:'く', k:'ク', romaji:'ku', hmnemo:'く : un bec d\'oiseau ouvert vers la droite — “cou-cou !” le coucou chante.', mnemo:'ク : un bec d\'oiseau qui fait “cou-cou”.' },
    { h:'け', k:'ケ', romaji:'ke', hmnemo:'け : deux bâtons parallèles reliés par un pont — comme une porte à double montant.', mnemo:'ケ : comme キ mais avec une jambe qui glisse — une bouilloire qui verse.' },
    { h:'こ', k:'コ', romaji:'ko', hmnemo:'こ : deux rails de chemin de fer vus de haut — “ko-ko !” le train passe.', mnemo:'コ : deux traits parallèles comme un coin (“corner”) de boîte.' },
  ]},
  { row:'S', items:[
    { h:'さ', k:'サ', romaji:'sa', hmnemo:'さ : une croix avec un crochet vers le bas — “ça” pointe vers le sol.', mnemo:'サ : ressemble à des ciseaux ouverts.' },
    { h:'し', k:'シ', romaji:'shi', hmnemo:'し : un hameçon recourbé vers la droite — il pêche des sons “shi”.', mnemo:'シ : un sourire “:)” — pense à “shi” = happy face.' },
    { h:'す', k:'ス', romaji:'su', hmnemo:'す : un tourbillon d\'escargot — “su” = spirale qui descend.', mnemo:'ス : une mèche de nouille aspirée en spirale.' },
    { h:'せ', k:'セ', romaji:'se', hmnemo:'せ : un bonhomme qui court avec un bras tendu devant — “ce” qu\'il faut attraper.', mnemo:'セ : un zigzag comme un brin de céleri (“celery”).' },
    { h:'そ', k:'ソ', romaji:'so', hmnemo:'そ : deux vagues sinueuses l\'une au-dessus de l\'autre — le courant “so” qui coule.', mnemo:'ソ : une aiguille à coudre (“sew”) qui pique vers le bas.' },
  ]},
  { row:'T', items:[
    { h:'た', k:'タ', romaji:'ta', hmnemo:'た : un tabouret de bar avec un dossier courbé — “ta-daah !” on s\'assoit.', mnemo:'タ : une table avec une nappe qui dépasse.' },
    { h:'ち', k:'チ', romaji:'chi', hmnemo:'ち : le chiffre 5 à l\'envers avec un crochet recourbé — “chi” = cinq doigts qui se croisent.', mnemo:'チ : ressemble au chiffre 7 — pense à des baguettes qui piquent.' },
    { h:'つ', k:'ツ', romaji:'tsu', hmnemo:'つ : trois petites vagues qui arrivent sur la plage — un mini “tsunami”.', mnemo:'ツ : trois vaguelettes — comme un tsunami miniature.' },
    { h:'て', k:'テ', romaji:'te', hmnemo:'て : une main tendue avec les doigts joints — “te” = main en japonais (手).', mnemo:'テ : une antenne de télévision (“te”levision).' },
    { h:'と', k:'ト', romaji:'to', hmnemo:'と : un poteau avec une épine recourbée vers la droite — comme une épine de rosier.', mnemo:'ト : une porte (“to”temique) entrouverte.' },
  ]},
  { row:'N', items:[
    { h:'な', k:'ナ', romaji:'na', hmnemo:'な : un nœud compliqué avec un crochet — “nah, c\'est emmêlé !”', mnemo:'ナ : une croix simple, comme un clou (“nail”) planté.' },
    { h:'に', k:'ニ', romaji:'ni', hmnemo:'に : deux tiroirs superposés avec une poignée à droite — “ni” = deux tiroirs (二 = deux).', mnemo:'ニ : deux traits horizontaux — comme le chiffre 2, pense à “knee” (genou).' },
    { h:'ぬ', k:'ヌ', romaji:'nu', hmnemo:'ぬ : un nœud serré avec une boucle qui sort — “nu = noué” comme des lacets.', mnemo:'ヌ : une nouille (“noodle”) qui se tortille.' },
    { h:'ね', k:'ネ', romaji:'ne', hmnemo:'ね : une spirale avec une queue — ça ressemble à un chat qui se love (猫 = neko = chat).', mnemo:'ネ : un filet (“net”) avec un fil qui dépasse.' },
    { h:'の', k:'ノ', romaji:'no', hmnemo:'の : un cercle ouvert qui spirale — comme un “o” qui ne se referme jamais.', mnemo:'ノ : un seul trait simple — le plus facile, une barre qui dit “non”.' },
  ]},
  { row:'H', items:[
    { h:'は', k:'ハ', romaji:'ha', hmnemo:'は : une fenêtre à deux volets avec une croix — “ha !” le vent entre.', mnemo:'ハ : deux jambes écartées qui rient “ha-ha”.' },
    { h:'ひ', k:'ヒ', romaji:'hi', hmnemo:'ひ : un sourire en forme de crochet — “hi !” lancé avec le sourire.', mnemo:'ヒ : un sourcil levé et un sourire — “hi !” pour saluer.' },
    { h:'ふ', k:'フ', romaji:'fu', hmnemo:'ふ : trois branches comme le Mont Fuji + un tronc — “Fu”ji-san.', mnemo:'フ : le silhouette du Mont Fuji (“Fu”ji).' },
    { h:'へ', k:'ヘ', romaji:'he', hmnemo:'へ : un simple toit pointu — ASTUCE : hiragana et katakana sont presque identiques !', mnemo:'ヘ : un simple toit pointu, comme un chapeau pointu.' },
    { h:'ほ', k:'ホ', romaji:'ho', hmnemo:'ほ : une maison à deux fenêtres avec un toit et une croix centrale — “ho”me.', mnemo:'ホ : une maison (“ho”me) avec un poteau central.' },
  ]},
  { row:'M', items:[
    { h:'ま', k:'マ', romaji:'ma', hmnemo:'ま : une croix de chemin de fer avec un crochet — “ma !” dit la maman qui s\'emmêle.', mnemo:'マ : une baguette magique (“ma”gic) qui tourbillonne.' },
    { h:'み', k:'ミ', romaji:'mi', hmnemo:'み : deux serpentins qui se croisent — comme des “mi”grations de poissons.', mnemo:'ミ : trois traits courts, comme un micro (“mi”crophone) sur pied.' },
    { h:'む', k:'ム', romaji:'mu', hmnemo:'む : une vache qui mugit — le U renversé = tête + la corne relevée.', mnemo:'ム : une tête de vache qui fait “meuh” (“mu”).' },
    { h:'め', k:'メ', romaji:'me', hmnemo:'め : une spirale avec un œil à l\'intérieur — “me” = yeux (目) en japonais.', mnemo:'メ : un “X” avec un cil qui dépasse — un œil qui cligne (“me”).' },
    { h:'も', k:'モ', romaji:'mo', hmnemo:'も : un hameçon avec deux queues horizontales — “mo” = encore plus compliqué que め.', mnemo:'モ : un hameçon à trois traits, “more” compliqué que メ.' },
  ]},
  { row:'Y', items:[
    { h:'や', k:'ヤ', romaji:'ya', hmnemo:'や : un chariot de maison vu de côté — “ya !” on part en voyage.', mnemo:'ヤ : un lance-pierre (“ya” comme “yah !” en tirant).' },
    { h:'ゆ', k:'ユ', romaji:'yu', hmnemo:'ゆ : une spirale d\'eau chaude qui coule — “yu” = eau chaude (湯) en japonais.', mnemo:'ユ : un hameçon en U — il t\'a “hooké” (“you”).' },
    { h:'よ', k:'ヨ', romaji:'yo', hmnemo:'よ : le chiffre 7 courbé avec une queue qui dépasse — “yoo !” on accroche quelque chose.', mnemo:'ヨ : trois barres horizontales, comme un yoyo (“yo-yo”) empilé.' },
  ]},
  { row:'R', items:[
    { h:'ら', k:'ラ', romaji:'ra', hmnemo:'ら : une jambe repliée sous une tête ronde — quelqu\'un qui s\'assoit en “ra-lentissant”.', mnemo:'ラ : une oreille de lapin (“ra”bbit) dressée.' },
    { h:'り', k:'リ', romaji:'ri', hmnemo:'り : deux baguettes parallèles qui descendent — le riz (riz = kome mais “ri” c\'est le rice!).', mnemo:'リ : deux baguettes posées côte à côte pour le riz (“ri”ce).' },
    { h:'る', k:'ル', romaji:'ru', hmnemo:'る : une spirale qui s\'enroule vers l\'intérieur — comme une “ru”e en colimaçon.', mnemo:'ル : une boucle qui s\'enroule (“ru”le, “loop”).' },
    { h:'れ', k:'レ', romaji:'re', hmnemo:'れ : comme り mais avec une boucle à gauche — un “re”ссort qui rebondit.', mnemo:'レ : une crosse de hockey simple, un seul trait courbé.' },
    { h:'ろ', k:'ロ', romaji:'ro', hmnemo:'ろ : comme る mais sans la queue finale — une vague qui se referme en “ro”nd.', mnemo:'ロ : un carré fermé — une pièce (“ro”om).' },
  ]},
  { row:'W/N', items:[
    { h:'わ', k:'ワ', romaji:'wa', hmnemo:'わ : comme り avec un crochet rajouté à gauche — un personnage qui dit “wah!” en écartant les bras.', mnemo:'ワ : une guêpe (“wasp”) qui vole, ailes ouvertes.' },
    { h:'を', k:'ヲ', romaji:'wo', hmnemo:'を : particule objet (très rare en dehors de la grammaire) — retiens-le par sa complexité visuelle.', mnemo:'ヲ : forme rare (particule uniquement) — un crochet compliqué à reconnaître par sa rareté.' },
    { h:'ん', k:'ン', romaji:'n', hmnemo:'ん : une virgule avec un crochet qui s\'arrête — le son “n” tout seul, sans voyelle.', mnemo:'ン : deux petits traits parallèles, le son “n” tout seul, le plus court.' },
  ]},
];

// ---------- Formes dérivées : dakuten (゛) et handakuten (゜) ----------
// Règle mnémotechnique générale : les deux petits traits (゛) ajoutent de la « voix » à la consonne
// (k→g, s→z, t→d, h→b) — comme des guillemets qui font vibrer le son.
// Le petit cercle (゜) n'existe que sur la ligne H et fait « péter » un P, comme une bulle qui pop.
export const KANA_DAKUTEN = [
  { row:'G (k+゛)', items:[
    { h:'が', k:'ガ', romaji:'ga' }, { h:'ぎ', k:'ギ', romaji:'gi' }, { h:'ぐ', k:'グ', romaji:'gu' },
    { h:'げ', k:'ゲ', romaji:'ge' }, { h:'ご', k:'ゴ', romaji:'go' },
  ]},
  { row:'Z (s+゛)', items:[
    { h:'ざ', k:'ザ', romaji:'za' }, { h:'じ', k:'ジ', romaji:'ji' }, { h:'ず', k:'ズ', romaji:'zu' },
    { h:'ぜ', k:'ゼ', romaji:'ze' }, { h:'ぞ', k:'ゾ', romaji:'zo' },
  ]},
  { row:'D (t+゛)', items:[
    { h:'だ', k:'ダ', romaji:'da' }, { h:'ぢ', k:'ヂ', romaji:'ji' }, { h:'づ', k:'ヅ', romaji:'zu' },
    { h:'で', k:'デ', romaji:'de' }, { h:'ど', k:'ド', romaji:'do' },
  ]},
  { row:'B (h+゛)', items:[
    { h:'ば', k:'バ', romaji:'ba' }, { h:'び', k:'ビ', romaji:'bi' }, { h:'ぶ', k:'ブ', romaji:'bu' },
    { h:'べ', k:'ベ', romaji:'be' }, { h:'ぼ', k:'ボ', romaji:'bo' },
  ]},
];

export const KANA_HANDAKUTEN = [
  { row:'P (h+゜)', items:[
    { h:'ぱ', k:'パ', romaji:'pa' }, { h:'ぴ', k:'ピ', romaji:'pi' }, { h:'ぷ', k:'プ', romaji:'pu' },
    { h:'ぺ', k:'ペ', romaji:'pe' }, { h:'ぽ', k:'ポ', romaji:'po' },
  ]},
];

// ---------- Combinaisons yōon : consonne -i + petit や/ゆ/よ fusionnés en une seule syllabe ----------
// Mnémotechnique : le petit や/ゆ/よ « s'écrase » contre le grand caractère pour ne faire qu'un seul son
// (きゃ se prononce "kya" en une syllabe, jamais "ki-ya" en deux syllabes).
export const KANA_YOON = [
  { row:'ky/sh/ch/ny/hy/my/ry', items:[
    { h:'きゃ', k:'キャ', romaji:'kya' }, { h:'きゅ', k:'キュ', romaji:'kyu' }, { h:'きょ', k:'キョ', romaji:'kyo' },
    { h:'しゃ', k:'シャ', romaji:'sha' }, { h:'しゅ', k:'シュ', romaji:'shu' }, { h:'しょ', k:'ショ', romaji:'sho' },
    { h:'ちゃ', k:'チャ', romaji:'cha' }, { h:'ちゅ', k:'チュ', romaji:'chu' }, { h:'ちょ', k:'チョ', romaji:'cho' },
    { h:'にゃ', k:'ニャ', romaji:'nya' }, { h:'にゅ', k:'ニュ', romaji:'nyu' }, { h:'にょ', k:'ニョ', romaji:'nyo' },
    { h:'ひゃ', k:'ヒャ', romaji:'hya' }, { h:'ひゅ', k:'ヒュ', romaji:'hyu' }, { h:'ひょ', k:'ヒョ', romaji:'hyo' },
    { h:'みゃ', k:'ミャ', romaji:'mya' }, { h:'みゅ', k:'ミュ', romaji:'myu' }, { h:'みょ', k:'ミョ', romaji:'myo' },
    { h:'りゃ', k:'リャ', romaji:'rya' }, { h:'りゅ', k:'リュ', romaji:'ryu' }, { h:'りょ', k:'リョ', romaji:'ryo' },
  ]},
  { row:'gy/j/by/py (voisées)', items:[
    { h:'ぎゃ', k:'ギャ', romaji:'gya' }, { h:'ぎゅ', k:'ギュ', romaji:'gyu' }, { h:'ぎょ', k:'ギョ', romaji:'gyo' },
    { h:'じゃ', k:'ジャ', romaji:'ja'  }, { h:'じゅ', k:'ジュ', romaji:'ju'  }, { h:'じょ', k:'ジョ', romaji:'jo'  },
    { h:'びゃ', k:'ビャ', romaji:'bya' }, { h:'びゅ', k:'ビュ', romaji:'byu' }, { h:'びょ', k:'ビョ', romaji:'byo' },
    { h:'ぴゃ', k:'ピャ', romaji:'pya' }, { h:'ぴゅ', k:'ピュ', romaji:'pyu' }, { h:'ぴょ', k:'ピョ', romaji:'pyo' },
  ]},
];

// ---------- Katakana seul : sons spéciaux pour les mots étrangers (pas d'équivalent hiragana) ----------
export const KATAKANA_ONLY = [
  { k:'ファ', romaji:'fa' }, { k:'フィ', romaji:'fi' }, { k:'フェ', romaji:'fe' }, { k:'フォ', romaji:'fo' },
  { k:'ヴァ', romaji:'va' }, { k:'ウィ', romaji:'wi' }, { k:'ウェ', romaji:'we' },
  { k:'ティ', romaji:'ti' }, { k:'トゥ', romaji:'tu' }, { k:'ディ', romaji:'di' }, { k:'ドゥ', romaji:'du' },
];

// ---------- Listes plates dérivées (pour le quiz) ----------
function flatten(groups, keyH='h', keyK='k'){
  const out = [];
  groups.forEach(g => g.items.forEach(it => out.push(it)));
  return out;
}
export const HIRAGANA = [
  ...flatten(KANA_BASE).map(({h,romaji})=>({kana:h, romaji})),
  ...flatten(KANA_DAKUTEN).map(({h,romaji})=>({kana:h, romaji})),
  ...flatten(KANA_HANDAKUTEN).map(({h,romaji})=>({kana:h, romaji})),
  ...flatten(KANA_YOON).map(({h,romaji})=>({kana:h, romaji})),
];
export const KATAKANA = [
  ...flatten(KANA_BASE).map(({k,romaji})=>({kana:k, romaji})),
  ...flatten(KANA_DAKUTEN).map(({k,romaji})=>({kana:k, romaji})),
  ...flatten(KANA_HANDAKUTEN).map(({k,romaji})=>({kana:k, romaji})),
  ...flatten(KANA_YOON).map(({k,romaji})=>({kana:k, romaji})),
  ...KATAKANA_ONLY.map(({k,romaji})=>({kana:k, romaji})),
];
