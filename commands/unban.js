const { folder } = require("../config.json");
const { MessageActionRow, MessageButton } = require('discord.js');
const db = require("../utils/db/dbLibrary.js");
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: 'unban',
    description: "Méthode pour débannir les gens",
    execute(interaction, client) {
        let rst = interaction.options._hoistedOptions[0].value;

        let options = rst.split(",");

        let pseudo = options[0];
        let idTicket = options[1];
        let idAccuse = options[2];

        db.unbanUser(idTicket, idAccuse);

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

