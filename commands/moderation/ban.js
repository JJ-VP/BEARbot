const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

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

	callback: async (client, interaction) => {
		await interaction.deferReply();
		try {
			const user = interaction.options.getUser("target-user");
			const reason = interaction.options.getString("reason");
			interaction.guild.members.bann(user, { reason: reason });
			if (reason) {
				interaction.editReply(`${interaction.member.displayName} banned ${user} for ${reason}`);
			} else {
				interaction.editReply(`${interaction.member.displayName} banned ${user}`);
			}
		} catch (e) {
			error.error(client, e, interaction.guild, interaction.channel, interaction.options.getUser("target-user"), interaction);
		}
	},
};
