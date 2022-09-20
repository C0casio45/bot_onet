const db = require('../utils/db/dbLibrary.js');
const Message = require("../utils/embeds/MessagesLibrary.js");
const Button = require("../utils/buttons/tiLanguageSelection.js");

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

        const take_channel = client.channels.cache.find((channel) => channel.name == "take");

        // TODO - @ le mec qui créé le ticket
        // channel.messages.fetch({ limit: 100 }).then(messages => {
        //     last = messages[Object.keys(messages)[Object.keys(messages).length - 1]];
        //     console.log(messages);
        //   })

        channel.send({ embeds: [Message.takeTicketSelection()], components: [Button.tiLanguageSelection()] });


        await db.takeTicket(ticket, pseudo, discordID);

        const dp = require(`${__dirname}/../bot_modules/deploy.js`);
        await dp.dply(client, "0", interaction.guildId);

        take_channel.send({ content: `Le <#${channel.id}> (${ticket}) a été pris par <@!${interaction.user.id}>` })
        return interaction.reply({ content: `Vous avez pris le ticket <#${channel.id}>`, ephemeral: true });
    }
}
