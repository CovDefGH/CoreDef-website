import urllib.request
import urllib.parse
import re
import json

def fetch_image_ddg(query, filename):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query + ' filetype:jpg high resolution site:unsplash.com')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # DuckDuckGo image links often have a redirect like ?uddg=...
        links = re.findall(r'href="([^"]+images\.unsplash\.com[^"]+)"', html)
        if not links:
            links = re.findall(r'uddg=([^"&]+)', html)
            
        for link in links:
            actual_link = urllib.parse.unquote(link)
            if 'images.unsplash.com' in actual_link or 'unsplash.com/photos' in actual_link:
                # If it's a photo page, we can't download directly. We need the image URL.
                if 'images.unsplash.com' in actual_link:
                    img_url = actual_link.split('?')[0] + '?w=1600&h=900&fit=crop&q=80'
                    print(f"Downloading {img_url} to {filename}")
                    urllib.request.urlretrieve(img_url, f"public/{filename}")
                    return True
        print(f"No valid image found for {query}")
    except Exception as e:
        print(f"Error for {query}: {e}")
    return False

queries = [
    ("nuclear reactor interior", "edim-support-2.jpg"),
    ("military command center", "enadox-cover.jpg"),
    ("server rack close up", "enadox-support-1.jpg"),
    ("fiber optic cables", "enadox-support-2.jpg"),
    ("nuclear power plant", "home-energy.jpg"),
    ("military radar", "home-defense.jpg"),
    ("financial data center", "home-finance.jpg"),
    ("supercomputer", "home-ai.jpg"),
    ("engineering team lab", "about-hero.jpg"),
]

for q, f in queries:
    fetch_image_ddg(q, f)
