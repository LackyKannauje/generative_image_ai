require("dotenv").config();
const discord_apikey = process.env.DISCORD_API_KEY;
const express = require("express");
const { handleDiscord } = require("./controller/discord");
const { Client, GatewayIntentBits } = require("discord.js");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", handleDiscord);

client.login(discord_apikey);

app.listen(PORT, () => console.log(`server running at ${PORT}`));
