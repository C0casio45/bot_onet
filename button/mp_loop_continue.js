const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "mp_loop_button_continue",
  description: "",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "o" });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("done")
        .setLabel(`Continuer`)
        .setStyle("SUCCESS")
        .setDisabled("true")
    );

    interaction.update({ components: [row] });
  },
};
