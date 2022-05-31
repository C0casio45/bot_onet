const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "empty_url",
    description: "",
    execute: function (interaction, _client) {
        interaction.channel.send({ content: "Il n'y a pas de partie liée au banissement" });

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("done")
                .setLabel(`Pas d'url`)
                .setStyle("DANGER")
                .setDisabled("true")
        );

        interaction.update({ components: [row] });
    },
};
