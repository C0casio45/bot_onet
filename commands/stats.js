const { ActionRowBuilder, ButtonBuilder, MessageEmbed } = require('discord.js');
const db = require("../utils/db/dbLibrary.js");
const MessageLibrary = require("../utils/embeds/MessagesLibrary.js");
const { stats } = require("../utils/buttons/stats.js");

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
        const rst = await this.worker();
        return interaction.reply({ embeds: [MessageLibrary.statsModerateurList(rst[0])], components: stats(rst.length) });
    },
    async worker() {
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

        return rst;
    }
};