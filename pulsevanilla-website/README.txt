PULSEVANILLA WEBSITE — STARTER KIT

FILES
- index.html: website structure and text
- style.css: colours, layout, responsive design
- script.js: server IP, Discord link, copy button and footer year

FIRST THINGS TO EDIT
1. Open script.js in Notepad or VS Code.
2. Replace play.pulsevanilla.net with your real Minecraft server address.
3. Replace https://discord.com/ with your actual Discord invite URL.
4. In index.html, update the title, description, rank details, and any wording you want.
5. Do not publish private keys, Discord webhook URLs, passwords, or database credentials.

PREVIEW ON YOUR PC
1. Extract the ZIP.
2. Open the pulsevanilla-website folder.
3. Double-click index.html to preview it in your browser.
   For best results, use VS Code with its Live Server extension, but that is optional.

PUBLISH FREE WITH GITHUB PAGES
1. Create a public GitHub repository named pulsevanilla-website.
2. Upload index.html, style.css, script.js, and README.txt to the repository root.
3. Open repository Settings > Pages.
4. Under Build and deployment, select Deploy from a branch.
5. Choose branch main and folder /(root), then Save.
6. Wait for GitHub Pages to publish the site.

CONNECT YOUR DOMAIN
1. In repository Settings > Pages, enter your domain in Custom domain and save.
2. At your domain provider, configure DNS using the exact records shown/recommended in GitHub's official Pages documentation.
3. For a www subdomain, GitHub Pages normally uses a CNAME pointing to YOUR-USERNAME.github.io (replace with your GitHub username).
4. For the root/apex domain, use the A records GitHub documents. Do not delete unrelated email or verification DNS records.
5. Once DNS has propagated and the certificate is ready, enable Enforce HTTPS.

Official guide:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

NOTES
- This is a static website starter. It does not include player accounts, a backend, live player count, or payment processing.
- Do not promise rank perks until you have confirmed them.
- The server IP and Discord invite above are placeholders; replace them before launch.
