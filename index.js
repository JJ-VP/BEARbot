require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

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
