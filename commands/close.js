const { MessageEmbed } = require("discord.js");
const con = require("./dbconnect.js");
const db = con.database();
const dp = require(`../bot_modules/deploy.js`);

module.exports = {
    name: 'close',
    description: "Méthode pour fermer les tickets",
    execute(interaction, client) {
        let ticket = interaction.options._hoistedOptions[0].value;

        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call close_ticket_simp('${ticket}');`, function (err, result) {
            if (err) throw err;
            result[0].forEach(ticket => {
                let embed = new MessageEmbed()
                    .setColor('#e34c3b')
                    .setAuthor({ name: `Le ${ticket.Nom} a bien été fermé` })
                    .setFooter({ text: 'Créé et hébergé par COcasio45#2406' })
                    .setTimestamp();;
                interaction.reply({ embeds: [embed], ephemeral: true })
                dp.dply(client, "0", interaction.guildId);
            });
        });



    }
}
