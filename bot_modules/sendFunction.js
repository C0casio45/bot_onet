const con = require("../dbconnect.js");
const db = con.database();
const faceit = require("./faceit.js");
const Message = require("../utils/embeds/MessagesLibrary");

module.exports = {
  send: function (interaction, client) {
    if (!db._connectCalled) db.connect();
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
                  embeds: [Message.error(`${error}`)],
                });
              else
                unbanChannel.send({
                  embeds: [
                    Message.success(`Joueur ${unban.Pseudo} unban avec succès.`),
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
  },
};

function sendEmbed(pseudo, duree, date) {
  let content = `Le joueur **${pseudo}** a été banni pour une durée de **${duree} jours** le ${date}.
  Il a été débanni a ce jour.`
  return new Message(content, "Rappel unban").embed();
}
