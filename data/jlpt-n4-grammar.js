// ---------- JLPT N4 : structures de grammaire + quiz à trous ----------
// Même format que N5_GRAMMAR / N5_GRAMMAR_QUIZ. Aucune structure ne répète le N5.
// Quiz : la bonne réponse est toujours en premier dans choices, l'appli mélange.

export const N4_GRAMMAR = [
  { s:'Forme potentielle（〜られる / 〜える）', sRomaji:'-rareru / -eru', fr:'Dire ce qu\'on est capable de faire : « je peux lire », « je sais nager ». C\'est la version courte et naturelle de 〜ことができる.', covered:false, ex:[
    { jp:'漢字が少し読めます', romaji:'Kanji ga sukoshi yomemasu', fr:'Je peux lire un peu les kanji' },
    { jp:'納豆は食べられません', romaji:'Nattou wa taberaremasen', fr:'Je ne peux pas manger de natto' },
    { jp:'ここから清水寺が見えますか？', romaji:'Koko kara Kiyomizu-dera ga miemasu ka?', fr:'On voit le Kiyomizu-dera d\'ici ?' } ]},
  { s:'〜ことができる', sRomaji:'koto ga dekiru', fr:'Même sens que la forme potentielle (« pouvoir faire »), un peu plus posé : on le lit sur les règlements et les panneaux.', covered:false, ex:[
    { jp:'図書館で本を十冊借りることができます', romaji:'Toshokan de hon wo jussatsu kariru koto ga dekimasu', fr:'On peut emprunter dix livres à la bibliothèque' },
    { jp:'このカードでバスに乗ることができますか？', romaji:'Kono kaado de basu ni noru koto ga dekimasu ka?', fr:'Je peux prendre le bus avec cette carte ?' } ]},
  { s:'〜たことがある', sRomaji:'-ta koto ga aru', fr:'Raconter une expérience vécue au moins une fois : « j\'ai déjà… ». Au négatif : « je n\'ai jamais… ».', covered:false, ex:[
    { jp:'抹茶を点てたことがあります', romaji:'Matcha wo tateta koto ga arimasu', fr:'J\'ai déjà préparé du matcha' },
    { jp:'富士山に登ったことがありません', romaji:'Fujisan ni nobotta koto ga arimasen', fr:'Je n\'ai jamais gravi le mont Fuji' } ]},
  { s:'〜たり〜たりする', sRomaji:'-tari -tari suru', fr:'Donner quelques exemples d\'activités sans faire une liste complète : « je fais des choses comme ceci, cela… ».', covered:false, ex:[
    { jp:'週末は寺を見たり、カフェで勉強したりします', romaji:'Shuumatsu wa tera wo mitari, kafe de benkyou shitari shimasu', fr:'Le week-end, je visite des temples, je travaille dans des cafés…' },
    { jp:'雨が降ったり止んだりしています', romaji:'Ame ga futtari yandari shite imasu', fr:'Il pleut par intermittence' } ]},
  { s:'〜つもりだ', sRomaji:'tsumori da', fr:'Annoncer une intention personnelle déjà décidée : « je compte faire… ».', covered:false, ex:[
    { jp:'夏休みに東京へ行くつもりです', romaji:'Natsuyasumi ni Toukyou e iku tsumori desu', fr:'Je compte aller à Tokyo pendant les vacances d\'été' },
    { jp:'今日はお酒を飲まないつもりです', romaji:'Kyou wa osake wo nomanai tsumori desu', fr:'Aujourd\'hui, je compte ne pas boire d\'alcool' } ]},
  { s:'〜予定だ', sRomaji:'yotei da', fr:'Parler d\'un programme fixé, d\'un planning : plus officiel que つもり, on l\'emploie pour les horaires et les événements.', covered:false, ex:[
    { jp:'六ヶ月間京都にいる予定です', romaji:'Rokkagetsukan Kyouto ni iru yotei desu', fr:'Je dois rester six mois à Kyoto' },
    { jp:'授業は九時に始まる予定です', romaji:'Jugyou wa kuji ni hajimaru yotei desu', fr:'Le cours est prévu pour commencer à 9 h' } ]},
  { s:'〜（よ）うと思う', sRomaji:'-(y)ou to omou', fr:'Partager une idée qu\'on a en tête : « je pense faire… », moins ferme que つもり.', covered:false, ex:[
    { jp:'明日、嵐山へ行こうと思います', romaji:'Ashita, Arashiyama e ikou to omoimasu', fr:'Je pense aller à Arashiyama demain' },
    { jp:'日本語の勉強を続けようと思っています', romaji:'Nihongo no benkyou wo tsuzukeyou to omotte imasu', fr:'J\'ai l\'intention de continuer le japonais' } ]},
  { s:'〜なければならない', sRomaji:'-nakereba naranai', fr:'Exprimer une obligation : « je dois… ». À l\'oral, on raccourcit souvent en 〜なきゃ.', covered:true, ex:[
    { jp:'明日までにレポートを出さなければなりません', romaji:'Ashita made ni repooto wo dasanakereba narimasen', fr:'Je dois rendre mon rapport avant demain' },
    { jp:'もう帰らなきゃ', romaji:'Mou kaeranakya', fr:'Il faut que je rentre' } ]},
  { s:'〜なくてもいい', sRomaji:'-nakute mo ii', fr:'Dire que quelque chose n\'est pas obligatoire : « pas besoin de… ».', covered:false, ex:[
    { jp:'靴を脱がなくてもいいですよ', romaji:'Kutsu wo nuganakute mo ii desu yo', fr:'Pas besoin d\'enlever vos chaussures' },
    { jp:'予約しなくてもいいですか？', romaji:'Yoyaku shinakute mo ii desu ka?', fr:'On n\'a pas besoin de réserver ?' } ]},
  { s:'〜たほうがいい', sRomaji:'-ta hou ga ii', fr:'Donner un conseil : « tu ferais mieux de… ». Au négatif : 〜ないほうがいい (« mieux vaut ne pas… »).', covered:false, ex:[
    { jp:'早く寝たほうがいいですよ', romaji:'Hayaku neta hou ga ii desu yo', fr:'Tu ferais mieux de te coucher tôt' },
    { jp:'夏の京都では無理をしないほうがいいです', romaji:'Natsu no Kyouto de wa muri wo shinai hou ga ii desu', fr:'Mieux vaut ne pas forcer pendant l\'été à Kyoto' } ]},
  { s:'〜かもしれない', sRomaji:'kamoshirenai', fr:'Exprimer une possibilité : « peut-être que… ». Les Japonais l\'utilisent beaucoup pour ne pas trop affirmer.', covered:false, ex:[
    { jp:'午後、雨が降るかもしれません', romaji:'Gogo, ame ga furu kamoshiremasen', fr:'Il va peut-être pleuvoir cet après-midi' },
    { jp:'先生はもう帰ったかもしれない', romaji:'Sensei wa mou kaetta kamoshirenai', fr:'Le professeur est peut-être déjà parti' } ]},
  { s:'〜でしょう / 〜だろう', sRomaji:'deshou / darou', fr:'Faire une supposition assez sûre : « sans doute… », comme à la météo. Avec un ton montant, ça sert aussi à chercher l\'accord : « n\'est-ce pas ? ».', covered:false, ex:[
    { jp:'明日は晴れるでしょう', romaji:'Ashita wa hareru deshou', fr:'Demain, il fera sans doute beau' },
    { jp:'疲れたでしょう？', romaji:'Tsukareta deshou?', fr:'Tu dois être fatigué(e), non ?' } ]},
  { s:'〜そうだ（apparence）', sRomaji:'-sou da', fr:'Dire ce que les choses ont l\'air d\'être, d\'après ce qu\'on voit : « ça a l\'air bon », « on dirait qu\'il va pleuvoir ».', covered:false, ex:[
    { jp:'このケーキ、おいしそう！', romaji:'Kono keeki, oishisou!', fr:'Ce gâteau a l\'air délicieux !' },
    { jp:'雨が降りそうですね', romaji:'Ame ga furisou desu ne', fr:'On dirait qu\'il va pleuvoir' } ]},
  { s:'〜そうだ（ouï-dire）', sRomaji:'(forme neutre) sou da', fr:'Rapporter une info qu\'on a entendue ou lue : « il paraît que… ». On colle そうだ à la phrase entière, sans la couper.', covered:false, ex:[
    { jp:'天気予報によると、明日は雪が降るそうです', romaji:'Tenki yohou ni yoru to, ashita wa yuki ga furu sou desu', fr:'D\'après la météo, il paraît qu\'il neigera demain' },
    { jp:'あの店のラーメンはとてもおいしいそうです', romaji:'Ano mise no raamen wa totemo oishii sou desu', fr:'Il paraît que les ramen de ce resto sont excellents' } ]},
  { s:'〜ようだ / 〜みたいだ', sRomaji:'you da / mitai da', fr:'Dire « on dirait que… » à partir d\'indices, ou comparer « comme… ». みたい est la version de tous les jours, ようだ la version plus soignée.', covered:false, ex:[
    { jp:'誰もいないようです', romaji:'Dare mo inai you desu', fr:'On dirait qu\'il n\'y a personne' },
    { jp:'まるで夢みたい！', romaji:'Marude yume mitai!', fr:'On dirait un rêve !' } ]},
  { s:'〜と（si / quand, automatique）', sRomaji:'to', fr:'Dire qu\'une chose entraîne toujours l\'autre : « quand on fait A, B arrive ». Idéal pour les itinéraires et les modes d\'emploi.', covered:false, ex:[
    { jp:'まっすぐ行くと、駅があります', romaji:'Massugu iku to, eki ga arimasu', fr:'Si vous allez tout droit, vous trouverez la gare' },
    { jp:'このボタンを押すと、お湯が出ます', romaji:'Kono botan wo osu to, oyu ga demasu', fr:'Quand on appuie sur ce bouton, l\'eau chaude sort' } ]},
  { s:'〜ば', sRomaji:'-ba', fr:'Poser une condition : « si… ». Souvent pour dire ce qu\'il faut faire pour obtenir un résultat.', covered:false, ex:[
    { jp:'毎日練習すれば、上手になります', romaji:'Mainichi renshuu sureba, jouzu ni narimasu', fr:'Si tu t\'entraînes tous les jours, tu vas progresser' },
    { jp:'安ければ、買います', romaji:'Yasukereba, kaimasu', fr:'Si c\'est pas cher, je l\'achète' } ]},
  { s:'〜たら', sRomaji:'-tara', fr:'Le « si / quand » le plus passe-partout à l\'oral : « si jamais… », « une fois que… ».', covered:false, ex:[
    { jp:'駅に着いたら、電話してください', romaji:'Eki ni tsuitara, denwa shite kudasai', fr:'Appelle-moi quand tu arrives à la gare' },
    { jp:'雨が降ったら、家にいます', romaji:'Ame ga futtara, ie ni imasu', fr:'S\'il pleut, je reste à la maison' } ]},
  { s:'〜なら', sRomaji:'nara', fr:'Rebondir sur ce que l\'autre vient de dire : « si c\'est ça que tu cherches, alors… ». Parfait pour donner une recommandation.', covered:false, ex:[
    { jp:'抹茶なら、宇治がいちばんです', romaji:'Matcha nara, Uji ga ichiban desu', fr:'Pour le matcha, c\'est Uji le meilleur' },
    { jp:'京都へ行くなら、秋がいいですよ', romaji:'Kyouto e iku nara, aki ga ii desu yo', fr:'Si tu vas à Kyoto, l\'automne est idéal' } ]},
  { s:'〜のに', sRomaji:'noni', fr:'Exprimer une surprise ou une déception : « alors que… », « pourtant… ». Le résultat n\'est pas celui qu\'on attendait.', covered:false, ex:[
    { jp:'たくさん勉強したのに、試験に落ちました', romaji:'Takusan benkyou shita noni, shiken ni ochimashita', fr:'J\'ai beaucoup révisé, et pourtant j\'ai raté l\'examen' },
    { jp:'日曜日なのに、学校に行きます', romaji:'Nichiyoubi na noni, gakkou ni ikimasu', fr:'Je vais à l\'école alors qu\'on est dimanche' } ]},
  { s:'〜ので', sRomaji:'node', fr:'Donner une raison avec douceur : « comme… ». Plus poli que から, idéal pour s\'excuser ou expliquer un retard.', covered:false, ex:[
    { jp:'電車が遅れたので、遅刻しました', romaji:'Densha ga okureta node, chikoku shimashita', fr:'Comme le train avait du retard, je suis arrivé(e) en retard' },
    { jp:'熱があるので、今日は休みます', romaji:'Netsu ga aru node, kyou wa yasumimasu', fr:'Comme j\'ai de la fièvre, je ne viens pas aujourd\'hui' } ]},
  { s:'〜し、〜し', sRomaji:'shi, shi', fr:'Empiler plusieurs raisons ou qualités : « en plus… et puis… ».', covered:false, ex:[
    { jp:'この部屋は広いし、駅から近いし、最高です', romaji:'Kono heya wa hiroi shi, eki kara chikai shi, saikou desu', fr:'Cette chambre est grande, en plus proche de la gare : parfait' },
    { jp:'お金もないし、今日は家にいます', romaji:'Okane mo nai shi, kyou wa ie ni imasu', fr:'En plus je n\'ai pas d\'argent, donc je reste chez moi' } ]},
  { s:'〜てしまう', sRomaji:'-te shimau', fr:'Dire qu\'une action est terminée complètement, ou qu\'on l\'a faite sans le vouloir et qu\'on le regrette. À l\'oral : 〜ちゃう.', covered:false, ex:[
    { jp:'財布を忘れてしまいました', romaji:'Saifu wo wasurete shimaimashita', fr:'J\'ai oublié mon portefeuille (zut)' },
    { jp:'ケーキを全部食べちゃった', romaji:'Keeki wo zenbu tabechatta', fr:'J\'ai mangé tout le gâteau' } ]},
  { s:'〜ておく', sRomaji:'-te oku', fr:'Faire quelque chose à l\'avance, pour être prêt plus tard.', covered:false, ex:[
    { jp:'旅行の前にホテルを予約しておきます', romaji:'Ryokou no mae ni hoteru wo yoyaku shite okimasu', fr:'Je réserve l\'hôtel avant le voyage' },
    { jp:'窓を開けておいてください', romaji:'Mado wo akete oite kudasai', fr:'Laissez la fenêtre ouverte, s\'il vous plaît' } ]},
  { s:'〜てみる', sRomaji:'-te miru', fr:'Essayer quelque chose pour voir ce que ça donne : « je vais goûter », « essaie de… ».', covered:false, ex:[
    { jp:'この着物を着てみてもいいですか？', romaji:'Kono kimono wo kite mite mo ii desu ka?', fr:'Je peux essayer ce kimono ?' },
    { jp:'一度、納豆を食べてみてください', romaji:'Ichido, nattou wo tabete mite kudasai', fr:'Goûte le natto au moins une fois' } ]},
  { s:'〜てある', sRomaji:'-te aru', fr:'Décrire le résultat visible d\'une action que quelqu\'un a faite exprès : « c\'est écrit », « c\'est préparé ».', covered:false, ex:[
    { jp:'黒板に名前が書いてあります', romaji:'Kokuban ni namae ga kaite arimasu', fr:'Le nom est écrit au tableau' },
    { jp:'テーブルにお茶が用意してあります', romaji:'Teeburu ni ocha ga youi shite arimasu', fr:'Le thé est déjà prêt sur la table' } ]},
  { s:'あげる / くれる / もらう', sRomaji:'ageru / kureru / morau', fr:'Les trois verbes du don : あげる = je donne à quelqu\'un, くれる = quelqu\'un me donne, もらう = je reçois.', covered:false, ex:[
    { jp:'友達にお土産をあげました', romaji:'Tomodachi ni omiyage wo agemashita', fr:'J\'ai offert un souvenir à un(e) ami(e)' },
    { jp:'先生が辞書をくれました', romaji:'Sensei ga jisho wo kuremashita', fr:'Le professeur m\'a donné un dictionnaire' },
    { jp:'母から手紙をもらいました', romaji:'Haha kara tegami wo moraimashita', fr:'J\'ai reçu une lettre de ma mère' } ]},
  { s:'〜てあげる / 〜てくれる / 〜てもらう', sRomaji:'-te ageru / -te kureru / -te morau', fr:'Les mêmes verbes, mais pour un service rendu : « faire pour quelqu\'un », « quelqu\'un fait pour moi », « je me fais aider ».', covered:false, ex:[
    { jp:'ルームメイトが駅まで送ってくれました', romaji:'Ruumumeito ga eki made okutte kuremashita', fr:'Ma coloc m\'a accompagné(e) jusqu\'à la gare' },
    { jp:'日本人の友達に作文を直してもらいました', romaji:'Nihonjin no tomodachi ni sakubun wo naoshite moraimashita', fr:'Je me suis fait corriger ma rédaction par un ami japonais' },
    { jp:'妹に京都を案内してあげました', romaji:'Imouto ni Kyouto wo annai shite agemashita', fr:'J\'ai fait visiter Kyoto à ma petite sœur' } ]},
  { s:'Passif（〜られる）', sRomaji:'-rareru', fr:'Dire ce qu\'on subit : « je me suis fait gronder », « mon vélo a été volé ». Souvent quand c\'est désagréable pour nous.', covered:false, ex:[
    { jp:'先生に褒められました', romaji:'Sensei ni homeraremashita', fr:'J\'ai été félicité(e) par le professeur' },
    { jp:'電車で足を踏まれました', romaji:'Densha de ashi wo fumaremashita', fr:'On m\'a marché sur le pied dans le train' } ]},
  { s:'Causatif（〜させる）', sRomaji:'-saseru', fr:'Faire faire ou laisser faire quelque chose à quelqu\'un. 〜させてください = « permettez-moi de… », très utile et très poli.', covered:false, ex:[
    { jp:'母は弟に野菜を食べさせます', romaji:'Haha wa otouto ni yasai wo tabesasemasu', fr:'Ma mère fait manger des légumes à mon petit frère' },
    { jp:'少し考えさせてください', romaji:'Sukoshi kangaesasete kudasai', fr:'Laissez-moi réfléchir un peu' } ]},
  { s:'〜やすい / 〜にくい', sRomaji:'-yasui / -nikui', fr:'Dire si une chose est facile ou difficile à faire : « facile à lire », « difficile à comprendre ».', covered:false, ex:[
    { jp:'この辞書は使いやすいです', romaji:'Kono jisho wa tsukaiyasui desu', fr:'Ce dictionnaire est facile à utiliser' },
    { jp:'京都弁は聞き取りにくいです', romaji:'Kyouto-ben wa kikitorinikui desu', fr:'Le dialecte de Kyoto est difficile à comprendre à l\'oreille' } ]},
  { s:'〜すぎる', sRomaji:'-sugiru', fr:'Dire que c\'est « trop » : trop chaud, trop manger, trop cher.', covered:false, ex:[
    { jp:'昨日は飲みすぎました', romaji:'Kinou wa nomisugimashita', fr:'J\'ai trop bu hier' },
    { jp:'この部屋は高すぎます', romaji:'Kono heya wa takasugimasu', fr:'Cette chambre est trop chère' } ]},
  { s:'〜場合（は）', sRomaji:'baai (wa)', fr:'« En cas de… » : la formule des consignes, des règlements et des panneaux.', covered:false, ex:[
    { jp:'地震の場合は、エレベーターを使わないでください', romaji:'Jishin no baai wa, erebeetaa wo tsukawanaide kudasai', fr:'En cas de séisme, n\'utilisez pas l\'ascenseur' },
    { jp:'遅れる場合は、連絡してください', romaji:'Okureru baai wa, renraku shite kudasai', fr:'Si vous êtes en retard, prévenez-nous' } ]},
  { s:'〜ために', sRomaji:'tame ni', fr:'Dire le but d\'une action que l\'on contrôle : « pour… », « afin de… ».', covered:false, ex:[
    { jp:'日本語を勉強するために、京都に来ました', romaji:'Nihongo wo benkyou suru tame ni, Kyouto ni kimashita', fr:'Je suis venu(e) à Kyoto pour étudier le japonais' },
    { jp:'健康のために、毎朝歩きます', romaji:'Kenkou no tame ni, maiasa arukimasu', fr:'Je marche tous les matins pour ma santé' } ]},
  { s:'〜ように', sRomaji:'you ni', fr:'Dire un but qui ne dépend pas complètement de nous : « pour pouvoir… », « pour ne pas… ».', covered:false, ex:[
    { jp:'忘れないように、メモします', romaji:'Wasurenai you ni, memo shimasu', fr:'Je note pour ne pas oublier' },
    { jp:'日本語が話せるように、毎日練習しています', romaji:'Nihongo ga hanaseru you ni, mainichi renshuu shite imasu', fr:'Je m\'entraîne tous les jours pour pouvoir parler japonais' } ]},
  { s:'〜ようになる', sRomaji:'you ni naru', fr:'Décrire un changement progressif : « j\'arrive maintenant à… », « j\'ai fini par… ».', covered:false, ex:[
    { jp:'箸が上手に使えるようになりました', romaji:'Hashi ga jouzu ni tsukaeru you ni narimashita', fr:'J\'arrive maintenant à bien utiliser les baguettes' },
    { jp:'納豆が食べられるようになりました', romaji:'Nattou ga taberareru you ni narimashita', fr:'J\'ai fini par réussir à manger du natto' } ]},
  { s:'〜ことにする', sRomaji:'koto ni suru', fr:'Annoncer une décision qu\'on prend soi-même : « j\'ai décidé de… ».', covered:false, ex:[
    { jp:'来年も京都に住むことにしました', romaji:'Rainen mo Kyouto ni sumu koto ni shimashita', fr:'J\'ai décidé de vivre encore à Kyoto l\'an prochain' },
    { jp:'毎晩、日記を書くことにしています', romaji:'Maiban, nikki wo kaku koto ni shite imasu', fr:'Je me suis fixé d\'écrire un journal chaque soir' } ]},
  { s:'〜ことになる', sRomaji:'koto ni naru', fr:'Annoncer une décision prise par d\'autres ou par les circonstances : « il a été décidé que… ».', covered:false, ex:[
    { jp:'来月、大阪で働くことになりました', romaji:'Raigetsu, Oosaka de hataraku koto ni narimashita', fr:'Il a été décidé que je travaillerai à Osaka le mois prochain' },
    { jp:'授業はオンラインで行うことになりました', romaji:'Jugyou wa onrain de okonau koto ni narimashita', fr:'Les cours se feront finalement en ligne' } ]},
  { s:'〜かどうか', sRomaji:'ka dou ka', fr:'Glisser une question oui/non dans une phrase : « je ne sais pas si… ».', covered:false, ex:[
    { jp:'明日来られるかどうか、わかりません', romaji:'Ashita korareru ka dou ka, wakarimasen', fr:'Je ne sais pas si je pourrai venir demain' },
    { jp:'この店が開いているかどうか、調べます', romaji:'Kono mise ga aite iru ka dou ka, shirabemasu', fr:'Je vais vérifier si cette boutique est ouverte' } ]},
  { s:'Mot interrogatif + か（いつか / どこか / 何か…）', sRomaji:'itsu ka / doko ka / nani ka', fr:'Ajouter か à un mot interrogatif pour dire « quelque part », « quelque chose », « un jour ». Glisser une question dans la phrase marche aussi : どこにあるか知っていますか.', covered:false, ex:[
    { jp:'いつか富士山に登りたいです', romaji:'Itsuka Fujisan ni noboritai desu', fr:'J\'aimerais gravir le mont Fuji un jour' },
    { jp:'何か飲みませんか？', romaji:'Nanika nomimasen ka?', fr:'On boit quelque chose ?' },
    { jp:'駅がどこにあるか知っていますか？', romaji:'Eki ga doko ni aru ka shitte imasu ka?', fr:'Vous savez où se trouve la gare ?' } ]},
  { s:'Keigo de respect（いらっしゃる・召し上がる・おっしゃる…）', sRomaji:'irassharu / meshiagaru / ossharu', fr:'Des verbes spéciaux pour parler avec respect de ce que font les autres (clients, professeurs). Tu les entendras surtout dans les boutiques et à l\'université.', covered:false, ex:[
    { jp:'先生は研究室にいらっしゃいますか？', romaji:'Sensei wa kenkyuushitsu ni irasshaimasu ka?', fr:'Le professeur est-il dans son bureau ?' },
    { jp:'どうぞ召し上がってください', romaji:'Douzo meshiagatte kudasai', fr:'Je vous en prie, servez-vous' } ]},
  { s:'お〜になる', sRomaji:'o- ni naru', fr:'La recette pour rendre presque n\'importe quel verbe respectueux quand on parle de ce que fait l\'autre.', covered:false, ex:[
    { jp:'先生はもうお帰りになりました', romaji:'Sensei wa mou okaeri ni narimashita', fr:'Le professeur est déjà rentré' },
    { jp:'この本をお読みになりましたか？', romaji:'Kono hon wo oyomi ni narimashita ka?', fr:'Avez-vous lu ce livre ?' } ]},
  { s:'Keigo modeste（お〜します・参る・いたす…）', sRomaji:'o- shimasu / mairu / itasu', fr:'Se faire tout petit en parlant de ce que JE fais pour quelqu\'un : « je vais vous porter ça », « je m\'appelle… ».', covered:false, ex:[
    { jp:'荷物をお持ちします', romaji:'Nimotsu wo omochi shimasu', fr:'Je vais porter vos bagages' },
    { jp:'フランスから参りました', romaji:'Furansu kara mairimashita', fr:'Je viens de France' },
    { jp:'よろしくお願いいたします', romaji:'Yoroshiku onegai itashimasu', fr:'Je compte sur vous (très poli)' } ]},
  { s:'〜ても', sRomaji:'-te mo', fr:'Dire « même si… » : le résultat ne change pas malgré la condition.', covered:false, ex:[
    { jp:'雨が降っても、行きます', romaji:'Ame ga futte mo, ikimasu', fr:'J\'irai même s\'il pleut' },
    { jp:'何回聞いても、わかりません', romaji:'Nankai kiite mo, wakarimasen', fr:'J\'ai beau écouter plusieurs fois, je ne comprends pas' } ]},
  { s:'〜ないで', sRomaji:'-naide', fr:'Dire « sans faire… » ou demander gentiment de ne pas faire : 〜ないでください.', covered:false, ex:[
    { jp:'朝ご飯を食べないで、学校に来ました', romaji:'Asagohan wo tabenaide, gakkou ni kimashita', fr:'Je suis venu(e) en cours sans petit-déjeuner' },
    { jp:'ここで写真を撮らないでください', romaji:'Koko de shashin wo toranaide kudasai', fr:'Ne prenez pas de photos ici, s\'il vous plaît' } ]},
  { s:'〜はずだ', sRomaji:'hazu da', fr:'Dire ce qui devrait logiquement être vrai : « normalement… », « il devrait… ».', covered:false, ex:[
    { jp:'バスはもうすぐ来るはずです', romaji:'Basu wa mou sugu kuru hazu desu', fr:'Le bus devrait arriver d\'une minute à l\'autre' },
    { jp:'彼女は今日休みのはずです', romaji:'Kanojo wa kyou yasumi no hazu desu', fr:'Normalement, elle ne travaille pas aujourd\'hui' } ]},
];

