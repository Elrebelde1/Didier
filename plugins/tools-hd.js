
import fetch from 'node-fetch'

let handler = async (m, { conn, args, command}) => {
  const apikey = 'sylphy-8238wss'
  const imageUrl = args[0]

  if (!imageUrl) return m.reply(`📌 Ejemplo:.${command} https://qu.ax/gcBQF.jpg`)

  try {
    const upscaleUrl = `https://api.sylphy.xyz/tools/upscale?url=${encodeURIComponent(imageUrl)}&apikey=sylphy-8238wss`
    const res = await fetch(upscaleUrl)
    const buffer = await res.buffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `🖼 Imagen mejorada con resolución HD\n🔗 Fuente: Sylphy API`
}, { quoted: m})
} catch (e) {
    console.error('❌ Error al mejorar la imagen:', e)
    m.reply('⚠️ No se pudo procesar la imagen. Asegúrate de que el enlace sea válido.')
}
}

handler.help = ['hd <url de imagen>']
handler.tags = ['tools']
handler.command = /^hd$/i

export default handler;