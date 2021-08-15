const { MessageEmbed } = require('discord.js');
const { folder } = require("../config.json");

module.exports = {
    send : function(interaction,client) { 
        const data = require(`${folder}logs/ban.json`);
        let unix_today = new Date().getTime();
        let full_today = new Date(unix_today);
        let today = `${full_today.getFullYear()}-${full_today.getMonth()+1}-${full_today.getDate()}`;

        let embedsArr = [];
        for(const mod in data){
            let that = data[mod];
            for(const bans in that.ban){
                let unix_unban = that.ban[bans][1] + that.ban[bans][0]*86400000;
                let full_unban = new Date(unix_unban);
                let unban = `${full_unban.getFullYear()}-${full_unban.getMonth()+1}-${full_unban.getDate()}`;
                console.log(unban);
                if(unban == today){
                    let linkSp = bans.split("/");
                    let pseudo = linkSp[linkSp.length -1];
                    console.log(pseudo+that.ban[bans][0]+unban+mod+client+interaction)
                    embedsArr.push(sendEmbed(pseudo,that.ban[bans][0],unban,mod,client,interaction));
                }
                
            }
        }
        console.log(embedsArr);
        delete require.cache[require.resolve(`${folder}logs/ban.json`)];
        if(interaction == "none"){
            client.channels.cache.find(channel => channel.name == "rappel-unban").send({embeds: embedsArr});
            return;
        } else if(embedsArr.length == 0){
            return interaction.reply("Il n'y a pas d'unban a effectuer aujourd'hui");
        } else {
            return interaction.reply({embeds: embedsArr});
        }
    }
}


function sendEmbed(pseudo,duree,date,auteur,client,q){
    
    const embed = new MessageEmbed()
        .setColor('#e34c3b')
        .setAuthor('Rappel unban')
        .setDescription(`Le joueur **${pseudo}** a été banni pour une durée de **${duree} jours** le ${date}.
        Merci de dé-bannir ce joueur <@!${auteur}>.`)
        .addField('Lien vers le pannel faceit de banissement','https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community/admin/tickets',false)
        .setFooter('Créé et hébergé par COcasio45#2406')
        .setTimestamp();
    return embed
    
}