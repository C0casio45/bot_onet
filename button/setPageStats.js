const { MessageEmbed } = require('discord.js');
const { worker } = require("../commands/stats.js");
module.exports = {
    name: 'setPageStats',
    description: "Méthode changer la page actuelle",
    execute: function (interaction) {

        let param = interaction.customId.split(" ");

        const rst = worker();

        const embed = new MessageEmbed()
            .setColor('#e34c3b')
            .setTitle('Statistiques des modérateurs')
            .addFields(rst[param[1]])
            .setFooter({ text: 'Créé et hébergé par COcasio45#2406' })
            .setTimestamp();

        return interaction.update({ embeds: [embed], components: btnStats(rst.length, param[1]) });

    }
}