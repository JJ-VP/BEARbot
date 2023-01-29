const prettyMilliseconds = require("pretty-ms");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "uptime",
	description: "Check how long the current bot session has been online for!",

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			interaction.editReply(`Online for ${prettyMilliseconds(client.uptime, { verbose: true })}`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
