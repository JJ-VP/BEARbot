// const { ApplicationCommandOptionType } = require("discord.js");
// const error = require("../../handlers/errorHandler.js");

// module.exports = {
// 	name: "jumbo-emoji",
// 	description: "Get a large Emoji!",
// 	options: [
// 		{
// 			name: "target-emoji",
// 			description: `The emoji you want to jumbo.`,
// 			required: true,
// 			type: ApplicationCommandOptionType.String,
// 		},
// 	],

// 	callback: async (client, interaction) => {
// 		await interaction.deferReply();
// 		try {
// 			const inputString = interaction.options.getString("target-emoji");
// 			const regex = /(<a?)?:\w+:(\d{18}|\d{19})?>/;
// 			const emojiArray = inputString.match(regex);
// 			console.log(client.emojis.cache.get(emojiArray[2]));

// 			emoji = "Command unfinished";
// 			interaction.editReply(emoji);
// 		} catch (e) {
// 			error.error(client, e, interaction);
// 		}
// 	},
// };
