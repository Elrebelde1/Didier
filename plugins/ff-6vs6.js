import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠️ Por favor, ingresa el horario del reto.\n*Ejemplo:* ${usedPrefix + command} 5:30 PM`

  const mensajes = [
    "🔥 COMBATE PREPARADO | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓",
    "⚡ RETO 6vs6 | DIDIER SYSTEM",
    "💣 LLAMADO GRUPAL | DIDIER DEVELOPERS"
  ]
  const imagenes = [
    "https://files.catbox.moe/1j784p.jpg",
    "https://files.catbox.moe/xr2m6u.jpg"
  ]

  const textoRandom = mensajes[Math.floor(Math.random() * mensajes.length)]
  const imagenRandom = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagenRandom, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
  } catch (err) {
    thumbBuffer = Buffer.alloc(0)
  }

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 6,
        status: 1,
        message: textoRandom,
        footerText: "𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 • 𝐁𝐲 𝐃𝐢𝐝𝐢𝐞𝐫",
        thumbnail: thumbBuffer,
        surface: 1,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/1j784p.jpg'},
    caption: `╭╾━━━━╼ 〔 ⚡ 〕 ╾━━━━╼╮
┃  💥 *𝟔 𝐕𝐒 𝟔 | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*
┃
┃ ⏳ *ʜᴏʀᴀʀɪᴏ:*
┃ 🇲🇽 MÉXICO: ${args[0]}
┃ 🇨🇴 COLOMBIA: ${args[0]}
┃
┃ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
┃ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:* 6 VS 6
┃
┃ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*
┃   🥷🏻 • 
┃   🥷🏻 • 
╰╾━━━━╼ 〔 🚀 〕 ╾━━━━╼╯
*By Didier Developers • 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*`,
    mentions: []
  }, { quoted: izumi})
}

handler.help = ['6vs6']
handler.tags = ['freefire']
handler.command = /^(vs6|6vs6|masc6)$/i
handler.group = true
handler.admin = true // Solo admins pueden organizar retos

export default handler
