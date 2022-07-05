const { User } = require("../models");

// create User controller
const userController = {
	// CREATE user
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// GET all users
	getAllUsers(req, res) {
		User.find({})
			.populate({ path: "thoughts", select: "-__v" })
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// GET user
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({ path: "thoughts", select: "-__v" })
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found at this id." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//UPDATE users
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found at this id." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// DELETE user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id }, res)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found at this id." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	// CREATE friend
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: params.friendId } },
			{ new: true }
		)
			.populate({ path: "friends", select: "-__v" })
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found at this id." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	// DELETE that friend out yo life
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No friends found at this id." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(404).json(err));
	},
};

module.exports = userController;
