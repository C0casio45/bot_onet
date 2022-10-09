const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const button_continue = () => {
  return new ButtonBuilder()
    .setCustomId(`mp_loop_button_continue`)
    .setLabel("Ajouter")
    .setStyle(ButtonStyle.Success);
};

const button_close = () => {
  return new ButtonBuilder()
    .setCustomId(`mp_loop_button_close`)
    .setLabel("Fermer")
    .setStyle(ButtonStyle.Danger);
};

const mpLoop = () => {
  return new ActionRowBuilder()
    .addComponents(button_continue())
    .addComponents(button_close());
};
module.exports = {
  mpLoop,
};
