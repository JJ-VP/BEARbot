const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "flip",
	description: "Flip a coin!",

	callback: (client, interaction) => {
		try {
			const options = ["Heads", "Tails"];
			let random = options[Math.floor(Math.random() * options.length)];
			interaction.reply(`The coin landed on: ${random}`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
