import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text.trim()) return conn.reply(m.chat, `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n❀ Por favor, ingresa el nombre o link de YouTube para descargar.`, m)
        
        await m.react('🕒')

        const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
        const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
        const search = await yts(query)
        const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]

        if (!result) throw 'ꕥ No se encontraron resultados para tu búsqueda.'

        const { title, thumbnail, timestamp, views, url, author } = result
        
        // Mensaje de información con el nombre del bot
        const info = `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓: DESCARGAS*\n\n` +
                     `> 📝 *Título:* ${title}\n` +
                     `> 📺 *Canal:* ${author.name}\n` +
                     `> ⏳ *Duración:* ${timestamp}\n` +
                     `> 👀 *Vistas:* ${views.toLocaleString()}\n` +
                     `> 🔗 *Link:* ${url}\n\n` +
                     `*Enviando archivo, por favor espere...*`

        const thumb = (await conn.getFile(thumbnail)).data
        await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

        // Determinar si es audio o video
        const isAudio = ['play', 'yta', 'ytmp3', 'playaudio'].includes(command)
        const endpoint = isAudio ? 'ytaudio' : 'ytvideo'

        // Llamada a la API de Adonix
        const res = await fetch(`https://api-adonix.ultraplus.click/download/${endpoint}?apikey=AdonixKeyvr85v01953&url=${encodeURIComponent(url)}`)
        const json = await res.json()

        if (!json.status || !json.data?.url) throw '⚠ El servidor de descargas no respondió correctamente.'

        const downloadUrl = json.data.url

        if (isAudio) {
            // Enviar como Audio/MP3
            await conn.sendMessage(m.chat, { 
                audio: { url: downloadUrl }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mpeg' 
            }, { quoted: m })
        } else {
            // Enviar como Video/MP4
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                caption: `✨ *${title}*\n> 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓`,
                fileName: `${title}.mp4`,
                mimetype: 'video/mp4'
            }, { quoted: m })
        }

        await m.react('✔️')

    } catch (e) {
        console.error(e)
        await m.react('✖️')
        return conn.reply(m.chat, `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠︎ *Error:* ${e}`, m)
    }
}

handler.command = /^(play|yta|ytmp3|play2|ytv|ytmp4|playaudio|mp4)$/i
handler.group = false

export default handler