export const N4_GRAMMAR_QUIZ = [
  { q:'漢字が少し読＿＿ます。', qRomaji:'Kanji ga sukoshi yo___ masu.', choices:['め','む','ま','も'], choicesRomaji:['me','mu','ma','mo'], ok:'め', explanation:'読む → 読める : la forme potentielle (« je peux lire ») change le u final en e + る.' },
  { q:'抹茶を点てた＿＿があります。', qRomaji:'Matcha wo tateta ___ ga arimasu.', choices:['こと','もの','の','ところ'], choicesRomaji:['koto','mono','no','tokoro'], ok:'こと', explanation:'〜たことがある = « j\'ai déjà fait… », pour raconter une expérience vécue.' },
  { q:'週末は寺を見＿＿、カフェで勉強したりします。', qRomaji:'Shuumatsu wa tera wo mi___, kafe de benkyou shitari shimasu.', choices:['たり','たら','ても','て'], choicesRomaji:['tari','tara','temo','te'], ok:'たり', explanation:'〜たり〜たりする : on cite quelques activités en exemple. Les deux verbes prennent たり.' },
  { q:'夏休みに東京へ行く＿＿です。', qRomaji:'Natsuyasumi ni Toukyou e iku ___ desu.', choices:['つもり','ため','ほう','はず'], choicesRomaji:['tsumori','tame','hou','hazu'], ok:'つもり', explanation:'〜つもりです = « je compte faire… », une intention personnelle déjà décidée.' },
  { q:'明日、嵐山へ行＿＿と思います。', qRomaji:'Ashita, Arashiyama e i___ to omoimasu.', choices:['こう','く','け','った'], choicesRomaji:['kou','ku','ke','tta'], ok:'こう', explanation:'行こう（ikou）+ と思います = « je pense aller… ». La forme en -ou exprime l\'intention.' },
  { q:'明日までにレポートを出さなければ＿＿＿＿。', qRomaji:'Ashita made ni repooto wo dasanakereba ___.', choices:['なりません','いけます','できません','ありません'], choicesRomaji:['narimasen','ikemasu','dekimasen','arimasen'], ok:'なりません', explanation:'〜なければなりません = « je dois… ». On retient le bloc entier.' },
  { q:'靴を脱がなくても＿＿ですよ。', qRomaji:'Kutsu wo nuganakute mo ___ desu yo.', choices:['いい','だめ','いけない','ならない'], choicesRomaji:['ii','dame','ikenai','naranai'], ok:'いい', explanation:'〜なくてもいい = « pas besoin de… » : ce n\'est pas obligatoire.' },
  { q:'早く寝た＿＿がいいですよ。', qRomaji:'Hayaku neta ___ ga ii desu yo.', choices:['ほう','こと','もの','ところ'], choicesRomaji:['hou','koto','mono','tokoro'], ok:'ほう', explanation:'〜たほうがいい = « tu ferais mieux de… », pour donner un conseil.' },
  { q:'午後、雨が降る＿＿＿＿＿。', qRomaji:'Gogo, ame ga furu ___.', choices:['かもしれません','そうです','ようにします','ことにします'], choicesRomaji:['kamoshiremasen','sou desu','you ni shimasu','koto ni shimasu'], ok:'かもしれません', explanation:'かもしれません = « peut-être ». Ici : il va peut-être pleuvoir.' },
  { q:'明日は晴れる＿＿＿＿。', qRomaji:'Ashita wa hareru ___.', choices:['でしょう','ましょう','ください','ません'], choicesRomaji:['deshou','mashou','kudasai','masen'], ok:'でしょう', explanation:'でしょう = « sans doute », la supposition de la météo. ましょう, lui, propose de faire quelque chose ensemble.' },
  { q:'このケーキ、おいし＿＿！', qRomaji:'Kono keeki, oishi___!', choices:['そう','よう','みたい','らしい'], choicesRomaji:['sou','you','mitai','rashii'], ok:'そう', explanation:'おいしい → おいしそう : on enlève le い final et on ajoute そう = « ça a l\'air bon » (d\'après ce qu\'on voit).' },
  { q:'天気予報によると、明日は雪が降る＿＿です。', qRomaji:'Tenki yohou ni yoru to, ashita wa yuki ga furu ___ desu.', choices:['そう','よう','つもり','ため'], choicesRomaji:['sou','you','tsumori','tame'], ok:'そう', explanation:'Phrase complète + そうです = « il paraît que… ». Ici on rapporte la météo.' },
  { q:'まるで夢＿＿＿！', qRomaji:'Marude yume ___!', choices:['みたい','そう','ため','はず'], choicesRomaji:['mitai','sou','tame','hazu'], ok:'みたい', explanation:'名詞 + みたい = « comme… », « on dirait… ». まるで renforce la comparaison.' },
  { q:'まっすぐ行く＿、駅があります。', qRomaji:'Massugu iku ___, eki ga arimasu.', choices:['と','ば','なら','ので'], choicesRomaji:['to','ba','nara','node'], ok:'と', explanation:'〜と = « quand on fait A, on tombe sur B ». C\'est le « si » des itinéraires.' },
  { q:'毎日練習す＿＿、上手になります。', qRomaji:'Mainichi renshuu su___, jouzu ni narimasu.', choices:['れば','ると','たら','ても'], choicesRomaji:['reba','ru to','tara','temo'], ok:'れば', explanation:'する → すれば = « si tu fais… ». ば met l\'accent sur la condition à remplir pour obtenir le résultat.' },
  { q:'駅に着い＿＿、電話してください。', qRomaji:'Eki ni tsui___, denwa shite kudasai.', choices:['たら','たり','ても','て'], choicesRomaji:['tara','tari','temo','te'], ok:'たら', explanation:'〜たら = « quand / une fois que… ». C\'est le seul qui marche avec une demande (してください) juste après.' },
  { q:'抹茶＿＿、宇治がいちばんです。', qRomaji:'Matcha ___, Uji ga ichiban desu.', choices:['なら','から','まで','より'], choicesRomaji:['nara','kara','made','yori'], ok:'なら', explanation:'〜なら = « si c\'est de … qu\'on parle, alors… ». Parfait pour recommander.' },
  { q:'たくさん勉強した＿＿、試験に落ちました。', qRomaji:'Takusan benkyou shita ___, shiken ni ochimashita.', choices:['のに','ので','から','ために'], choicesRomaji:['noni','node','kara','tame ni'], ok:'のに', explanation:'〜のに = « et pourtant ». Le résultat (rater l\'examen) va contre ce qu\'on attendait.' },
  { q:'熱がある＿＿、今日は休みます。', qRomaji:'Netsu ga aru ___, kyou wa yasumimasu.', choices:['ので','のに','でも','ても'], choicesRomaji:['node','noni','demo','temo'], ok:'ので', explanation:'〜ので = « comme… », une raison donnée poliment. Idéal pour s\'excuser auprès d\'un professeur.' },
  { q:'この部屋は広い＿、駅から近いし、最高です。', qRomaji:'Kono heya wa hiroi ___, eki kara chikai shi, saikou desu.', choices:['し','と','が','も'], choicesRomaji:['shi','to','ga','mo'], ok:'し', explanation:'〜し、〜し = on empile les raisons : « grande, en plus proche de la gare… ».' },
  { q:'財布を忘れて＿＿＿＿ました。', qRomaji:'Saifu wo wasurete ___ mashita.', choices:['しまい','おき','あり','み'], choicesRomaji:['shimai','oki','ari','mi'], ok:'しまい', explanation:'〜てしまいました = « j\'ai fait… (et c\'est embêtant) ». Ici : zut, j\'ai oublié mon portefeuille.' },
  { q:'旅行の前にホテルを予約して＿＿ます。', qRomaji:'Ryokou no mae ni hoteru wo yoyaku shite ___ masu.', choices:['おき','しまい','あり','い'], choicesRomaji:['oki','shimai','ari','i'], ok:'おき', explanation:'〜ておきます = faire à l\'avance pour être prêt. 前に (avant) est l\'indice.' },
  { q:'この着物を着て＿＿もいいですか？', qRomaji:'Kono kimono wo kite ___ mo ii desu ka?', choices:['みて','おいて','あって','いて'], choicesRomaji:['mite','oite','atte','ite'], ok:'みて', explanation:'〜てみる = essayer pour voir. 着てみてもいいですか = « je peux l\'essayer ? ».' },
  { q:'黒板に名前が書いて＿＿ます。', qRomaji:'Kokuban ni namae ga kaite ___ masu.', choices:['あり','い','おき','しまい'], choicesRomaji:['ari','i','oki','shimai'], ok:'あり', explanation:'Objet + が + 〜てあります = le résultat visible d\'une action faite exprès : « c\'est écrit ».' },
  { q:'先生が辞書を＿＿＿ました。', qRomaji:'Sensei ga jisho wo ___ mashita.', choices:['くれ','あげ','もらい','やり'], choicesRomaji:['kure','age','morai','yari'], ok:'くれ', explanation:'Quelqu\'un me donne → くれる. あげる, c\'est quand moi je donne à quelqu\'un.' },
  { q:'日本人の友達に作文を直して＿＿＿ました。', qRomaji:'Nihonjin no tomodachi ni sakubun wo naoshite ___ mashita.', choices:['もらい','くれ','あげ','おき'], choicesRomaji:['morai','kure','age','oki'], ok:'もらい', explanation:'〜てもらう = « je me fais aider par… ». La personne qui aide est marquée par に.' },
  { q:'電車で足を踏＿＿＿ました。', qRomaji:'Densha de ashi wo fu___ mashita.', choices:['まれ','ませ','め','み'], choicesRomaji:['mare','mase','me','mi'], ok:'まれ', explanation:'踏む → 踏まれる : on subit l\'action (on m\'a marché sur le pied).' },
  { q:'少し考え＿＿＿ください。', qRomaji:'Sukoshi kangae___ kudasai.', choices:['させて','られて','て','たり'], choicesRomaji:['sasete','rarete','te','tari'], ok:'させて', explanation:'〜させてください = « laissez-moi… », une demande de permission très polie.' },
  { q:'この辞書は使い＿＿＿です。', qRomaji:'Kono jisho wa tsukai___ desu.', choices:['やすい','すぎ','たい','そう'], choicesRomaji:['yasui','sugi','tai','sou'], ok:'やすい', explanation:'Racine du verbe + やすい = facile à faire. 使いやすい = facile à utiliser.' },
  { q:'昨日は飲み＿＿＿ました。', qRomaji:'Kinou wa nomi___ mashita.', choices:['すぎ','やすい','たい','ながら'], choicesRomaji:['sugi','yasui','tai','nagara'], ok:'すぎ', explanation:'Racine du verbe + すぎる = faire trop. 飲みすぎました = j\'ai trop bu.' },
  { q:'地震の＿＿＿は、エレベーターを使わないでください。', qRomaji:'Jishin no ___ wa, erebeetaa wo tsukawanaide kudasai.', choices:['場合','ため','とき','まえ'], choicesRomaji:['baai','tame','toki','mae'], ok:'場合', explanation:'〜の場合は = « en cas de… », la tournure des consignes de sécurité.' },
  { q:'日本語を勉強する＿＿＿、京都に来ました。', qRomaji:'Nihongo wo benkyou suru ___, Kyouto ni kimashita.', choices:['ために','ように','のに','ので'], choicesRomaji:['tame ni','you ni','noni','node'], ok:'ために', explanation:'〜ために = « pour / afin de », un but que tu contrôles toi-même (venir étudier).' },
  { q:'忘れない＿＿＿、メモします。', qRomaji:'Wasurenai ___, memo shimasu.', choices:['ように','ために','のに','ので'], choicesRomaji:['you ni','tame ni','noni','node'], ok:'ように', explanation:'Avec un verbe qu\'on ne contrôle pas vraiment (oublier), le but se dit avec ように : « pour ne pas oublier ».' },
  { q:'箸が上手に使える＿＿＿なりました。', qRomaji:'Hashi ga jouzu ni tsukaeru ___ narimashita.', choices:['ように','ことに','ために','そうに'], choicesRomaji:['you ni','koto ni','tame ni','sou ni'], ok:'ように', explanation:'〜ようになりました = « j\'arrive maintenant à… », un progrès qui s\'est fait petit à petit.' },
  { q:'来年も京都に住む＿＿＿しました。', qRomaji:'Rainen mo Kyouto ni sumu ___ shimashita.', choices:['ことに','ように','ために','つもりに'], choicesRomaji:['koto ni','you ni','tame ni','tsumori ni'], ok:'ことに', explanation:'〜ことにしました = « j\'ai décidé de… », une décision que tu prends toi-même.' },
  { q:'来月、大阪で働くことに＿＿＿ました。', qRomaji:'Raigetsu, Oosaka de hataraku koto ni ___ mashita.', choices:['なり','し','あり','い'], choicesRomaji:['nari','shi','ari','i'], ok:'なり', explanation:'〜ことになりました = la décision vient des circonstances ou des autres, pas de toi.' },
  { q:'明日来られる＿＿＿＿、わかりません。', qRomaji:'Ashita korareru ___, wakarimasen.', choices:['かどうか','かもしれない','ので','のに'], choicesRomaji:['ka dou ka','kamoshirenai','node','noni'], ok:'かどうか', explanation:'〜かどうか = « si oui ou non ». On glisse une question oui/non dans la phrase.' },
  { q:'何＿飲みませんか？', qRomaji:'Nani___ nomimasen ka?', choices:['か','も','が','を'], choicesRomaji:['ka','mo','ga','wo'], ok:'か', explanation:'何か = « quelque chose ». 何も, lui, s\'utilise avec une phrase négative : « rien ».' },
  { q:'先生は研究室に＿＿＿＿＿か？', qRomaji:'Sensei wa kenkyuushitsu ni ___ ka?', choices:['いらっしゃいます','まいります','おります','いたします'], choicesRomaji:['irasshaimasu','mairimasu','orimasu','itashimasu'], ok:'いらっしゃいます', explanation:'On parle du professeur avec respect : いらっしゃる. まいる, おる, いたす servent à parler modestement de soi.' },
  { q:'荷物をお持ち＿＿＿。', qRomaji:'Nimotsu wo omochi ___.', choices:['します','になります','されます','ください'], choicesRomaji:['shimasu','ni narimasu','saremasu','kudasai'], ok:'します', explanation:'お + racine + します = je fais ça pour vous, en me faisant modeste. お〜になります, c\'est pour ce que fait l\'autre.' },
  { q:'雨が降って＿、行きます。', qRomaji:'Ame ga futte ___, ikimasu.', choices:['も','は','から','ので'], choicesRomaji:['mo','wa','kara','node'], ok:'も', explanation:'〜ても = « même si ». J\'irai même s\'il pleut.' },
  { q:'バスはもうすぐ来る＿＿です。', qRomaji:'Basu wa mou sugu kuru ___ desu.', choices:['はず','つもり','ため','ほう'], choicesRomaji:['hazu','tsumori','tame','hou'], ok:'はず', explanation:'〜はずです = « normalement, ça devrait… ». On déduit à partir de ce qu\'on sait (les horaires).' },
];
