const { MessageEmbed } = require("discord.js");

module.exports = function request_other(nbEntreeBan, array) {
  let list = "";
  array.forEach((ban) => {
    list += `- Utilisateur ${ban[0]} ${
      ban[1] == 0
        ? "averti"
        : ban[1] == 99999
        ? "ban permanant"
        : "banni pendant " + ban[1] + " jours"
    }\n`;
  });
  const embed = new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor("Utilitaire de banissement")
    .setDescription(
      `Vous avez actuellement ${nbEntreeBan} enregistrés :\n${list}\n\nVoulez vous ajouter une sanction à un autre utilisateur ?`
    )
    .setFooter("Créé et hébergé par COcasio45#2406")
    .setTimestamp();
  return embed;
};
