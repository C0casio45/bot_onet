const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "mp_loop_button_close",
  description: "",
  execute: function (interaction, _client) {
    interaction.channel.send({ content: "Demande de fermeture du ticket..." });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("done")
        .setLabel(`Fermer`)
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
    );

    interaction.update({ components: [row] });
  },
};
