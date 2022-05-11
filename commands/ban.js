const db = require("../utils/db/dbLibrary.js");
const dp = require(`../bot_modules/deploy.js`);

const { mp_sanction_buttons } = require("../utils/buttons/mp_sanction_buttons");
const { mp_loop_buttons } = require("../utils/buttons/mp_loop_buttons");
const faceit = require("../bot_modules/faceit.js");

const Message = require("../utils/embeds/MessagesLibrary");
const { setTimeout } = require("timers");

module.exports = {
  name: "ban",
  description: "Méthode pour bannir les gens",
  async execute(interaction, client) {
    let unban = client.channels.cache.find(
      (channel) => channel.name == "rappel-unban"
    );
    let ban = client.channels.cache.find((channel) => channel.name == "ban");
    let options = interaction.options._hoistedOptions[0].value;
    let user = interaction.user;
    let userid = user.id;
    let array = [];

    interaction.reply({ embeds: [Message.requestMoveToMp()], ephemeral: true });

    const filter = (m) => [user.id, client.user.id].includes(m.author.id);

    // FACEIT ROOM EXEMPLE
    // https://www.faceit.com/fr/csgo/room/1-0def9859-57d0-4613-a578-eb3c6ec04176
    const regexRoom = /https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/csgo\/room\/([a-zA-Z0-9-]*)/;

    // FACEIT PROFIL EXEMPLE
    // https://www.faceit.com/fr/players-modal/k-dev
    // OR
    // https://www.faceit.com/fr/players/k-dev
    const regexPlayer = /(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players-modal\/([a-zA-Z0-9_-]*))|(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players\/([a-zA-Z0-9_-]*))/;

    getGame();

    function getGame() {
      user
        .send({ embeds: [Message.requestGameLink()] })
        .then(async (tmsg) => listenGame(tmsg));
    }

    function listenGame(tmsg) {
      tmsg.channel
        .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
        .then((collected) => {
          if (collected.first().content.match(regexRoom))
            quiz(0, collected.first().content);
          else {
            collected.first().reply({ content: "Format de données invalide." });
            setTimeout(() => getGame(), 300);
          }
        })
        .catch((err) => {
          console.log(err);
          tmsg.channel.send({ embeds: [Message.error()] });
        });
    }

    return;

    function quiz(i, liengame) {
      array.push([]);
      user
        .send({ embeds: [Message.requestUserLink()] })
        .then(async (msg) => listenQuizz(i, liengame, msg));
    }

    function listenQuizz(i, liengame, msg) {
      msg.channel
        .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
        .then((collected) => {
          if (collected.first().content.match(regexPlayer)) {
            let link = collected.first().content.split("/");
            let pseudo = link[link.length - 1];
            array[i][0] = pseudo;
            getDays(i, liengame, msg, pseudo);
          } else {
            collected.first().reply({ content: "Format de données invalide." });
            setTimeout(() => quiz(i, liengame), 300);
          }
        })
        .catch((err) => {
          console.log(err);
          msg.channel.send({ embeds: [Message.error(1)] });
        });
    }

    function getDays(i, liengame, msg, pseudo) {
      msg.channel
        .send({
          embeds: [Message.requestBanDuration(pseudo)],
          components: [mp_sanction_buttons()],
        })
        .then(async (rmsg) => {
          listenDay(i, liengame, rmsg, pseudo);
        });
    }

    function listenDay(i, liengame, rmsg, pseudo) {
      rmsg.channel
        .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
        .then((collected) => {
          let jours = collected.first().content;
          if (!jours.match(/[0-9]/)) jours = "aa";
          let days = parseInt(jours);
          if (
            isNaN(days) &&
            jours != "Avertissement" &&
            jours != "Banissement permanant"
          ) {
            collected.first().reply({ content: "Format de données invalide." });
            setTimeout(() => {
              getDays(i, liengame, rmsg, pseudo);
            }, 300);
          } else {
            const isAvertissement = jours == "Avertissement" ? 0 : days;
            days =
              jours == "Banissement permanant"
                ? 99999
                : isAvertissement;
            array[i][1] = days;
            if (array[i][1] > 99999) array[i][1] = 99999;
            getReason(i, liengame, rmsg, pseudo);
          }
        })
        .catch((err) => {
          console.log(err);
          rmsg.channel.send({ embeds: [Message.error(1)] });
        });
    }

    function getReason(i, liengame, msg, pseudo) {
      msg.channel
        .send({ embeds: [Message.requestRaison(pseudo)] })
        .then(async (rmsg) => {
          rmsg.channel
            .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
            .then((collected) => {
              let raison = collected.first().content;
              array[i][2] = raison;
              isLoop(i, liengame, rmsg);
            })
            .catch((err) => {
              console.log(err);
              rmsg.channel.send({ embeds: [Message.error(1)] });
            });
        });
    }

    function isLoop(i, liengame, msg) {
      msg.channel
        .send({
          embeds: [Message.requestOtherBans(array.length, array)],
          components: [mp_loop_buttons()],
        })
        .then(async (rmsg) => {
          rmsg.channel
            .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
            .then((collected) => {
              let choix = collected.first().content;

              if (
                choix.toLowerCase() == "oui" ||
                choix.toLowerCase() == "yes" ||
                choix.toLowerCase() == "o" ||
                choix.toLowerCase() == "y" ||
                choix.toLowerCase() == "ajout d'un nouvel accusé"
              ) {
                quiz(i + 1);
              } else {
                closeTickets(liengame, rmsg);
              }
            })
            .catch((err) => {
              console.log(err);
              rmsg.channel.send({ embeds: [Message.error(1)] });
            });
        });
    }

    async function closeTickets(liengame, rmsg) {
      //load data in database
      array.forEach((row) => {
        // id_Ticket, pseudo_accusé, Lien_Accusé, Lien_Partie, Duree_jours, raison, Fermé?
        db.closeTicket(options, row[0], liengame, row[1], row[2]);

        if (!row[1] == 0) {
          //ban player in faceit
          faceit.BanPlayer(
            row[0],
            "Ban " +
            (row[1] == 99999 ? "perm" : row[1] + "j") +
            ". Plus d'informations sur notre discord.",
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
  },
};
