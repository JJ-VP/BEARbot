module.exports = {
	name: "flip",
	description: "Flip a coin!",

	callback: (client, interaction) => {
		const options = ["Heads", "Tails"];
		let random = options[Math.floor(Math.random() * options.length)];
		interaction.reply(`The coin landed on: ${random}`);
	},
};
