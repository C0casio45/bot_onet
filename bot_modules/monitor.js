const { logs } = require("../config.json");

class Monitor {
  client;
  cocasio;
  kdev;
  constructor(client) {
    this.client = client;
  }

  init() {
    if (!logs) return;
    client.application?.fetch().then(async () => {
      this.cocasio = client.application?.owner;
      this.kdev = await client.users.fetch("248069530381844481");

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
          this.cocasio.send(content);
          this.kdev.send(content);
        } else {
          const content = {
            content: `le bot a redémarré. Le message est trop long (${data.length} charactères)`,
            files: [logs],
          }
          this.cocasio.send(content);
          this.kdev.send(content);
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
  }

  log(message) {
    this.cocasio.send(message);
    this.kdev.send(message);
  }
}

module.exports = Monitor;