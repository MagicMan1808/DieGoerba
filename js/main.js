// ===============================
// VIEW HANDLING
// ===============================

function hideAllViews() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("student-view").classList.add("hidden");
    document.getElementById("lecturer-view").classList.add("hidden");
    document.getElementById("thank-you").classList.add("hidden");
}

function showStart() {
    hideAllViews();
    document.getElementById("start-screen").classList.remove("hidden");
}

function showStudentView() {
    hideAllViews();
    document.getElementById("student-view").classList.remove("hidden");

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
}

// ===============================
// FEEDBACK SUBMISSION (SIMULATED)
// ===============================


function submitFeedback() {
const loader = document.getElementById("loader");
loader.style.display = "block";

 const q1 = document.getElementById("q1");
 const q2 = document.getElementById("q2");
 const emojiGroup = document.getElementById("emoji-group");

  let hasError = false;

  // 🔄 Reset
  q1.classList.remove("invalid");
  q2.classList.remove("invalid");
  emojiGroup.classList.remove("emoji-invalid");

  // Pflichtfelder prüfen
  if (q1.value === "") {
    q1.classList.add("invalid");
    hasError = true;
  }

  if (q2.value === "") {
    q2.classList.add("invalid");
    hasError = true;
  }

  if (!selectedEmoji) {
    emojiGroup.classList.add("emoji-invalid");
    hasError = true;
  }

  if (hasError) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }
  
  const sound = document.getElementById("submit-sound");
  sound.currentTime = 0;
  sound.play();

  hideAllViews();
  document.getElementById("thank-you").classList.remove("hidden");

  const title = document.getElementById("thank-title");
  const text = document.getElementById("thank-text");
  const button = document.getElementById("back-btn");

  title.textContent = "Feedback wird verarbeitet …";
  text.textContent = "Bitte einen Moment Geduld";
  button.classList.add("hidden");

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";

    title.textContent = "Vielen Dank für dein Feedback ✓";
    text.textContent = "Deine Rückmeldung wurde erfolgreich gespeichert.";
    button.classList.remove("hidden");
  }, 5000);
}

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

document.addEventListener("DOMContentLoaded", () => {
    createScaleCharts();
    createCharts();
});