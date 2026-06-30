// Hiragana & Katakana — tables complètes avec romaji

export const HIRAGANA = [
  // Voyelles
  { kana:'あ', romaji:'a' }, { kana:'い', romaji:'i' }, { kana:'う', romaji:'u' },
  { kana:'え', romaji:'e' }, { kana:'お', romaji:'o' },
  // K
  { kana:'か', romaji:'ka' }, { kana:'き', romaji:'ki' }, { kana:'く', romaji:'ku' },
  { kana:'け', romaji:'ke' }, { kana:'こ', romaji:'ko' },
  // S
  { kana:'さ', romaji:'sa' }, { kana:'し', romaji:'shi' }, { kana:'す', romaji:'su' },
  { kana:'せ', romaji:'se' }, { kana:'そ', romaji:'so' },
  // T
  { kana:'た', romaji:'ta' }, { kana:'ち', romaji:'chi' }, { kana:'つ', romaji:'tsu' },
  { kana:'て', romaji:'te' }, { kana:'と', romaji:'to' },
  // N
  { kana:'な', romaji:'na' }, { kana:'に', romaji:'ni' }, { kana:'ぬ', romaji:'nu' },
  { kana:'ね', romaji:'ne' }, { kana:'の', romaji:'no' },
  // H
  { kana:'は', romaji:'ha' }, { kana:'ひ', romaji:'hi' }, { kana:'ふ', romaji:'fu' },
  { kana:'へ', romaji:'he' }, { kana:'ほ', romaji:'ho' },
  // M
  { kana:'ま', romaji:'ma' }, { kana:'み', romaji:'mi' }, { kana:'む', romaji:'mu' },
  { kana:'め', romaji:'me' }, { kana:'も', romaji:'mo' },
  // Y
  { kana:'や', romaji:'ya' }, { kana:'ゆ', romaji:'yu' }, { kana:'よ', romaji:'yo' },
  // R
  { kana:'ら', romaji:'ra' }, { kana:'り', romaji:'ri' }, { kana:'る', romaji:'ru' },
  { kana:'れ', romaji:'re' }, { kana:'ろ', romaji:'ro' },
  // W / N
  { kana:'わ', romaji:'wa' }, { kana:'を', romaji:'wo' }, { kana:'ん', romaji:'n' },
  // Dakuten (voiced)
  { kana:'が', romaji:'ga' }, { kana:'ぎ', romaji:'gi' }, { kana:'ぐ', romaji:'gu' },
  { kana:'げ', romaji:'ge' }, { kana:'ご', romaji:'go' },
  { kana:'ざ', romaji:'za' }, { kana:'じ', romaji:'ji' }, { kana:'ず', romaji:'zu' },
  { kana:'ぜ', romaji:'ze' }, { kana:'ぞ', romaji:'zo' },
  { kana:'だ', romaji:'da' }, { kana:'ぢ', romaji:'ji' }, { kana:'づ', romaji:'zu' },
  { kana:'で', romaji:'de' }, { kana:'ど', romaji:'do' },
  { kana:'ば', romaji:'ba' }, { kana:'び', romaji:'bi' }, { kana:'ぶ', romaji:'bu' },
  { kana:'べ', romaji:'be' }, { kana:'ぼ', romaji:'bo' },
  // Handakuten (p-)
  { kana:'ぱ', romaji:'pa' }, { kana:'ぴ', romaji:'pi' }, { kana:'ぷ', romaji:'pu' },
  { kana:'ぺ', romaji:'pe' }, { kana:'ぽ', romaji:'po' },
  // Combinaisons (yōon)
  { kana:'きゃ', romaji:'kya' }, { kana:'きゅ', romaji:'kyu' }, { kana:'きょ', romaji:'kyo' },
  { kana:'しゃ', romaji:'sha' }, { kana:'しゅ', romaji:'shu' }, { kana:'しょ', romaji:'sho' },
  { kana:'ちゃ', romaji:'cha' }, { kana:'ちゅ', romaji:'chu' }, { kana:'ちょ', romaji:'cho' },
  { kana:'にゃ', romaji:'nya' }, { kana:'にゅ', romaji:'nyu' }, { kana:'にょ', romaji:'nyo' },
  { kana:'ひゃ', romaji:'hya' }, { kana:'ひゅ', romaji:'hyu' }, { kana:'ひょ', romaji:'hyo' },
  { kana:'みゃ', romaji:'mya' }, { kana:'みゅ', romaji:'myu' }, { kana:'みょ', romaji:'myo' },
  { kana:'りゃ', romaji:'rya' }, { kana:'りゅ', romaji:'ryu' }, { kana:'りょ', romaji:'ryo' },
  { kana:'ぎゃ', romaji:'gya' }, { kana:'ぎゅ', romaji:'gyu' }, { kana:'ぎょ', romaji:'gyo' },
  { kana:'じゃ', romaji:'ja'  }, { kana:'じゅ', romaji:'ju'  }, { kana:'じょ', romaji:'jo'  },
  { kana:'びゃ', romaji:'bya' }, { kana:'びゅ', romaji:'byu' }, { kana:'びょ', romaji:'byo' },
  { kana:'ぴゃ', romaji:'pya' }, { kana:'ぴゅ', romaji:'pyu' }, { kana:'ぴょ', romaji:'pyo' },
];

