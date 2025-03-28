const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/player-app", express.static(path.join(__dirname, "player_app")));
app.use("/narrator-app", express.static(path.join(__dirname, "narrator_app")));

let players = [];
const roles = ["Lobo", "Lobo", "Aldeano", "Aldeano"];
let availableRoles = [...roles];

app.get("/players", (req, res) => {
  res.send(players);
});

app.post("/join-game", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

  const assignRole = () => {
    const i = Math.floor(Math.random() * availableRoles.length);
    return availableRoles.splice(i, 1)[0];
  };
  
  console.log(availableRoles);

  const user = {
    id: players.length + 1,
    name,
    rol: assignRole(),
  };

  players.push(user);

  if (players.length > 4) {
    return res
      .status(400)
      .json({ message: "Error! No more players, There are 4 players now" });
  }

  console.log("Super el registro:", players);

  res.status(201).json({
    message: "Usuario registrado",
    id: user.id,
    role: user.rol,
    name: user.name,
    numberPlayers: players.length
  });

});
  
  
app.post("/notificar-dia", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

if (players.length < 4) {
  return res
  .status(400)
  .json({ message: "Los jugadores no están completo, Se paciente!" });
}

io.emit("notificar-dia", {message:message, players:players});
});

app.post("/notificar-noche", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

if (players.length < 4) {
  return res
  .status(400)
  .json({ message: "Los jugadores no están completo, Se paciente!" });
}
});

httpServer.listen(5050);
console.log("Server on: http://localhost:5050");
