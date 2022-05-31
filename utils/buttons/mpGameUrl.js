const { MessageActionRow, MessageButton } = require("discord.js");

const empty_url = () => {
  return new MessageButton()
    .setCustomId(`empty_url`)
    .setLabel("Pas d'url")
    .setStyle("DANGER");
};

const mpGameUrl = () => {
  return new MessageActionRow()
    .addComponents(empty_url());
};
module.exports = {
  mpGameUrl,
};
