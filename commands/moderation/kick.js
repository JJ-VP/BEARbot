const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
	name: "kick",
	description: "Kick a member!",
	options: [
		{
			name: "target-user",
			description: "The user to kick.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "reason",
			description: "The reason for kicking.",
			type: ApplicationCommandOptionType.String,
		},
	],
	permissionsRequired: [PermissionFlagsBits.KickMembers],
	botPermissions: [PermissionFlagsBits.KickMembers],

	callback: (client, interaction) => {
		const user = interaction.options.getUser("target-user");
		const reason = interaction.options.getString("reason");
		interaction.guild.members.kick(user, { reason: reason });
		if (reason) {
			interaction.reply(`${interaction.member.displayName} kicked ${user} for ${reason}`);
		} else {
			interaction.reply(`${interaction.member.displayName} kicked ${user}`);
		}
	},
};
