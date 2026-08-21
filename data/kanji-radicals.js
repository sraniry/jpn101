// ---------- Index des radicaux récurrents dans les 103 kanji N5 ----------
// Un radical est la brique qui compose un kanji. Au lieu de mémoriser 103 dessins
// isolés, reconnaître ~25 radicaux qui reviennent partout réduit le problème à
// beaucoup moins d'éléments — et donne un sens à la forme plutôt qu'un dessin à copier.
// `k` = la liste des kanji N5 (parmi les 103) qui contiennent ce radical.
export const KANJI_RADICALS = [
  { r:'一', meaning:'un / trait horizontal', story:'Le radical le plus simple : une seule ligne. Sert aussi de compteur visuel — 二 = deux traits, 三 = trois traits.', k:['一','二','三','百','天','立'] },
  { r:'人 / 亻', meaning:'personne', story:'Une silhouette vue de profil, jambes en marche. En haut d\'un kanji il se tasse en toit (今, 会, 食) ; à gauche il devient 亻 (休, 何).', k:['人','円','金','今','休','何','会','食'] },
  { r:'木', meaning:'arbre / bois', story:'Un tronc avec des branches. Se reconnaît d\'un coup d\'œil et donne son sens à tout ce qui touche au bois, à la nature ou — étonnamment — à l\'origine (本, la racine).', k:['木','東','校','来','本','休','新'] },
  { r:'日', meaning:'soleil / jour', story:'Un carré avec un trait dedans — une fenêtre avec un rayon. Partout où il y a une notion de temps ou de lumière.', k:['日','時','間','書','東'] },
  { r:'口', meaning:'bouche / enclos', story:'Un simple carré ouvert. Selon le contexte c\'est une vraie bouche (名, 右) ou un enclos/une limite (中, 古, 高).', k:['口','名','右','古','中','高','足','国'] },
  { r:'女', meaning:'femme', story:'Silhouette agenouillée, bras croisés — image ancienne. 母 l\'enrichit de deux points (la poitrine qui nourrit) ; 安 la place sous un toit (paisible, donc « pas cher »).', k:['女','母','安'] },
  { r:'十', meaning:'dix', story:'Une croix parfaite, comme les dix doigts croisés. Revient dans des kanji sans lien évident avec le nombre dix (古, 南) — un signe que le sens s\'est perdu avec le temps.', k:['十','古','南','半'] },
  { r:'八', meaning:'diviser / huit', story:'Deux traits qui s\'écartent, comme un partage en deux. D\'où son sens de « diviser » dans 分 (couper pour comprendre) et 半 (couper en deux parts).', k:['八','六','分','半'] },
  { r:'言 / 訁', meaning:'parole', story:'Une bouche d\'où sortent des mots empilés. Absolument tous les kanji liés au langage (parler, lire, écrire, la langue elle-même) le contiennent.', k:['言','話','読','語'] },
  { r:'辶', meaning:'marche / route', story:'Représente le mouvement sur un chemin. Se trouve toujours en bas à gauche du kanji, jamais isolé.', k:['週','道'] },
  { r:'門', meaning:'porte', story:'Deux battants de porte dessinés symétriquement. Ce qui se passe « à travers » une porte — le soleil qui filtre (間) ou l\'oreille collée dessus (聞).', k:['間','聞'] },
  { r:'子', meaning:'enfant', story:'Une grosse tête, deux petits membres repliés — un bébé emmailloté. 学 place ce radical sous des mains protectrices (冖) : apprendre, c\'est veiller sur l\'enfant qui grandit.', k:['子','学'] },
  { r:'大', meaning:'grand', story:'Une personne bras et jambes grands ouverts — le geste universel pour montrer une grande taille.', k:['大','天','立'] },
  { r:'土', meaning:'terre / sol', story:'Une croix posée sur une base, comme une plante qui sort du sol. Revient dans tout ce qui touche à un lieu fixe, une fondation, ou ce qui en sort (生, la vie qui pousse).', k:['土','金','先','社','生'] },
  { r:'夕', meaning:'soir / crépuscule', story:'La lune qui commence à monter. 名 l\'associe à une bouche (appeler quelqu\'un dans l\'obscurité) ; 多 l\'empile deux fois (deux soirs valent mieux qu\'un — beaucoup).', k:['名','外','多'] },
  { r:'田', meaning:'champ (ou corps stylisé)', story:'Un champ divisé en parcelles, carré traversé d\'une croix. 男 l\'associe à la force (力) : l\'homme qui travaille le champ.', k:['男','魚'] },
  { r:'儿', meaning:'jambes / personne', story:'Une paire de jambes qui marchent, presque toujours en bas d\'un kanji. Marque souvent une personne en mouvement ou en action.', k:['四','見','先'] },
  { r:'彳', meaning:'petits pas / marche', story:'Trois traits obliques qui évoquent des pas. Toujours à gauche, jamais seul — il annonce un déplacement.', k:['行','後'] },
  { r:'雨', meaning:'pluie', story:'Une voûte céleste avec des gouttes qui tombent dessous — très visuel, facile à repérer même dans un kanji complexe comme 電 (la pluie + l\'éclair = l\'électricité).', k:['雨','電'] },
  { r:'目', meaning:'œil', story:'Un rectangle avec deux traits dedans, comme un œil couché sur le côté. Dans 見, il se pose sur des jambes (儿) : un œil qui se déplace pour tout voir.', k:['目','見'] },
  { r:'耳', meaning:'oreille', story:'Le pavillon et le lobe vus de profil. Dans 聞, il se colle contre une porte (門) — écouter aux portes.', k:['耳','聞'] },
  { r:'食 / 飠', meaning:'manger / nourriture', story:'Un toit au-dessus d\'un bon plat. 飲 lui ajoute 欠 (manquer, bâiller) : on boit quand la bouche manque d\'eau.', k:['食','飲'] },
  { r:'亠', meaning:'toit / couvercle', story:'Un petit chapeau au sommet du kanji — jamais un mot à lui seul, toujours un signal visuel qu\'il y a quelque chose « au-dessus » ou « qui referme ».', k:['六','高'] },
  { r:'宀 / 冖', meaning:'toit (maison)', story:'Un toit qui recouvre tout le kanji. 安 (paix, une femme chez elle) et 学 (étude, un enfant protégé) l\'utilisent tous les deux pour l\'idée d\'abri.', k:['学','安'] },
];
