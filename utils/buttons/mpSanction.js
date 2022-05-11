const { MessageActionRow, MessageButton } = require("discord.js");

const button_avertissement = () => {
  return new MessageButton()
    .setCustomId(`avertissement`)
    .setLabel("Avertissement")
    .setStyle("SECONDARY")
    .setEmoji("⚠️");
};

const button_perm = () => {
  return new MessageButton()
    .setCustomId(`perm`)
    .setLabel("Ban permanant")
    .setStyle("DANGER")
    .setEmoji("🚨");
};

const mpSanction = () => {
  return new MessageActionRow()
    .addComponents(button_avertissement())
    .addComponents(button_perm());
};
module.exports = {
  mpSanction,
};
