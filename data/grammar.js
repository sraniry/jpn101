export const GRAMMAR_HTML = `
    <div class="gram-section">
      <h3>La règle d'or : le verbe à la fin</h3>
      <p>En français : Sujet–Verbe–Complément. En japonais : Sujet–Complément–Verbe. Le verbe (ou です) ferme toujours la phrase.</p>
      <div class="gram-callout">FR : « Je mange du ramen au restaurant. »<br>JP : <span class="jp jp-say" data-jp="私はレストランでラーメンを食べます">私は レストランで ラーメンを 食べます 🔊</span><br><span class="romaji-line">Watashi wa resutoran de raamen wo tabemasu</span><br>(moi / restaurant-au / ramen / mange). Si tu ne comprends pas le début d'une phrase, <b>attends la fin</b> : c'est là qu'est l'action.</div>
    </div>

    <div class="gram-section">
      <h3>Les particules — le ciment de la phrase</h3>
      <p>Ces petits mots indiquent le rôle de chaque mot. Tu n'as pas à les « apprendre » : il suffit de les reconnaître.</p>
      <table class="gram">
        <tr><th>Particule</th><th>Rôle</th><th>Exemple</th></tr>
        <tr><td class="jpc">は <span class="romaji-sm">(wa)</span></td><td>Le thème : « quant à… »</td><td>私は学生です <span class="romaji-sm">Watashi wa gakusei desu</span><br>— Moi, je suis étudiant</td></tr>
        <tr><td class="jpc">が <span class="romaji-sm">(ga)</span></td><td>Sujet grammatical, emphase</td><td>日本語がわかります <span class="romaji-sm">Nihongo ga wakarimasu</span><br>— Je comprends le japonais</td></tr>
        <tr><td class="jpc">を <span class="romaji-sm">(o)</span></td><td>Objet direct (ce qu'on manipule)</td><td>ビールを飲む <span class="romaji-sm">Biiru wo nomu</span><br>— Boire de la bière</td></tr>
        <tr><td class="jpc">に <span class="romaji-sm">(ni)</span></td><td>Destination, moment précis</td><td>京都に行く <span class="romaji-sm">Kyouto ni iku</span><br>— Aller à Kyoto</td></tr>
        <tr><td class="jpc">で <span class="romaji-sm">(de)</span></td><td>Lieu de l'action, moyen</td><td>バスで行く <span class="romaji-sm">Basu de iku</span><br>— Y aller en bus</td></tr>
        <tr><td class="jpc">の <span class="romaji-sm">(no)</span></td><td>Possession (≈ « de »)</td><td>私の友達 <span class="romaji-sm">Watashi no tomodachi</span><br>— Mon ami</td></tr>
        <tr><td class="jpc">から / まで <span class="romaji-sm">(kara / made)</span></td><td>De… / Jusqu'à…</td><td>駅から大学まで <span class="romaji-sm">Eki kara daigaku made</span><br>— De la gare à la fac</td></tr>
        <tr><td class="jpc">か <span class="romaji-sm">(ka)</span></td><td>Point d'interrogation oral</td><td>本ですか？ <span class="romaji-sm">Hon desu ka?</span><br>— C'est un livre ?</td></tr>
        <tr><td class="jpc">ね / よ <span class="romaji-sm">(ne / yo)</span></td><td>Cherche l'accord / Affirme</td><td>いいですね <span class="romaji-sm">Ii desu ne</span><br>— C'est bien, non ?</td></tr>
      </table>
    </div>

    <div class="gram-section">
      <h3>Conjugaison : tout part du verbe poli en -ます <span class="romaji-sm">(-masu)</span></h3>
      <p>Pour l'oral, la forme polie -ます (-masu) suffit à 90 % des situations. Voici les transformations à reconnaître :</p>
      <table class="gram">
        <tr><th>Forme</th><th>Sens</th><th>Exemple (行く iku = aller)</th></tr>
        <tr><td class="jpc">-ます <span class="romaji-sm">(-masu)</span></td><td>Présent/futur poli</td><td>行きます <span class="romaji-sm">ikimasu</span> — je vais / j'irai</td></tr>
        <tr><td class="jpc">-ません <span class="romaji-sm">(-masen)</span></td><td>Négatif poli</td><td>行きません <span class="romaji-sm">ikimasen</span> — je ne vais pas</td></tr>
        <tr><td class="jpc">-ました <span class="romaji-sm">(-mashita)</span></td><td>Passé poli</td><td>行きました <span class="romaji-sm">ikimashita</span> — je suis allé</td></tr>
        <tr><td class="jpc">-たいです <span class="romaji-sm">(-tai desu)</span></td><td>« Je veux ~ »</td><td>行きたいです <span class="romaji-sm">ikitai desu</span> — je veux y aller</td></tr>
        <tr><td class="jpc">-て + ください <span class="romaji-sm">(-te kudasai)</span></td><td>« Fais ~ stp »</td><td>行ってください <span class="romaji-sm">itte kudasai</span> — allez-y stp</td></tr>
        <tr><td class="jpc">-ませんか <span class="romaji-sm">(-masen ka)</span></td><td>Invitation polie</td><td>行きませんか <span class="romaji-sm">ikimasen ka</span> — on y va ?</td></tr>
        <tr><td class="jpc">-ましょう <span class="romaji-sm">(-mashou)</span></td><td>« Faisons ~ »</td><td>行きましょう <span class="romaji-sm">ikimashou</span> — allons-y</td></tr>
        <tr><td class="jpc">-ことができます <span class="romaji-sm">(-koto ga dekimasu)</span></td><td>« Je peux / sais ~ »</td><td>行くことができます <span class="romaji-sm">iku koto ga dekimasu</span> — je peux y aller</td></tr>
        <tr><td class="jpc">-なければなりません <span class="romaji-sm">(-nakereba narimasen)</span></td><td>« Je dois ~ »</td><td>行かなければなりません <span class="romaji-sm">ikanakereba narimasen</span> — je dois y aller</td></tr>
      </table>
      <div class="gram-callout"><b>Astuce de francophone :</b> le japonais n'a pas de futur distinct du présent, ni de genre, ni de pluriel sur le verbe. 行きます <span class="romaji-sm">(ikimasu)</span> peut vouloir dire « je vais », « il va », « ils iront ». Le contexte tranche.</div>
    </div>

    <div class="gram-section">
      <h3>Les deux familles d'adjectifs</h3>
      <table class="gram">
        <tr><th>Type</th><th>Caractéristique</th><th>Exemple</th></tr>
        <tr><td class="jpc">adjectif-い <span class="romaji-sm">(-i)</span></td><td>Finit par い, se conjugue seul</td><td>おいしい <span class="romaji-sm">oishii</span> → おいしかった <span class="romaji-sm">oishikatta</span> (c'était bon)</td></tr>
        <tr><td class="jpc">adjectif-な <span class="romaji-sm">(-na)</span></td><td>Prend な devant un nom, sinon です</td><td>きれいな花 <span class="romaji-sm">kirei na hana</span> (une belle fleur) / きれいです <span class="romaji-sm">kirei desu</span></td></tr>
      </table>
      <p>好き <span class="romaji-sm">(suki)</span> = aimé, 嫌い <span class="romaji-sm">(kirai)</span> = détesté, 元気 <span class="romaji-sm">(genki)</span> = en forme sont des adjectifs-な — d'où « 〜が好きです » et pas un verbe « aimer ».</p>
    </div>

    <div class="gram-section">
      <h3>です vs ます — les deux confondues, mais différentes</h3>
      <p>Les deux sont polies, mais elles ne se mettent jamais sur le même type de mot. C'est la confusion la plus fréquente chez les francophones débutants.</p>
      <table class="gram">
        <tr><th>Forme</th><th>S'utilise avec</th><th>Exemple</th></tr>
        <tr><td class="jpc">です <span class="romaji-sm">(desu)</span></td><td>Noms et adjectifs (jamais un verbe)</td><td>学生です <span class="romaji-sm">gakusei desu</span> — je suis étudiant<br>おいしいです <span class="romaji-sm">oishii desu</span> — c'est bon</td></tr>
        <tr><td class="jpc">ます <span class="romaji-sm">(masu)</span></td><td>Verbes uniquement, à la fin du radical poli</td><td>食べます <span class="romaji-sm">tabemasu</span> — je mange<br>行きます <span class="romaji-sm">ikimasu</span> — je vais</td></tr>
      </table>
      <div class="gram-callout">Astuce : si le mot juste avant pourrait recevoir un « être » en français (je suis étudiant, c'est bon), c'est です. Si c'est une action (manger, aller, faire), c'est ます. On ne dit jamais 食べだ or 学生ます — chacun reste dans sa famille.</div>
    </div>

    <div class="gram-section">
      <h3>あります vs います — les deux « il y a »</h3>
      <p>Le japonais a deux verbes d'existence différents selon que le sujet est animé ou non. Le français n'a qu'« il y a » pour tout — d'où la confusion.</p>
      <table class="gram">
        <tr><th>Verbe</th><th>Pour</th><th>Exemple</th></tr>
        <tr><td class="jpc">あります <span class="romaji-sm">(arimasu)</span></td><td>Choses, objets inanimés</td><td>Wi-Fiはありますか？ <span class="romaji-sm">Wi-Fi wa arimasu ka?</span> — Il y a du Wi-Fi ?<br>本があります <span class="romaji-sm">hon ga arimasu</span> — il y a un livre</td></tr>
        <tr><td class="jpc">います <span class="romaji-sm">(imasu)</span></td><td>Personnes, animaux (êtres vivants)</td><td>彼女はいますか？ <span class="romaji-sm">kanojo wa imasu ka?</span> — Tu as une copine ?<br>猫がいます <span class="romaji-sm">neko ga imasu</span> — il y a un chat</td></tr>
      </table>
      <div class="gram-callout">Piège classique : 彼女はあります ✗ (faux, elle n'est pas un objet !) → 彼女はいます ✓. À l'inverse, Wi-Fiはいます ✗ → Wi-Fiはあります ✓.</div>
    </div>

    <div class="gram-section">
      <h3>Phrases-modèles à retenir par cœur</h3>
      <p>Ces squelettes reviennent partout — change juste le mot entre crochets et la phrase fonctionne dans des dizaines de situations.</p>
      <table class="gram">
        <tr><th>Squelette</th><th>Exemple concret</th></tr>
        <tr><td class="jpc">[lieu]はどこですか？</td><td>駅はどこですか？ <span class="romaji-sm">Eki wa doko desu ka?</span> — Où est la gare ?</td></tr>
        <tr><td class="jpc">[chose]はありますか？</td><td>メニューはありますか？ <span class="romaji-sm">Menyuu wa arimasu ka?</span> — Vous avez un menu ?</td></tr>
        <tr><td class="jpc">[nom]が好きです</td><td>寿司が好きです <span class="romaji-sm">Sushi ga suki desu</span> — J'aime les sushis</td></tr>
        <tr><td class="jpc">[verbe-たい]です</td><td>休みたいです <span class="romaji-sm">Yasumitai desu</span> — Je veux me reposer</td></tr>
        <tr><td class="jpc">[verbe-て]ください</td><td>待ってください <span class="romaji-sm">Matte kudasai</span> — Attendez s'il vous plaît</td></tr>
        <tr><td class="jpc">[lieu]に行きたいです</td><td>大阪に行きたいです <span class="romaji-sm">Oosaka ni ikitai desu</span> — Je veux aller à Osaka</td></tr>
        <tr><td class="jpc">[action]ませんか？</td><td>食べませんか？ <span class="romaji-sm">Tabemasen ka?</span> — On mange (ensemble) ?</td></tr>
        <tr><td class="jpc">[chose]をください</td><td>水をください <span class="romaji-sm">Mizu wo kudasai</span> — De l'eau, s'il vous plaît</td></tr>
      </table>
    </div>

    <div class="gram-section">
      <h3>Expressions idiomatiques à ne pas traduire mot à mot</h3>
      <div class="gram-callout"><span class="jp jp-say" data-jp="よろしくお願いします">よろしくお願いします 🔊</span> <span class="romaji-sm">(Yoroshiku onegaishimasu)</span> — pas de traduction littérale. Clôt toute présentation : « comptez sur moi / soyons bien ensemble ».</div>
      <div class="gram-callout"><span class="jp jp-say" data-jp="お疲れ様です">お疲れ様です 🔊</span> <span class="romaji-sm">(Otsukaresama desu)</span> — « tu as dû être fatigué » = salut/merci entre collègues, à toute heure.</div>
      <div class="gram-callout"><span class="jp jp-say" data-jp="～んですが">〜んですが… 🔊</span> <span class="romaji-sm">(~n desu ga)</span> — laisse la phrase ouverte sur が. Adoucit une demande : « voilà la situation… (pouvez-vous m'aider ?) ».</div>
      <div class="gram-callout"><span class="jp jp-say" data-jp="～てもらえますか">〜てもらえますか 🔊</span> <span class="romaji-sm">(~te moraemasu ka)</span> — « puis-je recevoir que vous fassiez ~ ? » = la façon polie de demander un service.</div>
      <div class="gram-callout"><b>La négation = politesse.</b> 一緒に行きませんか <span class="romaji-sm">(Issho ni ikimasen ka)</span> (« vous ne venez pas ? ») est plus poli que 行きますか <span class="romaji-sm">(ikimasu ka)</span>. Inviter par la forme négative laisse à l'autre la liberté de refuser.</div>
    </div>

    <div class="gram-section">
      <h3>Prononciation : les pièges du francophone</h3>
      <table class="gram">
        <tr><th>Son</th><th>Comment faire</th></tr>
        <tr><td class="jpc">u final</td><td>Presque muet : です <span class="romaji-sm">(desu)</span> se dit « dess », pas « dessou »</td></tr>
        <tr><td class="jpc">r</td><td>Entre L et R, la langue rebondit. Jamais roulé</td></tr>
        <tr><td class="jpc">tsu (つ)</td><td>« ts » soufflé + u court, pas « tsou »</td></tr>
        <tr><td class="jpc">double consonne</td><td>きって <span class="romaji-sm">(kitte)</span> : petite pause sur le t</td></tr>
        <tr><td class="jpc">voyelle longue</td><td>おばさん <span class="romaji-sm">(obasan)</span> tante ≠ おばあさん <span class="romaji-sm">(obaasan)</span> grand-mère : la longueur change le sens</td></tr>
        <tr><td class="jpc">voyelles</td><td>A-I-U-E-O toujours pures et courtes, jamais nasalisées</td></tr>
      </table>
    </div>
  `;
