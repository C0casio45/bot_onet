const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "mp_loop_button_close",
  description: "",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "n" });

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
