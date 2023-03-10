const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "unban",
	description: "Unbans a member!",
	options: [
		{
			name: "target-user",
			description: "The user to ban.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissions: [PermissionFlagsBits.BanMembers],

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const user = interaction.options.getUser("target-user");
			interaction.guild.members.unban(user);
			interaction.editReply(`${interaction.member.displayName} unbanned ${user}`);
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
