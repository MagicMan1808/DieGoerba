// ===============================
// VIEW HANDLING
// ===============================

function hideAllViews() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("student-view").classList.add("hidden");
    document.getElementById("lecturer-view").classList.add("hidden");
    document.getElementById("thank-you").classList.add("hidden");
    document.getElementById("lecture-detail").classList.add("hidden");
}

function showStart() {
    hideAllViews();
    document.getElementById("start-screen").classList.remove("hidden");
    clearMood();
}

function showStudentView() {
    hideAllViews();
    document.getElementById("student-view").classList.remove("hidden");
    clearMood();

    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.animation = "none";
        loader.offsetHeight;
        loader.style.animation = "spin 1s linear infinite";
    }
}

function showLecturerView() {
    hideAllViews();
    document.getElementById("lecturer-view").classList.remove("hidden");
    clearMood();
}

// ===============================
// FEEDBACK SUBMISSION (SIMULATED)
// ===============================

function submitFeedback() {
  const q1 = document.getElementById("q1");
  const q2 = document.getElementById("q2");
  const emojiGroup = document.getElementById("emoji-group");
  const comments = document.getElementById("comments");

  const q1Error = document.getElementById("q1-error");
  const q2Error = document.getElementById("q2-error");
  const emojiError = document.getElementById("emoji-error");

  let hasError = false;

  // Reset visual + messages
  q1.classList.remove("invalid");
  q2.classList.remove("invalid");
  emojiGroup.classList.remove("emoji-invalid");
  q1Error.textContent = "";
  q2Error.textContent = "";
  emojiError.textContent = "";
  q1Error.classList.remove("active");
  q2Error.classList.remove("active");
  emojiError.classList.remove("active");

  // Pflichtfelder prüfen mit Inline-Fehlern
  if (q1.value === "") {
    q1.classList.add("invalid");
    q1Error.textContent = "Bitte eine Bewertung (1–5) auswählen.";
    q1Error.classList.add("active");
    hasError = true;
  }

  if (q2.value === "") {
    q2.classList.add("invalid");
    q2Error.textContent = "Bitte eine Verständlichkeitsbewertung (1–5) auswählen.";
    q2Error.classList.add("active");
    hasError = true;
  }

  if (!selectedEmoji) {
    emojiGroup.classList.add("emoji-invalid");
    emojiError.textContent = "Bitte eine Stimmung auswählen.";
    emojiError.classList.add("active");
    hasError = true;
  }

  if (hasError) {
    return; // Inline-Fehler anzeigen, kein Alert
  }

  // Bestätigungsdialog mit Zusammenfassung
  const summary = document.getElementById("confirm-summary");
  const emojiLabelMap = { "1": "😡 Sehr schlecht", "2": "😕 Schlecht", "3": "😐 Neutral", "4": "😊 Gut", "5": "😁 Sehr gut" };
  const safeComments = (comments?.value || "").replace(/</g, "&lt;");

  summary.innerHTML = `
    <ul>
      <li><strong>Inhalt folgen:</strong> ${q1.value} / 5</li>
      <li><strong>Verständlichkeit:</strong> ${q2.value} / 5</li>
      <li><strong>Stimmung:</strong> ${emojiLabelMap[String(selectedEmoji)]}</li>
      <li><strong>Optionales Feedback:</strong> ${safeComments || "—"}</li>
    </ul>
  `;

  openConfirm();
}

function clearMood() {
  document.body.classList.remove("mood-1","mood-2","mood-3","mood-4","mood-5");
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("mood-1","mood-2","mood-3","mood-4","mood-5");
}
function applyMood(mood) {
  const moodClass = `mood-${mood}`;
  clearMood();
  document.body.classList.add(moodClass);
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add(moodClass);
}

function openConfirm() {
  document.getElementById("confirm-overlay").classList.add("active");
}
function closeConfirm() {
  document.getElementById("confirm-overlay").classList.remove("active");
}
// ...existing code...

