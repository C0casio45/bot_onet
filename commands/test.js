const faceit = require("../bot_modules/faceit.js")

module.exports = {
    name : 'test',
    description : "Méthode de test",
    execute(interaction,client){
        faceit.BanPlayer(interaction.user,`https://www.faceit.com/fr/players/78_Darkkub`,`99999 Pays`);
        
    }
}