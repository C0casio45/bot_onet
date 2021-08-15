const sending = require('../bot_modules/sendFunction.js');

module.exports = {
    name : 'send',
    description : "Méthode pour rappeler l'unban des gens",
    execute(interaction,client){
       sending.send(interaction,client);
    }
}

