const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const con = require("../commands/dbconnect.js");
const db = con.database();
const faceit = require("./faceit.js");

module.exports = {
    send: function (interaction, client) {



        db.connect(function (err) {
            if (err) throw err;
            db.query(`call bot_onet.rappel_unban();`, function (error, result) {
                if (error) throw error;
                let embedsArr = [];
                let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

                if (interaction == "none") {
                    result[0].forEach(unban => {
                        var a = new Date(unban.timecode * 1000);

                        let year = a.getFullYear();
                        let month = months[a.getMonth()];
                        let date = a.getDate();

                        let Fdate = date + ' ' + month + ' ' + year;

                        faceit.RemoveBan(`https://www.faceit.com/fr/players/${unban.Pseudo}`);

                        db.connect(function (errdb) {
                            if (errdb) throw errdb;
                            db.query(`call bot_onet.unban(${ub[0]},${ub[1]});`, function (err, result) {
                                if (err) throw err;

                            });
                        });

                        client.channels.cache.find(channel => channel.name == "rappel-unban")
                            .send({ content: `<@${unban.mod}>`, embeds: [sendEmbed(unban.Pseudo, unban.duree, Fdate)] });
                    });
                } else if (result[0].length == 0) {
                    return interaction.reply("Il n'y a pas d'unban a effectuer aujourd'hui");
                } else {
                    result[0].forEach(unban => {
                        var a = new Date(unban.timecode * 1000);

                        let year = a.getFullYear();
                        let month = months[a.getMonth()];
                        let date = a.getDate();

                        let Fdate = date + ' ' + month + ' ' + year;

                        embedsArr.push(sendEmbed(unban.Pseudo, unban.duree, Fdate));
                    });

                    return interaction.reply({ embeds: embedsArr });
                }
            });
        });

    }
}


function sendEmbed(pseudo, duree, date) {

    return new MessageEmbed()
        .setColor('#e34c3b')
        .setAuthor({ name: 'Rappel unban' })
        .setDescription(`Le joueur **${pseudo}** a été banni pour une durée de **${duree} jours** le ${date}.
        Il a été débanni a ce jour.`)
        .addField('Lien vers le pannel faceit de banissement', 'https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/tickets', false)
        .setFooter({ text: 'Créé et hébergé par COcasio45#2406' })
        .setTimestamp();

}