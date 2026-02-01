import fetch from 'node-fetch';

let MF = async (m, { conn, args, command, usedPrefix }) => {

    if (!args[0]) return m.reply(`🌙 *¿QUÉ DESEAS BUSCAR?*\n\n> Ingrese el nombre de una canción o un link de Spotify.\n> *Ejemplo:* ${usedPrefix + command} Twice - I Can't Stop Me`);

    try {
        await m.react('🔍');
        let text = args.join(" ");
        let spotifyUrl = text;

        // --- 1. LÓGICA DE DETECCIÓN (Link vs Búsqueda) ---
        const isUrl = /^(https?:\/\/)?(open\.)?spotify\.com\/(track|album|playlist)\/.+/i.test(text);

        if (!isUrl) {
            // Si es texto, usamos la API de búsqueda
            let searchRes = await fetch(`https://api.delirius.store/search/spotify?q=${encodeURIComponent(text)}&limit=1`);
            let searchData = await searchRes.json();

            if (!searchData.status || searchData.data.length === 0) {
                return m.reply('❌ No se encontraron resultados para tu búsqueda.');
            }
            spotifyUrl = searchData.data[0].url; // Tomamos el link del primer resultado
        }

        // --- 2. LÓGICA DE DESCARGA ---
        await m.react('📥');
        let downloadRes = await fetch(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(spotifyUrl)}`);
        let res = await downloadRes.json();

        if (!res.status) return m.reply('❌ Error al procesar la descarga de Spotify.');

        let force = res.data; 
        
        // Estética del mensaje
        let moon = `\`𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝑋 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰\`\n\n`;
        moon += `☪︎ *Título:* ${force.title}\n`;
        moon += `☪︎ *Artista:* ${force.author}\n`;
        moon += `☪︎ *Link:* ${spotifyUrl}\n`;
        moon += `───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`;

        // Enviamos la portada con la info
        await conn.sendFile(m.chat, force.image, 'cover.jpg', moon, m);

        // Enviamos el audio con metadatos para el reproductor
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
        m.reply(`✨ *Ups:* No se pudo completar la solicitud. Inténtalo de nuevo más tarde.`);
    }
}

MF.command = ['spotify', 'sp', 'spotifydl'];
MF.help = ['spotify <nombre/link>'];
MF.tags = ['descargas'];

export default MF;
