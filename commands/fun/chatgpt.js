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
		{
			name: "delete-my-data",
			description: "Delete your message history, if set to true prompt is ignored.",
			type: ApplicationCommandOptionType.Boolean,
			default: false,
		},
	],

	callback: async (client, interaction) => {
		const clear = interaction.options.getBoolean("delete-my-data");
		if (clear) {
			const toDelete = await gptLog.findOne({ name: `${interaction.user.tag}` });
			if (toDelete) {
				toDelete.deleteOne();
				await interaction.reply({ content: "You data has been deleted!", ephemeral: true });
			} else {
				await interaction.reply({ content: "We have no data on you, so we regret to inform you that we were unable to delete nothing!", ephemeral: true });
			}
			return;
		}
		await interaction.deferReply();
		const configuration = new Configuration({
			apiKey: process.env.AIAPI,
		});
		const openai = new OpenAIApi(configuration);
		try {
			const user = interaction.user.tag;
			const userName = interaction.member.displayName;
			const prompt = interaction.options.getString("prompt");
			const bot = client.user.username;
			let messageLog = await gptLog.findOne({ name: `${user}` });
			if (!messageLog) {
				const newMessageLog = new gptLog({
					name: `${user}`,
					convoLog: `${bot} is a friendly chat bot.`,
				});
				await newMessageLog.save();
				messageLog = await gptLog.findOne({ name: `${user}` });
			}

			try {
				const result = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: `${messageLog.convoLog.join("\n")}\n${userName}: ${prompt}\n${bot}:`,
					max_tokens: 500,
					temperature: 0.2,
					user: user,
				});

				actualResult = result.data.choices[0].text.trim();

				while (messageLog.convoLog.length >= 9) {
					messageLog.convoLog.shift();
				}
				messageLog.convoLog.push(`${userName}: ${prompt}`);
				messageLog.convoLog.push(`${bot}: ${actualResult}`);

				await messageLog.save();
				responseType = "Output";
			} catch (error) {
				actualResult = `${error.response.data.error.message}\nRequest failed with status code ${error.response.status}: ${error.response.statusText}`;
				responseType = "ERROR";
			}

			let outputEmbed = new EmbedBuilder()
				.setColor(0x562d1a)
				.setTitle(`ChatGPT`)
				.addFields(
					{
						name: "Input:",
						value: "```\n" + `${prompt}` + "```",
					},
					{
						name: `${responseType}:`,
						value: "```\n" + `${actualResult}` + "```",
					},
				);
			interaction.editReply({ embeds: [outputEmbed] });
		} catch (e) {
			error.error(client, e, interaction);
		}
	},
};
