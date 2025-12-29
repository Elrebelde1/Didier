
const handler = async (msg, { conn, text}) => {
  const chatID = msg.key.remoteJid;
  await conn.sendPresenceUpdate("composing", chatID);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  await conn.sendPresenceUpdate("paused", chatID);

  if (!text) {
    return conn.sendMessage(chatID, {
      text: `📌 *Uso correcto:*\n\n.wa <número>\n\n📍 *Ejemplo:*.wa 5212345678901`,
}, { quoted: msg});
}

  const number = text.replace(/\D/g, '');
  if (number.length < 8) {
    return conn.sendMessage(chatID, {
      text: `❌ *Número inválido.* Debe contener al menos 8 dígitos.`,
}, { quoted: msg});
}

  await conn.sendMessage(chatID, {
    react: { text: "🔍", key: msg.key},
});

  try {
    const [result] = await conn.onWhatsApp(number + '@s.whatsapp.net');
    const estado = result?.exists
? '🟢 *En soporte*'
: '🔴 *Sin soporte*';

    const mensaje = `╭───⭑ *WHATSAPP CHECK* ⭑───╮\n│\n│  📞 *Número:* ${number}\n│  📡 *Estado:* ${estado}\n│\n╰────────────────────╯`;

    await conn.sendMessage(chatID, { text: mensaje}, { quoted: msg});
    await conn.sendMessage(chatID, {
      react: { text: "✅", key: msg.key},
});
} catch (error) {
    console.error("Error en.wa:", error);
    await conn.sendMessage(chatID, {
      text: `⚠️ *Error verificando el número.* Intenta nuevamente más tarde.`,
}, { quoted: msg});
    await conn.sendMessage(chatID, {
      react: { text: "❌", key: msg.key},
});
}
};

handler.command = ["wa"];
export default handler;