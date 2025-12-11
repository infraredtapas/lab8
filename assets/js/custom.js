document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contact-form");
  var outputDiv = document.getElementById("contact-output");
  var popup = document.getElementById("form-success-popup");
  var popupCloseBtn = document.getElementById("popup-close-btn");
  var submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  function getErrorElement(inputEl) {
    if (!inputEl) return null;
    var next = inputEl.nextElementSibling;
    if (next && next.classList.contains("field-error")) {
      return next;
    }
    var div = document.createElement("div");
    div.className = "field-error";
    inputEl.parentNode.appendChild(div);
    return div;
  }

  function setFieldState(inputEl, message) {
    if (!inputEl) return false;
    var err = getErrorElement(inputEl);
    if (!err) return false;
    if (message) {
      err.textContent = message;
      inputEl.classList.add("is-invalid");
      inputEl.classList.remove("is-valid");
      return false;
    } else {
      err.textContent = "";
      inputEl.classList.remove("is-invalid");
      inputEl.classList.add("is-valid");
      return true;
    }
  }

  function validateNameField(id, label) {
    var el = document.getElementById(id);
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, label + " cannot be empty");
    }
    var re = /^[A-Za-z\s'-]+$/;
    if (!re.test(value)) {
      return setFieldState(el, label + " must contain only letters");
    }
    return setFieldState(el, "");
  }

  function validateEmail() {
    var el = document.getElementById("contact-email");
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, "Email cannot be empty");
    }
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      return setFieldState(el, "Email format is not valid");
    }
    return setFieldState(el, "");
  }

  function validateAddress() {
    var el = document.getElementById("contact-address");
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, "Address cannot be empty");
    }
    if (value.length < 4) {
      return setFieldState(el, "Address is too short");
    }
    return setFieldState(el, "");
  }

  function validateRatingField(id, label) {
    var el = document.getElementById(id);
    if (!el) return false;
    var value = el.value.trim();
    if (!value) {
      return setFieldState(el, label + " cannot be empty");
    }
    var num = parseFloat(value);
    if (isNaN(num) || num < 1 || num > 10) {
      return setFieldState(el, label + " must be between 1 and 10");
    }
    return setFieldState(el, "");
  }

  function handlePhoneMask() {
  var el = document.getElementById("contact-phone");
  if (!el) return;

  var digits = el.value.replace(/\D/g, "");

  if (digits.startsWith("370")) {
    digits = digits.slice(3);
  }

  if (digits.length > 8) {
    digits = digits.slice(0, 8);
  }

  var formatted = "";
  if (digits.length > 0) {
    formatted = "+370 ";
    if (digits.length <= 3) {
      formatted += digits;
    } else {
      formatted += digits.slice(0, 3) + " " + digits.slice(3);
    }
  }

  el.value = formatted;
}


  function validatePhone() {
  var el = document.getElementById("contact-phone");
  if (!el) return false;

  var digits = el.value.replace(/\D/g, "");

  if (digits.startsWith("370")) {
    digits = digits.slice(3);
  }

  if (!digits) {
    return setFieldState(el, "Phone number cannot be empty");
  }

  if (digits.length !== 8 || digits.charAt(0) !== "6") {
    return setFieldState(el, "Phone must be like +370 6xx xxxxx");
  }

  return setFieldState(el, "");
}


  function validateForm() {
    var v1 = validateNameField("contact-name", "Name");
    var v2 = validateNameField("contact-surname", "Surname");
    var v3 = validateEmail();
    var v4 = validatePhone();
    var v5 = validateAddress();
    var v6 = validateRatingField("rating-1", "Rating 1");
    var v7 = validateRatingField("rating-2", "Rating 2");
    var v8 = validateRatingField("rating-3", "Rating 3");
    var allValid = v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8;
    if (submitBtn) {
      submitBtn.disabled = !allValid;
    }
    return allValid;
  }

  var nameInput = document.getElementById("contact-name");
  var surnameInput = document.getElementById("contact-surname");
  var emailInput = document.getElementById("contact-email");
  var phoneInput = document.getElementById("contact-phone");
  var addressInput = document.getElementById("contact-address");
  var rating1Input = document.getElementById("rating-1");
  var rating2Input = document.getElementById("rating-2");
  var rating3Input = document.getElementById("rating-3");

  if (nameInput) {
    nameInput.addEventListener("input", function () {
      validateNameField("contact-name", "Name");
      validateForm();
    });
  }

  if (surnameInput) {
    surnameInput.addEventListener("input", function () {
      validateNameField("contact-surname", "Surname");
      validateForm();
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      validateEmail();
      validateForm();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      handlePhoneMask();
      validatePhone();
      validateForm();
    });
  }

  if (addressInput) {
    addressInput.addEventListener("input", function () {
      validateAddress();
      validateForm();
    });
  }

  if (rating1Input) {
    rating1Input.addEventListener("input", function () {
      validateRatingField("rating-1", "Rating 1");
      validateForm();
    });
  }

  if (rating2Input) {
    rating2Input.addEventListener("input", function () {
      validateRatingField("rating-2", "Rating 2");
      validateForm();
    });
  }

  if (rating3Input) {
    rating3Input.addEventListener("input", function () {
      validateRatingField("rating-3", "Rating 3");
      validateForm();
    });
  }

  if (popupCloseBtn && popup) {
    popupCloseBtn.addEventListener("click", function () {
      popup.classList.remove("show");
    });
  }

  if (!contactForm) {
    return;
  }

  validateForm();

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    var name = document.getElementById("contact-name").value.trim();
    var surname = document.getElementById("contact-surname").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var phone = document.getElementById("contact-phone").value.trim();
    var address = document.getElementById("contact-address").value.trim();

    var r1 = parseFloat(document.getElementById("rating-1").value) || 0;
    var r2 = parseFloat(document.getElementById("rating-2").value) || 0;
    var r3 = parseFloat(document.getElementById("rating-3").value) || 0;

    var average = (r1 + r2 + r3) / 3;
    average = Math.round(average * 10) / 10;

    var formData = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      address: address,
      rating1: r1,
      rating2: r2,
      rating3: r3,
      averageRating: average
    };

    console.log("Contact form data:", formData);

    if (outputDiv) {
      var html = "";
      html += "<p><strong>Name:</strong> " + name + "</p>";
      html += "<p><strong>Surname:</strong> " + surname + "</p>";
      html += "<p><strong>Email:</strong> " + email + "</p>";
      html += "<p><strong>Phone number:</strong> " + phone + "</p>";
      html += "<p><strong>Address:</strong> " + address + "</p>";
      html += "<p><strong>Rating 1:</strong> " + r1 + "</p>";
      html += "<p><strong>Rating 2:</strong> " + r2 + "</p>";
      html += "<p><strong>Rating 3:</strong> " + r3 + "</p>";
      html += '<p><strong>Average rating:</strong> ' +
        '<span id="average-value" class="average-rating-value">' +
        average +
        "</span></p>";
      outputDiv.innerHTML = html;
    }

    setAverageColor(average);

    if (popup) {
      popup.classList.add("show");
    }
  });

  function setAverageColor(avg) {
    var avgElement = document.getElementById("average-value");
    if (!avgElement) {
      return;
    }
    avgElement.className = "average-rating-value";
    if (avg >= 0 && avg < 4) {
      avgElement.classList.add("avg-low");
    } else if (avg >= 4 && avg < 7) {
      avgElement.classList.add("avg-mid");
    } else if (avg >= 7 && avg <= 10) {
      avgElement.classList.add("avg-high");
    }
  }
});

