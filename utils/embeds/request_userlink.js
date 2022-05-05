const { MessageEmbed } = require("discord.js");

module.exports = function request_userlink() {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setDescription(
      `Merci de mettre le lien faceit de **l'utilisateur a bannir**.`
    )
    .setAuthor({ name: "Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