export const KATAKANA = [
  // Voyelles
  { kana:'ア', romaji:'a' }, { kana:'イ', romaji:'i' }, { kana:'ウ', romaji:'u' },
  { kana:'エ', romaji:'e' }, { kana:'オ', romaji:'o' },
  // K
  { kana:'カ', romaji:'ka' }, { kana:'キ', romaji:'ki' }, { kana:'ク', romaji:'ku' },
  { kana:'ケ', romaji:'ke' }, { kana:'コ', romaji:'ko' },
  // S
  { kana:'サ', romaji:'sa' }, { kana:'シ', romaji:'shi' }, { kana:'ス', romaji:'su' },
  { kana:'セ', romaji:'se' }, { kana:'ソ', romaji:'so' },
  // T
  { kana:'タ', romaji:'ta' }, { kana:'チ', romaji:'chi' }, { kana:'ツ', romaji:'tsu' },
  { kana:'テ', romaji:'te' }, { kana:'ト', romaji:'to' },
  // N
  { kana:'ナ', romaji:'na' }, { kana:'ニ', romaji:'ni' }, { kana:'ヌ', romaji:'nu' },
  { kana:'ネ', romaji:'ne' }, { kana:'ノ', romaji:'no' },
  // H
  { kana:'ハ', romaji:'ha' }, { kana:'ヒ', romaji:'hi' }, { kana:'フ', romaji:'fu' },
  { kana:'ヘ', romaji:'he' }, { kana:'ホ', romaji:'ho' },
  // M
  { kana:'マ', romaji:'ma' }, { kana:'ミ', romaji:'mi' }, { kana:'ム', romaji:'mu' },
  { kana:'メ', romaji:'me' }, { kana:'モ', romaji:'mo' },
  // Y
  { kana:'ヤ', romaji:'ya' }, { kana:'ユ', romaji:'yu' }, { kana:'ヨ', romaji:'yo' },
  // R
  { kana:'ラ', romaji:'ra' }, { kana:'リ', romaji:'ri' }, { kana:'ル', romaji:'ru' },
  { kana:'レ', romaji:'re' }, { kana:'ロ', romaji:'ro' },
  // W / N
  { kana:'ワ', romaji:'wa' }, { kana:'ヲ', romaji:'wo' }, { kana:'ン', romaji:'n' },
  // Dakuten
  { kana:'ガ', romaji:'ga' }, { kana:'ギ', romaji:'gi' }, { kana:'グ', romaji:'gu' },
  { kana:'ゲ', romaji:'ge' }, { kana:'ゴ', romaji:'go' },
  { kana:'ザ', romaji:'za' }, { kana:'ジ', romaji:'ji' }, { kana:'ズ', romaji:'zu' },
  { kana:'ゼ', romaji:'ze' }, { kana:'ゾ', romaji:'zo' },
  { kana:'ダ', romaji:'da' }, { kana:'ヂ', romaji:'ji' }, { kana:'ヅ', romaji:'zu' },
  { kana:'デ', romaji:'de' }, { kana:'ド', romaji:'do' },
  { kana:'バ', romaji:'ba' }, { kana:'ビ', romaji:'bi' }, { kana:'ブ', romaji:'bu' },
  { kana:'ベ', romaji:'be' }, { kana:'ボ', romaji:'bo' },
  // Handakuten
  { kana:'パ', romaji:'pa' }, { kana:'ピ', romaji:'pi' }, { kana:'プ', romaji:'pu' },
  { kana:'ペ', romaji:'pe' }, { kana:'ポ', romaji:'po' },
  // Combinaisons
  { kana:'キャ', romaji:'kya' }, { kana:'キュ', romaji:'kyu' }, { kana:'キョ', romaji:'kyo' },
  { kana:'シャ', romaji:'sha' }, { kana:'シュ', romaji:'shu' }, { kana:'ショ', romaji:'sho' },
  { kana:'チャ', romaji:'cha' }, { kana:'チュ', romaji:'chu' }, { kana:'チョ', romaji:'cho' },
  { kana:'ニャ', romaji:'nya' }, { kana:'ニュ', romaji:'nyu' }, { kana:'ニョ', romaji:'nyo' },
  { kana:'ヒャ', romaji:'hya' }, { kana:'ヒュ', romaji:'hyu' }, { kana:'ヒョ', romaji:'hyo' },
  { kana:'ミャ', romaji:'mya' }, { kana:'ミュ', romaji:'myu' }, { kana:'ミョ', romaji:'myo' },
  { kana:'リャ', romaji:'rya' }, { kana:'リュ', romaji:'ryu' }, { kana:'リョ', romaji:'ryo' },
  { kana:'ギャ', romaji:'gya' }, { kana:'ギュ', romaji:'gyu' }, { kana:'ギョ', romaji:'gyo' },
  { kana:'ジャ', romaji:'ja'  }, { kana:'ジュ', romaji:'ju'  }, { kana:'ジョ', romaji:'jo'  },
  { kana:'ビャ', romaji:'bya' }, { kana:'ビュ', romaji:'byu' }, { kana:'ビョ', romaji:'byo' },
  { kana:'ピャ', romaji:'pya' }, { kana:'ピュ', romaji:'pyu' }, { kana:'ピョ', romaji:'pyo' },
  // Sons spéciaux (mots étrangers)
  { kana:'ファ', romaji:'fa' }, { kana:'フィ', romaji:'fi' }, { kana:'フェ', romaji:'fe' },
  { kana:'フォ', romaji:'fo' }, { kana:'ヴァ', romaji:'va' }, { kana:'ウィ', romaji:'wi' },
  { kana:'ウェ', romaji:'we' }, { kana:'ティ', romaji:'ti' }, { kana:'トゥ', romaji:'tu' },
  { kana:'ディ', romaji:'di' }, { kana:'ドゥ', romaji:'du' },
];
