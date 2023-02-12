const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const error = require("../../handlers/errorHandler.js");
const { Configuration, OpenAIApi } = require("openai");
const gptLog = require("../../models/gptLog");

module.exports = {
	name: "chatgpt",
	description: "Talk with the OpenAI Chat GPT chatbot!",
	options: [
		{
			name: "prompt",
			description: "Prompt for the chat bot.",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],

	callback: async (client, interaction) => {
		await interaction.deferReply();
		const configuration = new Configuration({
			apiKey: process.env.AIAPI,
		});
		const openai = new OpenAIApi(configuration);
		try {
			const messageLog = await gptLog.findOne({ name: "Conversation" });
			if (messageLog.convoLog.length >= 50) {
				messageLog.convoLog.shift();
			}
			messageLog.convoLog.push(`${interaction.user.username}: ${interaction.options.getString("prompt")}`);
			const result = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `${client.user.username} is a friendly chatbot
                ${client.user.username}: Hello, how can I help you?${messageLog.convoLog}
                ${client.user.username}:`,
				max_tokens: 500,
				temperature: 0.2,
				user: interaction.user.username,
			});
			if (messageLog.convoLog.length >= 50) {
				messageLog.convoLog.shift();
			}
			messageLog.convoLog.push(`${client.user.username}:${result.data.choices[0].text}`);
			await messageLog.save();

			let outputEmbed = new EmbedBuilder()
				.setColor(0x562d1a)
				.setTitle(`ChatGPT`)
				.addFields(
					{
						name: "Input:",
						value: "```\n" + `${interaction.options.getString("prompt")}` + "```",
					},
					{
						name: "Output:",
						value: "```\n" + `${result.data.choices[0].text}` + "```",
					},
				);
			interaction.editReply({ embeds: [outputEmbed] });
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
