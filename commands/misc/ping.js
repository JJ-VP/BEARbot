const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "ping",
	description: "Pong!",
	// devOnly: Boolean,
	// testOnly: Boolean,
	// options: Object[],
	// deleted: Boolean,

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			interaction.editReply(`Pong! ${client.ws.ping}ms`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
