const {MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { resolve } = require('path');
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
        return new Promise(resolve => {
            let pseudo = link.split("/")

            const https = require('https')
            const options = {
                hostname: 'open.faceit.com',
                port: 443,
                path: `/data/v4/search/players?nickname=${pseudo[pseudo.length -1]}&offset=0&limit=1`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${faceit.clientAPIKey}`
                }
            }
    
            const req = https.request(options, res => {
                res.on('data', d => {
                    let userData = JSON.parse(d.toString());
                    resolve(userData.items[0].player_id);
                })
            })
    
            req.on('error', error => {
                console.error(error)
            })
    
            req.end()
        })
        
    },
    async BanPlayer(user,userLink,reason){
        // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        // Content-Type: application/json
        // Content-Length: {length}
        // Body:
        // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}
        let userId = await this.GetUserToken(userLink);
        let modToken = await this.GetModToken(user); 
        if(modToken == false){
            modToken = this.SetModToken(user);
        }
        console.log("id retourné : " + userId);
        console.log("token retourné : " + modToken);

        const data = JSON.stringify({
            hubId: faceit.hubId,
            reason: reason,
            userId: userId
        });

        const https = require('https')
        const options = {
            hostname: 'api.faceit.com',
            port: 443,
            path: `/hubs/v1/hub/${faceit.hubId}/ban/${userId}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${modToken}`,
                'Content-Type' : 'application/json',
                'Content-Length' : data.length
            }
        }

        const req = https.request(options, res => {
            res.on('data', d => {
                console.log(d.toString())
                const res = JSON.parse(d.toString())
                if(res.error == "invalid_token") this.SetModToken(user);
            })
        })

        req.on('error', error => {
            console.error(error);
        })

        req.write(data);
        req.end()
    },
    RemoveBan(userLink,user){
        // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
        // Authorization: Bearer {userToken}
        let userId = GetUserToken(userLink);
        //Need to wait for response
        let modToken = this.GetModToken(user) === null ? this.SetModToken(user) : this.GetModToken(user);

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
    async SetModToken(user){
        const con = require("../commands/dbconnect.js");
        const db = con.database();
        const filter = m => m.author.id == user.id;
        console.log(user);

        user.send(this.get_new_token())
            .then(async rmsg => {
                rmsg.channel.awaitMessages({filter, max: 1, time: 300000, errors: ['time'] })
                        .then((collected) => {
                            if(!db._connectCalled ) {
                                db.connect();
                            }
                            console.log("message collecté : " + collected.first().content);
                            //set_token(token,discord id)
                            // db.query(`call bot_onet.set_token(${collected.first().content},${user.id});`, function (err, result) {
                            //     if (err) throw err;
                            //     console.log("token : " + result[0][0].faceitToken);
                            //     resolve(result[0][0].faceitToken);
                            // });

                        }).catch((err) => {
                            console.log(err)
                            rmsg.channel.send(this.error());
                        });

                    });
        
    },
    GetModToken(user){
        return new Promise(resolve => {
            const con = require("../commands/dbconnect.js");
            const db = con.database();
            if(!db._connectCalled ) {
                db.connect();
            }
            //get_token(discord id)
            db.query(`call bot_onet.get_token(${user.id});`, function (err, result) {
                if (err) throw err;
                if(result[1].fieldCount == 0) {
                    resolve(false);
                } else{
                    console.log("token :" + result[0][0].faceitToken);
                    resolve(result[0][0].faceitToken);
                }
            });
        });
    },
    error(){
        let embed = new MessageEmbed()
                .setColor('#e34c3b')
                .setAuthor('Utilitaire de banissement')
                .setDescription(`Le token est invalid merci de réessayer`)
                .setFooter('Créé et hébergé par COcasio45#2406')
                .setTimestamp();
        return {embeds: [embed]}
    },
    get_new_token(){
        let embed = new MessageEmbed()
                .setColor('#e34c3b')
                .setAuthor('Utilitaire de banissement')
                .setDescription(`Merci d'aller sur le site faceit et de récupérer votre token`)
                .setFooter('Créé et hébergé par COcasio45#2406')
                .setTimestamp();
        let button = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL('https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community')
                            .setLabel(`Site FACEIT`)
                            .setStyle('LINK'),
                    );
        return {embeds: [embed], components: [button]}
    }
}