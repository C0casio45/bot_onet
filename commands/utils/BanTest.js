const Message = require("../../utils/embeds/MessagesLibrary");

const db = require("../../utils/db/dbLibrary.js");
const dp = require(`../../bot_modules/deploy.js`);

const { mp_sanction_buttons } = require("../../utils/buttons/mp_sanction_buttons");
const { mp_loop_buttons } = require("../../utils/buttons/mp_loop_buttons");

class BanTest {

  array = [];
  user = null;
  ban = null;
  unban = null;
  options = null;
  filter = null;
  interaction = null;
  client = null;

  constructor(interaction, client, user) {
    this.interaction = interaction;
    this.client = client;
    this.user = user;
    this.ban = client.channels.cache.find((channel) => channel.name == "ban");
    this.unban = client.channels.cache.find((channel) => channel.name == "rappel-unban");
    this.options = interaction.options._hoistedOptions[0].value;
    this.filter = (m) => [user.id, client.user.id].includes(m.author.id)
    this.startQuizz(0, 'test')
  }

  startQuizz(id, urlGame) {
    this.array.push([])
    this.user
      .send({ embeds: [Message.requestUserLink()] })
      .then(async (privateMessage) => this.listenPlayer(id, urlGame, privateMessage));
  }

  listenPlayer(id, urlGame, privateMessage) {
    const filter = this.filter;
    privateMessage.channel
      .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
      .then(() => {
        this.array[id][0] = "Joueur Test";
        this.getBanTime(id, urlGame, privateMessage, "Joueur Test");
      })
  }

  getBanTime(id, urlGame, privateMessage, nickname) {
    privateMessage.channel
      .send({
        embeds: [Message.requestBanDuration(nickname)],
        components: [mp_sanction_buttons()],
      })
      .then(async (privateMessage) => {
        this.listenBanTime(id, urlGame, privateMessage, nickname);
      });
  }

  listenBanTime(id, urlGame, privateMessage, nickname) {
    const filter = this.filter;
    privateMessage.channel
      .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
      .then((collected) => {
        let jours = collected.first().content;
        if (
          !jours.match(/\d/) &&
          jours != "Avertissement" &&
          jours != "Banissement permanant"
        ) {
          collected.first().reply({ content: "Format de données invalide." });
          setTimeout(() => {
            this.getBanTime(id, urlGame, privateMessage, nickname);
          }, 300);
        } else {
          let days = parseInt(jours);
          const isAvertissement = jours == "Avertissement" ? 0 : days;
          days =
            jours == "Banissement permanant"
              ? 99999
              : isAvertissement;
          this.array[id][1] = days;
          if (this.array[id][1] > 99999) this.array[id][1] = 99999;
          this.getBanReason(id, urlGame, privateMessage, nickname);
        }
      })
      .catch((err) => {
        console.log(err);
        privateMessage.channel.send({ embeds: [Message.error(1)] });
      });
  }

  getBanReason(id, urlGame, privateMessage, nickname) {
    const filter = this.filter;
    privateMessage.channel
      .send({ embeds: [Message.requestRaison(nickname)] })
      .then(async (privateMessage) => {
        privateMessage.channel
          .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
          .then(() => {
            this.array[id][2] = "BanTest";
            this.isLoop(id, urlGame, privateMessage);
          })
          .catch((err) => {
            console.log(err);
            privateMessage.channel.send({ embeds: [Message.error(1)] });
          });
      });
  }

  isLoop(id, urlGame, privateMessage) {
    const filter = this.filter;
    privateMessage.channel
      .send({
        embeds: [Message.requestOtherBans(this.array.length, this.array)],
        components: [mp_loop_buttons()],
      })
      .then(async (privateMessage) => {
        privateMessage.channel
          .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
          .then((collected) => {
            let response = collected.first().content;
  
            if (
              response.toLowerCase() == "oui" ||
              response.toLowerCase() == "yes" ||
              response.toLowerCase() == "o" ||
              response.toLowerCase() == "y" ||
              response.toLowerCase() == "ajout d'un nouvel accusé"
            ) {
              this.startQuizz(id + 1);
            } else {
              this.closeTickets(privateMessage);
            }
          })
          .catch((err) => {
            console.log(err);
            privateMessage.channel.send({ embeds: [Message.error(1)] });
          });
      });
  }
  
  closeTickets(privateMessage) {
    db.closeTicket(this.options, "BanTest", "BanTest", 0, "BanTest");
    privateMessage.channel.send({
      embeds: [
        Message.success("Ticket fermé avec succès."),
      ],
    });
    this.ban.send({
      embeds: [Message.banLog(this.array.length, this.array, this.user.id, this.unban)],
    });
    dp.dply(this.client, "0", this.interaction.guildId);
  }
}

module.exports = {
  BanTest
}