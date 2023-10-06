require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, REST } = require("discord.js");
const { devs, deleteGlobalCommands, deleteGuildCommands, testServer, clientID } = require("./config.json");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});

(async () => {
	try {
		mongoose
			.set("strictQuery", true)
			.connect(process.env.DBURI, { autoIndex: false })
			.then(console.log("Connected to MongoDB"))
			.catch((e) => `Unable to connect to MongoDB:\n${e}`);
		eventHandler(client);
		client.login(process.env.TOKEN);
	} catch (e) {
		console.log(e);
	}
})();

process.on("uncaughtException", (error) => {
	console.log(`uncaughtException:\n` + error);
	devs.forEach((dev) => {
		client.users.cache.get(dev).send(`uncaughtException:\n${error}`);
	});
});

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
