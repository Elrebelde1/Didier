
import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command}) => {
if (!text) return m.reply("Ingresa un texto a buscar")

const url = `https://api.sylphy.xyz/search/youtube?q=${encodeURIComponent(query)}&apikey=${apikey}`;
const res = await fetch(url);

if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

const json = await res.json();

if (!json.status || !json.res || json.res.length === 0) {
    return m.reply("No se encontraron resultados.");
}

const videos = json.res.slice(0, 5);

for (const video of videos) {
    const caption = `
╭─🎶 *Sasuke Bot - Audio YouTube* 🎶─╮
│ 🎵 *Título:* ${video.title}
│ 👤 *Autor:* ${video.author}
│ ⏱️ *Duración:* ${video.duration}
│ 👁️ *Vistas:* ${video.views.toLocaleString()}
│ 📅 *Publicado:* ${video.published || 'Desconocido'}
│ 🔗 *Enlace:* ${video.url}
│
│ 🎧 *Para descargar:*
│.ytmp3+ ${video.url}  ➤ Audio
│.ytmp4+ ${video.url}  ➤ Video
╰──────────────────────────────────╯

> © Código Oficial de Barboza MD™
`;

    await conn.sendMessage(
        m.chat,
        { image: { url: video.thumbnail }, caption },
        { quoted: m }
    );
}
};

handler.help = ["ytsearch", "yts <texto>"];
handler.tags = ["búsquedas"];
handler.command = ["ytsearch", "yts"]

export default handler;