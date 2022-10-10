const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "mp_loop_button_continue",
  description: "",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "Ajout d'un nouvel accusé" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("done")
        .setLabel(`Continuer`)
        .setStyle(ButtonStyle.Success)
        .setDisabled(true)
    );

    interaction.update({ components: [row] });
  },
};
