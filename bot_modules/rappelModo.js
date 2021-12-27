const { logs } = require('../config.json');

module.exports = {
    execute : async function(client) {

        const chaudard = await client.users.fetch("810471003855519754");
        const redx = await client.users.fetch("272361822965858308");

        chaudard.send("Pense a remplire la fiche avec les modo, merci !\r\n https://docs.google.com/spreadsheets/d/1W_rhCNJGKalAW9yBuubFB2ugTj67KkkTaZW9giww0c8/edit#gid=0");
        redx.send("Pense a remplire la fiche avec les modo, merci !\r\n https://docs.google.com/spreadsheets/d/1W_rhCNJGKalAW9yBuubFB2ugTj67KkkTaZW9giww0c8/edit#gid=0");
    }
}