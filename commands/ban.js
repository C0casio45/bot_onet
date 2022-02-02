const { MessageEmbed } = require("discord.js");
const { folder } = require("../config.json");
const con = require("./dbconnect.js");
const db = con.database();
const dp = require(`${folder}bot_modules/deploy.js`);
const faceit = require("../bot_modules/faceit.js");

const { mp_buttons } = require("./utils/buttons/mp_buttons");
const { mp_loop_buttons } = require("./utils/buttons/mp_loop_buttons");

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

    function request_mp() {
      return new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Banissement")
        .setDescription(`Merci d'aller voir vos messages privés`)
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
    }
    function send_ban(nbEntreeBan, array) {
      let list = "";
      if (nbEntreeBan == 1 && array[0][1] == 99999) {
        list = `Le joueur **${array[0][0]}** a été banni de **manière permanante** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
      } else if (nbEntreeBan == 1 && array[0][1] == 0) {
        list = `Le joueur **${array[0][0]}** a reçu un **avertissement** par <@${userid}> pour la raison suivante : ${array[0][2]}.`;
      } else if (nbEntreeBan == 1) {
        list = `Le joueur **${array[0][0]}** a été banni par <@${userid}> pour une durée de **${array[0][1]} jours** pour la raison suivante : ${array[0][2]}.\nUn rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
      } else {
        list = `Les joueur suivants ont été modéré par <@${userid}> :\n`;
        array.forEach((ban) => {
          if (ban[1] == 0) {
            list += `- L'utilisateur ${ban[0]} a reçu un avertissement pour la raison suivante : ${ban[2]}\n`;
          } else if (ban[1] == 99999) {
            list += `- L'utilisateur ${ban[0]} a été banni de manière permanante pour la raison suivante : ${ban[2]}\n`;
          } else {
            list += `- L'utilisateur ${ban[0]} a été banni pendant ${ban[1]} jours pour la raison suivante : ${ban[2]}\n`;
          }
        });
        list += `Un rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`;
      }
      const embed = new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Nouvelle entrée de banissement")
        .setDescription(list)
        .addField(
          "Lien vers le pannel faceit de banissement",
          "https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/bans/hub",
          false
        )
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();

      return embed;
    }
    function request_gameLink() {
      return new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Utilitaire de banissement")
        .setDescription(`Merci de mettre le lien faceit de **la partie**.`)
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
    }
    function request_userlink() {
      return new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Utilitaire de banissement")
        .setDescription(
          `Merci de mettre le lien faceit de **l'utilisateur a bannir**.`
        )
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
    }
    function request_userdays(pseudo) {
      return new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Utilitaire de banissement")
        .setDescription(
          `Merci d'indiquer le nombre de jours l'utilisateur ${pseudo} doit être banni`
        )
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
    }
    function request_raison(pseudo) {
      return new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Utilitaire de banissement")
        .setDescription(
          `Merci d'indiquer la raison du banissement de l'utilisateur : ${pseudo}`
        )
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
    }
    function request_other(nbEntreeBan, array) {
      let list = "";
      array.forEach((ban) => {
        list += `- Utilisateur ${ban[0]} banni pendant ${ban[1]} jours\n`;
      });
      const embed = new MessageEmbed()
        .setColor("#e34c3b")
        .setAuthor("Utilitaire de banissement")
        .setDescription(
          `Vous avez actuellement ${nbEntreeBan} enregistrés :\n${list}\nPour interragir avec le bot :\n-Pour ajouter un accusé : oui / yes / o / y \n-Pour finir l'enregistrement : n / non / no`
        )
        .setFooter("Créé et hébergé par COcasio45#2406")
        .setTimestamp();
      return embed;
    }
    function error(code) {
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
    }

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
          components: [mp_buttons()],
        })
        .then(async (rmsg) => {
          rmsg.channel
            .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
            .then((collected) => {
              let jours = collected.first().content;
              let days = parseInt(jours);
              if (isNaN(days)) {
                getDays(i, array, liengame, rmsg, pseudo);
              } else {
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
                choix.toLowerCase() == "y"
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
                      if (err) throw err;
                    }
                  );
                  faceit.BanPlayer(
                    rmsg,
                    `https://www.faceit.com/fr/players/${row[0]}`,
                    `${row[1]} ${options}`
                  );
                });

                //rmsg.channel.send({embeds : [send_ban(array.length,array)]});
                ban.send({ embeds: [send_ban(array.length, array)] });
                dp.dply(client, "0", interaction.guildId);

                return;
              }
            })
            .catch((err) => {
              console.log(err);
              tmsg.channel.send({ embeds: [error(1)] });
            });
        });
    }
  },
};
