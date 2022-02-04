const { MessageEmbed } = require("discord.js");

module.exports = function request_userlink() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor("Utilitaire de banissement")
    .setDescription(
      `Merci de mettre le lien faceit de **l'utilisateur a bannir**.`
    )
    .setFooter("Créé et hébergé par COcasio45#2406")
    .setTimestamp();
};
