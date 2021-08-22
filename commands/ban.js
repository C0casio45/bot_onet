const { MessageEmbed } = require("discord.js");
const { folder } = require("../config.json");

module.exports = {
    name : 'ban',
    description : "Méthode pour bannir les gens",
    execute(interaction,client){
        
        let unban = client.channels.cache.find(channel => channel.name == "rappel-unban");
        let options = interaction.options._hoistedOptions[0].value;

        let args = options.split(" ");
        let link = args[1].split("/");
        let pseudo = link[link.length -1];

        //Logs dans ban.json
        const fs = require('fs');
        let data = fs.readFileSync(`${folder}logs/ban.json`,'utf8',function(err, data) {
            if(err){console.log(err);}
            return data;
        })
        let today = new Date().getTime();
        let id = interaction.user.id;
        let donnee = JSON.parse(data);
        if(id in donnee){
            donnee[id].ban[args[1]] = [parseInt(args[0]),today];
        } else{
            donnee[id] = {};
            donnee[id].name = interaction.user.username;
            donnee[id].ban = {};
            donnee[id].ban[args[1]] = [parseInt(args[0]),today];
        }
        fs.writeFile(`${folder}logs/ban.json`,JSON.stringify(donnee),function (err) {
            if (err) throw err;
            //console.log('Fichier mis à jour !');
        });

        const embed = new MessageEmbed()
        .setColor('#e34c3b')
        .setAuthor('Nouvelle entrée de banissement')
        .setDescription(`Le joueur **${pseudo}** a été banni pour une durée de **${args[0]} jours**.
        Un rappel sera fait dans le channel <#${unban.id}> le jour de l'unban à 9h.`)
        .addField('Lien vers le formulaire de banissement','https://docs.google.com/forms/d/e/1FAIpQLSd3ET4InHdXJZUm-zbPuj96yCw84M1Mv7I20Ezpfi3PTxSPsg/viewform',false)
        .addField('Lien vers le pannel faceit de banissement','https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/tickets',false)
        .setFooter('Créé et hébergé par COcasio45#2406')
        .setTimestamp();
        return interaction.reply({embeds : [embed]});

    }
}
