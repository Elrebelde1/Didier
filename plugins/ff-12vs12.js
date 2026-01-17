import fs from 'fs'
import path from 'path'

let handlerLista = async (m, { conn }) => {
  const listaPath = path.join('./database/lista12vs12.json')

  // Si no existe, lo creamos vacío
  if (!fs.existsSync(listaPath)) {
    const inicial = { titulares: [], suplentes: [] }
    fs.writeFileSync(listaPath, JSON.stringify(inicial, null, 2))
  }

  const lista = JSON.parse(fs.readFileSync(listaPath, 'utf-8'))

  let texto = `╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮\n`
  texto += `│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖫𝗂𝗌𝗍𝖺 𝟣𝟤𝗏𝗌𝟣𝟤*\n`
  texto += `│\n`
  texto += `│ ❤️ *ᴛɪᴛᴜʟᴀʀᴇs:*\n`
  
  if (lista.titulares.length === 0) {
    texto += `│  (𝗏𝖺𝖼𝗂́𝗈)\n`
  } else {
    lista.titulares.forEach((j, i) => {
      texto += `│  ${i+1}. ${j}\n`
    })
  }

  texto += `│\n`
  texto += `│ 👍 *sᴜᴘʟᴇɴᴛᴇs:*\n`
  
  if (lista.suplentes.length === 0) {
    texto += `│  (𝗏𝖺𝖼𝗂́𝗈)\n`
  } else {
    lista.suplentes.forEach((j, i) => {
      texto += `│  ${i+1}. ${j}\n`
    })
  }

  texto += `│\n`
  texto += `╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n`
  texto += `*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`

  await conn.sendMessage(m.chat, { text: texto })
}

handlerLista.help = ['12vs12']
handlerLista.tags = ['freefire']
handlerLista.command = /^(12vs12)$/i
handlerLista.group = true

export default handlerLista
