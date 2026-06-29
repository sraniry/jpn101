#!/bin/bash
# Double-clique ce fichier depuis le Finder pour lancer Nihongo Kyoto.
# Démarre le serveur local (cache désactivé) et ouvre l'app dans Safari (où le son fonctionne).

# Se place dans le dossier du script, quel que soit l'endroit d'où il est lancé
cd "$(dirname "$0")" || exit 1

PORT=8000
URL="http://localhost:${PORT}/index.html"

# Si un serveur tourne déjà sur le port, on le libère
if lsof -ti:${PORT} >/dev/null 2>&1; then
  echo "Un serveur tourne déjà sur le port ${PORT} — on le relance proprement…"
  lsof -ti:${PORT} | xargs kill -9 2>/dev/null
  sleep 2
fi

# Ouvre l'app dans Safari après un court délai (le temps que le serveur démarre)
( sleep 1.5 && open -a Safari "${URL}" ) &

echo "──────────────────────────────────────────────"
echo "  Nihongo Kyoto — serveur local"
echo "  ${URL}"
echo ""
echo "  • L'app s'ouvre dans Safari (son OK)."
echo "  • Laisse cette fenêtre ouverte pendant l'utilisation."
echo "  • Pour arrêter : Ctrl+C, ou ferme cette fenêtre."
echo "──────────────────────────────────────────────"
echo ""

# Lance le serveur (bloquant — garde la fenêtre active)
python3 serve-nocache.py
