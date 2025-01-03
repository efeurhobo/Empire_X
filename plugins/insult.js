const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
  pattern: 'insult',
  desc: 'Get a random insult',
  category: 'fun',
  react: '🤥',
}, async (conn, m) => {
  try {
    let response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    let data = response.data;

    if (!data || !data.insult) {
      return await conn.sendMessage(m.key.remoteJid, { text: 'Unable to retrieve an insult. Please try again later.' });
    }

    let insult = data.insult;
    await conn.sendMessage(m.key.remoteJid, { text: `*Insult:* ${insult}` });
  } catch (error) {
    await conn.sendMessage(m.key.remoteJid, { text: `Error: ${error.message || error}` });
  }
});