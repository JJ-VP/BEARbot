const { Schema, model } = require("mongoose");

const logSchema = new Schema({
	server: {
		type: Number,
		required: true,
	},
	roles: {
		type: Array,
		required: true,
	},
});

module.exports = model("selfRoles", logSchema);
