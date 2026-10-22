// PulseVanilla website behaviour. Settings live in config.js — you should not need to edit this file.
(() => {
  "use strict";

  const config = window.PULSE_CONFIG || {};
  const serverIp = (config.serverIp || "pulsevanilla.eu").trim();
  const $ = (selector) => document.querySelectorAll(selector);

  /* ---- Server address everywhere ---- */
  $("[data-ip]").forEach((el) => { el.textContent = serverIp; });
  $("[data-ip-upper]").forEach((el) => { el.textContent = serverIp.toUpperCase(); });
  $("[data-copy-ip]").forEach((el) => el.setAttribute("aria-label", `Copy server address ${serverIp}`));

  /* ---- "Server Address" box types the address once, like typing it in game ---- */
  const typing = document.querySelector("[data-typing]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typing) {
    typing.textContent = reduceMotion ? serverIp : "";
    if (!reduceMotion) {
      let i = 0;
      const step = () => {
        typing.textContent = serverIp.slice(0, ++i);
        if (i < serverIp.length) setTimeout(step, 85);
      };
      setTimeout(step, 700);
    }
  }

  /* ---- Toast ---- */
  const toast = document.querySelector("[data-toast]");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  /* ---- Copy to clipboard (with a fallback for older browsers / file://) ---- */
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through */ }
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    area.remove();
    return ok;
  }

  $("[data-copy-ip]").forEach((button) => {
    button.addEventListener("click", async () => {
      const ok = await copyText(serverIp);
      showToast(ok ? `Copied ${serverIp}` : `Server address: ${serverIp}`);
      if (ok) {
        button.classList.remove("is-copied");
        void button.offsetWidth; // restart the pop animation on repeated clicks
        button.classList.add("is-copied");
        clearTimeout(button.copiedTimer);
        button.copiedTimer = setTimeout(() => button.classList.remove("is-copied"), 1600);
      }
    });
  });

  /* ---- Mouse effects: glow follows the cursor, cards tilt slightly (mouse only, not touch) ---- */
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const max = r.width > 700 ? 1.5 : 5; // wide cards tilt less
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---- Links from config (store, Discord, rules) ---- */
  function validUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch { return null; }
  }

  $("[data-link]").forEach((el) => {
    const url = validUrl(config[el.dataset.link]);
    const label = el.dataset.label || el.textContent.trim();
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.setAttribute("aria-label", `${label} (opens in a new tab)`);
      return;
    }
    // Not configured yet: no href, so it is not clickable or focusable, plus a visible "coming soon".
    el.removeAttribute("href");
    el.classList.add("is-pending");
    el.setAttribute("aria-disabled", "true");
    const tooltip = el.querySelector(".tooltip");
    if (tooltip) tooltip.textContent = "Coming soon";
    const cta = el.matches("[data-cta]") ? el : el.querySelector("[data-cta]");
    if (el.classList.contains("card")) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Link coming soon";
      if (cta) cta.replaceWith(badge);
      else el.appendChild(badge);
    } else if (cta) {
      cta.textContent = "Discord coming soon";
    }
  });

  /* ---- Discord member count (only real numbers from Discord's public invite API) ---- */
  const discordUrl = validUrl(config.discordInvite);
  const discordNumber = document.querySelector("[data-discord-number]");
  const discordLabel = document.querySelector("[data-discord-label]");
  if (discordUrl && config.discordLiveMemberCount) {
    const code = discordUrl.replace(/\/+$/, "").split("/").pop();
    fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const members = Number(data.approximate_member_count);
        const online = Number(data.approximate_presence_count);
        if (!Number.isFinite(members) || members <= 0) return;
        const fmt = new Intl.NumberFormat("en");
        discordNumber.textContent = fmt.format(members);
        discordLabel.textContent = Number.isFinite(online) && online > 0
          ? `Discord Members · ${fmt.format(online)} online`
          : "Discord Members";
      })
      .catch(() => { /* keep "Join our community" */ });
  }

  /* ---- News ---- */
  const newsEl = document.querySelector("[data-news]");
  const news = Array.isArray(config.news) ? config.news.filter((n) => n && n.title) : [];
  if (!news.length) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.className = "news__empty";
    p.textContent = "No announcements yet. Upcoming events and updates will be posted here and on our Discord.";
    li.appendChild(p);
    newsEl.appendChild(li);
  }
  news.forEach((item) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    if (item.date) {
      time.dateTime = item.date;
      const d = new Date(`${item.date}T12:00:00`);
      time.textContent = Number.isNaN(d.getTime())
        ? item.date
        : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    const title = document.createElement("strong");
    title.textContent = item.title;
    li.append(time, title);
    if (item.text) {
      const p = document.createElement("p");
      p.textContent = item.text;
      li.appendChild(p);
    }
    newsEl.appendChild(li);
  });

  /* ---- Footer year ---- */
  $("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
