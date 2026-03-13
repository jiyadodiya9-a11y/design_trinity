// ========================
//   QUIZ DATA
// ========================

const questions = [
  {
    q: "How long is one year on Mercury?",
    options: ["365 days", "88 days", "59 days", "176 days"],
    answer: 1,
    hint: "Mercury orbits the Sun in just 88 Earth days!"
  },
  {
    q: "How many moons does Mercury have?",
    options: ["1", "2", "3", "0"],
    answer: 3,
    hint: "Mercury has no moons at all."
  },
  {
    q: "What is the maximum temperature on Mercury's day side?",
    options: ["100°C", "250°C", "430°C", "700°C"],
    answer: 2,
    hint: "The day side reaches up to 430°C!"
  },
  {
    q: "What makes up 85% of Mercury's radius?",
    options: ["Rock crust", "Water", "Iron core", "Magma"],
    answer: 2,
    hint: "Mercury has a huge iron core — the largest relative to planet size!"
  },
  {
    q: "What surprising thing exists at Mercury's poles?",
    options: ["Volcanoes", "Water ice", "Forests", "Oceans"],
    answer: 1,
    hint: "Water ice hides in permanently shadowed craters at the poles."
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
    msg = "🏆 Perfect! You are a Mercury expert!";
  } else if (score >= 3) {
    msg = "👍 Good job! You know Mercury well.";
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
