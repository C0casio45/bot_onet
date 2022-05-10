const db = require('../utils/db/dbLibrary.js');
const Message = require("../utils/embeds/MessagesLibrary.js");

module.exports = {
    name: "take",
    description: "Méthode pour prendre un ticket discord",
    options: [
        {
            name: "channel",
            description: "the ticket channel",
            type: "CHANNEL",
            required: true,
        },
    ],
    async execute(interaction, client) {
        let sliced = interaction.options._hoistedOptions;
        let channel = client.channels.cache.get(sliced[0].value);
        let ticket = channel.name;
        let pseudo = interaction.user.username;
        let discordID = interaction.user.id;

        // TODO - @ le mec qui créé le ticket
        // channel.messages.fetch({ limit: 100 }).then(messages => {
        //     last = messages[Object.keys(messages)[Object.keys(messages).length - 1]];
        //     console.log(messages);
        //   })

        channel.send({ embeds: [Message.takeTicket(interaction.user.id)] });


        db.takeTicket(ticket, pseudo, discordID);

        const dp = require(`${__dirname}/../bot_modules/deploy.js`);
        dp.dply(client, "0", interaction.guildId);



        return interaction.reply(`Le <#${channel.id}> a été pris par <@!${interaction.user.id}>`);
    }
}
