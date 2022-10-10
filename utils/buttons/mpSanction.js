const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const button_avertissement = () => {
  return new ButtonBuilder()
    .setCustomId(`avertissement`)
    .setLabel("Avertissement")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("⚠️");
};

const button_perm = () => {
  return new ButtonBuilder()
    .setCustomId(`perm`)
    .setLabel("Ban permanant")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("🚨");
};

const mpSanction = () => {
  return new ActionRowBuilder()
    .addComponents(button_avertissement())
    .addComponents(button_perm());
};
module.exports = {
  mpSanction,
};
