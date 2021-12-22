const { logs } = require('../config.json');

module.exports = {
    execute : function(client) {
        guild = client.guild.get('718439782665027584');
        chaudard = guild.members.cache.get("810471003855519754");
        redx = guild.members.cache.get("272361822965858308");

        chaudard.send("Pense a faire remplir la fiche avec les modo, merci !\r\n https://docs.google.com/spreadsheets/d/1W_rhCNJGKalAW9yBuubFB2ugTj67KkkTaZW9giww0c8/edit#gid=0");
        redx.send("Pense a faire remplir la fiche avec les modo, merci !\r\n https://docs.google.com/spreadsheets/d/1W_rhCNJGKalAW9yBuubFB2ugTj67KkkTaZW9giww0c8/edit#gid=0");
    }
}