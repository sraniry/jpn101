# Nihongo Kyoto

Appli web (PWA) pour apprendre le japonais quand on est francophone et débutante : kana, 2136 kanji joyo avec rappel espacé (SRS), radicaux et mnémoniques, dialogues, lecture de menus, kit de survie Kyoto, leçons de grammaire, journal d'erreurs.
Pas de build : des modules ES servis tels quels. En ligne : https://sraniry.github.io/jpn101/

## Lancer en local
```bash
python3 -m http.server 8765   # puis http://localhost:8765/index.html
npm test                      # node tests/run.mjs : SRS, données, fusion cloud, service worker
```
Le service worker ne s'enregistre pas toujours sur `localhost` : c'est sans conséquence pour le développement.

## Sauvegarde et vie privée
- Ta progression reste **sur ton appareil** (localStorage / IndexedDB). Rien n'est envoyé sans ton accord.
- Sauvegarde manuelle : « Mes cartes & sauvegarde » → Exporter (.json). iOS peut effacer les données d'un site peu utilisé : exporte de temps en temps.
- Synchro optionnelle entre appareils : un code personnel (à traiter comme un mot de passe) sert de clé d'un document Firestore. Les états sont **fusionnés** (jamais écrasés) ; l'état est stocké en une seule chaîne JSON.
- Les photos de menu restent sur l'appareil.

## Note honnête sur `_archive/`
Un ancien export de progression personnelle (`_archive/nihongo-progression-*.json`) a été commité avant d'être ignoré (`.gitignore`). Il n'est plus suivi, mais **il reste dans l'historique Git public**. Pour le purger (à faire sciemment, cela réécrit l'historique et oblige à forcer le push) :
```bash
pip install git-filter-repo
git filter-repo --path _archive --invert-paths     # supprime _archive de tout l'historique
git push --force github main                       # puis re-cloner sur les autres machines
```
Cette commande n'a PAS été exécutée. Si ce fichier contient des données sensibles, considère aussi qu'il a déjà pu être copié.

## Sources et licences
Kanji : KANJIDIC et KRADFILE (EDRDG, CC BY-SA 4.0). Ordre des traits : KanjiVG (CC BY-SA 3.0). Textes, histoires et dialogues rédigés pour l'appli, relus par IA mais pas par un locuteur natif.
