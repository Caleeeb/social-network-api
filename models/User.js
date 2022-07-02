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

//  friend count
UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

// create the User model using the userSchema
const User = model("User", userSchema);

module.exports = User;
