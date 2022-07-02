const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		minlength: 1,
		maxlength: 280,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// use moment instead?
		get: (createdAtVal) => dateFormat(createdAtVal),
	},
	toJSON: {
		virtuals: true,
		getters: true,
	},
	id: false,
});

// TODO: reactions (replies)

// create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
