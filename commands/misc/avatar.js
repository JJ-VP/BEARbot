const { ApplicationCommandOptionType } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "avatar",
	description: "Get a users avatar!",
	options: [
		{
			name: "target-user",
			description: `The user who's avatar you want.`,
			required: false,
			type: ApplicationCommandOptionType.User,
		},
	],

	callback: (client, interaction) => {
		try {
			const user = interaction.options.getUser("target-user");
			if (user) {
				const avatar = user.displayAvatarURL({ format: "png", dynamic: true, size: 512 });
				interaction.reply(avatar);
			} else {
				const avatar = interaction.member.displayAvatarURL({
					format: "png",
					dynamic: true,
					size: 512,
				});
				interaction.reply(avatar);
			}
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
