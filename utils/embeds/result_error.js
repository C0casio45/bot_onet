const { MessageEmbed } = require("discord.js");

module.exports = function result_success(content) {
  return new MessageEmbed()
    .setColor("#F58B00")
    .setDescription(`${content}`)
    .setAuthor({ name: "[ERREUR] Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
