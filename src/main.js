import "./style.css";

let time = 60;
let intervalId;

const init = () => {
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    const startContainer = document.getElementById("start-container");
    const gameContainer = document.getElementById("game-container");

    startContainer.setAttribute("hidden", "");
    gameContainer.removeAttribute("hidden");
    displayTimer();
    gameScreen();
  });
};

const displayTimer = () => {
  const timerDiv = document.getElementById("timer");

  const contador = () => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    timerDiv.textContent = `${hours}:${minutes}:${seconds}`;
    if (timerDiv.hasAttribute("hidden")) {
      timerDiv.removeAttribute("hidden");
    }

    if (time === 0) {
      const loseContainer = document.getElementById("lose-container");
      const passwordInput = document.getElementById("password");

      loseContainer.removeAttribute("hidden");
      passwordInput.setAttribute("disabled", "true");

      clearInterval(intervalId);
    }

    time--;
  };

  intervalId = setInterval(contador, 1000);
};

const gameScreen = () => {
  const passwordInput = document.getElementById("password");

  const randomNumberElement = document.getElementById("random-number");
  const number = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

  randomNumberElement.textContent = number;

  const checkAllCorrect = () => {
    const rules = [];
    for (let i = 1; i <= 10; i++) {
      const ruleElement = document.getElementById(`rule-${i}`);
      const rulesChildrens = ruleElement.children[0].children;
      const status = rulesChildrens[rulesChildrens.length - 1].textContent;
      console.log(status);
      rules.push(status === "✅");
    }

    const allCorrect = rules.every((rule) => rule === true);

    console.log("Rules status:", rules);
    console.log("All rules correct:", allCorrect);

    return allCorrect;
  };

  const displayRule = (ruleId) => {
    const ruleElement = document.getElementById(ruleId);
    const ruleNumber = parseInt(ruleId.split("-")[1], 10);
    let allPrevOk = true;
    for (let i = 1; i < ruleNumber; i++) {
      const prevRuleElement = document.getElementById(`rule-${i}`).children[0]
        .children;
      const prevStatus =
        prevRuleElement[prevRuleElement.length - 1].textContent;
      if (prevStatus !== "✅") {
        allPrevOk = false;
        break;
      }
    }
    if (allPrevOk) {
      ruleElement.classList.remove("hidden");
      ruleElement.classList.add("active");
    }
  };

  const checkPasswordLength = (password) => {
    const lengthFeedback =
      document.getElementById("rule-1").children[0].children[0];
    lengthFeedback.textContent = password.length >= 5 ? "✅" : "❌";
    displayRule("rule-2");
  };

  const checkPasswordHaveNumber = (password) => {
    const ruleTwoStatus =
      document.getElementById("rule-2").children[0].children[0];
    ruleTwoStatus.textContent = password.match(/\d+/) ? "✅" : "❌";
    displayRule("rule-3");
  };

  const checkPasswordHaveSpecialCharacters = (password) => {
    const ruleThreeStatus =
      document.getElementById("rule-3").children[0].children[0];
    ruleThreeStatus.textContent = password.match(/[^a-zA-Z0-9\s]/)
      ? "✅"
      : "❌";
    displayRule("rule-4");
  };

  const checkPasswordHaveLetterInUpperCase = (password) => {
    const ruleFourStatus =
      document.getElementById("rule-4").children[0].children[0];
    ruleFourStatus.textContent = password.match(/[A-Z]/) ? "✅" : "❌";
    displayRule("rule-5");
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
    displayRule("rule-6");
  };

  const checkSumToRandom = (password) => {
    const ruleSixStatus =
      document.getElementById("rule-6").children[0].children[1];

    const digits = password.match(/\d/g) || [];
    const sum = digits.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    ruleSixStatus.textContent = sum === number ? "✅" : "❌";
    displayRule("rule-7");
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
    displayRule("rule-8");
  };

  const checkPasswordIsEmail = (password) => {
    const ruleEitghStatus =
      document.getElementById("rule-8").children[0].children[0];
    ruleEitghStatus.textContent = password.match(/.+@.+\.com$/) ? "✅" : "❌";
    displayRule("rule-9");
  };

  const checkPasswordHaveRomanNumeral = (password) => {
    const ruleNineStatus =
      document.getElementById("rule-9").children[0].children[0];
    const hasRoman = /[IVXLCDM]/.test(password);
    ruleNineStatus.textContent = hasRoman ? "✅" : "❌";
    displayRule("rule-10");
  };

  const checkPasswordHaveLeapYear = (password) => {
    const ruleTenStatus =
      document.getElementById("rule-10").children[0].children[0];
    ruleTenStatus.textContent = password.match(
      /(?:(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]|[2468][048]|[13579][26])00)/,
    )
      ? "✅"
      : "❌";
    displayRule("rule-10");
  };

  const winContainer = document.getElementById("win-container");

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

    if (checkAllCorrect()) {
      winContainer.removeAttribute("hidden");
      passwordInput.setAttribute("disabled", "true");
      clearInterval(intervalId);
    }
  });
};

init();
