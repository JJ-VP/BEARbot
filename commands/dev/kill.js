require("discord.js");

module.exports = {
	name: "kill",
	description: "Kill the bot!",
	devOnly: true,

	callback: (client, interaction) => {
		try {
			interaction.reply("Bye bye :(");
			console.log("Bot killed by " + interaction.user.tag);
			setTimeout(function () {
				process.exit();
			}, 1000);
		} catch (e) {
			interaction.reply({
				content: `'Muahahaha you can never kill me! *(this is a bug, you should have killed me 0.o)*'`,
				ephemeral: true,
			});
			console.log(e);
		}
	},
};
