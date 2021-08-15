const { MessageEmbed } = require('discord.js');
const { folder } = require("../config.json");

module.exports = {
    name : 'take',
    description : "Méthode pour prendre un ticket discord",
    options: [
        {
            "name": "channel",
            "description": "the ticket channel",
            "type": "CHANNEL",
            "required": true
        }
    ],
    execute(interaction,client){
        let sliced = interaction.options._hoistedOptions;
        let channel = client.channels.cache.get(sliced[0].value);
    
        // A faire - @ le mec qui créé le ticket
        // channel.messages.fetch({ limit: 100 }).then(messages => {
        //     last = messages[Object.keys(messages)[Object.keys(messages).length - 1]];
        //     console.log(messages);
        //   })

        const embed = new MessageEmbed()
            .setColor('#e34c3b')
            .setAuthor('Salut !')
            .setDescription(`Bonjour ton ticket a été pris en charge par <@!${interaction.user.id}>.
            
            Merci de nous transmettre toutes les informations qui pourraient nous aider a traiter votre ticket plus rapidement.`)
            .setTimestamp()
            .setFooter('Créé et hébergé par COcasio45#2406');
            channel.send({embeds: [embed]});
        //Logs dans ticket.json
        const fs = require('fs');
        let data = fs.readFileSync(`${folder}logs/ticket.json`,'utf8',function(err, data) {
            if(err){console.log(err);}
            return data;
        })
        let today = new Date().getTime();
        let id = interaction.user.id;
        let donnee = JSON.parse(data);
        if(id in donnee){
            donnee[id].tickets[channel.name] = today;
        } else{
            donnee[id] = {};
            donnee[id].name = interaction.user.username;
            donnee[id].tickets = {};
            donnee[id].tickets[channel.name] = today;
        }
        fs.writeFile(`${folder}logs/ticket.json`,JSON.stringify(donnee),function (err) {
            if (err) throw err;
        });
        
        return interaction.reply(`Le <#${channel.id}> a été pris par <@!${interaction.user.id}>`);
    }
}