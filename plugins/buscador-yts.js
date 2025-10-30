
import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text ||!text.trim()) {
    return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <término de búsqueda>\n📍 *Ejemplo:* ${usedPrefix + command} Messi goles`);
}

  const query = text.trim();
  const url = `https://api.starlights.uk/api/search/youtube?q=${encodeURIComponent(query)}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const json = await res.json();

  if (!json.status ||!json.result || json.result.length === 0) {
    return m.reply("❌ No se encontraron resultados.");
}

  const videos = json.result.slice(0, 5);

  for (const video of videos) {
    const caption = `
╭─🎶 *Sasuke Bot - Audio YouTube* 🎶─╮
│ 🎵 *Título:* ${video.title}
│ 👤 *Autor:* ${video.channel}
│ ⏱️ *Duración:* ${video.duration}
│ 🔗 *Enlace:* ${video.link}
│
│ 🎧 *Para descargar:*
│.ytmp3+ ${video.link}  ➤ Audio
│.ytmp4+ ${video.link}  ➤ Video
╰──────────────────────────────────╯

> © Código Oficial de Barboza MD™
`;

    await conn.sendMessage(
      m.chat,
      { image: { url: video.imageUrl}, caption},
      { quoted: m}
);
}
};

handler.help = ["ytsearch", "yts <texto>"];
handler.tags = ["búsquedas"];
handler.command = ["ytsearch", "yts"];

export default handler;