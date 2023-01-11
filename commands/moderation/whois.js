const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "whois",
	description: "Lookup information on a user!",
	options: [
		{
			name: "target-user",
			description: "The user to lookup.",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
	],

	callback: async (client, interaction) => {
		try {
			const user = interaction.options.getUser("target-user");
			const guildUser = await interaction.guild.members.cache.get(user.id);
			const options = {
				dateStyle: "short",
				timeStyle: "short",
				hourCycle: "h24",
			};

			let whoisEmbed = new EmbedBuilder()
				.setColor(0x562d1a)
				.setThumbnail(
					guildUser.displayAvatarURL({
						format: `png`,
						dynamic: true,
						size: 256,
					}),
				)
				.addFields(
					{
						name: `Member Info:`,
						value: `**• Display name:** \n${guildUser.displayName}\n\n**• Joined at:** \n${guildUser.joinedAt.toLocaleString("en-GB", options)}\n\n**• Roles:** \n${guildUser.roles.cache.map((r) => r).join(`\n`)}`,
						inline: true,
					},
					{
						name: `User Info:`,
						value: `**• Name:** \n${user.tag}\n\n**• User ID:** \n${guildUser.id}\n\n**• Status:** \n${guildUser.presence.status}\n\n**• Bot:** \n${user.bot}\n\n**• Created:** \n${user.createdAt.toLocaleString("en-GB", options)}`,
						inline: true,
					},
				)
				.setTimestamp();

			if (!guildUser.presence.activities[0]) {
				interaction.reply({ embeds: [whoisEmbed] });
			} else {
				if (guildUser.presence.activities[1]) {
					if (guildUser.presence.activities[1].assets !== null) {
						whoisEmbed = whoisEmbed.addFields({
							name: `Rich Presence:`,
							value: `**• Name:** \n${guildUser.presence.activities[1].toString()}\n\n**• Details:** \n${guildUser.presence.activities[1].details}\n\n**• State:** \n${guildUser.presence.activities[1].state}\n\n**• Info 1:** \n${guildUser.presence.activities[1].assets.largeText}\n\n**• Info 2:** \n${guildUser.presence.activities[1].assets.smallText}\n\n**• Playing Since:** \n${guildUser.presence.activities[1].createdAt.toLocaleString("en-GB", { timeStyle: "medium", hourCycle: "h24" })}`,
							inline: true,
						});
						interaction.reply({ embeds: [whoisEmbed] });
					} else {
						whoisEmbed = whoisEmbed.addFields({ name: `Currently ${guildUser.presence.activities[1].type}:`, value: `**• Name:** ${guildUser.presence.activities[1].toString()}`, inline: true });
						interaction.reply({ embeds: [whoisEmbed] });
					}
				} else {
					whoisEmbed = whoisEmbed.addFields({ name: `Custom status:`, value: `${guildUser.presence.activities[0].emoji}`, inline: true });
					interaction.reply({ embeds: [whoisEmbed] });
				}
			}
		} catch (e) {
			console.log(e);
			interaction.reply({
				content: `There was an error performing that command.`,
				ephemeral: true,
			});
		}
	},
};
