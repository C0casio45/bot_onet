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
    BanPlayer(hubId,userId,userToken,reason){
        // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        // Content-Type: application/json
        // Content-Length: {length}
        // Body:
        // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}

        const https = require('https')

        const data = JSON.stringify({
            hubId: 'f3150918-521a-4664-b430-4e4713b91495'
        })

        `{"hubId":"${hubId}","reason":"${reason}"","userId":"${userId}"}`

        const options = {
        hostname: `api.faceit.com`,
        port: 443,
        path: `/hubs/v1/hub/${hubId}/ban/${userId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization' : `Bearer ${userToken}`,
            'Body' : data
        }
        }

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
        })

        req.on('error', error => {
        console.error(error)
        })

        req.write(data)
        req.end()
    },
    RemoveBan(){
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
    },
    SpecificBan(){
        //GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?userNickname={nickname}&offset=0&limit=1
    },
    BanList(){
        // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
    }
}