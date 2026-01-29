import "./style.css";

const init = () => {
  const passwordInput = document.getElementById("password");
  const feedbackContainer = document.getElementById("feedback");

  const randomNumberElement = document.getElementById("random-number");
  const number = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

  randomNumberElement.textContent = number;

  const checkPasswordLength = (password) => {
    const lengthFeedback =
      document.getElementById("rule-1").children[0].children[0];
    lengthFeedback.textContent = password.length >= 5 ? "✅" : "❌";
  };

  const checkPasswordHaveNumber = (password) => {
    const ruleTwoStatus =
      document.getElementById("rule-2").children[0].children[0];
    ruleTwoStatus.textContent = password.match(/\d+/) ? "✅" : "❌";
  };

  const checkPasswordHaveSpecialCharacters = (password) => {
    const ruleThreeStatus =
      document.getElementById("rule-3").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[^a-zA-Z0-9\s]/)
      ? "✅"
      : "❌";
  };

  const checkPasswordHaveLetterInUpperCase = (password) => {
    const ruleThreeStatus =
      document.getElementById("rule-4").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[A-Z]/) ? "✅" : "❌";
  };

  const checkTeacherName = (password) => {
    const names = [
      "jucelio",
      "rosangela",
      "rebeca",
      "geovane",
      "caio",
      "lucas",
      "rogério",
      "mikaelle",
    ];
    const ruleFiveStatus =
      document.getElementById("rule-5").children[0].children[0];
    const lowerCasePassword = password.toLowerCase();
    const containsName = names.filter((name) =>
      lowerCasePassword.includes(name),
    );
    ruleFiveStatus.textContent = containsName.length > 0 ? "✅" : "❌";
  };

  const checkSumToRandom = (password) => {
    const ruleSixStatus =
      document.getElementById("rule-6").children[0].children[1];

    const digits = password.match(/\d/g) || [];
    const sum = digits.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    ruleSixStatus.textContent = sum === number ? "✅" : "❌";
  };

  const checkLogosNames = (password) => {
    const ruleSevenStatus =
      document.getElementById("rule-7").children[0].children[0];

    const logosNames = ["claude", "gemini", "ollama"];
    const lowerCasePassword = password.toLowerCase();
    const containsLogoName = logosNames.some((name) =>
      lowerCasePassword.includes(name),
    );
    ruleSevenStatus.textContent = containsLogoName ? "✅" : "❌";
  };

  passwordInput.addEventListener("input", (e) => {
    checkPasswordLength(e.target.value);
    checkPasswordHaveNumber(e.target.value);
    checkPasswordHaveSpecialCharacters(e.target.value);
    checkPasswordHaveLetterInUpperCase(e.target.value);
    checkTeacherName(e.target.value);
    checkSumToRandom(e.target.value);
    checkLogosNames(e.target.value);
  });
};

init();
