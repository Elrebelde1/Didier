
import fetch from "node-fetch";

const handler = async (m, { conn, text, command}) => {
  if (!text ||!text.trim()) {
    return m.reply(`🎄 *Uso correcto del comando navideño* 🎄\n\n.spotify <nombre de canción o URL de Spotify>\nEjemplo:.spotify Blinding Lights\nEjemplo:.spotify https://open.spotify.com/track/2uPMsTEKx79gJ8rB3AcT0v`);
}

  await m.react("🎁");

  try {
    const isUrl = text.includes("spotify.com");
    const query = encodeURIComponent(text.trim());

    const apiUrl = isUrl
? `https://api.nekolabs.web.id/downloader/spotify/v2?url=${query}`
: `https://api.nekolabs.web.id/downloader/spotify/play/v1?q=${query}`;

    const res = await fetch(apiUrl);
    const json = await res.json();

    // Verificación flexible
    const result = json.result || json.data || {};
    const audioUrl = result.download?.url || result.audio_url;
    const title = result.title || result.name || "Villancico Desconocido";
    const artist = result.artist || result.artists?.join(", ") || "Artista Desconocido";
    const thumbnail = result.thumbnail || result.image || "https://i.imgur.com/JP52fdP.jpg";

    if (!audioUrl) {
      return m.reply("❌ *Santa no encontró tu villancico en Spotify.*");
}

    const caption = `
╭─[ Trineo Musical de Spotify ]─╮
│ 🎶 Villancico: ${title}
│ 👤 Intérprete: ${artist}
│ 🔗 Enlace: ${text.trim()}
╰────────────────────────────╯

🎅 *Santa está preparando tu pista...*
`;

    const thumbRes = await fetch(thumbnail);
    const thumbBuffer = await thumbRes.buffer();
    await conn.sendFile(m.chat, thumbBuffer, "spotify.jpg", caption, m);

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl},
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
}, { quoted: m});

    await m.react("🎧");

} catch (error) {
    console.error("🎄 Error Spotify:", error);
    m.reply("⚠️ *El duende digital tuvo problemas con tu regalo musical. Intenta de nuevo.*");
}
};

handler.help = ["spotify <texto o URL>"];
handler.tags = ["descargas", "spotify"];
handler.command = ["spotify"];

export default handler;