document.addEventListener("DOMContentLoaded", () => {
  // Emoji Auswahl
  const emojis = document.querySelectorAll(".emoji-group span");
  emojis.forEach(emoji => {
    emoji.addEventListener("click", () => {
      emojis.forEach(e => e.style.opacity = "0.4");
      emoji.style.opacity = "1";
      selectedEmoji = emoji.dataset.value;
    });
  });

  // Bestätigungsdialog Buttons
  const editBtn = document.getElementById("confirm-edit");
  const sendBtn = document.getElementById("confirm-send");

  if (editBtn && sendBtn) {
    editBtn.addEventListener("click", () => {
      closeConfirm(); // zurück zur Bearbeitung
    });

    sendBtn.addEventListener("click", () => {
      closeConfirm();

      const sound = document.getElementById("submit-sound");
      sound.currentTime = 0;
      sound.play();

      hideAllViews();
      document.getElementById("thank-you").classList.remove("hidden");

      const title = document.getElementById("thank-title");
      const text = document.getElementById("thank-text");
      const button = document.getElementById("back-btn");
      const loader = document.getElementById("loader");

      applyMood(selectedEmoji || "3");

      loader.style.display = "block";
      title.textContent = "Feedback wird verarbeitet …";
      const moodTexts = {
        "1": "Bitte einen Moment Geduld – wir hören zu 👂",
        "2": "Bitte einen Moment Geduld – sorgfältige Prüfung 🤔",
        "3": "Bitte einen Moment Geduld",
        "4": "Bitte einen Moment Geduld – positive Energie 💃",
        "5": "Bitte einen Moment Geduld – Begeisterung 🚀"
      };
      text.textContent = moodTexts[String(selectedEmoji)] || moodTexts["3"];
      button.classList.add("hidden");

      setTimeout(() => {
        loader.style.display = "none";
        title.textContent = "Vielen Dank für dein Feedback ✓";
        text.textContent = "Dein Feedback wurde erfolgreich und anonym gespeichert.";
        button.classList.remove("hidden");
        clearMood();
      }, 5000);
    });
  }
});

// ===============================
// EMOJI SELECTION (VISUAL ONLY)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const emojis = document.querySelectorAll(".emoji-group span");

  emojis.forEach(emoji => {
    emoji.addEventListener("click", () => {
      emojis.forEach(e => e.style.opacity = "0.4");
      emoji.style.opacity = "1";

      selectedEmoji = emoji.dataset.value;
    });
  });
});

let chartSmall, chartLarge;

function createCharts() {
    const data = {
        labels: ["😡", "😕", "😐", "😊", "😁"],
        datasets: [
            {
                label: "Emoji‑Feedback",
                data: [3, 6, 12, 28, 14], // simulierte Werte
                backgroundColor: "#3498db"
            }
        ]
    };

    chartSmall = new Chart(
        document.getElementById("feedbackChart"),
        {
            type: "bar",
            data: data,
            options: {
                plugins: { legend: { display: false } }
            }
        }
    );

    chartLarge = new Chart(
        document.getElementById("feedbackChartLarge"),
        {
            type: "bar",
            data: data,
            options: {
                responsive: true
            }
        }
    );
}

let scaleChartA, scaleChartB, scaleChartLargeA, scaleChartLargeB;

function createScaleCharts() {

    const dataA = {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
            label: "Skala A",
            data: [2, 5, 11, 29, 16],
            backgroundColor: "#2ecc71"
        }]
    };

    const dataB = {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
            label: "Skala B",
            data: [1, 4, 9, 31, 18],
            backgroundColor: "#e67e22"
        }]
    };

    // 🔹 Kleine Charts
    scaleChartA = new Chart(
        document.getElementById("scaleChartA"),
        {
            type: "bar",
            data: dataA,
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        }
    );

    scaleChartB = new Chart(
        document.getElementById("scaleChartB"),
        {
            type: "bar",
            data: dataB,
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        }
    );

    // 🔹 Große Charts (Overlay)
    scaleChartLargeA = new Chart(
        document.getElementById("scaleChartLarge"),
        {
            type: "bar",
            data: dataA,
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        }
    );

    scaleChartLargeB = new Chart(
        document.getElementById("scaleChartLargeB"),
        {
            type: "bar",
            data: dataB,
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        }
    );
}


let selectedEmoji = null;


function openScaleChart() {
    document.getElementById("scale-chart-overlay").classList.add("active");
}

function closeScaleChart() {
    document.getElementById("scale-chart-overlay").classList.remove("active");
}

function openScaleChartB() {
    document.getElementById("scale-chart-overlay-b").classList.add("active");
}

