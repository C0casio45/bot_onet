const { MessageEmbed } = require("discord.js");
const { folder } = require("../config.json");
const con = require("./dbconnect.js");
const db = con.database();
const dp = require(`${folder}bot_modules/deploy.js`);

const { mp_sanction_buttons } = require("./utils/buttons/mp_sanction_buttons");
const { mp_loop_buttons } = require("./utils/buttons/mp_loop_buttons");
const { send_ban } = require("./utils/embeds/send_ban.js");

const request_mp = require("./utils/embeds/request_mp");
const request_gameLink = require("./utils/embeds/request_gameLink");
const request_userdays = require("./utils/embeds/request_userdays");
const request_raison = require("./utils/embeds/request_raison");
const request_other = require("./utils/embeds/request_other");
const request_userlink = require("./utils/embeds/request_userlink");
const error = require("./utils/embeds/error");

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

    interaction.reply({ embeds: [request_mp()], ephemeral: true });

    const filter = (m) => [user.id, client.user.id].includes(m.author.id);

    user.send({ embeds: [request_gameLink()] }).then(async (tmsg) => {
      tmsg.channel
        .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
        .then((collected) => {
          quiz(0, collected.first().content);
        })
        .catch((err) => {
          console.log(err);
          tmsg.channel.send({ embeds: [error()] });
        });
    });

    return;

    function quiz(i, liengame) {
      array.push([]);
      user.send({ embeds: [request_userlink()] }).then(async (msg) => {
        msg.channel
          .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
          .then((collected) => {
            let link = collected.first().content.split("/");
            let pseudo = link[link.length - 1];
            array[i][0] = pseudo;
            getDays(i, array, liengame, msg, pseudo);
          })
          .catch((err) => {
            console.log(err);
            msg.channel.send({ embeds: [error(1)] });
          });
      });
    }

    function getDays(i, array, liengame, msg, pseudo) {
      msg.channel
        .send({
          embeds: [request_userdays(pseudo)],
          components: [mp_sanction_buttons()],
        })
        .then(async (rmsg) => {
          rmsg.channel
            .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
            .then((collected) => {
              let jours = collected.first().content;
              let days = parseInt(jours);
              if (
                isNaN(days) &&
                jours != "Avertissement" &&
                jours != "Banissement permanant"
              ) {
                getDays(i, array, liengame, rmsg, pseudo);
              } else {
                days =
                  jours == "Avertissement"
                    ? 0
                    : jours == "Banissement permanant"
                    ? 99999
                    : days;
                array[i][1] = days;
                if (array[i][1] > 99999) array[i][1] = 99999;
                getReason(i, array, liengame, rmsg, pseudo);
              }
            })
            .catch((err) => {
              console.log(err);
              rmsg.channel.send({ embeds: [error(1)] });
            });
        });
    }

    function getReason(i, array, liengame, msg, pseudo) {
      msg.channel
        .send({ embeds: [request_raison(pseudo)] })
        .then(async (rmsg) => {
          rmsg.channel
            .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
            .then((collected) => {
              let raison = collected.first().content;
              array[i][2] = raison;
              isLoop(i, array, liengame, rmsg, pseudo);
            })
            .catch((err) => {
              console.log(err);
              rmsg.channel.send({ embeds: [error(1)] });
            });
        });
    }

    function isLoop(i, array, liengame, msg, pseudo) {
      msg.channel
        .send({
          embeds: [request_other(array.length, array)],
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
                if (!db._connectCalled) {
                  db.connect();
                }

                array.forEach((row) => {
                  // id_Ticket, pseudo_accusé, Lien_Accusé, Lien_Partie, Duree_jours, raison, Fermé?
                  db.query(
                    `call bot_onet.close_ticket(${options}, '${row[0]}', 'https://www.faceit.com/fr/players/${row[0]}', '${liengame}', ${row[1]}, '${row[2]}', TRUE);`,
                    function (err, result) {
                      console.log(err);
                      if (err) throw err;
                    }
                  );
                });

                //rmsg.channel.send({embeds : [send_ban(array.length,array)]});
                ban.send({ embeds: [send_ban(array.length, array, userid)] });
                dp.dply(client, "0", interaction.guildId);

                return;
              }
            })
            .catch((err) => {
              console.log(err);
              rmsg.channel.send({ embeds: [error(1)] });
            });
        });
    }
  },
};
