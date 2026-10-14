#!/usr/bin/env python3
"""Build the two-view Arabic website as an offline, self-contained index.html."""
from pathlib import Path
import base64
import re
import json

ROOT = Path(__file__).resolve().parent

def data_url(path):
    mime = {'.jpg': 'image/jpeg', '.woff2': 'font/woff2'}[path.suffix]
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()

html = (ROOT / 'template.html').read_text()
css = (ROOT / 'styles.css').read_text()
css = re.sub(r'''url\((['"])(.*?)\1\)''', lambda m: "url('" + data_url(ROOT / m[2]) + "')", css)
html = html.replace('/* STYLES */', css)
for filename in ['hvac-rooftop.jpg', 'fire-system.jpg']:
    html = html.replace('assets/' + filename, data_url(ROOT / 'assets' / filename))
for marker, source in [('GSAP', 'assets/vendor/gsap.min.js'), ('SCROLLTRIGGER', 'assets/vendor/ScrollTrigger.min.js'), ('LENIS', 'assets/vendor/lenis.min.js'), ('APP', 'app.js')]:
    script = (ROOT / source).read_text()
    script = re.sub(r'//# sourceMappingURL=.*', '', script)
    script = script.replace('</script', '<\\/script')
    html = html.replace('/* ' + marker + ' */', script)
licenses = {
    'Cairo (SIL Open Font License 1.1)': (ROOT / 'assets/vendor/cairo-LICENSE').read_text(),
    'Lenis (MIT)': (ROOT / 'assets/vendor/lenis-LICENSE').read_text(),
    'GSAP and ScrollTrigger': 'Copyright 2025 GreenSock. https://gsap.com/standard-license. Original copyright and license headers retained in the embedded JavaScript.'
}
notices = json.dumps(licenses, ensure_ascii=False).replace('<', '\\u003c')
html = html.replace('</head>', '<script type="application/json" id="third-party-licenses">' + notices + '</script>\n</head>')
output = ROOT.parent / 'index.html'
output.write_text(html)
print(f'Built {output.name}: {output.stat().st_size / 1024 / 1024:.2f} MB. Images, fonts and scripts embedded.')
