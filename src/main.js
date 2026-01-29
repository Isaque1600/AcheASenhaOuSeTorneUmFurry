import "./style.css";

let time = 60;

const init = () => {
  const passwordInput = document.getElementById("password");
  const feedbackContainer = document.getElementById("feedback");

  const randomNumberElement = document.getElementById("random-number");
  const number = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

  randomNumberElement.textContent = number;

  const displayRule = (ruleId, canDisplay) => {
    const ruleElement = document.getElementById(ruleId);
    if (canDisplay) {
      ruleElement.classList.remove("hidden");
      ruleElement.classList.add("active");
    }
  };

  const checkPasswordLength = (password) => {
    const lengthFeedback =
      document.getElementById("rule-1").children[0].children[0];
    lengthFeedback.textContent = password.length >= 5 ? "✅" : "❌";
    displayRule("rule-2", password.length >= 5);
  };

  const checkPasswordHaveNumber = (password) => {
    const ruleTwoStatus =
      document.getElementById("rule-2").children[0].children[0];
    ruleTwoStatus.textContent = password.match(/\d+/) ? "✅" : "❌";
    displayRule("rule-3", password.match(/\d+/));
  };

  const checkPasswordHaveSpecialCharacters = (password) => {
    const ruleThreeStatus =
      document.getElementById("rule-3").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[^a-zA-Z0-9\s]/)
      ? "✅"
      : "❌";
    displayRule("rule-4", password.match(/[^a-zA-Z0-9\s]/));
  };

  const checkPasswordHaveLetterInUpperCase = (password) => {
    const ruleFourStatus =
      document.getElementById("rule-4").children[0].children[0];
    ruleFourStatus.textContent = password.match(/[A-Z]/) ? "✅" : "❌";
    displayRule("rule-5", password.match(/[A-Z]/));
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
    displayRule("rule-6", containsName.length > 0);
  };

  const checkSumToRandom = (password) => {
    const ruleSixStatus =
      document.getElementById("rule-6").children[0].children[1];

    const digits = password.match(/\d/g) || [];
    const sum = digits.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    ruleSixStatus.textContent = sum === number ? "✅" : "❌";
    displayRule("rule-7", sum === number);
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
    displayRule("rule-8", containsLogoName);
  };

  const checkPasswordIsEmail = (password) => {
    const ruleEitghStatus =
      document.getElementById("rule-8").children[0].children[0];
    ruleEitghStatus.textContent = password.match(/.+@.+\.com$/) ? "✅" : "❌";
    displayRule("rule-9", password.match(/.+@.+\.com$/));
  };

  const checkPasswordHaveRomanNumeral = (password) => {
    const ruleNineStatus =
      document.getElementById("rule-9").children[0].children[0];
    const hasRoman = /[IVXLCDM]/.test(password);
    ruleNineStatus.textContent = hasRoman ? "✅" : "❌";
    displayRule("rule-10", hasRoman);
  };

  const checkPasswordHaveLeapYear = (password) => {
    const ruleTenStatus =
      document.getElementById("rule-10").children[0].children[0];
    ruleTenStatus.textContent = password.match(
      /(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]|[2468][048]|[13579][26])00)/,
    )
      ? "✅"
      : "❌";
    displayRule(
      "rule-10",
      password.match(
        /(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]|[2468][048]|[13579][26])00)/,
      ),
    );
  };

  passwordInput.addEventListener("input", (e) => {
    checkPasswordLength(e.target.value);
    checkPasswordHaveNumber(e.target.value);
    checkPasswordHaveSpecialCharacters(e.target.value);
    checkPasswordHaveLetterInUpperCase(e.target.value);
    checkTeacherName(e.target.value);
    checkSumToRandom(e.target.value);
    checkLogosNames(e.target.value);
    checkPasswordIsEmail(e.target.value);
    checkPasswordHaveRomanNumeral(e.target.value);
    checkPasswordHaveLeapYear(e.target.value);
  });
};

const timerDiv = document.getElementById("timer");

const contador = () => {
  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  timerDiv.textContent = `${hours}:${minutes}:${seconds}`;

  if (time === 0) {
    const loseContainer = document.getElementById("lose-container");

    loseContainer.removeAttribute("hidden");

    clearInterval(intervalId);
  }

  time--;
};

const intervalId = setInterval(contador, 1000);

init();
