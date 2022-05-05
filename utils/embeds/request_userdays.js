const { MessageEmbed } = require("discord.js");

module.exports = function request_userdays(pseudo) {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setDescription(
      `Merci d'indiquer le nombre de jours l'utilisateur ${pseudo} doit être banni ou de cliquer sur un des boutons si il s'agit d'un avertissement/ban permanant.`
    )
    .setAuthor({ name: "Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
