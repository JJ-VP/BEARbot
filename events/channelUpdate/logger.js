const { EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");

module.exports = async (client, oldChannel, newChannel) => {
	try {
		if (oldChannel.partial) return;
		const channel = oldChannel.guild.channels.cache.find((c) => c.name === `bear-log`);
		if (!channel) return;
		const embed = new EmbedBuilder()
			.setColor("#0000ff")
			.setTitle(`Channel Updated`)
			.addFields({ name: " ", value: `**${oldChannel}**\n .` }, { name: "Old Channel", value: `Name: ${oldChannel.name}\nType: ${oldChannel.type}\nNSFW: ${oldChannel.nsfw}\nPosition: ${oldChannel.position}\nTopic: ${oldChannel.topic}`, inline: true }, { name: "New Channel", value: `Name: ${newChannel.name}\nType: ${newChannel.type}\nNSFW: ${newChannel.nsfw}\nPosition: ${newChannel.position}\nTopic: ${newChannel.topic}`, inline: true })
			.setTimestamp()
			.setFooter({ text: "Event logged", iconURL: `${client.user.avatarURL({ format: "png", dynamic: true, size: 512 })}` });

		await channel.send({ embeds: [embed], ephemeral: true });
	} catch (e) {
		error.error(client, e);
	}
};
