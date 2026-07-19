import urllib.request
import urllib.parse
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

def fetch_wikimedia(query, filename):
    print(f"Searching Wikimedia for {query}")
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&format=json"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        
        pages = data.get('query', {}).get('pages', {})
        for page_id, page_info in pages.items():
            if 'imageinfo' in page_info:
                img_url = page_info['imageinfo'][0]['url']
                # Skip svg, webm, ogv etc
                if img_url.lower().endswith(('.jpg', '.jpeg', '.png')):
                    print(f"Downloading {img_url}")
                    urllib.request.urlretrieve(img_url, f"public/{filename}")
                    return True
        print(f"No suitable image found for {query}")
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return False

fetch_wikimedia("nuclear power plant high resolution", "home-energy.jpg")
fetch_wikimedia("supercomputer", "home-ai.jpg")
