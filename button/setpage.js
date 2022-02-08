const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const con = require("../commands/dbconnect")
const db = con.database();

module.exports = {
    name: 'setpage',
    description: "Méthode changer la page actuelle",
    execute: function (interaction, client) {

        let param = interaction.customId.split(" ");


        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call bot_onet.stats_all();`, function (err, result) {
            if (err) throw err;
            stats = {};
            result[0].forEach(ticket => {
                if (isNaN(stats[ticket.Pseudo])) stats[ticket.Pseudo] = 0;
                stats[ticket.Pseudo]++;
            });


            let i = 0;
            let info = [];
            for (let mod in stats) {
                info.push({ "name": mod, "value": `${stats[mod]}`, "inline": false });
            };



            info.sort(function (a, b) {
                return b.value - a.value;
            });

            let rst = [];
            let temp = [];

            info.forEach(row => {
                if (i == 5) {
                    rst.push(temp);
                    temp = [];
                    i = 0;
                }
                if (info[info.length - 1] == row) {
                    rst.push(temp);
                }
                temp.push(row);
                i++;
            });

            const embed = new MessageEmbed()
                .setColor('#e34c3b')
                .setTitle('Statistiques des modérateurs')
                .addFields(rst[param[1]])
                .setFooter({ text: 'Créé et hébergé par COcasio45#2406' })
                .setTimestamp();

            return interaction.update({ embeds: [embed], components: btn(rst.length, rst, param[1]) });
        });

    }
}

function btn(number, rst, pos) {
    let bt = new MessageActionRow()
    for (let i = 0; i < number; i++) {
        let datas = "";
        rst[i].forEach(mod => {
            datas += ` ${mod.name} ${mod.value}`
        })
        if (i == pos) {
            bt.addComponents(
                new MessageButton()
                    .setCustomId(`setpage`)
                    .setLabel(`${i}`)
                    .setStyle('PRIMARY')
                    .setDisabled(true),
            );
        } else {
            bt.addComponents(
                new MessageButton()
                    .setCustomId(`setpage ${i}`)
                    .setLabel(`${i}`)
                    .setStyle('PRIMARY'),
            );
        }
    }
    return [bt];
}