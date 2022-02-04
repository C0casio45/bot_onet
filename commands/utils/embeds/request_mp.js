const { MessageEmbed } = require("discord.js");

module.exports = function request_mp() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor("Banissement")
    .setDescription(`Merci d'aller voir vos messages privés`)
    .setFooter("Créé et hébergé par COcasio45#2406")
    .setTimestamp();
};
