const { MessageActionRow, MessageButton } = require('discord.js');
const { deprecate } = require('util');
const db = require("../utils/db/dbLibrary.js");

module.exports = {
    name: 'unban',
    description: "Méthode Enregistrer qu'un utilisateur a bien été débanni",
    execute: function (interaction) {
        /**
         * 
         * @deprecated
         */
        let ub = interaction.customId.split(" ");


        //unban(id accusé, id ticket)
        db.unbanUser(ub[1], ub[2])

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