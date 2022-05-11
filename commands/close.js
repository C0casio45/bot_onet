const db = require("../utils/db/dbLibrary.js");
const dp = require(`../bot_modules/deploy.js`);
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: 'close',
    description: "Méthode pour fermer les tickets",
    execute(interaction, client) {
        let ticketValue = interaction.options._hoistedOptions[0].value;
        console.log(interaction.options);

        db.closeTicketSimp(ticketValue).then((ticket) => {
            interaction.reply({ embeds: [Message.closeTicket(ticket[0][0].Nom)], ephemeral: true });
        });
        dp.dply(client, "0", interaction.guildId);
    }
}
