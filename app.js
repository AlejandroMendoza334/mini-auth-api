require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("🚀 MiniAuth API corriendo en línea");
});

app.use(express.json());

app.use("/api/auth", authRoutes);

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
  })
  .catch((err) => console.log("❌ Error al conectar:", err));
