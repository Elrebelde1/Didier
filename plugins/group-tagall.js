import fetch from "node-fetch";

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const chat = global.db.data.chats[m.chat] || {};
  const emoji = chat.emojiTag || '👟';
  const customMessage = args.join(' ');
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupName = groupMetadata.subject;

  const countryFlags = {
    '1': '🇺🇸', '44': '🇬🇧', '33': '🇫🇷', '49': '🇩🇪', '34': '🇪🇸', '55': '🇧🇷', 
    '52': '🇲🇽', '54': '🇦🇷', '57': '🇨🇴', '51': '🇵🇪', '56': '🇨🇱', '58': '🇻🇪', 
    '502': '🇬🇹', '503': '🇸🇻', '504': '🇭🇳', '505': '🇳🇮', '506': '🇨🇷', '507': '🇵🇦', 
    '591': '🇧🇴', '593': '🇪🇨', '595': '🇵🇾', '598': '🇺🇾', '53': '🇨🇺'
  };

  const getCountryFlag = (id) => {
    const num = id.split('@')[0];
    if (num.startsWith('1')) return '🇺🇸';
    const p2 = num.substring(0, 2);
    const p3 = num.substring(0, 3);
    return countryFlags[p3] || countryFlags[p2] || '👤';
  };

  let messageText = `╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮\n`;
  messageText += `│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖨𝗇𝗏𝗈𝖼𝖺𝖼𝗂𝗈́𝗇*\n`;
  messageText += `│\n`;
  messageText += `│ 🛸 *𝖦𝗋𝗎𝗉𝗈:* ${groupName}\n`;
  messageText += `│ 👥 *𝖬𝗂𝖾𝗆𝖻𝗋𝗈𝗌:* ${participants.length}\n`;

  if (customMessage) {
    messageText += `│ 📢 *𝖬𝖾𝗇𝗌𝖺𝗃𝖾:* ${customMessage}\n`;
  }

  messageText += `│\n│  *ʟɪsᴛᴀ ᴅᴇ ᴍɪᴇᴍʙʀᴏs:*\n`;

  for (const mem of participants) {
    messageText += `│ ${emoji} ${getCountryFlag(mem.id)} @${mem.id.split('@')[0]}\n`;
  }

  messageText += `│\n╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n`;
  messageText += `*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`;

  // Nueva imagen proporcionada
  const imageUrl = 'https://files.catbox.moe/dcp02s.jpg';
  const thumb = await (await fetch(imageUrl)).buffer();

  const fkontak = {
    key: { 
      participants: "0@s.whatsapp.net", 
      remoteJid: "status@broadcast", 
      fromMe: false, 
      id: "VansTagall" 
    },
    message: {
      locationMessage: {
        name: "𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 👟",
        jpegThumbnail: thumb
      }
    }
  };

  await conn.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: messageText,
    mentions: participants.map(a => a.id)
  }, { quoted: fkontak });
};

handler.help = ['todos'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true; 
handler.group = true;

export default handler;
