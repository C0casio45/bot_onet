const { MessageActionRow, MessageButton } = require("discord.js");

const button_continue = () => {
  return new MessageButton()
    .setCustomId(`mp_loop_button_continue`)
    .setLabel("Ajouter")
    .setStyle("SUCCESS");
};

const button_close = () => {
  return new MessageButton()
    .setCustomId(`mp_loop_button_close`)
    .setLabel("Fermer")
    .setStyle("DANGER");
};

const mpLoop = () => {
  return new MessageActionRow()
    .addComponents(button_continue())
    .addComponents(button_close());
};
module.exports = {
  mpLoop,
};
