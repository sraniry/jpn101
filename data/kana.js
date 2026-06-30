// Hiragana & Katakana — hiragana et katakana toujours appariés (même son, l'un à côté de l'autre)
// mnemo = moyen mnémotechnique pour le katakana (forme souvent plus anguleuse, plus dure à retenir que le hiragana)

export const KANA_BASE = [
  { row:'Voyelles', items:[
    { h:'あ', k:'ア', romaji:'a', mnemo:'ア : la diagonale rappelle un “A” majuscule penché en arrière.' },
    { h:'い', k:'イ', romaji:'i', mnemo:'イ : deux jambes qui marchent — pense à “il” qui avance.' },
    { h:'う', k:'ウ', romaji:'u', mnemo:'ウ : un petit toit posé sur un crochet, comme un chapeau sur un “u”.' },
    { h:'え', k:'エ', romaji:'e', mnemo:'エ : la lettre “E” redressée — comme dans エレベーター (ascenseur).' },
    { h:'お', k:'オ', romaji:'o', mnemo:'オ : un bonhomme qui lève les bras en criant “Oh !”.' },
  ]},
  { row:'K', items:[
    { h:'か', k:'カ', romaji:'ka', mnemo:'カ : ressemble à une faucille qui “coupe” — comme un couteau.' },
    { h:'き', k:'キ', romaji:'ki', mnemo:'キ : ressemble à une clé (“key”) avec ses dents.' },
    { h:'く', k:'ク', romaji:'ku', mnemo:'ク : un bec d\'oiseau qui fait “cou-cou”.' },
    { h:'け', k:'ケ', romaji:'ke', mnemo:'ケ : comme キ mais avec une jambe qui glisse — une bouilloire qui verse.' },
    { h:'こ', k:'コ', romaji:'ko', mnemo:'コ : deux traits parallèles comme un coin (“corner”) de boîte.' },
  ]},
  { row:'S', items:[
    { h:'さ', k:'サ', romaji:'sa', mnemo:'サ : ressemble à des ciseaux ouverts.' },
    { h:'し', k:'シ', romaji:'shi', mnemo:'シ : un sourire “:)” — pense à “shi” = happy face.' },
    { h:'す', k:'ス', romaji:'su', mnemo:'ス : une mèche de nouille aspirée en spirale.' },
    { h:'せ', k:'セ', romaji:'se', mnemo:'セ : un zigzag comme un brin de céleri (“celery”).' },
    { h:'そ', k:'ソ', romaji:'so', mnemo:'ソ : une aiguille à coudre (“sew”) qui pique vers le bas.' },
  ]},
  { row:'T', items:[
    { h:'た', k:'タ', romaji:'ta', mnemo:'タ : une table avec une nappe qui dépasse.' },
    { h:'ち', k:'チ', romaji:'chi', mnemo:'チ : ressemble au chiffre 7 — pense à des baguettes qui piquent.' },
    { h:'つ', k:'ツ', romaji:'tsu', mnemo:'ツ : trois vaguelettes — comme un tsunami miniature.' },
    { h:'て', k:'テ', romaji:'te', mnemo:'テ : une antenne de télévision (“te”levision).' },
    { h:'と', k:'ト', romaji:'to', mnemo:'ト : une porte (“to”temique) entrouverte.' },
  ]},
  { row:'N', items:[
    { h:'な', k:'ナ', romaji:'na', mnemo:'ナ : une croix simple, comme un clou (“nail”) planté.' },
    { h:'に', k:'ニ', romaji:'ni', mnemo:'ニ : deux traits horizontaux — comme le chiffre 2, pense à “knee” (genou).' },
    { h:'ぬ', k:'ヌ', romaji:'nu', mnemo:'ヌ : une nouille (“noodle”) qui se tortille.' },
    { h:'ね', k:'ネ', romaji:'ne', mnemo:'ネ : un filet (“net”) avec un fil qui dépasse.' },
    { h:'の', k:'ノ', romaji:'no', mnemo:'ノ : un seul trait simple — le plus facile, une barre qui dit “non”.' },
  ]},
  { row:'H', items:[
    { h:'は', k:'ハ', romaji:'ha', mnemo:'ハ : deux jambes écartées qui rient “ha-ha”.' },
    { h:'ひ', k:'ヒ', romaji:'hi', mnemo:'ヒ : un sourcil levé et un sourire — “hi !” pour saluer.' },
    { h:'ふ', k:'フ', romaji:'fu', mnemo:'フ : le silhouette du Mont Fuji (“Fu”ji).' },
    { h:'へ', k:'ヘ', romaji:'he', mnemo:'ヘ : un simple toit pointu, comme un chapeau pointu.' },
    { h:'ほ', k:'ホ', romaji:'ho', mnemo:'ホ : une maison (“ho”me) avec un poteau central.' },
  ]},
  { row:'M', items:[
    { h:'ま', k:'マ', romaji:'ma', mnemo:'マ : une baguette magique (“ma”gic) qui tourbillonne.' },
    { h:'み', k:'ミ', romaji:'mi', mnemo:'ミ : trois traits courts, comme un micro (“mi”crophone) sur pied.' },
    { h:'む', k:'ム', romaji:'mu', mnemo:'ム : une tête de vache qui fait “meuh” (“mu”).' },
    { h:'め', k:'メ', romaji:'me', mnemo:'メ : un “X” avec un cil qui dépasse — un œil qui cligne (“me”).' },
    { h:'も', k:'モ', romaji:'mo', mnemo:'モ : un hameçon à trois traits, “more” compliqué que メ.' },
  ]},
  { row:'Y', items:[
    { h:'や', k:'ヤ', romaji:'ya', mnemo:'ヤ : un lance-pierre (“ya” comme “yah !” en tirant).' },
    { h:'ゆ', k:'ユ', romaji:'yu', mnemo:'ユ : un hameçon en U — il t\'a “hooké” (“you”).' },
    { h:'よ', k:'ヨ', romaji:'yo', mnemo:'ヨ : trois barres horizontales, comme un yoyo (“yo-yo”) empilé.' },
  ]},
  { row:'R', items:[
    { h:'ら', k:'ラ', romaji:'ra', mnemo:'ラ : une oreille de lapin (“ra”bbit) dressée.' },
    { h:'り', k:'リ', romaji:'ri', mnemo:'リ : deux baguettes posées côte à côte pour le riz (“ri”ce).' },
    { h:'る', k:'ル', romaji:'ru', mnemo:'ル : une boucle qui s\'enroule (“ru”le, “loop”).' },
    { h:'れ', k:'レ', romaji:'re', mnemo:'レ : une crosse de hockey simple, un seul trait courbé.' },
    { h:'ろ', k:'ロ', romaji:'ro', mnemo:'ロ : un carré fermé — une pièce (“ro”om).' },
  ]},
  { row:'W/N', items:[
    { h:'わ', k:'ワ', romaji:'wa', mnemo:'ワ : une guêpe (“wasp”) qui vole, ailes ouvertes.' },
    { h:'を', k:'ヲ', romaji:'wo', mnemo:'ヲ : forme rare (particule uniquement) — un crochet compliqué à reconnaître par sa rareté.' },
    { h:'ん', k:'ン', romaji:'n', mnemo:'ン : deux petits traits parallèles, le son “n” tout seul, le plus court.' },
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
