export const SEED_PACK = [
    {jp:`こんにちは`,romaji:`Konnichiwa`,fr:`Bonjour (journée)`,tag:`général`,level:`A0`,ex:`Bloc figé, ne s'analyse pas. Vient de « 今日は… » (quant à aujourd'hui…), une phrase laissée en suspens. S'emploie ≈ de midi à 17h.`},
    {jp:`おはようございます`,romaji:`Ohayou gozaimasu`,fr:`Bonjour (matin)`,tag:`général`,level:`A0`,ex:`De 早い (hayai = tôt) + ございます (forme ultra-polie). Entre proches, on garde juste おはよう.`},
    {jp:`こんばんは`,romaji:`Konbanwa`,fr:`Bonsoir`,tag:`général`,level:`A0`,ex:`Même logique que こんにちは : « 今晩は… » (quant à ce soir…), phrase tronquée figée.`},
    {jp:`さようなら`,romaji:`Sayounara`,fr:`Au revoir`,tag:`général`,level:`A0`,ex:`Adieu plutôt solennel / pour une longue séparation. Entre amis c'est trop fort — préfère またね.`},
    {jp:`またね`,romaji:`Mata ne`,fr:`À plus`,tag:`général`,level:`A0`,ex:`また (encore) + ね (particule de connivence). « à se revoir, hein ».`},
    {jp:`ありがとうございます`,romaji:`Arigatou gozaimasu`,fr:`Merci beaucoup`,tag:`général`,level:`A0`,ex:`ありがとう vient de 有り難い (« difficile à obtenir » = précieux). + ございます = politesse. On enlève ございます entre proches.`},
    {jp:`すみません`,romaji:`Sumimasen`,fr:`Excusez-moi / Pardon`,tag:`général`,level:`A0`,ex:`Couteau suisse : s'excuser, remercier, ET appeler quelqu'un. Forme de 済む (« ne pas être réglé »).`},
    {jp:`ごめんなさい`,romaji:`Gomen nasai`,fr:`Désolé(e)`,tag:`général`,level:`A0`,ex:`Excuse plus personnelle/sincère que すみません. Entre proches : juste ごめん.`},
    {jp:`お願いします`,romaji:`Onegaishimasu`,fr:`S'il vous plaît`,tag:`général`,level:`A0`,ex:`お (préfixe poli) + 願い (souhait) + します (faire). Formule magique pour demander n'importe quoi.`},
    {jp:`はい`,romaji:`Hai`,fr:`Oui`,tag:`général`,level:`A0`,ex:`Sert aussi de « je t'écoute / présent ». Familier : うん.`},
    {jp:`いいえ`,romaji:`Iie`,fr:`Non`,tag:`général`,level:`A0`,ex:`Non poli. À l'oral on entend souvent ううん (familier).`},
    {jp:`わかりました`,romaji:`Wakarimashita`,fr:`J'ai compris / OK`,tag:`général`,level:`A0`,ex:`Passé poli de わかる (comprendre). Le passé -ました marque ici « c'est compris, c'est acté ».`},
    {jp:`わかりません`,romaji:`Wakarimasen`,fr:`Je ne comprends pas`,tag:`général`,level:`A0`,ex:`Négatif poli de わかる : -ます → -ません. À ne pas confondre avec できません (je ne peux pas).`},
    {jp:`いただきます`,romaji:`Itadakimasu`,fr:`(avant de manger)`,tag:`général`,level:`A0`,ex:`Forme humble de « recevoir/manger ». Se dit avant le repas, mains jointes : « je reçois (cette nourriture) ».`},
    {jp:`ごちそうさまでした`,romaji:`Gochisousama deshita`,fr:`(après le repas)`,tag:`général`,level:`A0`,ex:`ご馳走 (festin) + さま (respect) + でした (passé poli). Remercie pour le repas terminé.`},
    {jp:`いち、に、さん`,romaji:`Ichi, ni, san`,fr:`1, 2, 3`,tag:`général`,level:`A0`,ex:`Lecture sino-japonaise, celle des prix et des comptes.`},
    {jp:`し / よん、ご`,romaji:`Shi / yon, go`,fr:`4, 5`,tag:`général`,level:`A0`,ex:`4 a deux lectures : し (évitée car homophone de 死 = mort) et よん (préférée).`},
    {jp:`ろく、なな / しち`,romaji:`Roku, nana / shichi`,fr:`6, 7`,tag:`général`,level:`A0`,ex:`7 = なな (clair à l'oral) ou しち.`},
    {jp:`はち、きゅう、じゅう`,romaji:`Hachi, kyuu, juu`,fr:`8, 9, 10`,tag:`général`,level:`A0`,ex:`11 = じゅういち (10+1), 20 = にじゅう (2×10). Le système est régulier ensuite.`},
    {jp:`ひゃく`,romaji:`Hyaku`,fr:`100`,tag:`général`,level:`A0`,ex:`300 = さんびゃく, 600/800 changent de son (irréguliers). 100 = juste ひゃく.`},
    {jp:`せん`,romaji:`Sen`,fr:`1000`,tag:`général`,level:`A0`,ex:`3000 = さんぜん. Les prix courants au Japon : 千円 (sen-en) = 1000 yens.`},
    {jp:`まん`,romaji:`Man`,fr:`10 000`,tag:`général`,level:`A0`,ex:`Attention : le japonais compte par tranches de 10 000, pas de 1000. 一万円 = 10 000 yens (le gros billet).`},
    {jp:`いくらですか？`,romaji:`Ikura desu ka?`,fr:`Combien ça coûte ?`,tag:`général`,level:`A0`,ex:`いくら (combien, pour l'argent) + です + か (marqueur de question). か à l'oral remplace le point d'interrogation.`},
    {jp:`円`,romaji:`En`,fr:`Yen`,tag:`général`,level:`A0`,ex:`Se place APRÈS le nombre : 500円 = gohyaku-en. Prononcé « en », pas « yen ».`},
    {jp:`今何時ですか？`,romaji:`Ima nanji desu ka?`,fr:`Il est quelle heure ?`,tag:`général`,level:`A0`,ex:`今 (ima = maintenant) + 何時 (nanji = quelle heure) + ですか. 何 (nani/nan) = « quoi/combien ».`},
    {jp:`〜はどこですか？`,romaji:`~ wa doko desu ka?`,fr:`Où est ~ ?`,tag:`voyage`,level:`A0`,ex:`Squelette réutilisable : [thème] + は (wa) + どこ (où) + ですか. Remplace le ~ par n'importe quel lieu.`},
    {jp:`トイレはどこですか？`,romaji:`Toire wa doko desu ka?`,fr:`Où sont les toilettes ?`,tag:`voyage`,level:`A0`,ex:`トイレ (katakana, de l'anglais « toilet ») + le squelette ci-dessus. La phrase de survie nº1.`},
    {jp:`ここに行きたいです`,romaji:`Koko ni ikitai desu`,fr:`Je veux aller ici`,tag:`voyage`,level:`A0`,ex:`ここ (ici) + に (direction) + 行きたい (vouloir aller : 行く + たい) + です. Montre l'adresse sur ton téléphone en le disant.`},
    {jp:`駅`,romaji:`Eki`,fr:`La gare`,tag:`voyage`,level:`A0`,ex:`Kanji partout sur les panneaux : 京都駅 = gare de Kyoto. À reconnaître absolument.`},
    {jp:`一人です`,romaji:`Hitori desu`,fr:`Je suis seul(e)`,tag:`voyage`,level:`A0`,ex:`一人 (hitori, compteur de personnes, irrégulier) + です. Pas de « je » : le contexte suffit.`},
    {jp:`二人です`,romaji:`Futari desu`,fr:`On est deux`,tag:`voyage`,level:`A0`,ex:`二人 (futari, irrégulier comme hitori). À partir de 3 c'est régulier : 三人 (san-nin).`},
    {jp:`パスポート`,romaji:`Pasupooto`,fr:`Passeport`,tag:`voyage`,level:`A0`,ex:`Emprunt anglais → katakana. Les ー allongent la voyelle (pa-su-pôô-to).`},
    {jp:`助けてください`,romaji:`Tasukete kudasai`,fr:`Aidez-moi`,tag:`voyage`,level:`A0`,ex:`助けて (forme -て de 助ける = aider) + ください. Structure clé : [verbe en -て] + ください = « fais X, s'il te plaît ».`},
    {jp:`私は〜です`,romaji:`Watashi wa ~ desu`,fr:`Je suis ~`,tag:`relation`,level:`A0`,ex:`私 (watashi = je) + は (thème) + [nom] + です. Le squelette de toute auto-présentation.`},
    {jp:`フランスから来ました`,romaji:`Furansu kara kimashita`,fr:`Je viens de France`,tag:`relation`,level:`A0`,ex:`フランス + から (depuis) + 来ました (passé poli de 来る = venir). Ordre : lieu + depuis + verbe (toujours en dernier).`},
    {jp:`〜歳です`,romaji:`~ sai desu`,fr:`J'ai ~ ans`,tag:`relation`,level:`A0`,ex:`歳 (sai = compteur d'âge). Exception célèbre : 20 ans = はたち (hatachi), pas にじゅっさい.`},
    {jp:`よろしくお願いします`,romaji:`Yoroshiku onegaishimasu`,fr:`Ravi de te connaître`,tag:`relation`,level:`A0`,ex:`Rituel intraduisible : « comptez sur moi / soyons bien ensemble ». TOUJOURS après s'être présenté, sinon ça paraît froid.`},
    {jp:`お名前は何ですか？`,romaji:`Onamae wa nan desu ka?`,fr:`Quel est votre nom ?`,tag:`relation`,level:`A0`,ex:`お (préfixe poli) + 名前 (nom) + は + 何 (nan = quoi) + ですか. Entre jeunes, plus relax : 名前は？`},

    {jp:`学生です`,romaji:`Gakusei desu`,fr:`Je suis étudiant(e)`,tag:`étude`,level:`A1`,ex:`学生 (étudiant) + です. です = « c'est / je suis », invariable en genre et nombre.`},
    {jp:`交換留学生です`,romaji:`Koukan ryuugakusei desu`,fr:`Je suis en échange`,tag:`étude`,level:`A1`,ex:`交換 (échange) + 留学生 (étudiant à l'étranger). Deux mots collés = un seul concept.`},
    {jp:`大学`,romaji:`Daigaku`,fr:`Université`,tag:`étude`,level:`A1`,ex:`大 (grand) + 学 (étude). 高校 = lycée, 中学 = collège. Le 学 (étude) revient partout.`},
    {jp:`〜を専攻しています`,romaji:`~ wo senkou shite imasu`,fr:`Je me spécialise en ~`,tag:`étude`,level:`A1`,ex:`を (particule d'objet) + 専攻 (spécialité) + しています (forme -te iru = état/action en cours).`},
    {jp:`授業`,romaji:`Jugyou`,fr:`Cours`,tag:`étude`,level:`A1`,ex:`授業に出る = assister au cours. 授業中 = pendant le cours.`},
    {jp:`先生`,romaji:`Sensei`,fr:`Professeur`,tag:`étude`,level:`A1`,ex:`Litt. « né avant ». Désigne aussi médecins, maîtres, mentors. Jamais pour parler de soi.`},
    {jp:`宿題`,romaji:`Shukudai`,fr:`Devoirs`,tag:`étude`,level:`A1`,ex:`宿題をする = faire ses devoirs.`},
    {jp:`もう一度説明してもらえますか？`,romaji:`Mou ichido setsumei shite moraemasu ka?`,fr:`Pouvez-vous ré-expliquer ?`,tag:`étude`,level:`A1`,ex:`もう一度 (encore une fois) + 説明して (forme -て) + もらえますか (potentiel de もらう). Structure [-て]+もらえますか = « puis-je recevoir que vous… ? » = demande polie d'un service.`},
    {jp:`〜はどういう意味ですか？`,romaji:`~ wa dou iu imi desu ka?`,fr:`Que signifie ~ ?`,tag:`étude`,level:`A1`,ex:`どういう (quel genre de) + 意味 (sens) + ですか. La phrase pour apprendre en immersion.`},
    {jp:`試験`,romaji:`Shiken`,fr:`Examen`,tag:`étude`,level:`A1`,ex:`テスト (de l'anglais « test ») est aussi courant pour les petits contrôles.`},
    {jp:`会社`,romaji:`Kaisha`,fr:`Entreprise`,tag:`travail`,level:`A1`,ex:`会社員 (kaishain) = employé de bureau, salarié.`},
    {jp:`仕事`,romaji:`Shigoto`,fr:`Travail / Boulot`,tag:`travail`,level:`A1`,ex:`仕事をする = travailler. お仕事 (avec お poli) pour parler du travail d'autrui.`},
    {jp:`〜で働いています`,romaji:`~ de hataraite imasu`,fr:`Je travaille chez/à ~`,tag:`travail`,level:`A1`,ex:`で (lieu de l'action) + 働く (travailler) + ています (état durable). で = « là où se passe l'action ».`},
    {jp:`会議`,romaji:`Kaigi`,fr:`Réunion`,tag:`travail`,level:`A1`,ex:`会議室 = salle de réunion (室 = pièce).`},
    {jp:`名刺`,romaji:`Meishi`,fr:`Carte de visite`,tag:`travail`,level:`A1`,ex:`Rituel d'échange codifié : on la reçoit à deux mains, on la regarde, on ne la range pas tout de suite.`},
    {jp:`上司`,romaji:`Joushi`,fr:`Supérieur hiérarchique`,tag:`travail`,level:`A1`,ex:`上 (haut). À l'inverse, 部下 (buka) = subordonné.`},
    {jp:`同僚`,romaji:`Douryou`,fr:`Collègue`,tag:`travail`,level:`A1`,ex:`同 (même) + 僚 (compagnon).`},
    {jp:`何時に始まりますか？`,romaji:`Nanji ni hajimarimasu ka?`,fr:`Ça commence à quelle heure ?`,tag:`travail`,level:`A1`,ex:`何時 (quelle heure) + に (moment précis) + 始まる (commencer, intransitif) + ますか. に marque l'heure exacte.`},
    {jp:`お疲れ様です`,romaji:`Otsukaresama desu`,fr:`(salut collègue / merci du travail)`,tag:`travail`,level:`A1`,ex:`Litt. « tu as dû être fatigué (par l'effort) ». Sert de bonjour, d'au revoir et de merci entre collègues.`},
    {jp:`このバスは〜に止まりますか？`,romaji:`Kono basu wa ~ ni tomarimasu ka?`,fr:`Ce bus s'arrête à ~ ?`,tag:`voyage`,level:`A1`,ex:`この (ce) + は (thème) + に (point d'arrêt) + 止まる (s'arrêter) + ますか.`},
    {jp:`〜まで行きたいんですが`,romaji:`~ made ikitain desu ga`,fr:`Je voudrais aller à ~`,tag:`voyage`,level:`A1`,ex:`まで (jusqu'à) + 行きたい + んです (nuance explicative) + が. Le が final laisse la phrase ouverte = « …et donc, pouvez-vous m'aider ? ». Très poli.`},
    {jp:`予約しています`,romaji:`Yoyaku shite imasu`,fr:`J'ai une réservation`,tag:`voyage`,level:`A1`,ex:`予約 (réservation) + しています. La forme -te iru exprime ici l'état résultant : « c'est réservé ».`},
    {jp:`ホテル`,romaji:`Hoteru`,fr:`Hôtel`,tag:`voyage`,level:`A1`,ex:`Emprunt. 旅館 (ryokan) = auberge traditionnelle japonaise.`},
    {jp:`何泊ですか？`,romaji:`Nanpaku desu ka?`,fr:`Combien de nuits ?`,tag:`voyage`,level:`A1`,ex:`何 (combien) + 泊 (compteur de nuitées) + ですか. 一泊 = 1 nuit, 二泊 = 2 nuits.`},
    {jp:`チェックインお願いします`,romaji:`Chekku-in onegaishimasu`,fr:`L'enregistrement svp`,tag:`voyage`,level:`A1`,ex:`Emprunt « check-in » + お願いします. Pour partir : チェックアウト.`},
    {jp:`Wi-Fiはありますか？`,romaji:`Wi-Fi wa arimasu ka?`,fr:`Il y a du Wi-Fi ?`,tag:`voyage`,level:`A1`,ex:`は + あります (il y a, pour choses inanimées) + か. Pour les êtres vivants, on utiliserait います.`},
    {jp:`趣味は何ですか？`,romaji:`Shumi wa nan desu ka?`,fr:`Quel est ton hobby ?`,tag:`relation`,level:`A1`,ex:`趣味 (hobby) + は + 何 + ですか. Question d'ouverture sociale classique.`},
    {jp:`〜が好きです`,romaji:`~ ga suki desu`,fr:`J'aime ~`,tag:`relation`,level:`A1`,ex:`が (sujet de l'émotion) + 好き (« aimé ») + です. Attention : 好き est un adjectif, pas un verbe — d'où です et non un verbe « aimer ».`},
    {jp:`〜が苦手です`,romaji:`~ ga nigate desu`,fr:`Je n'aime pas trop ~`,tag:`relation`,level:`A1`,ex:`苦手 = « pas doué / peu friand ». Plus doux et poli que 嫌い (détester) — préféré socialement.`},
    {jp:`LINE交換しよう`,romaji:`LINE koukan shiyou`,fr:`On échange nos LINE ?`,tag:`relation`,level:`A1`,ex:`交換 (échange) + しよう (forme volitive familière de する = « faisons-le »). LINE se prononce « rain ».`},
    {jp:`一緒に行きませんか？`,romaji:`Issho ni ikimasen ka?`,fr:`On y va ensemble ?`,tag:`relation`,level:`A1`,ex:`一緒に (ensemble) + 行きませんか (négatif interrogatif). Inviter par la négation = forme polie typiquement japonaise.`},
    {jp:`元気ですか？`,romaji:`Genki desu ka?`,fr:`Tu vas bien ?`,tag:`relation`,level:`A1`,ex:`元気 (en forme, plein d'énergie) + ですか. Note : moins automatique qu'en France, on ne le dit pas à chaque rencontre.`},
    {jp:`元気です`,romaji:`Genki desu`,fr:`Je vais bien`,tag:`relation`,level:`A1`,ex:`Réponse simple. Variante modeste : まあまあ (couci-couça).`},

    {jp:`道に迷いました`,romaji:`Michi ni mayoimashita`,fr:`Je me suis perdu(e)`,tag:`voyage`,level:`A2`,ex:`道 (chemin) + に + 迷う (se perdre) au passé poli. に marque ici le « dans quoi » on se perd.`},
    {jp:`〜行きの電車はどれですか？`,romaji:`~ iki no densha wa dore desu ka?`,fr:`Quel train va à ~ ?`,tag:`voyage`,level:`A2`,ex:`〜行き (à destination de) + の (lien) + 電車 + は + どれ (lequel, parmi plusieurs) + ですか.`},
    {jp:`乗り換えが必要ですか？`,romaji:`Norikae ga hitsuyou desu ka?`,fr:`Faut-il changer ?`,tag:`voyage`,level:`A2`,ex:`乗り換え (correspondance) + が + 必要 (nécessaire) + ですか. 必要 est un adjectif-な.`},
    {jp:`忘れ物をしました`,romaji:`Wasuremono wo shimashita`,fr:`J'ai oublié quelque chose`,tag:`voyage`,level:`A2`,ex:`忘れ物 (objet oublié) + を + しました. Litt. « j'ai fait un oubli ».`},
    {jp:`返金できますか？`,romaji:`Henkin dekimasu ka?`,fr:`Puis-je être remboursé ?`,tag:`voyage`,level:`A2`,ex:`返金 (remboursement) + できますか (potentiel de する = « est-ce faisable ? »).`},
    {jp:`故障しています`,romaji:`Koshou shite imasu`,fr:`C'est en panne`,tag:`voyage`,level:`A2`,ex:`故障 (panne) + しています. -te iru décrit l'état actuel résultant.`},
    {jp:`具合が悪いです`,romaji:`Guai ga warui desu`,fr:`Je ne me sens pas bien`,tag:`voyage`,level:`A2`,ex:`具合 (état de santé) + が + 悪い (mauvais, adjectif-i) + です.`},
    {jp:`病院はどこですか？`,romaji:`Byouin wa doko desu ka?`,fr:`Où est l'hôpital ?`,tag:`voyage`,level:`A2`,ex:`Piège : 病院 (byouin = hôpital) vs 美容院 (biyouin = salon de coiffure). Une voyelle change tout !`},
    {jp:`〜アレルギーがあります`,romaji:`~ arerugii ga arimasu`,fr:`J'ai une allergie à ~`,tag:`voyage`,level:`A2`,ex:`アレルギー (emprunt) + が + あります. Ex : ナッツアレルギー = allergie aux noix. Vital au restaurant.`},
    {jp:`〜さんはいらっしゃいますか？`,romaji:`~ san wa irasshaimasu ka?`,fr:`M./Mme ~ est là ?`,tag:`travail`,level:`A2`,ex:`いらっしゃる = forme honorifique de いる (être présent). Pour parler d'autrui avec respect, ex. au téléphone.`},
    {jp:`後で電話します`,romaji:`Atode denwa shimasu`,fr:`Je rappelle plus tard`,tag:`travail`,level:`A2`,ex:`後で (plus tard) + 電話 (téléphone) + します. 電話する = téléphoner.`},
    {jp:`来週まで待てますか？`,romaji:`Raishuu made matemasu ka?`,fr:`Pouvez-vous attendre la semaine prochaine ?`,tag:`travail`,level:`A2`,ex:`来週 (semaine prochaine) + まで (jusqu'à) + 待てます (potentiel de 待つ = pouvoir attendre) + か.`},
    {jp:`確認させてください`,romaji:`Kakunin sasete kudasai`,fr:`Laissez-moi vérifier`,tag:`travail`,level:`A2`,ex:`確認 (vérification) + させて (causatif-て de する) + ください. させてください = « permettez que je fasse ».`},
    {jp:`〜について相談したいです`,romaji:`~ ni tsuite soudan shitai desu`,fr:`Je voudrais discuter de ~`,tag:`travail`,level:`A2`,ex:`について (au sujet de) + 相談 (consultation) + したい (vouloir faire). について s'accroche à un thème.`},
    {jp:`締め切り`,romaji:`Shimekiri`,fr:`Date limite`,tag:`travail`,level:`A2`,ex:`Litt. « fermer-couper ». Plus formel : 期限 (kigen).`},
    {jp:`休みを取りたいです`,romaji:`Yasumi wo toritai desu`,fr:`Je voudrais un congé`,tag:`travail`,level:`A2`,ex:`休み (repos/congé) + を + 取りたい (vouloir prendre : 取る + たい).`},
    {jp:`出張`,romaji:`Shucchou`,fr:`Déplacement pro`,tag:`travail`,level:`A2`,ex:`出 (sortir) + 張 (étendre). 出張する = partir en déplacement.`},
    {jp:`サークルに入りたいんですが`,romaji:`Saakuru ni hairitain desu ga`,fr:`Je voudrais rejoindre un club`,tag:`étude`,level:`A2`,ex:`サークル (club étudiant) + に + 入りたい (vouloir entrer) + んですが (ouverture polie). LA phrase pour se faire des amis à la fac.`},
    {jp:`一緒に勉強しない？`,romaji:`Issho ni benkyou shinai?`,fr:`On révise ensemble ?`,tag:`étude`,level:`A2`,ex:`勉強しない ? = négatif familier de 勉強する. La négation interrogative = invitation douce.`},
    {jp:`課題いつまでですか？`,romaji:`Kadai itsu made desu ka?`,fr:`Le devoir est pour quand ?`,tag:`étude`,level:`A2`,ex:`課題 (devoir/tâche) + いつまで (jusqu'à quand) + ですか.`},
    {jp:`出席を取ります`,romaji:`Shusseki wo torimasu`,fr:`On fait l'appel`,tag:`étude`,level:`A2`,ex:`出席 (présence) + を + 取ります (prendre). 欠席 = absence.`},
    {jp:`奨学金`,romaji:`Shougakukin`,fr:`Bourse d'études`,tag:`étude`,level:`A2`,ex:`奨学 (encouragement à l'étude) + 金 (argent).`},
    {jp:`レポートを書かなければなりません`,romaji:`Repooto wo kakanakereba narimasen`,fr:`Je dois écrire un rapport`,tag:`étude`,level:`A2`,ex:`Structure clé de l'obligation : 書く → 書かなければなりません, litt. « si je n'écris pas, ça ne va pas » = je dois écrire.`},
    {jp:`図書館で勉強します`,romaji:`Toshokan de benkyou shimasu`,fr:`J'étudie à la bibliothèque`,tag:`étude`,level:`A2`,ex:`図書館 (bibliothèque) + で (lieu de l'action) + 勉強します.`},
    {jp:`今週末、一緒に出かけない？`,romaji:`Konshuumatsu, issho ni dekakenai?`,fr:`Ce week-end, on sort ?`,tag:`relation`,level:`A2`,ex:`今週末 (ce week-end) + 一緒に + 出かけない ? (négatif familier de 出かける = sortir). Encore l'invitation par la négation.`},
    {jp:`めっちゃ楽しい！`,romaji:`Meccha tanoshii!`,fr:`C'est trop fun !`,tag:`relation`,level:`A2`,ex:`めっちゃ (argot Kansai = « trop », au lieu du standard すごく) + 楽しい (amusant, adjectif-i). À Kyoto, めっちゃ te fait passer pour un local.`},
    {jp:`そろそろ帰ります`,romaji:`Sorosoro kaerimasu`,fr:`Je vais bientôt rentrer`,tag:`relation`,level:`A2`,ex:`そろそろ (« il commence à être l'heure de… ») + 帰ります (rentrer chez soi). Façon douce d'annoncer son départ.`},
    {jp:`また今度ね`,romaji:`Mata kondo ne`,fr:`À une prochaine`,tag:`relation`,level:`A2`,ex:`また (encore) + 今度 (la prochaine fois) + ね. Moins formel que さようなら.`},
    {jp:`何て呼べばいい？`,romaji:`Nante yobeba ii?`,fr:`Comment je t'appelle ?`,tag:`relation`,level:`A2`,ex:`何て (comment) + 呼べば (conditionnel -ば de 呼ぶ = appeler) + いい (bien). Litt. « si j'appelle comment, c'est bien ? ». Plus naturel que お名前は ? entre jeunes.`},
    {jp:`マジで！？`,romaji:`Maji de!?`,fr:`Sérieux !?`,tag:`relation`,level:`A2`,ex:`マジ (argot, de 真面目 majime = sérieux) + で. Expression de surprise. L'émotion compte autant que le mot.`},
    {jp:`彼女はいますか？`,romaji:`Kanojo wa imasu ka?`,fr:`Tu as une copine ?`,tag:`relation`,level:`A2`,ex:`彼女 (elle / petite amie selon contexte) + は + います (verbe d'existence pour personnes) + か.`},
    {jp:`彼氏はいますか？`,romaji:`Kareshi wa imasu ka?`,fr:`Tu as un copain ?`,tag:`relation`,level:`A2`,ex:`彼氏 (petit ami) + は + います + か. いる/います = exister, pour les êtres animés.`},
    {jp:`友達になりましょう`,romaji:`Tomodachi ni narimashou`,fr:`Devenons amis`,tag:`relation`,level:`A2`,ex:`友達 (ami) + に + なりましょう (なる = devenir, au volitif poli « -ましょう » = proposons-nous de).`},

    {jp:`予定が変わったので、変更できますか？`,romaji:`Yotei ga kawatta node, henkou dekimasu ka?`,fr:`Mes plans ont changé, je peux modifier ?`,tag:`voyage`,level:`B1`,ex:`予定 (plan) + が + 変わった (passé de 変わる, changer) + ので (« parce que », lien causal soutenu) + 変更できますか (potentiel). ので relie deux propositions par la cause.`},
    {jp:`もう少し安いプランはありますか？`,romaji:`Mou sukoshi yasui puran wa arimasu ka?`,fr:`Une option moins chère ?`,tag:`voyage`,level:`B1`,ex:`もう少し (un peu plus) + 安い (bon marché) + プラン + は + ありますか. もう少し + adjectif = « un peu plus ~ ».`},
    {jp:`〜の場合はどうすればいいですか？`,romaji:`~ no baai wa dou sureba ii desu ka?`,fr:`Que faire dans le cas de ~ ?`,tag:`voyage`,level:`B1`,ex:`場合 (cas) + どうすれば (conditionnel de する) + いい. どうすればいい = « comment faire pour que ce soit bien » = « que dois-je faire ? ».`},
    {jp:`個人的な事情で予定を変更したいです`,romaji:`Kojinteki na jijou de yotei wo henkou shitai desu`,fr:`Changer mes plans pour raisons perso`,tag:`voyage`,level:`B1`,ex:`個人的な (personnel, adjectif-な → な devant un nom) + 事情 (circonstances) + で (cause) + 変更したい.`},
    {jp:`旅行保険に入っています`,romaji:`Ryokou hoken ni haitte imasu`,fr:`J'ai une assurance voyage`,tag:`voyage`,level:`B1`,ex:`保険に入る = litt. « entrer dans une assurance » = être assuré. に marque ce dans quoi on entre.`},
    {jp:`私の意見では〜と思います`,romaji:`Watashi no iken de wa ~ to omoimasu`,fr:`À mon avis, je pense que ~`,tag:`travail`,level:`B1`,ex:`意見では (du point de vue de l'opinion) + [contenu] + と (guillemet de citation/pensée) + 思います. と思う = la structure nº1 pour donner un avis.`},
    {jp:`〜という点に賛成です`,romaji:`~ to iu ten ni sansei desu`,fr:`Je suis d'accord sur ce point`,tag:`travail`,level:`B1`,ex:`という (« le fait que / qu'on appelle ») + 点 (point) + に + 賛成 (accord). という transforme une idée en groupe nominal.`},
    {jp:`〜という点に反対です`,romaji:`~ to iu ten ni hantai desu`,fr:`Je ne suis pas d'accord sur ce point`,tag:`travail`,level:`B1`,ex:`Même structure que ci-dessus avec 反対 (opposition). Désaccord poli et précis.`},
    {jp:`もう少し詳しく説明していただけますか？`,romaji:`Mou sukoshi kuwashiku setsumei shite itadakemasu ka?`,fr:`Plus en détail svp ?`,tag:`travail`,level:`B1`,ex:`詳しく (adverbe de 詳しい = détaillé) + 説明して + いただけますか (potentiel de いただく = encore plus poli que もらえますか). Registre soigné pour un supérieur.`},
    {jp:`期限内に終わらせるのは難しいかもしれません`,romaji:`Kigen-nai ni owaraseru no wa muzukashii kamoshiremasen`,fr:`Difficile de finir à temps`,tag:`travail`,level:`B1`,ex:`終わらせる (causatif de 終わる = faire finir) + のは (の nominalise le verbe : « le fait de finir ») + 難しい + かもしれません (« il se peut que »). Annonce un problème en douceur.`},
    {jp:`〜という提案をしたいです`,romaji:`~ to iu teian wo shitai desu`,fr:`Je voudrais proposer ~`,tag:`travail`,level:`B1`,ex:`という + 提案 (proposition) + を + したい. 提案をする = faire une proposition.`},
    {jp:`キャリアアップを考えています`,romaji:`Kyaria appu wo kangaete imasu`,fr:`J'envisage une évolution`,tag:`travail`,level:`B1`,ex:`キャリアアップ (« career up », wasei-eigo = anglais inventé au Japon) + を + 考えています (réfléchir, état en cours).`},
    {jp:`〜と比べてどう思いますか？`,romaji:`~ to kurabete dou omoimasu ka?`,fr:`Qu'en pensez-vous par rapport à ~ ?`,tag:`travail`,level:`B1`,ex:`と (avec) + 比べて (forme -て de 比べる = comparer) + どう思いますか (qu'en pensez-vous). [X]と比べて = « comparé à X ».`},
    {jp:`この研究テーマに興味があります`,romaji:`Kono kenkyuu teema ni kyoumi ga arimasu`,fr:`Ce sujet de recherche m'intéresse`,tag:`étude`,level:`B1`,ex:`興味がある = avoir de l'intérêt. に marque l'objet de l'intérêt : « j'ai de l'intérêt envers ce thème ».`},
    {jp:`〜という観点から考えると`,romaji:`~ to iu kanten kara kangaeru to`,fr:`Du point de vue de ~`,tag:`étude`,level:`B1`,ex:`観点 (point de vue) + から (depuis) + 考えると (と ici = « quand/si on considère »). Sert à introduire une analyse.`},
    {jp:`データによると〜ということがわかります`,romaji:`Deeta ni yoru to ~ to iu koto ga wakarimasu`,fr:`Selon les données, on voit que ~`,tag:`étude`,level:`B1`,ex:`によると (« selon, d'après ») + ということ (« le fait que », nominalise une phrase entière) + わかります. Registre académique.`},
    {jp:`もし〜だったら、どうなりますか？`,romaji:`Moshi ~ dattara, dou narimasu ka?`,fr:`Et si ~, qu'arriverait-il ?`,tag:`étude`,level:`B1`,ex:`もし (« si », renforce le conditionnel) + だったら (conditionnel de です) + どうなりますか (なる = devenir : « ça devient comment ? »).`},
    {jp:`卒業後の進路について考えています`,romaji:`Sotsugyou-go no shinro ni tsuite kangaete imasu`,fr:`Je réfléchis à mon après-diplôme`,tag:`étude`,level:`B1`,ex:`卒業後 (après le diplôme : 後 = après) + 進路 (orientation/voie) + について + 考えています.`},
    {jp:`〜に対してどう対応すればいいですか？`,romaji:`~ ni taishite dou taiou sureba ii desu ka?`,fr:`Comment réagir face à ~ ?`,tag:`étude`,level:`B1`,ex:`に対して (envers, face à) + 対応すれば (conditionnel de 対応する = réagir/gérer) + いい.`},
    {jp:`最近どう？`,romaji:`Saikin dou?`,fr:`Ça va en ce moment ?`,tag:`relation`,level:`B1`,ex:`最近 (récemment) + どう (comment). Familier, sans です ni か — ton décontracté entre amis.`},
    {jp:`実は〜について悩んでいます`,romaji:`Jitsu wa ~ ni tsuite nayande imasu`,fr:`En fait, je m'inquiète au sujet de ~`,tag:`relation`,level:`B1`,ex:`実は (à vrai dire — introduit une confidence) + について + 悩んでいる (être tourmenté, état en cours).`},
    {jp:`あなたのおかげで助かりました`,romaji:`Anata no okage de tasukarimashita`,fr:`Grâce à toi, ça m'a aidé`,tag:`relation`,level:`B1`,ex:`おかげで (« grâce à ») + 助かりました (passé de 助かる = être sauvé/soulagé, intransitif). Note : 助かる ≠ 助ける (aider quelqu'un).`},
    {jp:`もっと仲良くなりたいです`,romaji:`Motto nakayoku naritai desu`,fr:`J'aimerais qu'on soit plus proches`,tag:`relation`,level:`B1`,ex:`もっと (plus) + 仲良く (adverbe de 仲良い = être proche) + なりたい (vouloir devenir : なる + たい).`},
    {jp:`将来について話したいことがあります`,romaji:`Shourai ni tsuite hanashitai koto ga arimasu`,fr:`J'ai des choses à dire sur l'avenir`,tag:`relation`,level:`B1`,ex:`将来 (avenir) + について + 話したいこと (こと nominalise : « des choses que je veux dire ») + があります.`},
    {jp:`誤解しないでほしいんですが`,romaji:`Gokai shinaide hoshiin desu ga`,fr:`Ne te méprends pas, mais…`,tag:`relation`,level:`B1`,ex:`誤解しないで (forme -て négative = « ne fais pas ») + ほしい (vouloir que l'AUTRE fasse) + んですが. [-ないで]+ほしい = « j'aimerais que tu ne… ».`},
    {jp:`〜には感謝しています`,romaji:`~ ni wa kansha shite imasu`,fr:`Je suis reconnaissant pour ~`,tag:`relation`,level:`B1`,ex:`には (に + は pour insister sur la cible) + 感謝しています (être reconnaissant, état durable).`},
    {jp:`距離を置きたいわけじゃないんです`,romaji:`Kyori wo okitai wake janain desu`,fr:`Ce n'est pas que je veux prendre mes distances`,tag:`relation`,level:`B1`,ex:`距離を置く (prendre ses distances) + たい + わけじゃない (« ce n'est pas comme si / pas que… ») + んです. わけじゃない nuance et adoucit une affirmation.`}
  ];

