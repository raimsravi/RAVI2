/* ======================================
   FINAL UNIVERSAL TEST + QUIZ ENGINE
   SUPPORTS:
   - Chapter Tests
   - Full Length Tests
   - Chapter-wise Quiz (T1 + T2 merged)
   - Random Quiz (FLT_01 → FLT_15)
====================================== */

/* ---------- URL PARAMS ---------- */
const params = new URLSearchParams(location.search);
const TEST_ID = params.get("test");   // normal test
const QUIZ_ID = params.get("quiz");   // quiz mode

/* ---------- GLOBAL STATE ---------- */
let questions = [];
let index = 0;
let answers = [];
let review = [];

/* ---------- DOM ---------- */
const qno = document.getElementById("qno");
const qText = document.getElementById("question");
const optBox = document.getElementById("options");
const palette = document.getElementById("palette");

/* ---------- LOAD QUESTIONS ---------- */
fetch("data/questions.json")
  .then(r => r.json())
  .then(data => {

    /* ========= NORMAL TEST ========= */
    if (TEST_ID && data[TEST_ID]) {
      questions = data[TEST_ID];
    }

  /* ========= CHAPTER-WISE QUIZ ========= */
else if (QUIZ_ID && QUIZ_ID !== "random") {
  questions = [];

  Object.keys(data).forEach(key => {
    if (key.includes("_" + QUIZ_ID + "_t")) {
      questions = questions.concat(data[key]);
    }
  });

  if (questions.length === 0) {
    alert("❌ No questions found for chapter quiz");
    console.error("QUIZ_ID:", QUIZ_ID);
    return;
  }

  shuffle(questions);
}


    /* ========= RANDOM QUIZ (FLT) ========= */
    else if (QUIZ_ID === "random") {
      questions = [];

      Object.keys(data).forEach(key => {
        if (key.startsWith("FLT_")) {
          questions = questions.concat(data[key]);
        }
      });

      if (questions.length === 0) {
        alert("❌ No FLT questions found");
        return;
      }

      shuffle(questions);
    }

    else {
      alert("❌ Invalid Test / Quiz ID");
      return;
    }

    answers = new Array(questions.length);
    review = new Array(questions.length);

    loadQuestion();
  });

/* ======================================
   QUESTION LOAD
====================================== */
function loadQuestion() {
  qno.innerText = "Question " + (index + 1);
  qText.innerText = questions[index].q;
  optBox.innerHTML = "";

  questions[index].options.forEach((o, i) => {
    const checked = answers[index] === i ? "checked" : "";
    optBox.innerHTML += `
      <label>
        <input type="radio" name="opt" value="${i}" ${checked}>
        ${o}
      </label>
    `;
  });

  updatePalette();
}

/* ======================================
   ANSWER HANDLING
====================================== */
function saveAnswer() {
  const s = document.querySelector("input[name=opt]:checked");
  if (s) answers[index] = parseInt(s.value);
}

function saveNext() {
  saveAnswer();
  if (index < questions.length - 1) index++;
  loadQuestion();
}

function clearResponse() {
  answers[index] = undefined;
  loadQuestion();
}

function markReview() {
  review[index] = true;
  saveNext();
}

function jump(i) {
  index = i;
  loadQuestion();
}

/* ======================================
   PALETTE
====================================== */
function updatePalette() {
  palette.innerHTML = "";

  questions.forEach((_, i) => {
    let cls = "";
    if (review[i]) cls = "review";
    else if (answers[i] !== undefined) cls = "answered";

    palette.innerHTML += `<button class="${cls}" onclick="jump(${i})">${i + 1}</button>`;
  });
}

/* ======================================
   SUBMIT
====================================== */
function submitTest() {
  saveAnswer();
  localStorage.questions = JSON.stringify(questions);
  localStorage.answers = JSON.stringify(answers);
  location.href = "result.html";
}

/* ======================================
   TIMER
====================================== */
let totalTime = 60 * 60; // default 60 min
if (QUIZ_ID) totalTime = 10 * 60;

let time = totalTime;
setInterval(() => {
  const m = Math.floor(time / 60);
  const s = time % 60;
  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? "0" + s : s}`;
  time--;
}, 1000);

/* ======================================
   SHUFFLE (FISHER-YATES)
====================================== */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
