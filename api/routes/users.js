const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const UserController = require("../controllers/userController");

//@desc signUp an User
//@route = POST /api/signup
router.post("/signup", UserController.userSignUp);

//@desc Login an User
//@route = POST /api/login
router.post("/login", UserController.userLogin);

//@desc Delete an User
//@route = GET /api/delete
router.delete("/", checkAuth, UserController.deleteUser);

//@desc signOut an User
//@route = GET /api/signOut
router.post("/signout", checkAuth, UserController.signout);

module.exports = router;
