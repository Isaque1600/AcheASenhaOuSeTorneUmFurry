function init() {
  const passwordInput = document.getElementById("password");
  const feedbackContainer = document.getElementById("feedback");

  passwordInput.addEventListener("input", (e) => {
    console.log(e.target.value);

    if (e.target.value == "teste") {
      feedbackContainer.innerHTML = "Senha correta!";
    } else {
      feedbackContainer.innerHTML = "Senha incorreta!";
    }
  });
}

init();
