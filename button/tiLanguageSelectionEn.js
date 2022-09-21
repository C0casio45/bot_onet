const { MessageActionRow, MessageButton } = require("discord.js");
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: "en",
    description: "Méthode pour créer un ban permnant",
    execute: function (interaction, client) {

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`done`)
                .setLabel("English")
                .setStyle("PRIMARY")
                .setEmoji("🇬🇧")
                .setDisabled("true")
        );

        interaction.update({ embeds: [Message.takeTicket(interaction.user.id, "en")], components: [row] });
    },
};