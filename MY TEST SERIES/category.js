const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const subject = params.get("subject");
const chapter = params.get("chapter");

const title = document.getElementById("pageTitle");
const container = document.getElementById("testList");

fetch("data/tests.json")
  .then(res => res.json())
  .then(data => {

    if (type === "chapter") {
      title.innerText = "Chapter Wise Tests";

      Object.keys(data).forEach(key => {
        container.innerHTML += `
          <div class="subject-card"
            onclick="go('category.html?type=subject&subject=${key}')">
            ${data[key].name}
          </div>
        `;
      });
    }

    if (type === "subject") {
      title.innerText = data[subject].name;

      data[subject].chapters.forEach(ch => {
        container.innerHTML += `
          <div class="subject-card"
            onclick="go('category.html?type=chapterTests&subject=${subject}&chapter=${ch.id}')">
            ${ch.title}
          </div>
        `;
      });
    }

    if (type === "chapterTests") {
      const ch = data[subject].chapters.find(c => c.id === chapter);
      title.innerText = ch.title;

      ch.tests.forEach(t => {
        container.innerHTML += `
          <div class="test-row">
            <div class="test-info">
              <h3>${t.title}</h3>
              <p>${t.questions} Q • ${t.marks} Marks • ${t.time}</p>
            </div>
            <button onclick="go('instruction.html?test=${t.id}')">
              Start Test
            </button>
          </div>
        `;
      });
    }

    if (type === "full") {
  title.innerText = "Full Length Tests";

  for (let i = 1; i <= 15; i++) {
    const id = "FLT_" + String(i).padStart(2, "0"); // ✅ FIXED

    container.innerHTML += `
      <div class="test-row">
        <div class="test-info">
          <h3>Full Length Test ${String(i).padStart(2, "0")}</h3>
          <p>80 Q • 80 Marks • 60 Min</p>
        </div>
        <button onclick="go('instruction.html?test=${id}')">
          Start
        </button>
      </div>
    `;
  }
}


    if (type === "pyq") {
      title.innerText = "Previous Year Questions";
      ["STET_2022", "STET_2023", "STET_2024", "TRE_1", "TRE_2", "TRE_3"].forEach(id => {
        container.innerHTML += `
          <div class="test-row">
            <div class="test-info">
              <h3>${id.replace("_", " ")}</h3>
              <p>Official Paper</p>
            </div>
            <button onclick="go('instruction.html?test=${id}')">Start</button>
          </div>
        `;
      });
    }

    if (type === "quiz") {
      title.innerText = "Quiz";
      container.innerHTML = `
        <div class="subject-card" onclick="go('category.html?type=quizChapter')">
          Chapter Wise Quiz
        </div>
        <div class="subject-card" onclick="go('quiz.html?quiz=random')">
          Random Quiz
        </div>
      `;
    }

    if (type === "quizChapter") {
      title.innerText = "Chapter Wise Quiz";
      Object.values(data).forEach(sub => {
        sub.chapters.forEach(ch => {
          container.innerHTML += `
            <div class="test-row">
              <div class="test-info">
                <h3>${ch.title}</h3>
                <p>Quick Quiz</p>
              </div>
              <button onclick="go('quiz.html?quiz=${mapQuizKey(ch.id)}')">

                Start
              </button>
            </div>
          `;
        });
      });
    }

  });

function go(url) {
  window.location.href = url;
}
function mapQuizKey(id) {
  const map = {
    networking: "net",
    dbms: "dbms",
    os: "os",
    dsa: "dsa",
    coa: "coa",
    dl: "dl",
    oops: "oops",
    cpp: "cpp",
    se: "se"
  };
  return map[id] || id;
}

