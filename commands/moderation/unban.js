const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

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

	callback: (client, interaction) => {
		const user = interaction.options.getUser("target-user");
		interaction.guild.members.unban(user);
		interaction.reply(`${interaction.member.displayName} unbanned ${user}`);
	},
};