// =========================
// Memory Game - Lab 10
// =========================

document.addEventListener("DOMContentLoaded", function () {
  const memoryBoard = document.getElementById("memory-board");
  const difficultySelect = document.getElementById("memory-difficulty");
  const startBtn = document.getElementById("memory-start");
  const restartBtn = document.getElementById("memory-restart");
  const movesEl = document.getElementById("memory-moves");
  const matchesEl = document.getElementById("memory-matches");
  const totalEl = document.getElementById("memory-total");
  const timeEl = document.getElementById("memory-time");
  const bestEasyEl = document.getElementById("memory-best-easy");
  const bestHardEl = document.getElementById("memory-best-hard");
  const messageEl = document.getElementById("memory-message");

  // Eğer Memory Game section sayfada yoksa (örneğin başka sayfadaysa) hiçbir şey yapma
  if (!memoryBoard || !difficultySelect) {
    return;
  }

  // Kart verileri (en az 6 benzersiz ikon)
  const memoryItems = [
    { id: "robot", icon: "🤖" },
    { id: "rocket", icon: "🚀" },
    { id: "brain", icon: "🧠" },
    { id: "atom", icon: "⚛️" },
    { id: "laptop", icon: "💻" },
    { id: "gamepad", icon: "🎮" },
    { id: "bulb", icon: "💡" },
    { id: "planet", icon: "🪐" },
    { id: "camera", icon: "📷" },
    { id: "music", icon: "🎵" },
    { id: "book", icon: "📚" },
    { id: "coffee", icon: "☕" }
  ];

  const difficultySettings = {
    easy: { rows: 3, cols: 4 }, // 12 kart, 6 eşleşen çift
    hard: { rows: 4, cols: 6 }  // 24 kart, 12 eşleşen çift
  };

  const BEST_KEY_PREFIX = "lab10_memory_best_"; // localStorage prefix

  let currentDifficulty = "easy";
  let deck = [];
  let firstCard = null;
  let secondCard = null;
  let boardLocked = false;
  let moves = 0;
  let matches = 0;
  let totalPairs = 0;
  let gameActive = false;

  let timerId = null;
  let elapsedSeconds = 0;

  // ---------- Yardımcı fonksiyonlar ----------

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function startTimer() {
    stopTimer();
    elapsedSeconds = 0;
    timeEl.textContent = formatTime(elapsedSeconds);
    timerId = setInterval(() => {
      elapsedSeconds++;
      timeEl.textContent = formatTime(elapsedSeconds);
    }, 1000);
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function resetStats() {
    moves = 0;
    matches = 0;
    movesEl.textContent = "0";
    matchesEl.textContent = "0";
    timeEl.textContent = "00:00";
  }

  function loadBestScores() {
    const easyBest = localStorage.getItem(BEST_KEY_PREFIX + "easy");
    const hardBest = localStorage.getItem(BEST_KEY_PREFIX + "hard");
    bestEasyEl.textContent = easyBest ? easyBest : "–";
    bestHardEl.textContent = hardBest ? hardBest : "–";
  }

  function updateBestScoreIfNeeded() {
    const key = BEST_KEY_PREFIX + currentDifficulty;
    const stored = localStorage.getItem(key);
    if (!stored || moves < Number(stored)) {
      localStorage.setItem(key, String(moves));
      loadBestScores();
    }
  }

  // ---------- Oyun kurulumu ----------

  function buildDeck(difficultyKey) {
    const settings = difficultySettings[difficultyKey];
    const cardCount = settings.rows * settings.cols;
    const pairCount = cardCount / 2;
    totalPairs = pairCount;
    totalEl.textContent = String(totalPairs);

    const chosenItems = shuffle(memoryItems).slice(0, pairCount);
    const tempDeck = [];

    chosenItems.forEach((item) => {
      tempDeck.push({ ...item, uid: item.id + "-a" });
      tempDeck.push({ ...item, uid: item.id + "-b" });
    });

    deck = shuffle(tempDeck);
  }

  function renderBoard() {
    const settings = difficultySettings[currentDifficulty];
    memoryBoard.innerHTML = "";
    memoryBoard.style.setProperty("--memory-cols", settings.cols);

    deck.forEach((cardData) => {
      const card = document.createElement("button");
      card.className = "memory-card";
      card.type = "button";
      card.setAttribute("data-id", cardData.id);

      const inner = document.createElement("div");
      inner.className = "memory-card-inner";

      const front = document.createElement("div");
      front.className = "memory-card-face memory-card-front";

      const back = document.createElement("div");
      back.className = "memory-card-face memory-card-back";
      back.textContent = cardData.icon;

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      card.addEventListener("click", () => handleCardClick(card));
      memoryBoard.appendChild(card);
    });
  }

  function initGame(difficultyKey) {
    currentDifficulty = difficultyKey;
    gameActive = false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;

    stopTimer();
    resetStats();
    messageEl.textContent = "Press Start to begin.";

    buildDeck(currentDifficulty);
    renderBoard();
  }

  // ---------- Oyun akışı ----------

  function startGame() {
    gameActive = true;
    boardLocked = false;
    firstCard = null;
    secondCard = null;
    resetStats();
    stopTimer();
    startTimer();
    messageEl.textContent = "Game started! Find all pairs.";
  }

  function restartGame() {
    initGame(currentDifficulty);
    startGame();
  }

  function handleCardClick(card) {
    if (!gameActive) return;
    if (boardLocked) return;
    if (card.classList.contains("is-flipped") || card.classList.contains("is-matched")) {
      return;
    }

    card.classList.add("is-flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    if (!secondCard && card !== firstCard) {
      secondCard = card;
      moves++;
      movesEl.textContent = String(moves);
      checkForMatch();
    }
  }

  function checkForMatch() {
    if (!firstCard || !secondCard) return;

    const id1 = firstCard.getAttribute("data-id");
    const id2 = secondCard.getAttribute("data-id");

    if (id1 === id2) {
      handleMatch();
    } else {
      handleMismatch();
    }
  }

  function handleMatch() {
    firstCard.classList.add("is-matched");
    secondCard.classList.add("is-matched");
    matches++;
    matchesEl.textContent = String(matches);

    firstCard = null;
    secondCard = null;

    if (matches === totalPairs) {
      handleWin();
    }
  }

  function handleMismatch() {
    boardLocked = true;
    setTimeout(() => {
      if (firstCard) firstCard.classList.remove("is-flipped");
      if (secondCard) secondCard.classList.remove("is-flipped");
      firstCard = null;
      secondCard = null;
      boardLocked = false;
    }, 900); // yaklaşık 1 saniye
  }

  function handleWin() {
    gameActive = false;
    stopTimer();
    messageEl.innerHTML = `🎉 You win! Completed in <strong>${moves}</strong> moves and <strong>${formatTime(
      elapsedSeconds
    )}</strong>.`;
    updateBestScoreIfNeeded();
  }

  // ---------- Event listeners ----------

  difficultySelect.addEventListener("change", function () {
    const value = this.value === "hard" ? "hard" : "easy";
    initGame(value);
  });

  startBtn.addEventListener("click", function () {
    startGame();
  });

  restartBtn.addEventListener("click", function () {
    restartGame();
  });

  // İlk yüklemede best skorları ve easy board'u hazırla
  loadBestScores();
  initGame(currentDifficulty);
});
