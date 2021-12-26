const {MessageEmbed } = require('discord.js');
const {faceit} = require("../config.json");

module.exports = {
    GetPlain(){
        const guid = faceit.guid;

        let token = faceit.token; //distinct id

        //to found this token, go to websocket, messages and search for PLAIN
        const saslPlain = Buffer.from(guid + "@faceit.com" + "\x00" + guid + "\x00" + token).toString('base64');

        return saslPlain;
    },
    GetUserToken(link){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
        // Authorization: Bearer {token}
        let pseudo = link.split("/")
        let url = `https://open.faceit.com/data/v4/search/players?nickname=${pseudo[pseudo.length -1]}&offset=0&limit=1`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let userData = JSON.parse(xhr.responseText);
                return userData.items[0].player_id;
            } 
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Authorization', `Bearer ${faceit.clientAPIKey}`);
        xhr.send(null);
    },
    BanPlayer(userLink,reason,modToken){
        // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        // Content-Type: application/json
        // Content-Length: {length}
        // Body:
        // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}

        let userId = GetUserToken(userLink);

        let url = `https://api.faceit.com/hubs/v1/hub/${faceit.hubId}/ban/${userId}`

        const data = JSON.stringify({
            hubId: faceit.hubId,
            reason: reason,
            userId: userId
        });

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.status != 200){
                return false;
            }
            return true;
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Content-Length', data.length);
        xhr.setRequestHeader('Authorization', `Bearer ${modToken}`);
        xhr.send(data);
    },
    RemoveBan(userLink,modToken){
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        let userId = GetUserToken(userLink);

        let url = `https://api.faceit.com/hubs/v1/hub/${faceit.hubId}/ban/${userId}`

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader('Authorization', `Bearer ${modToken}`);
        xhr.send(data);
    },
    SpecificBan(){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?userNickname={nickname}&offset=0&limit=1
        // Authorization: Bearer {token}
    },
    BanList(){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
        // Authorization: Bearer {token}
    },
    SetModToken(client,mod){
        const con = require("../commands/dbconnect.js");
        const db = con.database();

        client.channel.send({embeds : [get_new_token(pseudo)]})
            .then(async rmsg => {
                rmsg.channel.awaitMessages({filter, max: 1, time: 300000, errors: ['time'] })
                        .then((collected) => {
                            if(!db._connectCalled ) {
                                db.connect();
                            }

                            db.query(`call bot_onet.set_token(${collected.first().content},${mod});`, function (err, result) {
                                if (err) throw err;
                            });
    
                        }).catch((err) => {
                            console.log(err)
                            rmsg.channel.send({embeds : [error(1)]});
                        });
    
                    });
    },
    GetModToken(mod){
        const con = require("../commands/dbconnect.js");
        const db = con.database();
        if(!db._connectCalled ) {
            db.connect();
        }

        db.query(`call bot_onet.get_token(${mod});`, function (err, result) {
            if (err) throw err;
        });
    }
}