#!/usr/bin/env python3
"""Serveur statique de dev avec cache désactivé (Cache-Control: no-store).
Évite que Chrome serve d'anciens modules ES en cache pendant le développement."""
import http.server, socketserver

PORT = 8000

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"Serveur no-cache sur http://localhost:{PORT}")
    httpd.serve_forever()
