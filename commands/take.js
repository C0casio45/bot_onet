const { MessageEmbed } = require('discord.js');
const con = require("../commands/dbconnect.js");
const db = con.database();

module.exports = {
    name: 'take',
    description: "Méthode pour prendre un ticket discord",
    options: [
        {
            "name": "channel",
            "description": "the ticket channel",
            "type": "CHANNEL",
            "required": true
        }
    ],
    async execute(interaction, client) {
        let sliced = interaction.options._hoistedOptions;
        let channel = client.channels.cache.get(sliced[0].value);
        let ticket = channel.name;
        let pseudo = interaction.user.username;
        let discordID = interaction.user.id;
        let ticketList = [];

        // TODO - @ le mec qui créé le ticket
        // channel.messages.fetch({ limit: 100 }).then(messages => {
        //     last = messages[Object.keys(messages)[Object.keys(messages).length - 1]];
        //     console.log(messages);
        //   })

        const embed = new MessageEmbed()
            .setColor('#e34c3b')
            .setAuthor({ name: 'Bonjour !' })
            .setDescription(`Ton ticket a été pris en charge par <@!${interaction.user.id}>.
            
            Merci de nous transmettre toutes les informations qui pourraient nous aider a traiter votre ticket plus rapidement.`)
            .setTimestamp()
            .setFooter({ text: 'Créé et hébergé par COcasio45#2406' });
        channel.send({ embeds: [embed] });

        if (!db._connectCalled) {
            db.connect();
        }
        db.query(`call bot_onet.create_ticket('${ticket}', '${pseudo}', '${discordID}');`, function (err, result) {
            if (err) throw err;

        });
        const dp = require(`${__dirname}bot_modules/deploy.js`);
        dp.dply(client, "0", interaction.guildId);



        return interaction.reply(`Le <#${channel.id}> a été pris par <@!${interaction.user.id}>`);
    }
}