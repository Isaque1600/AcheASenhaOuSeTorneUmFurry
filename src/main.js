import "./style.css";

const init = () => {
  const passwordInput = document.getElementById("password");
  const feedbackContainer = document.getElementById("feedback");

  const checkPasswordLength = (password) => {
    const lengthFeedback = document.getElementById("rule-1").children[0].children[0];
    lengthFeedback.textContent = password.length >= 5 ? "✅" : "❌";
  };

  const checkPasswordHaveNumber = (password) => {
    const ruleTwoStatus = document.getElementById("rule-2").children[0].children[0];
    ruleTwoStatus.textContent = password.match(/\d+/) ? "✅" : "❌";
  }

  const checkPasswordHaveSpecialCharacters = (password) => {
    const ruleThreeStatus = document.getElementById("rule-3").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[^a-zA-Z0-9\s]/) ? "✅" : "❌";
  }

  const checkPasswordHaveLetterInUpperCase = (password) => {
    const ruleThreeStatus = document.getElementById("rule-4").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[A-Z]/) ? "✅" : "❌";
  }

  passwordInput.addEventListener("input", (e) => {
    checkPasswordLength(e.target.value);
    checkPasswordHaveNumber(e.target.value);
    checkPasswordHaveSpecialCharacters(e.target.value);
    checkPasswordHaveLetterInUpperCase(e.target.value);
  });
};

init();
