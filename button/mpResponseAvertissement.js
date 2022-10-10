const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "avertissement",
  description: "Méthode pour créer un avertissement",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "Avertissement" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("done")
        .setLabel(`Avertissement`)
        .setStyle(ButtonStyle.Success)
        .setEmoji("⚠️")
        .setDisabled(true)
    );

    interaction.update({ components: [row] });
  },
};
