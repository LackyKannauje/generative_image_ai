require("dotenv").config();
const discord_apikey = process.env.DISCORD_API_KEY;

const {handleDiscord} = require('./controller/discord')
const { Client, GatewayIntentBits } = require("discord.js");



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", handleDiscord);

client.login(discord_apikey);
