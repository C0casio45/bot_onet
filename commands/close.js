const con = require("./dbconnect.js");
const db = con.database();
const dp = require(`../bot_modules/deploy.js`);
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: 'close',
    description: "Méthode pour fermer les tickets",
    execute(interaction, client) {
        let ticketValue = interaction.options._hoistedOptions[0].value;

        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call close_ticket_simp('${ticketValue}');`, function (err, result) {
            if (err) throw err;
            result[0].forEach(ticket => {
                interaction.reply({ embeds: [Message.closeTicket(ticket.Name)], ephemeral: true })
                dp.dply(client, "0", interaction.guildId);
            });
        });



    }
}
