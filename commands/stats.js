const { MessageEmbed } = require('discord.js');
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

        if(!db._connectCalled ) {
            db.connect();
        }
        db.query(`call bot_onet.stats_all();`, function (err, result) {
            if (err) throw err;
            stats = {};
            result[0].forEach(ticket => {
                if(isNaN(stats[ticket.Pseudo]))stats[ticket.Pseudo] = 0;
                stats[ticket.Pseudo]++; 
            });

            
            let i = 0;
            let y = 0;
            let info = [];
            let keys =  Object.keys(stats);
            console.log(keys[0]);
            for(let mod in stats){
                info.push({ "name" : mod, "value": stats[mod], "inline": false });
            };

            

            info.sort(function (a, b) {
                return b.value - a.value;
            });

            console.log(info);

            const embed = new MessageEmbed()
                .setColor('#e34c3b')
                .setAuthor('Statistiques des modérateurs')
                .addFields(info)
                .setTimestamp();
            return interaction.reply({embeds : [embed]});
        });
    }
}