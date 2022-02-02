const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "avertissement",
  description: "Méthode pour créer un avertissement",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "0" });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("done")
        .setLabel(`Avertissement`)
        .setStyle("SUCCESS")
        .setEmoji("🚨")
        .setDisabled("true")
    );

    interaction.update({ components: [row] });
  },
};
