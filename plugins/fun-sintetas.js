
var handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎮';
  const emoji2 = '⚠️';

  if (!args[0]) {
    return conn.reply(m.chat, `${emoji2} Debes proporcionar un nombre de usuario de Roblox.\n\nEjemplo:\n*${usedPrefix}${command} idisnxbxb*`, m);
  }

  const username = args[0].trim();
  const apiUrl = `https://api.dorratz.com/v3/roblox?username=${encodeURIComponent(username)}`;

  try {
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (json.status !== 'success') {
      return conn.reply(m.chat, `${emoji2} No se pudo obtener información del usuario *${username}*. Verifica que el nombre sea correcto.`, m);
    }

    const { account, stats } = json.data;

    let info = `${emoji} *Información de Roblox:*\n`;
    info += `👤 *Usuario:* ${account.username}\n`;
    info += `📝 *Nombre para mostrar:* ${account.displayName}\n`;
    info += `📅 *Fecha de creación:* ${account.created}\n`;
    info += `📄 *Descripción:*\n${account.description || 'Sin descripción'}\n\n`;
    info += `👥 *Amigos:* ${stats.friendCount}\n`;
    info += `👣 *Seguidores:* ${stats.followers}\n`;
    info += `➡️ *Siguiendo:* ${stats.following}\n`;

    // Enviar imagen de perfil con la información
    await conn.sendFile(m.chat, account.profilePicture, 'perfil.jpg', info, m);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${emoji2} Ocurrió un error al consultar la API. Intenta nuevamente más tarde.`, m);
  }
};

handler.help = ['robloxinfo <usuario>'];
handler.tags = ['utilidad'];
handler.command = ['robloxinfo', 'roblox'];
handler.group = false;

export default handler;