require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, REST } = require("discord.js");

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const fs = require("fs");
const path = require("path");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});

eventHandler(client);

process.on("uncaughtException", (error) => {
	client.users.cache.get(`176721924448059402`).send(`${error}`);
	console.log(error);
});

client.login(process.env.TOKEN);
/*
rest
	.put(Routes.applicationCommands(`882711984733319210`), { body: [] })
	.then(() => console.log(`Deleted all commands.`))
	.catch(console.error);

rest
	.put(Routes.applicationGuildCommands(`882711984733319210`, `407627181305626654`), { body: [] })
	.then(() => console.log(`Deleted all testServer commands.`))
	.catch(console.error);
*/
