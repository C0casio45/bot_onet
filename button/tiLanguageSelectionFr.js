const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "fr",
    description: "Méthode pour créer un ban permnant",
    execute: function (interaction, client) {
        interaction.channel.send({ content: "Banissement permanant" });

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`done`)
                .setLabel("Français")
                .setStyle("PRIMARY")
                .setEmoji("🇫🇷")
                .setDisabled("true")
        );


        interaction.update({ content: [Message.takeTicket(interaction.user.id,"fr")], components: [row] });
    },
};