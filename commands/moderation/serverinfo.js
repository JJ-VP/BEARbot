const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = {
	name: "serverinfo",
	description: "Get information about the server",
	options: [
		{
			name: "all",
			description: "Display all information.",
			default: false,
			type: ApplicationCommandOptionType.Boolean,
		},
	],

	callback: async (client, interaction) => {
		try {
			const serverIcon = interaction.guild.iconURL({ format: "png", dynamic: true, size: 256 });
			const owner = await interaction.guild.fetchOwner();
			const all = interaction.options.getBoolean("all");
			let serverinfoEmbed = new EmbedBuilder().setColor(0x562d1a).setThumbnail(serverIcon).addFields().setTimestamp();
			let embeds = [];
			let embedCount = 0;

			if (all) {
				test = [
					"interaction.guild.afkChannel",
					"interaction.guild.afkTimeout",
					"interaction.guild.applicationId",
					"interaction.guild.autoModerationRules",
					"interaction.guild.available",
					"interaction.guild.banner",
					"interaction.guild.bans",
					"interaction.guild.channels",
					"interaction.guild.client",
					"interaction.guild.commands",
					"interaction.guild.createdAt",
					"interaction.guild.createdTimestamp",
					"interaction.guild.defaultMessageNotifications",
					"interaction.guild.description",
					"interaction.guild.displaySplash",
					"interaction.guild.emojis",
					"interaction.guild.explicitContentFilter",
					"interaction.guild.features",
					"interaction.guild.icon",
					"interaction.guild.id",
					"interaction.guild.invites",
					"interaction.guild.joinedAt",
					"interaction.guild.joinedTimestamp",
					"interaction.guild.large",
					"interaction.guild.maximumBitrate",
					"interaction.guild.maximumPresences",
					"interaction.guild.maxVideoChannelUsers",
					"interaction.guild.memberCount",
					"interaction.guild.members",
					"interaction.guild.mfaLevel",
					"interaction.guild.name",
					"interaction.guild.nameAcronym",
					"interaction.guild.nsfwLevel",
					"interaction.guild.ownerId",
					"interaction.guild.partnered",
					"interaction.guild.PreferredLocale",
					"interaction.guild.premiumProgressBarEnabled",
					"interaction.guild.PremiumSubscriptionCount",
					"interaction.guild.premiumTier",
					"interaction.guild.presences",
					"interaction.guild.publicUpdatesChannel",
					"interaction.guild.publicUpdatesChannelId",
					"interaction.guild.roles",
					"interaction.guild.rulesChannel",
					"interaction.guild.rulesChanneld",
					"interaction.guild.scheduledEvents",
					"interaction.guild.shard",
					"interaction.guild.shardId",
					"interaction.guild.splash",
					"interaction.guild.stageInstances",
					"interaction.guild.stickers",
					"interaction.guild.systemChannel",
					"interaction.guild.systemChannelFlags",
					"interaction.guild.systemChannelId",
					"interaction.guild.vanityURLCode",
					"interaction.guild.vanityURLUses",
					"interaction.guild.verificationLevel",
					"interaction.guild.verified",
					"interaction.guild.voiceAdapterCreator",
					"interaction.guild.voiceStates",
					"interaction.guild.widgetChannel",
					"interaction.guild.widgetChannelId",
					"interaction.guild.widgetEnabled",
				];

				test.forEach((e) => {
					if (!embeds[Math.floor(embedCount / 25)]) {
						embeds.push(new EmbedBuilder().setColor(0x562d1a).setThumbnail(serverIcon).addFields().setTimestamp());
					}

					let name = /[^.]*$/.exec(e)[0];
					if (eval(e) === null) {
						embeds[Math.floor(embedCount / 25)].addFields({
							name: `${name}`,
							value: `Value not set`,
							inline: true,
						});
					} else {
						if (typeof eval(e) === "object") {
							embeds[Math.floor(embedCount / 25)].addFields({
								name: `${name}`,
								value: `Object - Too large to display`,
								inline: true,
							});
						} else {
							embeds[Math.floor(embedCount / 25)].addFields({
								name: `${name}`,
								value: `${eval(e)}`,
								inline: true,
							});
						}
					}
					embedCount++;
				});
			} else {
				serverinfoEmbed = serverinfoEmbed.addFields(
					{
						name: "Server name:",
						value: `${interaction.guild.name}`,
					},
					{
						name: "server Owner:",
						value: `${owner.user.tag}`,
					},
					{
						name: "Server Features",
						value: `${interaction.guild.features}`,
					},
					{
						name: "Created On:",
						value: `${interaction.guild.createdAt.toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short", hourCycle: "h24" })}`,
					},
					{
						name: "Member Count:",
						value: `${await interaction.guild.memberCount}`,
					},
				);
			}
			await interaction.reply({ embeds: [embeds[0]] });
			embeds.shift();
			embeds.forEach(async (e) => {
				await interaction.followUp({ embeds: [e] });
			});
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
