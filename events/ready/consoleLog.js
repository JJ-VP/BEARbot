const { ActivityType } = require("discord.js");

module.exports = async (client) => {
	const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
	console.log(`${client.user.tag} has logged in. \nReady to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`);
	while (true) {
		client.user.setPresence({ activities: [{ name: `over ${client.users.cache.size} users.`, type: ActivityType.Watching }], status: `dnd` });
		await sleep(10000);
		client.user.setPresence({ activities: [{ name: `over ${client.channels.cache.size} channels.`, type: ActivityType.Watching }], status: `dnd` });
		await sleep(10000);
		client.user.setPresence({ activities: [{ name: `over ${client.guilds.cache.size} servers.`, type: ActivityType.Watching }], status: `dnd` });
		await sleep(10000);
	}
};
