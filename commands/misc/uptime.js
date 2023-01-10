const prettyMilliseconds = require("pretty-ms");

module.exports = {
	name: "uptime",
	description: "Check how long the current bot session has been online for!",

	callback: (client, interaction) => {
		interaction.reply(`Online for ${prettyMilliseconds(client.uptime, { verbose: true })}`);
	},
};
