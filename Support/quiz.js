const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

// --- 10 KDAG-related questions ---
const allQuestions = [
  {
    question: "What does KDAG stand for?",
    options: ["Kharagpur Data Analytics Group", "KGP Data Analysis Guild", "Kharagpur Design & Analytics Group"],
    answer: "Kharagpur Data Analytics Group"
  },
  {
    question: "Which IIT hosts KDAG?",
    options: ["IIT Delhi", "IIT Bombay", "IIT Kharagpur"],
    answer: "IIT Kharagpur"
  },
  {
    question: "What is the flagship event of KDAG?",
    options: ["Savsikar", "Hackathon", "ML Sprint"],
    answer: "Savsikar"
  },
  {
    question: "Which domain is KDAG primarily focused on?",
    options: ["Robotics", "Data Analytics", "Blockchain"],
    answer: "Data Analytics"
  },
  {
    question: "Savsikar is held in which semester?",
    options: ["Autumn", "Spring", "Summer"],
    answer: "Spring"
  },
  {
    question: "KDAG maintains which online resource?",
    options: ["DSA Sheet", "ML Sheet", "Physics Notes"],
    answer: "ML Sheet"
  },
  {
    question: "What does the KDAG website provide?",
    options: ["Events, Blogs, Resources", "Only course materials", "Only event registrations"],
    answer: "Events, Blogs, Resources"
  },
  {
    question: "Which type of problems does KDAG’s ML Sheet cover?",
    options: ["Machine Learning", "Operating Systems", "Compiler Design"],
    answer: "Machine Learning"
  },
  {
    question: "Which event by KDAG involves group discussions and problem-solving?",
    options: ["Savsikar", "GD Marathon", "Analytics Meet"],
    answer: "Savsikar"
  },
  {
    question: "Which of these is a KDAG activity?",
    options: ["Publishing blogs", "Organizing hackathons", "Both"],
    answer: "Both"
  }
];

// Pick 5 random questions
function getRandomQuestions() {
  let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

// Start quiz
startBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  selectedQuestions = getRandomQuestions();
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  loadQuestion();
});

// Load question
function loadQuestion() {
  resetState();
  let currentQuestion = selectedQuestions[currentQuestionIndex];
  questionText.innerText = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsContainer.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(button, correctAnswer) {
  const isCorrect = button.innerText === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // Disable all buttons
  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  nextBtn.classList.remove("hidden");
}

// Reset for next question
function resetState() {
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = "";
}

// Next question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show result
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.innerText = `You answered ${score} out of ${selectedQuestions.length} correctly!`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  selectedQuestions = getRandomQuestions();
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  loadQuestion();
});
