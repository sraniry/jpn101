// Écoutes JLPT N4 pour la section orale de l'examen blanc.
// type : 'tâche' (que va faire la personne), 'point' (quel détail / pourquoi), 'réponse' (meilleure réplique).
// La bonne réponse est toujours choices[0] : l'appli mélange les choix.
export const N4_LISTENING = [
  // ── TÂCHE ───────────────────────────────────────────────
  { id:'t01', type:'tâche', setting:'Au bureau des étudiants étrangers',
    lines:[
      { who:'F', jp:'留学生の方ですね。奨学金の申し込みですか。', romaji:'Ryuugakusei no kata desu ne. Shougakukin no moushikomi desu ka.', fr:'Vous êtes étudiante étrangère ? C\'est pour la demande de bourse ?' },
      { who:'M', jp:'はい。何を持ってくればいいですか。', romaji:'Hai. Nani wo motte kureba ii desu ka.', fr:'Oui. Qu\'est-ce que je dois apporter ?' },
      { who:'F', jp:'学生証と、この申込書です。写真はもういただいていますので、大丈夫です。', romaji:'Gakuseishou to, kono moushikomisho desu. Shashin wa mou itadaite imasu node, daijoubu desu.', fr:'La carte étudiante et ce formulaire. La photo, on l\'a déjà, donc c\'est bon.' },
      { who:'M', jp:'パスポートはいりませんか。', romaji:'Pasupooto wa irimasen ka.', fr:'Pas besoin du passeport ?' },
      { who:'F', jp:'はい、今回はいりません。', romaji:'Hai, konkai wa irimasen.', fr:'Non, pas cette fois.' }
    ],
    q:'Qu\'est-ce que l\'étudiant doit apporter ?',
    choices:['La carte étudiante et le formulaire','La carte étudiante, le formulaire et une photo','Le passeport et le formulaire','Une photo et le passeport'],
    ok:'La carte étudiante et le formulaire',
    explanation:'学生証と申込書 (gakuseishou to moushikomisho) = carte étudiante et formulaire. La photo, ils l\'ont déjà (もういただいています), et le passeport いりません (pas nécessaire).' },

  { id:'t02', type:'tâche', setting:'Deux amis organisent une sortie',
    lines:[
      { who:'M', jp:'土曜日、嵐山に行かない？', romaji:'Doyoubi, Arashiyama ni ikanai?', fr:'Samedi, on va à Arashiyama ?' },
      { who:'F', jp:'いいね。何時に会う？', romaji:'Ii ne. Nanji ni au?', fr:'Bonne idée. On se retrouve à quelle heure ?' },
      { who:'M', jp:'九時に京都駅はどう？', romaji:'Kuji ni Kyouto-eki wa dou?', fr:'9 h à la gare de Kyoto ?' },
      { who:'F', jp:'ちょっと早いなあ。十時でもいい？', romaji:'Chotto hayai naa. Juuji demo ii?', fr:'Un peu tôt… 10 h, ça te va ?' },
      { who:'M', jp:'じゃあ、十時に。でも駅は混むから、四条で会おう。', romaji:'Jaa, juuji ni. Demo eki wa komu kara, Shijou de aou.', fr:'Alors 10 h. Mais la gare est bondée, retrouvons-nous à Shijo.' },
      { who:'F', jp:'わかった。', romaji:'Wakatta.', fr:'D\'accord.' }
    ],
    q:'Où et à quelle heure vont-ils se retrouver ?',
    choices:['À Shijo à 10 h','À la gare de Kyoto à 9 h','À la gare de Kyoto à 10 h','À Shijo à 9 h'],
    ok:'À Shijo à 10 h',
    explanation:'L\'heure passe de 9 h à 十時 (juuji, 10 h), et le lieu change à la fin : 四条で会おう (Shijou de aou, retrouvons-nous à Shijo). Méfie-toi toujours des changements de dernière minute.' },

  { id:'t03', type:'tâche', setting:'Au restaurant où l\'étudiante travaille',
    lines:[
      { who:'M', jp:'リサさん、今日は最初にテーブルを拭いてください。', romaji:'Risa-san, kyou wa saisho ni teeburu wo fuite kudasai.', fr:'Lisa, aujourd\'hui, essuie d\'abord les tables.' },
      { who:'F', jp:'はい。お皿も洗いますか。', romaji:'Hai. Osara mo araimasu ka.', fr:'D\'accord. Je lave aussi les assiettes ?' },
      { who:'M', jp:'お皿は田中さんがやるから、いいよ。あ、でもその前に、お店の前を掃除しておいてくれる？', romaji:'Osara wa Tanaka-san ga yaru kara, ii yo. A, demo sono mae ni, omise no mae wo souji shite oite kureru?', fr:'Les assiettes, c\'est Tanaka qui s\'en charge. Ah, mais avant ça, tu peux balayer devant le restaurant ?' },
      { who:'F', jp:'わかりました。', romaji:'Wakarimashita.', fr:'Compris.' }
    ],
    q:'Que va faire Lisa en premier ?',
    choices:['Nettoyer devant le restaurant','Essuyer les tables','Laver les assiettes','Aider Tanaka'],
    ok:'Nettoyer devant le restaurant',
    explanation:'Le patron dit d\'abord les tables, puis ajoute その前に (sono mae ni, avant ça) : お店の前を掃除 (nettoyer devant le restaurant). Les assiettes, c\'est 田中さん.' },

  { id:'t04', type:'tâche', setting:'Un professeur parle à la fin du cours',
    lines:[
      { who:'M', jp:'来週は試験です。教科書の三課から五課までです。', romaji:'Raishuu wa shiken desu. Kyoukasho no sanka kara goka made desu.', fr:'La semaine prochaine, c\'est l\'examen, leçons 3 à 5 du manuel.' },
      { who:'F', jp:'先生、辞書を使ってもいいですか。', romaji:'Sensei, jisho wo tsukatte mo ii desu ka.', fr:'Professeur, on peut utiliser le dictionnaire ?' },
      { who:'M', jp:'辞書はだめです。でも、ノートは見てもいいですよ。', romaji:'Jisho wa dame desu. Demo, nooto wa mite mo ii desu yo.', fr:'Pas le dictionnaire. Mais vous pouvez regarder vos notes.' }
    ],
    q:'Qu\'est-ce que les étudiants peuvent utiliser pendant l\'examen ?',
    choices:['Leurs notes','Le dictionnaire','Le manuel','Le dictionnaire et leurs notes'],
    ok:'Leurs notes',
    explanation:'辞書はだめです (jisho wa dame desu) = pas de dictionnaire. ノートは見てもいいです (nooto wa mite mo ii desu) = on peut regarder ses notes.' },

  { id:'t05', type:'tâche', setting:'Au téléphone avec la mère d\'une famille d\'accueil',
    lines:[
      { who:'F', jp:'もしもし、今日は何時ごろ帰る？', romaji:'Moshimoshi, kyou wa nanji goro kaeru?', fr:'Allô, tu rentres vers quelle heure aujourd\'hui ?' },
      { who:'M', jp:'七時ごろです。何か買って帰りましょうか。', romaji:'Shichiji goro desu. Nanika katte kaerimashou ka.', fr:'Vers 19 h. Je rapporte quelque chose ?' },
      { who:'F', jp:'じゃあ、牛乳と卵をお願い。あ、卵はまだあったわ。牛乳だけでいいよ。', romaji:'Jaa, gyuunyuu to tamago wo onegai. A, tamago wa mada atta wa. Gyuunyuu dake de ii yo.', fr:'Alors du lait et des œufs. Ah, il reste des œufs. Juste le lait, ça ira.' },
      { who:'M', jp:'わかりました。パンはいいですか。', romaji:'Wakarimashita. Pan wa ii desu ka.', fr:'D\'accord. Pas de pain ?' },
      { who:'F', jp:'パンもいらないよ。ありがとう。', romaji:'Pan mo iranai yo. Arigatou.', fr:'Pas besoin de pain non plus. Merci.' }
    ],
    q:'Qu\'est-ce que l\'étudiant va acheter ?',
    choices:['Du lait','Du lait et des œufs','Des œufs','Du lait et du pain'],
    ok:'Du lait',
    explanation:'Elle corrige : 卵はまだあった (il reste des œufs), 牛乳だけでいい (juste le lait). Et パンもいらない : pas de pain.' },

  { id:'t06', type:'tâche', setting:'À la bibliothèque universitaire',
    lines:[
      { who:'M', jp:'すみません、この本を借りたいんですが。', romaji:'Sumimasen, kono hon wo karitai n desu ga.', fr:'Excusez-moi, je voudrais emprunter ce livre.' },
      { who:'F', jp:'その本は辞書なので、図書館の外には持って出られません。', romaji:'Sono hon wa jisho na node, toshokan no soto ni wa motte deraremasen.', fr:'C\'est un dictionnaire, il ne peut pas sortir de la bibliothèque.' },
      { who:'M', jp:'そうですか。じゃあ、コピーはできますか。', romaji:'Sou desu ka. Jaa, kopii wa dekimasu ka.', fr:'Ah bon. Je peux faire des photocopies alors ?' },
      { who:'F', jp:'はい、二階のコピー機を使ってください。一枚十円です。', romaji:'Hai, nikai no kopiiki wo tsukatte kudasai. Ichimai juu-en desu.', fr:'Oui, utilisez la photocopieuse du 1er étage. C\'est 10 yens la page.' }
    ],
    q:'Que va faire l\'étudiant ?',
    choices:['Photocopier des pages au 1er étage','Emprunter le dictionnaire','Lire le livre chez lui','Acheter le dictionnaire'],
    ok:'Photocopier des pages au 1er étage',
    explanation:'Le dictionnaire 持って出られません (ne peut pas sortir). Il demande コピーはできますか et on l\'envoie au 二階 (nikai : 2e niveau au Japon = 1er étage en France).' },

  { id:'t07', type:'tâche', setting:'Visite d\'un temple',
    lines:[
      { who:'F', jp:'すみません、中に入ってもいいですか。', romaji:'Sumimasen, naka ni haitte mo ii desu ka.', fr:'Excusez-moi, on peut entrer ?' },
      { who:'M', jp:'はい、どうぞ。でも、靴はここで脱いでください。', romaji:'Hai, douzo. Demo, kutsu wa koko de nuide kudasai.', fr:'Oui, je vous en prie. Mais retirez vos chaussures ici.' },
      { who:'F', jp:'写真を撮ってもいいですか。', romaji:'Shashin wo totte mo ii desu ka.', fr:'On peut prendre des photos ?' },
      { who:'M', jp:'庭はいいですが、建物の中はご遠慮ください。', romaji:'Niwa wa ii desu ga, tatemono no naka wa goenryo kudasai.', fr:'Le jardin oui, mais pas à l\'intérieur des bâtiments, s\'il vous plaît.' }
    ],
    q:'Que doit faire la visiteuse avant d\'entrer ?',
    choices:['Retirer ses chaussures','Ranger son appareil photo','Payer l\'entrée','Photographier le jardin'],
    ok:'Retirer ses chaussures',
    explanation:'靴はここで脱いでください (kutsu wa koko de nuide kudasai) = retirez vos chaussures ici. ご遠慮ください (goenryo kudasai) est une façon polie de dire « s\'il vous plaît, ne faites pas ».' },

  { id:'t08', type:'tâche', setting:'Au dortoir, avec le responsable',
    lines:[
      { who:'M', jp:'ゴミは月曜日と木曜日に出してください。', romaji:'Gomi wa getsuyoubi to mokuyoubi ni dashite kudasai.', fr:'Sortez les poubelles le lundi et le jeudi.' },
      { who:'F', jp:'ペットボトルも同じ日ですか。', romaji:'Petto botoru mo onaji hi desu ka.', fr:'Les bouteilles plastique aussi le même jour ?' },
      { who:'M', jp:'いいえ、ペットボトルは水曜日です。朝八時までに出してくださいね。', romaji:'Iie, petto botoru wa suiyoubi desu. Asa hachiji made ni dashite kudasai ne.', fr:'Non, les bouteilles, c\'est le mercredi. Avant 8 h du matin.' }
    ],
    q:'Quand l\'étudiante doit-elle sortir les bouteilles plastique ?',
    choices:['Le mercredi avant 8 h','Le lundi avant 8 h','Le jeudi','Le lundi et le jeudi'],
    ok:'Le mercredi avant 8 h',
    explanation:'ペットボトルは水曜日 (suiyoubi, mercredi), 朝八時までに (avant 8 h du matin). Lundi et jeudi, c\'est pour les ordures ordinaires.' },

  { id:'t09', type:'tâche', setting:'Deux étudiants préparent un exposé',
    lines:[
      { who:'M', jp:'発表の資料、僕が作ろうか。', romaji:'Happyou no shiryou, boku ga tsukurou ka.', fr:'Les documents de l\'exposé, je m\'en occupe ?' },
      { who:'F', jp:'ありがとう。じゃあ、私は写真を集めておくね。', romaji:'Arigatou. Jaa, watashi wa shashin wo atsumete oku ne.', fr:'Merci. Alors moi, je rassemble les photos.' },
      { who:'M', jp:'あ、写真は先生がくれるって。', romaji:'A, shashin wa sensei ga kureru tte.', fr:'Ah, le prof a dit qu\'il nous donnerait les photos.' },
      { who:'F', jp:'そうなんだ。じゃあ、私は発表の練習の時間を決めておくよ。', romaji:'Sou nan da. Jaa, watashi wa happyou no renshuu no jikan wo kimete oku yo.', fr:'Ah bon. Alors je fixe l\'heure de répétition de l\'exposé.' }
    ],
    q:'Que va faire l\'étudiante ?',
    choices:['Fixer l\'heure de la répétition','Rassembler les photos','Préparer les documents','Demander les photos au professeur'],
    ok:'Fixer l\'heure de la répétition',
    explanation:'Les photos, 先生がくれる (le professeur les donnera). Elle change donc : 練習の時間を決めておく (fixer l\'heure de répétition).' },

  { id:'t10', type:'tâche', setting:'À la poste',
    lines:[
      { who:'F', jp:'この荷物をフランスに送りたいんですが。', romaji:'Kono nimotsu wo Furansu ni okuritai n desu ga.', fr:'Je voudrais envoyer ce colis en France.' },
      { who:'M', jp:'船便なら二か月、航空便なら一週間ぐらいかかります。', romaji:'Funabin nara nikagetsu, koukuubin nara isshuukan gurai kakarimasu.', fr:'Par bateau, deux mois ; par avion, environ une semaine.' },
      { who:'F', jp:'母の誕生日が来月なので、航空便でお願いします。', romaji:'Haha no tanjoubi ga raigetsu na node, koukuubin de onegaishimasu.', fr:'L\'anniversaire de ma mère est le mois prochain, donc par avion s\'il vous plaît.' },
      { who:'M', jp:'では、この紙に住所を書いてください。', romaji:'Dewa, kono kami ni juusho wo kaite kudasai.', fr:'Alors écrivez l\'adresse sur ce papier.' }
    ],
    q:'Que doit faire l\'étudiante maintenant ?',
    choices:['Écrire l\'adresse sur un papier','Payer l\'envoi par bateau','Revenir le mois prochain','Choisir entre bateau et avion'],
    ok:'Écrire l\'adresse sur un papier',
    explanation:'Elle a déjà choisi l\'avion (航空便でお願いします). Le postier conclut : この紙に住所を書いてください (écrivez l\'adresse sur ce papier).' },

  { id:'t11', type:'tâche', setting:'À la gare',
    lines:[
      { who:'M', jp:'すみません、奈良に行きたいんですが、何番線ですか。', romaji:'Sumimasen, Nara ni ikitai n desu ga, nanbansen desu ka.', fr:'Excusez-moi, je voudrais aller à Nara, c\'est quel quai ?' },
      { who:'F', jp:'奈良線は八番線です。でも、今日は工事中なので、九番線から出ます。', romaji:'Narasen wa hachibansen desu. Demo, kyou wa koujichuu na node, kyuubansen kara demasu.', fr:'La ligne de Nara, c\'est le quai 8. Mais aujourd\'hui il y a des travaux, il part du quai 9.' },
      { who:'M', jp:'九番線ですね。ありがとうございます。', romaji:'Kyuubansen desu ne. Arigatou gozaimasu.', fr:'Quai 9, d\'accord. Merci.' }
    ],
    q:'De quel quai part le train pour Nara aujourd\'hui ?',
    choices:['Quai 9','Quai 8','Quai 7','Quai 10'],
    ok:'Quai 9',
    explanation:'D\'habitude 八番線 (quai 8), mais 今日は工事中なので (travaux aujourd\'hui) : 九番線 (kyuubansen, quai 9).' },

  { id:'t12', type:'tâche', setting:'Chez le médecin',
    lines:[
      { who:'M', jp:'この薬は一日三回、ご飯の後に飲んでください。', romaji:'Kono kusuri wa ichinichi sankai, gohan no ato ni nonde kudasai.', fr:'Prenez ce médicament trois fois par jour, après les repas.' },
      { who:'F', jp:'朝ご飯を食べない日はどうしたらいいですか。', romaji:'Asagohan wo tabenai hi wa dou shitara ii desu ka.', fr:'Et les jours où je ne prends pas de petit-déjeuner ?' },
      { who:'M', jp:'その時は、何か少し食べてから飲んでください。お風呂は今日は入らないでくださいね。', romaji:'Sono toki wa, nanika sukoshi tabete kara nonde kudasai. Ofuro wa kyou wa hairanaide kudasai ne.', fr:'Dans ce cas, mangez un petit quelque chose avant de le prendre. Et pas de bain aujourd\'hui.' }
    ],
    q:'Que doit faire la patiente les jours sans petit-déjeuner ?',
    choices:['Manger un peu avant de prendre le médicament','Ne pas prendre le médicament','Prendre le médicament avant le repas','Prendre un bain d\'abord'],
    ok:'Manger un peu avant de prendre le médicament',
    explanation:'何か少し食べてから飲んでください (nanika sukoshi tabete kara nonde kudasai) = mangez un peu, puis prenez-le. 〜てから = « après avoir… ».' },

  { id:'t13', type:'tâche', setting:'Au club de l\'université',
    lines:[
      { who:'F', jp:'明日の練習、何を持っていけばいい？', romaji:'Ashita no renshuu, nani wo motte ikeba ii?', fr:'Pour l\'entraînement de demain, j\'apporte quoi ?' },
      { who:'M', jp:'ラケットは貸してあげるから、靴だけ持ってきて。', romaji:'Raketto wa kashite ageru kara, kutsu dake motte kite.', fr:'Je te prête une raquette, apporte juste tes chaussures.' },
      { who:'F', jp:'タオルは？', romaji:'Taoru wa?', fr:'Et une serviette ?' },
      { who:'M', jp:'あ、タオルも持ってきたほうがいいよ。汗をかくから。', romaji:'A, taoru mo motte kita hou ga ii yo. Ase wo kaku kara.', fr:'Ah, mieux vaut apporter une serviette aussi. On transpire.' }
    ],
    q:'Qu\'est-ce que l\'étudiante va apporter ?',
    choices:['Des chaussures et une serviette','Une raquette et des chaussures','Seulement des chaussures','Une raquette et une serviette'],
    ok:'Des chaussures et une serviette',
    explanation:'La raquette, 貸してあげる (il la prête). 靴だけ (seulement les chaussures)… puis タオルも持ってきたほうがいい (mieux vaut aussi une serviette).' },

  { id:'t14', type:'tâche', setting:'Au magasin de vélos',
    lines:[
      { who:'M', jp:'自転車のタイヤがパンクしたんですが、直してもらえますか。', romaji:'Jitensha no taiya ga panku shita n desu ga, naoshite moraemasu ka.', fr:'Mon pneu de vélo a crevé, vous pouvez le réparer ?' },
      { who:'F', jp:'はい。今日は混んでいるので、明日の夕方にできます。', romaji:'Hai. Kyou wa konde iru node, ashita no yuugata ni dekimasu.', fr:'Oui. Aujourd\'hui il y a du monde, ce sera prêt demain en fin d\'après-midi.' },
      { who:'M', jp:'明日は授業が遅いので、あさっての朝に取りに来てもいいですか。', romaji:'Ashita wa jugyou ga osoi node, asatte no asa ni tori ni kite mo ii desu ka.', fr:'Demain, j\'ai cours tard. Je peux venir le chercher après-demain matin ?' },
      { who:'F', jp:'はい、大丈夫ですよ。', romaji:'Hai, daijoubu desu yo.', fr:'Oui, pas de problème.' }
    ],
    q:'Quand l\'étudiant va-t-il récupérer son vélo ?',
    choices:['Après-demain matin','Demain en fin d\'après-midi','Aujourd\'hui','Demain matin'],
    ok:'Après-demain matin',
    explanation:'Le vélo est prêt 明日の夕方 (demain soir), mais il a cours tard : あさっての朝 (asatte no asa, après-demain matin).' },

  // ── POINT ───────────────────────────────────────────────
  { id:'p01', type:'point', setting:'Deux amis après un cours',
    lines:[
      { who:'F', jp:'昨日のパーティー、どうして来なかったの？', romaji:'Kinou no paatii, doushite konakatta no?', fr:'Pourquoi tu n\'es pas venu à la fête hier ?' },
      { who:'M', jp:'行きたかったんだけど、アルバイトが急に入っちゃって。', romaji:'Ikitakatta n da kedo, arubaito ga kyuu ni haicchatte.', fr:'Je voulais venir, mais on m\'a mis au travail au dernier moment.' },
      { who:'F', jp:'え、風邪だと思ってた。', romaji:'E, kaze da to omotteta.', fr:'Ah, je croyais que tu étais enrhumé.' },
      { who:'M', jp:'ううん、元気だよ。', romaji:'Uun, genki da yo.', fr:'Non, je vais bien.' }
    ],
    q:'Pourquoi l\'étudiant n\'est-il pas venu à la fête ?',
    choices:['Il a dû travailler','Il était enrhumé','Il n\'avait pas envie','Il avait un examen'],
    ok:'Il a dû travailler',
    explanation:'アルバイトが急に入っちゃって = on lui a ajouté un service au dernier moment. Le rhume (風邪), c\'est ce qu\'elle croyait, et il répond ううん (non).' },

  { id:'p02', type:'point', setting:'Dans une boutique de souvenirs',
    lines:[
      { who:'F', jp:'この扇子はいくらですか。', romaji:'Kono sensu wa ikura desu ka.', fr:'Combien coûte cet éventail ?' },
      { who:'M', jp:'二千円です。でも、二つ買うと三千五百円になりますよ。', romaji:'Nisen-en desu. Demo, futatsu kau to sanzen gohyaku-en ni narimasu yo.', fr:'2 000 yens. Mais si vous en prenez deux, ça fait 3 500 yens.' },
      { who:'F', jp:'じゃあ、二つください。', romaji:'Jaa, futatsu kudasai.', fr:'Alors deux, s\'il vous plaît.' }
    ],
    q:'Combien la cliente va-t-elle payer ?',
    choices:['3 500 yens','2 000 yens','4 000 yens','1 750 yens'],
    ok:'3 500 yens',
    explanation:'二つ買うと三千五百円 (futatsu kau to sanzen gohyaku-en) : deux éventails pour 3 500 yens, et elle en prend 二つ (deux).' },

  { id:'p03', type:'point', setting:'Un étudiant parle de son nouveau logement',
    lines:[
      { who:'F', jp:'新しいアパートはどう？', romaji:'Atarashii apaato wa dou?', fr:'Alors, ton nouvel appartement ?' },
      { who:'M', jp:'駅から近くて便利なんだけど、ちょっと狭いんだ。', romaji:'Eki kara chikakute benri nan da kedo, chotto semai n da.', fr:'Il est près de la gare, c\'est pratique, mais un peu petit.' },
      { who:'F', jp:'家賃は？', romaji:'Yachin wa?', fr:'Et le loyer ?' },
      { who:'M', jp:'思ったより安かったよ。でも、隣の人がうるさくて、夜よく眠れないんだ。', romaji:'Omotta yori yasukatta yo. Demo, tonari no hito ga urusakute, yoru yoku nemurenai n da.', fr:'Moins cher que prévu. Mais le voisin est bruyant, je dors mal la nuit.' }
    ],
    q:'Qu\'est-ce qui pose le plus problème à l\'étudiant ?',
    choices:['Le bruit du voisin','Le loyer trop cher','La distance de la gare','La taille de l\'appartement'],
    ok:'Le bruit du voisin',
    explanation:'隣の人がうるさくて、夜よく眠れない = le voisin est bruyant, il dort mal. Le loyer est 安かった (pas cher) ; « un peu petit » est un détail, pas le vrai problème.' },

  { id:'p04', type:'point', setting:'Au café, deux amies',
    lines:[
      { who:'F', jp:'週末、何をしたの？', romaji:'Shuumatsu, nani wo shita no?', fr:'Tu as fait quoi ce week-end ?' },
      { who:'M', jp:'金閣寺に行くつもりだったんだけど、雨が降ったから、家で映画を見たよ。', romaji:'Kinkakuji ni iku tsumori datta n da kedo, ame ga futta kara, ie de eiga wo mita yo.', fr:'Je comptais aller au Kinkaku-ji, mais il a plu, alors j\'ai regardé un film à la maison.' },
      { who:'F', jp:'そうか。じゃあ、来週一緒に行こうよ。', romaji:'Sou ka. Jaa, raishuu issho ni ikou yo.', fr:'Ah bon. Alors on y va ensemble la semaine prochaine.' }
    ],
    q:'Qu\'a fait la personne ce week-end ?',
    choices:['Elle a regardé un film chez elle','Elle a visité le Kinkaku-ji','Elle est allée au cinéma','Elle a fait des courses sous la pluie'],
    ok:'Elle a regardé un film chez elle',
    explanation:'〜つもりだった = « je comptais… » (mais ça ne s\'est pas fait). 雨が降ったから、家で映画を見た = il a plu, donc film à la maison.' },

  { id:'p05', type:'point', setting:'Un professeur et une étudiante',
    lines:[
      { who:'M', jp:'レポートはいつ出せますか。', romaji:'Repooto wa itsu dasemasu ka.', fr:'Quand pouvez-vous rendre votre rapport ?' },
      { who:'F', jp:'すみません、金曜日まで待っていただけませんか。', romaji:'Sumimasen, kin\'youbi made matte itadakemasen ka.', fr:'Pardon, pourriez-vous attendre jusqu\'à vendredi ?' },
      { who:'M', jp:'金曜日は私がいないので、木曜日までにお願いします。', romaji:'Kin\'youbi wa watashi ga inai node, mokuyoubi made ni onegaishimasu.', fr:'Vendredi je ne suis pas là, donc d\'ici jeudi s\'il vous plaît.' },
      { who:'F', jp:'わかりました。', romaji:'Wakarimashita.', fr:'Entendu.' }
    ],
    q:'Pourquoi le rapport doit-il être rendu jeudi ?',
    choices:['Le professeur est absent vendredi','L\'étudiante part en voyage vendredi','Le cours de vendredi est annulé','C\'était prévu depuis le début'],
    ok:'Le professeur est absent vendredi',
    explanation:'金曜日は私がいないので (kin\'youbi wa watashi ga inai node) = vendredi je ne suis pas là, donc 木曜日までに (d\'ici jeudi).' },

  { id:'p06', type:'point', setting:'Au comptoir d\'un restaurant de soba',
    lines:[
      { who:'M', jp:'いらっしゃいませ。ご注文は？', romaji:'Irasshaimase. Gochuumon wa?', fr:'Bienvenue. Vous désirez ?' },
      { who:'F', jp:'天ぷらそばをお願いします。', romaji:'Tenpura soba wo onegaishimasu.', fr:'Un soba tempura, s\'il vous plaît.' },
      { who:'M', jp:'すみません、天ぷらは今日はもう終わってしまいました。', romaji:'Sumimasen, tenpura wa kyou wa mou owatte shimaimashita.', fr:'Désolé, il n\'y a plus de tempura aujourd\'hui.' },
      { who:'F', jp:'そうですか。じゃあ、きつねそばにします。', romaji:'Sou desu ka. Jaa, kitsune soba ni shimasu.', fr:'Ah bon. Alors je prends un kitsune soba.' }
    ],
    q:'Qu\'est-ce que la cliente commande finalement ?',
    choices:['Un kitsune soba','Un soba tempura','Un udon tempura','Rien, elle repart'],
    ok:'Un kitsune soba',
    explanation:'天ぷらは…終わってしまいました = plus de tempura. Elle choisit : きつねそばにします (〜にします = « je prends… »).' },

  { id:'p07', type:'point', setting:'Deux étudiants au téléphone',
    lines:[
      { who:'M', jp:'ごめん、十分ぐらい遅れる。', romaji:'Gomen, juppun gurai okureru.', fr:'Désolé, j\'aurai environ dix minutes de retard.' },
      { who:'F', jp:'どうしたの？', romaji:'Doushita no?', fr:'Qu\'est-ce qui se passe ?' },
      { who:'M', jp:'バスに乗ろうと思ったら、財布を忘れたことに気がついて、家に戻ったんだ。', romaji:'Basu ni norou to omottara, saifu wo wasureta koto ni ki ga tsuite, ie ni modotta n da.', fr:'Au moment de monter dans le bus, je me suis rendu compte que j\'avais oublié mon portefeuille, je suis rentré chez moi.' },
      { who:'F', jp:'わかった。気をつけてね。', romaji:'Wakatta. Ki wo tsukete ne.', fr:'D\'accord. Fais attention.' }
    ],
    q:'Pourquoi l\'étudiant est-il en retard ?',
    choices:['Il est retourné chercher son portefeuille','Le bus était en retard','Il s\'est réveillé tard','Il s\'est trompé de bus'],
    ok:'Il est retourné chercher son portefeuille',
    explanation:'財布を忘れた (saifu wo wasureta, oublié son portefeuille) → 家に戻った (rentré à la maison). Le bus n\'est pas en cause.' },

  { id:'p08', type:'point', setting:'Une étudiante parle de ses vacances',
    lines:[
      { who:'M', jp:'冬休みはフランスに帰るの？', romaji:'Fuyuyasumi wa Furansu ni kaeru no?', fr:'Tu rentres en France pour les vacances d\'hiver ?' },
      { who:'F', jp:'帰りたかったんだけど、飛行機が高いから、日本にいることにしたの。', romaji:'Kaeritakatta n da kedo, hikouki ga takai kara, Nihon ni iru koto ni shita no.', fr:'Je voulais, mais l\'avion est cher, alors j\'ai décidé de rester au Japon.' },
      { who:'M', jp:'じゃあ、北海道に行かない？雪がきれいだよ。', romaji:'Jaa, Hokkaidou ni ikanai? Yuki ga kirei da yo.', fr:'Alors, on va à Hokkaido ? La neige y est magnifique.' }
    ],
    q:'Pourquoi l\'étudiante reste-t-elle au Japon ?',
    choices:['Le billet d\'avion est trop cher','Elle part à Hokkaido','Elle a des cours pendant les vacances','Sa famille vient la voir'],
    ok:'Le billet d\'avion est trop cher',
    explanation:'飛行機が高いから (hikouki ga takai kara) = parce que l\'avion est cher. 〜ことにした = « j\'ai décidé de… ». Hokkaido, c\'est la proposition de son ami, après.' },

  { id:'p09', type:'point', setting:'À l\'accueil d\'un musée',
    lines:[
      { who:'F', jp:'学生は割引がありますか。', romaji:'Gakusei wa waribiki ga arimasu ka.', fr:'Il y a une réduction étudiante ?' },
      { who:'M', jp:'はい、学生証を見せていただければ、八百円が五百円になります。', romaji:'Hai, gakuseishou wo misete itadakereba, happyaku-en ga gohyaku-en ni narimasu.', fr:'Oui, si vous montrez votre carte étudiante, ça passe de 800 à 500 yens.' },
      { who:'F', jp:'あ、学生証を寮に置いてきてしまいました。', romaji:'A, gakuseishou wo ryou ni oite kite shimaimashita.', fr:'Ah, j\'ai laissé ma carte étudiante au dortoir.' },
      { who:'M', jp:'それでは、申し訳ありませんが、普通の料金になります。', romaji:'Soredewa, moushiwake arimasen ga, futsuu no ryoukin ni narimasu.', fr:'Dans ce cas, je suis désolé, ce sera le tarif normal.' }
    ],
    q:'Combien l\'étudiante va-t-elle payer ?',
    choices:['800 yens','500 yens','300 yens','Rien'],
    ok:'800 yens',
    explanation:'Sans carte (寮に置いてきてしまいました, laissée au dortoir), c\'est 普通の料金 (tarif normal) : 八百円 (800 yens).' },

  { id:'p10', type:'point', setting:'Un employé de supérette parle à une nouvelle',
    lines:[
      { who:'M', jp:'この仕事で一番大切なのは何だと思う？', romaji:'Kono shigoto de ichiban taisetsu na no wa nan da to omou?', fr:'À ton avis, qu\'est-ce qui compte le plus dans ce travail ?' },
      { who:'F', jp:'早くレジを打つことですか。', romaji:'Hayaku reji wo utsu koto desu ka.', fr:'Encaisser vite ?' },
      { who:'M', jp:'それも大切だけど、一番はお客さんに笑顔であいさつすることだよ。', romaji:'Sore mo taisetsu da kedo, ichiban wa okyakusan ni egao de aisatsu suru koto da yo.', fr:'C\'est important aussi, mais le plus important, c\'est de saluer les clients avec le sourire.' }
    ],
    q:'Selon l\'employé, qu\'est-ce qui compte le plus ?',
    choices:['Saluer les clients avec le sourire','Encaisser rapidement','Ranger les rayons','Connaître les prix par cœur'],
    ok:'Saluer les clients avec le sourire',
    explanation:'一番は…笑顔であいさつすること (ichiban wa egao de aisatsu suru koto) = le plus important, c\'est saluer avec le sourire. Encaisser vite, それも大切だけど (important, mais pas le plus).' },

  // ── RÉPONSE ─────────────────────────────────────────────
  { id:'r01', type:'réponse', setting:'Un ami t\'offre un cadeau',
    lines:[
      { who:'M', jp:'これ、京都のお土産。よかったら、どうぞ。', romaji:'Kore, Kyouto no omiyage. Yokattara, douzo.', fr:'Tiens, un souvenir de Kyoto. Si ça te fait plaisir.' }
    ],
    q:'Quelle est la meilleure réponse ?',
    choices:['わあ、ありがとう。開けてもいい？ (Waa, arigatou. Akete mo ii?)','いいえ、どういたしまして。 (Iie, dou itashimashite.)','はい、どうぞ。 (Hai, douzo.)','お土産を買いましょう。 (Omiyage wo kaimashou.)'],
    ok:'わあ、ありがとう。開けてもいい？ (Waa, arigatou. Akete mo ii?)',
    explanation:'On remercie, et demander 開けてもいい？ (je peux l\'ouvrir ?) est très naturel. どういたしまして répond à un merci, pas à un cadeau.' },

  { id:'r02', type:'réponse', setting:'Ton professeur te croise dans le couloir',
    lines:[
      { who:'M', jp:'もう日本の生活には慣れましたか。', romaji:'Mou Nihon no seikatsu ni wa naremashita ka.', fr:'Vous êtes habituée à la vie au Japon maintenant ?' }
    ],
    q:'Quelle est la meilleure réponse ?',
    choices:['はい、だいぶ慣れました。 (Hai, daibu naremashita.)','はい、慣れてください。 (Hai, narete kudasai.)','いいえ、まだ日本に来ません。 (Iie, mada Nihon ni kimasen.)','慣れたことがあります。 (Nareta koto ga arimasu.)'],
    ok:'はい、だいぶ慣れました。 (Hai, daibu naremashita.)',
    explanation:'慣れる = s\'habituer. だいぶ慣れました = je m\'y suis bien habituée. 〜てください serait un ordre, et 〜たことがある parle d\'une expérience passée.' },

  { id:'r03', type:'réponse', setting:'Au restaurant, le serveur revient',
    lines:[
      { who:'F', jp:'お水、もう一杯いかがですか。', romaji:'Omizu, mou ippai ikaga desu ka.', fr:'Un autre verre d\'eau ?' }
    ],
    q:'Tu as assez bu. Quelle est la meilleure réponse ?',
    choices:['いえ、大丈夫です。ありがとうございます。 (Ie, daijoubu desu. Arigatou gozaimasu.)','はい、いかがです。 (Hai, ikaga desu.)','お水をあげます。 (Omizu wo agemasu.)','いいえ、飲みませんでした。 (Iie, nomimasen deshita.)'],
    ok:'いえ、大丈夫です。ありがとうございます。 (Ie, daijoubu desu. Arigatou gozaimasu.)',
    explanation:'大丈夫です est la façon polie de refuser une offre. いかが sert à proposer, pas à répondre.' },

  { id:'r04', type:'réponse', setting:'Une camarade est malade',
    lines:[
      { who:'F', jp:'昨日から熱があって、今日の授業は休むね。', romaji:'Kinou kara netsu ga atte, kyou no jugyou wa yasumu ne.', fr:'J\'ai de la fièvre depuis hier, je ne viendrai pas en cours aujourd\'hui.' }
    ],
    q:'Quelle est la meilleure réponse ?',
    choices:['大丈夫？ゆっくり休んでね。 (Daijoubu? Yukkuri yasunde ne.)','おめでとう！ (Omedetou!)','じゃあ、一緒に行こう。 (Jaa, issho ni ikou.)','熱をあげようか。 (Netsu wo ageyou ka.)'],
    ok:'大丈夫？ゆっくり休んでね。 (Daijoubu? Yukkuri yasunde ne.)',
    explanation:'On montre de l\'inquiétude (大丈夫？) et on souhaite du repos : ゆっくり休んでね (repose-toi bien).' },

  { id:'r05', type:'réponse', setting:'Dans le train, quelqu\'un te parle',
    lines:[
      { who:'M', jp:'すみません、この席、空いていますか。', romaji:'Sumimasen, kono seki, aite imasu ka.', fr:'Excusez-moi, cette place est libre ?' }
    ],
    q:'La place est libre. Quelle est la meilleure réponse ?',
    choices:['はい、どうぞ。 (Hai, douzo.)','いいえ、空いています。 (Iie, aite imasu.)','はい、すみません。 (Hai, sumimasen.)','席を開けてください。 (Seki wo akete kudasai.)'],
    ok:'はい、どうぞ。 (Hai, douzo.)',
    explanation:'はい (oui, elle est libre) + どうぞ (je vous en prie, asseyez-vous). Court et parfait.' },

  { id:'r06', type:'réponse', setting:'Ton patron de baito te demande un service',
    lines:[
      { who:'M', jp:'来週の土曜日、もし時間があったら、手伝ってもらえないかな。', romaji:'Raishuu no doyoubi, moshi jikan ga attara, tetsudatte moraenai ka na.', fr:'Samedi prochain, si tu as le temps, tu pourrais venir aider ?' }
    ],
    q:'Tu es déjà prise samedi. Quelle est la meilleure réponse ?',
    choices:['すみません、その日はちょっと用事があって…。 (Sumimasen, sono hi wa chotto youji ga atte…)','はい、手伝ってもらいます。 (Hai, tetsudatte moraimasu.)','時間があったら、いいですね。 (Jikan ga attara, ii desu ne.)','いいえ、手伝いません。 (Iie, tetsudaimasen.)'],
    ok:'すみません、その日はちょっと用事があって…。 (Sumimasen, sono hi wa chotto youji ga atte…)',
    explanation:'Pour refuser poliment, on s\'excuse et on laisse la phrase en suspens : ちょっと用事があって… (j\'ai un petit empêchement…). Un いいえ sec serait brutal.' }
];
