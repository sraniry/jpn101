// Décryptages « prof » des dialogues : dialogue → index du tour → morceaux expliqués.
// Tour PNJ = sa réplique ; tour utilisateur = la meilleure réponse.
export const CONV_BREAKDOWNS = {
 "pharmacie": {
  "0": [
   {
    "chunk": "いらっしゃいませ",
    "role": "La formule d'accueil de tout commerce, pharmacie comprise.",
    "tip": "Pas besoin de répondre : un petit signe de tête suffit. Tu l'entendras dans chaque magasin de Kyoto."
   },
   {
    "chunk": "どうされましたか",
    "role": "« Qu'est-ce qui vous arrive ? » — la question du pharmacien ou du médecin.",
    "tip": "C'est la version polie de どうしましたか (dou shimashita ka). Si un ami a l'air mal, tu peux lui demander どうしたの？ (dou shita no ?) = « qu'est-ce qui t'arrive ? »."
   }
  ],
  "1": [
   {
    "chunk": "頭が痛いです",
    "role": "« J'ai mal à la tête. » — la recette pour dire où tu as mal.",
    "tip": "Partie du corps + が痛いです. お腹が痛いです (onaka ga itai desu) = j'ai mal au ventre. のどが痛いです (nodo ga itai desu) = j'ai mal à la gorge."
   },
   {
    "chunk": "薬をください",
    "role": "« Un médicament, s'il vous plaît. »",
    "tip": "薬 (kusuri) = médicament. Chose + をください = « donnez-moi ça ». C'est la même formule qu'au restaurant avec これをください."
   }
  ],
  "2": [
   {
    "chunk": "熱は",
    "role": "« La fièvre… » — le pharmacien annonce de quoi il veut parler.",
    "tip": "熱 (netsu) = fièvre, chaleur. Mot indispensable si tu tombes malade pendant ton séjour."
   },
   {
    "chunk": "ありますか",
    "role": "« Est-ce que vous en avez ? » — pour demander si quelque chose existe ou si tu as quelque chose.",
    "tip": "Très utile partout : トイレはありますか？ = il y a des toilettes ? Wi-Fiはありますか？ = il y a du Wi-Fi ?"
   }
  ],
  "3": [
   {
    "chunk": "少しあります",
    "role": "« J'en ai un peu. » — tu reprends le verbe de la question pour répondre.",
    "tip": "En japonais, on répond souvent en répétant le verbe de la question : ありますか？ → あります. 少し (sukoshi) = un peu, mot très utile pour nuancer."
   },
   {
    "chunk": "37度くらいです",
    "role": "« Environ 37 degrés. »",
    "tip": "度 (do) = degré. くらい (kurai) = environ, à peu près. Tu peux le coller à n'importe quel nombre : 10分くらい = environ 10 minutes."
   }
  ],
  "4": [
   {
    "chunk": "一日三回",
    "role": "« Trois fois par jour. » — la posologie.",
    "tip": "一日 (ichinichi) = par jour. 回 (kai) = fois. 一回, 二回, 三回 = une, deux, trois fois. Tu le retrouveras sur toutes les boîtes de médicaments."
   },
   {
    "chunk": "食後に",
    "role": "« Après les repas. »",
    "tip": "食 = manger, 後 = après. Son contraire : 食前 (shokuzen) = avant les repas. Regarde bien ces deux mots sur la notice !"
   },
   {
    "chunk": "飲んでください",
    "role": "« Prenez-le, s'il vous plaît. » — en japonais, on « boit » un médicament.",
    "tip": "飲む (nomu) = boire, mais aussi prendre un médicament, même un cachet. Verbe en forme て + ください = consigne polie : 待ってください = attendez s'il vous plaît."
   }
  ],
  "5": [
   {
    "chunk": "わかりました",
    "role": "« D'accord, j'ai compris. »",
    "tip": "Ta réponse automatique quand on te donne une info ou une consigne. わかりません = je ne comprends pas."
   },
   {
    "chunk": "もう一度",
    "role": "« Encore une fois. »",
    "tip": "もう一度お願いします (mou ichido onegaishimasu) = « encore une fois s'il vous plaît » : la phrase de secours à connaître par cœur."
   },
   {
    "chunk": "ゆっくり言ってもらえますか",
    "role": "« Pourriez-vous le dire lentement ? » — pour demander un service gentiment.",
    "tip": "Verbe en forme て + もらえますか = « est-ce que vous pourriez faire ça pour moi ? ». 書いてもらえますか ? = pourriez-vous l'écrire ? Très pratique si tu ne comprends pas à l'oral."
   }
  ],
  "6": [
   {
    "chunk": "他に",
    "role": "« À part ça / en plus. »",
    "tip": "他に (hoka ni) = autre chose en plus. 他に何かありますか ? = il y a autre chose ? Tu l'entendras aussi à la caisse."
   },
   {
    "chunk": "症状はありますか",
    "role": "« Avez-vous des symptômes ? »",
    "tip": "症状 (shoujou) = symptôme. Mot de pharmacie et d'hôpital : utile à reconnaître, même si tu ne l'utilises pas toi-même."
   }
  ],
  "7": [
   {
    "chunk": "吐き気",
    "role": "« La nausée. »",
    "tip": "吐く (haku) = vomir, 気 = sensation. Littéralement « la sensation de vouloir vomir ». Autres symptômes utiles : 咳 (seki) = toux, 鼻水 (hanamizu) = nez qui coule."
   },
   {
    "chunk": "もあります",
    "role": "« J'ai aussi… » — も veut dire « aussi ».",
    "tip": "も remplace が quand tu ajoutes quelque chose à la liste. 熱もあります = j'ai aussi de la fièvre. 私も = moi aussi."
   }
  ],
  "8": [
   {
    "chunk": "お大事に",
    "role": "« Prenez soin de vous / remettez-vous bien. » — ce qu'on dit à quelqu'un de malade.",
    "tip": "Formule fixe, très gentille. Tu peux la dire à un camarade malade : お大事に ! Il te répondra ありがとう."
   }
  ],
  "9": [
   {
    "chunk": "ありがとうございます",
    "role": "« Merci beaucoup. » — version polie.",
    "tip": "À la pharmacie, au magasin, à l'hôtel : toujours la version longue. ありがとう tout court, c'est pour les amis."
   },
   {
    "chunk": "いくらですか",
    "role": "« C'est combien ? »",
    "tip": "いくら (ikura) = combien (pour un prix). Ta question n°1 en boutique. Tu peux pointer un objet : これはいくらですか ? = combien coûte ceci ?"
   }
  ]
 },
 "hotel": {
  "0": [
   {
    "chunk": "ご予約のお名前",
    "role": "« Le nom de votre réservation. »",
    "tip": "予約 (yoyaku) = réservation. Les ご et お devant montrent du respect envers toi, le client. Tu n'as pas besoin de les mettre quand tu parles de toi."
   },
   {
    "chunk": "お聞かせください",
    "role": "« Veuillez me le dire. » — une demande très polie de réceptionniste.",
    "tip": "C'est une façon élégante de dire « dites-moi ». Tu l'entendras dans les hôtels et au téléphone ; reconnaître la phrase suffit, tu n'as pas à la reproduire."
   }
  ],
  "1": [
   {
    "chunk": "デュポンで",
    "role": "« Au nom de Dupont. »",
    "tip": "Ton nom + で = « sous ce nom ». Remplace simplement デュポン par ton nom de famille en katakana."
   },
   {
    "chunk": "予約しています",
    "role": "« J'ai réservé (et la réservation est toujours là). »",
    "tip": "予約する = réserver. La forme ています montre un état qui dure : tu as réservé, et c'est toujours valable. Phrase clé à l'arrivée dans un hôtel ou un restaurant."
   }
  ],
  "2": [
   {
    "chunk": "パスポートを",
    "role": "« Votre passeport… »",
    "tip": "Mot venu de l'anglais, donc en katakana. Au Japon, les hôtels doivent photocopier le passeport des étrangers : garde-le à portée de main."
   },
   {
    "chunk": "見せていただけますか",
    "role": "« Pourriez-vous me le montrer ? » — une demande très polie.",
    "tip": "見せる (miseru) = montrer. ていただけますか = « me feriez-vous l'honneur de… ». Version plus simple que tu peux utiliser : 見せてもらえますか ?"
   }
  ],
  "3": [
   {
    "chunk": "はい",
    "role": "« Oui. »",
    "tip": "Le oui poli de base. Il sert aussi à dire « je vous écoute » ou « voilà » en tendant quelque chose."
   },
   {
    "chunk": "どうぞ",
    "role": "« Voilà, je vous en prie. » — quand tu tends un objet.",
    "tip": "どうぞ accompagne le geste de donner quelque chose. Tu l'utiliseras en tendant ton passeport, ta carte, un cadeau…"
   }
  ],
  "4": [
   {
    "chunk": "チェックアウトは11時です",
    "role": "« Le check-out est à 11 heures. »",
    "tip": "時 (ji) = heure. 11時 = juuichi-ji. Structure simple : sujet + は + info + です. 朝食は7時です = le petit-déjeuner est à 7h."
   },
   {
    "chunk": "7時から9時まで",
    "role": "« De 7 heures à 9 heures. »",
    "tip": "から = depuis/à partir de, まで = jusqu'à. Marche pour les horaires et les lieux : 京都から大阪まで = de Kyoto à Osaka."
   }
  ],
  "5": [
   {
    "chunk": "Wi-Fiのパスワード",
    "role": "« Le mot de passe du Wi-Fi. »",
    "tip": "Ici の relie deux noms comme « de » en français : 部屋の鍵 (heya no kagi) = la clé de la chambre."
   },
   {
    "chunk": "教えてもらえますか",
    "role": "« Pourriez-vous me le donner / me l'indiquer ? »",
    "tip": "教える (oshieru) = enseigner, mais aussi donner une info. 道を教えてもらえますか ? = pourriez-vous m'indiquer le chemin ?"
   }
  ],
  "6": [
   {
    "chunk": "302号室",
    "role": "« La chambre 302. »",
    "tip": "号室 (goushitsu) = numéro de chambre. On lit 302 : san-maru-ni ou sanbyaku-ni. Retiens bien ton numéro !"
   },
   {
    "chunk": "こちらがカードキーです",
    "role": "« Voici votre carte-clé. »",
    "tip": "こちらが〜です = « voici… » quand on présente quelque chose ou quelqu'un. こちらが田中さんです = voici M. Tanaka."
   }
  ],
  "7": [
   {
    "chunk": "荷物を",
    "role": "« Mes bagages… »",
    "tip": "荷物 (nimotsu) = bagages, affaires. 荷物を預けられますか ? = je peux laisser mes bagages ? — utile avant le check-in."
   },
   {
    "chunk": "部屋に運んでもらえますか",
    "role": "« Pourriez-vous les porter jusqu'à la chambre ? »",
    "tip": "運ぶ (hakobu) = transporter. に indique la destination. Encore la formule て + もらえますか pour demander un service poliment."
   }
  ]
 },
 "hotel-probleme": {
  "0": [
   {
    "chunk": "フロント",
    "role": "« La réception. » — mot venu de l'anglais « front (desk) ».",
    "tip": "Si tu as un souci à l'hôtel, c'est フロント qu'il faut appeler. Pour la trouver : フロントはどこですか ?"
   },
   {
    "chunk": "でございます",
    "role": "« C'est… » en version ultra-polie, typique du téléphone.",
    "tip": "でございます = です habillé pour un client. Les réceptionnistes décrochent toujours ainsi ; toi, tu restes avec です."
   }
  ],
  "1": [
   {
    "chunk": "302号室ですが",
    "role": "« C'est la chambre 302… » — tu te présentes avant d'expliquer le problème.",
    "tip": "Le が à la fin adoucit et annonce que la suite arrive. Au téléphone, commence toujours par qui tu es : 302号室ですが…"
   },
   {
    "chunk": "エアコンが壊れています",
    "role": "« La climatisation est en panne. »",
    "tip": "壊れる (kowareru) = se casser. ています = l'état actuel : elle est cassée, là, maintenant. テレビが壊れています = la télé ne marche pas."
   }
  ],
  "2": [
   {
    "chunk": "大変申し訳ございません",
    "role": "« Nous sommes vraiment désolés. » — la plus forte excuse d'un service client.",
    "tip": "Tu l'entendras dès qu'il y a un problème. Entre amis on dit simplement ごめんね. Toi, pour t'excuser poliment : すみません suffit."
   },
   {
    "chunk": "すぐに",
    "role": "« Tout de suite. »",
    "tip": "すぐ (sugu) = immédiatement. すぐ行きます = j'arrive tout de suite. Mot très courant."
   },
   {
    "chunk": "係の者",
    "role": "« La personne chargée de ça. »",
    "tip": "係 (kakari) = responsable d'une tâche. 係の者 = « notre employé responsable », formule modeste d'hôtel. Sur les panneaux tu verras 係員 (kakariin) = membre du personnel."
   },
   {
    "chunk": "向かわせます",
    "role": "« Je vous envoie quelqu'un. »",
    "tip": "Phrase de service à reconnaître plutôt qu'à reproduire. Retiens le sens général : quelqu'un arrive dans ta chambre."
   }
  ],
  "3": [
   {
    "chunk": "何分くらい",
    "role": "« Environ combien de minutes ? »",
    "tip": "何分 (nanpun) = combien de minutes. くらい = environ. 何時間くらい ? = environ combien d'heures ?"
   },
   {
    "chunk": "かかりますか",
    "role": "« Ça prend… ? » — pour demander une durée ou un coût.",
    "tip": "かかる = prendre (du temps) ou coûter (de l'argent). 駅まで何分かかりますか ? = combien de minutes jusqu'à la gare ?"
   }
  ],
  "4": [
   {
    "chunk": "他に何か",
    "role": "« Autre chose ? »",
    "tip": "他に = en plus, 何か = quelque chose. Tu l'entendras souvent dans les services : il suffit de répondre 大丈夫です si tout va bien."
   },
   {
    "chunk": "ご不便なこと",
    "role": "« Quelque chose qui vous gêne. »",
    "tip": "不便 (fuben) = pas pratique. Son contraire : 便利 (benri) = pratique. コンビニは便利です = les konbini, c'est pratique."
   }
  ],
  "5": [
   {
    "chunk": "タオルを",
    "role": "« Des serviettes… »",
    "tip": "Mot venu de l'anglais « towel ». Autres demandes utiles : 枕 (makura) = oreiller, 毛布 (moufu) = couverture."
   },
   {
    "chunk": "追加で",
    "role": "« En plus / en supplément. »",
    "tip": "追加 (tsuika) = ajout. Au restaurant : ご飯を追加でお願いします = un riz en plus s'il vous plaît."
   },
   {
    "chunk": "いただけますか",
    "role": "« Pourrais-je avoir… ? » — une demande très polie.",
    "tip": "Plus poli que ください. Parfait à l'hôtel : お水をいただけますか ? = pourrais-je avoir de l'eau ?"
   }
  ]
 },
 "gare": {
  "0": [
   {
    "chunk": "どちらまで",
    "role": "« Jusqu'où ? » — la question du guichet ou du chauffeur de taxi.",
    "tip": "どちら = où (version polie), まで = jusqu'à. Réponds simplement : destination + まで. 京都駅まで = jusqu'à la gare de Kyoto."
   },
   {
    "chunk": "ですか",
    "role": "Transforme la phrase en question polie.",
    "tip": "Comme un point d'interrogation qu'on prononce. Tu le retrouves partout."
   }
  ],
  "1": [
   {
    "chunk": "大阪まで一枚",
    "role": "« Un billet pour Osaka. »",
    "tip": "枚 (mai) = compteur des objets plats (billets, tickets, feuilles). 一枚, 二枚 = un, deux billets."
   },
   {
    "chunk": "片道",
    "role": "« Aller simple. »",
    "tip": "片道 (katamichi) = aller simple. 往復 (oufuku) = aller-retour. Deux mots à connaître avant d'acheter un billet."
   },
   {
    "chunk": "お願いします",
    "role": "« S'il vous plaît. »",
    "tip": "Tu colles お願いします après ce que tu veux : 往復お願いします = un aller-retour s'il vous plaît."
   }
  ],
  "2": [
   {
    "chunk": "新幹線と在来線",
    "role": "« Le Shinkansen ou une ligne classique. »",
    "tip": "新幹線 = train à grande vitesse. 在来線 (zairaisen) = lignes normales, plus lentes et moins chères. と relie deux choses : « et »."
   },
   {
    "chunk": "どちらにしますか",
    "role": "« Lequel choisissez-vous ? »",
    "tip": "にする = choisir. Tu peux répondre avec la même structure : 新幹線にします = je prends le Shinkansen. Marche aussi au café : コーヒーにします."
   }
  ],
  "3": [
   {
    "chunk": "新幹線でお願いします",
    "role": "« Le Shinkansen, s'il vous plaît. »",
    "tip": "で ici = « avec / en » pour le moyen. バスで行きます = j'y vais en bus."
   },
   {
    "chunk": "自由席",
    "role": "« Place non réservée. »",
    "tip": "自由 = libre, 席 = place. Son contraire : 指定席 (shiteiseki) = place réservée. Le 自由席 est moins cher, mais tu n'es pas sûre d'être assise."
   },
   {
    "chunk": "でいいです",
    "role": "« Ça m'ira très bien. » — pour accepter une option sans faire d'histoire.",
    "tip": "X でいいです = X, ça me va. 水でいいです = de l'eau, ça ira. Attention au ton : いいです tout seul peut aussi vouloir dire « non merci »."
   }
  ],
  "4": [
   {
    "chunk": "3,190円になります",
    "role": "« Ça fait 3 190 yens. » — l'annonce du prix à la caisse.",
    "tip": "になります est la façon polie des caissiers d'annoncer un total. Tu l'entendras à chaque passage en caisse."
   },
   {
    "chunk": "お支払いは",
    "role": "« Pour le paiement… »",
    "tip": "支払い (shiharai) = paiement. 払う (harau) = payer. Le mot revient sur tous les écrans de caisse."
   },
   {
    "chunk": "どうされますか",
    "role": "« Comment souhaitez-vous faire ? »",
    "tip": "Version polie de どうしますか. Réponds par le moyen : 現金で (genkin de) = en liquide, カードで = par carte."
   }
  ],
  "5": [
   {
    "chunk": "ICカードで",
    "role": "« Avec ma carte IC. » — les cartes de transport rechargeables comme ICOCA ou Suica.",
    "tip": "で = avec (le moyen). À Kyoto, la carte ICOCA sert pour le bus, le métro et même au konbini."
   },
   {
    "chunk": "払えますか",
    "role": "« Est-ce que je peux payer ? »",
    "tip": "払う = payer → 払える = pouvoir payer. カードで払えますか ? = je peux payer par carte ? Question vitale au Japon, où le liquide reste courant."
   }
  ],
  "6": [
   {
    "chunk": "ICカードで乗れますよ",
    "role": "« Vous pouvez prendre le train avec la carte IC. »",
    "tip": "Les cartes IC (ICOCA à Kyoto, Suica à Tokyo) marchent dans presque tous les trains et bus. 乗れます = on peut monter. Le よ final = « je vous rassure, c'est bon »."
   },
   {
    "chunk": "改札",
    "role": "« Le portique d'entrée » — là où tu passes ta carte.",
    "tip": "改札 (kaisatsu) = les tourniquets des gares. Repère le mot sur les panneaux : 改札口 = sortie par les portiques, 中央改札 = portiques centraux."
   },
   {
    "chunk": "タッチしてください",
    "role": "« Passez la carte (touchez) s'il vous plaît. »",
    "tip": "タッチ = de l'anglais « touch ». 〜てください = la façon polie de demander de faire quelque chose. Tu l'entendras partout : 見てください (regardez), 待ってください (attendez)."
   }
  ],
  "7": [
   {
    "chunk": "すみません",
    "role": "« Excusez-moi. » — pour attirer l'attention avant de poser ta question.",
    "tip": "Commence toujours par すみません quand tu abordes un inconnu ou un agent de gare."
   },
   {
    "chunk": "何番線ですか",
    "role": "« C'est quel quai ? »",
    "tip": "Question courte et efficace. Avec ta destination : 大阪行きは何番線ですか ? = le train pour Osaka, c'est quel quai ?"
   },
   {
    "chunk": "教えてもらえますか",
    "role": "« Pourriez-vous me le dire ? »",
    "tip": "Ta formule de demande de service passe-partout. Ajoutée à n'importe quelle question, elle la rend douce et polie."
   }
  ]
 },
 "bus-metro": {
  "0": [
   {
    "chunk": "どちらまで",
    "role": "« Jusqu'où allez-vous ? »",
    "tip": "La question classique du chauffeur ou d'un passant serviable. Réponds juste : lieu + まで. 金閣寺まで = jusqu'au Kinkaku-ji."
   }
  ],
  "1": [
   {
    "chunk": "金閣寺まで行きたいんですが",
    "role": "« Je voudrais aller au Kinkaku-ji… » — tu poses ton contexte avant la question.",
    "tip": "行きたい = vouloir aller. んですが laisse la phrase ouverte et invite l'autre à t'aider. Modèle à réutiliser : 駅に行きたいんですが…"
   },
   {
    "chunk": "どのバスに乗れば",
    "role": "« Si je prends quel bus… »",
    "tip": "どの = quel (parmi plusieurs). 乗れば = si je monte. Avec la suite, ça donne « quel bus dois-je prendre ? »."
   },
   {
    "chunk": "いいですか",
    "role": "« …ce serait bien ? » — termine une demande de conseil.",
    "tip": "Verbe en ば + いいですか = « que dois-je faire ? ». どうすればいいですか ? = qu'est-ce que je dois faire ? Phrase en or pour demander de l'aide."
   }
  ],
  "2": [
   {
    "chunk": "205番のバス",
    "role": "« Le bus numéro 205. »",
    "tip": "番 (ban) = numéro. Le bus 205 de Kyoto passe vraiment par le Kinkaku-ji : retiens-le !"
   },
   {
    "chunk": "乗ってください",
    "role": "« Montez dedans. »",
    "tip": "乗る = monter dans un transport. Forme て + ください = consigne polie."
   },
   {
    "chunk": "終点で降りてください",
    "role": "« Descendez au terminus. »",
    "tip": "終点 (shuuten) = terminus. 降りる (oriru) = descendre. で = l'endroit où l'action se passe. 次で降ります = je descends au prochain arrêt."
   }
  ],
  "3": [
   {
    "chunk": "バス停",
    "role": "« L'arrêt de bus. »",
    "tip": "バス + 停 (arrêt). Autres lieux utiles : 駅 (eki) = gare, 地下鉄 (chikatetsu) = métro."
   },
   {
    "chunk": "はどこですか",
    "role": "« Où est… ? »",
    "tip": "La question de survie : X はどこですか ? トイレはどこですか ? = où sont les toilettes ?"
   }
  ],
  "4": [
   {
    "chunk": "このバスは",
    "role": "« Ce bus… »",
    "tip": "この + nom = ce/cet. この電車 = ce train. Pratique pour pointer ce qui est devant toi."
   },
   {
    "chunk": "金閣寺に止まりますか",
    "role": "« S'arrête-t-il au Kinkaku-ji ? »",
    "tip": "止まる (tomaru) = s'arrêter. に indique l'endroit. Question idéale à poser au chauffeur avant de monter."
   }
  ],
  "5": [
   {
    "chunk": "私も",
    "role": "« Moi aussi. »",
    "tip": "も = aussi. 私も行きます = moi aussi j'y vais. Ça crée tout de suite un lien avec l'autre personne."
   },
   {
    "chunk": "金閣寺に行きます",
    "role": "« Je vais au Kinkaku-ji. »",
    "tip": "Lieu + に行きます = aller à. 大学に行きます = je vais à l'université."
   },
   {
    "chunk": "一緒に確認しましょうか",
    "role": "« On vérifie ensemble ? » — une proposition chaleureuse.",
    "tip": "一緒に (issho ni) = ensemble. ましょうか = « et si on… ? ». 一緒に行きましょうか ? = et si on y allait ensemble ?"
   }
  ],
  "6": [
   {
    "chunk": "次は",
    "role": "« Prochain arrêt… » — l'annonce automatique du bus.",
    "tip": "次 (tsugi) = prochain. Écoute bien ce mot dans les annonces : le nom de l'arrêt vient juste après."
   },
   {
    "chunk": "金閣寺前",
    "role": "« Kinkaku-ji-mae » — l'arrêt devant le temple.",
    "tip": "前 (mae) = devant. Beaucoup d'arrêts s'appellent « lieu + 前 » : 京都駅前 = devant la gare de Kyoto."
   }
  ],
  "7": [
   {
    "chunk": "降ります",
    "role": "« Je descends ! »",
    "tip": "降りる (oriru) = descendre. Dans un bus bondé, dis-le fort pour qu'on te laisse passer. Le contraire : 乗ります = je monte."
   },
   {
    "chunk": "すみません",
    "role": "« Pardon. » — pour te frayer un chemin.",
    "tip": "Ici すみません veut dire « pardon, je passe ». Un mot, trois usages : excuse, attention, merci."
   }
  ]
 },
 "chemin": {
  "0": [
   {
    "chunk": "すみません",
    "role": "« Excusez-moi » — pour aborder poliment un inconnu dans la rue.",
    "tip": "C'est TOUJOURS ton premier mot quand tu arrêtes quelqu'un. Sans lui, la question tombe trop brusquement."
   },
   {
    "chunk": "この近くに",
    "role": "« Près d'ici » — tu situes ta recherche autour de toi.",
    "tip": "近く = les environs. この近くに駅はありますか？ (kono chikaku ni eki wa arimasu ka) = il y a une gare près d'ici ? Change juste le lieu."
   },
   {
    "chunk": "コンビニはありますか",
    "role": "« Est-ce qu'il y a un konbini ? » — la question de base pour trouver n'importe quel endroit.",
    "tip": "Le moule à retenir : [lieu] はありますか？ トイレはありますか？ = il y a des toilettes ? ATMはありますか？ = il y a un distributeur ?"
   }
  ],
  "1": [
   {
    "chunk": "この道をまっすぐ行って",
    "role": "« Allez tout droit dans cette rue… » — la première étape de l'itinéraire.",
    "tip": "まっすぐ (massugu) = tout droit. C'est LE mot à reconnaître dans toute indication de chemin. Le 行って à la fin veut dire « …et ensuite », la suite arrive."
   },
   {
    "chunk": "交差点を右に曲がって",
    "role": "« Tournez à droite au carrefour. »",
    "tip": "右 (migi) = droite, 左 (hidari) = gauche. 曲がる = tourner. Retiens la paire 右に曲がる / 左に曲がる : tu l'entendras dans chaque indication."
   },
   {
    "chunk": "ください",
    "role": "« S'il vous plaît » — ici, c'est une indication polie, pas un ordre.",
    "tip": "Quand quelqu'un t'indique le chemin, toutes les étapes finissent souvent par ください. Pas besoin de tout comprendre : repère 右, 左, まっすぐ."
   }
  ],
  "2": [
   {
    "chunk": "ありがとうございます",
    "role": "« Merci » — tu remercies avant de poser ta question suivante.",
    "tip": "Remercier d'abord, puis demander : c'est très japonais, ça garde la conversation agréable."
   },
   {
    "chunk": "歩いて",
    "role": "« À pied » — tu précises ton moyen de transport.",
    "tip": "歩く = marcher. 歩いて = en marchant. 歩いて行けますか？ (aruite ikemasu ka) = on peut y aller à pied ? Super utile avant de prendre un taxi."
   },
   {
    "chunk": "何分くらいですか",
    "role": "« Environ combien de minutes ? »",
    "tip": "くらい = environ. Tu peux remplacer 分 (minutes) : 何時間くらい = environ combien d'heures. いくらくらい = environ combien ça coûte."
   }
  ],
  "3": [
   {
    "chunk": "歩いて5分くらいです",
    "role": "« Environ 5 minutes à pied. » — la réponse reprend exactement les mots de ta question.",
    "tip": "Astuce d'écoute : les Japonais répètent souvent ta question dans la réponse. Si tu as dit 歩いて何分, guette juste le chiffre qui remplace 何."
   },
   {
    "chunk": "セブン-イレブンです",
    "role": "« C'est un 7-Eleven. » — le nom du magasin, écrit en katakana.",
    "tip": "Les grandes chaînes s'écrivent en katakana : ローソン (Lawson), ファミリーマート (FamilyMart, souvent ファミマ). Dis-les à voix haute, tu les reconnaîtras."
   }
  ],
  "4": [
   {
    "chunk": "地図を",
    "role": "« Le plan / la carte » — ce que tu veux qu'on te montre.",
    "tip": "地図 (chizu) = carte, plan. Garde ton téléphone ouvert sur Google Maps et dis 地図で教えてもらえますか ? = vous pouvez me montrer sur le plan ?"
   },
   {
    "chunk": "見せてもらえますか",
    "role": "« Est-ce que vous pourriez me montrer ? » — une demande douce, qui laisse la personne libre.",
    "tip": "〜てもらえますか = « est-ce que je pourrais recevoir de vous le fait de… ». Plus doux que ください. 書いてもらえますか ? = vous pourriez me l'écrire ?"
   }
  ],
  "5": [
   {
    "chunk": "わかりましたか",
    "role": "« Vous avez compris ? » — la personne vérifie que son explication est passée.",
    "tip": "Réponds simplement はい、わかりました (oui, j'ai compris) — ou いいえ、もう一度お願いします (non, encore une fois svp) si ce n'est pas le cas. Pas de honte à redemander !"
   },
   {
    "chunk": "大丈夫ですか",
    "role": "« Ça va ? Tout est OK pour vous ? »",
    "tip": "大丈夫 revient partout : ici c'est « vous vous en sortez ? ». Réponse naturelle : 大丈夫です (ça va, merci)."
   }
  ],
  "6": [
   {
    "chunk": "はい、わかりました",
    "role": "« Oui, j'ai compris. » — tu rassures la personne.",
    "tip": "わかりました = j'ai compris (au passé, parce que c'est « devenu clair »). C'est aussi le « d'accord » poli qu'on dit au travail."
   },
   {
    "chunk": "本当にありがとうございます",
    "role": "« Merci vraiment beaucoup. » — tu renforces ton merci parce qu'on t'a consacré du temps.",
    "tip": "本当に (hontou ni) = vraiment. Tu peux le coller devant beaucoup de choses : 本当においしい = vraiment délicieux. Ici, il montre ta reconnaissance sincère."
   }
  ]
 },
 "supermarche": {
  "0": [
   {
    "chunk": "すみません",
    "role": "« Excusez-moi » — pour attirer l'attention d'un employé.",
    "tip": "Dans un supermarché, les employés sont très disponibles : un すみません suffit, ils viennent vers toi."
   },
   {
    "chunk": "お豆腐は",
    "role": "« Le tofu… » — tu annonces de quoi tu parles.",
    "tip": "Le お devant 豆腐 rend le mot plus doux et poli ; dans la vie courante, beaucoup disent お豆腐, surtout en cuisine. Mettre は après le produit = « concernant le tofu… »."
   },
   {
    "chunk": "どこにありますか",
    "role": "« Où est-ce que ça se trouve ? » — ta question passe-partout pour localiser un produit.",
    "tip": "Le moule : [produit] はどこにありますか？ 牛乳はどこにありますか？ = le lait, il est où ? Remplace juste le produit."
   }
  ],
  "1": [
   {
    "chunk": "冷蔵コーナー",
    "role": "« Le rayon frais » — l'endroit réfrigéré du magasin.",
    "tip": "冷蔵 (reizou) = réfrigéré, コーナー = coin/rayon (de l'anglais « corner »). Tu verras aussi 冷凍 (reitou) = surgelé — attention, ils se ressemblent !"
   },
   {
    "chunk": "3番通路",
    "role": "« L'allée numéro 3. »",
    "tip": "番 = numéro, 通路 = allée/couloir. Si tu ne comprends que le chiffre, c'est déjà gagné : cherche les panneaux numérotés en haut des rayons."
   },
   {
    "chunk": "にございます",
    "role": "« Ça se trouve à… » — version très polie de « c'est là ».",
    "tip": "ございます = la forme ultra-polie de あります, typique des employés. Tu n'as pas à la reproduire : reconnaître suffit."
   }
  ],
  "2": [
   {
    "chunk": "袋は",
    "role": "« Les sacs… » — tu poses la question sur les sacs.",
    "tip": "Au Japon, les sacs plastiques sont payants depuis 2020. À la caisse on te demandera souvent 袋はご利用ですか ? = vous voulez un sac ?"
   },
   {
    "chunk": "有料ですか",
    "role": "« C'est payant ? »",
    "tip": "有料 (yuuryou) = payant, 無料 (muryou) = gratuit. Couple de mots très utile : 無料Wi-Fi, 入場無料 (entrée gratuite)."
   }
  ],
  "3": [
   {
    "chunk": "レジは",
    "role": "« La caisse… » — le mot pour la caisse d'un magasin.",
    "tip": "レジ vient de l'anglais « register ». レジはどこですか ? = où est la caisse ? Un des premiers mots à savoir lire en katakana."
   },
   {
    "chunk": "こちらへどうぞ",
    "role": "« Par ici, je vous en prie. » — on t'invite à venir.",
    "tip": "Tu l'entendras partout : restaurant, magasin, hôtel. Souvent accompagné d'un geste de la main ouverte. Il suffit de suivre !"
   }
  ],
  "4": [
   {
    "chunk": "セルフレジ",
    "role": "« Caisse automatique » (self-checkout).",
    "tip": "セルフ (self) + レジ (caisse). Pratique quand tu débutes : pas besoin de parler, et beaucoup proposent l'anglais à l'écran."
   },
   {
    "chunk": "はありますか",
    "role": "« Est-ce qu'il y a… ? »",
    "tip": "Même moule que pour trouver un lieu : 〜はありますか ? Tu l'utilises pour tout : 英語のメニューはありますか ? = il y a un menu en anglais ?"
   }
  ],
  "5": [
   {
    "chunk": "お会計は",
    "role": "« Le total… » — la caissière annonce ce que tu dois.",
    "tip": "Même お会計 qu'au restaurant pour demander l'addition. Ici c'est l'employé qui le dit pour annoncer le montant."
   },
   {
    "chunk": "1,240円です",
    "role": "« Ça fait 1 240 yens. »",
    "tip": "Les prix se lisent par blocs : 千二百四十円 (sen ni-hyaku yon-juu en). Astuce : regarde l'écran de la caisse, le montant y est toujours affiché."
   }
  ],
  "6": [
   {
    "chunk": "ICカードで",
    "role": "« Avec ma carte IC » — la carte de transport rechargeable (Suica, ICOCA…).",
    "tip": "で = « avec / au moyen de ». カードで = par carte, 現金で (genkin de) = en liquide. À Kyoto, la carte s'appelle ICOCA, et elle marche aussi dans les konbini."
   },
   {
    "chunk": "払えますか",
    "role": "« Je peux payer ? » — tu demandes si c'est possible.",
    "tip": "払う = payer, 払える = pouvoir payer. Version encore plus simple qui marche aussi : カードは使えますか ? = on peut utiliser la carte ?"
   }
  ]
 },
 "shopping": {
  "0": [
   {
    "chunk": "いらっしゃいませ",
    "role": "« Bienvenue » — la formule d'accueil de tout commerce.",
    "tip": "Tu n'as pas besoin de répondre : un petit signe de tête suffit. Les vendeurs le disent à chaque client qui entre."
   },
   {
    "chunk": "何かお探しですか",
    "role": "« Vous cherchez quelque chose ? » — le vendeur propose son aide.",
    "tip": "何か = quelque chose. お探し = « votre recherche », version polie de 探す (chercher). Deux réponses à avoir prêtes : 見ているだけです (je regarde) ou 〜を探しています (je cherche…)."
   }
  ],
  "1": [
   {
    "chunk": "見ているだけです",
    "role": "« Je regarde juste. » — la phrase magique pour flâner tranquille.",
    "tip": "見ている = être en train de regarder, だけ = seulement. だけ est très utile : 一つだけ = un seul, 少しだけ = juste un peu."
   },
   {
    "chunk": "ありがとうございます",
    "role": "« Merci » — tu remercies le vendeur de sa proposition.",
    "tip": "Ajouter merci transforme un refus en geste aimable. Le vendeur te laissera tranquille avec le sourire."
   }
  ],
  "2": [
   {
    "chunk": "このTシャツは",
    "role": "« Ce T-shirt… » — le vendeur te montre un article.",
    "tip": "この = ce/cette (près de moi), その = ce… là (près de toi), あの = ce… là-bas. Le vendeur dit この parce qu'il tient le T-shirt."
   },
   {
    "chunk": "いかがですか",
    "role": "« Qu'en pensez-vous ? » — façon polie de proposer quelque chose.",
    "tip": "いかが = version polie de どう (comment). コーヒーはいかがですか ? = un café, ça vous dit ? Tu l'entendras partout dans les commerces."
   },
   {
    "chunk": "今セール中です",
    "role": "« C'est en solde en ce moment. »",
    "tip": "中 (chuu) collé à un mot = « en cours ». セール中 = soldes en cours, 営業中 = ouvert, 準備中 = en préparation (fermé). Regarde les pancartes sur les portes !"
   }
  ],
  "3": [
   {
    "chunk": "試着",
    "role": "« Essayer un vêtement. »",
    "tip": "試 = essayer, 着 = porter. Même 試 que dans 試飲 (dégustation d'une boisson) et 試食 (dégustation de nourriture). Un kanji, trois mots utiles !"
   },
   {
    "chunk": "できますか",
    "role": "« C'est possible ? » — ta question universelle.",
    "tip": "Nom + できますか = est-ce qu'on peut faire ça ? 予約できますか ? = on peut réserver ? 免税できますか ? = c'est possible en détaxe ?"
   }
  ],
  "4": [
   {
    "chunk": "試着室はあちらです",
    "role": "« La cabine d'essayage est là-bas. »",
    "tip": "試着室 = salle (室) pour essayer. あちら = là-bas (version polie de あそこ). Le vendeur montre souvent du doigt ou de la main : suis le geste."
   },
   {
    "chunk": "いくつ",
    "role": "« Combien (d'articles) ? »",
    "tip": "いくつ = combien de choses. À ne pas confondre avec いくら = combien ça coûte. Une seule lettre de différence, sens très différent !"
   },
   {
    "chunk": "お持ちしますか",
    "role": "« Vous en emportez combien ? » — le vendeur propose de porter les articles pour toi.",
    "tip": "持つ = porter/tenir. La forme お〜します, c'est le vendeur qui se met humblement à ton service. Pas besoin de la produire, juste la reconnaître."
   }
  ],
  "5": [
   {
    "chunk": "一枚",
    "role": "« Un » — pour compter un objet plat comme un vêtement.",
    "tip": "枚 (mai) sert à compter les choses plates : T-shirts, feuilles, billets, tickets. 一枚、二枚、三枚… Si tu oublies, 一つ marche aussi."
   },
   {
    "chunk": "だけです",
    "role": "« Seulement. » — tu précises que c'est juste un.",
    "tip": "Même だけ que dans 見ているだけ. 一枚だけです = un seul, c'est tout."
   }
  ],
  "6": [
   {
    "chunk": "少し大きいです",
    "role": "« C'est un peu grand. »",
    "tip": "少し (sukoshi) = un peu — adoucit la critique. Tu peux dire 少し小さいです (un peu petit), 少し高いです (un peu cher). Très japonais : on ne dit jamais que c'est « trop »."
   },
   {
    "chunk": "Mサイズはありますか",
    "role": "« Vous l'avez en taille M ? »",
    "tip": "Les tailles se disent comme en anglais : Sサイズ, Mサイズ, Lサイズ. Attention, les tailles japonaises taillent souvent plus petit qu'en France !"
   }
  ]
 },
 "urgence": {
  "0": [
   {
    "chunk": "財布を盗まれました",
    "role": "« On m'a volé mon portefeuille. » — tu expliques ce qui t'est arrivé.",
    "tip": "財布 (saifu) = portefeuille. 盗まれました = on me l'a volé (j'ai subi le vol). Mot à remplacer selon le cas : スマホを盗まれました = on m'a volé mon téléphone."
   },
   {
    "chunk": "警察に行きたいです",
    "role": "« Je veux aller à la police. »",
    "tip": "警察 (keisatsu) = police. 〜に行きたいです = je veux aller à… Au Japon, cherche le 交番 (kouban), le petit poste de police de quartier : il y en a presque partout."
   }
  ],
  "1": [
   {
    "chunk": "大丈夫ですか",
    "role": "« Ça va ? Vous allez bien ? » — la personne s'inquiète pour toi.",
    "tip": "Ici 大丈夫 veut dire « vous n'êtes pas blessé ? ». Tu peux répondre 大丈夫です (ça va) avant d'expliquer le problème."
   },
   {
    "chunk": "何がありましたか",
    "role": "« Que s'est-il passé ? »",
    "tip": "何が = quoi (comme sujet), ありました = il y a eu. Question standard de la police et des secours : prépare une phrase simple sur ce qui est arrivé."
   }
  ],
  "2": [
   {
    "chunk": "電車の中で",
    "role": "« Dans le train » — tu dis où ça s'est passé.",
    "tip": "の中で = à l'intérieur de. バスの中で = dans le bus, 駅で = à la gare. Le lieu d'abord, ça aide énormément les agents."
   },
   {
    "chunk": "かばんを失くしました",
    "role": "« J'ai perdu mon sac. »",
    "tip": "失くす (nakusu) = perdre un objet. Différent de 盗まれた (volé). Au Japon, les objets perdus sont très souvent rapportés : ne désespère pas !"
   },
   {
    "chunk": "遺失物センターはどこですか",
    "role": "« Où est le bureau des objets trouvés ? »",
    "tip": "遺失物 (ishitsubutsu) = objets perdus. Mot compliqué : en gare, tu peux aussi dire 忘れ物 (wasuremono) = objet oublié, plus courant à l'oral."
   }
  ],
  "3": [
   {
    "chunk": "大使館に",
    "role": "« À l'ambassade » — l'endroit à contacter.",
    "tip": "大使館 (taishikan) = ambassade. Pour un passeport perdu, c'est indispensable. Note le numéro de l'ambassade de France avant de partir !"
   },
   {
    "chunk": "連絡しましたか",
    "role": "« Vous avez contacté ? »",
    "tip": "連絡する (renraku suru) = contacter, prévenir. Très courant : 連絡します = je vous recontacte. Tu le verras dans tous les e-mails de l'université."
   }
  ],
  "4": [
   {
    "chunk": "いいえ、まだです",
    "role": "« Non, pas encore. »",
    "tip": "まだ = pas encore. Réponse ultra-pratique à toute question « vous avez déjà… ? ». もう食べましたか ? — いいえ、まだです = tu as déjà mangé ? — pas encore."
   },
   {
    "chunk": "フランス大使館の番号",
    "role": "« Le numéro de l'ambassade de France. »",
    "tip": "番号 (bangou) = numéro. の relie les mots comme « de » : 大使館の番号 = le numéro de l'ambassade. 電話番号 = numéro de téléphone."
   },
   {
    "chunk": "教えてもらえますか",
    "role": "« Vous pourriez me le donner / me l'indiquer ? »",
    "tip": "教える = enseigner, mais aussi « donner une information ». 名前を教えてもらえますか ? = vous pourriez me dire votre nom ? Formule douce, parfaite pour demander de l'aide."
   }
  ]
 },
 "bibliotheque": {
  "0": [
   {
    "chunk": "いらっしゃいませ",
    "role": "« Bonjour / bienvenue » — l'accueil au comptoir.",
    "tip": "Même formule qu'en magasin : tu n'as pas à répondre, un petit こんにちは ou un signe de tête suffit."
   },
   {
    "chunk": "学生証を",
    "role": "« Ta carte étudiante » — ce qu'on te demande.",
    "tip": "学生証 (gakuseishou) = carte étudiante (学生 = étudiant, 証 = preuve). Garde-la toujours sur toi à l'université : bibliothèque, cantine, réductions."
   },
   {
    "chunk": "見せてください",
    "role": "« Montrez-moi, s'il vous plaît. »",
    "tip": "見せる = montrer. 見せてください = montrez-moi svp. Tu entendras aussi パスポートを見せてください à l'hôtel ou à la mairie."
   }
  ],
  "1": [
   {
    "chunk": "はい、どうぞ",
    "role": "« Oui, voilà. » — en tendant ta carte.",
    "tip": "どうぞ quand tu donnes quelque chose = « tenez ». Petit plus de politesse : tends l'objet avec les deux mains."
   },
   {
    "chunk": "留学生ですが",
    "role": "« Je suis étudiant(e) étranger(e), mais… » — tu poses le contexte avant ta question.",
    "tip": "留学生 (ryuugakusei) = étudiant venu de l'étranger. Le が à la fin annonce « …et j'ai une question ». Pratique pour introduire n'importe quelle demande."
   },
   {
    "chunk": "利用できますか",
    "role": "« Je peux l'utiliser ? »",
    "tip": "利用 (riyou) = utilisation d'un service. Tu verras 利用 sur tous les panneaux : 利用時間 = horaires d'ouverture, ご利用ください = utilisez-le librement."
   }
  ],
  "2": [
   {
    "chunk": "留学生の方も",
    "role": "« Les étudiants étrangers aussi… » — 方 (kata) est la façon polie de dire « personne ».",
    "tip": "留学生 (ryuugakusei) = étudiant étranger, c'est toi ! Tu entendras ce mot tout le temps à l'université. 方 = personne (poli) : あの方 = cette personne-là."
   },
   {
    "chunk": "利用できますよ",
    "role": "« Vous pouvez l'utiliser. »",
    "tip": "利用 (riyou) = utilisation d'un service. 利用できます = c'est accessible pour vous. Tu le liras sur les règlements : 利用時間 = horaires d'ouverture."
   },
   {
    "chunk": "何かお探しですか",
    "role": "« Vous cherchez quelque chose ? » — l'offre d'aide classique.",
    "tip": "何か (nanika) = quelque chose. お探しですか = vous cherchez (version polie). Tu l'entendras aussi dans toutes les boutiques."
   }
  ],
  "3": [
   {
    "chunk": "この本を借りたいんですが",
    "role": "« Je voudrais emprunter ce livre… » — on explique sa situation avant de demander.",
    "tip": "借りる = emprunter (≠ 貸す = prêter). たい = je veux. Le んですが final dit « …alors, j'aurais besoin de votre aide »."
   },
   {
    "chunk": "どうすればいいですか",
    "role": "« Comment je dois faire ? »",
    "tip": "Phrase d'or quand tu es perdu : どうすればいいですか ? = qu'est-ce que je dois faire ? Marche à la mairie, à la banque, à la gare…"
   }
  ],
  "4": [
   {
    "chunk": "学生証を見せてください",
    "role": "« Montrez votre carte étudiante. »",
    "tip": "学生証 (gakuseishou) = carte étudiante. 見せる = montrer. 見せてください = montrez-moi. Très utile dans l'autre sens : メニューを見せてください = montrez-moi le menu."
   },
   {
    "chunk": "貸出期間は二週間です",
    "role": "« La durée de prêt est de deux semaines. »",
    "tip": "貸出 (kashidashi) = prêt, du verbe 貸す (prêter). 期間 = durée. 二週間 (nishuukan) = deux semaines. Toi tu 借りる (empruntes), la bibliothèque 貸す (prête)."
   },
   {
    "chunk": "ここは自習室",
    "role": "« Ici, c'est une salle d'étude. »",
    "tip": "自習 (jishuu) = étudier seul. 室 = salle (comme dans 試着室, 教室 = salle de classe). Repère 室 : ça veut toujours dire une pièce."
   },
   {
    "chunk": "お静かにお願いします",
    "role": "« Merci de rester silencieux. »",
    "tip": "静か (shizuka) = calme. お静かにお願いします = version très polie de « silence svp ». Tu verras 静かに sur les panneaux des trains et bibliothèques."
   }
  ],
  "5": [
   {
    "chunk": "すみません",
    "role": "« Pardon. » — tu t'excuses d'avoir fait du bruit.",
    "tip": "Ici すみません = désolé(e). Un seul mot, plusieurs usages : excusez-moi, pardon, merci pour la peine. Chuchote-le avec un petit hochement de tête."
   },
   {
    "chunk": "グループ学習ができる部屋",
    "role": "« Une salle où on peut travailler en groupe. »",
    "tip": "Tout ce qui est avant 部屋 (pièce) décrit la pièce : できる部屋 = la pièce où on peut. Pareil en français mais à l'envers : 日本語が話せる人 = une personne qui parle japonais."
   },
   {
    "chunk": "はありますか",
    "role": "« Est-ce qu'il y en a ? »",
    "tip": "Toujours le même moule 〜はありますか. Tu l'as déjà vu pour les konbini, les sacs, les caisses : c'est une des phrases les plus rentables du japonais."
   }
  ]
 },
 "professeur": {
  "0": [
   {
    "chunk": "先生",
    "role": "\"Professeur\" — c'est comme ça qu'on appelle un prof en face, sans son nom.",
    "tip": "Au Japon, on dit 先生 (sensei) directement, comme \"Monsieur/Madame\" en français. Ça marche aussi pour les médecins. Tu peux ajouter le nom devant : 田中先生 (Tanaka-sensei)."
   },
   {
    "chunk": "少しよろしいですか",
    "role": "\"Vous avez un petit moment ?\" — la façon polie d'interrompre quelqu'un.",
    "tip": "Littéralement \"est-ce que c'est bien un peu ?\". Parfait pour aborder un prof après le cours, un collègue, un employé. Version plus courte et un peu moins formelle : ちょっといいですか (chotto ii desu ka)."
   },
   {
    "chunk": "質問があります",
    "role": "\"J'ai une question.\" — tu annonces ce que tu veux avant de le dire.",
    "tip": "質問 (shitsumon) = question. があります = il y a / j'ai. Même structure pour plein de choses : お願いがあります = j'ai un service à vous demander."
   }
  ],
  "1": [
   {
    "chunk": "はい、どうぞ",
    "role": "\"Oui, allez-y.\" — le prof t'invite à parler.",
    "tip": "どうぞ = allez-y, je t'en prie. Tu l'as déjà vu au restaurant : c'est le même mot pour inviter quelqu'un à entrer, à se servir ou à parler."
   },
   {
    "chunk": "何ですか",
    "role": "\"C'est quoi ?\" — question simple et ouverte.",
    "tip": "何 (nan) = quoi. ですか = la question polie. Ici, ce n'est pas brusque : le prof te demande juste quelle est ta question."
   }
  ],
  "2": [
   {
    "chunk": "今日の授業のこの部分が",
    "role": "\"Cette partie du cours d'aujourd'hui...\" — tu montres précisément de quoi tu parles.",
    "tip": "の relie les mots comme \"de\" en français, mais à l'envers : 今日の授業 = le cours d'aujourd'hui. この部分 = cette partie. Pointe ton cahier en le disant, c'est très naturel."
   },
   {
    "chunk": "理解できませんでした",
    "role": "\"Je n'ai pas compris.\" — dit poliment, au passé.",
    "tip": "理解 (rikai) = compréhension, できる = pouvoir. Donc \"je n'ai pas pu comprendre\". Version plus simple et tout aussi correcte : わかりませんでした (wakarimasen deshita)."
   },
   {
    "chunk": "もう少し説明してもらえますか",
    "role": "\"Pourriez-vous m'expliquer un peu plus ?\" — une demande douce de service.",
    "tip": "もう少し = un peu plus. 〜してもらえますか = est-ce que je pourrais recevoir le fait que vous fassiez X. C'est LA formule pour demander un service poliment : ゆっくり話してもらえますか = pourriez-vous parler lentement ?"
   }
  ],
  "3": [
   {
    "chunk": "レポートの締め切りは",
    "role": "\"La date limite du rapport...\" — on annonce le sujet de la phrase.",
    "tip": "締め切り (shimekiri) = date limite, deadline. Mot ultra-important à la fac japonaise ! Tu le verras partout sur les emplois du temps et les mails des profs."
   },
   {
    "chunk": "来週の金曜日です",
    "role": "\"C'est vendredi prochain.\"",
    "tip": "来週 (raishuu) = la semaine prochaine. 金曜日 (kin'youbi) = vendredi. Le reste : 今週 = cette semaine, 先週 = la semaine dernière."
   },
   {
    "chunk": "覚えていますか",
    "role": "\"Vous vous en souvenez ?\" — le prof vérifie que tu as l'info.",
    "tip": "覚える = mémoriser. 覚えています = je l'ai en mémoire (ça reste). Attention : pour \"je me souviens\", on dit 覚えています, pas 覚えます (qui veut dire \"je vais l'apprendre par cœur\")."
   }
  ],
  "4": [
   {
    "chunk": "はい、覚えています",
    "role": "\"Oui, je m'en souviens.\" — tu reprends le verbe de la question.",
    "tip": "En japonais, pour répondre oui, on répète souvent le verbe de la question au lieu de dire juste はい. 行きますか ? → はい、行きます. C'est plus clair et plus naturel."
   },
   {
    "chunk": "テーマは",
    "role": "\"Le sujet...\" — tu changes de point.",
    "tip": "テーマ vient de l'allemand \"Thema\" — un mot étranger écrit en katakana. Il veut dire le sujet d'un travail ou d'un exposé."
   },
   {
    "chunk": "まだ変えられますか",
    "role": "\"On peut encore le changer ?\" — tu demandes si c'est encore possible.",
    "tip": "まだ = encore. 変える = changer, 変えられる = pouvoir changer. Avec まだ : まだ間に合いますか = c'est encore à temps ? Très utile pour les démarches administratives."
   }
  ]
 },
 "club-etudiant": {
  "0": [
   {
    "chunk": "はじめまして",
    "role": "\"Enchanté(e).\" — on ne le dit qu'une seule fois : à la toute première rencontre.",
    "tip": "Littéralement \"c'est la première fois\". Dès que tu revois la personne, tu passes à こんにちは. Il est souvent suivi de よろしくお願いします."
   },
   {
    "chunk": "サークルに興味がありますか",
    "role": "\"Le club t'intéresse ?\" — la question de recrutement classique des clubs étudiants.",
    "tip": "サークル (vient de \"circle\") = club étudiant détendu. 部活 = club plus sérieux. 〜に興味があります = je m'intéresse à... : 日本の文化に興味があります = je m'intéresse à la culture japonaise."
   }
  ],
  "1": [
   {
    "chunk": "はじめまして",
    "role": "\"Enchanté(e).\" — tu renvoies la même formule.",
    "tip": "Au Japon, on répond à une salutation par la même salutation. Simple et toujours correct."
   },
   {
    "chunk": "バドミントンサークルを",
    "role": "\"Un club de badminton\" — deux mots étrangers collés.",
    "tip": "Les mots en katakana se collent facilement : テニスサークル, 料理サークル (cuisine). Tu peux construire le nom de n'importe quel club comme ça."
   },
   {
    "chunk": "探していました",
    "role": "\"Je cherchais (justement).\" — tu montres que tu cherchais depuis un moment.",
    "tip": "探しています = je cherche (maintenant). 探していました = je cherchais (jusqu'à maintenant). Ça donne l'idée de \"ça tombe bien, je cherchais justement ça !\""
   }
  ],
  "2": [
   {
    "chunk": "経験はありますか",
    "role": "\"Tu as de l'expérience ?\"",
    "tip": "経験 (keiken) = expérience. Même structure que 質問があります : nom + があります = j'ai. Tu l'entendras aussi en entretien de stage."
   },
   {
    "chunk": "初心者でも大丈夫ですよ",
    "role": "\"Même les débutants, c'est OK !\" — on te rassure.",
    "tip": "初心者 (shoshinsha) = débutant. でも = même. 大丈夫 = pas de problème. Tu verras le symbole 初心者マーク sur les voitures des jeunes conducteurs au Japon (la feuille verte et jaune)."
   }
  ],
  "3": [
   {
    "chunk": "少しあります",
    "role": "\"Un peu.\" — une réponse modeste, très appréciée au Japon.",
    "tip": "Les Japonais restent modestes sur leurs compétences. Même si tu es bon(ne), 少し (un peu) sonne mieux que \"oui, beaucoup\"."
   },
   {
    "chunk": "フランスで",
    "role": "\"En France\" — で dit où l'action se passait.",
    "tip": "で = le lieu où on fait quelque chose. 大学で勉強します = j'étudie à la fac. Ne confonds pas avec に, qui dit où on va ou où on est."
   },
   {
    "chunk": "２年くらいやっていました",
    "role": "\"J'en ai fait pendant environ 2 ans.\"",
    "tip": "くらい = environ. やる = faire (familier, très utilisé pour le sport). やっていました = j'en faisais (pendant une période). 3時間くらい = environ 3 heures."
   }
  ],
  "4": [
   {
    "chunk": "練習は週に2回",
    "role": "\"Les entraînements, c'est deux fois par semaine.\"",
    "tip": "週に = par semaine. 回 (kai) = fois. 週に3回 = trois fois par semaine, 月に1回 = une fois par mois. Super pratique pour parler de tes habitudes."
   },
   {
    "chunk": "火曜日と木曜日の",
    "role": "\"Le mardi et le jeudi\" — と relie deux choses, comme \"et\".",
    "tip": "と = et (pour relier des noms seulement). 火曜日 = mardi (jour du feu), 木曜日 = jeudi (jour du bois). Les jours suivent les éléments : 月 lune, 火 feu, 水 eau, 木 bois, 金 or, 土 terre, 日 soleil."
   },
   {
    "chunk": "夕方6時からです",
    "role": "\"À partir de 18h.\" — から = à partir de.",
    "tip": "夕方 (yuugata) = fin d'après-midi / début de soirée. Les Japonais disent souvent 6時 avec 夕方 plutôt que 18時 à l'oral. から = depuis / à partir de : 9時から5時まで = de 9h à 17h."
   }
  ],
  "5": [
   {
    "chunk": "ぜひ参加したいです",
    "role": "\"Je veux vraiment participer !\" — tu montres ton enthousiasme.",
    "tip": "ぜひ (zehi) = absolument, avec plaisir. Il se met devant un \"je veux\" : ぜひ行きたいです = j'aimerais vraiment y aller. 参加 (sanka) = participation."
   },
   {
    "chunk": "入部費はありますか",
    "role": "\"Il y a des frais d'inscription ?\" — la question pratique.",
    "tip": "費 (hi) = frais. 入部費 = frais pour entrer dans un club. Tu verras 費 souvent : 交通費 = frais de transport, 会費 = cotisation."
   }
  ],
  "6": [
   {
    "chunk": "LINEを交換しませんか",
    "role": "\"On échange nos LINE ?\" — une invitation douce.",
    "tip": "LINE est LA messagerie au Japon (comme WhatsApp chez nous). 〜しませんか = \"tu ne veux pas... ?\" — c'est la façon polie de proposer quelque chose. 一緒に食べませんか = on mange ensemble ?"
   },
   {
    "chunk": "練習の連絡をします",
    "role": "\"Je te préviendrai pour les entraînements.\"",
    "tip": "連絡 (renraku) = contact, message, nouvelle. 連絡します = je te contacte / je te tiens au courant. Mot très fréquent : 連絡ください = contacte-moi."
   }
  ],
  "7": [
   {
    "chunk": "もちろんです",
    "role": "\"Bien sûr !\" — un oui franc et chaleureux.",
    "tip": "もちろん (mochiron) = bien sûr. Avec です c'est poli ; entre amis, もちろん tout seul suffit."
   },
   {
    "chunk": "はい、どうぞ",
    "role": "\"Tiens, voilà.\" — en tendant ton téléphone avec le QR code.",
    "tip": "Quand tu donnes quelque chose à quelqu'un, はい、どうぞ est le réflexe. On l'accompagne d'un geste à deux mains si c'est un peu formel."
   }
  ]
 },
 "coloc": {
  "0": [
   {
    "chunk": "新しいルームメートですか",
    "role": "\"Tu es le/la nouveau(elle) coloc ?\"",
    "tip": "新しい (atarashii) = nouveau. ルームメート = de l'anglais \"roommate\". あ au début montre la surprise : \"ah !\""
   },
   {
    "chunk": "はじめまして",
    "role": "\"Enchanté(e).\" — uniquement à la première rencontre.",
    "tip": "Tu ne le diras qu'une fois à ton coloc. Ensuite ce sera おはよう le matin, ただいま quand tu rentres."
   }
  ],
  "1": [
   {
    "chunk": "サンドリーヌです",
    "role": "\"Je suis Sandrine.\" — ton prénom + です, c'est tout.",
    "tip": "Pas besoin de 私は devant : en japonais on enlève ce qui est évident. Ton prénom s'écrit en katakana parce qu'il est étranger."
   },
   {
    "chunk": "よろしくお願いします",
    "role": "\"Ravie de faire ta connaissance / je compte sur toi.\" — la formule qui scelle une nouvelle relation.",
    "tip": "Intraduisible mot à mot : ça veut dire \"je vous prie de bien me traiter\". Tu la dis à chaque nouvelle rencontre, en début de collaboration, en rejoignant un club. Entre amis : よろしく tout court."
   }
  ],
  "2": [
   {
    "chunk": "ゴミ出しのルールについて",
    "role": "\"À propos des règles pour sortir les poubelles.\"",
    "tip": "ゴミ = déchets. ゴミ出し = sortir les poubelles. 〜について = au sujet de : 日本について話しましょう = parlons du Japon. Au Japon, les poubelles sont un vrai sujet : jours et sacs différents selon le type !"
   },
   {
    "chunk": "話していいですか",
    "role": "\"Je peux te parler de... ?\" — on demande la permission.",
    "tip": "〜ていいですか = est-ce que je peux... ? Formule clé : 写真を撮っていいですか = je peux prendre une photo ? 座っていいですか = je peux m'asseoir ?"
   }
  ],
  "3": [
   {
    "chunk": "教えてください",
    "role": "\"Explique-moi, s'il te plaît.\"",
    "tip": "教える = enseigner, expliquer, donner une info. 教えてください = dis-moi / apprends-moi. Marche aussi pour demander un numéro : 電話番号を教えてください."
   },
   {
    "chunk": "日本のゴミ分別は",
    "role": "\"Le tri des déchets au Japon...\"",
    "tip": "分別 (bunbetsu) = tri. Tu verras ce mot sur toutes les poubelles : 燃えるゴミ (qui brûle), 燃えないゴミ (qui ne brûle pas), 資源ゴミ (recyclable)."
   },
   {
    "chunk": "複雑ですよね",
    "role": "\"C'est compliqué, hein ?\" — tu cherches l'approbation de l'autre.",
    "tip": "複雑 (fukuzatsu) = compliqué. よね à la fin = \"n'est-ce pas ?\", tu attends que l'autre soit d'accord. Ça crée de la complicité : おいしいですよね = c'est bon, hein ?"
   }
  ],
  "4": [
   {
    "chunk": "お風呂は",
    "role": "\"Pour le bain...\" — on annonce le sujet.",
    "tip": "お風呂 (ofuro) = le bain. Au Japon, le bain est un moment à part — souvent l'eau est partagée, d'où les règles d'horaires en coloc."
   },
   {
    "chunk": "夜9時以降に",
    "role": "\"Après 21h.\"",
    "tip": "以降 (ikou) = à partir de / après. 以前 = avant. Tu verras 以降 sur les panneaux d'horaires : 10時以降 = à partir de 10h."
   },
   {
    "chunk": "お願いします",
    "role": "\"S'il te plaît.\" — ici ça transforme la phrase en demande polie.",
    "tip": "Un simple お願いします à la fin suffit pour faire d'une info une requête. 静かにお願いします = du calme, s'il vous plaît."
   }
  ],
  "5": [
   {
    "chunk": "わかりました",
    "role": "\"D'accord, compris.\" — la réponse naturelle à une consigne.",
    "tip": "わかる = comprendre. わかりました = c'est noté. Plus simple que かしこまりました (réservé aux commerces). Entre amis : わかった !"
   },
   {
    "chunk": "他にルールはありますか",
    "role": "\"Il y a d'autres règles ?\" — tu montres que tu veux bien faire.",
    "tip": "他に (hoka ni) = d'autre, en plus. 他に質問はありますか = d'autres questions ? Montrer que tu respectes les règles, c'est très apprécié dans une coloc japonaise."
   }
  ]
 },
 "premiere-rencontre": {
  "0": [
   {
    "chunk": "あの、すみません",
    "role": "\"Euh, excusez-moi...\" — la façon douce d'aborder un inconnu.",
    "tip": "あの = \"euh\", une petite hésitation polie qui annonce qu'on va parler. あの、すみません est la façon la plus naturelle d'interpeller quelqu'un dans la rue."
   },
   {
    "chunk": "日本語を勉強していますか",
    "role": "\"Vous étudiez le japonais ?\"",
    "tip": "勉強する = étudier. 勉強しています = j'étudie (en ce moment, en général). C'est la forme à utiliser pour parler de tes études en cours."
   }
  ],
  "1": [
   {
    "chunk": "まだ勉強中ですが",
    "role": "\"J'apprends encore, mais...\" — une modestie qui ouvre la porte.",
    "tip": "まだ = encore. 勉強中 = en cours d'apprentissage (中 = en train de). が = mais, qui annonce la suite. Les Japonais adorent cette humilité."
   },
   {
    "chunk": "話せるようになりたいです",
    "role": "\"J'aimerais arriver à parler.\" — tu parles de ton objectif.",
    "tip": "話せる = pouvoir parler. 〜ようになりたい = vouloir devenir capable de. Structure parfaite pour tes objectifs : 漢字が読めるようになりたい = je veux arriver à lire les kanji."
   }
  ],
  "2": [
   {
    "chunk": "すごい",
    "role": "\"Impressionnant !\" — l'exclamation réflexe.",
    "tip": "Tu entendras すごい à chaque fois que tu dis que tu apprends le japonais. Ne le prends pas trop au sérieux — c'est un encouragement."
   },
   {
    "chunk": "どのくらい勉強しましたか",
    "role": "\"Tu as étudié combien de temps ?\"",
    "tip": "どのくらい = combien (de temps, de distance, de quantité). どのくらいかかりますか = ça prend combien de temps ? Très utile en voyage."
   }
  ],
  "3": [
   {
    "chunk": "6ヶ月くらいです",
    "role": "\"Environ 6 mois.\"",
    "tip": "ヶ月 (kagetsu) = mois quand on compte une durée. くらい = environ. 1ヶ月 = un mois, 1年 = un an."
   },
   {
    "chunk": "でも",
    "role": "\"Mais...\" — en début de phrase.",
    "tip": "でも en début de phrase = mais. Tu l'utiliseras tout le temps pour nuancer : でも、楽しいです = mais c'est sympa."
   },
   {
    "chunk": "毎日少しずつやっています",
    "role": "\"Je fais un peu chaque jour.\" — tu montres ta régularité.",
    "tip": "毎日 (mainichi) = chaque jour. 少しずつ = petit à petit. ずつ = à chaque fois la même quantité. C'est exactement ta méthode : la régularité !"
   }
  ],
  "4": [
   {
    "chunk": "お名前は",
    "role": "\"Votre nom...\" — お rend la question polie.",
    "tip": "On met お devant le nom de l'autre, jamais devant le sien. Pour toi tu dis 名前は ; pour l'autre, お名前は."
   },
   {
    "chunk": "何ですか",
    "role": "\"C'est quoi ?\" — donc \"comment vous appelez-vous ?\"",
    "tip": "お名前は何ですか est la question standard. Dans les formulaires, tu verras juste お名前 avec une case à remplir."
   }
  ],
  "5": [
   {
    "chunk": "サンドリーヌです",
    "role": "\"Je suis Sandrine.\"",
    "tip": "Prénom + です, c'est tout. Si tu veux être plus formelle : サンドリーヌと申します (je m'appelle Sandrine — version très polie, pour un entretien)."
   },
   {
    "chunk": "あなたのお名前は",
    "role": "\"Et vous, votre nom ?\" — tu renvoies la question.",
    "tip": "Attention : あなた (vous/tu) s'utilise peu en japonais, ça peut sonner direct. Ici ça passe parce que tu ne connais pas encore son nom. Dès que tu le connais, dis \"Tanaka-san\" au lieu de あなた."
   }
  ],
  "6": [
   {
    "chunk": "よろしくお願いします",
    "role": "\"Ravi(e) de te connaître.\" — la formule qui conclut les présentations.",
    "tip": "Après avoir échangé les prénoms, on dit toujours よろしくお願いします. Tu la renvoies de la même façon."
   },
   {
    "chunk": "LINEを交換しませんか",
    "role": "\"On échange nos LINE ?\" — la proposition d'amitié japonaise.",
    "tip": "〜しませんか = tu ne voudrais pas... ? C'est une invitation douce, qui laisse la liberté de refuser. Au Japon, on échange son LINE plus facilement que son numéro."
   }
  ],
  "7": [
   {
    "chunk": "もちろんです",
    "role": "\"Bien sûr !\"",
    "tip": "Réponse enthousiaste et polie. Entre amis : もちろん ! tout seul."
   },
   {
    "chunk": "よろしくお願いします",
    "role": "\"Ravie aussi !\" — tu renvoies la formule.",
    "tip": "Quand quelqu'un te dit よろしくお願いします, tu réponds par la même chose. Tu peux ajouter こちらこそ devant = \"c'est moi qui devrais le dire\"."
   }
  ]
 },
 "cafe": {
  "0": [
   {
    "chunk": "何を飲みますか",
    "role": "\"Qu'est-ce que tu bois ?\" — donc \"tu prends quoi ?\"",
    "tip": "飲む = boire. Au café, on demande ce que l'autre va boire avec le présent : le présent japonais sert aussi pour le futur proche."
   },
   {
    "chunk": "アイスコーヒーにします",
    "role": "\"Je prends un café glacé.\" — にします = je choisis ça.",
    "tip": "〜にします = je me décide pour... C'est LA formule pour commander ou choisir : これにします = je prends ça. ラーメンにします = je prends un ramen."
   }
  ],
  "1": [
   {
    "chunk": "私もアイスコーヒーにします",
    "role": "\"Moi aussi, je prends un café glacé.\"",
    "tip": "も = aussi, il remplace は : 私も = moi aussi. Facile à réutiliser : 私も行きます = moi aussi j'y vais."
   },
   {
    "chunk": "ここはよく来るんですか",
    "role": "\"Tu viens souvent ici ?\" — tu relances la conversation.",
    "tip": "よく = souvent. 来る = venir. んですか rend la question plus curieuse et personnelle, comme si tu voulais vraiment savoir. Parfait pour faire parler l'autre."
   }
  ],
  "2": [
   {
    "chunk": "最近どうですか",
    "role": "\"Comment ça va en ce moment ?\" — la question pour prendre des nouvelles.",
    "tip": "最近 (saikin) = ces derniers temps. どうですか = comment c'est ? Entre amis, on dit juste 最近どう ?"
   },
   {
    "chunk": "大学の勉強は",
    "role": "\"Les études à la fac...\"",
    "tip": "の relie les mots : 大学の勉強 = les études de la fac. 日本の食べ物 = la nourriture du Japon."
   },
   {
    "chunk": "大変ですか",
    "role": "\"C'est dur ?\"",
    "tip": "大変 (taihen) = difficile, épuisant. Il exprime aussi la compassion : 大変ですね = oh là là, c'est dur pour toi. Tu l'entendras tout le temps."
   }
  ],
  "3": [
   {
    "chunk": "まあまあです",
    "role": "\"Comme ci, comme ça.\" — une réponse modeste et naturelle.",
    "tip": "まあまあ = moyen, pas mal. Les Japonais répondent souvent comme ça, même quand ça va bien. C'est plus naturel que \"très bien\"."
   },
   {
    "chunk": "日本語の授業が一番大変ですが",
    "role": "\"Les cours de japonais sont les plus durs, mais...\"",
    "tip": "一番 (ichiban) = le plus, numéro un. 一番好き = ce que j'aime le plus. が en fin de morceau = mais, ça prépare la suite positive."
   },
   {
    "chunk": "楽しいです",
    "role": "\"C'est sympa / je m'amuse.\"",
    "tip": "楽しい (tanoshii) = amusant, agréable. Finir sur du positif après une difficulté, c'est très japonais : 大変ですが、楽しいです."
   }
  ],
  "4": [
   {
    "chunk": "日本の食べ物で",
    "role": "\"Parmi la nourriture japonaise...\" — で limite le choix.",
    "tip": "Ici で veut dire \"parmi\". 日本の食べ物で = dans la catégorie nourriture japonaise. Même chose : クラスで一番 = le premier de la classe."
   },
   {
    "chunk": "何が一番好きですか",
    "role": "\"Qu'est-ce que tu préfères ?\" — littéralement \"qu'aimes-tu le plus ?\"",
    "tip": "一番好き = préféré. Structure à retenir pour toutes les questions de préférences : どの季節が一番好きですか = quelle saison préfères-tu ?"
   }
  ],
  "5": [
   {
    "chunk": "ラーメンが大好きです",
    "role": "\"J'adore le ramen !\"",
    "tip": "大好き = adorer (大 = grand + 好き = aimer). L'objet aimé se marque avec が, pas を : 猫が好きです = j'aime les chats."
   },
   {
    "chunk": "特に味噌ラーメンが好きです",
    "role": "\"Surtout le ramen au miso.\"",
    "tip": "特に (toku ni) = surtout, en particulier. Pratique pour préciser : 特に京都が好きです = j'aime surtout Kyoto."
   },
   {
    "chunk": "〇〇さんは",
    "role": "\"Et toi ?\" — tu renvoies la question avec le prénom.",
    "tip": "En japonais, on évite de dire \"toi\" (あなた) : on utilise le prénom + さん, puis は avec une intonation montante = \"et toi ?\". Très naturel et chaleureux."
   }
  ],
  "6": [
   {
    "chunk": "今週末",
    "role": "\"Ce week-end.\"",
    "tip": "今 = maintenant / ce. 週末 = week-end. 今週 = cette semaine, 今日 = aujourd'hui, 今年 = cette année."
   },
   {
    "chunk": "花見に行きませんか",
    "role": "\"On va au hanami ?\" — une invitation douce.",
    "tip": "花見 (hanami) = regarder les fleurs de cerisier, en pique-nique. 〜に行きませんか = tu ne voudrais pas aller... ? Pour inviter quelqu'un : 映画に行きませんか = on va au cinéma ?"
   }
  ],
  "7": [
   {
    "chunk": "ぜひ行きたいです",
    "role": "\"J'aimerais vraiment y aller !\" — tu acceptes avec enthousiasme.",
    "tip": "ぜひ = absolument, avec plaisir. ぜひ + たい = je veux vraiment. Réponse idéale à une invitation."
   },
   {
    "chunk": "何時に、どこで",
    "role": "\"À quelle heure, et où ?\" — les deux infos pratiques.",
    "tip": "何時に = à quelle heure (に = moment précis). どこで = où (で = lieu de l'action). Remarque : on peut enchaîner deux questions juste avec une virgule."
   },
   {
    "chunk": "会いましょうか",
    "role": "\"On se retrouve ?\" — tu proposes de fixer ensemble.",
    "tip": "会う = se voir, se rencontrer. 〜ましょうか = et si on... ? C'est une proposition qui inclut l'autre : 行きましょうか = on y va ?"
   }
  ]
 },
 "soiree": {
  "0": [
   {
    "chunk": "来てくれてありがとう",
    "role": "« Merci d'être venu(e) ! » — la phrase d'accueil chaleureuse entre amis.",
    "tip": "来てくれて = « le fait que tu sois venu(e) pour moi ». くれる montre que tu as fait quelque chose de gentil pour la personne qui parle. Version polie à un supérieur : 来てくださってありがとうございます."
   },
   {
    "chunk": "飲み物",
    "role": "« Une boisson » — le mot générique pour tout ce qui se boit.",
    "tip": "飲む (boire) + もの (chose) = « chose à boire ». Même logique : 食べ物 (tabemono) = nourriture, « chose à manger ». Retiens le duo, il sert partout."
   },
   {
    "chunk": "もう持ってる？",
    "role": "« Tu as déjà ? » — question familière, sans です ni ます.",
    "tip": "もう = déjà. 持ってる = version parlée de 持っている (avoir sur soi). Entre amis, on laisse tomber les formes polies : c'est le signe que l'ambiance est détendue."
   }
  ],
  "1": [
   {
    "chunk": "まだです",
    "role": "« Pas encore. » — réponse courte et naturelle.",
    "tip": "まだ = pas encore / toujours. まだです suffit pour répondre « non, pas encore » à n'importe quelle question avec もう (déjà). Ex. : もう食べた？ — まだです。"
   },
   {
    "chunk": "何がありますか",
    "role": "« Qu'est-ce qu'il y a ? » — pour demander ce qui est disponible.",
    "tip": "何 (nani) = quoi. ありますか = est-ce qu'il y a ? Très pratique au resto, au bar, en boutique : 何がおすすめですか ? = qu'est-ce que vous recommandez ?"
   }
  ],
  "2": [
   {
    "chunk": "みんな",
    "role": "« Tout le monde ! » — pour s'adresser au groupe entier.",
    "tip": "みんな = tout le monde, version amicale. En contexte formel tu entendras みなさん (minasan), plus poli — comme au début d'un discours."
   },
   {
    "chunk": "自己紹介して",
    "role": "« Présentez-vous ! » — demande directe, ton de fête.",
    "tip": "自己 = soi-même, 紹介 = présentation. 自己紹介 = se présenter. Prépare la tienne à l'avance : au Japon, on te la demandera partout (cours, club, soirée, stage)."
   }
  ],
  "3": [
   {
    "chunk": "フランスから来た留学生",
    "role": "« L'étudiante en échange venue de France » — toute ta présentation tient dans ce bloc.",
    "tip": "En japonais, la description se place AVANT le nom : « venue-de-France étudiante » = フランスから来た留学生. 留学生 (ryuugakusei) = étudiant(e) étranger(ère). Mot clé de ton séjour à Kyoto !"
   },
   {
    "chunk": "サンドリーヌです",
    "role": "« Je suis Sandrine. »",
    "tip": "Les prénoms étrangers s'écrivent en katakana. Tu dis simplement ton nom + です. Pas besoin de « watashi wa » : on sait que tu parles de toi."
   },
   {
    "chunk": "日本語を勉強しています",
    "role": "« J'apprends le japonais » — en ce moment, c'est en cours.",
    "tip": "〜ています = action qui dure en ce moment. Cette phrase prévient les gens que tu es en train d'apprendre : ils parleront souvent plus lentement pour toi."
   },
   {
    "chunk": "よろしく",
    "role": "« Enchantée / ravie de faire votre connaissance » — version décontractée.",
    "tip": "よろしく termine toujours une présentation. Entre amis : よろしく. Poli : よろしくお願いします. Très formel (stage) : どうぞよろしくお願いいたします."
   }
  ],
  "4": [
   {
    "chunk": "乾杯",
    "role": "« Santé ! » — littéralement « vider la coupe ».",
    "tip": "On attend toujours que tout le monde ait son verre avant le 乾杯 — on ne boit jamais avant ! C'est le signal officiel que la soirée commence."
   },
   {
    "chunk": "しましょう",
    "role": "« Faisons… ! » — pour proposer de faire quelque chose ensemble.",
    "tip": "〜ましょう = « faisons ça ». 行きましょう = allons-y. 食べましょう = mangeons. Super simple et toujours poli."
   }
  ],
  "5": [
   {
    "chunk": "乾杯",
    "role": "« Santé ! » — tu réponds en levant ton verre.",
    "tip": "Lève ton verre et dis-le fort avec le groupe. Astuce de politesse : face à quelqu'un de plus âgé ou à un supérieur, tiens ton verre un peu plus bas que le sien quand vous trinquez."
   }
  ],
  "6": [
   {
    "chunk": "日本の印象",
    "role": "« Ton impression du Japon » — LA question qu'on te posera souvent.",
    "tip": "印象 (inshou) = impression. Prépare une réponse positive et concrète : c'est une question de politesse, la personne veut surtout t'entendre parler de ce que tu aimes."
   },
   {
    "chunk": "どうですか",
    "role": "« Comment c'est ? / Qu'en penses-tu ? »",
    "tip": "どうですか sert à demander un avis sur n'importe quoi : この料理はどうですか ? = comment tu trouves ce plat ? Et pour proposer : コーヒーはどうですか ? = un café, ça te dit ?"
   }
  ],
  "7": [
   {
    "chunk": "すごくいいです",
    "role": "« C'est vraiment super ! »",
    "tip": "すごく = vraiment, très (plus expressif que とても). すごくおいしい = vraiment délicieux. Ça donne de l'énergie à ta réponse."
   },
   {
    "chunk": "人が親切で",
    "role": "« Les gens sont gentils, et… » — la forme で enchaîne sur la suite.",
    "tip": "親切 (shinsetsu) = gentil, serviable. で à la fin relie à l'idée suivante, comme une virgule : « les gens sont gentils, et… ». Ça évite une liste de phrases hachées."
   },
   {
    "chunk": "食べ物もおいしいし",
    "role": "« La nourriture est délicieuse aussi, et en plus… » — し empile les raisons.",
    "tip": "し = « et en plus ». Tu alignes plusieurs bonnes raisons : 安いし、おいしいし = c'est pas cher et en plus c'est bon. Très naturel à l'oral."
   },
   {
    "chunk": "町もきれいです",
    "role": "« Et les villes sont belles. »",
    "tip": "きれい = beau, propre. Attention : きれい finit en い mais se comporte comme な (きれいな町). も = aussi, il revient dans chaque morceau pour dire « ça aussi, et ça aussi »."
   }
  ]
 },
 "stage": {
  "0": [
   {
    "chunk": "はじめまして",
    "role": "« Enchanté(e) » — uniquement la toute première fois qu'on rencontre quelqu'un.",
    "tip": "Littéralement « c'est la première fois ». Tu ne le diras qu'une seule fois par personne. Le lendemain, on passe à おはようございます."
   },
   {
    "chunk": "本日から",
    "role": "« À partir d'aujourd'hui » — en version formelle.",
    "tip": "本日 (honjitsu) = aujourd'hui en langage soutenu (au lieu de 今日). から = à partir de. Au travail, tu verras 本日 dans les mails et les annonces."
   },
   {
    "chunk": "よろしくお願いします",
    "role": "« Je compte sur vous / au plaisir de travailler ensemble. »",
    "tip": "Pas de traduction exacte en français : c'est une façon de dire « on va bien s'entendre, je compte sur toi ». Ton chef le dit en t'accueillant ; tu le lui renvoies."
   }
  ],
  "1": [
   {
    "chunk": "サンドリーヌと申します",
    "role": "« Je m'appelle Sandrine » — en version très respectueuse.",
    "tip": "申します (moushimasu) remplace です ou といいます quand tu parles de toi avec modestie à un supérieur. C'est LA formule pour un premier jour en entreprise ou un entretien."
   },
   {
    "chunk": "どうぞよろしくお願いいたします",
    "role": "« Je vous remercie d'avance pour votre accompagnement » — le niveau de politesse le plus haut.",
    "tip": "いたします = version humble de します. どうぞ ajoute de la chaleur. Au travail, mieux vaut trop poli que pas assez : cette phrase ne sera jamais de trop le premier jour."
   }
  ],
  "2": [
   {
    "chunk": "自己紹介を",
    "role": "« Votre présentation » — ce qu'on te demande de faire.",
    "tip": "自己紹介 = se présenter. Au Japon, on te le demande à chaque nouvel environnement. Prépare une version courte (nom, d'où tu viens, ce que tu étudies) et une version pro."
   },
   {
    "chunk": "していただけますか",
    "role": "« Pourriez-vous… ? » — une demande très polie.",
    "tip": "〜ていただけますか = « est-ce que je pourrais avoir la faveur que vous fassiez… ». Tu peux l'utiliser toi aussi : もう一度言っていただけますか ? = pourriez-vous répéter ?"
   }
  ],
  "3": [
   {
    "chunk": "リヨン大学から参りました",
    "role": "« Je viens de l'Université de Lyon » — en version humble.",
    "tip": "参りました (mairimashita) = forme modeste de 来ました (je suis venu). À utiliser avec des supérieurs. Entre étudiants, 来ました suffit."
   },
   {
    "chunk": "交換留学生です",
    "role": "« Je suis étudiante en échange. »",
    "tip": "交換 (koukan) = échange, 留学生 = étudiant(e) étranger(ère). Mot à connaître par cœur pour Kyoto : on te le demandera dans tous les formulaires."
   },
   {
    "chunk": "専攻しています",
    "role": "« Je me spécialise en… » — pour dire sa matière principale.",
    "tip": "専攻 (senkou) = spécialité universitaire. 経済学を専攻しています = je me spécialise en économie. Question qu'on te posera souvent : 専攻は何ですか ? (c'est quoi ta spécialité ?)."
   }
  ],
  "4": [
   {
    "chunk": "分からないことがあれば",
    "role": "« S'il y a quelque chose que tu ne comprends pas… »",
    "tip": "分からないこと = les choses qu'on ne comprend pas. あれば = s'il y en a. Cette tournure « 〜があれば » = « si jamais il y a… » est très courante : 質問があれば = si tu as des questions."
   },
   {
    "chunk": "すぐに聞いてください",
    "role": "« Demande tout de suite. »",
    "tip": "すぐに = immédiatement. 聞く = écouter mais aussi DEMANDER. C'est une vraie invitation : au Japon, mieux vaut poser une question tôt que faire une erreur."
   }
  ],
  "5": [
   {
    "chunk": "メールの書き方",
    "role": "« La façon d'écrire les mails. »",
    "tip": "書き方 = 書く (écrire) + 方 (façon). Le mail professionnel japonais a des codes très précis (formules d'ouverture, de clôture) : excellente question à poser dès le début !"
   },
   {
    "chunk": "について",
    "role": "« Au sujet de… » — pour annoncer de quoi tu veux parler.",
    "tip": "〜について = à propos de. 日本の文化について = au sujet de la culture japonaise. Très utile en cours et au travail."
   },
   {
    "chunk": "聞いてもよろしいですか",
    "role": "« Puis-je vous demander ? » — demander la permission poliment.",
    "tip": "〜てもいいですか = est-ce que je peux… ? よろしい est la version polie de いい. Ex. : ここに座ってもよろしいですか ? = puis-je m'asseoir ici ?"
   }
  ],
  "6": [
   {
    "chunk": "お疲れ様でした",
    "role": "« Merci pour ton travail aujourd'hui » — la phrase rituelle de fin de journée.",
    "tip": "Littéralement « vous avez été fatigué(e) » : on reconnaît l'effort de l'autre. Au bureau, tu le dis en partant et quand quelqu'un d'autre part. Version en cours de journée : お疲れ様です."
   },
   {
    "chunk": "また明日",
    "role": "« À demain. »",
    "tip": "また = de nouveau, 明日 (ashita) = demain. Même pattern : また来週 = à la semaine prochaine, またね = à plus (entre amis)."
   }
  ],
  "7": [
   {
    "chunk": "お疲れ様でした",
    "role": "« Merci pour votre travail » — tu renvoies la même formule.",
    "tip": "On répond toujours お疲れ様でした par… お疲れ様でした ! Pas besoin d'inventer : c'est un échange rituel, comme « bonne soirée — bonne soirée »."
   },
   {
    "chunk": "また明日よろしくお願いします",
    "role": "« À demain, je compte sur vous. »",
    "tip": "Ajouter よろしくお願いします à la fin montre que tu es motivée pour le lendemain. C'est un petit plus qui fait très bonne impression auprès d'un tuteur japonais."
   }
  ]
 },
 "bureau-service": {
  "0": [
   {
    "chunk": "すみません",
    "role": "« Excuse-moi » — pour interrompre quelqu'un poliment.",
    "tip": "Au bureau, on commence toujours par すみません avant de déranger quelqu'un, même un collègue proche. Ça adoucit tout ce qui suit."
   },
   {
    "chunk": "今ちょっといいですか",
    "role": "« Tu as un instant ? » — LA phrase pour demander un moment à quelqu'un.",
    "tip": "ちょっと = un peu. いいですか = c'est bon ? Mot à mot : « là maintenant, un petit peu, ça va ? ». Utilise-la avant de poser une question à ton tuteur."
   }
  ],
  "1": [
   {
    "chunk": "はい、大丈夫です",
    "role": "« Oui, pas de souci. »",
    "tip": "大丈夫 = ça va, pas de problème. Réponse idéale quand quelqu'un te demande si tu as un moment : ça montre que tu es disponible."
   },
   {
    "chunk": "どうしましたか",
    "role": "« Qu'est-ce qu'il y a ? / Que se passe-t-il ? »",
    "tip": "Phrase pour inviter l'autre à expliquer son besoin. Tu l'entendras aussi chez le médecin ou au guichet : どうしましたか ? = qu'est-ce qui vous amène ?"
   }
  ],
  "2": [
   {
    "chunk": "この書類",
    "role": "« Ces documents. »",
    "tip": "書類 (shorui) = documents, papiers administratifs. Mot très fréquent au bureau et à la mairie. この = ce…-ci (près de moi)."
   },
   {
    "chunk": "明日までに",
    "role": "« D'ici demain / avant demain » — une date limite.",
    "tip": "までに = au plus tard. Attention : まで seul = jusqu'à (durée), までに = avant une échéance. 金曜日までに = d'ici vendredi."
   },
   {
    "chunk": "コピーしてもらえますか",
    "role": "« Est-ce que tu pourrais faire une copie ? » — une demande polie.",
    "tip": "〜てもらえますか = « est-ce que je peux recevoir le service de… ». Plus doux qu'un ordre. Ex. : 手伝ってもらえますか ? = tu peux m'aider ?"
   }
  ],
  "3": [
   {
    "chunk": "承知しました",
    "role": "« Bien compris / entendu » — la façon pro de dire « d'accord ».",
    "tip": "承知しました (shouchi shimashita) remplace わかりました avec un supérieur ou un client. Au travail, c'est ta réponse par défaut quand on te confie une tâche."
   },
   {
    "chunk": "何部必要ですか",
    "role": "« Il en faut combien d'exemplaires ? »",
    "tip": "部 (bu) = compteur d'exemplaires (documents, copies, journaux). 必要 = nécessaire. Poser cette question tout de suite = montrer que tu es efficace."
   }
  ],
  "4": [
   {
    "chunk": "会議は3時からです",
    "role": "« La réunion commence à 15h. »",
    "tip": "会議 (kaigi) = réunion. から = à partir de. Au Japon, on parle souvent en 12h : 3時 = 15h ici par contexte. Pour préciser : 午後3時 (après-midi)."
   },
   {
    "chunk": "準備できていますか",
    "role": "« Tu es prête ? / C'est préparé ? »",
    "tip": "準備 = préparation. できている = c'est fait, c'est prêt (état actuel). Ex. : 準備できました = c'est prêt !"
   }
  ],
  "5": [
   {
    "chunk": "資料はもう準備できています",
    "role": "« Les documents sont déjà prêts. »",
    "tip": "資料 (shiryou) = documents de travail, supports de réunion. もう = déjà. Annoncer que c'est fait avant même qu'on te le demande, c'est très apprécié."
   },
   {
    "chunk": "何か必要なものはありますか",
    "role": "« Il vous faut autre chose ? » — proposer son aide.",
    "tip": "何か = quelque chose. 必要なもの = chose nécessaire. Cette question montre ton initiative : au Japon, anticiper les besoins de l'équipe est une grande qualité."
   }
  ]
 },
 "temple": {
  "0": [
   {
    "chunk": "拝観料",
    "role": "« Le droit d'entrée » pour visiter un temple.",
    "tip": "拝観 (haikan) = visiter un lieu sacré avec respect, 料 (ryou) = frais. Tu verras ce mot à l'entrée de tous les temples de Kyoto. 料 se retrouve aussi dans 料金 (tarif)."
   },
   {
    "chunk": "大人600円です",
    "role": "« 600 yens pour un adulte. »",
    "tip": "大人 (otona) = adulte, 子供 (kodomo) = enfant. Sur les panneaux, cherche aussi 学生 (étudiant) : certains temples ont un tarif réduit — montre ta carte d'étudiante !"
   }
  ],
  "1": [
   {
    "chunk": "一人です",
    "role": "« Une personne. »",
    "tip": "一人 (hitori) = une personne. Rappel : ひとり, ふたり, puis さんにん, よにん… Les deux premiers sont irréguliers."
   },
   {
    "chunk": "カードで払えますか",
    "role": "« Je peux payer par carte ? »",
    "tip": "で = avec/par (le moyen). 払える = pouvoir payer. Question essentielle : beaucoup de petits temples n'acceptent que le liquide. Variante : 現金だけですか ? = seulement en espèces ?"
   }
  ],
  "2": [
   {
    "chunk": "写真撮影は",
    "role": "« Prendre des photos… » — le sujet de la règle.",
    "tip": "写真 = photo, 撮影 (satsuei) = prise de vue. Tu verras 撮影禁止 (photos interdites) sur beaucoup de panneaux dans les temples."
   },
   {
    "chunk": "本堂内では",
    "role": "« À l'intérieur du bâtiment principal. »",
    "tip": "本堂 (hondou) = salle principale du temple, 内 = intérieur. では = « là-dedans en tout cas » : la règle vaut pour cet endroit-là précisément."
   },
   {
    "chunk": "禁止です",
    "role": "« C'est interdit. »",
    "tip": "禁止 (kinshi) = interdiction. Mot à reconnaître en kanji sur les panneaux : 立入禁止 = entrée interdite, 喫煙禁止 = interdit de fumer."
   }
  ],
  "3": [
   {
    "chunk": "わかりました",
    "role": "« D'accord, compris. »",
    "tip": "Montrer que tu as compris et que tu respectes la règle. Simple et poli, parfait ici."
   },
   {
    "chunk": "庭は撮影できますか",
    "role": "« Le jardin, je peux le photographier ? »",
    "tip": "庭 (niwa) = jardin. は met le jardin en contraste : « l'intérieur non, mais le jardin ? ». できますか = c'est possible ? Une question polie qui montre que tu respectes les lieux."
   }
  ],
  "4": [
   {
    "chunk": "パンフレット",
    "role": "« Le dépliant » — mot venu de l'anglais « pamphlet ».",
    "tip": "Écrit en katakana car emprunté. Les temples de Kyoto en proposent souvent en plusieurs langues : demande toujours !"
   },
   {
    "chunk": "何語がよろしいですか",
    "role": "« Quelle langue vous convient ? »",
    "tip": "何語 (nanigo) = quelle langue. 語 accroché à un pays = sa langue : フランス語, 英語 (anglais), 日本語. よろしいですか = version polie de いいですか."
   }
  ],
  "5": [
   {
    "chunk": "フランス語はありますか",
    "role": "« Vous l'avez en français ? »",
    "tip": "〜はありますか = est-ce que vous avez… ? Formule universelle en boutique : Mサイズはありますか ? = vous avez la taille M ?"
   },
   {
    "chunk": "なければ",
    "role": "« Sinon / s'il n'y en a pas… »",
    "tip": "なければ = si ça n'existe pas. Pratique pour proposer un plan B poliment, sans mettre la personne dans l'embarras."
   },
   {
    "chunk": "英語でお願いします",
    "role": "« En anglais, s'il vous plaît. »",
    "tip": "で = en (la langue, le moyen). 英語で = en anglais. Même structure : 日本語でお願いします = en japonais, s'il vous plaît (pour t'entraîner !)."
   }
  ]
 }
};
