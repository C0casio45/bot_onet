const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const db = require("../utils/db/dbLibrary.js");

module.exports = {
    name: 'stats',
    description: "Méthode pour voir le nombre de tickets pris en charge par les différents modérateurs",
    options: [
        {
            "name": "user",
            "description": "Name of the moderator",
            "type": "USER",
            "required": false
        }
    ],
    async execute(interaction) {
        //TODO - stats for a specific user
        //let args = interaction.options._hoistedOptions;

        const stats = await db.getStats();

        let i = 0;
        let info = [];
        for (let mod in stats) {
            info.push({ "name": mod, "value": `${stats[mod]}`, "inline": false });
        }



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
            .addFields(rst[0])
            .setFooter({ text: 'Créé et hébergé par COcasio45#2406' })
            .setTimestamp();
        return interaction.reply({ embeds: [embed], components: btn(rst.length, rst) });
    }
}

function btn(number, rst) {
    let bt = new MessageActionRow()
    for (let i = 0; i < number; i++) {
        let datas = "";
        rst[i].forEach(mod => {
            datas += ` ${mod.name} ${mod.value}`
        })
        if (i == 0) {
            bt.addComponents(
                new MessageButton()
                    .setCustomId(`setpage ${i}`)
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