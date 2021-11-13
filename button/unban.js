const { MessageActionRow,MessageButton,MessageEmbed } = require('discord.js');
const con = require("../commands/dbconnect")
const db = con.database();

module.exports = {
    name : 'unban',
    description : "Méthode Enregistrer qu'un utilisateur a bien été débanni",
    execute : function(interaction,client) { 

        let ub = interaction.customId.split(" ");

        db.connect(function(err) {
            if (err) throw err;
            db.query(`call bot_onet.unban(${ub[1]},${ub[2]});`, function (err, result) {
                if (err) throw err;
                
            });
        });

        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('done')
                                .setLabel(`Fait`)
                                .setStyle('SUCCESS')
                                .setDisabled('true'),
                        );

        interaction.update({components: [row]});

        
    }
}