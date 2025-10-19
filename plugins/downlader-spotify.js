
import fetch from 'node-fetch'

const handler = async (m, { conn, text, command, usedPrefix}) => {
  const apikey = "sylphy-8238wss" // Usar el mismo apikey que funciona

  if (!text) {
    return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <nombre de canción o URL de Spotify>\n📍 *Ejemplo:* ${usedPrefix + command} lupita\n📍 *Ejemplo:* ${usedPrefix + command} https://open.spotify.com/track/...`)
}

  const isSpotifyUrl = text.includes("open.spotify.com/track")

  try {
    let info, trackUrl

    if (isSpotifyUrl) {
      trackUrl = text
} else {
      const searchRes = await fetch(`https://api.sylphy.xyz/search/spotify?q=${encodeURIComponent(text)}&apikey=${apikey}`)
      const searchJson = await searchRes.json()

      if (!searchJson.status ||!Array.isArray(searchJson.data) || searchJson.data.length === 0) {
        return m.reply("❌ No se encontraron canciones.")
}

      trackUrl = searchJson.data[0].url
}

    const downloadRes = await fetch(`https://api.sylphy.xyz/download/spotify?url=${encodeURIComponent(trackUrl)}&apikey=${apikey}`)
    const downloadJson = await downloadRes.json()

    if (!downloadJson.status ||!downloadJson.data ||!downloadJson.data.dl_url) {
      return m.reply("❌ No se pudo descargar el audio.")
}

    info = downloadJson.data

    const caption = `
╭─🎶 *Spotify Downloader* 🎶─╮
│
│ 🎵 *Título:* ${info.title}
│ 👤 *Autor:* ${info.author || 'Desconocido'}
│ ⏱️ *Duración:* ${info.duration || 'N/A'}
│ 🔗 *Enlace:* ${trackUrl}
│ 📥 *Descargando audio...*
╰────────────────────────────╯
`

    await conn.sendMessage(m.chat, { image: { url: info.image}, caption}, { quoted: m})
    await conn.sendMessage(m.chat, {
      audio: { url: info.dl_url},
      mimetype: 'audio/mp4',
      fileName: `${info.title}.m4a`
}, { quoted: m})

} catch (e) {
    console.error("Error en el handler de Spotify:", e)
    m.reply("⚠️ Ocurrió un error al procesar tu solicitud.")
}
}

handler.help = ['spotify <texto o URL>']
handler.tags = ['music']
handler.command = /^spotify$/i

export default handler