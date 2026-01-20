/* ============================
   QUIZ ENGINE – FINAL STABLE
============================ */

const params = new URLSearchParams(location.search);
const quizKey = params.get("quiz");

let questions = [];
let current = 0;

/* ============================
   TIMER
============================ */
let timer = null;
let time = 0;
const MAX_TIME = 25;
let quizPaused = false;

/* ============================
   CHATGPT TAB
============================ */
let gptTab = null;

/* ============================
   DOM ELEMENTS
============================ */
const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const skipBtn = document.getElementById("skipBtn");
const nextBtn = document.getElementById("nextBtn");
const solutionBtn = document.getElementById("solutionBtn");
const timerCircle = document.getElementById("timerCircle");
const timeText = document.getElementById("timeText");

/* ============================
   QUIZ MAPPING
============================ */
const quizMap = {
   dl: ["cs_dl_t1", "cs_dl_t2"],
  digital_logic: ["cs_dl_t1", "cs_dl_t2"],
  coa: ["cs_coa_t1", "cs_coa_t2"],
  operating_system: ["cs_os_t1", "cs_os_t2"],
  os: ["cs_os_t1", "cs_os_t2"],
  dbms: ["cs_dbms_t1", "cs_dbms_t2"],
  data_structure: ["cs_dsa_t1", "cs_dsa_t2"],
  ds: ["cs_dsa_t1", "cs_dsa_t2"],
  oops: ["cs_oops_t1", "cs_oops_t2"],
  cpp: ["cs_cpp_t1", "cs_cpp_t2"],
  software_engineering: ["cs_se_t1", "cs_se_t2"],
  se: ["cs_se_t1", "cs_se_t2"],
  net: ["cs_net_t1", "cs_net_t2"]
};

/* ============================
   LOAD QUESTIONS
============================ */
fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {

    questions = [];

    // ✅ Chapter-wise quiz
    if (quizMap[quizKey]) {
      quizMap[quizKey].forEach(key => {
        if (Array.isArray(data[key])) {
          questions.push(...data[key]);
        }
      });
    }

    // ✅ Random quiz = ONLY FLT
    if (quizKey === "random") {
      for (let i = 1; i <= 15; i++) {
        const key = `FLT_${String(i).padStart(2, "0")}`;
        if (Array.isArray(data[key])) {
          questions.push(...data[key]);
        }
      }
    }

    // Shuffle
    questions.sort(() => Math.random() - 0.5);

    if (!questions.length) {
      qEl.innerText = "❌ No questions found";
      optEl.innerHTML = "";
      return;
    }

    loadQuestion();
  });

/* ============================
   LOAD QUESTION
============================ */
function loadQuestion() {
  stopTimer();
  time = 0;

  const q = questions[current];

  progressEl.innerText = `Q${current + 1} / ${questions.length}`;
  qEl.innerText = `Q${current + 1}. ${q.q}`;

  optEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  solutionBtn.classList.add("hidden");

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(idx);
    optEl.appendChild(btn);
  });

  startTimer();
}

/* ============================
   ANSWER HANDLER
============================ */
function handleAnswer(selected) {
  stopTimer();

  const q = questions[current];
  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add("correct");
    if (idx === selected && selected !== q.answer)
      btn.classList.add("wrong");
  });

  nextBtn.classList.remove("hidden");
  solutionBtn.classList.remove("hidden");

  solutionBtn.onclick = () => openGPT(q);
}

/* ============================
   NEXT / SKIP
============================ */
nextBtn.onclick = nextQuestion;
skipBtn.onclick = nextQuestion;

function nextQuestion() {
  stopTimer();
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    qEl.innerText = "🎉 Quiz Completed!";
    optEl.innerHTML = "";
    progressEl.innerText = "";
  }
}

/* ============================
   TIMER
============================ */
function startTimer() {
  stopTimer();
  if (quizPaused) return;

  updateTimer();

  timer = setInterval(() => {
    if (quizPaused) return;

    time++;
    updateTimer();

    if (time >= MAX_TIME) {
      nextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function updateTimer() {
  timeText.innerText = time;
  const dash = 226 - (226 * time) / MAX_TIME;
  timerCircle.style.strokeDashoffset = dash;
}

/* ============================
   TAB VISIBILITY CONTROL
============================ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    quizPaused = true;
    stopTimer();
  } else {
    quizPaused = false;
    startTimer();
  }
});

/* ============================
   CHATGPT SOLUTION
============================ */
function openGPT(q) {

  quizPaused = true;
  stopTimer();

  const prompt = `
Please explain the following MCQ clearly:

Question:
${q.q}

Options:
A. ${q.options[0]}
B. ${q.options[1]}
C. ${q.options[2]}
D. ${q.options[3]}
E. ${q.options[4]}

Correct Answer: ${q.options[q.answer]}

Requirements:
1. Explain why the correct option is correct and entire related topics 
2. Explain why other options are incorrect and related topics in sort
3. Explain the complete related Computer Science topic which is relatated to question
4. Strictly follow BPSC TRE-4 CS / Bihar STET Paper-2 syllabus
5. Language: Hinglish me samjhao
6. Level: BPSC TRE Computer Science / EMRS / DSSSB CS/ PGT CS Paper

Include:
• Exam points
• Common traps
`;

  const url =
    "https://chat.openai.com/?prompt=" +
    encodeURIComponent(prompt);

  if (!gptTab || gptTab.closed) {
    gptTab = window.open(url, "_blank");
  } else {
    gptTab.location.href = url;
    gptTab.focus();
  }
}
