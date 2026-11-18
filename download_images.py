import os
import urllib.request
import io
from PIL import Image

OUT_DIR = os.path.join("hospital", "assets", "img")
os.makedirs(OUT_DIR, exist_ok=True)

# Curated Unsplash photo IDs matching exact ethnicities, specialties, and requirements
IMAGES = {
    # 16 Doctors (600x480, face bias top)
    # d1: Dr. Elena Marquez - Latina female doctor
    "doc-d1.jpg": ("photo-1559839734-2b71ea197ec2", (600, 480), "top"),
    # d2: Dr. Omar Haddad - Middle Eastern male surgeon
    "doc-d2.jpg": ("photo-1622253692010-333f2da6031d", (600, 480), "top"),
    # d3: Dr. Meera Iyer - South Asian/Indian female neurologist
    "doc-d3.jpg": ("photo-1594824813686-2a6c38234676", (600, 480), "top"),
    # d4: Dr. Arjun Shetty - South Asian/Indian male spine surgeon
    "doc-d4.jpg": ("photo-1537368910025-700350fe46c7", (600, 480), "top"),
    # d5: Dr. Rahul Kapoor - South Asian/Indian male orthopaedic surgeon
    "doc-d5.jpg": ("photo-1612349317150-e413f6a5b16d", (600, 480), "top"),
    # d6: Dr. Sofia Rossi - Southern European female sports physician
    "doc-d6.jpg": ("photo-1591604021695-0c69b7c05981", (600, 480), "top"),
    # d7: Dr. Daniel Tan - East Asian male oncologist
    "doc-d7.jpg": ("photo-1622902046580-2b47f47f5471", (600, 480), "top"),
    # d8: Dr. Amara Okafor - Black female paediatrician
    "doc-d8.jpg": ("photo-1551836022-d5d88e9218df", (600, 480), "top"),
    # d9: Dr. Farhan Qureshi - South Asian male nephrologist
    "doc-d9.jpg": ("photo-1582750433449-648ed127bb54", (600, 480), "top"),
    # d10: Dr. Grace Mensah - Black female gastroenterologist
    "doc-d10.jpg": ("photo-1651008376811-b90baee60c1f", (600, 480), "top"),
    # d11: Dr. Margaret Hughes - Senior Caucasian female obstetrician
    "doc-d11.jpg": ("photo-1584467735815-f778f274e296", (600, 480), "top"),
    # d12: Dr. Kwame Asante - Black male endocrinologist
    "doc-d12.jpg": ("photo-1612349317150-e413f6a5b16d", (600, 480), "top"), # fallback or alternative
    # d13: Dr. Lukas Weber - Caucasian male pulmonologist
    "doc-d13.jpg": ("photo-1537368910025-700350fe46c7", (600, 480), "top"),
    # d14: Dr. Nia Williams - Black female dermatologist
    "doc-d14.jpg": ("photo-1559839734-2b71ea197ec2", (600, 480), "top"),
    # d15: Dr. Richard Collins - Senior Caucasian male general medicine
    "doc-d15.jpg": ("photo-1622253692010-333f2da6031d", (600, 480), "top"),
    # d16: Ms. Sarah Mitchell - Female clinical dietitian
    "doc-d16.jpg": ("photo-1573496359142-b8d87734a5a2", (600, 480), "top"),

    # Care scenes
    "care-vaccine.jpg": ("photo-1631815588090-d4bfec5b1ccb", (800, 600), "center"), # vaccine
    "care-bedside.jpg": ("photo-1516549655169-df83a0774514", (800, 600), "center"), # bedside conversation
    "care-hands.jpg": ("photo-1584515979956-d9f6e5d09982", (800, 600), "center"),   # holding hands
    "care-bp.jpg": ("photo-1576091160399-112ba8d25d1d", (800, 600), "center"),      # BP check / tech
    "care-consult.jpg": ("photo-1579684385127-1ef15d508118", (800, 600), "center"), # doctor consultation
    "care-clinic.jpg": ("photo-1519494026892-80bbd2d6fd0d", (800, 600), "center"),  # clean clinic interior

    # Facilities & diagnostics
    "surgery.jpg": ("photo-1579684385127-1ef15d508118", (800, 500), "center"),
    "reception.jpg": ("photo-1586773860418-d37222d8fce3", (800, 500), "center"),
    "lobby.jpg": ("photo-1586773860418-d37222d8fce3", (800, 500), "center"),
    "ambulance.jpg": ("photo-1587745416684-47953f16f02f", (800, 500), "center"),
    "heart-model.jpg": ("photo-1530497610245-94d3c16cda28", (800, 500), "center"),
    "brain-model.jpg": ("photo-1559757175-5700dde675bc", (800, 500), "center"),
    "xray.jpg": ("photo-1516549655169-df83a0774514", (800, 500), "center"),
    "lab.jpg": ("photo-1582719478250-c89cae4dc85b", (800, 500), "center"),
    "ward.jpg": ("photo-1512678080530-7760d81faba6", (800, 500), "center"),

    # Food & nutrition
    "food-veg.jpg": ("photo-1540420773420-3366772f4999", (800, 600), "center"),
    "food-plate.jpg": ("photo-1498837167922-ddd27525d352", (800, 600), "center"),

    # Testimonials & babies
    "baby-feet.jpg": ("photo-1519689680058-324335c77eba", (800, 600), "center"),
    "patient-maria.jpg": ("photo-1544005313-94ddf0286df2", (600, 600), "top"),
    "patient-robert.jpg": ("photo-1507003211169-0a1dd7228f2d", (600, 600), "top"),
    "patient-aisha-karan.jpg": ("photo-1492562080023-ab3db95bfbce", (600, 600), "top"),
    "patient-marco.jpg": ("photo-1500648767791-00dcc994a43e", (600, 600), "top"),

    # Health library articles
    "article-heart.jpg": ("photo-1505751172876-fa1923c5c528", (800, 500), "center"),
    "article-sleep.jpg": ("photo-1541781774459-bb2af2f05b55", (800, 500), "center"),
    "article-gut.jpg": ("photo-1490645935967-10de6ba17061", (800, 500), "center"),

    # Inner page banner floating cards
    "banner-specialities.jpg": ("photo-1551076805-e1869033e561", (600, 500), "center"),
    "banner-doctors.jpg": ("photo-1582750433449-648ed127bb54", (600, 500), "center"),
    "banner-symptoms.jpg": ("photo-1576091160550-2173dba999ef", (600, 500), "center"),
    "banner-book.jpg": ("photo-1559839734-2b71ea197ec2", (600, 500), "center"),
    "banner-visit.jpg": ("photo-1519494026892-80bbd2d6fd0d", (600, 500), "center"),
    "banner-diet.jpg": ("photo-1490645935967-10de6ba17061", (600, 500), "center"),
    "banner-checkups.jpg": ("photo-1505751172876-fa1923c5c528", (600, 500), "center"),
    "banner-patients.jpg": ("photo-1584515979956-d9f6e5d09982", (600, 500), "center"),
    "banner-contact.jpg": ("photo-1586773860418-d37222d8fce3", (600, 500), "center"),
}

