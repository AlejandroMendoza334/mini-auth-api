const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res) => {
  console.log("📩 Datos recibidos:", req.body);

  try {
    const { email, password, role } = req.body;
    const user = await User.create({ email, password, role });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error("❌ Error en el registro:", err);

    if (err.code === 11000) {
      // Error de clave duplicada en MongoDB
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    res.status(400).json({ error: "Error en el registro" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: "Error en el login" });
  }
};

