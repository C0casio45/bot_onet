const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { deprecate } = require('util');
const db = require("../utils/db/dbLibrary.js");

module.exports = {
    name: 'unban',
    description: "Méthode Enregistrer qu'un utilisateur a bien été débanni",
    /**
     * 
     * @deprecated
     */
    execute: function (interaction) {

        let ub = interaction.customId.split(" ");


        //unban(id accusé, id ticket)
        db.unbanUser(ub[1], ub[2])

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('done')
                    .setLabel(`Fait`)
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
            );

        interaction.update({ components: [row] });


    }
}