const fs = require('fs');
const Discord = require('discord.js');

const {token, prefix} = require('./config.json');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();


client.login(token);

for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('-------------------------');
  console.log(`봇이 ${client.user.tag}에 로그인함`);
  console.log('-------------------------');
});


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;
  try {
      client.commands.get(command).execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('해당 명령을 실행하는 동안 오류가 발생했습니다!');
  }
});
