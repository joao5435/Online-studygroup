document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(res => res.text())
    .then(data => {
      alert(data);
    })
    .catch(() => alert("Erro ao se cadastrar"));
});
