const { MessageEmbed } = require("discord.js");
const con = require("./dbconnect.js");
const db = con.database();

module.exports = {
    name : 'send',
    description : "Méthode pour rappeler l'unban des gens",
    execute(interaction,client){
        let ticket = interaction.options._hoistedOptions[0].value;

        if(!connection._connectCalled ) 
        {
            connection.connect();
        }
        db.query(`call close_ticket_simp('${ticket}');`, function (err, result) {
            if (err) throw err;
        });

        
        let embed =  new MessageEmbed()
                .setColor('#e34c3b')
                .setAuthor('Le ticket a bien été fermé')
                .setFooter('Créé et hébergé par COcasio45#2406')
                .setTimestamp();

        interaction.reply({embeds : [embed], ephemeral : true})
    }
}
