const { Schema, model } = require("mongoose");

const logSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	convoLog: {
		type: Array,
		required: true,
	},
});

module.exports = model("gptLog", logSchema);