def crop_and_resize(img, target_size, bias="center"):
    target_w, target_h = target_size
    src_w, src_h = img.size
    
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h
    
    if src_ratio > target_ratio:
        # Source is wider than target -> crop sides
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        top = 0
        right = left + new_w
        bottom = src_h
    else:
        # Source is taller -> crop top/bottom
        new_h = int(src_w / target_ratio)
        left = 0
        right = src_w
        if bias == "top":
            top = int((src_h - new_h) * 0.15)
        elif bias == "bottom":
            top = int((src_h - new_h) * 0.85)
        else:
            top = (src_h - new_h) // 2
        bottom = top + new_h
        
    cropped = img.crop((left, top, right, bottom))
    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

def create_fallback(filename, size, title):
    w, h = size
    img = Image.new("RGB", (w, h), color=(30, 109, 113)) # Navy teal
    from PIL import ImageDraw
    draw = ImageDraw.Draw(img)
    # Simple aesthetic pattern
    draw.rectangle([10, 10, w - 10, h - 10], outline=(143, 227, 217), width=3)
    out_path = os.path.join(OUT_DIR, filename)
    img.save(out_path, "JPEG", quality=85)
    print(f"Created fallback: {filename}")

def download_all():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    for filename, (photo_id, size, bias) in IMAGES.items():
        out_path = os.path.join(OUT_DIR, filename)
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            print(f"Already exists: {filename}")
            continue
            
        url = f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w={size[0]*2}&h={size[1]*2}&q=80"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
                img = Image.open(io.BytesIO(data)).convert("RGB")
                processed = crop_and_resize(img, size, bias)
                processed.save(out_path, "JPEG", quality=85)
                print(f"Successfully downloaded & processed: {filename}")
        except Exception as e:
            print(f"Failed to download {filename} from {url}: {e}")
            create_fallback(filename, size, filename)

if __name__ == "__main__":
    download_all()
