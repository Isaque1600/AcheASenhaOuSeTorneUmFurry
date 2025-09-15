const init = () => {
  const passwordInput = document.getElementById("password");
  const feedbackContainer = document.getElementById("feedback");

  const checkPasswordLength = (password) => {
    const lengthFeedback = feedbackContainer.children[0].children[0];
    lengthFeedback.textContent = password.length >= 5 ? "✅" : "❌";
  };

  passwordInput.addEventListener("input", (e) => {
    checkPasswordLength(e.target.value);
  });
};

init();
