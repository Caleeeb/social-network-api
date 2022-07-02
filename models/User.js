const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Thought",
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "Thought",
		},
	],
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
	},
	toJSON: {
		virtuals: true,
		getters: true,
	},
	id: false,
});

// TODO: friend count
const User = model("User", userSchema);

module.exports = User;
