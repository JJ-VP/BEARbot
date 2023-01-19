const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "ping",
	description: "Pong!",
	// devOnly: Boolean,
	// testOnly: Boolean,
	// options: Object[],
	// deleted: Boolean,

	callback: (client, interaction) => {
		try {
			interaction.reply(`Pong! ${client.ws.ping}ms`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
