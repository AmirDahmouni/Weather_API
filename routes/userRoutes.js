const express = require('express')
const isAuth = require("../middlewares/checkAuth"); //middlewares
const userController = require("../controllers/User")
const error = require("../middlewares/error")
const router = express.Router();

router.post('/signin', userController.signin, error);
router.post('/signup', userController.register, error);
router.put('/rmfavoris', isAuth, userController.removefavoris, error);
router.put('/addfavoris', isAuth, userController.addfavoris, error);



module.exports = router;