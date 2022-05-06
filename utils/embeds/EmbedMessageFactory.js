const { MessageEmbed } = require('discord.js');

class Message {
  constructor(content, author = "Utilitaire de banissement", color = "#e34c3b") {
    this.description = content;
    this.author = author;
    this.color = color;
  }

  error(code) {
    switch (code) {
      case 1:
        this.author = `Vous avez mis trop de temps a répondre, merci de recommencer la démarche en écrivant /ban [ticket]`;
        break;
      case 2:
        this.author = `Merci de relancer une demande d'unban en indiquant un numéro la prochaine fois`;
        break;

      default:
        this.author = `Erreur inconnue`;
        break;
    }
    this.setColor("#F58B00");
  }

  success() {
    this.setColor("#00ff00");
  }

  newban() {
    this.setAuthor("Nouvelle entrée de banissement");
  }

  rappelUnban() {
    this.setAuthor("Rappel de débannissement");
  }

  banLog(nbEntreeBan, array, userid, unban) {
    let description = "";

    if (nbEntreeBan == 1) {
      if (array[0][1] == 99999) {
        description = `Le joueur **${array[0][0]}** a été banni de **manière permanante** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
      } else if (array[0][1] == 0) {
        description = `Le joueur **${array[0][0]}** a reçu un **avertissement** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
      } else {
        description = `Le joueur **${array[0][0]}** a été banni par <@${userid}> pour une durée de **${array[0][1]} jours** pour la raison suivante : ${array[0][2]}.\nUn rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
      }
    } else {
      description = `Les joueur suivants ont été modéré par <@${userid}> :\n`;
      array.forEach((ban) => {
        if (ban[1] == 0) {
          description += `- L'utilisateur ${ban[0]} a reçu un avertissement pour la raison suivante : ${ban[2]}\n`;
        } else if (ban[1] == 99999) {
          description += `- L'utilisateur ${ban[0]} a été banni de manière permanante pour la raison suivante : ${ban[2]}\n`;
        } else {
          description += `- L'utilisateur ${ban[0]} a été banni pendant ${ban[1]} jours pour la raison suivante : ${ban[2]}\n`;
        }
      });
      description += `Un rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
    }

    this.newban();
    this.author = description;
  }

  setColor(color) {
    this.color = color;
  }

  setAuthor(author) {
    this.author = author;
  }

  setDescription(description) {
    this.description = description;
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
module.exports = Message;