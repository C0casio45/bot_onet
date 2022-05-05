const { MessageEmbed } = require("discord.js");

module.exports = function request_gameLink() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setDescription(`Merci de mettre le lien faceit de **la partie**.`)
    .setAuthor({ name: "Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
