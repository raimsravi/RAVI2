const questions = [
  {
    q: "Protocol number 6 refers to?",
    options: ["UDP", "TCP", "ICMP", "FTP"],
    answer: 1,
    topic: "Networking",
    solution: "Protocol number 6 is assigned to TCP."
  },
  {
    q: "Which device works at OSI Layer 3?",
    options: ["Hub", "Switch", "Router", "Repeater"],
    answer: 2,
    topic: "Networking",
    solution: "Router works at Network Layer (Layer 3)."
  },
  {
    q: "Which protocol is used to send email?",
    options: ["FTP", "SMTP", "POP3", "HTTP"],
    answer: 1,
    topic: "Networking",
    solution: "SMTP is used to send emails."
  },
  {
    q: "Default port number of HTTP is?",
    options: ["21", "25", "80", "443"],
    answer: 2,
    topic: "Networking",
    solution: "HTTP uses port number 80."
  },
  {
    q: "Which topology has a central device?",
    options: ["Bus", "Ring", "Star", "Mesh"],
    answer: 2,
    topic: "Networking",
    solution: "Star topology uses a central hub or switch."
  },

  {
    q: "Primary key can have?",
    options: ["Duplicate values", "NULL values", "Unique values", "Multiple values"],
    answer: 2,
    topic: "DBMS",
    solution: "Primary key contains unique values."
  },
  {
    q: "Which normal form removes partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 1,
    topic: "DBMS",
    solution: "Second Normal Form removes partial dependency."
  },
  {
    q: "Which command is used to remove a table?",
    options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
    answer: 1,
    topic: "DBMS",
    solution: "DROP command deletes table structure completely."
  },
  {
    q: "Which key is used to link two tables?",
    options: ["Primary Key", "Foreign Key", "Candidate Key", "Super Key"],
    answer: 1,
    topic: "DBMS",
    solution: "Foreign key links two tables."
  },
  {
    q: "Which SQL clause is used to filter records?",
    options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
    answer: 2,
    topic: "DBMS",
    solution: "WHERE clause filters records."
  },

  {
    q: "Which OS executes jobs in batches?",
    options: ["Time Sharing OS", "Batch OS", "Distributed OS", "RTOS"],
    answer: 1,
    topic: "Operating System",
    solution: "Batch OS executes jobs in batches."
  },
  {
    q: "Which scheduling algorithm is non-preemptive?",
    options: ["Round Robin", "FCFS", "SJF Preemptive", "Priority Preemptive"],
    answer: 1,
    topic: "Operating System",
    solution: "FCFS is non-preemptive."
  },
  {
    q: "Which memory is volatile?",
    options: ["ROM", "Flash", "RAM", "Hard Disk"],
    answer: 2,
    topic: "Operating System",
    solution: "RAM is volatile memory."
  },
  {
    q: "Deadlock occurs when?",
    options: ["Resources are free", "Circular wait exists", "CPU idle", "Memory full"],
    answer: 1,
    topic: "Operating System",
    solution: "Deadlock occurs due to circular wait."
  },
  {
    q: "Which OS is used in embedded systems?",
    options: ["Batch OS", "RTOS", "Time Sharing OS", "Distributed OS"],
    answer: 1,
    topic: "Operating System",
    solution: "RTOS is used in embedded systems."
  },

  {
    q: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
    topic: "Data Structure",
    solution: "Queue follows FIFO principle."
  },
  {
    q: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    answer: 1,
    topic: "Data Structure",
    solution: "Stack follows LIFO principle."
  },
  {
    q: "Binary search works on?",
    options: ["Unsorted array", "Sorted array", "Linked list", "Tree"],
    answer: 1,
    topic: "Data Structure",
    solution: "Binary search requires sorted data."
  },
  {
    q: "Which traversal gives sorted order in BST?",
    options: ["Preorder", "Postorder", "Inorder", "Level order"],
    answer: 2,
    topic: "Data Structure",
    solution: "Inorder traversal gives sorted order."
  },
  {
    q: "Worst case time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    topic: "Data Structure",
    solution: "Linear search worst case is O(n)."
  },

  {
    q: "Which gate gives output 1 when inputs differ?",
    options: ["AND", "OR", "XOR", "NOR"],
    answer: 2,
    topic: "Digital Logic",
    solution: "XOR outputs 1 when inputs differ."
  },
  {
    q: "Which number system is base 2?",
    options: ["Decimal", "Binary", "Octal", "Hexadecimal"],
    answer: 1,
    topic: "Digital Logic",
    solution: "Binary number system has base 2."
  },
  {
    q: "1 KB equals?",
    options: ["1000 bytes", "1024 bytes", "512 bytes", "2048 bytes"],
    answer: 1,
    topic: "Computer Fundamentals",
    solution: "1 KB = 1024 bytes."
  },
  {
    q: "Brain of computer is?",
    options: ["RAM", "Hard Disk", "CPU", "Monitor"],
    answer: 2,
    topic: "Computer Fundamentals",
    solution: "CPU is the brain of computer."
  },
  {
    q: "Which software is system software?",
    options: ["MS Word", "Excel", "Windows", "Chrome"],
    answer: 2,
    topic: "Computer Fundamentals",
    solution: "Windows is system software."
  },

  {
    q: "Which model is used in software development?",
    options: ["OSI", "Waterfall", "TCP/IP", "ER"],
    answer: 1,
    topic: "Software Engineering",
    solution: "Waterfall is a software development model."
  },
  {
    q: "Which phase comes first in SDLC?",
    options: ["Design", "Coding", "Requirement Analysis", "Testing"],
    answer: 2,
    topic: "Software Engineering",
    solution: "Requirement analysis is the first phase."
  },

  {
    q: "Which symbol is used for pointer in C?",
    options: ["%", "&", "*", "#"],
    answer: 2,
    topic: "Programming",
    solution: "Pointer uses * symbol in C."
  },
  {
    q: "Which loop executes at least once?",
    options: ["for", "while", "do-while", "none"],
    answer: 2,
    topic: "Programming",
    solution: "do-while loop executes at least once."
  }
];

