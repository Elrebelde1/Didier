import fetch from "node-fetch"
import yts from 'yt-search'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text.trim()) return conn.reply(m.chat, `❀ Ingresa el nombre o link de YouTube.`, m)
        await m.react('🕒')

        // Búsqueda del video
        const search = await yts(text)
        const video = search.videos[0]
        if (!video) throw 'ꕥ No se encontraron resultados.'

        const { title, thumbnail, timestamp, views, url, author } = video
        const info = `「✦」*DESCARGADOR YOUTUBE*\n\n> ❑ *Título:* ${title}\n> ✧︎ *Duración:* ${timestamp}\n> ➪ *Link:* ${url}`

        await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: info }, { quoted: m })

        // Configuración de la API Sylphy
        const isAudio = /^(play|yta|ytmp3)$/i.test(command)
        const type = isAudio ? 'ytmp3' : 'ytmp4'
        const quality = isAudio ? '128kbps' : '360p' // Valores obligatorios por la API
        const apiKey = 'sylphy-6f150d'

        const apiUrl = `https://sylphy.xyz/download/${type}?url=${encodeURIComponent(url)}&q=${quality}&api_key=${apiKey}`
        
        const res = await fetch(apiUrl)
        const json = await res.json()

        // Manejo de errores de la API
        if (!json.status) {
            throw json.error || 'Error desconocido en el servidor.'
        }

        const downloadUrl = json.result.url || json.result // Ajustar según la estructura exacta de 'result'

        if (isAudio) {
            await conn.sendMessage(m.chat, { 
                audio: { url: downloadUrl }, 
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`
            }, { quoted: m })
        } else {
            await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                caption: `> ❀ ${title}`,
                mimetype: 'video/mp4'
            }, { quoted: m })
        }

        await m.react('✔️')

    } catch (e) {
        console.error(e)
        await m.react('✖️')
        return conn.reply(m.chat, `⚠︎ *Error:* ${e}`, m)
    }
}

handler.command = /^(play|yta|ytmp3|ytv|ytmp4|mp4)$/i
export default handler
