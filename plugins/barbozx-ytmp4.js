
import fetch from 'node-fetch'

const handler = async (m, { conn, text, command, usedPrefix}) => {
  const apikey = "sylphy-8238wss"

  if (!text) {
    return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <URL de YouTube>\n📍 *Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=abc123`)
}

  if (!text.includes("youtube.com")) {
    return m.reply("❌ Por favor, proporciona una URL válida de YouTube.")
}

  const apiUrl = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(text)}&apikey=sylphy-8238wss`

  try {
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status ||!json.res ||!json.res.url) {
      return m.reply("❌ No se pudo obtener el video. Verifica que la URL sea válida.")
}

    const info = json.res
    const caption = `
╭─🎬 *YouTube MP4 Downloader* ─╮
│
│ 🎞️ *Título:* ${info.title}
│ 💽 *Formato:* ${info.format}
│ 🔊 *Calidad:* ${info.quality}
│ 📦 *Tamaño:* ${info.filesize}
│ 📥 *Descargando video...*
╰────────────────────────────╯
`

    await conn.sendMessage(m.chat, { image: { url: info.thumbnail}, caption}, { quoted: m})
    await conn.sendMessage(m.chat, {
      video: { url: info.url},
      mimetype: 'video/mp4',
      fileName: `${info.title}.mp4`
}, { quoted: m})

} catch (error) {
    console.error("Error al conectar con la API:", error)
    m.reply("⚠️ Ocurrió un error al intentar descargar el video.")
}
}

handler.help = ['ytmp4 <url>']
handler.tags = ['video']
handler.command = /^ytmp4$/i

export default handler