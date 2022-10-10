const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const empty_url = () => {
  return new ButtonBuilder()
    .setCustomId(`empty_url`)
    .setLabel("Pas d'url")
    .setStyle(ButtonStyle.Danger);
};

const mpGameUrl = () => {
  return new ActionRowBuilder()
    .addComponents(empty_url());
};
module.exports = {
  mpGameUrl,
};
