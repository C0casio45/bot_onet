const db = require("../utils/db/dbLibrary.js");
const dp = require(`../bot_modules/deploy.js`);

const { mpSanction } = require("../utils/buttons/mpSanction");
const { mpLoop } = require("../utils/buttons/mpLoop");
const { mpGameUrl } = require("../utils/buttons/mpGameUrl.js");
const { OpenFaceitRepository, FaceitRepository } = require("../bot_modules/repository/faceit_repository");

const Message = require("../utils/embeds/MessagesLibrary");
const { setTimeout } = require("timers");
const monitor = require("../bot_modules/monitor.js");
const { delay } = require("../utils/functions.js");

class Ban {
  constructor(interaction, client, test) {
    this.client = client;
    this.unbanChannel = client.channels.cache.find(
      (channel) => channel.name == "rappel-unban"
    );
    this.banChannel = client.channels.cache.find((channel) => channel.name == "ban");
    this.ticket = interaction.options._hoistedOptions[0].value;
    this.user = interaction.user;
    this.userid = interaction.user.id;
    this.guildId = interaction.guildId;
    this.banList = [];
    this.test = test;
    //FACEIT ROOM EXEMPLE: https://www.faceit.com/fr/csgo/room/1-0def9859-57d0-4613-a578-eb3c6ec04176
    this.regexRoom = /https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/csgo\/room\/([a-zA-Z0-9-]*)/;
    // FACEIT PROFIL EXEMPLE : https://www.faceit.com/fr/players-modal/k-dev OR https://www.faceit.com/fr/players/k-dev
    this.regexPlayer = /(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players-modal\/([a-zA-Z0-9_-]*))|(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players\/([a-zA-Z0-9_-]*))/;

    interaction.reply({ embeds: [Message.requestMoveToMp()], ephemeral: true });
  }

  async Quizz() {

    let iteration = 0;
    let endTicket = true;
    let exit = false;

    let gameUrl = await this.request(Message.requestGameLink(), this.listenGameUrl.bind(this), [mpGameUrl()]).catch((e) => { exitCatcher(e,this.user) });

    while (endTicket) {
      this.player = await this.request(Message.requestUserLink(), this.listenPlayerUrl.bind(this)).catch((e) => { exitCatcher(e,this.user) });
      if(exit) break;
      let duration = await this.request(Message.requestBanDuration(this.player), this.listenBanTime.bind(this), [mpSanction()]).catch((e) => { exitCatcher(e,this.user); });
      if(exit) break;
      let reason = await this.request(Message.requestRaison(this.player), this.listenBanReason.bind(this)).catch((e) => { exitCatcher(e,this.user) });
      if(exit) break;
      this.banList[iteration] = { "gameUrl": gameUrl, "player": this.player, "duration": duration, "reason": reason };
      endTicket = await this.request(Message.requestOtherBans(iteration + 1, this.banList), this.listenEndTicket.bind(this), [mpLoop()]).catch((e) => { exitCatcher(e,this.user) });
      if(exit) break;
      iteration++;
    }
    if(!exit)this.closeTickets();

    function exitCatcher(e,user) {
      endTicket = false;
      exit = true;
      if (e.message == "exit") {
        user.send({ embeds: [Message.exit()] });
        return
      }
      user.send({ embeds: [Message.error()] });
      monitor.log(e.message);
      
    }
  }

  /**
   * 
   * @param {EmbedMessage} message Embed message to send
   * @param {function} listener function to listen
   * @param {ActionRowBuilder} btn Button row to send
   * @returns result of the listener
   */
  async request(message, listener, btn = null) {
    let msg = await this.user.send({ embeds: [message] });
    delay(1000).then(()=>{msg.edit({ embeds: [message], components: btn })});

    let collected = await msg.channel.awaitMessages({ filter: this.filter, max: 1, time: 300000, errors: ["time"] })
      .catch(async (_e) => {
        this.user.send({ embeds: [Message.error({ code: 1 })] });
        return this.request(message, listener, btn);
      });
    if (this.ticket == 0) {
      if (listener.name === "bound listenEndTicket") {
        return listener(collected.first());
      }
      return collected.first().content;
    } else {
      if(collected.first().content === "exit") throw new Error("exit");
      try {
        return listener(collected.first());
      } catch (e) {
        monitor.log(`${this.user.username} a eu un problème lors du quizz : ${e}`);
      }
    }
  }

  /**
   * 
   * @param {Object} message message collected
   * @param {Object} button button to display
   * @returns url of the game
   */
  async listenGameUrl(message) {
    let content = message.content;
    if (message.content === "Il n'y a pas de partie liée au banissement") return null;
    if (!message.content.match(this.regexRoom)) {
      message.reply({ content: "Format de données invalide." });
      await this.delay(300);
      content = await this.request(Message.requestGameLink(), this.listenGameUrl.bind(this),[mpGameUrl()]);
    }
    return content;
  }

  /**
   * 
   * @param {Object} message message collected
   * @returns player pseudo
   */
  async listenPlayerUrl(message) {
    let link = message.content;
    if (!message.content.match(this.regexPlayer)) {
      message.reply({ content: "Format de données invalide." });
      await this.delay(300);
      link = await this.request(Message.requestUserLink(), this.listenPlayerUrl.bind(this));
    }
    const linkArray = link.split("/");
    return linkArray[5] ?? link;
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
      await this.delay(300);
      jours = await this.request(Message.requestBanDuration(this.pseudo), this.listenBanTime.bind(this), [mpSanction()]);
    }
    let days = parseInt(jours);
    if (days > 99999) days = 99999;
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
    let reason = message.content;
    if (message.content.length > 100) {
      message.reply({ content: "Format de données invalide." });
      await this.delay(300);
      reason = await this.request(Message.requestRaison(), this.listenBanReason.bind(this));
    }
    return reason;
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
    if (this.test) return this.user.send({ embeds: [Message.banLog(this.banList.length, this.banList, this.userid, "test")] });
    //load data in database
    this.banList.forEach(async (ban) => {
      // id_Ticket, pseudo_accusé, Lien_Accusé, Lien_Partie, Duree_jours, raison, Fermé?

      if (!ban.duration == 0) {
        //ban player in faceit
        const FRepo = new FaceitRepository();
        const isBanned = await FRepo.banPlayerByNickname(ban.player, this.faceitMessageBuilder(ban.duration), ban.reason)
          .catch((error) => {
            console.log(error);
            this.user.send({
              embeds: [{ message: `${error}` }],
            });
            const index = this.banList.indexOf(ban);
            this.banList.splice(index, 1);

          });

        if (!isBanned) return;
      }

      const OFRepo = new OpenFaceitRepository();
      const player = await OFRepo.getUserDatas(ban.player);

      let ticketName = db.closeTicket(this.ticket, ban.player, player.player_id, ban.gameUrl, ban.duration, ban.reason);

      this.user.send({
        embeds: [
          Message.success(`${ban.player} a été banni avec succès.`),
        ],
      });

      if (this.banList[this.banList.length - 1] == ban) {
        //send message in private to user who banned the player
        //this.user.send({ embeds: [Message.banLog(array.length, array)] });
        //send message in discord channel
        this.banChannel.send({
          embeds: [Message.banLog(this.banList.length, this.banList, this.userid, this.unbanChannel, ticketName)],
        });
        //update discord cache
        dp.dply(this.client, "0", this.guildId);
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
      ". Plus d'informations sur notre discord.";
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
    ban.Quizz();
  },
};