export const CORE_SET = new Set([
    `こんにちは`,`すみません`,`ありがとうございます`,`お願いします`,`はい`,`いいえ`,
    `わかりません`,`いくらですか？`,`〜はどこですか？`,`トイレはどこですか？`,
    `一人です`,`私は〜です`,`よろしくお願いします`,`〜が好きです`,
    `これをください`,`〜まで行きたいんですが`,`もう一度お願いします`,
    `〜を専攻しています`,`一緒に行きませんか？`,`元気ですか？`,`フランスから来ました`
  ]);

export const READING_GROUPS = [
    { title:`Toilettes & directions`, icon:`🚻`, items:[
      {jp:`トイレ`,romaji:`Toire`,fr:`Toilettes`,note:`Le plus courant, en katakana`},
      {jp:`お手洗い`,romaji:`Otearai`,fr:`Toilettes (poli)`,note:`Litt. « lavage des mains »`},
      {jp:`男`,romaji:`Otoko`,fr:`Hommes`,note:`Sur les portes (souvent en bleu)`},
      {jp:`女`,romaji:`Onna`,fr:`Femmes`,note:`Sur les portes (souvent en rouge)`},
      {jp:`右`,romaji:`Migi`,fr:`Droite`,note:`Sens / direction`},
      {jp:`左`,romaji:`Hidari`,fr:`Gauche`,note:`Sens / direction`},
      {jp:`入口`,romaji:`Iriguchi`,fr:`Entrée`,note:`入 = entrer, 口 = ouverture`},
      {jp:`出口`,romaji:`Deguchi`,fr:`Sortie`,note:`出 = sortir`},
      {jp:`非常口`,romaji:`Hijouguchi`,fr:`Sortie de secours`,note:`Panneau vert lumineux`},
      {jp:`押す`,romaji:`Osu`,fr:`Pousser`,note:`Sur les portes`},
      {jp:`引く`,romaji:`Hiku`,fr:`Tirer`,note:`Sur les portes`}
    ]},
    { title:`Interdictions & dangers`, icon:`⚠️`, items:[
      {jp:`禁止`,romaji:`Kinshi`,fr:`Interdit`,note:`Revient dans plein de panneaux composés`},
      {jp:`立入禁止`,romaji:`Tachiiri kinshi`,fr:`Accès interdit`,note:`Ne pas entrer`},
      {jp:`駐車禁止`,romaji:`Chuusha kinshi`,fr:`Stationnement interdit`,note:``},
      {jp:`撮影禁止`,romaji:`Satsuei kinshi`,fr:`Photos interdites`,note:`Temples, musées`},
      {jp:`危険`,romaji:`Kiken`,fr:`Danger`,note:``},
      {jp:`注意`,romaji:`Chuui`,fr:`Attention`,note:`足元注意 = attention à la marche`},
      {jp:`止まれ`,romaji:`Tomare`,fr:`Stop / Arrêtez-vous`,note:`Panneau routier rouge`}
    ]},
    { title:`Gare & transports`, icon:`🚉`, items:[
      {jp:`駅`,romaji:`Eki`,fr:`Gare`,note:`京都駅 = gare de Kyoto`},
      {jp:`切符`,romaji:`Kippu`,fr:`Billet`,note:``},
      {jp:`改札`,romaji:`Kaisatsu`,fr:`Portiques`,note:`Le contrôle d'entrée/sortie`},
      {jp:`北口`,romaji:`Kitaguchi`,fr:`Sortie nord`,note:`北 = nord`},
      {jp:`南口`,romaji:`Minamiguchi`,fr:`Sortie sud`,note:`南 = sud`},
      {jp:`各駅停車`,romaji:`Kakueki teisha`,fr:`Omnibus (tous arrêts)`,note:`Le train le plus lent`},
      {jp:`急行`,romaji:`Kyuukou`,fr:`Express`,note:`Saute des arrêts`},
      {jp:`普通`,romaji:`Futsuu`,fr:`Train normal`,note:``}
    ]},
    { title:`Boutiques & argent`, icon:`🏪`, items:[
      {jp:`営業中`,romaji:`Eigyouchuu`,fr:`Ouvert`,note:`中 = en cours`},
      {jp:`準備中`,romaji:`Junbichuu`,fr:`Fermé (préparation)`,note:`Pas encore ouvert`},
      {jp:`会計`,romaji:`Kaikei`,fr:`Caisse / Addition`,note:`Où l'on paie`},
      {jp:`円`,romaji:`En`,fr:`Yen`,note:`Après le prix : 500円`},
      {jp:`無料`,romaji:`Muryou`,fr:`Gratuit`,note:`無 = sans`},
      {jp:`割引`,romaji:`Waribiki`,fr:`Réduction`,note:`半額 = moitié prix`}
    ]}
  ];

