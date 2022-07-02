const { Thought, User } = require("../models");

// creates thought controller
const thoughtController = {
	// POST thought
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thought: _id } },
					{ new: true }
				);
			})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thohgts found at this id." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

  // GET alllll them thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({ path: "reactions", select: "-__v" })
    .select("-__v")
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

	// GET thought via is
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.populate({ path: "reactions", select: "-__v" })
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(400).json({ message: "No thoguht was found at this id." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	// UPDATE thought
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
    .select("-__v")
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(400).json({ message: "No thoguht was found at this id." });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err));
	},

  // DELETE thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
    if (!dbThoughtData) {
      res.status(400).json({ message: "No thoguht was found at this id." });
      return;
    }
    res.json(dbThoughtData);
  })
  .catch((err) => {
    console.log(err));
  }
  // TODO: reaction cREATE and DELETE
};
