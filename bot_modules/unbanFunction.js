const { MessageActionRow, MessageButton } = require('discord.js');
const db = require("../utils/db/dbLibrary.js");

module.exports = {
    unban: function (interaction) {

        let ub = interaction.customId.split(" ");

        db.unbanUser(ub[0], ub[1])

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