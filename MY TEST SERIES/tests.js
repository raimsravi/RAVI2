const params = new URLSearchParams(window.location.search);
const subjectKey = params.get("subject");

fetch("data/tests.json")
  .then(res => res.json())
  .then(data => {
    const subject = data[subjectKey];

    if (!subject) {
      document.getElementById("testList").innerHTML =
        "<p>Invalid subject selected.</p>";
      return;
    }

    document.getElementById("subjectTitle").innerText = subject.name;

    const list = document.getElementById("testList");

    subject.chapters.forEach(chapter => {
      const section = document.createElement("div");
      section.className = "chapter-section";
      section.innerHTML = `<h3>${chapter.title}</h3>`;

      chapter.tests.forEach(test => {
        section.innerHTML += `
          <div class="test-card">
            <div>
              <h4>${test.title}</h4>
              <small>${test.questions} Q • ${test.marks} Marks • ${test.time}</small>
            </div>
            <button onclick="startTest('${test.id}')">Start Test</button>
          </div>
        `;
      });

      list.appendChild(section);
    });
  });

function startTest(testId) {
  window.location.href = `test.html?test=${testId}`;
}