let index = 0;
let answers = new Array(questions.length);
let review = new Array(questions.length);

const qno = document.getElementById("qno");
const question = document.getElementById("question");
const options = document.getElementById("options");
const palette = document.getElementById("palette");

function loadQuestion() {
  qno.innerText = `Question ${index + 1}`;
  question.innerText = questions[index].q;
  options.innerHTML = "";

  questions[index].options.forEach((opt, i) => {
    const checked = answers[index] === i ? "checked" : "";
    options.innerHTML += `
      <label>
        <input type="radio" name="opt" value="${i}" ${checked}> ${opt}
      </label>`;
  });

  updatePalette();
}

function saveNext() {
  saveAnswer();
  if (index < questions.length - 1) index++;
  loadQuestion();
}

function saveAnswer() {
  const sel = document.querySelector('input[name="opt"]:checked');
  if (sel) answers[index] = parseInt(sel.value);
}

function clearResponse() {
  answers[index] = undefined;
  loadQuestion();
}

function markReview() {
  review[index] = true;
  saveNext();
}

function updatePalette() {
  palette.innerHTML = "";
  questions.forEach((q, i) => {
    let cls = "";
    if (review[i]) cls = "review";
    else if (answers[i] !== undefined) cls = "answered";

    palette.innerHTML += `<button class="${cls}" onclick="jump(${i})">${i + 1}</button>`;
  });
}

function jump(i) {
  index = i;
  loadQuestion();
}

function submitTest() {
  saveAnswer();

  localStorage.setItem("questions", JSON.stringify(questions));
  localStorage.setItem("answers", JSON.stringify(answers));

  window.location.href = "result.html";
}

loadQuestion();

/* TIMER */
let time = 600;
setInterval(() => {
  let m = Math.floor(time / 60);
  let s = time % 60;
  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? "0" + s : s}`;
  time--;
}, 1000);
