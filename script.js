// PulseVanilla website settings — replace these values with your real details.
const SERVER_IP = "play.pulsevanilla.net"; // Change this to your actual Minecraft server address.
const DISCORD_INVITE = "https://discord.com/"; // Replace with your permanent Discord invite.
const ipElement = document.getElementById("server-ip");
const copyButton = document.getElementById("copy-ip");
const discordLink = document.getElementById("discord-link");
const toast = document.getElementById("toast");

ipElement.textContent = SERVER_IP.toUpperCase();
discordLink.href = DISCORD_INVITE;
document.getElementById("year").textContent = new Date().getFullYear();

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(SERVER_IP);
    toast.textContent = "Server IP copied!";
  } catch {
    toast.textContent = `Server IP: ${SERVER_IP}`;
  }
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});