const questions = JSON.parse(localStorage.questions || "[]");
const answers = JSON.parse(localStorage.answers || "[]");

/* =====================
   OVERALL RESULT
===================== */

let correct = 0;
let attempted = 0;

questions.forEach((q, i) => {
  if (answers[i] !== null && answers[i] !== undefined) {
    attempted++;
    if (answers[i] === q.answer) correct++;
  }
});

const total = questions.length;
const wrong = attempted - correct;
const accuracy = attempted ? ((correct / attempted) * 100).toFixed(2) : 0;

document.getElementById("overall").innerHTML = `
  <p><b>Total Questions:</b> ${total}</p>
  <p><b>Attempted:</b> ${attempted}</p>
  <p><b>Correct:</b> ${correct}</p>
  <p><b>Wrong:</b> ${wrong}</p>
  <p><b>Accuracy:</b> ${accuracy}%</p>
`;

/* =====================
   SOLUTIONS
===================== */

let solHTML = "";

questions.forEach((q, i) => {
  const userAns =
    answers[i] !== null && answers[i] !== undefined
      ? q.options[answers[i]]
      : "Not Attempted";

  solHTML += `
    <div style="margin-bottom:15px;">
      <p><b>Q${i + 1}:</b> ${q.q}</p>
      <p><b>Your Answer:</b> ${userAns}</p>
      <p><b>Correct Answer:</b> ${q.options[q.answer]}</p>
      <hr>
    </div>
  `;
});

document.getElementById("solution").innerHTML = solHTML;

/* =====================
   TAB SWITCH
===================== */

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(d => {
    d.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
