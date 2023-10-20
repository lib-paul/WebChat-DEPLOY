const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const path = require("path");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();
connectDB();

app.use(express.json()); //Para la info que viene en JSON

//Rutas del usuario
app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

// ------------------------------- Deploy -----------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  //Ruta principal de prueba
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}

//Errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
