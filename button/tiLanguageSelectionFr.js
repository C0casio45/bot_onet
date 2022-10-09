const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: "fr",
    description: "Méthode pour créer un ban permnant",
    execute: function (interaction, client) {

        const idModo = interaction.customId.split(" ")[1];

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`done`)
                .setLabel("Français")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🇫🇷")
                .setDisabled(true)
        );


        interaction.update({ embeds: [Message.takeTicket(idModo, "fr")], components: [row] });
    },
};