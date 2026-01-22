import fg from 'api-dylux'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, command, usedPrefix}) => {
  if (!args[0]) throw `✨ *𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*\n\n⚠️ Por favor, ingresa el horario del reto.\n*Ejemplo:* ${usedPrefix + command} 7:00 PM`

  const fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'DidierMenu'
    },
    message: {
      locationMessage: {
        name: '⚡ INVOCACIÓN | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓',
        jpegThumbnail: await (await fetch('https://files.catbox.moe/1j784p.jpg')).buffer(),
        vcard:
          'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;Didier;;;\n' +
          'FN:Didier\n' +
          'ORG:Didier Developers\n' +
          'TITLE:\n' +
          'item1.TEL;waid=19709001746:+1 (970) 900-1746\n' +
          'item1.X-ABLabel:Didier\n' +
          'X-WA-BIZ-DESCRIPTION:Reto organizado vía 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓 ✨\n' +
          'X-WA-BIZ-NAME:Didier\n' +
          'END:VCARD'
      }
    }
  }

  await conn.sendMessage(m.chat, {
    text: '🎯 *¡Reto 4vs4 detectado por Didier Bot!*',
  }, { quoted: fkontak })

  // Mensaje visual principal
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/1j784p.jpg'},
    caption: `╭╾━━━━╼ 〔 ⚡ 〕 ╾━━━━╼╮
┃  🔥 *𝟒 𝐕𝐒 𝟒 | 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*
┃
┃ ⏳ *ʜᴏʀᴀʀɪᴏ:*
┃ 🇲🇽 MÉXICO: ${args[0]}
┃ 🇨🇴 COLOMBIA: ${args[0]}
┃
┃ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
┃ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*
┃
┃ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
┃   👑 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃   🥷🏻 • 
┃
┃ 🧱 *sᴜᴘʟᴇɴᴛᴇs:*
┃   🥷🏻 • 
┃   🥷🏻 • 
╰╾━━━━╼ 〔 🚀 〕 ╾━━━━╼╯
*By Didier Developers • 𝐃𝐈𝐃𝐈𝐄𝐑 𝐁𝐎𝐓*`,
    mentions: []
  }, { quoted: fkontak })
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true

export default handler
