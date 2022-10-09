const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "perm",
  description: "Méthode pour créer un ban permnant",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "Banissement permanant" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("done")
        .setLabel(`Ban permanant`)
        .setStyle(ButtonStyle.Success)
        .setEmoji("🚨")
        .setDisabled(true)
    );

    interaction.update({ components: [row] });
  },
};
