const { Events, MessageFlags } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(msg) {
    if (msg.author.bot) return;
    await msg.reply({
      content: `echo ${msg.content}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
