#!/usr/bin/env python3
"""Minimal preview server; exposes only the final site, not repository files."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import gzip

INDEX = Path(__file__).resolve().parent.parent / 'index.html'
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return
        if path not in ('/', '/index.html'):
            self.send_error(404)
            return
        data = INDEX.read_bytes()
        compressed = 'gzip' in self.headers.get('Accept-Encoding', '')
        if compressed:
            data = gzip.compress(data)
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Vary', 'Accept-Encoding')
        self.send_header('X-Content-Type-Options', 'nosniff')
        if compressed:
            self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)
    def do_HEAD(self):
        if urlsplit(self.path).path not in ('/', '/index.html'):
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()

if __name__ == '__main__':
    print('Website ready on http://0.0.0.0:3000', flush=True)
    ThreadingHTTPServer(('0.0.0.0', 3000), Handler).serve_forever()
