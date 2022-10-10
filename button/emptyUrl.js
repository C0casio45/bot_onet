const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "empty_url",
    description: "",
    execute: function (interaction, _client) {
        interaction.channel.send({ content: "Il n'y a pas de partie liée au banissement" });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("done")
                .setLabel(`Pas d'url`)
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true)
        );

        interaction.update({ components: [row] });
    },
};
