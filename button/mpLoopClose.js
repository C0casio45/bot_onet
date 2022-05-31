const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "mp_loop_button_close",
  description: "",
  execute: function (interaction, _client) {
    interaction.channel.send({ content: "Demande de fermeture du ticket..." });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("done")
        .setLabel(`Fermer`)
        .setStyle("DANGER")
        .setDisabled("true")
    );

    interaction.update({ components: [row] });
  },
};
