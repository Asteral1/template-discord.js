// Made with love from Asteral to Stonechat! btw you can delete this //

const Discord = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
let Prefix = 'YOUR_PREFIX';
// Listen for messages
client.on('messageCreate', async message => {
    // Ignore messages that don't start with '!' or are sent by a bot
    if (!message.content.startsWith(Prefix) || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Handle commands directly
    if (command === 'ping') {
        message.channel.send('Pong!');
    } else if (command === 'help') {
        const helpMessage = `
        **Available commands:**
        - **!ping**: Replies with Pong!
        - **!help**: Lists all commands.
        - **!joke**: Tells a random joke.
        - **!quote**: Sends a random inspirational quote.
        `;
        message.channel.send(helpMessage);
    } else if (command === 'joke') {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const joke = await response.json();
            message.channel.send(`${joke.setup} - ${joke.punchline}`);
        } catch (error) {
            console.error('Error fetching joke:', error);
            message.channel.send('Sorry, I couldn\'t fetch a joke right now.');
        }
    } else if (command === 'quote') {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const quote = await response.json();
            message.channel.send(`"${quote.content}" - ${quote.author}`);
        } catch (error) {
            console.error('Error fetching quote:', error);
            message.channel.send('Sorry, I couldn\'t fetch a quote right now.');
        }
    } else {
        message.channel.send("Unknown command. Type `!help` to see all commands.");
    }
});

client.login("YOUR_BOT_TOKEN");
