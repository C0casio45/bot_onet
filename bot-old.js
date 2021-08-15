const Discord = require('discord.js');
const client = new Discord.Client();

// const sending = require('./bot_modules/sendFunction.js')
// const prefix = ".";
// const fs = require("fs");
// client.commands = new Discord.Collection();
// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for(const file of commandFiles){
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.name, command);
// }

const guild = '870319455115284481';

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);

  // const commands = await getApp(guild).commands.get()
  // console.log(commands)
    
  createGuildCommand({
            "name": "take",
            "description": "/take #ticket-XXXX",
            "options": [
              {
                  "name": "channel",
                  "description": "the ticket channel",
                  "type": 7,
                  "required": true
              }
            ]
          },guild);

  createGuildCommand({
            "name": "ban",
            "description": "/ban [nb-jours] [lien-faceit]",
            "options": [
              {
                  "name": "Jours",
                  "description": "Nombre de jours de banissement",
                  "type": 10,
                  "required": true,
                  "options": [
                    {
                        "name": "lien",
                        "description": "Lien faceit de l'accusé",
                        "type": 3,
                        "required": true
                    }
                  ]
              }
            ]
          },guild);
          
  createGuildCommand({
            "name": "stats",
            "description": "/stats {moderateur}",
            "options": [
              {
                  "name": "@user",
                  "description": "Name of the moderator @",
                  "type": 6,
                  "required": false
              }
            ]
          },guild);

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;
    //const type = interaction.data.type;
    console.log(interaction)
    // if(command === 'take'){
    //   client.commands.get('take').execute(msg,args,Discord,client);
    // }
  
    // if(command === 'stats'){
    //   client.commands.get('stats').execute(msg,args,Discord,client);
    // }
  
    // if(command === 'ban'){
    //   client.commands.get('ban').execute(msg,args,Discord,client);
    // }
  
    // if(command === 'send'){
    //   client.commands.get('send').execute(msg,args,Discord,client);
    // }
  })
})

async function createGuildCommand(data,guildId){
  return await client.api.applications(client.user.id).guilds(guildId).commands.post({
    data:data
  })
}



  // client.api.applications(client.user.id).commands.post({
  //   data: {
  //     "name": "take",
  //     "description": "/take #ticket-XXXX",
  //     "options": [
  //       {
  //           "name": "channel",
  //           "description": "the ticket channel",
  //           "type": 7,
  //           "required": true
  //       }
  //   ]
  //   }
  // });
  // client.api.applications(client.user.id).commands.post({
  //   data: {
  //     "name": "ban",
  //     "description": "/take [nb-jours] [lien-faceit]"
  //   }
  // });
  // client.api.applications(client.user.id).commands.post({
  //   data: {
  //     "name": "stats",
  //     "description": "/stats {moderateur}",
  //     "options": [
  //       {
  //           "name": "user",
  //           "description": "Name of the moderator",
  //           "type": 6,
  //           "required": false
  //       }
  //   ]
  //   }
  // });


// client.on('message', msg => {
// 	console.log(msg.content);
// });

// client.on('message', msg => {
//   if(!msg.content.startsWith(prefix) || msg.author.bot) return;
//   const args = msg.content.slice(prefix.length).trim().split(' ');
//   const command = args.shift().toLowerCase();

//   if(command === 'take'){
//     client.commands.get('take').execute(msg,args,Discord,client);
//   }

//   if(command === 'stats'){
//     client.commands.get('stats').execute(msg,args,Discord,client);
//   }

//   if(command === 'ban'){
//     client.commands.get('ban').execute(msg,args,Discord,client);
//   }

//   if(command === 'test'){
//     client.commands.get('test').execute(msg,args,Discord,client);
//   }

//   if(command === 'send'){
//     client.commands.get('send').execute(msg,args,Discord,client);
//   }
// })

// client.ws.on('INTERACTION_CREATE', async (interaction)=>{
//   const command = interaction.data.name.toLowerCase();
//   console.log(command);
// })

// function sendUnBan()
// {
//     const actualDate = new Date();
//     let h = actualDate.getHours();
//     if(h == 9){
//       sending.send(Discord,client);
//     }
// }

// setInterval(sendUnBan, 60*60*1000);

// OneT :
//client.login('ODcwMzE1Mjk2ODQwMzcyMjI0.YQK-SA.vfeVPL6UyGZAYHlqOlnF9bUXAKk');

// dev :
client.login('ODcyNzQ1MDIyNzMzMzA3OTA0.YQuVJA.ATcHQyov0O6xDlPHcxkdKOvYQCs');