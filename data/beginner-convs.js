// Dialogues très courts pour grand débutant (ids b-…). Contenu original, relecture native recommandée.
export const BEGINNER_CONVS = [
 {
  "id": "b-salut",
  "icon": "👋",
  "title": "Se présenter",
  "skill": "relation",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "はじめまして。おなまえは？",
    "romaji": "Hajimemashite. Onamae wa?",
    "fr": "Enchanté(e). Comment tu t'appelles ?",
    "breakdown": [
     {
      "chunk": "はじめまして",
      "role": "Ce qu'on dit en rencontrant quelqu'un pour la première fois.",
      "tip": "Ça veut dire « enchanté(e) ». Tu peux le dire toi aussi."
     },
     {
      "chunk": "おなまえは",
      "role": "« Ton nom ? » Une toute petite question.",
      "tip": "Le は (qui se lit « wa ») veut dire « quant à… » : « ton nom, c'est… ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はじめまして。マリです。",
      "romaji": "Hajimemashite. Mari desu.",
      "fr": "Enchantée. Je suis Mari.",
      "quality": "best",
      "feedback": "Parfait ! Prénom + です, et tu es présentée.",
      "breakdown": [
       {
        "chunk": "マリです",
        "role": "« Je suis Mari. »",
        "tip": "Mets ton prénom devant です. です = « c'est / je suis »."
       }
      ]
     },
     {
      "jp": "マリ。",
      "romaji": "Mari.",
      "fr": "Mari.",
      "quality": "ok",
      "feedback": "On te comprend, mais ajoute です : ça sonne plus poli."
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "weak",
      "feedback": "On te demande ton nom : « oui » ne répond pas. Dis ton prénom + です."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "マリさん。おくには どこですか？",
    "romaji": "Mari-san. Okuni wa doko desu ka?",
    "fr": "Mari. Tu viens d'où ?",
    "breakdown": [
     {
      "chunk": "さん",
      "role": "Petit mot poli qu'on colle derrière un nom.",
      "tip": "On l'ajoute au nom des autres, jamais au sien."
     },
     {
      "chunk": "おくに",
      "role": "« Ton pays ».",
      "tip": "お devant = petit mot de politesse. くに = pays. Ici : « ton pays, c'est… ? »"
     },
     {
      "chunk": "どこ",
      "role": "« Où ? »",
      "tip": "Tu le verras partout : どこですか = « c'est où ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "フランス人です。",
      "romaji": "Furansu-jin desu.",
      "fr": "Je suis française.",
      "quality": "best",
      "feedback": "Très bien ! Pays + 人 + です.",
      "breakdown": [
       {
        "chunk": "フランス人",
        "role": "Français(e).",
        "tip": "人 (じん) veut dire « personne ». Colle-le derrière un pays : フランス人 = « personne de France »."
       }
      ]
     },
     {
      "jp": "フランス。",
      "romaji": "Furansu.",
      "fr": "France.",
      "quality": "ok",
      "feedback": "Ça se comprend. Ajoute 人です pour dire que c'est toi."
     },
     {
      "jp": "フランスごです。",
      "romaji": "Furansu-go desu.",
      "fr": "C'est du français (la langue).",
      "quality": "weak",
      "feedback": "ご = la langue. Pour dire ta nationalité, on dit 人 (じん)."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "そうですか。よろしくおねがいします。",
    "romaji": "Sou desu ka. Yoroshiku onegaishimasu.",
    "fr": "Ah bon. Enchanté(e) !",
    "breakdown": [
     {
      "chunk": "そうですか",
      "role": "« Ah, d'accord ! »",
      "tip": "Tu l'entendras tout le temps pour montrer qu'on a compris."
     },
     {
      "chunk": "よろしくおねがいします",
      "role": "Formule de politesse pour finir une rencontre.",
      "tip": "Pas de traduction exacte : c'est « prenons bien soin l'un de l'autre ». Tu peux la répondre aussi."
     }
    ]
   }
  ]
 },
 {
  "id": "b-matcha-chaud",
  "icon": "🍵",
  "title": "Commander un matcha latte chaud",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ごちゅうもんは？",
    "romaji": "Irasshaimase. Gochuumon wa?",
    "fr": "Bienvenue. Votre commande ?",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     },
     {
      "chunk": "ごちゅうもん",
      "role": "« La commande ».",
      "tip": "ご ajoute du respect. Le personnel te dit : « et pour votre commande ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "まっちゃラテを ひとつ ください。",
      "romaji": "Matcha rate wo hitotsu kudasai.",
      "fr": "Un matcha latte, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait, c'est exactement la phrase qu'il faut.",
      "breakdown": [
       {
        "chunk": "まっちゃラテ",
        "role": "Matcha latte.",
        "tip": "Les mots venus d'ailleurs (ラテ) s'écrivent en katakana."
       },
       {
        "chunk": "を",
        "role": "Marque ce que tu veux : « ça, je le veux ».",
        "tip": "Il se place juste après la chose demandée."
       },
       {
        "chunk": "ひとつ ください",
        "role": "« Un, s'il vous plaît. »",
        "tip": "ひとつ = un (objet). ください = « donnez-moi »."
       }
      ]
     },
     {
      "jp": "まっちゃラテ。",
      "romaji": "Matcha rate.",
      "fr": "Matcha latte.",
      "quality": "ok",
      "feedback": "Ça passe, mais ajoute を ひとつ ください pour être poli."
     },
     {
      "jp": "まっちゃラテが すきです。",
      "romaji": "Matcha rate ga suki desu.",
      "fr": "J'aime le matcha latte.",
      "quality": "weak",
      "feedback": "Tu dis que tu aimes, mais tu ne commandes pas. Termine par ください."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "ホットですか？アイスですか？",
    "romaji": "Hotto desu ka? Aisu desu ka?",
    "fr": "Chaud ? Ou glacé ?",
    "breakdown": [
     {
      "chunk": "ホット",
      "role": "Chaud (boisson chaude).",
      "tip": "Mot anglais, donc en katakana."
     },
     {
      "chunk": "アイス",
      "role": "Glacé.",
      "tip": "Pareil, en katakana."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ホットです。",
      "romaji": "Hotto desu.",
      "fr": "Chaud.",
      "quality": "best",
      "feedback": "Bien ! Tu répètes le mot choisi + です.",
      "breakdown": [
       {
        "chunk": "ホットです",
        "role": "« C'est chaud. »",
        "tip": "Pour choisir, répète simplement le mot + です."
       }
      ]
     },
     {
      "jp": "ホット。",
      "romaji": "Hotto.",
      "fr": "Chaud.",
      "quality": "ok",
      "feedback": "Compris, mais un です ferait plus poli."
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "weak",
      "feedback": "Ce n'est pas une question oui/non : il faut choisir ホット ou アイス."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "600円です。",
    "romaji": "Roppyaku en desu.",
    "fr": "Ça fait 600 yens.",
    "breakdown": [
     {
      "chunk": "600円",
      "role": "Six cents yens.",
      "tip": "円 se lit « en ». Les chiffres arabes t'aident : tu lis le prix sans connaître le mot."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はい、どうぞ。",
      "romaji": "Hai, douzo.",
      "fr": "Voilà.",
      "quality": "best",
      "feedback": "Parfait : tu dis どうぞ en tendant l'argent.",
      "breakdown": [
       {
        "chunk": "どうぞ",
        "role": "« Voilà / je vous en prie ».",
        "tip": "À dire quand on donne quelque chose."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça marche. Ajoute どうぞ en tendant l'argent."
     },
     {
      "jp": "いくらですか？",
      "romaji": "Ikura desu ka?",
      "fr": "C'est combien ?",
      "quality": "weak",
      "feedback": "Il vient de te donner le prix : tu peux payer."
     }
    ]
   }
  ]
 },
 {
  "id": "b-matcha-glace",
  "icon": "🧋",
  "title": "Matcha glacé et taille",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ごちゅうもんは？",
    "romaji": "Irasshaimase. Gochuumon wa?",
    "fr": "Bienvenue. Votre commande ?",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     },
     {
      "chunk": "ごちゅうもん",
      "role": "« La commande ».",
      "tip": "ご ajoute du respect. Le personnel te dit : « et pour votre commande ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "アイスの まっちゃラテを ください。",
      "romaji": "Aisu no matcha rate wo kudasai.",
      "fr": "Un matcha latte glacé, s'il vous plaît.",
      "quality": "best",
      "feedback": "Très bien ! Tu as précisé « glacé » dès le début.",
      "breakdown": [
       {
        "chunk": "アイスの まっちゃラテ",
        "role": "Le matcha latte « glacé ».",
        "tip": "の relie deux mots : アイス + の + まっちゃラテ."
       },
       {
        "chunk": "ください",
        "role": "« Donnez-moi, s'il vous plaît. »",
        "tip": "Le mot magique pour demander quelque chose : chose + を + ください."
       }
      ]
     },
     {
      "jp": "アイス、まっちゃラテ。",
      "romaji": "Aisu, matcha rate.",
      "fr": "Glacé, matcha latte.",
      "quality": "ok",
      "feedback": "On comprend, mais ajoute を ください pour être poli."
     },
     {
      "jp": "アイスですか？",
      "romaji": "Aisu desu ka?",
      "fr": "C'est glacé ?",
      "quality": "weak",
      "feedback": "Là, tu poses une question. Pour commander, finis par ください."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "おおきいのと ちいさいの、どちらですか？",
    "romaji": "Ookii no to chiisai no, dochira desu ka?",
    "fr": "Grand ou petit ?",
    "breakdown": [
     {
      "chunk": "おおきい",
      "role": "Grand.",
      "tip": "Le contraire : ちいさい = petit. Tu les verras souvent."
     },
     {
      "chunk": "どちら",
      "role": "« Lequel des deux ? »",
      "tip": "On l'utilise quand il y a deux choix. Pour plus de deux, on dit どれ."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "おおきいのを ください。",
      "romaji": "Ookii no wo kudasai.",
      "fr": "Le grand, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait, tu choisis et tu demandes en une phrase.",
      "breakdown": [
       {
        "chunk": "おおきいのを ください",
        "role": "« Le grand, s'il vous plaît. »",
        "tip": "の remplace le mot déjà connu (le matcha latte). Même formule : chose + を + ください."
       }
      ]
     },
     {
      "jp": "おおきいの。",
      "romaji": "Ookii no.",
      "fr": "Le grand.",
      "quality": "ok",
      "feedback": "Ça passe, mais avec を ください c'est plus poli."
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "weak",
      "feedback": "Il faut choisir : おおきいの ou ちいさいの."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "550円です。",
    "romaji": "Gohyaku gojuu en desu.",
    "fr": "550 yens.",
    "breakdown": [
     {
      "chunk": "550円",
      "role": "Cinq cent cinquante yens.",
      "tip": "500 = ごひゃく, 50 = ごじゅう, puis えん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "これで おねがいします。",
      "romaji": "Kore de onegaishimasu.",
      "fr": "Voilà (je paie avec ça).",
      "quality": "best",
      "feedback": "Très naturel quand on tend l'argent.",
      "breakdown": [
       {
        "chunk": "これで",
        "role": "« Avec ça ».",
        "tip": "で = « avec / au moyen de ». Tu tends l'argent en même temps."
       },
       {
        "chunk": "おねがいします",
        "role": "« S'il vous plaît / je vous le confie. »",
        "tip": "Un mot qui adoucit presque toutes les demandes."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça marche, mais on dit plutôt これで おねがいします."
     },
     {
      "jp": "たかいです。",
      "romaji": "Takai desu.",
      "fr": "C'est cher.",
      "quality": "weak",
      "feedback": "On ne dit pas ça à la caisse : paie simplement."
     }
    ]
   }
  ]
 },
 {
  "id": "b-matcha-boutique",
  "icon": "🍵",
  "title": "Acheter du matcha en poudre",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。",
    "romaji": "Irasshaimase.",
    "fr": "Bienvenue.",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "すみません、まっちゃは ありますか？",
      "romaji": "Sumimasen, matcha wa arimasu ka?",
      "fr": "Excusez-moi, vous avez du matcha ?",
      "quality": "best",
      "feedback": "Très bien : すみません pour attirer l'attention, puis ありますか.",
      "breakdown": [
       {
        "chunk": "すみません",
        "role": "« Excusez-moi ».",
        "tip": "Pour attirer l'attention de quelqu'un, partout."
       },
       {
        "chunk": "ありますか",
        "role": "« Il y en a ? / Vous avez ? »",
        "tip": "Sert à demander si une chose est disponible ici."
       }
      ]
     },
     {
      "jp": "まっちゃ、ありますか？",
      "romaji": "Matcha, arimasu ka?",
      "fr": "Matcha, vous en avez ?",
      "quality": "ok",
      "feedback": "Compris ! Ajoute すみません au début pour être poli."
     },
     {
      "jp": "まっちゃを のみます。",
      "romaji": "Matcha wo nomimasu.",
      "fr": "Je bois du matcha.",
      "quality": "weak",
      "feedback": "Phrase correcte, mais ce n'est pas une question. Utilise ありますか ?"
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、これです。",
    "romaji": "Hai, kore desu.",
    "fr": "Oui, c'est celui-ci.",
    "breakdown": [
     {
      "chunk": "これ",
      "role": "« Ceci » (près de moi).",
      "tip": "これ = près de moi, それ = près de toi, あれ = là-bas."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "いくらですか？",
      "romaji": "Ikura desu ka?",
      "fr": "C'est combien ?",
      "quality": "best",
      "feedback": "Parfait : la question du prix en deux mots.",
      "breakdown": [
       {
        "chunk": "いくら",
        "role": "« Combien ? » (pour un prix).",
        "tip": "Ajoute ですか et ça devient une question."
       }
      ]
     },
     {
      "jp": "いくら？",
      "romaji": "Ikura?",
      "fr": "Combien ?",
      "quality": "ok",
      "feedback": "On comprend, mais ajoute ですか pour être poli."
     },
     {
      "jp": "なんですか？",
      "romaji": "Nan desu ka?",
      "fr": "C'est quoi ?",
      "quality": "weak",
      "feedback": "なん = « quoi ». Pour un prix, dis いくら."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "1200円です。",
    "romaji": "Sen nihyaku en desu.",
    "fr": "1200 yens.",
    "breakdown": [
     {
      "chunk": "1200円",
      "role": "Mille deux cents yens.",
      "tip": "1000 = せん, 200 = にひゃく, puis えん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ひとつだけ ください。",
      "romaji": "Hitotsu dake kudasai.",
      "fr": "Un seul, s'il vous plaît.",
      "quality": "best",
      "feedback": "Très bien ! だけ = « seulement ».",
      "breakdown": [
       {
        "chunk": "ひとつだけ",
        "role": "« Un seul ».",
        "tip": "だけ = « seulement » : « juste un »."
       },
       {
        "chunk": "ください",
        "role": "« Donnez-moi, s'il vous plaît. »",
        "tip": "Le mot magique pour demander quelque chose : chose + を + ください."
       }
      ]
     },
     {
      "jp": "これを ください。",
      "romaji": "Kore wo kudasai.",
      "fr": "Celui-ci, s'il vous plaît.",
      "quality": "ok",
      "feedback": "Ça marche, mais le vendeur ne sait pas combien. Ajoute ひとつ."
     },
     {
      "jp": "ふたつ ください。",
      "romaji": "Futatsu kudasai.",
      "fr": "Deux, s'il vous plaît.",
      "quality": "weak",
      "feedback": "ふたつ = 2. Pour un seul, c'est ひとつ."
     }
    ]
   }
  ]
 },
 {
  "id": "b-udon",
  "icon": "🍜",
  "title": "Commander un udon",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ごちゅうもんは？",
    "romaji": "Irasshaimase. Gochuumon wa?",
    "fr": "Bienvenue. Votre commande ?",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     },
     {
      "chunk": "ごちゅうもん",
      "role": "« La commande ».",
      "tip": "ご ajoute du respect. Le personnel te dit : « et pour votre commande ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "きつねうどんを ひとつ ください。",
      "romaji": "Kitsune udon wo hitotsu kudasai.",
      "fr": "Un udon kitsune, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait ! Un grand classique.",
      "breakdown": [
       {
        "chunk": "きつねうどん",
        "role": "Udon avec du tofu frit sucré.",
        "tip": "きつね = « renard » : la légende dit que les renards adorent le tofu frit."
       },
       {
        "chunk": "ひとつ ください",
        "role": "« Un, s'il vous plaît. »",
        "tip": "Même formule qu'au café."
       }
      ]
     },
     {
      "jp": "きつねうどん。",
      "romaji": "Kitsune udon.",
      "fr": "Udon kitsune.",
      "quality": "ok",
      "feedback": "On te comprend. Ajoute を ひとつ ください pour être poli."
     },
     {
      "jp": "うどんが すきです。",
      "romaji": "Udon ga suki desu.",
      "fr": "J'aime les udon.",
      "quality": "weak",
      "feedback": "Tu dis que tu aimes, mais tu ne commandes pas. Termine par ください."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "あついのと つめたいの、どちらですか？",
    "romaji": "Atsui no to tsumetai no, dochira desu ka?",
    "fr": "Chaud ou froid ?",
    "breakdown": [
     {
      "chunk": "あつい",
      "role": "Chaud (au toucher ou à manger).",
      "tip": "つめたい = froid. Deux mots à garder pour toujours."
     },
     {
      "chunk": "つめたい",
      "role": "Froid.",
      "tip": "Les udon froids se mangent surtout en été."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "あついのを ください。",
      "romaji": "Atsui no wo kudasai.",
      "fr": "Le chaud, s'il vous plaît.",
      "quality": "best",
      "feedback": "Bien ! の remplace le mot déjà connu.",
      "breakdown": [
       {
        "chunk": "あついの",
        "role": "« Celui qui est chaud ».",
        "tip": "の évite de répéter « udon » : on sait déjà de quoi on parle."
       }
      ]
     },
     {
      "jp": "あつい。",
      "romaji": "Atsui.",
      "fr": "Chaud.",
      "quality": "ok",
      "feedback": "Compris. Ajoute のを ください pour être poli."
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "weak",
      "feedback": "Il faut choisir : あつい ou つめたい."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。すこし おまちください。",
    "romaji": "Hai. Sukoshi omachi kudasai.",
    "fr": "Oui. Un instant, s'il vous plaît.",
    "breakdown": [
     {
      "chunk": "すこし",
      "role": "« Un peu / un moment ».",
      "tip": "Proche de ちょっと, mais plus poli. Le personnel l'emploie tout le temps."
     },
     {
      "chunk": "おまちください",
      "role": "« Veuillez attendre. »",
      "tip": "お…ください = la version polie de « attendez, s'il vous plaît »."
     }
    ]
   }
  ]
 },
 {
  "id": "b-soba",
  "icon": "🍜",
  "title": "Demander ce qu'on conseille (soba)",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ごちゅうもんは？",
    "romaji": "Irasshaimase. Gochuumon wa?",
    "fr": "Bienvenue. Votre commande ?",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     },
     {
      "chunk": "ごちゅうもん",
      "role": "« La commande ».",
      "tip": "ご ajoute du respect. Le personnel te dit : « et pour votre commande ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "おすすめは なんですか？",
      "romaji": "Osusume wa nan desu ka?",
      "fr": "Que me conseillez-vous ?",
      "quality": "best",
      "feedback": "Excellent réflexe quand on ne sait pas quoi prendre !",
      "breakdown": [
       {
        "chunk": "おすすめ",
        "role": "« Ce qu'on recommande ».",
        "tip": "Très pratique : on te propose le plat star."
       },
       {
        "chunk": "なんですか",
        "role": "« C'est quoi ? »",
        "tip": "なん = « quoi »."
       }
      ]
     },
     {
      "jp": "おすすめ？",
      "romaji": "Osusume?",
      "fr": "Vos conseils ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute は なんですか pour faire une vraie phrase."
     },
     {
      "jp": "そばが ありますか？",
      "romaji": "Soba ga arimasu ka?",
      "fr": "Vous avez des soba ?",
      "quality": "weak",
      "feedback": "On est déjà dans un restaurant de soba : demande plutôt ce qu'ils conseillent."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "てんぷらそばが おすすめです。",
    "romaji": "Tenpura soba ga osusume desu.",
    "fr": "Le soba tempura est conseillé.",
    "breakdown": [
     {
      "chunk": "てんぷらそば",
      "role": "Nouilles de sarrasin avec des beignets.",
      "tip": "Les soba sont plus grises que les udon (blancs et épais)."
     },
     {
      "chunk": "おすすめです",
      "role": "« C'est ce que je conseille. »",
      "tip": "Tu reconnais おすすめ, comme dans ta question."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "じゃあ、それを ください。",
      "romaji": "Jaa, sore wo kudasai.",
      "fr": "Alors, celui-là, s'il vous plaît.",
      "quality": "best",
      "feedback": "Bravo : それ pour le plat dont on vient de parler.",
      "breakdown": [
       {
        "chunk": "じゃあ",
        "role": "« Alors / dans ce cas ».",
        "tip": "Pour conclure un choix."
       },
       {
        "chunk": "それ",
        "role": "« Cela » (ce dont on parle).",
        "tip": "それ = le plat que l'autre vient de nommer. これ = ce que tu montres."
       }
      ]
     },
     {
      "jp": "それ。",
      "romaji": "Sore.",
      "fr": "Celui-là.",
      "quality": "ok",
      "feedback": "Compris. Ajoute を ください pour être poli."
     },
     {
      "jp": "そばは なんですか？",
      "romaji": "Soba wa nan desu ka?",
      "fr": "C'est quoi, les soba ?",
      "quality": "weak",
      "feedback": "Tu es dans un restaurant de soba : cette question étonne. Choisis le plat conseillé."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。ひとつですね。",
    "romaji": "Hai. Hitotsu desu ne.",
    "fr": "Bien. Un seul, n'est-ce pas ?",
    "breakdown": [
     {
      "chunk": "ひとつですね",
      "role": "« Un seul, c'est bien ça ? »",
      "tip": "ね = « n'est-ce pas ? ». On répond はい."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はい、おねがいします。",
      "romaji": "Hai, onegaishimasu.",
      "fr": "Oui, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait, simple et poli.",
      "breakdown": [
       {
        "chunk": "はい",
        "role": "Oui.",
        "tip": "La confirmation de base."
       },
       {
        "chunk": "おねがいします",
        "role": "« S'il vous plaît / merci d'avance ».",
        "tip": "Pour accepter poliment."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça suffit, mais おねがいします est plus doux."
     },
     {
      "jp": "いいえ。",
      "romaji": "Iie.",
      "fr": "Non.",
      "quality": "weak",
      "feedback": "Tu viens de dire non à ce que tu voulais. Réponds はい."
     }
    ]
   }
  ]
 },
 {
  "id": "b-ramen-ticket",
  "icon": "🍥",
  "title": "Ramen au distributeur de tickets",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。チケットを かってください。",
    "romaji": "Irasshaimase. Chiketto wo katte kudasai.",
    "fr": "Bienvenue. Achetez un ticket, s'il vous plaît.",
    "breakdown": [
     {
      "chunk": "チケット",
      "role": "Le ticket du distributeur.",
      "tip": "Dans beaucoup de boutiques de ramen, on paie à la machine avant de s'asseoir (券売機)."
     },
     {
      "chunk": "かってください",
      "role": "« Achetez, s'il vous plaît. »",
      "tip": "Une demande polie : verbe + ください."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "すみません、ラーメンは どれですか？",
      "romaji": "Sumimasen, raamen wa dore desu ka?",
      "fr": "Excusez-moi, le ramen, c'est lequel ?",
      "quality": "best",
      "feedback": "Très bien ! どれ = « lequel » parmi plusieurs boutons.",
      "breakdown": [
       {
        "chunk": "どれ",
        "role": "« Lequel ? » (parmi plusieurs).",
        "tip": "どれ = lequel, どこ = où, なに = quoi."
       }
      ]
     },
     {
      "jp": "ラーメンは？",
      "romaji": "Raamen wa?",
      "fr": "Le ramen ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute どれですか pour une vraie question."
     },
     {
      "jp": "ラーメンを ください。",
      "romaji": "Raamen wo kudasai.",
      "fr": "Un ramen, s'il vous plaît.",
      "quality": "weak",
      "feedback": "Ici, c'est la machine qui prend ta commande. Demande plutôt quel bouton."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "これです。700円です。",
    "romaji": "Kore desu. Nanahyaku en desu.",
    "fr": "C'est celui-ci. 700 yens.",
    "breakdown": [
     {
      "chunk": "これです",
      "role": "« C'est celui-ci. »",
      "tip": "Le personnel te montre le bouton."
     },
     {
      "chunk": "700円",
      "role": "Sept cents yens.",
      "tip": "700 = ななひゃく."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ありがとうございます。",
      "romaji": "Arigatou gozaimasu.",
      "fr": "Merci.",
      "quality": "best",
      "feedback": "Parfait, simple et poli.",
      "breakdown": [
       {
        "chunk": "ありがとうございます",
        "role": "« Merci. »",
        "tip": "Le merci poli, à dire sans compter."
       }
      ]
     },
     {
      "jp": "ありがとう。",
      "romaji": "Arigatou.",
      "fr": "Merci.",
      "quality": "ok",
      "feedback": "Ça va avec des amis. Ajoute ございます avec des inconnus."
     },
     {
      "jp": "ラーメンを ください。",
      "romaji": "Raamen wo kudasai.",
      "fr": "Un ramen, s'il vous plaît.",
      "quality": "weak",
      "feedback": "Le ticket remplace la commande : plus besoin de demander."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "チケットを おねがいします。おおもりですか？",
    "romaji": "Chiketto wo onegaishimasu. Oomori desu ka?",
    "fr": "Le ticket, s'il vous plaît. Grande portion ?",
    "breakdown": [
     {
      "chunk": "チケットを おねがいします",
      "role": "« Le ticket, s'il vous plaît. »",
      "tip": "C'est le personnel qui te le demande : tends-le."
     },
     {
      "chunk": "おおもり",
      "role": "Grande portion (plus de nouilles).",
      "tip": "Parfois gratuit, parfois +100 yens : regarde la machine."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はい、どうぞ。おおもりを おねがいします。",
      "romaji": "Hai, douzo. Oomori wo onegaishimasu.",
      "fr": "Voilà. Grande portion, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait : tu tends le ticket et tu précises la portion.",
      "breakdown": [
       {
        "chunk": "どうぞ",
        "role": "« Voilà ».",
        "tip": "À dire en tendant le ticket."
       },
       {
        "chunk": "おおもりを おねがいします",
        "role": "« Grande portion, s'il vous plaît. »",
        "tip": "Chose + を + おねがいします, comme avec ください."
       }
      ]
     },
     {
      "jp": "はい、どうぞ。",
      "romaji": "Hai, douzo.",
      "fr": "Voilà.",
      "quality": "ok",
      "feedback": "Ça marche. Tu auras une portion normale."
     },
     {
      "jp": "はい、ありがとう。",
      "romaji": "Hai, arigatou.",
      "fr": "Oui, merci.",
      "quality": "weak",
      "feedback": "Tu as oublié de donner le ticket ! Dis どうぞ en le tendant."
     }
    ]
   }
  ]
 },
 {
  "id": "b-sushi",
  "icon": "🍣",
  "title": "Commander des sushi",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ごちゅうもんは？",
    "romaji": "Irasshaimase. Gochuumon wa?",
    "fr": "Bienvenue. Votre commande ?",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     },
     {
      "chunk": "ごちゅうもん",
      "role": "« La commande ».",
      "tip": "ご ajoute du respect. Le personnel te dit : « et pour votre commande ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "まぐろを ふたつ ください。",
      "romaji": "Maguro wo futatsu kudasai.",
      "fr": "Deux thons, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait ! Tu as donné le plat et la quantité.",
      "breakdown": [
       {
        "chunk": "まぐろ",
        "role": "Le thon.",
        "tip": "Le roi des sushi. Sa version grasse s'appelle とろ."
       },
       {
        "chunk": "ふたつ",
        "role": "Deux (objets).",
        "tip": "ひとつ = 1, ふたつ = 2, みっつ = 3."
       }
      ]
     },
     {
      "jp": "まぐろ。",
      "romaji": "Maguro.",
      "fr": "Thon.",
      "quality": "ok",
      "feedback": "Ça passe. Ajoute を ふたつ ください pour être poli."
     },
     {
      "jp": "まぐろが すきです。",
      "romaji": "Maguro ga suki desu.",
      "fr": "J'aime le thon.",
      "quality": "weak",
      "feedback": "Tu dis que tu aimes, mais tu ne commandes pas. Termine par ください."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "ほかには？",
    "romaji": "Hoka ni wa?",
    "fr": "Autre chose ?",
    "breakdown": [
     {
      "chunk": "ほか",
      "role": "« Autre chose ».",
      "tip": "ほかには ? = « et en plus ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "おちゃを ください。",
      "romaji": "Ocha wo kudasai.",
      "fr": "Du thé, s'il vous plaît.",
      "quality": "best",
      "feedback": "Bien vu ! Le thé vert accompagne très bien les sushi.",
      "breakdown": [
       {
        "chunk": "おちゃ",
        "role": "Le thé.",
        "tip": "Au sushi, le thé vert est gratuit ou presque. Chez les sushiya on l'appelle aussi あがり."
       }
      ]
     },
     {
      "jp": "おちゃ。",
      "romaji": "Ocha.",
      "fr": "Thé.",
      "quality": "ok",
      "feedback": "Compris. Ajoute を ください pour être poli."
     },
     {
      "jp": "ありがとう。",
      "romaji": "Arigatou.",
      "fr": "Merci.",
      "quality": "weak",
      "feedback": "Il te demande ce que tu veux en plus : donne un plat ou dis « non merci »."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。すこし おまちください。",
    "romaji": "Hai. Sukoshi omachi kudasai.",
    "fr": "Oui. Un instant, s'il vous plaît.",
    "breakdown": [
     {
      "chunk": "すこし",
      "role": "« Un peu / un moment ».",
      "tip": "Proche de ちょっと, mais plus poli. Le personnel l'emploie tout le temps."
     },
     {
      "chunk": "おまちください",
      "role": "« Veuillez attendre. »",
      "tip": "お…ください = la version polie de « attendez, s'il vous plaît »."
     }
    ]
   }
  ]
 },
 {
  "id": "b-nani",
  "icon": "🍡",
  "title": "C'est quoi, ça ?",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。",
    "romaji": "Irasshaimase.",
    "fr": "Bienvenue.",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "すみません、これは なんですか？",
      "romaji": "Sumimasen, kore wa nan desu ka?",
      "fr": "Excusez-moi, c'est quoi, ça ?",
      "quality": "best",
      "feedback": "La phrase la plus utile devant un plat inconnu.",
      "breakdown": [
       {
        "chunk": "これは なんですか",
        "role": "« Ça, c'est quoi ? »",
        "tip": "Montre du doigt en même temps : on te répondra tout de suite."
       }
      ]
     },
     {
      "jp": "これは？",
      "romaji": "Kore wa?",
      "fr": "Ça ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute なんですか pour être clair."
     },
     {
      "jp": "これを ください。",
      "romaji": "Kore wo kudasai.",
      "fr": "Ceci, s'il vous plaît.",
      "quality": "weak",
      "feedback": "Tu commandes sans savoir ce que c'est ! Demande d'abord なんですか."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "たこやきです。",
    "romaji": "Takoyaki desu.",
    "fr": "C'est du takoyaki.",
    "breakdown": [
     {
      "chunk": "たこやき",
      "role": "Boulettes de pâte avec du poulpe.",
      "tip": "たこ = poulpe, やき = grillé. Tu reverras やき sur beaucoup de menus."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "これを ひとつ ください。",
      "romaji": "Kore wo hitotsu kudasai.",
      "fr": "Un de ceux-là, s'il vous plaît.",
      "quality": "best",
      "feedback": "Bien ! Tu as compris et tu commandes.",
      "breakdown": [
       {
        "chunk": "これを",
        "role": "Celui-ci, que je montre.",
        "tip": "を marque ce que tu veux."
       },
       {
        "chunk": "ください",
        "role": "« Donnez-moi, s'il vous plaît. »",
        "tip": "Le mot magique pour demander quelque chose : chose + を + ください."
       }
      ]
     },
     {
      "jp": "ひとつ。",
      "romaji": "Hitotsu.",
      "fr": "Un.",
      "quality": "ok",
      "feedback": "Ça passe. Ajoute これを ください pour être poli."
     },
     {
      "jp": "これは なんですか？",
      "romaji": "Kore wa nan desu ka?",
      "fr": "C'est quoi, ça ?",
      "quality": "weak",
      "feedback": "Tu as déjà la réponse : tu peux commander."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。500円です。",
    "romaji": "Hai. Gohyaku en desu.",
    "fr": "Bien. 500 yens.",
    "breakdown": [
     {
      "chunk": "500円",
      "role": "Cinq cents yens.",
      "tip": "ご = 5, ひゃく = cent, puis えん."
     }
    ]
   }
  ]
 },
 {
  "id": "b-karai",
  "icon": "🌶️",
  "title": "C'est piquant ?",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "これは カレーです。",
    "romaji": "Kore wa karee desu.",
    "fr": "Ça, c'est du curry.",
    "breakdown": [
     {
      "chunk": "カレー",
      "role": "Le curry japonais.",
      "tip": "Plus doux et plus sucré que le curry indien."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "からいですか？",
      "romaji": "Karai desu ka?",
      "fr": "C'est piquant ?",
      "quality": "best",
      "feedback": "Parfait, une seule phrase pour être sûr(e).",
      "breakdown": [
       {
        "chunk": "からい",
        "role": "Piquant (épicé).",
        "tip": "Mets ですか derrière et ça devient une question."
       }
      ]
     },
     {
      "jp": "からい？",
      "romaji": "Karai?",
      "fr": "Piquant ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute ですか pour être poli."
     },
     {
      "jp": "カレーですか？",
      "romaji": "Karee desu ka?",
      "fr": "C'est du curry ?",
      "quality": "weak",
      "feedback": "Il vient de te le dire ! Demande plutôt si c'est からい."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、とても からいです。",
    "romaji": "Hai, totemo karai desu.",
    "fr": "Oui, très piquant.",
    "breakdown": [
     {
      "chunk": "とても",
      "role": "« Très ».",
      "tip": "Se place devant un mot comme からい."
     },
     {
      "chunk": "からいです",
      "role": "« C'est piquant. »",
      "tip": "Il répète ton mot : c'est un oui."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "からくないのは ありますか？",
      "romaji": "Karakunai no wa arimasu ka?",
      "fr": "Vous en avez un qui n'est pas piquant ?",
      "quality": "best",
      "feedback": "Excellent ! Tu sais dire « pas piquant ».",
      "breakdown": [
       {
        "chunk": "からくない",
        "role": "« Pas piquant ».",
        "tip": "Pour dire « pas », on change い en くない : からい → からくない."
       },
       {
        "chunk": "ありますか",
        "role": "« Vous en avez ? »",
        "tip": "La question pour savoir s'il y en a un."
       }
      ]
     },
     {
      "jp": "ほかの ありますか？",
      "romaji": "Hoka no arimasu ka?",
      "fr": "Vous avez un autre ?",
      "quality": "ok",
      "feedback": "On comprend, mais dis bien que tu veux un plat pas piquant."
     },
     {
      "jp": "からいです。",
      "romaji": "Karai desu.",
      "fr": "C'est piquant.",
      "quality": "weak",
      "feedback": "Tu répètes ce qu'il vient de dire : demande-lui un autre plat."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、これです。",
    "romaji": "Hai, kore desu.",
    "fr": "Oui, c'est celui-ci.",
    "breakdown": [
     {
      "chunk": "これです",
      "role": "« C'est celui-ci. »",
      "tip": "Il te montre le plat du doigt."
     }
    ]
   }
  ]
 },
 {
  "id": "b-konbini",
  "icon": "🏪",
  "title": "Au konbini",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。ふくろは いりますか？",
    "romaji": "Irasshaimase. Fukuro wa irimasu ka?",
    "fr": "Bienvenue. Vous voulez un sac ?",
    "breakdown": [
     {
      "chunk": "ふくろ",
      "role": "Le sac.",
      "tip": "Depuis 2020 il est payant : on te demande à chaque fois."
     },
     {
      "chunk": "いりますか",
      "role": "« Vous en avez besoin ? »",
      "tip": "Sert à demander si on veut quelque chose."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "だいじょうぶです。",
      "romaji": "Daijoubu desu.",
      "fr": "Non merci, ça va.",
      "quality": "best",
      "feedback": "Parfait ! La façon la plus douce de refuser.",
      "breakdown": [
       {
        "chunk": "だいじょうぶです",
        "role": "« Ça va, merci. »",
        "tip": "Le même mot veut dire « je vais bien » : il refuse en douceur."
       }
      ]
     },
     {
      "jp": "いりません。",
      "romaji": "Irimasen.",
      "fr": "Je n'en veux pas.",
      "quality": "ok",
      "feedback": "Correct, mais un peu sec. だいじょうぶです est plus doux."
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "weak",
      "feedback": "はい = oui : on va te donner un sac. Pour refuser, dis だいじょうぶです."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "あたためますか？",
    "romaji": "Atatamemasu ka?",
    "fr": "Je le réchauffe ?",
    "breakdown": [
     {
      "chunk": "あたためますか",
      "role": "« Je le chauffe ? »",
      "tip": "Pour les plats préparés : le konbini a un micro-ondes."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はい、おねがいします。",
      "romaji": "Hai, onegaishimasu.",
      "fr": "Oui, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait pour accepter une offre.",
      "breakdown": [
       {
        "chunk": "おねがいします",
        "role": "« S'il vous plaît / merci d'avance ».",
        "tip": "Un mot qui adoucit tout."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça marche, mais おねがいします est plus poli."
     },
     {
      "jp": "あたためます。",
      "romaji": "Atatamemasu.",
      "fr": "Je réchauffe.",
      "quality": "weak",
      "feedback": "Ce serait toi qui réchauffes ! Dis はい、おねがいします."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "650円です。",
    "romaji": "Roppyaku gojuu en desu.",
    "fr": "650 yens.",
    "breakdown": [
     {
      "chunk": "650円",
      "role": "Six cent cinquante yens.",
      "tip": "600 = ろっぴゃく, 50 = ごじゅう, puis えん."
     }
    ]
   }
  ]
 },
 {
  "id": "b-toire",
  "icon": "🚻",
  "title": "Où sont les toilettes ?",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。",
    "romaji": "Irasshaimase.",
    "fr": "Bienvenue.",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "すみません、トイレは どこですか？",
      "romaji": "Sumimasen, toire wa doko desu ka?",
      "fr": "Excusez-moi, où sont les toilettes ?",
      "quality": "best",
      "feedback": "Parfait : à retenir avant tout autre mot !",
      "breakdown": [
       {
        "chunk": "トイレ",
        "role": "Les toilettes.",
        "tip": "Aussi écrit お手洗い (おてあらい), plus poli."
       },
       {
        "chunk": "どこですか",
        "role": "« C'est où ? »",
        "tip": "Marche pour n'importe quel lieu."
       }
      ]
     },
     {
      "jp": "トイレ？",
      "romaji": "Toire?",
      "fr": "Toilettes ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute は どこですか pour une vraie question."
     },
     {
      "jp": "トイレを ください。",
      "romaji": "Toire wo kudasai.",
      "fr": "Donnez-moi les toilettes.",
      "quality": "weak",
      "feedback": "Tu demandes qu'on te donne les toilettes ! Demande où elles sont."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "あそこです。",
    "romaji": "Asoko desu.",
    "fr": "C'est là-bas.",
    "breakdown": [
     {
      "chunk": "あそこ",
      "role": "« Là-bas ».",
      "tip": "ここ = ici, そこ = là (près de toi), あそこ = là-bas."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ありがとうございます。",
      "romaji": "Arigatou gozaimasu.",
      "fr": "Merci.",
      "quality": "best",
      "feedback": "Parfait.",
      "breakdown": [
       {
        "chunk": "ありがとうございます",
        "role": "« Merci. »",
        "tip": "Le merci poli, à dire sans compter."
       }
      ]
     },
     {
      "jp": "ありがとう。",
      "romaji": "Arigatou.",
      "fr": "Merci.",
      "quality": "ok",
      "feedback": "Ça va, mais ございます est plus poli avec un inconnu."
     },
     {
      "jp": "どこですか？",
      "romaji": "Doko desu ka?",
      "fr": "C'est où ?",
      "quality": "weak",
      "feedback": "Il vient de te répondre : regarde où il montre."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "どういたしまして。",
    "romaji": "Dou itashimashite.",
    "fr": "Je vous en prie.",
    "breakdown": [
     {
      "chunk": "どういたしまして",
      "role": "« De rien / je vous en prie ».",
      "tip": "La réponse classique à ありがとう."
     }
    ]
   }
  ]
 },
 {
  "id": "b-nedan",
  "icon": "🏷️",
  "title": "Demander le prix",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "いらっしゃいませ。",
    "romaji": "Irasshaimase.",
    "fr": "Bienvenue.",
    "breakdown": [
     {
      "chunk": "いらっしゃいませ",
      "role": "« Bienvenue ! » dit par tout le personnel.",
      "tip": "Tu n'as pas à répondre. Un sourire suffit."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "これは いくらですか？",
      "romaji": "Kore wa ikura desu ka?",
      "fr": "Ça coûte combien ?",
      "quality": "best",
      "feedback": "Parfait : la phrase à utiliser partout.",
      "breakdown": [
       {
        "chunk": "いくらですか",
        "role": "« Combien ça coûte ? »",
        "tip": "Mets l'objet devant : これは いくらですか."
       }
      ]
     },
     {
      "jp": "いくら？",
      "romaji": "Ikura?",
      "fr": "Combien ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute これは et ですか."
     },
     {
      "jp": "これは なんですか？",
      "romaji": "Kore wa nan desu ka?",
      "fr": "C'est quoi ?",
      "quality": "weak",
      "feedback": "なん = « quoi ». Pour un prix, dis いくら."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "3000円です。",
    "romaji": "San zen en desu.",
    "fr": "3000 yens.",
    "breakdown": [
     {
      "chunk": "3000円",
      "role": "Trois mille yens.",
      "tip": "1000 = せん, 2000 = にせん, 3000 = さんぜん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "もっと やすいのは ありますか？",
      "romaji": "Motto yasui no wa arimasu ka?",
      "fr": "Vous en avez de moins cher ?",
      "quality": "best",
      "feedback": "Excellent ! Et on te le dit sans vexer personne.",
      "breakdown": [
       {
        "chunk": "もっと",
        "role": "« Plus ».",
        "tip": "もっと + adjectif = « plus… »."
       },
       {
        "chunk": "やすい",
        "role": "Pas cher.",
        "tip": "Le contraire : たかい = cher."
       }
      ]
     },
     {
      "jp": "やすいのは？",
      "romaji": "Yasui no wa?",
      "fr": "Un moins cher ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute もっと ... ありますか pour une vraie phrase."
     },
     {
      "jp": "たかいです。",
      "romaji": "Takai desu.",
      "fr": "C'est cher.",
      "quality": "weak",
      "feedback": "On comprend ta pensée, mais demande plutôt : もっと やすいのは？"
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。これは 1500円です。",
    "romaji": "Hai. Kore wa sen gohyaku en desu.",
    "fr": "Oui. Celui-ci, 1500 yens.",
    "breakdown": [
     {
      "chunk": "1500円",
      "role": "Mille cinq cents yens.",
      "tip": "せん (1000) + ごひゃく (500) + えん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "じゃあ、それを ください。",
      "romaji": "Jaa, sore wo kudasai.",
      "fr": "Alors, celui-là, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait : tu choisis et tu demandes.",
      "breakdown": [
       {
        "chunk": "じゃあ",
        "role": "« Alors / dans ce cas ».",
        "tip": "Pour conclure un choix."
       },
       {
        "chunk": "それ",
        "role": "« Cela » (celui que l'autre te montre).",
        "tip": "それ = ce que l'autre tient ou montre. これ = ce que tu tiens toi."
       }
      ]
     },
     {
      "jp": "それ。",
      "romaji": "Sore.",
      "fr": "Celui-là.",
      "quality": "ok",
      "feedback": "Compris. Ajoute を ください pour être poli."
     },
     {
      "jp": "これを ください。",
      "romaji": "Kore wo kudasai.",
      "fr": "Ceci, s'il vous plaît.",
      "quality": "weak",
      "feedback": "Il te montre l'article : pour celui qu'il tient, dis それ."
     }
    ]
   }
  ]
 },
 {
  "id": "b-eki",
  "icon": "🚉",
  "title": "Où est la gare ?",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "はい。なんですか？",
    "romaji": "Hai. Nan desu ka?",
    "fr": "Oui ? Qu'y a-t-il ?",
    "breakdown": [
     {
      "chunk": "なんですか",
      "role": "« Qu'est-ce qu'il y a ? »",
      "tip": "Quelqu'un te répond dans la rue : c'est le moment de poser ta question."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "すみません、えきは どこですか？",
      "romaji": "Sumimasen, eki wa doko desu ka?",
      "fr": "Excusez-moi, où est la gare ?",
      "quality": "best",
      "feedback": "Parfait : すみません, le lieu, どこですか.",
      "breakdown": [
       {
        "chunk": "えき",
        "role": "La gare / la station.",
        "tip": "Tu le verras sur chaque panneau."
       },
       {
        "chunk": "どこですか",
        "role": "« C'est où ? »",
        "tip": "Marche pour tous les lieux."
       }
      ]
     },
     {
      "jp": "えきは？",
      "romaji": "Eki wa?",
      "fr": "La gare ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute どこですか pour une vraie question."
     },
     {
      "jp": "えきを ください。",
      "romaji": "Eki wo kudasai.",
      "fr": "Donnez-moi la gare.",
      "quality": "weak",
      "feedback": "On ne donne pas une gare ! Demande où elle est."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "あそこです。まっすぐです。",
    "romaji": "Asoko desu. Massugu desu.",
    "fr": "C'est là-bas. Tout droit.",
    "breakdown": [
     {
      "chunk": "あそこ",
      "role": "« Là-bas ».",
      "tip": "La personne montre du doigt."
     },
     {
      "chunk": "まっすぐ",
      "role": "Tout droit.",
      "tip": "Mot à retenir pour les directions."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ちかいですか？",
      "romaji": "Chikai desu ka?",
      "fr": "C'est près ?",
      "quality": "best",
      "feedback": "Bien joué : tu sais s'il faut prendre le bus.",
      "breakdown": [
       {
        "chunk": "ちかい",
        "role": "Près, proche.",
        "tip": "Le contraire : とおい = loin."
       }
      ]
     },
     {
      "jp": "ちかい？",
      "romaji": "Chikai?",
      "fr": "Près ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute ですか pour être poli."
     },
     {
      "jp": "とおいです。",
      "romaji": "Tooi desu.",
      "fr": "C'est loin.",
      "quality": "weak",
      "feedback": "Tu affirmes au lieu de demander. Pose la question avec ですか."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、ちかいですよ。",
    "romaji": "Hai, chikai desu yo.",
    "fr": "Oui, c'est tout près.",
    "breakdown": [
     {
      "chunk": "よ",
      "role": "Petit mot de fin : « je te le dis ! »",
      "tip": "Courant à l'oral, il rend la phrase plus chaleureuse."
     }
    ]
   }
  ]
 },
 {
  "id": "b-kippu",
  "icon": "🎫",
  "title": "Acheter un ticket de train",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "どこまでですか？",
    "romaji": "Doko made desu ka?",
    "fr": "Jusqu'où ?",
    "breakdown": [
     {
      "chunk": "まで",
      "role": "« Jusqu'à ».",
      "tip": "きょうとえきまで = jusqu'à la gare de Kyoto."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "きょうとえきまで、いちまい ください。",
      "romaji": "Kyouto eki made, ichimai kudasai.",
      "fr": "Un billet pour la gare de Kyoto, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait : lieu + まで + いちまい + ください.",
      "breakdown": [
       {
        "chunk": "きょうとえき",
        "role": "La gare de Kyoto.",
        "tip": "Nom de lieu + えき = la gare de ce lieu."
       },
       {
        "chunk": "まで",
        "role": "« Jusqu'à ».",
        "tip": "Pour dire où tu vas."
       },
       {
        "chunk": "いちまい ください",
        "role": "« Un billet, s'il vous plaît. »",
        "tip": "いちまい = une feuille, un billet. Pour les choses plates (tickets, feuilles), on compte avec まい : いちまい, にまい…"
       }
      ]
     },
     {
      "jp": "きょうとえき。",
      "romaji": "Kyouto eki.",
      "fr": "Gare de Kyoto.",
      "quality": "ok",
      "feedback": "On comprend. Ajoute まで いちまい ください."
     },
     {
      "jp": "きょうとえきから。",
      "romaji": "Kyouto eki kara.",
      "fr": "Depuis la gare de Kyoto.",
      "quality": "weak",
      "feedback": "から = « depuis ». Pour « jusqu'à », dis まで."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "210円です。",
    "romaji": "Nihyaku juu en desu.",
    "fr": "210 yens.",
    "breakdown": [
     {
      "chunk": "210円",
      "role": "Deux cent dix yens.",
      "tip": "200 = にひゃく, 10 = じゅう, puis えん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "はい、どうぞ。",
      "romaji": "Hai, douzo.",
      "fr": "Voilà.",
      "quality": "best",
      "feedback": "Parfait.",
      "breakdown": [
       {
        "chunk": "どうぞ",
        "role": "« Voilà ».",
        "tip": "À dire en tendant l'argent."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça marche. Ajoute どうぞ en tendant l'argent."
     },
     {
      "jp": "いくらですか？",
      "romaji": "Ikura desu ka?",
      "fr": "C'est combien ?",
      "quality": "weak",
      "feedback": "Il vient de te le dire : 210円."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "ありがとうございます。",
    "romaji": "Arigatou gozaimasu.",
    "fr": "Merci.",
    "breakdown": [
     {
      "chunk": "ありがとうございます",
      "role": "« Merci. »",
      "tip": "Le merci poli, à dire sans compter."
     }
    ]
   }
  ]
 },
 {
  "id": "b-card",
  "icon": "💳",
  "title": "Payer par carte",
  "skill": "voyage",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "ぜんぶで 1200円です。",
    "romaji": "Zenbu de sen nihyaku en desu.",
    "fr": "Au total, 1200 yens.",
    "breakdown": [
     {
      "chunk": "ぜんぶで",
      "role": "« Au total ».",
      "tip": "On te le dit avant de payer."
     },
     {
      "chunk": "1200円",
      "role": "Mille deux cents yens.",
      "tip": "せん + にひゃく + えん."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "カードは つかえますか？",
      "romaji": "Kaado wa tsukaemasu ka?",
      "fr": "Je peux payer par carte ?",
      "quality": "best",
      "feedback": "Excellent ! Certains petits commerces n'acceptent que les espèces.",
      "breakdown": [
       {
        "chunk": "カード",
        "role": "La carte (bancaire).",
        "tip": "Mot anglais, donc en katakana."
       },
       {
        "chunk": "つかえますか",
        "role": "« On peut l'utiliser ? »",
        "tip": "Pose la question avant de sortir ta carte."
       }
      ]
     },
     {
      "jp": "カード？",
      "romaji": "Kaado?",
      "fr": "Carte ?",
      "quality": "ok",
      "feedback": "On comprend. Ajoute は つかえますか pour une vraie question."
     },
     {
      "jp": "カードを ください。",
      "romaji": "Kaado wo kudasai.",
      "fr": "Donnez-moi une carte.",
      "quality": "weak",
      "feedback": "Tu demandes qu'on te donne une carte ! Demande si tu peux t'en servir."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、つかえます。",
    "romaji": "Hai, tsukaemasu.",
    "fr": "Oui, c'est possible.",
    "breakdown": [
     {
      "chunk": "つかえます",
      "role": "« On peut. »",
      "tip": "Réponse positive à つかえますか."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "じゃあ、カードで おねがいします。",
      "romaji": "Jaa, kaado de onegaishimasu.",
      "fr": "Alors par carte, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait : で = « avec ».",
      "breakdown": [
       {
        "chunk": "カードで",
        "role": "« Par carte ».",
        "tip": "で = « avec / au moyen de »."
       },
       {
        "chunk": "おねがいします",
        "role": "« S'il vous plaît ».",
        "tip": "Adoucit la demande."
       }
      ]
     },
     {
      "jp": "カードで。",
      "romaji": "Kaado de.",
      "fr": "Par carte.",
      "quality": "ok",
      "feedback": "Ça passe. Ajoute おねがいします pour être poli."
     },
     {
      "jp": "カードは ありますか？",
      "romaji": "Kaado wa arimasu ka?",
      "fr": "Vous avez une carte ?",
      "quality": "weak",
      "feedback": "Tu demandes si c'est LUI qui a une carte ! Dis カードで おねがいします."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "ありがとうございました。",
    "romaji": "Arigatou gozaimashita.",
    "fr": "Merci beaucoup.",
    "breakdown": [
     {
      "chunk": "ございました",
      "role": "Le « merci » au passé : l'achat est terminé.",
      "tip": "On le dit à la fin, quand tout est fini."
     }
    ]
   }
  ]
 },
 {
  "id": "b-merci",
  "icon": "🙏",
  "title": "Merci et pardon",
  "skill": "relation",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "あの、これ、おちましたよ。",
    "romaji": "Ano, kore, ochimashita yo.",
    "fr": "Excusez-moi, ça vous est tombé.",
    "breakdown": [
     {
      "chunk": "あの",
      "role": "« Excusez-moi… ».",
      "tip": "Pour attirer doucement l'attention de quelqu'un."
     },
     {
      "chunk": "おちました",
      "role": "« C'est tombé. »",
      "tip": "Verbe おちる = tomber. Ici : l'objet est tombé de ta poche."
     },
     {
      "chunk": "よ",
      "role": "Petit mot de fin : « je te le dis ! »",
      "tip": "Il rend la phrase amicale."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "あ、ありがとうございます。",
      "romaji": "A, arigatou gozaimasu.",
      "fr": "Ah, merci.",
      "quality": "best",
      "feedback": "Parfait : le bon réflexe, un merci poli.",
      "breakdown": [
       {
        "chunk": "ありがとうございます",
        "role": "« Merci. »",
        "tip": "Le merci poli, à dire sans compter."
       }
      ]
     },
     {
      "jp": "あ、ありがとう。",
      "romaji": "A, arigatou.",
      "fr": "Ah, merci.",
      "quality": "ok",
      "feedback": "Ça va entre amis. Avec un inconnu, ajoute ございます."
     },
     {
      "jp": "いいえ。",
      "romaji": "Iie.",
      "fr": "Non.",
      "quality": "weak",
      "feedback": "Cette personne t'aide : dire non est étrange. Remercie-la."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "どういたしまして。",
    "romaji": "Dou itashimashite.",
    "fr": "Je vous en prie.",
    "breakdown": [
     {
      "chunk": "どういたしまして",
      "role": "« De rien ».",
      "tip": "La réponse classique à ありがとう."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "ほんとうに ありがとうございました。",
      "romaji": "Hontou ni arigatou gozaimashita.",
      "fr": "Merci vraiment beaucoup.",
      "quality": "best",
      "feedback": "Très chaleureux !",
      "breakdown": [
       {
        "chunk": "ほんとうに",
        "role": "« Vraiment ».",
        "tip": "Se place devant le merci pour le renforcer."
       }
      ]
     },
     {
      "jp": "ありがとう。",
      "romaji": "Arigatou.",
      "fr": "Merci.",
      "quality": "ok",
      "feedback": "Ça va, mais plus poli avec un inconnu : ありがとうございました."
     },
     {
      "jp": "ごめんなさい。",
      "romaji": "Gomennasai.",
      "fr": "Pardon.",
      "quality": "weak",
      "feedback": "Tu t'excuses alors que tu veux remercier."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "あ、すみません！",
    "romaji": "A, sumimasen!",
    "fr": "Oh, pardon !",
    "breakdown": [
     {
      "chunk": "すみません",
      "role": "« Pardon / excusez-moi ».",
      "tip": "Elle t'a légèrement bousculé(e) en partant."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "だいじょうぶです。",
      "romaji": "Daijoubu desu.",
      "fr": "Ce n'est rien.",
      "quality": "best",
      "feedback": "Parfait : c'est la réponse la plus naturelle.",
      "breakdown": [
       {
        "chunk": "だいじょうぶです",
        "role": "« Ce n'est rien / ça va ».",
        "tip": "Pour dire que tout va bien."
       }
      ]
     },
     {
      "jp": "はい。",
      "romaji": "Hai.",
      "fr": "Oui.",
      "quality": "ok",
      "feedback": "Ça marche, mais だいじょうぶです est plus clair."
     },
     {
      "jp": "ありがとう。",
      "romaji": "Arigatou.",
      "fr": "Merci.",
      "quality": "weak",
      "feedback": "Tu remercies alors qu'il s'excuse : réponds だいじょうぶです."
     }
    ]
   }
  ]
 },
 {
  "id": "b-addition",
  "icon": "🧾",
  "title": "L'eau et l'addition",
  "skill": "gastronomie",
  "level": "A0",
  "turns": [
   {
    "speaker": "npc",
    "jp": "ほかには？",
    "romaji": "Hoka ni wa?",
    "fr": "Autre chose ?",
    "breakdown": [
     {
      "chunk": "ほか",
      "role": "« Autre chose ».",
      "tip": "ほかには ? = « et en plus ? »"
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "おみずを ください。",
      "romaji": "Omizu wo kudasai.",
      "fr": "De l'eau, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait, tu l'as demandée poliment.",
      "breakdown": [
       {
        "chunk": "おみず",
        "role": "L'eau.",
        "tip": "お devant est un petit mot de politesse. L'eau arrive souvent gratuitement à table."
       },
       {
        "chunk": "ください",
        "role": "« Donnez-moi, s'il vous plaît. »",
        "tip": "Le mot magique pour demander quelque chose : chose + を + ください."
       }
      ]
     },
     {
      "jp": "おみず。",
      "romaji": "Omizu.",
      "fr": "Eau.",
      "quality": "ok",
      "feedback": "On comprend. Ajoute を ください pour être poli."
     },
     {
      "jp": "おみずが すきです。",
      "romaji": "Omizu ga suki desu.",
      "fr": "J'aime l'eau.",
      "quality": "weak",
      "feedback": "Tu dis que tu aimes, mais tu ne demandes pas. Termine par ください."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい、どうぞ。",
    "romaji": "Hai, douzo.",
    "fr": "Voilà.",
    "breakdown": [
     {
      "chunk": "どうぞ",
      "role": "« Voilà ».",
      "tip": "Il te donne quelque chose."
     }
    ]
   },
   {
    "speaker": "user",
    "choices": [
     {
      "jp": "おかいけいを おねがいします。",
      "romaji": "Okaikei wo onegaishimasu.",
      "fr": "L'addition, s'il vous plaît.",
      "quality": "best",
      "feedback": "Parfait. Croise aussi les index en X : c'est le geste universel.",
      "breakdown": [
       {
        "chunk": "おかいけい",
        "role": "L'addition.",
        "tip": "Écrit aussi お会計. Tu le verras sur les tickets."
       },
       {
        "chunk": "おねがいします",
        "role": "« S'il vous plaît ».",
        "tip": "Chose + を + おねがいします."
       }
      ]
     },
     {
      "jp": "おかいけい。",
      "romaji": "Okaikei.",
      "fr": "L'addition.",
      "quality": "ok",
      "feedback": "On comprend. Ajoute を おねがいします pour être poli."
     },
     {
      "jp": "いくらですか？",
      "romaji": "Ikura desu ka?",
      "fr": "C'est combien ?",
      "quality": "weak",
      "feedback": "Possible, mais à table on dit plutôt おかいけいを おねがいします."
     }
    ]
   },
   {
    "speaker": "npc",
    "jp": "はい。ぜんぶで 5000円です。",
    "romaji": "Hai. Zenbu de gosen en desu.",
    "fr": "Oui. Au total, 5000 yens.",
    "breakdown": [
     {
      "chunk": "ぜんぶで",
      "role": "« Au total ».",
      "tip": "On te le dit avant de payer."
     },
     {
      "chunk": "5000円",
      "role": "Cinq mille yens.",
      "tip": "ご = 5, せん = 1000."
     }
    ]
   }
  ]
 }
];
