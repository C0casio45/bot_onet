const fs = require('fs');
const { folder } = require("./config.json");
const { token } = require(`${folder}config.json`);
const sending = require(`${folder}bot_modules/sendFunction.js`)
const { Client, Collection, Intents } = require('discord.js');
const wait = require('util').promisify(setTimeout);



const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync(`${folder}commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${folder}commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
		const data = [{
			name : 'ban',
            description : "Méthode pour bannir les gens",
            options: [
                {
                    name: 'jours-et-lien-faceit',
                    description: 'Nombre de jours que le joueur est banni et son lien faceit',
                    type: 'STRING',
                    required:true
                }
            ]
		},
        {
            name : 'stats',
            description : "Méthode pour voir le nombre de tickets pris en charge par les différents modérateurs",
            options: [
                {
                    "name": "user",
                    "description": "Name of the moderator",
                    "type": "USER",
                    "required": false
                }
            ]
        },
        {
            name : 'take',
            description : "Méthode pour prendre un ticket discord",
            options: [
                {
                    "name": "channel",
                    "description": "the ticket channel",
                    "type": "CHANNEL",
                    "required": true
                }
            ]
        },
        {
            name : 'send',
            description : "envoie des unban a effectuer"
        }];

		const commands = await client.guilds.cache.get('870319455115284481')?.commands.set(data);
		console.log(commands);
	}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (!client.commands.has(interaction.commandName)) return;

    // if (interaction.commandName === 'ban') {
	// 	await interaction.reply('Pong!');
    //     const embed = await client.commands.get("ban").execute(interaction,client);
	// 	await wait(2000);
	// 	return await interaction.editReply(embed);
    // }

    try {
        await client.commands.get(interaction.commandName).execute(interaction,client);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', msg => {
	console.log(msg.content);
});

function sendUnBan()
{
    const actualDate = new Date();
    let h = actualDate.getHours();
    if(h == 9){
      sending.send("none",client);
    }
}

setInterval(sendUnBan, 60*60*1000);

client.login(token);