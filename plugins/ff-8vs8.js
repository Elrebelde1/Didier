import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖱𝖾𝗍𝗈 𝟪𝗏𝗌𝟪*
│
│ ⏳ *ʜᴏʀᴀʀɪᴏ:*
│ 🇲🇽 MÉXICO: 
│ 🇨🇴 COLOMBIA: 
│
│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:* 8 VS 8
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ ᴀ:*
│    👑 • 
│    ⚡ • 
│    ⚡ • 
│    ⚡ • 
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ ʙ:*
│    👑 • 
│    ⚡ • 
│    ⚡ • 
│    ⚡ • 
│
│ 🔄 *ʀᴇsᴇʀᴠᴀs:*
│    👤 • 
│    👤 • 
│
│ 💬 *𝖴𝗌𝖺:* .8vs8 [𝗁𝗈𝗋𝖺]
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
`

  const textos = [
    "👟 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙: 𝖣𝗈𝗆𝗂𝗇𝗂𝗈 𝖳𝗈𝗍𝖺𝗅",
    "⚔️ 𝖣𝗎𝖾𝗅𝗈 𝖽𝖾 𝖤𝗅𝗂𝗍𝖾 𝖠𝖼𝗍𝗂𝗏𝖺𝖽𝗈",
    "🛸 𝖲𝗒𝗌𝗍𝖾𝗆 𝖤𝗅𝗂𝗎𝖽: 𝖢𝗈𝗇𝖿𝗅𝗂𝖼𝗍𝗈 𝟪𝗏𝗌𝟪"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = textos[Math.floor(Math.random() * textos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]
  const thumbBuffer = Buffer.from(
    (await axios.get(imagen, { responseType: 'arraybuffer'})).data
  )

  const kingMessage = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 2026,
        message: titulo,
        footerText: "𝖵𝖺𝗇𝗌 𝖡𝗈𝗍 • 𝖡𝗒 𝖤𝗅𝗂𝗎𝖽",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  const caption = `
╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮
│
│ ⏳ *ʜᴏʀᴀʀɪᴏs:*
│ 🇲🇽 MÉXICO: ${args[0]}
│ 🇨🇴 COLOMBIA: ${args[0]}
│
│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:* 8 VS 8
│
│ 🔱 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
│    👑 • 
│    ⚔️ • 
│    ⚔️ • 
│    ⚔️ • 
│
│ 🔱 *ᴇsᴄᴜᴀᴅʀᴀ 2:*
│    👑 • 
│    ⚔️ • 
│    ⚔️ • 
│    ⚔️ • 
│
│ 🚀 *sᴜᴘʟᴇɴᴛᴇs:*
│    👾 • 
│    👾 • 
│
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: caption,
    mentions: []
  }, { quoted: kingMessage })
}

handler.help = ['8vs8']
handler.tags = ['freefire']
handler.command = /^(vs8|8vs8|masc8)$/i
handler.group = true
handler.admin = false

export default handler
