
import fetch from 'node-fetch'

let handler = async (m, { text, command}) => {
  const apikey = "sylphy-8238wss";

  if (!text ||!text.trim()) {
    return m.reply(`📌 Ejemplo:.${command} ¿Cuál es el significado de la vida?`);
}

  try {
    const prompt = `Responde en español: ${text.trim()}`;
    const url = `https://api.sylphy.xyz/ai/chatgpt?text=${encodeURIComponent(prompt)}&apikey=sylphy-8238wss`;
    const res = await fetch(url);
    const json = await res.json();

    if (!json.status ||!json.result) {
      return m.reply("❌ No se pudo obtener respuesta de la IA.");
}

    await m.reply(`🤖 *Respuesta IA (en español):*\n\n${json.result}`);
} catch (e) {
    console.error("Error en.ai:", e);
    m.reply("⚠️ Error al procesar la solicitud de IA.");
}
};

handler.help = ['ai <pregunta o mensaje>'];
handler.tags = ['ai'];
handler.command = ['ia2', 'chatgpt2'];

export default handler;