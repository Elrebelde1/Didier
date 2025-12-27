
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { conn}) => {
  try {
    let q = m.quoted? m.quoted: m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) return m.reply(`📸 Responde a una imagen con el comando *${prefix}hd* para mejorarla.`);
    if (!mime.startsWith('image')) return m.reply(`⚠️ Solo se admiten imágenes.`);

    await conn.sendMessage(m.chat, {
      react: { text: "🔄", key: m.key}
});

    const media = await q.download();
    const tmp = `/tmp/${Date.now()}.jpg`;
    fs.writeFileSync(tmp, media);

    const form = new FormData();
    form.append('style', 'art'); // o 'photo'
    form.append('noise', '3');
    form.append('scale', '2');
    form.append('image', fs.createReadStream(tmp));

    const res = await axios.post('https://bigjpg.com/api/task/submit', form, {
      headers: {
...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
}
});

    const taskId = res.data?.id;
    if (!taskId) throw 'No se pudo obtener el ID de tarea.';

    await new Promise(r => setTimeout(r, 10000)); // espera 10 segundos

    const result = await axios.get(`https://bigjpg.com/api/task/${taskId}`, {
      headers: { 'User-Agent': 'Mozilla/5.0'}
});

    const output = result.data?.output_url;
    if (!output) throw 'No se pudo obtener la imagen mejorada.';

    fs.unlinkSync(tmp);

    const caption = `✨ *Imagen mejorada con éxito*\n🆔 Task ID: ${taskId}\n📈 Escala: 2x\n🎨 Estilo: Arte`;

    await conn.sendMessage(m.chat, {
      image: { url: output},
      caption
}, { quoted: m});

    await conn.sendMessage(m.chat, {
      react: { text: "✅", key: m.key}
});

} catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, {
      react: { text: "❌", key: m.key}
});
    await m.reply("⚠️ Ocurrió un error al mejorar la imagen.");
}
};

handler.help = ['hd'];
handler.tags = ['ai', 'imagen'];
handler.command = ['hd', 'upscale', 'enhance'];

export default handler;