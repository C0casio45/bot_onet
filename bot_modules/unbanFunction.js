const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const con = require("../commands/dbconnect")
const db = con.database();

module.exports = {
    unban: function (interaction, client) {

        let ub = interaction.customId.split(" ");

        db.connect(function (err) {
            if (err) throw err;
            db.query(`call bot_onet.unban(${ub[0]},${ub[1]});`, function (err, result) {
                if (err) throw err;

            });
        });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('done')
                    .setLabel(`Fait`)
                    .setStyle('SUCCESS')
                    .setDisabled('true'),
            );

        interaction.update({ components: [row] });


    }
}