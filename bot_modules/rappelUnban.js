const faceit = require("./faceit.js");
const Message = require("../utils/embeds/MessagesLibrary");
const db = require("../utils/db/dbLibrary.js");

module.exports = {
  send: async function (interaction, client) {
    const rappelUnbanList = await db.getRappelUnbanList();
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
      rappelUnbanList.forEach((unban) => {
        var a = new Date(unban.timecode * 1000);

        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();

        let Fdate = date + " " + month + " " + year;

        const unbanChannel = client.channels.cache.find(
          (channel) => channel.name == "rappel-unban"
        );

        faceit.RemoveBan(
          unban.Pseudo,
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

        db.unbanUser(unban.id, unban.idT);

        unbanChannel.send({
          embeds: [Message.unbanLog(unban.Pseudo, unban.duree, Fdate)],
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

        embedsArr.push(Message.unbanLog(unban.Pseudo, unban.duree, Fdate));
      });

      return interaction.reply({ embeds: embedsArr });
    }
  },
};
