document.addEventListener("DOMContentLoaded", () => {
  const p = new URLSearchParams(location.search);
  const test = p.get("test");
  const quiz = p.get("quiz");

  document.getElementById("testTitle").innerText = test || "Quiz";
  document.getElementById("testMeta").innerText = "80 Questions • 60 Minutes";

  const agree = document.getElementById("agree");
  const btn = document.getElementById("startBtn");

  agree.onchange = () => btn.disabled = !agree.checked;

  btn.onclick = () => {
    if (test) location.href = `test.html?test=${test}`;
    if (quiz) location.href = `test.html?quiz=${quiz}`;
  };
});
