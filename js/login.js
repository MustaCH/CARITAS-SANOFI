const form = document.getElementById("login-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const code = document.getElementById("code").value;
  fetch("data/data.json")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find((u) => u.code === code);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.replace("profile.html");
      } else {
        alert("Código inválido. Intente otra vez");
      }
    })
    .catch((error) => {
      console.error("Error al cargar los perfiles:", error);
      alert("Error al cargar los perfiles. Intente de nuevo más tarde.");
    });
});
