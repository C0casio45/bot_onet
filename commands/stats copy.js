const { MessageEmbed } = require('discord.js');
const { folder } = require("../config.json");
const con = require("./dbconnect.js");
const db = con.database();

module.exports = {
    name : 'stats',
    description : "Méthode pour voir le nombre de tickets pris en charge par les différents modérateurs",
    options: [
        {
            "name": "user",
            "description": "Name of the moderator",
            "type": "USER",
            "required": false
        }
    ],
    async execute(interaction,client){
        args = interaction.options._hoistedOptions;
        if(JSON.stringify(args) == '[]'){

            const data = require(`${folder}logs/ticket.json`);

            let info = "[";

            for(const mod in data){
                let nbTicket = 0;
                let that = data[mod];
                for(const ticket in that.tickets){nbTicket++;}
                if(info == "["){info += `{"name": "${that.name}", "value": "${nbTicket}", "inline":false}`;} 
                else {info += `,{"name": "${that.name}", "value": "${nbTicket}", "inline":false}`;}
            }
            info += "]";
            info = JSON.parse(info);
            delete require.cache[require.resolve(`${folder}logs/ticket.json`)];

            const embed = new MessageEmbed()
            .setColor('#e34c3b')
            .setAuthor('Statistiques des modérateurs')
            .addFields(info)
            .setTimestamp();
            return interaction.reply({embeds : [embed]});
        } else {

            let unix_today = new Date().getTime();
            const data = require(`${folder}logs/ticket.json`);

            let ajd = "0";
            let semaine = "0";
            let mois = "0";
            let debut = "0";
            let that = "";
            let pseudo = "";
            
            that = args[0].value;
            pseudo = data[that].name;

            
            

            for(const ticket in data[that].tickets){
                if(data[that].tickets[ticket] > unix_today-86400000){
                    ajd++;
                    semaine++;
                    mois++;
                    debut++;
                }
                else if(data[that].tickets[ticket] > unix_today-604800000){
                    semaine++;
                    mois++;
                    debut++;
                }
                else if(data[that].tickets[ticket] > unix_today-2629743000){
                    mois++;
                    debut++;
                }
                else{
                    debut++;
                }
            }

            delete require.cache[require.resolve(`${folder}logs/ticket.json`)];

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
            return interaction.reply({content : "La commande arrive bientôt",ephemeral : true});
        }

           
    }
}