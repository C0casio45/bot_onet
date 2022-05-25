const db = require("../utils/db/dbLibrary.js");
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: 'info',
    description: "Méthode pour Obtenir des informations sur un accusé",
    async execute(interaction, _client) {

        const result = interaction.options._hoistedOptions[0].value
        let pseudo = "";
        if (interaction.options._hoistedOptions[0].name == "link") {

            // FACEIT PROFIL EXEMPLE https://www.faceit.com/fr/players-modal/k-dev OR https://www.faceit.com/fr/players/k-dev
            const regexPlayer = /(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players-modal\/([a-zA-Z0-9_-]*))|(https:\/\/www.faceit.com\/([a-zA-Z0-9-]{2})\/players\/([a-zA-Z0-9_-]*))/;
            if (!result.match(regexPlayer)) return interaction.reply({ embeds: [Message.error()] });
            const linkArray = result.split("/");
            pseudo = linkArray[5];
        } else {
            pseudo = result
        }
        const array = await db.getAccuseInfo(pseudo);
        interaction.reply({ embeds: [Message.accuseInfo(pseudo, array)], ephemeral: true });
    }
}
