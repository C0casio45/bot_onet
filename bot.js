const fs = require("fs");
const { token } = require("./config.json");
const sending = require(`./bot_modules/rappelUnban.js`);
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const monitor = require("./bot_modules/monitor.js");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs
  .readdirSync(`${__dirname}/commands`)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const btnFiles = fs
  .readdirSync(`${__dirname}/button`)
  .filter((file) => file.endsWith(".js"));

for (const file of btnFiles) {
  const button = require(`./button/${file}`);
  client.buttons.set(button.name, button);
}

client.once("ready", () => {
  monitor.init(client);
  sending.send("none", client);
});

client.on('error', error => {
  monitor.log('The WebSocket encountered an error:', error);
});

client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  let userVerif = () => {
    return !!(
      message.author.id === client.application?.owner.id || 111095499867574272
    );
  };

  if (message.content.toLowerCase().split(" ")[0] == "!deploy" && userVerif) {
    const dp = require(`./bot_modules/deploy.js`);
    const param = message.content.split(" ");
    dp.dply(client, param[1], param[2]);
    monitor.log(`deployed on <#${message.channel.id}>`);
  }

  if (message.content.toLowerCase().split(" ")[0] == "!r" && userVerif()) {
    monitor.log(`bot relaunch by <@${message.author.id}>`);
    setTimeout(() => { process.exit() }, 2000);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    let param = interaction.customId.split(" ");
    try {
      await client.buttons.get(param[0]).execute(interaction, client);
    } catch (error) {
      monitor.log(error);
      return interaction.reply({
        content:
          "Il y a eu une erreur lors de l'exécution de ta commande",
        ephemeral: true,
      });
    }
  }

  if (!interaction.isCommand()) return;

  if (!client.commands.has(interaction.commandName)) return;

  try {
    await client.commands
      .get(interaction.commandName)
      .execute(interaction, client);
  } catch (error) {
    console.log(error);
    return interaction.reply({
      content:
        "Il y a eu une erreur lors de l'exécution de ta commande",
      ephemeral: true,
    });
  }
});

setInterval(() => {
  const actualDate = new Date();
  let h = actualDate.getHours();
  if (h == 9) {
    sending.send("none", client);
  }
}, 60 * 60 * 1000);

client.login(token);
