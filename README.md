# Jadushan Balu — Portfolio

Static site: HTML, CSS, vanilla JS, GSAP + ScrollTrigger, Lucide (all from CDN).

## Files
```
index.html
css/styles.css
js/main.js        <- edit APPS, SITES, REELS, FILMS, PHOTOS at the top
assets/profile.jpg <- put your photo here
```

## Add your work
Open `js/main.js`, un-comment an example object in an array and fill it in.
Put images/videos in `assets/` and use relative paths like `assets/apps/app1.jpg`.
Empty arrays show dashed placeholder slots.

## Deploy on GitHub Pages
1. Create a repo and upload everything (keep the folder structure).
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`, Save.
4. After ~1 minute the site is live at `https://<username>.github.io/<repo>/`.

Tip: GitHub limits files to 100 MB; host long videos on Instagram/YouTube and use the `link` field.

## Notes
- The contact form has no backend: it validates, then opens an email draft, a WhatsApp draft, or copies the message.
- Respects `prefers-reduced-motion` (transitions become instant).
- Add your Instagram URL to the Instagram card in `index.html` (wrap it in an `<a href>`).
