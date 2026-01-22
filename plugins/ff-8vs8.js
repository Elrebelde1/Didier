import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠️ Por favor, ingresa el horario del reto.\n*Ejemplo:* ${usedPrefix + command} 6:00 PM`

  const textos = [
    "⚡ 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓: Dominio Total",
    "⚔️ Duelo de Élite Activado",
    "🚀 Didier System: Conflicto 8vs8"
  ]
  
  const imagenes = [
    "https://files.catbox.moe/1j784p.jpg",
    "https://files.catbox.moe/xr2m6u.jpg"
  ]

  const titulo = textos[Math.floor(Math.random() * textos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]
  
  let thumbBuffer
  try {
    thumbBuffer = (await axios.get(imagen, { responseType: 'arraybuffer' })).data
  } catch {
    thumbBuffer = Buffer.alloc(0)
  }

  const kingMessage = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 2026,
        status: 1,
        message: titulo,
        footerText: "𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 • 𝐁𝐲 𝐃𝐢𝐝𝐢𝐞𝐫",
        thumbnail: thumbBuffer,
        surface: 1,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  const caption = `
╭╾━━━━╼ 〔 ⚡ 〕 ╾━━━━╼╮
┃
┃ ⏳ *ʜᴏʀᴀʀɪᴏs:*
┃ 🇲🇽 MÉXICO: ${args[0]}
┃ 🇨🇴 COLOMBIA: ${args[0]}
┃
┃ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
┃ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:* 8 VS 8
┃
┃ 🔱 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
┃    👑 • 
┃    ⚔️ • 
┃    ⚔️ • 
┃    ⚔️ • 
┃
┃ 🔱 *ᴇsᴄᴜᴀᴅʀᴀ 2:*
┃    👑 • 
┃    ⚔️ • 
┃    ⚔️ • 
┃    ⚔️ • 
┃
┃ 🚀 *sᴜᴘʟᴇɴᴛᴇs:*
┃    👾 • 
┃    👾 • 
┃
╰╾━━━━╼ 〔 ✨ 〕 ╾━━━━╼╯
*By Didier Developers • 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/1j784p.jpg' },
    caption: caption,
    mentions: []
  }, { quoted: kingMessage })
}

handler.help = ['8vs8']
handler.tags = ['freefire']
handler.command = /^(vs8|8vs8|masc8)$/i
handler.group = true

export default handler
