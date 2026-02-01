import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {

    if (!args[0]) return m.reply(`🌙 *¿QUÉ DESEAS BUSCAR?*\n\n> Ingrese el nombre de una canción o un link de Spotify.\n> *Ejemplo:* ${usedPrefix + command} Twice I Can't Stop Me`);

    try {
        await m.react('🔍');
        let text = args.join(" ");
        let spotifyUrl = text;

        // --- 1. DETECCIÓN DE LINK O BÚSQUEDA ---
        const isUrl = /^(https?:\/\/)?(open\.)?spotify\.com\/(track|album|playlist)\/.+/i.test(text);

        if (!isUrl) {
            // Búsqueda en la API
            let searchRes = await fetch(`https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=1`);
            let searchData = await searchRes.json();

            if (!searchData.status || !searchData.data || searchData.data.length === 0) {
                return m.reply('❌ No se encontraron resultados para tu búsqueda.');
            }
            spotifyUrl = searchData.data[0].url;
        }

        // --- 2. DESCARGA DEL AUDIO ---
        await m.react('📥');
        let downloadRes = await fetch(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(spotifyUrl)}`);
        let res = await downloadRes.json();

        if (!res.status) return m.reply('❌ Error al procesar la descarga de Spotify.');

        let force = res.data; 
        
        let moon = `\`𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝑋 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰\`\n\n`;
        moon += `☪︎ *Título:* ${force.title}\n`;
        moon += `☪︎ *Artista:* ${force.author}\n`;
        moon += `☪︎ *Link:* ${spotifyUrl}\n`;
        moon += `───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`;

        // Envío de imagen
        await conn.sendFile(m.chat, force.image, 'cover.jpg', moon, m);

        // Envío de audio
        await conn.sendMessage(m.chat, { 
            audio: { url: force.download }, 
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    title: force.title,
                    body: force.author,
                    thumbnailUrl: force.image,
                    sourceUrl: spotifyUrl,
                    mediaType: 1,
                    showAdAttribution: true
                }
            }
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        console.error(e);
        await m.react('❌');
        m.reply(`✨ *Error:* No se pudo completar la solicitud.`);
    }
}

handler.help = ['spotify <nombre/link>'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'sp', 'spotifydl', 'spdl'];

export default handler;
