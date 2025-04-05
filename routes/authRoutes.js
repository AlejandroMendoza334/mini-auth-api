const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🟢 Usa las funciones desde el objeto 'authController'
router.post("/register", authController.register);
router.post("/login", authController.login);

// Rutas protegidas opcionales:
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({ msg: `Bienvenido ${req.user.role}` });
});

router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ msg: "Ruta solo para admin" });
});

module.exports = router;
