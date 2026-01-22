import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠️ Por favor, ingresa el horario del reto.\n*Ejemplo:* ${usedPrefix + command} 10:00 PM`

  const encabezados = [
    "⚡ 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 | SUPREME 24x24",
    "🚀 DIDIER SYSTEM | MEGA BATTLE",
    "✨ DIDIER DEVELOPERS | 24 VS 24"
  ]
  const imagenes = [
    "https://files.catbox.moe/1j784p.jpg",
    "https://files.catbox.moe/xr2m6u.jpg"
  ]

  const titulo = encabezados[Math.floor(Math.random() * encabezados.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer = Buffer.alloc(0)
  try {
    const res = await axios.get(imagen, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
  } catch (e) {
    console.log("Error al cargar imagen:", e)
  }

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 24,
        message: titulo,
        footerText: "𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 • 𝐁𝐲 𝐃𝐢𝐝𝐢𝐞𝐫",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/1j784p.jpg'},
    caption: `╭╾━━━━╼ 〔 ⚡ 〕 ╾━━━━╼╮
┃  🔥 *𝟐𝟒 𝐕𝐒 𝟐𝟒 | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*
┃
┃ ⏳ *ʜᴏʀᴀʀɪᴏ:*
┃ 🇲🇽 MÉXICO: ${args[0]}
┃ 🇨🇴 COLOMBIA: ${args[0]}
┃
┃ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
┃ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 2:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 3:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 4:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 5:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 6:*
┃   👑 • 
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

handler.help = ['24vs24']
handler.tags = ['freefire']
handler.command = /^(vs24|24vs24)$/i
handler.group = true

export default handler
