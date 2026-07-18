from duckduckgo_search import DDGS
import urllib.request
import os
import ssl
import json

ssl._create_default_https_context = ssl._create_unverified_context

def download_image(query, filename):
    print(f"Searching for: {query}")
    try:
        with DDGS() as ddgs:
            results = ddgs.images(
                query,
                region="wt-wt",
                safesearch="moderate",
                size="Large",
                max_results=5
            )
            for r in results:
                url = r['image']
                print(f"Found URL: {url}")
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=10) as response, open(f"public/{filename}", 'wb') as out_file:
                        data = response.read()
                        out_file.write(data)
                    print(f"Successfully downloaded to public/{filename}")
                    return
                except Exception as e:
                    print(f"Failed to download {url}: {e}")
    except Exception as e:
        print(f"DDG Search failed for {query}: {e}")
                
queries = [
    ("nuclear power plant control room realistic industrial photography", "edim-support-2.jpg"),
    ("military command operations center realistic photography", "enadox-cover.jpg"),
    ("server rack close up data center realistic photography", "enadox-support-1.jpg"),
    ("fiber optic network cables server room realistic photography", "enadox-support-2.jpg"),
    ("nuclear power plant exterior realistic photography", "home-energy.jpg"),
    ("military drone flying realistic photography", "home-defense.jpg"),
    ("data center server racks realistic photography", "home-finance.jpg"),
    ("supercomputer data center realistic photography", "home-ai.jpg"),
    ("engineers collaborating in industrial lab realistic photography", "about-hero.jpg"),
]

for q, f in queries:
    download_image(q, f)
