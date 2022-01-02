const con = require("../commands/dbconnect")
const db = con.database();

module.exports = {
    dply : function(client,p,id){
            
            id = id == undefined ? "870319455115284481" : id;
            
            switch (p) {
                case "0":
                    if(!db._connectCalled ) {
                        db.connect();
                    }
                    db.query(`call bot_onet.ticket_list();`, function (err, result) {
                        if (err) throw err;
                        tickets = []
                        result[0].forEach(ticket => {
                            tickets.push({name : ticket.Nom, value : `${ticket.idTicket}`});
                        });
    
                        const dataGuild = [{
                            "name" : 'ban',
                            "description" : "Méthode pour bannir les gens",
                            "options": [
                                {
                                    "name": 'ticket',
                                    "description": 'Nom du ticket',
                                    "type": 'STRING',
                                    "required":true,
                                    "choices":tickets
                                }
                            ]}];
                        
                        dataGuild.push({
                                "name" : 'close',
                                "description" : "Méthode fermer les tickets",
                                "options": [
                                    {
                                        "name": 'ticket',
                                        "description": 'Nom du ticket',
                                        "type": 'STRING',
                                        "required":true,
                                        "choices":tickets
                                    }
                                ]
                            });
    
                        db.query(`call bot_onet.banned_list();`, function (err, result) {
                            if (err) throw err;
                            user = []
                            result[0].forEach(accuse => {
                                user.push({name : accuse.Pseudo, value : `${accuse.Pseudo},${accuse.idt},${accuse.ida}`});
                            });
        
                            
        
                            dataGuild.push({
                                    "name" : 'unban',
                                    "description" : "Méthode débannir des gens",
                                    "options": [
                                        {
                                            "name": "utilisateur",
                                            "description": "Pseudo de l'utilisateur a bannir",
                                            "type": "STRING",
                                            "required": true,
                                            "choices":user
                                        }
                                    ]
                                });
        
                                client.guilds.cache.get(id)?.commands.set(dataGuild);
                            
                            });
                        
                    });
                    break;
                case "1":
                    const dataGuild = [{
                        "name" : 'test',
                        "description" : "Méthode de test"
                        }];

                    client.guilds.cache.get(id)?.commands.set(dataGuild);
                    break;
                case "2":
                    const dataGlobal = [{
                        name : 'take',
                        description : "Méthode pour prendre les tickets",
                        options: [
                            {
                                name: 'ticket',
                                description: 'Nom du ticket',
                                type: 'CHANNEL',
                                required:true
                            }
                        ]
                    },
                    {
                        name : 'stats',
                        description : "Méthode pour voir les statistiques des modérateurs",
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
                        name : 'send',
                        description : "Méthode vérifier les joueurs a unban du jour"
                    }];
                    
                    client.application.commands?.set(dataGlobal);
                    console.log("2 is done !")
                    break;
            
                default:
                    break;
            }
            //client.api.applications(client.user.id).commands("command-id").delete(); 
            //const commands = await client.guilds.cache.get('870319455115284481')?.commands.fetch();
            //const commands = await client.application.commands?.fetch();
            //const commands = await client.application.commands?.delete('872796933645828096'); 

            
    }
}