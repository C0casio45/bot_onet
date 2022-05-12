const { logs } = require("../config.json");

module.exports = {
  execute: async function (client) {
    if (!logs) return;
    client.application?.fetch().then(async () => {
      const cocasio = client.application?.owner;
      const netinq = await client.users.fetch("248069530381844481");

      const fs = require("fs");

      fs.readFile(logs, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        if (data.substring(95, 99) == "-104") {
          return;
        }

        //vérifier le nombre de charactères

        if (data.length < 3500) {
          const content = {
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${data}\`\`\``,
          }
          cocasio.send(content);
          netinq.send(content);
        } else {
          const content = {
            content: `le bot a redémarré. Le message est trop long (${data.length} charactères)`,
            files: [logs],
          }
          cocasio.send(content);
          netinq.send(content);
        }

        fs.writeFile(logs, "", (error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log("done");
        });
      });
    });
  },
  log: async function (message, client) {

    client.application?.fetch().then(async () => {
      const cocasio = client.application?.owner;
      const netinq = await client.users.fetch("248069530381844481");

      cocasio.send(message);
      netinq.send(message);
    });
  },
};
