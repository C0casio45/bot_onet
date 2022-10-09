const { OpenFaceitRepository } = require("../bot_modules/repository/faceit_repository.js");
const db = require("../utils/db/dbLibrary.js");
const Message = require("../utils/embeds/MessagesLibrary.js");
const { worker } = require("../commands/info.js");
const { stats } = require("../utils/buttons/info.js");

module.exports = {
    name: 'setPageInfo',
    description: "Méthode pour changer la page actuelle",
    async execute(interaction, _client) {

        const param = interaction.customId.split(" ");
        const pseudo = param[1];
        const pos = param[2];
        const array = await worker(pseudo);
        interaction.reply({
            embeds: [Message.accuseInfoListCarrousel(pseudo, array, pos)],
            components: stats(array.length, pseudo, pos),
            ephemeral: true,
        });
    }
}
