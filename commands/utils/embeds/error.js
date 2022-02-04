const { MessageEmbed } = require("discord.js");

module.exports = function error(code) {
  let error_msg = "";
  switch (code) {
    case 1:
      error_msg = `Vous avez mis trop de temps a répondre, merci de recommencer la démarche en écrivant /ban [ticket]`;
      break;
    case 2:
      error_msg = `Merci de relancer une demande d'unban en indiquant un numéro la prochaine fois`;
      break;

    default:
      break;
  }
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor("Utilitaire de banissement")
    .setDescription(error_msg)
    .setFooter("Créé et hébergé par COcasio45#2406")
    .setTimestamp();
};
