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
// Réponses « correctes » et « faibles » : dialogue → tour → position du choix.
export const CONV_ALT_BREAKDOWNS = {
 "izakaya": {
  "1": {
   "1": [
    {
     "chunk": "二人",
     "role": "« Deux. » — le nombre tout seul, sans rien autour.",
     "tip": "Ça marche, le serveur comprendra. Mais tout seul ça sonne un peu sec : ajoute です et tu passes à « on est deux » poli → 二人です (futari desu)."
    }
   ],
   "2": [
    {
     "chunk": "私たちは",
     "role": "« Nous, … » — tu annonces de qui tu parles.",
     "tip": "En japonais, on enlève le « nous » quand c'est évident. Le serveur te regarde : il sait que tu parles de ton groupe. Commence directement par le nombre."
    },
    {
     "chunk": "二人の人間です",
     "role": "« Deux êtres humains. » — une traduction mot à mot qui fait sourire.",
     "tip": "人間 (ningen) = « être humain », le mot des documentaires et de la philosophie. Au restaurant, on dit juste 二人です (futari desu). Garde l'idée : au Japon, plus c'est court, plus c'est naturel."
    }
   ]
  },
  "4": {
   "1": [
    {
     "chunk": "ヘイ！",
     "role": "« Hé ! » — un appel venu de l'anglais.",
     "tip": "Ça sonne brusque, presque comme siffler le serveur. Au Japon, on lève la main et on dit すみません！ (sumimasen) : poli, efficace, et tout le monde se retourne."
    }
   ],
   "2": [
    {
     "chunk": "お願いします",
     "role": "« S'il vous plaît. » — la demande polie universelle.",
     "tip": "Parfait si le serveur est déjà devant toi. S'il est loin, il ne saura pas que tu l'appelles : commence par すみません (sumimasen) pour attirer son attention, puis 注文お願いします."
    }
   ]
  },
  "6": {
   "1": [
    {
     "chunk": "わかりません",
     "role": "« Je ne comprends pas / je ne sais pas. »",
     "tip": "Phrase utile, mais ici elle bloque la commande. Astuce de survie : pointe le menu et dis これをください (kore wo kudasai) — pas besoin de connaître le nom du plat."
    }
   ],
   "2": [
    {
     "chunk": "これ",
     "role": "« Ça / ceci. » — en montrant le plat du doigt.",
     "tip": "これ (kore) = ce qui est près de toi. C'est ton meilleur ami au restaurant : un doigt sur le menu + これ, et tout le monde comprend."
    },
    {
     "chunk": "お願いします",
     "role": "« S'il vous plaît. »",
     "tip": "これ、お願いします est tout à fait correct. Il manque juste la boisson : ajoute あと、ビールを一つ (ato, biiru wo hitotsu) = « et une bière »."
    }
   ]
  },
  "8": {
   "1": [
    {
     "chunk": "エビアレルギー",
     "role": "« Allergie aux crevettes. » — エビ (ebi) = crevette.",
     "tip": "Phrase très utile à retenir si tu as une allergie : remplace エビ par ton aliment. 卵 (tamago) = œuf, 小麦 (komugi) = blé, そば = sarrasin."
    },
    {
     "chunk": "があります",
     "role": "« J'ai… » — pour dire que tu as quelque chose.",
     "tip": "〜があります = j'ai (une allergie, un problème, une réservation). Tu le réutiliseras partout : 予約があります = j'ai une réservation."
    }
   ],
   "2": [
    {
     "chunk": "何？",
     "role": "« Quoi ? » — la version familière, entre amis.",
     "tip": "Au restaurant, ça sonne sec et un peu impoli. Si tu n'as pas compris, dis もう一度お願いします (mou ichido onegaishimasu) = « encore une fois, s'il vous plaît »."
    }
   ]
  },
  "10": {
   "1": [
    {
     "chunk": "いくら？",
     "role": "« Combien ? » — la question du prix, en version courte.",
     "tip": "Compris partout, mais un peu familier. Au restaurant, la formule polie pour l'addition est お会計お願いします (okaikei onegaishimasu). Garde いくらですか (ikura desu ka) pour les boutiques."
    }
   ],
   "2": [
    {
     "chunk": "払います",
     "role": "« Je vais payer. » — 払う (harau) = payer.",
     "tip": "La phrase est correcte, mais le serveur ne sait pas quoi faire : t'apporter l'addition ? Encaisser ? Demande plutôt l'addition : お会計お願いします (okaikei onegaishimasu)."
    }
   ]
  }
 },
 "konbini": {
  "1": {
   "1": [
    {
     "chunk": "これは",
     "role": "« Ça… » — tu montres l'article.",
     "tip": "これ = ceci (près de toi). は annonce de quoi tu parles : « en ce qui concerne ça… »."
    },
    {
     "chunk": "いくらですか？",
     "role": "« C'est combien ? » — la question du prix, polie.",
     "tip": "Très utile en boutique ! Au konbini le prix est souvent affiché, donc ce n'est pas toujours nécessaire. Pour acheter directement : これをください (kore wo kudasai)."
    }
   ],
   "2": [
    {
     "chunk": "買いたいです",
     "role": "« Je veux acheter. » — 買う (kau) = acheter + たい = vouloir.",
     "tip": "Grammaticalement juste, mais on ne l'entend pas à la caisse : tu poses l'article et c'est clair. Si tu veux parler, これをください (kore wo kudasai) suffit."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "いいえ",
     "role": "« Non. » — poli et clair.",
     "tip": "Un non poli, parfait au comptoir."
    },
    {
     "chunk": "大丈夫です",
     "role": "« Ça va comme ça / non merci. »",
     "tip": "大丈夫です (daijoubu desu) = le « non merci » le plus courant au Japon. Très bon réflexe : tu peux l'utiliser pour refuser un sac, une paille, un ticket…"
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne comprends pas. »",
     "tip": "Honnête, mais au konbini les questions sont toujours les mêmes (réchauffer, sac, carte de fidélité). Tu peux souvent répondre はい (oui) ou いいえ (non) en devinant au contexte. Si tu bloques vraiment : もう一度お願いします (encore une fois svp)."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "はい",
     "role": "« Oui. »",
     "tip": "Simple et clair."
    },
    {
     "chunk": "ください",
     "role": "« Donnez-m'en un, s'il vous plaît. »",
     "tip": "Valable si tu as besoin d'un sac (il coûte quelques yens au Japon). Si tu n'en veux pas, la réponse polie est 結構です (kekkou desu) ou 大丈夫です."
    }
   ],
   "2": [
    {
     "chunk": "いらない",
     "role": "« J'en veux pas. » — la version familière.",
     "tip": "On comprend, mais ça sonne brusque face à un employé, comme « nan, pas besoin ». La version polie : 結構です (kekkou desu) ou 大丈夫です (daijoubu desu) = « non merci, ça ira »."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "いいえ",
     "role": "« Non. »",
     "tip": "Ça suffit tout à fait ici. Pour adoucir, tu peux ajouter 大丈夫です : いいえ、大丈夫です (iie, daijoubu desu)."
    }
   ],
   "2": [
    {
     "chunk": "何ですか？",
     "role": "« C'est quoi ? » — tu demandes ce que ça veut dire.",
     "tip": "Poli, mais le caissier va devoir expliquer et la file attend. Souvent il te propose une carte de fidélité : un simple いいえ (non) règle la question."
    }
   ]
  },
  "9": {
   "1": [
    {
     "chunk": "現金です",
     "role": "« En espèces. » — 現金 (genkin) = argent liquide.",
     "tip": "Clair et compris immédiatement. Pour la carte, tu dirais カードで (kaado de) = « par carte »."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne comprends pas. »",
     "tip": "Ici, un geste vaut mieux que des mots : montre ton billet ou ta carte et le caissier comprendra tout de suite. Le mot à retenir : 現金 (genkin) = espèces."
    }
   ]
  }
 },
 "pharmacie": {
  "1": {
   "1": [
    {
     "chunk": "病気です",
     "role": "« Je suis malade. » — 病気 (byouki) = maladie.",
     "tip": "Juste, mais trop vague pour un pharmacien : il a besoin de savoir où tu as mal. Dis plutôt l'endroit : 頭が痛いです (atama ga itai desu) = j'ai mal à la tête."
    }
   ],
   "2": [
    {
     "chunk": "助けてください",
     "role": "« Aidez-moi ! / Au secours ! »",
     "tip": "C'est la phrase des vraies urgences : tout le monde va paniquer pour un simple mal de tête. À la pharmacie, décris ton symptôme : 〜が痛いです (… ga itai desu) = j'ai mal à…"
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Honnête si tu n'as pas pris ta température. Le pharmacien pourra te proposer d'en prendre une. Tu peux préciser : 測っていません (hakatte imasen) = je ne l'ai pas mesurée."
    }
   ],
   "2": [
    {
     "chunk": "はい",
     "role": "« Oui. »",
     "tip": "Bonne réponse à la question… mais la suite piège."
    },
    {
     "chunk": "すごく熱いです",
     "role": "« C'est très chaud (au toucher). » — 熱い (atsui) = brûlant.",
     "tip": "Piège classique ! 熱い sert pour une soupe ou un bain trop chaud. Pour la fièvre, on dit 熱があります (netsu ga arimasu) = « j'ai de la fièvre »."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "はい、わかりました",
     "role": "« Oui, j'ai compris. »",
     "tip": "Parfait si tu as vraiment compris la posologie. Si tu as un doute, n'hésite pas : もう一度ゆっくりお願いします (mou ichido yukkuri onegaishimasu) = encore une fois, lentement svp."
    }
   ],
   "2": [
    {
     "chunk": "英語で",
     "role": "« En anglais. » — で indique la langue utilisée.",
     "tip": "英語で (eigo de) = en anglais, 日本語で = en japonais. Très utile, mais beaucoup de pharmaciens ne parlent pas anglais."
    },
    {
     "chunk": "言ってください",
     "role": "« Dites-le, s'il vous plaît. »",
     "tip": "Ça met le pharmacien dans l'embarras. Demande plutôt de ralentir : ゆっくり言ってください (yukkuri itte kudasai) = dites-le lentement svp."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "いいえ",
     "role": "« Non. »",
     "tip": "Clair."
    },
    {
     "chunk": "それだけです",
     "role": "« C'est tout. » — それだけ (sore dake) = seulement ça.",
     "tip": "Très pratique pour dire qu'il n'y a rien d'autre, ici comme à la caisse. Parfait si tu n'as vraiment pas d'autres symptômes."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Ici, c'est toi qui sais ce que tu ressens ! Essaie de décrire même simplement : 喉も痛いです (nodo mo itai desu) = j'ai aussi mal à la gorge, ou いいえ、それだけです."
    }
   ]
  },
  "9": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci. » — poli.",
     "tip": "Toujours bien. Mais avant de partir, il te reste à payer : いくらですか (ikura desu ka) = c'est combien ?"
    }
   ],
   "2": [
    {
     "chunk": "さようなら",
     "role": "« Au revoir. » — mais un au revoir solennel.",
     "tip": "さようなら sonne comme un adieu, on l'utilise peu dans la vie courante. En quittant une boutique, on dit ありがとうございました (arigatou gozaimashita) = « merci (pour ce que vous avez fait) »."
    }
   ]
  }
 },
 "hotel": {
  "1": {
   "1": [
    {
     "chunk": "予約があります",
     "role": "« J'ai une réservation. »",
     "tip": "Bon début ! Ajoute ton nom pour qu'on te trouve tout de suite : 〜の名前で予約しています (… no namae de yoyaku shite imasu) = j'ai réservé au nom de …"
    }
   ],
   "2": [
    {
     "chunk": "部屋を",
     "role": "« Une chambre… » — 部屋 (heya) = pièce, chambre.",
     "tip": "部屋 est un mot très courant : 私の部屋 = ma chambre."
    },
    {
     "chunk": "ください",
     "role": "« Donnez-moi, s'il vous plaît. »",
     "tip": "On dirait que tu arrives sans réservation. Si tu as réservé, dis-le pour qu'on trouve ta chambre : 予約しています (yoyaku shite imasu)."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "少々お待ちください",
     "role": "« Un instant, s'il vous plaît. » — version très polie.",
     "tip": "Phrase de pro que tu entends partout en boutique. Tu peux l'utiliser pendant que tu cherches ton passeport. Version plus simple : ちょっと待ってください (chotto matte kudasai)."
    }
   ],
   "2": [
    {
     "chunk": "なぜ？",
     "role": "« Pourquoi ? » — tout court.",
     "tip": "Ça sonne comme une contestation. Au Japon, l'hôtel est obligé de copier le passeport des touristes étrangers : tends-le simplement en disant はい、どうぞ (hai, douzo) = voilà."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "はい、わかりました",
     "role": "« D'accord, j'ai compris. »",
     "tip": "Parfait pour montrer que tu as suivi. C'est aussi le bon moment pour poser tes questions (horaires du petit-déjeuner, wifi…)."
    }
   ],
   "2": [
    {
     "chunk": "もう一度",
     "role": "« Encore une fois. » — もう一度 (mou ichido).",
     "tip": "Mot magique pour tout apprenant ! Tu peux l'utiliser seul : もう一度お願いします."
    },
    {
     "chunk": "言ってください",
     "role": "« Dites-le, s'il vous plaît. »",
     "tip": "Très bonne réponse si tu as raté les horaires. Pour encore plus de douceur, ajoute ゆっくり (lentement) : もう一度ゆっくり言ってください."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci. »",
     "tip": "Parfait pour clore l'échange quand tu n'as besoin de rien d'autre."
    }
   ],
   "2": [
    {
     "chunk": "エレベーター",
     "role": "« L'ascenseur. » — de l'anglais elevator.",
     "tip": "Écrit en katakana comme beaucoup de mots venus de l'anglais. Tu peux le deviner en le prononçant à voix haute !"
    },
    {
     "chunk": "はどこですか？",
     "role": "« Où est… ? » — la question pour trouver un lieu.",
     "tip": "〜はどこですか (… wa doko desu ka) marche pour tout : トイレはどこですか = où sont les toilettes ? Une des phrases les plus utiles du voyage."
    }
   ]
  }
 },
 "hotel-probleme": {
  "1": {
   "1": [
    {
     "chunk": "問題があります",
     "role": "« Il y a un problème. » — 問題 (mondai) = problème.",
     "tip": "Honnête, mais la réception va devoir te poser plein de questions. Gagne du temps : dis le numéro de chambre et ce qui ne marche pas, par exemple エアコンが壊れています (eakon ga kowarete imasu)."
    }
   ],
   "2": [
    {
     "chunk": "部屋が",
     "role": "« La chambre… »",
     "tip": "部屋 (heya) = chambre."
    },
    {
     "chunk": "嫌いです",
     "role": "« Je n'aime pas / je déteste. » — 嫌い (kirai).",
     "tip": "C'est un goût personnel, la réception ne peut rien en faire. Décris un problème concret qu'on peut réparer : 〜が壊れています (… ga kowarete imasu) = … est cassé."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord. »",
     "tip": "Bien pour accepter calmement. Demander le délai t'aurait aidé à t'organiser : 何分くらいかかりますか (nanpun kurai kakarimasu ka) = ça prendra combien de minutes ?"
    }
   ],
   "2": [
    {
     "chunk": "早く",
     "role": "« Vite. » — 早く (hayaku).",
     "tip": "Mot utile, mais à manier avec douceur."
    },
    {
     "chunk": "してください",
     "role": "« Faites, s'il vous plaît. »",
     "tip": "Même avec ください, « faites vite » sonne pressant alors qu'ils viennent de s'excuser. Au Japon, la patience compte beaucoup. Demande plutôt le délai : 何分くらいかかりますか ?"
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "大丈夫です",
     "role": "« Ça va / pas besoin. »",
     "tip": "Le « non merci » poli par excellence."
    },
    {
     "chunk": "ありがとうございます",
     "role": "« Merci. »",
     "tip": "Réponse parfaite si tout est réglé : calme et polie."
    }
   ],
   "2": [
    {
     "chunk": "全部",
     "role": "« Tout. » — 全部 (zenbu).",
     "tip": "全部 = tout, l'ensemble. Très utile ailleurs : 全部でいくらですか = ça fait combien en tout ?"
    },
    {
     "chunk": "ダメです",
     "role": "« C'est nul / ça ne va pas. » — ダメ (dame).",
     "tip": "Trop brutal face à une équipe qui s'excuse. Si autre chose ne marche pas, nomme-le calmement : シャワーも壊れています (shawaa mo kowarete imasu) = la douche aussi est en panne."
    }
   ]
  }
 },
 "gare": {
  "1": {
   "1": [
    {
     "chunk": "大阪に",
     "role": "« À Osaka. » — に marque la destination.",
     "tip": "Ville + に = aller à cette ville : 京都に行きます = je vais à Kyoto."
    },
    {
     "chunk": "行きたいです",
     "role": "« Je veux aller. » — 行く + たい = vouloir aller.",
     "tip": "Compris, mais le guichetier devra te demander : aller simple ou aller-retour ? combien de billets ? La formule complète : 大阪まで片道一枚お願いします (Oosaka made katamichi ichimai onegaishimasu)."
    }
   ],
   "2": [
    {
     "chunk": "電車を",
     "role": "« Un train… » — 電車 (densha) = train.",
     "tip": "電車 = le train, le véhicule, pas le billet."
    },
    {
     "chunk": "ください",
     "role": "« Donnez-moi. »",
     "tip": "« Donnez-moi un train » fait sourire ! Tu veux un billet : 大阪まで一枚お願いします (Oosaka made ichimai onegaishimasu) = un billet pour Osaka svp. 枚 (mai) compte les objets plats comme les billets."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "新幹線です",
     "role": "« Le Shinkansen. » — le train à grande vitesse.",
     "tip": "Clair ! Pense à préciser le type de siège : 自由席 (jiyuuseki) = place libre, moins cher ; 指定席 (shiteiseki) = place réservée."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Honnête, et c'est bien de le dire."
    },
    {
     "chunk": "どっちがいいですか？",
     "role": "« Lequel est le mieux ? » — どっち (docchi) = lequel des deux.",
     "tip": "Excellente question pour demander conseil, elle marche partout : どっちがおすすめですか = lequel vous recommandez ? Le guichetier t'aidera selon l'horaire."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "現金です",
     "role": "« En espèces. » — 現金 (genkin).",
     "tip": "Simple et clair, les guichets acceptent toujours le liquide."
    }
   ],
   "2": [
    {
     "chunk": "カードが",
     "role": "« La carte… » — カード (kaado) = carte bancaire.",
     "tip": "カード = carte, de l'anglais card."
    },
    {
     "chunk": "使えますか？",
     "role": "« Est-ce que je peux l'utiliser ? » — 使える = pouvoir utiliser.",
     "tip": "Question très utile partout au Japon ! Attention : certaines cartes étrangères sont refusées. Tu peux aussi demander カードで払えますか (kaado de haraemasu ka) = je peux payer par carte ?"
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci. »",
     "tip": "Poli, mais tu ne sais toujours pas sur quel quai aller. Avant de partir, demande 何番線ですか (nanbansen desu ka) = c'est quel quai ?"
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Ici c'est à toi de poser la question ! Montre ton billet et demande : 何番線ですか (nanbansen desu ka) = c'est quel quai ? Le numéro est aussi affiché sur les écrans : 3番線 = quai 3."
    }
   ]
  }
 },
 "bus-metro": {
  "1": {
   "1": [
    {
     "chunk": "金閣寺はどこですか",
     "role": "« Où est le Kinkaku-ji ? » — une question claire, mais qui ne parle pas du bus.",
     "tip": "Le chauffeur risque de te montrer la direction au lieu de te dire quel bus prendre. Pour un trajet, ajoute ce que tu veux vraiment savoir : どのバスに乗ればいいですか (dono basu ni noreba ii desu ka) = quel bus dois-je prendre ?"
    }
   ],
   "2": [
    {
     "chunk": "バスに乗りたいです",
     "role": "« Je veux prendre le bus. »",
     "tip": "Phrase correcte, mais la personne ne sait pas où tu vas ! La destination est l'info la plus importante. Dis plutôt : 金閣寺まで行きたいんですが (Kinkakuji made ikitain desu ga) = je voudrais aller jusqu'au Kinkaku-ji."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, j'ai compris. »",
     "tip": "Parfait si tu vois déjà l'arrêt. Sinon, profite que quelqu'un t'aide pour poser la question suivante : バス停はどこですか (basutei wa doko desu ka) = où est l'arrêt ?"
    },
    {
     "chunk": "ありがとうございます",
     "role": "« Merci beaucoup. »",
     "tip": "Toujours bienvenu, même quand la réponse est courte."
    }
   ],
   "2": [
    {
     "chunk": "バスは何時ですか",
     "role": "« Le bus passe à quelle heure ? »",
     "tip": "Bonne question, mais un peu tôt : trouve d'abord l'arrêt, les horaires y sont affichés. 何時 (nanji) = quelle heure, très utile partout : 何時に開きますか = ça ouvre à quelle heure ?"
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Réponse honnête, et c'est mieux que de donner une fausse info. Si tu veux être plus aimable, ajoute すみません devant : すみません、わかりません = désolé(e), je ne sais pas."
    }
   ],
   "2": [
    {
     "chunk": "はい",
     "role": "« Oui. »",
     "tip": "Attention : en disant juste はい, tu confirmes une info dont tu n'es pas sûr(e). Si tu as un doute, dis plutôt たぶん止まると思います (tabun tomaru to omoimasu) = je pense qu'il s'arrête, ou わかりません."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "止まってください",
     "role": "« Arrêtez-vous, s'il vous plaît. »",
     "tip": "Au Japon, le bus s'arrête quand on appuie sur le bouton 押しボタン, pas besoin de le demander au chauffeur. Crier ça dans le bus surprendrait un peu. Il suffit de te lever au bon moment avec un petit すみません pour passer."
    }
   ],
   "2": [
    {
     "chunk": "ここですか",
     "role": "« C'est ici ? »",
     "tip": "Pratique pour vérifier avec ton voisin. Mais ne reste pas assis(e) en attendant la réponse : lève-toi, les bus japonais repartent vite. Tu peux dire 金閣寺はここですか (Kinkakuji wa koko desu ka) pour être précis(e)."
    }
   ]
  }
 },
 "chemin": {
  "0": {
   "1": [
    {
     "chunk": "コンビニはどこ",
     "role": "« Le konbini, c'est où ? » — en version familière.",
     "tip": "Sans ですか, la phrase sonne comme entre amis. À un inconnu dans la rue, mieux vaut dire コンビニはどこですか (konbini wa doko desu ka), ou encore mieux : この近くにコンビニはありますか = il y a un konbini près d'ici ?"
    }
   ],
   "2": [
    {
     "chunk": "コンビニ",
     "role": "« Konbini ! » — juste le mot, sans phrase autour.",
     "tip": "La personne comprend le sujet mais pas ta demande : tu cherches, tu en vois un, tu veux y aller ? Commence par すみません pour attirer l'attention, puis pose la question : すみません、コンビニはどこですか ?"
    }
   ]
  },
  "2": {
   "1": [
    {
     "chunk": "もう一度お願いします",
     "role": "« Encore une fois, s'il vous plaît. »",
     "tip": "Une des phrases les plus utiles à retenir ! Personne ne s'en vexera. Pour que la personne parle plus doucement : もう少しゆっくりお願いします (mou sukoshi yukkuri onegaishimasu)."
    }
   ],
   "2": [
    {
     "chunk": "わかりました",
     "role": "« J'ai compris. »",
     "tip": "Très bien si tu as vraiment retenu le chemin. Petit conseil : répète les directions pour vérifier, par exemple まっすぐ行って、右ですね (massugu itte, migi desu ne) = tout droit puis à droite, c'est ça ?"
    }
   ]
  },
  "4": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci beaucoup ! »",
     "tip": "Simple et parfait pour finir. Si tu veux montrer encore plus ta reconnaissance : 助かりました (tasukarimashita) = vous m'avez bien aidé(e)."
    }
   ],
   "2": [
    {
     "chunk": "セブン-イレブンはどこですか",
     "role": "« Où est le 7-Eleven ? »",
     "tip": "La personne vient juste de t'expliquer ! Reposer la même question donne l'impression que tu n'as pas écouté. Si tu n'as pas compris, dis-le franchement : すみません、もう一度お願いします."
    }
   ]
  },
  "6": {
   "1": [
    {
     "chunk": "少し迷子になりました",
     "role": "« Je me suis un peu perdu(e). »",
     "tip": "迷子 (maigo) = perdu, au départ pour un enfant perdu, mais on l'utilise aussi en riant pour soi. C'est honnête, et la personne te proposera sûrement de t'accompagner ou de te montrer une carte."
    }
   ],
   "2": [
    {
     "chunk": "たぶん",
     "role": "« Peut-être. »",
     "tip": "Réponse floue : la personne ne sait pas si elle doit t'aider davantage. Sois clair(e) : はい、大丈夫です (oui, ça va) ou ちょっとわからないです (je ne suis pas sûr(e)), elle saura quoi faire."
    }
   ]
  }
 },
 "supermarche": {
  "0": {
   "1": [
    {
     "chunk": "豆腐",
     "role": "« Tofu ? » — juste le mot, avec une intonation de question.",
     "tip": "Ça marche souvent, l'employé te montrera le rayon. Mais un mot seul peut sembler un peu sec. Ajoute deux petits morceaux et tu es parfait(e) : すみません、豆腐はどこですか ?"
    }
   ],
   "2": [
    {
     "chunk": "豆腐を探しています",
     "role": "« Je cherche du tofu. »",
     "tip": "Phrase naturelle et polie, très bien ! 〜を探しています (wo sagashite imasu) marche pour tout ce que tu cherches : 牛乳を探しています = je cherche du lait."
    }
   ]
  },
  "2": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci beaucoup. »",
     "tip": "Réponse parfaite et suffisante. Si tu veux en profiter pour préparer la caisse, tu peux ajouter une question pratique comme 袋は有料ですか (fukuro wa yuuryou desu ka) = les sacs sont payants ?"
    }
   ],
   "2": [
    {
     "chunk": "冷蔵コーナーはどこですか",
     "role": "« Où est le rayon frais ? »",
     "tip": "Utile si tu n'as pas compris l'indication. 冷蔵 (reizou) = réfrigéré, コーナー = rayon. Tu verras aussi 冷凍 (reitou) = surgelé, ne les confonds pas !"
    }
   ]
  },
  "4": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci beaucoup. »",
     "tip": "Simple et poli, il suffit ensuite de suivre l'employé."
    }
   ],
   "2": [
    {
     "chunk": "カードで払います",
     "role": "« Je paie par carte. »",
     "tip": "Bonne idée de l'annoncer. Mais au Japon, toutes les caisses ne prennent pas les cartes : demande plutôt カードは使えますか (kaado wa tsukaemasu ka) = vous acceptez les cartes ?"
    }
   ]
  },
  "6": {
   "1": [
    {
     "chunk": "はい、どうぞ",
     "role": "« Voilà. » — en tendant ta carte ou ton argent.",
     "tip": "Très naturel ! Petit détail culturel : au Japon, on pose l'argent dans le petit plateau (トレー) au lieu de le donner directement dans la main."
    }
   ],
   "2": [
    {
     "chunk": "高いです",
     "role": "« C'est cher. »",
     "tip": "Ce n'est pas faux, mais la caissière ne fixe pas les prix et ne peut rien y faire. On ne négocie pas au supermarché japonais. Garde ce commentaire pour tes amis : 高いね (takai ne) = c'est cher, hein !"
    }
   ]
  }
 },
 "shopping": {
  "1": {
   "1": [
    {
     "chunk": "Tシャツを探しています",
     "role": "« Je cherche un T-shirt. »",
     "tip": "Parfait si tu sais ce que tu veux : le vendeur va t'aider. Si tu préfères regarder tranquillement, dis plutôt 見ているだけです (mite iru dake desu) = je regarde seulement."
    }
   ],
   "2": [
    {
     "chunk": "大丈夫です",
     "role": "« Ça va / non merci. »",
     "tip": "Le vendeur comprendra que tu n'as pas besoin d'aide, mais c'est un peu flou. 見ているだけです (mite iru dake desu) dit clairement que tu regardes, c'est la formule que les Japonais utilisent en boutique."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "いいですね",
     "role": "« C'est bien / il me plaît. »",
     "tip": "Réaction naturelle et sympathique. いいですね s'utilise partout pour dire que quelque chose te plaît."
    },
    {
     "chunk": "Lサイズはありますか",
     "role": "« Vous l'avez en taille L ? »",
     "tip": "Attention, les tailles japonaises taillent souvent petit : un M européen correspond parfois à un L japonais. Essayer avant d'acheter est une bonne idée : 試着できますか (shichaku dekimasu ka) ?"
    }
   ],
   "2": [
    {
     "chunk": "いらないです",
     "role": "« Je n'en veux pas. »",
     "tip": "C'est clair mais assez sec, surtout face à un vendeur souriant. Pour refuser gentiment, les Japonais disent 大丈夫です (daijoubu desu) ou ちょっと考えます (chotto kangaemasu) = je vais réfléchir."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "二枚です",
     "role": "« Deux. » — 枚 est le mot qu'on utilise pour compter les vêtements fins.",
     "tip": "Bonne réponse si tu prends deux pièces. 枚 (mai) sert à compter tout ce qui est plat : T-shirts, chemises, feuilles, billets. 一枚, 二枚, 三枚…"
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Le vendeur te demande combien de vêtements tu veux essayer, tu as la réponse dans les mains ! Compte-les simplement : 一枚です (ichimai desu) = un seul."
    }
   ]
  },
  "6": {
   "1": [
    {
     "chunk": "ちょうどいいです",
     "role": "« C'est pile ma taille / c'est parfait. »",
     "tip": "Expression très utile ! ちょうどいい (choudo ii) = juste comme il faut. Ça marche aussi pour la température d'un bain ou la cuisson d'un plat."
    }
   ],
   "2": [
    {
     "chunk": "きれいです",
     "role": "« C'est beau. »",
     "tip": "Compliment gentil, mais le vendeur veut surtout savoir si la taille va. Si ce n'est pas le cas, dis le problème : 少し大きいです (sukoshi ookii desu) = c'est un peu grand."
    }
   ]
  }
 },
 "urgence": {
  "0": {
   "1": [
    {
     "chunk": "助けてください",
     "role": "« Aidez-moi ! »",
     "tip": "La bonne phrase en cas de danger immédiat, les gens réagiront vite. Mais pour un vol, la personne aura besoin de savoir quoi faire : enchaîne avec ce qui s'est passé, par exemple 財布を盗まれました (saifu wo nusumaremashita) = on m'a volé mon portefeuille."
    }
   ],
   "2": [
    {
     "chunk": "問題があります",
     "role": "« Il y a un problème. »",
     "tip": "Trop vague dans une urgence : la personne ne sait pas comment t'aider. Va droit au but avec le mot clé : 財布 (portefeuille), パスポート (passeport), 警察 (police)…"
    }
   ]
  },
  "2": {
   "1": [
    {
     "chunk": "財布がありません",
     "role": "« Je n'ai plus mon portefeuille. »",
     "tip": "Phrase courte et claire, c'est déjà très bien en situation de stress. Si tu veux préciser : 財布を失くしました (saifu wo nakushimashita) = je l'ai perdu."
    }
   ],
   "2": [
    {
     "chunk": "警察はどこですか",
     "role": "« Où est la police ? »",
     "tip": "Bonne réaction ! Au Japon, cherche un 交番 (kouban) : un petit poste de police de quartier, il y en a partout. Les policiers aident aussi pour les objets perdus."
    }
   ]
  },
  "4": {
   "1": [
    {
     "chunk": "はい、連絡しました",
     "role": "« Oui, je les ai contactés. »",
     "tip": "Parfait si c'est vrai. 連絡する (renraku suru) = contacter, prévenir, très utile pour le travail et l'université aussi."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Ici la question est simple : as-tu appelé l'ambassade ? C'est toi qui sais. Réponds はい ou いいえ、まだです (iie, mada desu) = non, pas encore."
    }
   ]
  }
 },
 "universite": {
  "1": {
   "1": [
    {
     "chunk": "フランス人です",
     "role": "« Je suis français(e). »",
     "tip": "Correct, mais ça n'explique pas ce que tu fais à l'université. Ajoute ton statut, ça lance la conversation : フランスから来た交換留学生です (Furansu kara kita koukan ryuugakusei desu)."
    }
   ],
   "2": [
    {
     "chunk": "こんにちは",
     "role": "« Bonjour. »",
     "tip": "Poli, mais la personne t'a posé deux questions ! Pour une première rencontre, les Japonais commencent par はじめまして (hajimemashite) puis se présentent, et finissent par よろしくお願いします."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "大学で勉強しました",
     "role": "« J'ai étudié à l'université. »",
     "tip": "Simple et clair, parfait. 〜で勉強しました = j'ai étudié à/avec… Tu peux varier : アプリで勉強しました = j'ai appris avec une appli."
    }
   ],
   "2": [
    {
     "chunk": "少しだけ知っています",
     "role": "« J'en sais juste un peu. »",
     "tip": "Modestie bien japonaise, très appréciée ! Mais attention, ça ne répond pas vraiment à la question « où ? ». Tu peux combiner : 大学で少しだけ勉強しました."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "はい、もうしました",
     "role": "« Oui, c'est déjà fait. »",
     "tip": "Parfait si c'est vrai. もう (mou) = déjà. Son contraire : まだです (mada desu) = pas encore."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "La personne te demande si tu l'as fait, pas une info compliquée. Si tu ne l'as pas fait, profites-en pour demander de l'aide : まだです。どこでしたらいいですか (mada desu. doko de shitara ii desu ka) = pas encore, où dois-je le faire ?"
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "2号館はどこですか",
     "role": "« Le bâtiment 2, c'est où ? »",
     "tip": "Très naturel ! 号館 (goukan) = bâtiment numéro… sur un campus. Tu verras aussi 棟 (tou) pour désigner un bâtiment."
    }
   ],
   "2": [
    {
     "chunk": "わかりました",
     "role": "« D'accord. »",
     "tip": "Bien, tu peux y aller directement. Pour être plus chaleureux(se), ajoute un remerciement : わかりました、ありがとうございます !"
    }
   ]
  }
 },
 "bibliotheque": {
  "1": {
   "1": [
    {
     "chunk": "はい、どうぞ",
     "role": "« Oui, voilà. » — ce qu'on dit en tendant quelque chose à quelqu'un.",
     "tip": "Parfait pour montrer ta carte. Mais tu t'arrêtes là : tu rates l'occasion de demander si tu as accès en tant qu'étudiante en échange. Ajoute : 留学生ですが、利用できますか？ (ryuugakusei desu ga, riyou dekimasu ka ?)."
    }
   ],
   "2": [
    {
     "chunk": "学生証",
     "role": "« La carte étudiante. »",
     "tip": "Mot indispensable à l'université : 学生証 (gakuseishou). On te le demandera partout : bibliothèque, cantine, réductions."
    },
    {
     "chunk": "持っていません",
     "role": "« Je ne l'ai pas (sur moi). »",
     "tip": "持っていません = je ne l'ai pas avec moi / je n'en ai pas. C'est honnête, mais propose une suite : 交換留学生ですが、どうすればいいですか？ (koukan ryuugakusei desu ga, dou sureba ii desu ka ?) = je suis en échange, comment je fais ?"
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "この本",
     "role": "« Ce livre-ci. »",
     "tip": "この + nom = ce … (près de toi). その = celui près de l'autre, あの = celui là-bas. Pratique quand tu tiens le livre en main."
    },
    {
     "chunk": "借りられますか",
     "role": "« Est-ce que je peux l'emprunter ? »",
     "tip": "Phrase tout à fait correcte ! Le seul souci : la réponse sera juste はい (oui). Si tu veux savoir comment faire, la formule magique est どうすればいいですか？ (dou sureba ii desu ka ?) = comment je dois faire ?"
    }
   ],
   "2": [
    {
     "chunk": "本をください",
     "role": "« Donnez-moi le livre. »",
     "tip": "ください, c'est pour acheter ou commander, comme au restaurant. À la bibliothèque on emprunte : 借りる (kariru). Dis plutôt : この本を借りたいです (kono hon wo karitai desu) = je voudrais emprunter ce livre."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "すみません",
     "role": "« Pardon. » — tu t'excuses d'avoir fait du bruit.",
     "tip": "Bonne réaction, c'est poli. Mais si tu dois parler avec ton groupe, profite-en pour demander une salle : グループ学習ができる部屋はありますか？ (guruupu gakushuu ga dekiru heya wa arimasu ka ?)."
    }
   ],
   "2": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, j'ai compris. »",
     "tip": "Réponse polie qui montre que tu respectes la règle. Elle convient si tu travailles seule. Pour un travail en groupe, demande plutôt où vous pouvez parler."
    }
   ]
  }
 },
 "professeur": {
  "0": {
   "1": [
    {
     "chunk": "先生",
     "role": "« Professeur ! » — on appelle le prof par son titre.",
     "tip": "Au Japon on dit 先生 (sensei) et pas son prénom, c'est bien. Mais crier juste 先生！ sonne abrupt. Ajoute une petite formule : 先生、少しよろしいですか？ (sensei, sukoshi yoroshii desu ka ?) = vous auriez un moment ?"
    }
   ],
   "2": [
    {
     "chunk": "質問があります",
     "role": "« J'ai une question. »",
     "tip": "Clair et correct. Pour être plus délicate avec un prof, demande d'abord s'il a le temps : 少しよろしいですか？ (sukoshi yoroshii desu ka ?) = je peux vous déranger un instant ?"
    }
   ]
  },
  "2": {
   "1": [
    {
     "chunk": "わかりませんでした",
     "role": "« Je n'ai pas compris. »",
     "tip": "C'est honnête, mais le prof ne sait pas QUOI réexpliquer. Précise la partie : この部分がわかりませんでした (kono bubun ga wakarimasen deshita) = je n'ai pas compris cette partie."
    }
   ],
   "2": [
    {
     "chunk": "もう一度",
     "role": "« Encore une fois. »",
     "tip": "もう一度 (mou ichido) est un mot très utile : もう一度お願いします = encore une fois svp, quand tu n'as pas entendu."
    },
    {
     "chunk": "教えてください",
     "role": "« Expliquez-moi s'il vous plaît. »",
     "tip": "Correct et clair. Avec un prof, la version encore plus douce est 説明してもらえますか？ (setsumei shite moraemasu ka ?) = pourriez-vous m'expliquer ? — tu demandes une faveur au lieu de donner une consigne."
    }
   ]
  },
  "4": {
   "1": [
    {
     "chunk": "すみません",
     "role": "« Pardon / désolée. »",
     "tip": "Avec un prof, on commence toujours par s'excuser quand on a fait une erreur. C'est la bonne attitude."
    },
    {
     "chunk": "忘れていました",
     "role": "« J'avais oublié. »",
     "tip": "忘れる = oublier. Honnête et naturel. Ensuite, note la date devant le prof : 来週の金曜日ですね (raishuu no kinyoubi desu ne) = c'est vendredi prochain, c'est ça ?"
    }
   ],
   "2": [
    {
     "chunk": "わかりました",
     "role": "« D'accord. »",
     "tip": "Ça marche, mais le prof te demandait si tu t'en souvenais. La réponse directe est はい、覚えています (hai, oboete imasu) = oui, je m'en souviens."
    }
   ]
  }
 },
 "club-etudiant": {
  "1": {
   "1": [
    {
     "chunk": "はじめまして",
     "role": "« Enchantée. » — la première phrase de toute rencontre.",
     "tip": "Toujours はじめまして la première fois. Tu ne le diras plus jamais à cette personne ensuite."
    },
    {
     "chunk": "見ているだけです",
     "role": "« Je regarde juste. »",
     "tip": "〜だけ = seulement. Tu l'utiliseras aussi en magasin quand un vendeur vient t'aider. C'est poli, mais ça ferme un peu la porte : si le club t'intéresse, dis-le !"
    }
   ],
   "2": [
    {
     "chunk": "どんなサークルですか",
     "role": "« C'est quel genre de club ? »",
     "tip": "サークル (saakuru) = club étudiant, mot indispensable à l'université. どんな〜ですか = c'est quel genre de… ? Bonne question, même si tu ne réponds pas encore à la sienne (es-tu intéressée ?)."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "初心者です",
     "role": "« Je suis débutante. »",
     "tip": "初心者 (shoshinsha) = débutant. Tu le verras aussi sur la voiture des jeunes conducteurs (la feuille verte et jaune). Réponse claire ; tu peux ajouter depuis combien de temps tu pratiques."
    }
   ],
   "2": [
    {
     "chunk": "上手ではありません",
     "role": "« Je ne suis pas douée. »",
     "tip": "Les Japonais adorent la modestie, donc ça passe très bien. Mais la question était « as-tu de l'expérience ? » : réponds d'abord oui ou non, par exemple 少しあります (sukoshi arimasu) = un peu."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "火曜日は難しいです",
     "role": "« Le mardi, c'est compliqué pour moi. »",
     "tip": "Astuce culturelle : les Japonais disent rarement « non » directement. 難しい (difficile) est la façon polie de dire « je ne peux pas »."
    },
    {
     "chunk": "来てもいいですか",
     "role": "« Est-ce que je peux venir ? »",
     "tip": "〜てもいいですか = est-ce que j'ai le droit de… ? Formule clé pour demander la permission : 写真を撮ってもいいですか？ = je peux prendre une photo ?"
    }
   ],
   "2": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, c'est noté. »",
     "tip": "Bien pour montrer que tu as compris l'horaire. Pour montrer ton envie de venir, tu pourrais ajouter ぜひ参加したいです (zehi sanka shitai desu) = j'aimerais beaucoup participer."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "LINEのIDを教えます",
     "role": "« Je te donne mon identifiant LINE. »",
     "tip": "教える = enseigner, mais aussi « donner une info » (numéro, adresse). Ça marche, mais au Japon on montre le plus souvent son QR code : はい、どうぞ (hai, douzo) en tendant le téléphone."
    }
   ],
   "2": [
    {
     "chunk": "LINEは持っていません",
     "role": "« Je n'ai pas LINE. »",
     "tip": "Au Japon, LINE remplace presque les SMS : clubs, profs, colocs, tout passe par là. Sans LINE, tu rateras les messages du club. Installe-le, et réponds plutôt もちろんです！ (mochiron desu !) = bien sûr !"
    }
   ]
  }
 },
 "coloc": {
  "1": {
   "1": [
    {
     "chunk": "こんにちは",
     "role": "« Bonjour. »",
     "tip": "Correct pour saluer, mais pour une première rencontre il manque le rituel : はじめまして (enchantée) + ton prénom + よろしくお願いします (je compte sur toi). Avec une future coloc, ce rituel compte beaucoup."
    }
   ],
   "2": [
    {
     "chunk": "フランスから来ました",
     "role": "« Je viens de France. »",
     "tip": "Info sympa, mais commence par l'essentiel : はじめまして、サンドリーヌです (hajimemashite, Sandorīnu desu). Le pays vient ensuite, quand on te le demande ou pour enchaîner."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "はい、お願いします",
     "role": "« Oui, s'il te plaît. »",
     "tip": "Simple et ouvert, ça marche très bien. Tu peux montrer encore plus d'intérêt avec 教えてください (oshiete kudasai) = explique-moi s'il te plaît."
    }
   ],
   "2": [
    {
     "chunk": "わかっています",
     "role": "« Je sais déjà. »",
     "tip": "Attention, ça peut sonner un peu sec, comme « pas besoin ». Et le tri des déchets change d'une ville à l'autre : même les Japonais qui déménagent doivent réapprendre ! Mieux vaut écouter : はい、教えてください."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord. »",
     "tip": "Parfait pour montrer que tu respecteras la règle. Pour aller plus loin et éviter les malentendus : 他にルールはありますか？ (hoka ni ruuru wa arimasu ka ?) = il y a d'autres règles ?"
    }
   ],
   "2": [
    {
     "chunk": "どうして",
     "role": "« Pourquoi ? »",
     "tip": "Seul, どうして？ peut sonner comme une contestation. Si tu veux vraiment savoir, adoucis : どうしてですか？ちょっと気になって… (doushite desu ka ? chotto ki ni natte…) = pourquoi ? je me demandais juste…"
    }
   ]
  }
 },
 "premiere-rencontre": {
  "1": {
   "1": [
    {
     "chunk": "少しだけ",
     "role": "« Juste un peu. »",
     "tip": "Modeste et naturel, les Japonais apprécient. Mais ajoute une phrase pour relancer, sinon la conversation s'arrête : まだ勉強中です (mada benkyouchuu desu) = j'apprends encore."
    }
   ],
   "2": [
    {
     "chunk": "日本語を話します",
     "role": "« Je parle japonais. »",
     "tip": "Grammaticalement juste, mais ça sonne comme « je maîtrise le japonais ». Pour une apprenante, 勉強中です (benkyouchuu desu) = je suis en train d'apprendre, est plus juste et plus sympathique."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "少しです",
     "role": "« Un peu (de temps). »",
     "tip": "La question était « combien de temps ? ». Donne un chiffre, c'est plus parlant : 6ヶ月くらいです (rokkagetsu kurai desu) = environ 6 mois. くらい = environ."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "Tu sais forcément depuis quand tu étudies ! わかりません peut donner l'impression que tu n'as pas compris la question. Réponds avec ton vrai chiffre : 〜ヶ月くらいです (〜kagetsu kurai desu)."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "サンドリーヌです",
     "role": "« Je suis Sandrine. »",
     "tip": "Exactement la bonne forme ! Il manque juste la relance : あなたのお名前は？ (anata no onamae wa ?) = et toi, comment tu t'appelles ? Sans ça, c'est l'autre qui doit relancer."
    }
   ],
   "2": [
    {
     "chunk": "私の名前は",
     "role": "« Mon nom est… »",
     "tip": "C'est la phrase des manuels, mais à l'oral personne ne la dit : ça sonne comme une fiche administrative. Les Japonais disent juste : サンドリーヌです (Sandorīnu desu)."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "ぜひ",
     "role": "« Avec plaisir ! / volontiers ! »",
     "tip": "ぜひ (zehi) = absolument, avec plaisir. Très enthousiaste et naturel. Pour finir en beauté, ajoute よろしくお願いします (yoroshiku onegaishimasu)."
    }
   ],
   "2": [
    {
     "chunk": "えーと",
     "role": "« Euh… » — le petit mot pour gagner du temps.",
     "tip": "えーと (eeto) est très naturel quand tu cherches tes mots, les Japonais l'utilisent tout le temps. Ici, ça fait juste un peu hésitant : tends ton QR code avec はい、どうぞ et c'est réglé."
    },
    {
     "chunk": "LINEはあります",
     "role": "« J'ai LINE. »",
     "tip": "Compris, mais ça répond à « as-tu LINE ? » alors qu'on te propose d'échanger. Dis plutôt もちろんです！ (mochiron desu !) = bien sûr !"
    }
   ]
  }
 },
 "cafe": {
  "1": {
   "1": [
    {
     "chunk": "ホットコーヒーをください",
     "role": "« Un café chaud, s'il vous plaît. »",
     "tip": "Phrase parfaite… pour le serveur ! Mais là c'est ton amie qui te demande ce que tu prends. Entre amis on dit 私はホットコーヒーにします (watashi wa hotto koohii ni shimasu) = moi je prends un café chaud. 〜にします = je choisis…"
    }
   ],
   "2": [
    {
     "chunk": "水をください",
     "role": "« De l'eau, s'il vous plaît. »",
     "tip": "Au Japon, l'eau est servie gratuitement dans presque tous les cafés et restaurants, pas besoin de la commander ! Et tu réponds au serveur, pas à ton amie. Choisis une boisson : 私も〜にします (watashi mo 〜 ni shimasu)."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "大丈夫です",
     "role": "« Ça va. »",
     "tip": "大丈夫 (daijoubu) est très pratique, mais ici il coupe un peu la conversation. Ton amie veut des nouvelles : ajoute un détail, par exemple 日本語の授業が大変です (nihongo no jugyou ga taihen desu) = les cours de japonais sont durs."
    }
   ],
   "2": [
    {
     "chunk": "大変です",
     "role": "« C'est dur. »",
     "tip": "大変 (taihen) = difficile, épuisant. Honnête et naturel. Pour garder une note positive, les Japonais ajoutent souvent が、楽しいです (ga, tanoshii desu) = mais c'est sympa."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "寿司が好きです",
     "role": "« J'aime les sushis. »",
     "tip": "Correct ! Pour relancer comme une vraie conversation, retourne la question : 〇〇さんは？ (〇〇-san wa ?) = et toi ? Et 特に (toku ni) = en particulier, pour préciser ton préféré."
    }
   ],
   "2": [
    {
     "chunk": "全部好きです",
     "role": "« J'aime tout. »",
     "tip": "全部 (zenbu) = tout. Gentil et souvent vrai ! Mais ça ne donne pas de prise pour continuer. Choisis un favori : ラーメンが一番好きです (raamen ga ichiban suki desu) = c'est les ramen que je préfère."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "いいですね",
     "role": "« Bonne idée ! »",
     "tip": "いいですね (ii desu ne) = super, ça me plaît ! Enthousiaste. Pour vraiment accepter, ajoute l'organisation : 何時にどこで会いましょうか？ (nanji ni doko de aimashou ka ?) = on se retrouve où et à quelle heure ?"
    }
   ],
   "2": [
    {
     "chunk": "少し考えます",
     "role": "« Je vais réfléchir un peu. »",
     "tip": "Attention : au Japon, « je vais réfléchir » est souvent une façon polie de dire non ! Ton amie risque de croire que tu refuses. Si tu as envie d'y aller : ぜひ行きたいです！ (zehi ikitai desu !)."
    }
   ]
  }
 },
 "soiree": {
  "1": {
   "1": [
    {
     "chunk": "ビールをください",
     "role": "« Une bière, s'il te plaît. » — tu demandes directement ce que tu veux.",
     "tip": "Ça marche très bien en fête ! Petite nuance : ください sonne un peu « client au bar ». Entre amis, tu peux dire ビールある？ (biiru aru?) = « il y a de la bière ? », plus détendu."
    }
   ],
   "2": [
    {
     "chunk": "大丈夫です",
     "role": "« Ça va. » — mais ici, ça peut vouloir dire « non merci ».",
     "tip": "Piège classique : au Japon, 大丈夫です en réponse à une offre veut souvent dire « je n'en ai pas besoin ». Ton hôte risque de ne rien te servir ! Si tu veux boire : まだです (mada desu) = « pas encore »."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "サンドリーヌです",
     "role": "« Je suis Sandrine. » — la base pour dire ton prénom.",
     "tip": "Parfait pour commencer. Prénom + です, c'est tout ce qu'il faut."
    },
    {
     "chunk": "フランス人です",
     "role": "« Je suis française. »",
     "tip": "Correct, mais les gens vont vouloir savoir ce que tu fais au Japon. Ajoute 留学生です (ryuugakusei desu) = « je suis étudiante en échange » : ça lance tout de suite la conversation."
    }
   ],
   "2": [
    {
     "chunk": "こんにちは",
     "role": "« Bonjour. »",
     "tip": "Gentil, mais quand on te demande de te présenter, on attend au moins ton prénom. La formule minimale : サンドリーヌです。よろしく！ (Sandoriinu desu. Yoroshiku!)."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "ありがとうございます",
     "role": "« Merci beaucoup. » — poli, mais à côté de la situation.",
     "tip": "Quand quelqu'un lance 乾杯しましょう, tout le monde lève son verre et crie la même chose : 乾杯！ (kanpai!). Un « merci » à ce moment-là sonne trop sérieux."
    }
   ],
   "2": [
    {
     "chunk": "いただきます",
     "role": "« Je reçois avec gratitude. » — la phrase qu'on dit avant de MANGER.",
     "tip": "Très bon réflexe, mais pas le bon moment ! いただきます = avant le repas. Pour trinquer avec un verre, c'est 乾杯！ (kanpai!). Retiens : verre levé → 乾杯, baguettes en main → いただきます."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "いいです",
     "role": "« C'est bien. »",
     "tip": "Positif, mais un peu court : ça peut même sonner comme « ça va, sans plus ». Ajoute du concret : 人が親切です (hito ga shinsetsu desu) = « les gens sont gentils ». Les Japonais adorent entendre ce que tu aimes chez eux."
    }
   ],
   "2": [
    {
     "chunk": "難しいです",
     "role": "« C'est difficile. »",
     "tip": "Honnête, mais ton interlocuteur ne sait pas de quoi tu parles. Précise : 日本語が難しいです (nihongo ga muzukashii desu) = « le japonais est difficile ». Et commence par un point positif, c'est plus chaleureux."
    }
   ]
  }
 },
 "stage": {
  "1": {
   "1": [
    {
     "chunk": "はじめまして",
     "role": "« Enchantée. » — la première phrase quand on rencontre quelqu'un.",
     "tip": "Parfait pour ouvrir."
    },
    {
     "chunk": "よろしくお願いします",
     "role": "« Je compte sur vous / ravie de travailler avec vous. »",
     "tip": "Bien, mais il manque ton nom ! Au travail, on se présente avec と申します : サンドリーヌと申します (Sandoriinu to moushimasu) = « je m'appelle Sandrine », en version modeste et pro."
    }
   ],
   "2": [
    {
     "chunk": "よろしく",
     "role": "« Salut, ravie ! » — la version copain.",
     "tip": "Entre étudiants, c'est parfait. Mais le premier jour au bureau, ça sonne trop familier. Dis la formule complète : よろしくお願いします (yoroshiku onegaishimasu)."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "フランスから来た学生です",
     "role": "« Je suis une étudiante venue de France. »",
     "tip": "Correct ! Au travail on attend juste un peu plus : ton université et ta spécialité. Par exemple : 経済学を専攻しています (keizaigaku wo senkou shite imasu) = « j'étudie l'économie »."
    }
   ],
   "2": [
    {
     "chunk": "よろしくお願いします",
     "role": "« Ravie de travailler avec vous. » — la formule de fin de présentation.",
     "tip": "C'est la phrase qui CONCLUT une présentation, elle ne la remplace pas. Ton manager attend d'abord qui tu es : nom, d'où tu viens, ce que tu étudies. Puis tu termines par よろしくお願いします."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, compris. »",
     "tip": "Bonne réponse, tu montres que tu as entendu."
    },
    {
     "chunk": "聞きます",
     "role": "« Je demanderai. »",
     "tip": "Positif ! Encore mieux : poser tout de suite une vraie question, ça montre ta motivation. Par exemple : 聞いてもよろしいですか？ (kiite mo yoroshii desu ka?) = « puis-je vous demander quelque chose ? »."
    }
   ],
   "2": [
    {
     "chunk": "大丈夫です",
     "role": "« Ça va. » — ici, ça sonne comme « je n'ai pas besoin d'aide ».",
     "tip": "Au Japon, un stagiaire qui pose des questions est vu comme sérieux, pas comme faible. Réponds plutôt ありがとうございます (arigatou gozaimasu) et n'hésite pas à demander dès que tu bloques."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "さようなら",
     "role": "« Au revoir. » — mais avec une idée de séparation longue.",
     "tip": "Surprise : les Japonais disent rarement さようなら à des collègues qu'ils revoient demain, ça sonne presque comme un adieu. Au bureau, la formule du soir : お疲れ様でした (otsukaresama deshita) = « merci pour ta journée de travail »."
    }
   ],
   "2": [
    {
     "chunk": "ありがとうございました",
     "role": "« Merci beaucoup (pour ce qui s'est passé). »",
     "tip": "Poli et gentil, mais au bureau le soir on attend お疲れ様でした (otsukaresama deshita). C'est LA phrase de fin de journée : elle reconnaît l'effort de chacun. Tu l'entendras des dizaines de fois."
    }
   ]
  }
 },
 "bureau-service": {
  "1": {
   "1": [
    {
     "chunk": "何？",
     "role": "« Quoi ? » — très direct.",
     "tip": "Entre amis proches, ça passe. Au travail, ça sonne sec, presque agacé. Version polie : はい、どうしましたか？ (hai, dou shimashita ka?) = « oui, qu'est-ce qu'il y a ? »."
    }
   ],
   "2": [
    {
     "chunk": "はい",
     "role": "« Oui. »",
     "tip": "Correct et poli. Pour montrer que tu es vraiment disponible, ajoute une relance : どうしましたか？ (dou shimashita ka?) = « qu'est-ce qu'il se passe ? ». Ton collègue se sentira bien accueilli."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, compris. »",
     "tip": "Parfait dans la vie de tous les jours. En entreprise, quand un supérieur te confie une tâche, on dit souvent 承知しました (shouchi shimashita) = « bien noté », plus professionnel."
    }
   ],
   "2": [
    {
     "chunk": "今は無理です",
     "role": "« Là, maintenant, c'est impossible. »",
     "tip": "Le mot 無理 (muri) est très cash. Si tu as vraiment une contrainte, adoucis et propose une solution : 今ちょっと手が離せないので、30分後でもいいですか？ (ima chotto te ga hanasenai node, sanjuppun go demo ii desu ka?) = « je suis un peu occupée, dans 30 minutes ça irait ? »."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "はい、大丈夫です",
     "role": "« Oui, c'est bon. »",
     "tip": "Très bien si tout est prêt ! Pour aller plus loin, propose ton aide : 何か必要なものはありますか？ (nanika hitsuyou na mono wa arimasu ka?) = « vous avez besoin de quelque chose ? »."
    }
   ],
   "2": [
    {
     "chunk": "まだです",
     "role": "« Pas encore. »",
     "tip": "Honnête, et au Japon dire la vérité tôt vaut mieux que de cacher un retard."
    },
    {
     "chunk": "あと10分ください",
     "role": "« Donnez-moi encore 10 minutes. »",
     "tip": "Clair et précis, c'est bien ! Version un peu plus douce : あと10分ほどいただけますか？ (ato juppun hodo itadakemasu ka?) = « pourrais-je avoir environ 10 minutes de plus ? »."
    }
   ]
  }
 },
 "temple": {
  "1": {
   "1": [
    {
     "chunk": "一人分をください",
     "role": "« Pour une personne, s'il vous plaît. »",
     "tip": "Clair, ça marche. Pense juste au paiement : beaucoup de temples n'acceptent que le liquide. Demande : カードで払えますか？ (kaado de haraemasu ka?) = « je peux payer par carte ? »."
    }
   ],
   "2": [
    {
     "chunk": "安くなりますか？",
     "role": "« Ça peut être moins cher ? »",
     "tip": "Phrase utile au marché aux puces, mais pas dans un temple : le prix d'entrée est fixe et marchander serait gênant. Si tu es étudiante, demande plutôt : 学生割引はありますか？ (gakusei waribiki wa arimasu ka?) = « il y a un tarif étudiant ? »."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "わかりました",
     "role": "« D'accord, compris. »",
     "tip": "Parfait, tu respectes la règle. Si tu veux quand même des photos, demande où c'est permis : 庭は撮影できますか？ (niwa wa satsuei dekimasu ka?) = « on peut photographier le jardin ? »."
    }
   ],
   "2": [
    {
     "chunk": "どうして？",
     "role": "« Pourquoi ? »",
     "tip": "En France, demander pourquoi est normal. Ici, ça peut sonner comme une contestation de la règle. Accepte avec わかりました (wakarimashita) : c'est un signe de respect pour le lieu."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "英語でお願いします",
     "role": "« En anglais, s'il vous plaît. »",
     "tip": "Simple et efficace. Mais les grands temples de Kyoto ont souvent une brochure en français ! Demande d'abord : フランス語はありますか？ (furansugo wa arimasu ka?)."
    }
   ],
   "2": [
    {
     "chunk": "日本語でいいです",
     "role": "« Le japonais, ça ira. »",
     "tip": "Courageux et ça fait plaisir à entendre ! Ne le dis que si tu peux vraiment lire le texte. Le いいです ici veut dire « ça me convient »."
    }
   ]
  }
 },
 "matcha": {
  "1": {
   "1": [
    {
     "chunk": "抹茶ください",
     "role": "« Du matcha, s'il vous plaît. »",
     "tip": "Ça se comprend, mais dans une boutique spécialisée il y a des dizaines de matchas ! Le vendeur va te demander lequel. Gagne du temps en disant à quoi il te sert : ラテ用です (rate you desu) = « c'est pour des lattes »."
    }
   ],
   "2": [
    {
     "chunk": "一番いい抹茶",
     "role": "« Le meilleur matcha. »",
     "tip": "一番 (ichiban) = « numéro un, le plus ». Mais « le meilleur » dépend de l'usage : cérémonie, latte, pâtisserie… Et souvent, « le meilleur » = le plus cher ! Dis plutôt ce que tu veux en faire."
    },
    {
     "chunk": "どれですか",
     "role": "« Lequel est-ce ? »",
     "tip": "どれ = lequel (parmi plusieurs). Très utile en boutique : おすすめはどれですか？ (osusume wa dore desu ka?) = « lequel me recommandez-vous ? »."
    }
   ]
  },
  "3": {
   "1": [
    {
     "chunk": "宇治がいいです",
     "role": "« Je voudrais de l'Uji. »",
     "tip": "〜がいいです = « je préfère ~ ». Correct, mais le vendeur te demandait tes goûts pour bien conseiller. Ajoute ce que tu aimes : まろやかなのが好きです (maroyaka na no ga suki desu) = « j'aime ce qui est doux »."
    }
   ],
   "2": [
    {
     "chunk": "わかりません",
     "role": "« Je ne sais pas. »",
     "tip": "C'est honnête, mais ça arrête la conversation. Même sans connaître les variétés, tu peux donner une piste : 詳しくないんですが、まろやかなのが好きです (kuwashiku nai n desu ga, maroyaka na no ga suki desu) = « je n'y connais pas grand-chose, mais j'aime le doux »."
    }
   ]
  },
  "5": {
   "1": [
    {
     "chunk": "それをください",
     "role": "« Je vais prendre celui-là. »",
     "tip": "Efficace pour acheter ! Mais tu rates une belle occasion de parler avec un passionné. Les vendeurs de thé à Kyoto adorent partager leur façon de le boire."
    }
   ],
   "2": [
    {
     "chunk": "高いですか？",
     "role": "« C'est cher ? »",
     "tip": "Un peu abrupt juste après une recommandation sincère. Pour connaître le prix poliment : おいくらですか？ (oikura desu ka?) = « combien coûte-t-il ? »."
    }
   ]
  },
  "7": {
   "1": [
    {
     "chunk": "フランスです",
     "role": "« (Je viens de) France. »",
     "tip": "Compris, mais court. Ajoute pourquoi tu es là : 京大の留学生です (Kyoudai no ryuugakusei desu) = « je suis étudiante en échange à l'université de Kyoto ». 京大 est le surnom que tout le monde utilise."
    }
   ],
   "2": [
    {
     "chunk": "パリ",
     "role": "« Paris. »",
     "tip": "Un seul mot, c'est un peu sec : le vendeur cherche à faire connaissance. Donne une phrase complète : パリから来ました (Pari kara kimashita) = « je viens de Paris »."
    }
   ]
  },
  "9": {
   "1": [
    {
     "chunk": "ありがとう",
     "role": "« Merci. » — la version familière.",
     "tip": "Gentil, mais avec un commerçant on ajoute ございます : ありがとうございます. Et propose de revenir pour garder le lien : また来ます！ (mata kimasu!) = « je reviendrai ! »."
    }
   ],
   "2": [
    {
     "chunk": "日本語は下手です",
     "role": "« Mon japonais est mauvais. »",
     "tip": "Ton intention modeste est bonne, mais c'est un peu trop dur avec toi-même. La réponse naturelle à un compliment : いいえ、まだまだです (iie, madamada desu) = « oh non, j'ai encore beaucoup à apprendre »."
    }
   ]
  }
 }
};
