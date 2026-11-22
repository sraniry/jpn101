// Mots réels pour voir les dérivés (゛ dakuten, ゜ handakuten) et les yōon en contexte.
// Règle : chaque exemple de « dakuten » contient au moins un ゛ dans sa lecture kana,
// chaque exemple de « handakuten » au moins un ゜ (vérifié par tests/run.mjs).
export const DERIVED_WORDS = {
  dakuten: [
    { jp:'頑張って', kana:'がんばって', romaji:'Ganbatte', fr:'Courage ! / Fais de ton mieux !' },
    { jp:'大丈夫です', kana:'だいじょうぶです', romaji:'Daijoubu desu', fr:'Ça va, pas de problème.' },
    { jp:'ご飯', kana:'ごはん', romaji:'Gohan', fr:'Riz / repas' },
    { jp:'鞄', kana:'かばん', romaji:'Kaban', fr:'Sac' },
    { jp:'番号', kana:'ばんごう', romaji:'Bangou', fr:'Numéro' },
    { jp:'残念です', kana:'ざんねんです', romaji:'Zannen desu', fr:'C\'est dommage.' },
    { jp:'全部でいくらですか', kana:'ぜんぶでいくらですか', romaji:'Zenbu de ikura desu ka', fr:'Combien ça fait au total ?' },
  ],
  handakuten: [
    { jp:'乾杯', kana:'かんぱい', romaji:'Kanpai', fr:'Santé ! (en trinquant)' },
    { jp:'立派です', kana:'りっぱです', romaji:'Rippa desu', fr:'C\'est magnifique / splendide.' },
    { jp:'出発します', kana:'しゅっぱつします', romaji:'Shuppatsu shimasu', fr:'Je pars / le départ a lieu.' },
    { jp:'元気いっぱい', kana:'げんきいっぱい', romaji:'Genki ippai', fr:'Plein d\'énergie.' },
    { jp:'ぴったりです', kana:'ぴったりです', romaji:'Pittari desu', fr:'C\'est parfaitement adapté.' },
    { jp:'鉛筆', kana:'えんぴつ', romaji:'Enpitsu', fr:'Crayon' },
  ],
  yoon: [
    { jp:'今日は何曜日ですか', kana:'きょうはなんようびですか', romaji:'Kyou wa nan youbi desu ka', fr:'Quel jour sommes-nous aujourd\'hui ?' },
    { jp:'写真を撮ってもいいですか', kana:'しゃしんをとってもいいですか', romaji:'Shashin o tottemo ii desu ka', fr:'Puis-je prendre une photo ?' },
    { jp:'電車に乗ります', kana:'でんしゃにのります', romaji:'Densha ni norimasu', fr:'Je monte dans le train.' },
    { jp:'お茶をください', kana:'おちゃをください', romaji:'Ocha o kudasai', fr:'Du thé, s\'il vous plaît.' },
    { jp:'病院はどこですか', kana:'びょういんはどこですか', romaji:'Byouin wa doko desu ka', fr:'Où est l\'hôpital ?' },
    { jp:'旅行が好きです', kana:'りょこうがすきです', romaji:'Ryokou ga suki desu', fr:'J\'aime voyager.' },
    { jp:'じゃあね', kana:'じゃあね', romaji:'Jaa ne', fr:'À plus ! (familier)' },
    { jp:'三百円です', kana:'さんびゃくえんです', romaji:'Sanbyaku en desu', fr:'Ça fait 300 yens.' },
  ],
};
