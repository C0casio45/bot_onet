const { MessageActionRow, MessageButton } = require('discord.js');
const con = require("../commands/dbconnect")
const db = con.database();

module.exports = {
    unban: function (interaction) {

        let ub = interaction.customId.split(" ");

        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call bot_onet.unban(${ub[0]},${ub[1]});`, function (err) {
            if (err) throw error;

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