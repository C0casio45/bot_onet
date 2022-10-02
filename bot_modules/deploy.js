const db = require("../utils/db/dbLibrary.js");

module.exports = {
    dply: function (client, p, id) {
        return new Promise(async (resolve, reject) => {
            id = typeof id == 'undefined' ? "870319455115284481" : id;

            switch (p) {
                case "0":
                    const tickets = await db.getTicketList();
                    const user = await db.getBannedList();
                    let ticketTest = [{ name: "ticket-test", value: "0" }];
                    ticketTest = ticketTest.concat(tickets);

                    const dataGuild = [{
                        "name": 'ban',
                        "description": "Méthode pour bannir les gens",
                        "options": [
                            {
                                "name": 'ticket',
                                "description": 'Nom du ticket',
                                "type": 'STRING',
                                "required": true,
                                "choices": tickets
                            }
                        ]
                    }];

                    dataGuild.push({
                        "name": 'close',
                        "description": "Méthode fermer les tickets",
                        "options": [
                            {
                                "name": 'ticket',
                                "description": 'Nom du ticket',
                                "type": 'STRING',
                                "required": true,
                                "choices": tickets
                            }
                        ]
                    });

                    dataGuild.push({
                        "name": 'unban',
                        "description": "Méthode débannir des gens",
                        "options": [
                            {
                                "name": "utilisateur",
                                "description": "Pseudo de l'utilisateur a bannir",
                                "type": "STRING",
                                "required": true,
                                "choices": user
                            }
                        ]
                    });



                    dataGuild.push({
                        "name": 'ban_test',
                        "description": "Méthode pour tester la méthode ban",
                        "options": [
                            {
                                "name": 'ticket',
                                "description": 'Nom du ticket',
                                "type": 'STRING',
                                "required": true,
                                "choices": ticketTest
                            }
                        ]
                    });

                    resolve(client.guilds.cache.get(id)?.commands.set(dataGuild));
                    break;
                case "1":
                    const banned = await db.getBannedList()
                    resolve(banned);
                    break;
                case "2":
                    const dataGlobal = [{
                        name: 'take',
                        description: "Méthode pour prendre les tickets",
                        options: [
                            {
                                name: 'ticket',
                                description: 'Nom du ticket',
                                type: 'CHANNEL',
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'info',
                        description: "Méthode pour obtenir des informations sur un accusé",
                        options: [
                            {
                                name: 'link',
                                description: 'Lien de l\'accusé',
                                type: 'STRING',
                                required: false
                            },
                            {
                                name: 'pseudo',
                                description: 'Pseudo de l\'accusé',
                                type: 'STRING',
                                required: false
                            }
                        ]
                    },
                    {
                        name: 'stats',
                        description: "Méthode pour voir les statistiques des modérateurs",
                        options: [
                            {
                                "name": "moderateur",
                                "description": "Pseudo du modérateur",
                                "type": "USER",
                                "required": false
                            }
                        ]
                    },
                    {
                        name: 'send',
                        description: "Méthode vérifier les joueurs a unban du jour"
                    }];

                    resolve(client.application.commands?.set(dataGlobal));
                    break;

                default:
                    resolve();
                    break;

            }
        });
        //client.api.applications(client.user.id).commands("command-id").delete(); 
        //const commands = await client.guilds.cache.get('870319455115284481')?.commands.fetch();
        //const commands = await client.application.commands?.fetch();
        //const commands = await client.application.commands?.delete('872796933645828096'); 


    }
}