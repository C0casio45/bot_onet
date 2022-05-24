const db = require("../utils/db/dbLibrary.js");
const dp = require(`../bot_modules/deploy.js`);

const { mpSanction } = require("../utils/buttons/mpSanction");
const { mpLoop } = require("../utils/buttons/mpLoop");
const faceit = require("../bot_modules/faceit.js");

const Message = require("../utils/embeds/MessagesLibrary");
const { setTimeout } = require("timers");

class Ban {
  constructor(interaction, client, test) {
    this.unban = client.channels.cache.find(
      (channel) => channel.name == "rappel-unban"
    );
    this.ban = client.channels.cache.find((channel) => channel.name == "ban");
    this.ticket = interaction.options._hoistedOptions[0].value;
    this.user = interaction.user;
    this.userid = user.id;
    this.banList = [];
    this.test = test;
    //FACEIT ROOM EXEMPLE: https://www.faceit.com/fr/csgo/room/1-0def9859-57d0-4613-a578-eb3c6ec04176
    this.regexRoom = /https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/csgo\/room\/([a-zA-Z0-9-]*)/;
    // FACEIT PROFIL EXEMPLE : https://www.faceit.com/fr/players-modal/k-dev OR https://www.faceit.com/fr/players/k-dev
    this.regexPlayer = /(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players-modal\/([a-zA-Z0-9_-]*))|(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players\/([a-zA-Z0-9_-]*))/;
  }

  async Quizz() {
    this.initTicket();

    let iteration = 0;
    let endTicket = false;


    while (!endTicket) {
      this.banList[iteration].gameUrl = await this.request(Message.requestGameLink(), listenGame);
      this.banList[iteration].player = await this.request(Message.requestUserLink(), listenPlayer);
      this.banList[iteration].duration = await this.requestBanTime(Message.requestBanDuration(), listenBanTime);
      this.banList[iteration].reason = await this.requestBanReason(Message.requestRaison(), listenBanReason);
      endTicket = await this.requestEndTicket(Message.requestEndTicket(), listenEndTicket);
      iteration++;
    }

    this.closeTickets()
  }

  async request(message, listener) {
    let msg = await user.send({ embeds: [message] })
    let collected = await msg.channel.awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
      .catch((e) => {
        console.log(e);
      });
    return listener(collected.first());
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns url of the game
   */
  async listenGameUrl(message) {
    if (!message.content.match(this.regexRoom)) {
      message.reply({ content: "Format de données invalide." });
      await delay(300);
      content = await request(Message.requestGameLink(), listenGameUrl);
    }
    return message.content;
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns player pseudo
   */
  async listenPlayerUrl(message) {
    if (!message.content.match(this.regexPlayer)) {
      message.reply({ content: "Format de données invalide." });
      await delay(300);
      content = await request(Message.requestUserLink(), listenPlayerUrl);
    }
    let link = message.split("/");
    return link[5];
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns ban time
   */
  async listenBanTime(message) {
    let jours = message.content;

    if (!jours.match(/\d/) &&
      jours != "Avertissement" &&
      jours != "Banissement permanant") {
      message.reply({ content: "Format de données invalide." });
      await delay(300);
      jours = await this.requestBanTime(Message.requestBanDuration(), listenBanTime);
    }
    let days = parseInt(jours);
    if (array[i][1] > 99999) array[i][1] = 99999;
    const isAvertissement = jours == "Avertissement" ? 0 : days;
    days =
      jours == "Banissement permanant"
        ? 99999
        : isAvertissement;
    return days;
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns ban reason
   */
  async listenBanReason(message) {
    if (message.content.length > 100) {
      message.reply({ content: "Format de données invalide." });
      await delay(300);
      content = await request(Message.requestRaison(), listenBanReason);
    }
    return message.content;
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns boolean
   */
  async listenEndTicket(message) {
    return message.content.toLowerCase() == "oui" ||
      message.content.toLowerCase() == "yes" ||
      message.content.toLowerCase() == "o" ||
      message.content.toLowerCase() == "y" ||
      message.content.toLowerCase() == "ajout d'un nouvel accusé";
  }

  async closeTickets() {
    if (this.test) return rmsg.channel.send({ embeds: [Message.banLog(array.length, array, userid, unban)] });
    //load data in database
    array.forEach((ban) => {
      // id_Ticket, pseudo_accusé, Lien_Accusé, Lien_Partie, Duree_jours, raison, Fermé?
      db.closeTicket(this.ticket, ban.player, ban.gameUrl, ban.duration, ban.reason);

      if (!ban.duration == 0) {
        //ban player in faceit
        faceit.BanPlayer(
          ban.player, faceitMessageBuilder(ban.duration),
          (failed, error = null) => {
            if (failed) {
              rmsg.channel.send({
                embeds: [Message.error(`${error}`)],
              });
            } else {
              rmsg.channel.send({
                embeds: [
                  Message.success("Ticket fermé avec succès."),
                ],
              });

              //send message in private to user who banned the player
              //rmsg.channel.send({embeds : [Message.banLog(array.length,array)]});
              //send message in discord channel
              ban.send({
                embeds: [Message.banLog(array.length, array, userid, unban)],
              });
              //update discord cache
              dp.dply(client, "0", interaction.guildId);
            }
          }
        );
      }
    });
  }

  /**
   * 
   * @param {number} jours number of days
   * @returns Faceit message
   */
  faceitMessageBuilder(jours) {
    return "Ban " +
      (jours == 99999 ? "perm" : jours + "j") +
      ". Plus d'informations sur notre discord."
  }

  /**
   * 
   * @param {number} t time delay in ms
   * @param {dynamic} val value to return
   * @returns val
   */
  delay(t, val) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(val);
      }, t);
    });
  }
}

module.exports = {
  name: "ban",
  description: "Méthode pour bannir les gens",
  async execute(interaction, client, test = false) {
    let ban = new Ban(interaction, client, test);
    ban.ban();
  },
};
