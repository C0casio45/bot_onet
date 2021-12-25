const {MessageEmbed } = require('discord.js');
const {faceit} = require("../config.json");

module.exports = {
    GetPlain(){
        const guid = faceit.guid;

        token = faceit.token; //distinct id

        //to found this token, go to websocket, messages and search for PLAIN
        const saslPlain = Buffer.from(guid + "@faceit.com" + "\x00" + guid + "\x00" + token).toString('base64');

        return saslPlain;
    },
    GetUserToken(link){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
        // Authorization: Bearer {token}
        pseudo = link.split("/")
        url = `https://open.faceit.com/data/v4/search/players?nickname=${pseudo[pseudo.length -1]}&offset=0&limit=1`;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               userData = JSON.parse(xhr.responseText);
               return userData.items[0].player_id;
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Authorization', `Bearer ${faceit.clientAPIKey}`);
        xhr.send(null);
    },
    BanPlayer(userId,reason){
        // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        // Content-Type: application/json
        // Content-Length: {length}
        // Body:
        // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}
        url = `https://api.faceit.com/hubs/v1/hub/${faceit.hubId}/ban/${userId}`

        const data = JSON.stringify({
            hubId: faceit.hubId,
            reason: reason,
            userId: userId
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Content-Length', data.length);
        xhr.setRequestHeader('Authorization', `Bearer ${faceit.token}`);
        xhr.send(data);
    },
    RemoveBan(userId){
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        url = `https://api.faceit.com/hubs/v1/hub/${faceit.hubId}/ban/${userId}`

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader('Authorization', `Bearer ${faceit.token}`);
        xhr.send(data);
    },
    SpecificBan(){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?userNickname={nickname}&offset=0&limit=1
        // Authorization: Bearer {token}
    },
    BanList(){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
        // Authorization: Bearer {token}
    }
}