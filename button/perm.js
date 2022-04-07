const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "perm",
  description: "Méthode pour créer un ban permnant",
  execute: function (interaction, client) {
    interaction.channel.send({ content: "BOT Banissement permanant" });

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("done")
        .setLabel(`Ban permanant`)
        .setStyle("SUCCESS")
        .setEmoji("🚨")
        .setDisabled("true")
    );

    interaction.update({ components: [row] });
  },
};
