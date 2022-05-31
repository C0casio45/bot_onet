const { MessageEmbed, PartialWebhookMixin } = require('discord.js');

class MessageFactory {

  /**
 * @param content {string}
 * @param author {string}
 * @param color {string} - hexadecimal, default #e34c3b
 */
  constructor(content = "", author = "Utilitaire de banissement", color = "#e34c3b") {
    this.description = content;
    this.author = author;
    this.color = color;
  }

  /**
   * @param code {number} - 0 = unknown, 1 = too late, 2 = try again
   * @param message {string} - custom error message
   */
  error(code, message) {
    this.setColor("#E0322B");
    if (message != "") {
      this.setDescription(message);
    } else {
      switch (code) {
        case 1:
          this.setDescription(`Vous avez mis trop de temps a répondre, merci de recommencer la démarche en écrivant /ban [ticket]`);
          break;
        case 2:
          this.setDescription(`Merci de relancer une demande d'unban en indiquant un numéro la prochaine fois`);
          break;

        default:
          this.setDescription(`Erreur inconnue`);
          break;
      }
    }

    return this;
  }

  success() {
    this.setColor("#34EBA1");
    return this;
  }

  newBan() {
    this.setAuthor("Nouvelle entrée de banissement");
    return this;
  }

  rappelUnban() {
    this.setAuthor("Rappel de débannissement");
    return this;
  }

  /**
  * @param nbEntreeBan {number}
  * @param array {array}
  * @param userid {string} - discord user id
  * @param unban {string} - unban channel id
  */
  banLog(nbEntreeBan, array, userid, unban, ticketName) {
    let description = "";

    if (ticketName != null)`Suite au ticket ${ticketName} :\n`;

    if (nbEntreeBan == 1) {
      if (array[0].duration == 99999) {
        description = `Le joueur **${array[0].player}** a été banni de **manière permanante** par <@${userid}> pour la raison suivante : ${array[0].reason}.`;
      } else if (array[0].duration == 0) {
        description = `Le joueur **${array[0].player}** a reçu un **avertissement** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
      } else {
        description = `Le joueur **${array[0].player}** a été banni par <@${userid}> pour une durée de **${array[0].duration} jours** pour la raison suivante : ${array[0].reason}.\nUn rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
      }
    } else {
      description = `Les joueur suivants ont été modéré par <@${userid}> :\n`;
      array.forEach((ban) => {
        if (ban[1] == 0) {
          description += `- L'utilisateur ${ban.player} a reçu un avertissement pour la raison suivante : ${ban.reason}\n`;
        } else if (ban[1] == 99999) {
          description += `- L'utilisateur ${ban.player} a été banni de manière permanante pour la raison suivante : ${ban.reason}\n`;
        } else {
          description += `- L'utilisateur ${ban.player} a été banni pendant ${ban.duration} jours pour la raison suivante : ${ban.reason}\n`;
        }
      });
      description += `Un rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
    }

    this.newBan();
    this.setDescription(description);
    return this;
  }

  /**
   * @param color {string} - hexadecimal, default #e34c3b
   */
  setColor(color) {
    this.color = color;
    return this;
  }

  /**
   * @param author {string}
   */
  setAuthor(author) {
    this.author = author;
    return this;
  }

  /**
   * @param description {string}
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  get embed() {
    return new MessageEmbed()
      .setColor(this.color)
      .setAuthor({ name: this.author })
      .setDescription(this.description)
      .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
      .setTimestamp();
  }

  get raw() {
    return this.author + ":\n" + this.description;
  }

}
module.exports = MessageFactory;