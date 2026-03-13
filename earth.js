// ========================
//   QUIZ DATA
// ========================

const questions = [
  {
    q: "What percentage of Earth's surface is covered by water?",
    options: ["50%", "61%", "71%", "81%"],
    answer: 2,
    hint: "About 71% of Earth's surface is covered by oceans, lakes, and rivers!"
  },
  {
    q: "How many moons does Earth have?",
    options: ["0", "1", "2", "3"],
    answer: 1,
    hint: "Earth has exactly one natural moon, simply called 'The Moon'."
  },
  {
    q: "How long does it take Earth to orbit the Sun?",
    options: ["24 hours", "30 days", "365.25 days", "400 days"],
    answer: 2,
    hint: "Earth takes 365.25 days to complete one orbit — that extra 0.25 gives us a leap year every 4 years!"
  },
  {
    q: "What is Earth's atmosphere mostly made of?",
    options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
    answer: 3,
    hint: "Earth's atmosphere is 78% nitrogen and only 21% oxygen."
  },
  {
    q: "How old is planet Earth?",
    options: ["1 billion years", "2.5 billion years", "4.5 billion years", "10 billion years"],
    answer: 2,
    hint: "Earth formed about 4.5 billion years ago from a cloud of gas and dust around the young Sun."
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
    msg = "🏆 Perfect! You are an Earth expert!";
  } else if (score >= 3) {
    msg = "👍 Good job! You know Earth well.";
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
