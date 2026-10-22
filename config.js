/* ==========================================================================
   PULSEVANILLA WEBSITE SETTINGS — this is the only file you need to edit.
   Text values go between the quotes. Leave a value as "" when you don't
   have it yet: the site then shows a tasteful "coming soon" instead of a
   broken or made-up link.
   ========================================================================== */
window.PULSE_CONFIG = {
  // Minecraft Java Edition address shown on the site and copied by the buttons.
  serverIp: "pulsevanilla.eu",

  // Your permanent Discord invite.
  discordInvite: "https://discord.gg/pulsevanilla",

  // true = show the real member count from Discord's public invite API (needs discordInvite).
  // If Discord does not answer, the card simply says "Join our community".
  discordLiveMemberCount: true,

  // PLACEHOLDER — your store URL, e.g. "https://yourstore.tebex.io".
  // (The plugin's /store command currently says pulsevanilla.tebex.io — paste it here
  // only once you have confirmed that is your real store.)
  storeUrl: "",

  // Your server rules: the #rules channel on the PulseVanilla Discord.
  // (Only people who already joined the Discord can open a channel link.)
  rulesUrl: "https://discord.com/channels/1559002704997777448/1559019442229223515",

  // Announcements and events, newest first. Example:
  // { date: "2026-11-01", title: "Season 1 launch", text: "The arena opens at 18:00 CET." },
  news: []
};
