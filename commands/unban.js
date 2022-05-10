const { folder } = require("../config.json");
const { MessageActionRow, MessageButton } = require('discord.js');
const con = require("../commands/dbconnect.js");
const db = con.database();
const Message = require("../utils/embeds/MessageLibrary.js");

module.exports = {
    name: 'unban',
    description: "Méthode pour débannir les gens",
    execute(interaction, client) {
        let rst = interaction.options._hoistedOptions[0].value;

        let options = rst.split(",");

        let pseudo = options[0];
        let idTicket = options[1];
        let idAccuse = options[2];

        if (!connection._connectCalled) {
            connection.connect();
        }
        db.query(`call bot_onet.unban('${idTicket}', '${idAccuse}');`, function (err, result) {
            if (err) throw err;
        });

        const dp = require(`${folder}bot_modules/deploy.js`);
        dp.dply(client, "0", interaction.guildId);

        const embed = Message.unbanLog(pseudo, interaction.user.id)
        const link = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/bans/hub')
                    .setLabel(`Panel de banissement`)
                    .setStyle('LINK'),
            );

        return interaction.reply({ embeds: [embed], components: [link] });
    }
}

