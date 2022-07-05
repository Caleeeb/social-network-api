const router = require("express").Router();

// the user route requirements
const {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/users-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);
// /api/users/:_id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