export const CONVERSATIONS = [
    { id:'resto', icon:'🍜', title:'Entrer dans un izakaya', skill:'voyage', level:'A0-A1', turns:[
      { speaker:'npc', jp:'いらっしゃいませ！何名様ですか？', romaji:'Irasshaimase! Nanmeisama desu ka?', fr:'Bienvenue ! Combien de personnes ?' },
      { speaker:'user', choices:[
        { jp:'一人です', romaji:'Hitori desu', fr:'Je suis seul(e)', quality:'best', feedback:'Parfait — simple, clair, exactement ce qu\'il faut dire.' },
        { jp:'私は一人の人間です', romaji:'Watashi wa hitori no ningen desu', fr:'Je suis un être humain seul', quality:'weak', feedback:'Grammaticalement correct mais personne ne dit ça — trop littéral, sonne étrange.' },
        { jp:'一人', romaji:'Hitori', fr:'Un (sans rien d\'autre)', quality:'ok', feedback:'Compris, mais ajouter です rend ta phrase plus complète et polie.' }
      ]},
      { speaker:'npc', jp:'かしこまりました。こちらへどうぞ。', romaji:'Kashikomarimashita. Kochira e douzo.', fr:'Bien compris. Par ici, je vous prie.' },
      { speaker:'npc', jp:'お決まりになりましたら、お呼びください。', romaji:'Okimari ni narimashitara, oyobi kudasai.', fr:'Quand vous aurez choisi, appelez-moi.' },
      { speaker:'user', choices:[
        { jp:'すみません！注文お願いします', romaji:'Sumimasen! Chuumon onegaishimasu', fr:'Excusez-moi ! Je voudrais commander', quality:'best', feedback:'Exactement la formule attendue dans un izakaya.' },
        { jp:'ヘイ！', romaji:'Hei!', fr:'Hé !', quality:'weak', feedback:'Trop familier/abrupt — すみません reste la formule universelle pour appeler.' },
        { jp:'お願いします', romaji:'Onegaishimasu', fr:'S\'il vous plaît', quality:'ok', feedback:'Ça marche mais sans すみません avant, le serveur doit déjà te regarder.' }
      ]}
    ]},
    { id:'direction', icon:'🚏', title:'Demander son chemin', skill:'voyage', level:'A1-A2', turns:[
      { speaker:'user', choices:[
        { jp:'すみません、京都駅はどこですか？', romaji:'Sumimasen, Kyouto-eki wa doko desu ka?', fr:'Excusez-moi, où est la gare de Kyoto ?', quality:'best', feedback:'Structure parfaite : すみません + lieu + はどこですか.' },
        { jp:'京都駅！', romaji:'Kyouto-eki!', fr:'Gare de Kyoto !', quality:'weak', feedback:'Ça se comprend à la limite mais ce n\'est pas une question — risque de réponse confuse.' },
        { jp:'京都駅はどこ？', romaji:'Kyouto-eki wa doko?', fr:'Où est la gare de Kyoto ?', quality:'ok', feedback:'Correct mais familier — avec un inconnu dans la rue, ですか est plus sûr.' }
      ]},
      { speaker:'npc', jp:'この道をまっすぐ行ってください。', romaji:'Kono michi wo massugu itte kudasai.', fr:'Allez tout droit sur cette route.' },
      { speaker:'npc', jp:'わかりましたか？', romaji:'Wakarimashita ka?', fr:'Vous avez compris ?' },
      { speaker:'user', choices:[
        { jp:'はい、わかりました。ありがとうございます', romaji:'Hai, wakarimashita. Arigatou gozaimasu', fr:'Oui, j\'ai compris. Merci beaucoup', quality:'best', feedback:'Clair et poli — clôture idéale de l\'échange.' },
        { jp:'もう一度お願いします', romaji:'Mou ichido onegaishimasu', fr:'Encore une fois s\'il vous plaît', quality:'ok', feedback:'Très bien si tu n\'as vraiment pas compris — utile à connaître par cœur.' },
        { jp:'たぶん', romaji:'Tabun', fr:'Peut-être', quality:'weak', feedback:'Vague — ton interlocuteur ne saura pas s\'il doit ré-expliquer.' }
      ]}
    ]},
    { id:'rencontre', icon:'👋', title:'Rencontrer quelqu\'un au club étudiant', skill:'relation', level:'A1-A2', turns:[
      { speaker:'npc', jp:'こんにちは！はじめまして。', romaji:'Konnichiwa! Hajimemashite.', fr:'Bonjour ! Enchanté(e).' },
      { speaker:'user', choices:[
        { jp:'はじめまして。フランスから来ました。よろしくお願いします', romaji:'Hajimemashite. Furansu kara kimashita. Yoroshiku onegaishimasu', fr:'Enchanté(e). Je viens de France. Ravi(e) de te connaître', quality:'best', feedback:'Présentation complète et naturelle — exactement le rituel attendu.' },
        { jp:'こんにちは', romaji:'Konnichiwa', fr:'Bonjour', quality:'weak', feedback:'Poli mais tu rates l\'occasion de te présenter — よろしくお願いします est attendu ici.' },
        { jp:'私はフランス人です', romaji:'Watashi wa furansu-jin desu', fr:'Je suis français(e)', quality:'ok', feedback:'Correct, mais ajoute よろしくお願いします pour clore proprement la présentation.' }
      ]},
      { speaker:'npc', jp:'サークルに興味がありますか？', romaji:'Saakuru ni kyoumi ga arimasu ka?', fr:'Tu es intéressé(e) par le club ?' },
      { speaker:'user', choices:[
        { jp:'はい、サークルに入りたいです', romaji:'Hai, saakuru ni hairitai desu', fr:'Oui, je voudrais rejoindre le club', quality:'best', feedback:'Direct, naturel — utilise exactement le vocabulaire du club étudiant.' },
        { jp:'たぶん、わかりません', romaji:'Tabun, wakarimasen', fr:'Peut-être, je ne sais pas', quality:'weak', feedback:'Compris mais peu engageant — pas idéal si tu veux vraiment te faire des amis.' },
        { jp:'興味があります', romaji:'Kyoumi ga arimasu', fr:'Je suis intéressé(e)', quality:'ok', feedback:'Bien, mais 入りたいです est plus concret et montre une vraie intention.' }
      ]}
    ]},
    { id:'travail', icon:'💼', title:'Au bureau : un service', skill:'travail', level:'A2-B1', turns:[
      { speaker:'npc', jp:'すみません、今ちょっといいですか？', romaji:'Sumimasen, ima chotto ii desu ka?', fr:'Excusez-moi, vous avez un instant ?' },
      { speaker:'user', choices:[
        { jp:'はい、大丈夫です。どうしましたか？', romaji:'Hai, daijoubu desu. Dou shimashita ka?', fr:'Oui, ça va. Qu\'est-ce qu\'il y a ?', quality:'best', feedback:'Réponse naturelle et professionnelle, ouvre la conversation correctement.' },
        { jp:'何？', romaji:'Nani?', fr:'Quoi ?', quality:'weak', feedback:'Beaucoup trop direct/familier pour un contexte professionnel.' },
        { jp:'はい', romaji:'Hai', fr:'Oui', quality:'ok', feedback:'Correct mais minimal — une petite relance montre que tu es engagé(e).' }
      ]},
      { speaker:'npc', jp:'もう一度説明してもらえますか？', romaji:'Mou ichido setsumei shite moraemasu ka?', fr:'(reformule la même demande pour toi) Pouvez-vous m\'expliquer encore une fois ?' },
      { speaker:'user', choices:[
        { jp:'もちろんです。詳しく説明します', romaji:'Mochiron desu. Kuwashiku setsumei shimasu', fr:'Bien sûr. Je vais expliquer en détail', quality:'best', feedback:'Ton professionnel et serviable parfait.' },
        { jp:'えーと…', romaji:'Eeto…', fr:'Euh…', quality:'ok', feedback:'Naturel comme hésitation, mais essaie d\'enchaîner avec une vraie réponse ensuite.' },
        { jp:'無理です', romaji:'Muri desu', fr:'C\'est impossible', quality:'weak', feedback:'Trop abrupt pour une simple demande de clarification.' }
      ]}
    ]}
  ];
