const {MessageEmbed } = require('discord.js');

module.exports = {
    GetPlain(){
        const guid = "724e510a-6919-46f7-90b5-400dbe153d8f";

        token = "8a2bc19f-b02c-41e0-849f-15eb488cdcb1";

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
        todo: 'Buy the milk'
        })

        const options = {
        hostname: `api.faceit.com`,
        port: 443,
        path: `/hubs/v1/hub/${hubId}/ban/${userId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization' : `Bearer ${userToken}`,
            'Body' : `{"hubId":"${hubId}","reason":"${reason}"","userId":"${userId}"}`
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