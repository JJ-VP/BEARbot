require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, REST } = require("discord.js");
const { devs, deleteGlobalCommands, deleteGuildCommands, testServer, clientID } = require("./config.json");

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const fs = require("fs");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});

eventHandler(client);

process.on("uncaughtException", (error) => {
	console.log(`uncaughtException:\n` + error);
	devs.forEach((dev) => {
		client.users.cache.get(dev).send(`uncaughtException:\n${error}`);
	});
});

client.login(process.env.TOKEN);

if (deleteGlobalCommands) {
	rest
		.put(Routes.applicationCommands(clientID), { body: [] })
		.then(() => console.log(`Deleted all commands.`))
		.catch(console.error);
}

if (deleteGuildCommands) {
	rest
		.put(Routes.applicationGuildCommands(clientID, testServer), { body: [] })
		.then(() => console.log(`Deleted all testServer commands.`))
		.catch(console.error);
}
