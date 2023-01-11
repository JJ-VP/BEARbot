require("dotenv").config();

const { Routes } = require("discord-api-types/v10");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const fs = require("fs");
const path = require("path");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});

eventHandler(client);

client.login(process.env.TOKEN);
