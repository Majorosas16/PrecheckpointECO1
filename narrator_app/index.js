const socket = io("http://localhost:5050", { path: "/rea-time" });

const choose = document.getElementById("choose"); //div

const dayBtn = document.getElementById("dayBtn"); //dayBtn
const nightBtn = document.getElementById("nightBtn"); //nightBtn

dayBtn.addEventListener("click", dayChoose);
nightBtn.addEventListener("click", nightChoose);

//Upper ready

function dayChoose() {

  console.log("Diste click en día");
  
  fetch("http://localhost:5050/notificar-dia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Día",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => console.error("Error:", error));
}

function nightChoose() {

  console.log("Diste click en noche");

  fetch("http://localhost:5050/notificar-noche", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Noche",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => console.error("Error:", error));
}