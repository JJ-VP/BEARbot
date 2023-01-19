const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = async (client, guildBan) => {
	try {
		const channel = guildBan.guild.channels.cache.find((c) => c.name === `bear-log`);
		console.log(`guildBanRemove fired`);
		if (!channel) return;
		if (guildBan.partial) {
			const embed = new EmbedBuilder()
				.setColor("#ff0000")
				.setTitle(`Member Unbanned`)
				.addFields({ name: " ", value: `The ban by:${guildBan.client} who banned:${guildBan.user}` })
				.setTimestamp()
				.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });
		} else {
			const embed = new EmbedBuilder()
				.setColor("#ff0000")
				.setTitle(`Member Unbanned`)
				.addFields({ name: " ", value: `The ban by:${guildBan.client} who banned:${guildBan.user} for ${guildBan.reason}` })
				.setTimestamp()
				.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });
		}

		await channel.send({ embeds: [embed], ephemeral: true });
	} catch (e) {
		error.error(client, e);
	}
};
