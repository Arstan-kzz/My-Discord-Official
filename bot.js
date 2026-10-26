
import 'dotenv/config';
import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js';

import { startAssistant } from './call.js';

const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  throw new Error(
    'DISCORD_TOKEN belum diatur. Periksa file .env.'
  );
}

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

bot.once(Events.ClientReady, async (client) => {
  console.log('================================');
  console.log('       MY DISCORD OFFICIAL');
  console.log('================================');
  console.log('Status   : AKTIF');
  console.log(`Bot      : ${client.user.tag}`);
  console.log(`Bot ID   : ${client.user.id}`);
  console.log(`Servers  : ${client.guilds.cache.size}`);
  console.log('================================');

  try {
    await startAssistant(client);
  } catch (error) {
    console.error(
      '[ASISTEN] Gagal diinisialisasi:',
      error
    );
  }
});

bot.on(Events.Error, (error) => {
  console.error('[DISCORD] Client error:', error);
});

try {
  await bot.login(TOKEN);
} catch (error) {
  console.error('[LOGIN] Bot gagal login:', error);
  process.exitCode = 1;
}
