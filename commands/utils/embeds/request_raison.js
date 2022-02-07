const { MessageEmbed } = require("discord.js");

module.exports = function request_raison(pseudo) {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setDescription(
      `Merci d'indiquer la raison du banissement de l'utilisateur : ${pseudo}`
    )
    .setAuthor({ name: "Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};