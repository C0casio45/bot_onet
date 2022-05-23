const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");
const { faceit } = require("../config.json");

module.exports = {
  GetPlain() {
    const guid = faceit.guid;

    let token = faceit.token; //distinct id

    //to found this token, go to websocket, messages and search for PLAIN
    return Buffer.from(
      guid + "@faceit.com" + "\x00" + guid + "\x00" + token
    ).toString("base64");
  },
  GetUserToken(link) {
    // GET https://api.faceit.com/data/v4/search/players?nickname=test&offset=0&limit=50
    // Authorization: Bearer {token}
    return new Promise((resolve) => {
      let pseudo = link.split("/");

      const https = require("https");
      const options = {
        hostname: "open.faceit.com",
        port: 443,
        path: `/data/v4/search/players?nickname=${pseudo[pseudo.length - 1]
          }&offset=0&limit=1`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${faceit.clientAPIKey}`,
          "Content-Type": "application/json",
        },
      };

      const req = https.request(options, (res) => {
        let chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", (_d) => {
          let userData = JSON.parse(Buffer.concat(chunks).toString());
          resolve(userData.items[0].player_id);
        });
      });

      req.on("error", (error) => {
        console.error(error);
      });

      req.end();
    });
  },
  async BanPlayer(userLink, reason, callback) {
    // POST https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
    // Authorization: Bearer {userToken}
    // Content-Type: application/json
    // Content-Length: {length}
    // Body:
    // {"hubId":"HUB_ID","reason":"REASON","userId":"USER_ID"}

    let userId;

    try {
      userId = await this.GetUserToken(userLink);
    } catch (expression) {
      return callback(true, `User not found : ${expression}`);
    }

    let modToken = faceit.token;

    const data = JSON.stringify({
      hubId: faceit.hubId,
      reason: reason,
      userId: userId,
    });

    const https = require("https");
    const options = {
      hostname: "api.faceit.com",
      port: 443,
      path: `/hubs/v1/hub/${faceit.hubId}/ban/${userId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${modToken}`,
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    try {
      const req = https.request(options, (res) => {
        let chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", (_d) => {
          try {
            let message = Buffer.concat(chunks).toString();
            const r = JSON.parse(message);
            if (r.error == "invalid_token") {
              console.log(r);
              throw "INVALID_TOKEN";
            } else if (typeof r.errors != "undefined") {
              console.log(r);
              throw r.errors[0];
            } else {
              console.log(r);
            }
            callback(false);
          } catch (exception) {
            if (exception.code == "comp_br33") {
              callback(true, `Le joueur ${userLink} est déjà banni`);
            } else {
              callback(true, exception.message);
            }
          }
        });
      });

      req.on("error", (error) => {
        console.error(error);
        callback(true);
      });

      req.write(data);
      req.end();
    } catch (e) {
      console.log(e);
      callback(true);
    }
  },
  async RemoveBan(userLink, callback) {
    // DELETE https://api.faceit.com/hubs/v1/hub/{hubId}/ban/{userId}
    // Authorization: Bearer {userToken}
    let userId = await this.GetUserToken(userLink);
    //Need to wait for response
    let modToken = faceit.token;

    const https = require("https");
    const options = {
      hostname: "api.faceit.com",
      port: 443,
      path: `/hubs/v1/hub/${faceit.hubId}/ban/${userId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${modToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const req = https.request(options, (res) => {
        let chunks = [];

        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", (_d) => {
          try {
            const json = Buffer.concat(chunks).toString();
            if (json) {
              const response = JSON.parse(json);
              if (response.errors) throw response.errors[0].message;
            }
            callback(false);
          } catch (exception) {
            callback(true, exception);
          }
        });
      });

      req.on("error", (error) => callback(true, error));
      req.end();
    } catch (exception) {
      callback(true, exception);
    }
  },
  SpecificBan() {
    // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?userNickname={nickname}&offset=0&limit=1
    // Authorization: Bearer {token}
  },
  BanList() {
    // GET https://api.faceit.com/hubs/v1/hub/{hubId}/ban?offset=0&limit=50
    // Authorization: Bearer {token}
  },
  async SetModToken(user) {
    const con = require("../commands/dbconnect.js");
    const db = con.database();
    const filter = (m) => m.author.id == user.id;

    await user.channel.send(this.get_new_token()).then(async (rmsg) => {
      rmsg.channel
        .awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] })
        .then((_collected) => {
          if (!db._connectCalled) {
            db.connect();
          }
          const fileName = `${__dirname}/config.json`;
          const file = require(fileName);

          file.faceit.token = token;
          file.faceit.updated = Date.now();

          fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
          rmsg.channel.send(this.error());
        });
    });
  },
  GetModToken(user) {
    return new Promise((resolve) => {
      const con = require("../commands/dbconnect.js");
      const db = con.database();
      if (!db._connectCalled) {
        db.connect();
      }
      //get_token(discord id)
      db.query(`call bot_onet.get_token(${user.id});`, function (err, result) {
        if (err) throw err;
        if (result[0].length == 0) {
          resolve(false);
        } else {
          resolve(result[0][0].faceitToken);
        }
      });
    });
  },
  error() {
    let embed = new MessageEmbed()
      .setColor("#e34c3b")
      .setAuthor({ name: "Utilitaire de banissement" })
      .setDescription(`Le token est invalid merci de réessayer`)
      .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
      .setTimestamp();
    return { embeds: [embed] };
  },
  get_new_token() {
    let embed = new MessageEmbed()
      .setColor("#e34c3b")
      .setAuthor({ name: "Utilitaire de banissement" })
      .setDescription(
        `Merci d'aller sur le site faceit et de récupérer votre token`
      )
      .setFooter({ text: "Créé et hébergé par COcasio45#2406" })
      .setTimestamp();
    let button = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL(
          "https://www.faceit.com/fr/hub/f3150918-521a-4664-b430-4e4713b91495/OneT%20Community"
        )
        .setLabel(`Site FACEIT`)
        .setStyle("LINK")
    );
    return { embeds: [embed], components: [button] };
  },
};