function closeScaleChartB() {
    document.getElementById("scale-chart-overlay-b").classList.remove("active");
}

function openEmojiChart() {
    document.getElementById("chart-overlay").classList.add("active");
}

function openChart() {
    document.getElementById("chart-overlay").classList.add("active");
}

function closeChart() {
    document.getElementById("chart-overlay").classList.remove("active");
}

// Beispiel-Daten je Vorlesung
const LECTURES = [
  {
    id: "inf101-1",
    title: "Informatik 101 – Einführung",
    date: "12.10.2025",
    participants: 63,
    scaleA: [2, 5, 11, 29, 16],
    scaleB: [1, 4, 9, 31, 18],
    emoji:  [3, 6, 12, 28, 14]
  },
  {
    id: "ux201-2",
    title: "UX 201 – Prototyping",
    date: "19.10.2025",
    participants: 58,
    scaleA: [1, 3, 10, 27, 17],
    scaleB: [2, 5, 12, 25, 14],
    emoji:  [4, 8, 15, 20, 11]
  },
  {
    id: "dat301-3",
    title: "Datenanalyse 301 – Statistik",
    date: "26.10.2025",
    participants: 71,
    scaleA: [3, 7, 15, 26, 20],
    scaleB: [2, 6, 14, 28, 21],
    emoji:  [5, 7, 14, 25, 20]
  }
];

function meanFromCounts(counts) {
  let sum = 0, total = 0;
  counts.forEach((c, i) => { sum += (i + 1) * c; total += c; });
  return total ? (sum / total) : null;
}

// Liste rendern
function renderLectures() {
  const list = document.getElementById("lecture-list");
  if (!list) return;
  list.innerHTML = "";

  LECTURES.forEach(l => {
    const avg = meanFromCounts(l.scaleA);
    const btn = document.createElement("button");
    btn.className = "lecture-item";
    btn.innerHTML = `
      <h4>${l.title}</h4>
      <div class="lecture-meta">${l.date} · ${l.participants} Teilnahmen</div>
      <div class="lecture-avg">Ø Verständnis: ${avg ? avg.toFixed(1) : "—"} / 5</div>
    `;
    btn.addEventListener("click", () => openLecture(l.id));
    list.appendChild(btn);
  });
}

// Overlay-Handling für Lecture
let lectureCharts = { a: null, b: null, e: null };

function openLecture(id) {
  const l = LECTURES.find(x => x.id === id);
  if (!l) return;

  hideAllViews();
  document.getElementById("lecture-detail").classList.remove("hidden");
  document.getElementById("lecture-title").textContent = `${l.title} – Details`;

  // Alte Charts zerstören
  ["a","b","e"].forEach(k => {
    if (lectureCharts[k]) { lectureCharts[k].destroy(); lectureCharts[k] = null; }
  });

  // Charts erstellen
  lectureCharts.a = new Chart(document.getElementById("lectureScaleA"), {
    type: "bar",
    data: { labels: ["1","2","3","4","5"], datasets: [{ label: "Skala A", data: l.scaleA, backgroundColor: "#2ecc71" }]},
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
  lectureCharts.b = new Chart(document.getElementById("lectureScaleB"), {
    type: "bar",
    data: { labels: ["1","2","3","4","5"], datasets: [{ label: "Skala B", data: l.scaleB, backgroundColor: "#e67e22" }]},
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
  lectureCharts.e = new Chart(document.getElementById("lectureEmoji"), {
    type: "bar",
    data: { labels: ["😡","😕","😐","😊","😁"], datasets: [{ label: "Emoji", data: l.emoji, backgroundColor: "#3498db" }]},
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// NEU: Zurück zum Dashboard
function backToDashboard() {
  ["a","b","e"].forEach(k => {
    if (lectureCharts[k]) { lectureCharts[k].destroy(); lectureCharts[k] = null; }
  });
  showLecturerView();
}

function closeLectureOverlay() {
  document.getElementById("lecture-overlay").classList.remove("active");
}

// Beim Anzeigen des Dashboards die Liste aufbauen
function showLecturerView() {
    hideAllViews();
    document.getElementById("lecturer-view").classList.remove("hidden");
    clearMood();
    renderLectures();
}

document.addEventListener("DOMContentLoaded", () => {
    createScaleCharts();
    createCharts();
    renderLectures();
});