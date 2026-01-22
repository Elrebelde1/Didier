import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠️ Por favor, ingresa el horario del reto.\n*Ejemplo:* ${usedPrefix + command} 9:00 PM`

  // Mensaje citado tipo Izumi con imagen y título aleatorio
  const titulos = [
    "⚡ 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 | ELITE 20x20",
    "🚀 DIDIER SYSTEM | GUERRA DE CLANES",
    "✨ DIDIER DEVELOPERS | MAX BATTLE"
  ]
  const imagenes = [
    "https://files.catbox.moe/1j784p.jpg",
    "https://files.catbox.moe/xr2m6u.jpg"
  ]

  const titulo = titulos[Math.floor(Math.random() * titulos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagen, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
  } catch (e) {
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
        itemCount: 20,
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
┃  💢 *𝟐𝟎 𝐕𝐒 𝟐𝟎 | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*
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
┃ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*
┃   🥷🏻 • 
┃   🥷🏻 • 
╰╾━━━━╼ 〔 🚀 〕 ╾━━━━╼╯
*By Didier Developers • 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*`,
    mentions: []
  }, { quoted: izumi})
}

handler.help = ['20vs20']
handler.tags = ['freefire']
handler.command = /^(vs20|20vs20)$/i
handler.group = true

export default handler;
