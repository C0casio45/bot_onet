const fs = require('fs');
const { folder } = require("./config.json");
const { token } = require("./config.json");
const sending = require(`./bot_modules/sendFunction.js`);
const btn = require(`./bot_modules/unbanFunction.js`);
const { Client, Collection, Intents } = require('discord.js');
const monitor = require("./bot_modules/monitor.js");
const rappl = require("./bot_modules/rappelModo.js");
const faceit = require("./bot_modules/faceit.js")



const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const btnFiles = fs.readdirSync(`${__dirname}/button`).filter(file => file.endsWith('.js'));

for (const file of btnFiles) {
    const button = require(`./button/${file}`);
    client.buttons.set(button.name, button);
}

client.once('ready', () => {
    let now = new Date();
    monitor.execute(client);
    monitor.log('Launched at : ' + now, client);
});

client.on('messageCreate', async message => {

    if (!client.application?.owner) await client.application?.fetch();

    function userVerif() {
        if (message.author.id === client.application?.owner.id || 248069530381844481 /*Quentin*/) {
            return true;
        }
        return false
    }

    if (message.content.toLowerCase().split(" ")[0] == '!deploy' && userVerif()) {
        const dp = require(`./bot_modules/deploy.js`);
        param = message.content.split(" ");
        dp.dply(client, param[1], param[2]);
        monitor.log(client, "deployed on " + param[2]);
    }

    if (message.content.toLowerCase().split(" ")[0] == '!r' && userVerif()) {
        process.exit();
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        let param = interaction.customId.split(" ");
        try {
            await client.buttons.get(param[0]).execute(interaction, client);
        } catch (error) {
            monitor.error(error);
            return interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de ta commande (redx be like)', ephemeral: true });
        }
    }

    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;

    try {
        await client.commands.get(interaction.commandName).execute(interaction, client);
    } catch (error) {
        monitor.error(error);
        return interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de ta commande (redx be like)', ephemeral: true });
    }
});

setInterval(() => {
    const actualDate = new Date();
    let h = actualDate.getHours();
    let d = actualDate.getDay();
    if (h == 9) {
        sending.send("none", client);
    }
    if (d == 1 && h == 9) {
        rappl.execute(client);
    }
}, 60 * 60 * 1000);



client.login(token);