// ========================
//   QUIZ DATA
// ========================

const questions = [
  {
    q: "Why is Mars called the Red Planet?",
    options: [
      "It reflects red sunlight",
      "Its surface is covered with iron oxide (rust)",
      "It has red clouds",
      "It is very hot"
    ],
    answer: 1,
    hint: "Mars gets its red color from iron oxide — basically rust — covering its surface."
  },
  {
    q: "How many moons does Mars have?",
    options: ["0", "1", "2", "4"],
    answer: 2,
    hint: "Mars has 2 small moons named Phobos and Deimos."
  },
  {
    q: "What is the name of the tallest volcano on Mars?",
    options: ["Mount Everest", "Valles Marineris", "Olympus Mons", "Mauna Kea"],
    answer: 2,
    hint: "Olympus Mons is 21 km tall — nearly 3 times the height of Mount Everest!"
  },
  {
    q: "How long is one year on Mars?",
    options: ["365 days", "500 days", "687 days", "900 days"],
    answer: 2,
    hint: "Mars takes 687 Earth days to complete one orbit around the Sun."
  },
  {
    q: "What is Mars's atmosphere mostly made of?",
    options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
    answer: 3,
    hint: "Mars has a very thin atmosphere that is about 95% carbon dioxide."
  }
];

// ========================
//   QUIZ STATE
// ========================

let current  = 0;
let score    = 0;
let answered = 0;
let picked   = false;

// ========================
//   LOAD A QUESTION
// ========================

function loadQuestion() {
  picked = false;

  const q = questions[current];

  // Update progress and question text
  document.getElementById('progress-text').textContent =
    "Question " + (current + 1) + " of " + questions.length;

  document.getElementById('question-text').textContent = q.q;

  // Clear feedback and hide Next button
  document.getElementById('feedback').textContent = "";
  document.getElementById('feedback').style.color = "#aaa";
  document.getElementById('btn-next').style.display = "none";

  // Build option buttons
  const optDiv = document.getElementById('options');
  optDiv.innerHTML = "";

  q.options.forEach(function(opt, i) {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = function() {
      checkAnswer(i);
    };
    optDiv.appendChild(btn);
  });
}

// ========================
//   CHECK ANSWER
// ========================

function checkAnswer(index) {
  // Prevent clicking again after answering
  if (picked) return;
  picked = true;
  answered++;

  const q = questions[current];
  const buttons = document.querySelectorAll('.options button');

  // Disable all buttons and highlight correct / wrong
  buttons.forEach(function(btn, i) {
    btn.disabled = true;
    if (i === q.answer) {
      btn.classList.add('correct');
    } else if (i === index) {
      btn.classList.add('wrong');
    }
  });

  // Show feedback message
  const fb = document.getElementById('feedback');
  if (index === q.answer) {
    score++;
    fb.textContent = "✅ Correct! " + q.hint;
    fb.style.color = "#00ff88";
  } else {
    fb.textContent = "❌ Wrong. " + q.hint;
    fb.style.color = "#ff4444";
  }

  // Update live score display
  document.getElementById('score').textContent    = score;
  document.getElementById('answered').textContent = answered;

  // Show Next button
  document.getElementById('btn-next').style.display = "inline-block";
}

// ========================
//   NEXT QUESTION
// ========================

function nextQuestion() {
  current++;

  if (current >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

// ========================
//   SHOW FINAL RESULT
// ========================

function showResult() {
  // Hide quiz area, show result box
  document.getElementById('quiz-area').style.display  = "none";
  document.getElementById('result-box').style.display = "block";

  // Show final score
  document.getElementById('result-score').textContent =
    score + " / " + questions.length;

  // Show result message based on score
  let msg = "";
  if (score === questions.length) {
    msg = "🏆 Perfect! You are a Mars expert!";
  } else if (score >= 3) {
    msg = "👍 Good job! You know Mars well.";
  } else {
    msg = "📖 Keep learning! Review the facts above and try again.";
  }

  document.getElementById('result-msg').textContent = msg;
}

// ========================
//   RESTART QUIZ
// ========================

function restartQuiz() {
  // Reset all state
  current  = 0;
  score    = 0;
  answered = 0;
  picked   = false;

  // Reset score display
  document.getElementById('score').textContent    = 0;
  document.getElementById('answered').textContent = 0;

  // Show quiz area, hide result box
  document.getElementById('quiz-area').style.display  = "block";
  document.getElementById('result-box').style.display = "none";

  // Load first question
  loadQuestion();
}

// ========================
//   START THE QUIZ
// ========================

loadQuestion();
