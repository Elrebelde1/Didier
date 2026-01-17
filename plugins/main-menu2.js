const handler = async (m, { conn }) => {
  // Nueva Imagen de Vans Bot
  const img = 'https://files.catbox.moe/qqaj1o.jpg' 

  const texto = `
╭╾━━━━╼ 〔 🎧 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝕬𝖚𝖉𝖎𝖔𝖘*
│
│  🛸 *𝖲𝗈𝗎𝗇𝖽𝖻𝗈𝖺𝗋𝖽 𝖲𝗒𝗌𝗍𝖾𝗆*
│  🛹 *𝖡𝗒 𝖤𝗅𝗂𝗎𝖽*
│
│  *ᴍᴇᴍᴇs ʏ ғʀᴀsᴇs:*
│  ◦ _El Pepe, Basado, Potasio_
│  ◦ _Eso va ser epico papus_
│  ◦ _Se estan riendiendo de mi_
│  ◦ _Diagnosticado con Gay_
│  ◦ _Usted es feo, Ara Ara_
│
│  *ʀᴇᴀᴄᴄɪᴏɴᴇs:*
│  ◦ _WTF, OMG, ZZZZ, Joder_
│  ◦ _Nadie te pregunto_
│  ◦ _Que onda, Mmmm, Hey_
│  ◦ _Bien pensado Woody_
│
│  *ᴀᴜᴅɪᴏs ᴄʟásɪᴄᴏs:*
│  ◦ _Chambear, Mudo, Onichan_
│  ◦ _Siuuu, Yamete, Pikachú_
│  ◦ _Ma ma masivo, Taka taka_
│  ◦ _Tunometecabrasaramambiche_
│
│  *sᴀʟᴜᴅᴏs:*
│  ◦ _Buenos días, Buenas noches_
│  ◦ _Bienvenido wey, Hola_
│  ◦ _Feliz cumpleaños_
│
│  ⚠️ *𝖠𝖽𝗏𝖾𝗋𝗍𝖾𝗇𝖼𝗂𝖺:*
│  _Escribe el nombre exacto_
│  _del audio para reproducirlo._
│
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`.trim()

  await conn.sendMessage(m.chat, { 
    image: { url: img }, 
    caption: texto 
  }, { quoted: m })
}

handler.help = ['menu2', 'menuaudios']
handler.tags = ['main']
handler.command = ['menu2', 'menuaudios', 'audios']

export default handler
