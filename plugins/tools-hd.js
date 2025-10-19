
import fetch from 'node-fetch'

let handler = async (m, { conn, args, command}) => {
  const apikey = 'sylphy-8238wss'
  let imageUrl = args[0]

  // Si no hay argumento, intenta obtener la imagen del mensaje citado
  if (!imageUrl && m.quoted?.mimetype?.startsWith('image/')) {
    const media = await conn.downloadAndSaveMediaMessage(m.quoted)
    imageUrl = media // Esto depende de tu sistema de almacenamiento
    return m.reply('⚠️ Este método requiere que la imagen esté alojada en línea. Usa una URL directa.')
}

  // Si no hay URL válida
  if (!imageUrl) {
    return m.reply(`📌 *Uso correcto:*\n.${command} <url de imagen>\nO responde a una imagen con.${command}`)
}

  try {
    const upscaleUrl = `https://api.sylphy.xyz/tools/upscale?url=${encodeURIComponent(imageUrl)}&apikey=${apikey}`
    const res = await fetch(upscaleUrl)
    const buffer = await res.buffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `🖼 Imagen mejorada con resolución HD\n🔗 Fuente: Sylphy API`
}, { quoted: m})
} catch (e) {
    console.error('❌ Error al mejorar la imagen:', e)
    m.reply('⚠️ No se pudo procesar la imagen. Asegúrate de que el enlace sea válido y accesible.')
}
}

handler.help = ['hd <url de imagen>']
handler.tags = ['tools']
handler.command = /^hd$/i

export default handler