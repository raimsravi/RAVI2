const subjects = document.getElementById("subjects");

subjects.innerHTML = `
  <div class="subject-card" onclick="go('category.html?type=chapter')">Chapter Wise Test</div>
  <div class="subject-card" onclick="go('category.html?type=full')">Full Length Test</div>
  <div class="subject-card" onclick="go('category.html?type=pyq')">PYQ Test</div>
  <div class="subject-card" onclick="go('category.html?type=quiz')">Quiz</div>
`;

function go(url) {
  window.location.href = url;
}
