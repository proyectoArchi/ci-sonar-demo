const API = "http://localhost:3000";

function register() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  fetch(API + "/register", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("msg").innerText =
        data.status === "ok" ? "Registrado correctamente" : "Error al registrar";
    });
}

function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  fetch(API + "/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("msg").innerText =
        data.status === "ok" ? "Login exitoso" : data.message;
    });
}
