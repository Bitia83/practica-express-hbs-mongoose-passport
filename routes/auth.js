

const express = require("express");
const { loginForm, registerForm, registerUser, confirmarCuenta } = require("../controllers/authController");

const router = express.Router();

router.get("/login", loginForm)
 router.post("/register", registerUser)
router.get ("/confirmar/:token", confirmarCuenta)
router.get("/register", registerForm)


module.exports = router;
