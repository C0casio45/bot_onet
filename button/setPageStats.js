const { CommandInteractionOptionResolver } = require("discord.js");
const { worker } = require("../commands/stats.js");
const { stats } = require("../utils/buttons/stats.js");
const MessageLibrary = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: 'setPageStats',
    description: "Méthode changer la page actuelle",
    execute: async function (interaction) {

        const param = interaction.customId.split(" ");
        const pos = parseInt(param[1]);

        const rst = await worker();

        return interaction.update({ embeds: [MessageLibrary.statsModerateurList(rst[pos])], components: stats(rst.length, pos) });

    }
}