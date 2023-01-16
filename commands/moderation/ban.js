const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
	name: "ban",
	description: "Bans a member!",
	options: [
		{
			name: "target-user",
			description: "The user to ban.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "reason",
			description: "The reason for banning.",
			type: ApplicationCommandOptionType.String,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissions: [PermissionFlagsBits.BanMembers],

	callback: (client, interaction) => {
		const user = interaction.options.getUser("target-user");
		const reason = interaction.options.getString("reason");
		interaction.guild.members.ban(user, { reason: reason });
		if (reason) {
			interaction.reply(`${interaction.member.displayName} banned ${user} for ${reason}`);
		} else {
			interaction.reply(`${interaction.member.displayName} banned ${user}`);
		}
	},
};
