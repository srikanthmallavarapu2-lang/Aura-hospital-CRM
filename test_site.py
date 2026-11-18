import os
import sys
import time
import subprocess
import threading
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

PAGES = [
    "index.html",
    "specialities.html",
    "doctors.html",
    "symptoms.html",
    "book.html",
    "visit.html",
    "diet.html",
    "checkups.html",
    "patients.html",
    "contact.html",
]

VIEWPORTS = [
    {"name": "desktop", "width": 1440, "height": 900},
    {"name": "mobile", "width": 390, "height": 844},
]

SCREENSHOT_DIR = "test_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server(port, directory):
    class CustomHandler(QuietHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=directory, **kwargs)
    httpd = ThreadingHTTPServer(("127.0.0.1", port), CustomHandler)
    httpd.serve_forever()

def test_all():
    port = 8089
    hospital_dir = os.path.abspath("hospital")
    
    server_thread = threading.Thread(target=run_server, args=(port, hospital_dir), daemon=True)
    server_thread.start()
    time.sleep(1)
    
    base_url = f"http://127.0.0.1:{port}"
    errors_found = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        for vp in VIEWPORTS:
            print(f"\n--- Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
            context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = context.new_page()

            console_errors = []
            page_errors = []

            page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type in ["error"] else None)
            page.on("pageerror", lambda err: page_errors.append(str(err)))

            for page_name in PAGES:
                url = f"{base_url}/{page_name}"
                console_errors.clear()
                page_errors.clear()

                page.goto(url, wait_until="networkidle")
                # Scroll down to load any lazy images and trigger reveals
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                page.wait_for_timeout(400)
                page.evaluate("window.scrollTo(0, 0)")
                page.wait_for_timeout(200)

                # Check console / page errors (excluding harmless font/network sandbox if any)
                real_errors = [e for e in console_errors + page_errors if "favicon" not in e]
                if real_errors:
                    print(f"❌ {page_name} had errors: {real_errors}")
                    errors_found.append((page_name, vp["name"], real_errors))
                else:
                    print(f"✓ {page_name}: 0 console errors")

                # Check horizontal overflow
                overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
                if overflow:
                    scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
                    inner_w = page.evaluate("() => window.innerWidth")
                    print(f"❌ {page_name} has horizontal overflow! scrollWidth={scroll_w}, innerWidth={inner_w}")
                    errors_found.append((page_name, vp["name"], f"Horizontal overflow: {scroll_w} > {inner_w}"))
                else:
                    print(f"✓ {page_name}: No horizontal overflow")

                # Check broken images (W3C standard: complete && naturalWidth === 0)
                broken_images = page.evaluate("""() => {
                    const imgs = Array.from(document.querySelectorAll('img'));
                    return imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src);
                }""")
                if broken_images:
                    print(f"❌ {page_name} has broken images: {broken_images}")
                    errors_found.append((page_name, vp["name"], f"Broken images: {broken_images}"))
                else:
                    print(f"✓ {page_name}: All images valid")

                # Screenshot
                screenshot_path = os.path.join(SCREENSHOT_DIR, f"{vp['name']}_{page_name.replace('.html', '')}.png")
                page.screenshot(path=screenshot_path)

            context.close()

        # Detailed Functional Tests in Desktop Viewport
        print("\n--- Functional Verification Tests ---")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 1. Hero 3D scroll animation sequence
        print("\n1. Testing Hero 3D scroll animation...")
        page.goto(f"{base_url}/index.html", wait_until="networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/hero_scroll_0.png")

        page.evaluate("window.scrollTo(0, 150)")
        page.wait_for_timeout(200)
        page.screenshot(path=f"{SCREENSHOT_DIR}/hero_scroll_150_swell.png")

        page.evaluate("window.scrollTo(0, 450)")
        page.wait_for_timeout(200)
        page.screenshot(path=f"{SCREENSHOT_DIR}/hero_scroll_450_flying.png")

        page.evaluate("window.scrollTo(0, 750)")
        page.wait_for_timeout(200)
        page.screenshot(path=f"{SCREENSHOT_DIR}/hero_scroll_750_landed.png")
        print("✓ Hero 3D scroll sequence captured at 4 scroll stages.")

        # 2. End-to-end Booking Flow
        print("\n2. Testing End-to-end Booking Flow...")
        page.goto(f"{base_url}/book.html", wait_until="networkidle")
        
        # 2. End-to-end Booking Flow
        print("\n2. Testing End-to-end Booking Flow...")
        page.goto(f"{base_url}/book.html", wait_until="networkidle")
        
        # Step 0: Select Cardiology department (transitions to step 1 automatically)
        page.wait_for_selector("#deptGrid .opt[data-dept='card']")
        page.click("#deptGrid .opt[data-dept='card']")
        page.wait_for_timeout(400)
        
        # Step 1: Select doctor (transitions to step 2 automatically)
        page.wait_for_selector("#docPick .opt")
        page.click("#docPick .opt")
        page.wait_for_timeout(400)

        # Step 2: Select an available slot button, then click continue
        page.wait_for_selector("#slotArea .slot:not(:disabled)")
        page.click("#slotArea .slot:not(:disabled)")
        page.wait_for_timeout(200)
        page.click("#nextBtn")
        page.wait_for_timeout(400)

        # Step 3: Fill patient details
        page.fill("#pName", "Devashish Sharma")
        page.fill("#pPhone", "9876543210")
        page.fill("#pAge", "34")
        page.select_option("#pGender", "Male")
        page.fill("#pReason", "Routine cardiac health screening")
        page.click("#nextBtn")
        page.wait_for_timeout(400)

        # Step 4: Review & Confirm
        page.screenshot(path=f"{SCREENSHOT_DIR}/booking_step4_review.png")
        page.click("#consent")
        page.wait_for_timeout(200)
        page.click("#nextBtn")
        page.wait_for_timeout(600)

        # Step 5: Verify confirmation ticket
        token_el = page.wait_for_selector("#ticket")
        ticket_text = token_el.inner_text()
        print(f"✓ Booking completed successfully! Ticket details: {ticket_text[:60]}...")
        page.screenshot(path=f"{SCREENSHOT_DIR}/booking_confirmation_ticket.png")

        # 3. Diet Calculator
        print("\n3. Testing Diet Calculator...")
        page.goto(f"{base_url}/diet.html", wait_until="networkidle")
        page.wait_for_selector("#rCal")
        initial_cal = page.inner_text("#rCal")
        
        # Click on Chronic Kidney Disease condition in #condGrid
        page.wait_for_selector("#condGrid .cond[data-c='ckd']")
        page.click("#condGrid .cond[data-c='ckd']")
        page.wait_for_timeout(300)
        ckd_cal = page.inner_text("#rCal")
        print(f"✓ Diet recalculated for CKD. Initial: {initial_cal} kcal -> CKD: {ckd_cal} kcal.")
        page.screenshot(path=f"{SCREENSHOT_DIR}/diet_ckd_results.png")

        # 4. Symptom Guide -> Doctor Booking Hand-off
        print("\n4. Testing Symptom Guide -> Booking hand-off...")
        page.goto(f"{base_url}/symptoms.html", wait_until="networkidle")
        page.wait_for_selector(".bm-spot")
        page.click(".bm-spot")
        page.wait_for_timeout(300)
        
        # Select first symptom
        page.wait_for_selector(".sym-chips .sym")
        page.click(".sym-chips .sym")
        page.wait_for_timeout(300)
        page.screenshot(path=f"{SCREENSHOT_DIR}/symptoms_selected.png")

        # Click Book button on recommended doctor
        page.wait_for_selector("button[data-bmbook]")
        page.click("button[data-bmbook]")
        page.wait_for_timeout(600)
        current_url = page.url
        print(f"✓ Handoff navigated to: {current_url}")
        assert "book.html?doc=" in current_url
        page.screenshot(path=f"{SCREENSHOT_DIR}/symptoms_handoff_booking.png")

        context.close()
        browser.close()

    if errors_found:
        print("\n❌ Summary: Errors found during headless verification:")
        for e in errors_found:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("\n🎉 ALL PAGES PASSED! 0 Console Errors, 0 Broken Images, 0 Horizontal Overflows!")

if __name__ == "__main__":
    test_all()
