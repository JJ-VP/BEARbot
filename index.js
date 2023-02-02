require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, REST } = require("discord.js");

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const fs = require("fs");
const eventHandler = require("./handlers/eventHandler");
var config = JSON.parse(fs.readFileSync("./config.json").toString());

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});

eventHandler(client);

process.on("uncaughtException", (error) => {
	console.log(`uncaughtException:\n` + error);
	config.devs.forEach((dev) => {
		client.users.cache.get(dev).send(`uncaughtException:\n${error}`);
	});
});

client.login(process.env.TOKEN);

if (config.deleteGlobalCommands) {
	rest
		.put(Routes.applicationCommands(process.env.clientID), { body: [] })
		.then(() => console.log(`Deleted all commands.`))
		.catch(console.error);
}

if (config.deleteGuildCommands) {
	rest
		.put(Routes.applicationGuildCommands(process.env.clientID, process.env.testServer), { body: [] })
		.then(() => console.log(`Deleted all testServer commands.`))
		.catch(console.error);
}
