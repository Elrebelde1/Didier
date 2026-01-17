const handler = async (m, { isPrems, conn }) => {
  const last = global.db.data.users[m.sender].lastcofre || 0
  const now = new Date() * 1
  const cooldown = 0 

  if (now - last < cooldown) {
    const wait = msToTime((last + cooldown) - now)
    throw `⏳ 𝖤𝗅 𝗌𝗂𝗌𝗍𝖾𝗆𝖺 𝖾𝗌𝗍𝖺́ 𝗉𝗋𝗈𝖼𝖾𝗌𝖺𝗇𝖽𝗈... 𝖤𝗌𝗉𝖾𝗋𝖺 *${wait}*.`
  }

  // Imagen principal de Vans Bot
  const img = 'https://files.catbox.moe/dcp02s.jpg' 
  
  const texto = `
╭╾━━━━╼ 〔 🎨 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝕯𝖎𝖘𝖊𝖓̃𝖔𝖘*
│
│  🛸 *𝖦𝗋𝖺𝗉𝗁𝗂𝖼 𝖲𝗒𝗌𝗍𝖾𝗆*
│  🛹 *𝖡𝗒 𝖤𝗅𝗂𝗎𝖽*
│
│  *ᴇsᴛɪʟᴏs ᴅᴇ ᴛᴇxᴛᴏ:*
│  ◦ .logoneon
│  ◦ .logoglitch
│  ◦ .logograffiti3d
│  ◦ .logomatrix
│  ◦ .logofuturista
│  ◦ .logocielo
│
│  *ɢᴀᴍɪɴɢ & ᴘᴇʀsᴏɴᴀᴊᴇs:*
│  ◦ .logogaming
│  ◦ .logonaruto
│  ◦ .logodragonball
│  ◦ .logoarmy
│  ◦ .logopubg
│  ◦ .logopubgfem
│  ◦ .logoguerrero
│  ◦ .logolol
│  ◦ .logoamongus
│
│  *ᴇғᴇᴄᴛᴏs ʏ ʀᴇᴅᴇs:*
│  ◦ .tweet
│  ◦ .sadcat
│  ◦ .logocorazon
│  ◦ .logopareja
│  ◦ .logoalas
│  ◦ .logonube
│  ◦ .logohorror
│
│  *ᴍᴜʟᴛɪᴍᴇᴅɪᴀ:*
│  ◦ .logoportadaplayer
│  ◦ .logoportadaff
│  ◦ .logovideotiger
│  ◦ .logovideointro
│  ◦ .logovideogaming
│
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`.trim()

  await conn.sendMessage(m.chat, { image: { url: img }, caption: texto }, { quoted: m })

  global.db.data.users[m.sender].lastcofre = now
}

handler.help = ['menu3']
handler.tags = ['main', 'logo']
handler.command = ['menulogos', 'logos', 'menu3'] 

export default handler

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return `${hours}h ${minutes}m ${seconds}s`
}
