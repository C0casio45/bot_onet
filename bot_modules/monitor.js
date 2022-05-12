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
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${data}\`\`\``,
          });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${data}\`\`\``,
          });
        } else if (data.length < 7000) {
          let first = data.substring(0, 3500);
          let second = data.substring(3500);
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          cocasio.send({ content: `\`\`\`js\n${second}\`\`\`` });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          netinq.send({ content: `\`\`\`js\n${second}\`\`\`` });
        } else if (data.length < 10500) {
          let first = data.substring(0, 3500);
          let second = data.substring(3500, 7000);
          let third = data.substring(7000);
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          cocasio.send({ content: `\`\`\`js\n${second}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${third}\`\`\`` });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          netinq.send({ content: `\`\`\`js\n${second}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${third}\`\`\`` });
        } else if (data.length < 14000) {
          let first = data.substring(0, 3500);
          let second = data.substring(3500, 7000);
          let third = data.substring(7000, 10500);
          let quat = data.substring(10500);
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          cocasio.send({ content: `\`\`\`js\n${second}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${third}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${quat}\`\`\`` });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          netinq.send({ content: `\`\`\`js\n${second}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${third}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${quat}\`\`\`` });
        } else if (data.length < 17500) {
          let first = data.substring(0, 3500);
          let second = data.substring(3500, 7000);
          let third = data.substring(7000, 10500);
          let quat = data.substring(10500, 14000);
          let cinq = data.substring(14000);
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          cocasio.send({ content: `\`\`\`js\n${second}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${third}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${quat}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${cinq}\`\`\`` });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          netinq.send({ content: `\`\`\`js\n${second}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${third}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${quat}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${cinq}\`\`\`` });
        } else if (data.length < 21000) {
          let first = data.substring(0, 3500);
          let second = data.substring(3500, 7000);
          let third = data.substring(7000, 10500);
          let quat = data.substring(10500, 14000);
          let cinq = data.substring(14000, 17500);
          let six = data.substring(17500);
          cocasio.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          cocasio.send({ content: `\`\`\`js\n${second}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${third}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${quat}\`\`\`` });
          cocasio.send({ content: `\`\`\`js\n${six}\`\`\`` });
          netinq.send({
            content: `Le bot a redémarré a cause de l'erreur suivante : \`\`\`js\n${first}\`\`\``,
          });
          netinq.send({ content: `\`\`\`js\n${second}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${third}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${quat}\`\`\`` });
          netinq.send({ content: `\`\`\`js\n${six}\`\`\`` });
        } else {
          cocasio.send({
            content: `le bot a redémarré. Le message est trop long (${data.length} charactères)`,
          });
          netinq.send({
            content: `le bot a redémarré. Le message est trop long (${data.length} charactères)`,
          });
        }

        fs.writeFile(logs, "", (err) => {
          if (err) {
            console.error(err);
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
