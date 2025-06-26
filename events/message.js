const { Events, MessageFlags } = require('discord.js');
const { botModel } = require('../script');

module.exports = {
  name: Events.MessageCreate,
  async execute(msg) {
    if (msg.author.bot) return;
    if (!msg.mentions.has(msg.client.user)) return;
    await msg.reply({
      content: await botModel(msg.author.username, msg.content),
      flags: MessageFlags.Ephemeral,
    });
  },
};
