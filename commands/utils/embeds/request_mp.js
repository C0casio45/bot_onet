const { MessageEmbed } = require("discord.js");

module.exports = function request_mp() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setDescription(`Merci d'aller voir vos messages privés`)
    .setAuthor({ name: "Banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
