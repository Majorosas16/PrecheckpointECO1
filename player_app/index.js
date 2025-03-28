const socket = io("http://localhost:5050", { path: "/rea-time" });

const register = document.getElementById("register"); //div
const startGame = document.getElementById("startGame"); //div

const nameInput = document.getElementById("nameInput"); //nameInput
const joinBtn = document.getElementById("joinBtn"); //joinBtn
const namePlayer = document.getElementById("namePlayer"); //namePlayer
const role = document.getElementById("role"); //role
const optionN = document.getElementById("optionN"); //optionN
const wait = document.getElementById("wait"); //wait

joinBtn.addEventListener("click", registerUser);

startGame.style.display = "none";

let playerRole = "";
let idPlayer = 0;
let username = "";

// users register http method
function registerUser() {
  
    fetch("http://localhost:5050/join-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //La data que me llega del servidor (id,role,name)
        alert(data.message);
  
        idPlayer = data.id;
        username = data.name;
        playerRole = data.role;
        const players = data.numberOfPlayers;
  
        startGame.style.display = "block";
  
        //appears in players screen
        namePlayer.innerHTML = username;
        role.innerHTML = `${playerRole}`;
  
        nameInput.style.display = "none";
        joinBtn.style.display = "none";
  
        if (players === 4) {
        //   startGame();
        }
      })
      .catch((error) => console.error("Error:", error));
  }


socket.on("notificar-dia", (data) => {
  if(data.players.role === "Lobo"){
    console.log("Esto es para ti Lobo");
  
    optionN.innerHTML= data.message
  }else{
    console.log("Esto es para ti Aldeano");
    optionN.innerHTML= data.message
    wait.innerHTML= data.players
  }
});

socket.on("notificar-noche", (data) => {
  
});
