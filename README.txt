PULSEVANILLA WEBSITE

A static website (HTML, CSS, plain JavaScript) that works on GitHub Pages. No backend, no build step.

FILES
- config.js      ALL your settings: server address, Discord invite, store link, rules link,
                 news. This is the only file you normally edit.
- index.html     Page structure and texts (card titles and texts).
- style.css      Colours, card layout, mobile/tablet layout.
- script.js      Copy buttons, links, news, optional live Discord count.
- assets/brand/pv-logo.png              Your PV logo (logo card + browser tab icon).
- assets/brand/pulsevanilla-wordmark.jpg Your Pulse Vanilla logo (link previews when the site is shared).
- assets/art/*.svg      Store and Rules backgrounds (original pixel artwork made for this
                        site; the blurred Rules art is also the How To Join background).
- assets/logo.svg       Older pixel crystal logo, no longer used on the page.

ADD YOUR REAL LINKS (config.js)
Paste the full link between the quotes, including https://
  discordInvite: "https://discord.gg/yourcode"
  storeUrl:      "https://yourstore.tebex.io"
  rulesUrl:      "https://..."
While a value is "" the card shows "Link coming soon" instead of a broken link.

NEWS (config.js)
Add entries like: { date: "2026-11-01", title: "Season 1 launch", text: "Short text." }

LIVE DATA (optional, config.js)
- discordLiveMemberCount: true  -> shows the real member count once discordInvite is set.
Nothing is ever made up: if the data can't be loaded, the cards fall back to normal text.

REPLACE THE ARTWORK WITH YOUR OWN SCREENSHOTS
1. Save your screenshot in assets/art/ (for example assets/art/store.jpg, ideally 1920x1080).
2. In index.html, change the matching src="assets/art/store.svg" to src="assets/art/store.jpg".
   Cards: Store (store.svg), How To Join (rules.svg, shown
   blurred), Rules (rules.svg).
Images are automatically cropped to fill the card and darkened at the bottom so text stays readable.

PREVIEW ON YOUR PC
Double-click index.html, or (better) in this folder run:  python -m http.server 8765
and open http://127.0.0.1:8765

PUBLISH / UPDATE ON GITHUB PAGES
Upload all files AND the assets folder to the root of your website repository, replacing the old
index.html, style.css, script.js and README.txt. If your repository has a CNAME file (your custom domain),
leave it exactly as it is: nothing here changes your domain or DNS.

NOTES
- Do not put private keys, Discord webhook URLs, passwords or database credentials in these files:
  everything here is public.
- The previous design is saved in ..\backup-old-design-2026-10-22\
