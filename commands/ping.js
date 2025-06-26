const { SlashCommandBuilder } = require('discord.js');

const getResponse = () => {
  return 'pong';
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('provides information about user'),
  async execute(interaction) {
    await interaction.reply(getResponse());
  },
};
