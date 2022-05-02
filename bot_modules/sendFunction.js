const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const con = require("../commands/dbconnect.js");
const db = con.database();
const faceit = require("./faceit.js");
const result_success = require("../commands/utils/embeds/result_success");
const result_error = require("../commands/utils/embeds/result_error");

module.exports = {
  send: function (interaction, client) {
    db.connect(function (err) {
      if (err) throw err;
      db.query(`call bot_onet.rappel_unban();`, function (error, result) {
        if (error) throw error;
        let embedsArr = [];
        let months = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];

        if (interaction == "none") {
          result[0].forEach((unban) => {
            var a = new Date(unban.timecode * 1000);

            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();

            let Fdate = date + " " + month + " " + year;

            const unbanChannel = client.channels.cache.find(
              (channel) => channel.name == "rappel-unban"
            );

            faceit.RemoveBan(
              `https://www.faceit.com/fr/players/${unban.Pseudo}`,
              (failed, error = null) => {
                if (failed)
                  unbanChannel.send({
                    embeds: [result_error(`${error}`)],
                  });
                else
                  unbanChannel.send({
                    embeds: [
                      result_success(
                        `Joueur ${unban.Pseudo} unban avec succès.`
                      ),
                    ],
                  });
              }
            );

            if (!db._connectCalled) {
              db.connect();
            }
            db.query(
              `call bot_onet.unban(${unban.id},${unban.idT});`,
              function (errdb, result) {
                if (errdb) throw errdb;
              }
            );

            unbanChannel.send({
              embeds: [sendEmbed(unban.Pseudo, unban.duree, Fdate)],
            });
          });
        } else if (result[0].length == 0) {
          return interaction.reply(
            "Il n'y a pas d'unban a effectuer aujourd'hui"
          );
        } else {
          result[0].forEach((unban) => {
            var a = new Date(unban.timecode * 1000);

            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();

            let Fdate = date + " " + month + " " + year;

            embedsArr.push(sendEmbed(unban.Pseudo, unban.duree, Fdate));
          });

          return interaction.reply({ embeds: embedsArr });
        }
      });
    });
  },
};

function sendEmbed(pseudo, duree, date) {
  return new MessageEmbed()
    .setColor("#e34c3b")
    .setAuthor({ name: "Rappel unban" })
    .setDescription(
      `Le joueur **${pseudo}** a été banni pour une durée de **${duree} jours** le ${date}.
        Il a été débanni a ce jour.`
    )
    .addField(
      "Lien vers le pannel faceit de banissement",
      "https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/tickets",
      false
    )
    .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
    .setTimestamp();
}
