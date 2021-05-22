const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const UserController = require("../controllers/userController");
const checkRole = require("../middleware/checkRole");

//@desc signUp an User
//@route = POST /api/user/signup
router.post("/signup", UserController.userSignUp);

//@desc Login an User
//@route = POST /api/user/login
router.post("/login", UserController.userLogin);

//@desc Delete an User
//@route = GET /api/userdelete
//@query = userId
router.delete("/", checkAuth, checkRole, UserController.deleteUser);

//@desc signOut an User
//@route = GET /api/user/signOut
router.post("/signout", checkAuth, UserController.signout);

//router.post('/resetPassword',checkAuth,UserController.resetPassword);

module.exports = router;
