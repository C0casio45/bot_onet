const { OpenFaceitRepository } = require("../bot_modules/repository/faceit_repository.js");
const db = require("../utils/db/dbLibrary.js");
const Message = require("../utils/embeds/MessagesLibrary.js");
const { worker } = require("../commands/info.js");
const { info } = require("../utils/buttons/info.js");

module.exports = {
    name: 'showMoreInfo',
    description: "Méthode envoyer en privé la liste de toutes les infos sur un joueur",
    async execute(interaction, _client) {

        const param = interaction.customId.split(" ");
        const pseudo = param[1];
        const array = await worker(pseudo);
        const user = interaction.user;
        user.send({
            embeds: [Message.accuseInfoList(pseudo, array)],
        });
    }
}
