const { MessageEmbed } = require("discord.js");

module.exports = function request_gameLink() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor("Utilitaire de banissement")
    .setDescription(`Merci de mettre le lien faceit de **la partie**.`)
    .setFooter("Créé et hébergé par COcasio45#2406")
    .setTimestamp();
};
