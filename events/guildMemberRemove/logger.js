const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = async (client, guildMember) => {
	try {
		const channel = guildMember.guild.channels.cache.find((c) => c.name === `bear-log`);
		if (!channel) return;
		const embed = new EmbedBuilder()
			.setColor("#ff0000")
			.addFields({ name: "Member Left", value: `${guildMember.displayName}` })
			.setTimestamp()
			.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

		await channel.send({ embeds: [embed], ephemeral: true });
	} catch (e) {
		error.error(client, e);
	}
};
