const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
	{
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
		// these are the replies to the thoughts, array
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

// TODO: reactions (replies)
const reactionSchema = new Schema(
	{
		reactionText: {
			type: String,
			required: true,
			maxlength: 280,
		},
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
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
	},
	{
		toJSON: {
			type: String,
			getters: true,
		},
	}
);

ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

// create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
