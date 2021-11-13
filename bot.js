const fs = require('fs');
const { folder } = require("./config.json");
const { token } = require(`${folder}config.json`);
//const close = require(`${folder}bot_modules/closeFunction.js`);
const sending = require(`${folder}bot_modules/sendFunction.js`);
const btn = require(`${folder}bot_modules/unbanFunction.js`);
const { Client, Collection, Intents } = require('discord.js');



const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs.readdirSync(`${folder}commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${folder}commands/${file}`);
    client.commands.set(command.name, command);
}

const btnFiles = fs.readdirSync(`${folder}button`).filter(file => file.endsWith('.js'));

for (const file of btnFiles) {
    const button = require(`${folder}button/${file}`);
    client.buttons.set(button.name, button);
}

client.once('ready', () => {
    let now = new Date();
    console.log('Launched at : ' + now);
});

client.on('messageCreate', async message => {
    
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase().split(" ")[0] == '!deploy' && message.author.id === client.application?.owner.id) {
		const dp = require(`${folder}bot_modules/deploy.js`);
        param = message.content.split(" ");
        dp.dply(client,param[1],param[2]);
        console.log("deployed");
	}
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()){
        let param = interaction.customId.split(" ");
        try {
            await client.buttons.get(param[0]).execute(interaction,client);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de ta commande (redx be like)', ephemeral: true });
        }
    }

    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;

    try {
        await client.commands.get(interaction.commandName).execute(interaction,client);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de ta commande (redx be like)', ephemeral: true });
    }
});

function sendUnBan()
{
    const actualDate = new Date();
    let h = actualDate.getHours();
    if(h == 9){
        sending.send("none",client);
        //close.ticket()
    }
}

setInterval(sendUnBan, 60*60*1000);



client.login(token);