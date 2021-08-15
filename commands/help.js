const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'help',
    description : "Méthode comprendre le fonctionnement des commandes",
    options: [
        {
            "name": "command",
            "description": "Description de la commande",
            "type": "STRING",
            "required": false,
            choices: [
                {
                    name: 'ban',
                    value: 'ban',
                },
                {
                    name: 'stats',
                    value: 'stats',
                },
                {
                    name: 'take',
                    value: 'take',
                },
                {
                    name: 'send',
                    value: 'send',
                },
            ],
        }
    ],
    async execute(interaction,client){
        args = interaction.options._hoistedOptions;
        

            const embed = new MessageEmbed()
            .setColor('#e34c3b')
            .setAuthor(`Statistiques de ${pseudo}`)
            .setDescription(`<@!${that}>`)
            .addField('Aujourd\'hui',`${ajd}`,false)
            .addField('Cette semaine',`${semaine}`,false)
            .addField('Ce mois ci',`${mois}`,false)
            .addField('Depuis le début',`${debut}`,false)
            .setFooter('Créé et hébergé par COcasio45#2406')
            .setTimestamp();
            return interaction.reply({embeds : [embed]});

           
    }
}