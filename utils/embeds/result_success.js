const { MessageEmbed } = require("discord.js");

module.exports = function result_success(content) {
  return new MessageEmbed()
    .setColor("#0BDEA6")
    .setDescription(`${content}`)
    .setAuthor({ name: "Utilitaire de banissement" })
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
};
