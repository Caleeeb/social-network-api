const router = require("express").Router();

// the requirements
const {
	createThought,
	getAllThoughts,
	getThoughtById,
	updateThought,
	deleteThought,
	newReaction,
	deleteReaction,
} = require("../../controllers/thoughts-controller");

// ROUTE: /api/thoughts
router.route("/").get(getAllThoughts);

// ROUTE: /api/thoughts/:id
router
	.route("/:id")
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought);

// ROUTE: /api/thoughts/:userId
router.route("/:userId").post(createThought);

// ROUTE: /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(newReaction);

// ROUTE: /api/thoughts/:thoughtId/reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
