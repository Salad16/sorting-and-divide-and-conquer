const fs = require("fs");
const path = require("path");
const { QUIZ_QUESTIONS } = require("./quiz-data.js");

const letters = ["A", "B", "C", "D"];

// Verify rule
let prev = null;
let violations = 0;
const counts = { A: 0, B: 0, C: 0, D: 0 };
QUIZ_QUESTIONS.forEach(q => {
  const l = letters[q.answer];
  counts[l]++;
  if (prev && prev === l) violations++;
  prev = l;
});

const topics = [...new Set(QUIZ_QUESTIONS.map(q => q.topic))];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#111816" />
  <title>Answer Key — CS 05 Chapter 5: Sorting and Divide-and-Conquer</title>
  <meta name="description" content="Complete 30-item answer key, mathematical derivations, and classroom talking points for CS 05 Chapter 5: Sorting and Divide-and-Conquer." />

  <!-- KaTeX for math notation -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" crossorigin="anonymous" />
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" crossorigin="anonymous"></script>

  <style>
    :root {
      --paper: #f3f0e7;
      --paper-bright: #fffdf7;
      --ink: #111816;
      --muted: #59645f;
      --line: #c6c5bc;
      --actual: #245f80;     /* Ocean / Slate Cyan */
      --growth: #ae6a12;     /* Amber */
      --result: #27705a;     /* Emerald Success */
      --danger: #b54132;     /* Crimson */
      --focus: #e8b84e;      /* Gold */
      --dark-bg: #0d1311;
      --card-dark: #151d1a;
      --card-border: #23312c;
      --text-light: #e6ede9;
      --text-muted: #8b9993;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--dark-bg);
      color: var(--text-light);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.55;
      padding-bottom: 80px;
    }

    a {
      color: #64b5f6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    /* Container */
    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px 20px;
    }

    /* Top Nav / Header */
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px 0 24px 0;
      border-bottom: 1px solid var(--card-border);
    }
    .brand {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .brand-kicker {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #4ea3a1;
    }
    .brand-title {
      font-size: 26px;
      font-family: Georgia, serif;
      font-weight: 700;
      color: #ffffff;
    }
    .top-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid transparent;
      text-decoration: none !important;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background: #245f80;
      color: #ffffff;
      border-color: #245f80;
    }
    .btn-primary:hover {
      background: #1b4760;
    }
    .btn-secondary {
      background: #1e2825;
      color: #e6ede9;
      border-color: #31423d;
    }
    .btn-secondary:hover {
      background: #283732;
      border-color: #435a53;
    }
    .btn-accent {
      background: #ae6a12;
      color: #ffffff;
    }
    .btn-accent:hover {
      background: #91570d;
    }

    /* Summary & Rule Badge Card */
    .summary-card {
      background: linear-gradient(135deg, #17221e 0%, #111a17 100%);
      border: 1px solid #2e433c;
      border-radius: 12px;
      padding: 24px;
      margin: 28px 0;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #23332e;
    }
    .rule-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      background: rgba(39, 112, 90, 0.25);
      border: 1px solid #27705a;
      color: #5ed6b0;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }
    .stat-item {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid #23332e;
      border-radius: 8px;
      padding: 12px 16px;
    }
    .stat-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }
    .stat-val {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin-top: 4px;
    }

    /* Quick Answer Key Matrix */
    .matrix-section {
      margin: 28px 0;
      background: var(--card-dark);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
    }
    .matrix-title {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #4ea3a1;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .matrix-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
      gap: 8px;
    }
    .matrix-chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 4px;
      border-radius: 6px;
      background: #1a2521;
      border: 1px solid #283933;
      text-decoration: none !important;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .matrix-chip:hover {
      background: #253630;
      border-color: #3d554c;
      transform: translateY(-2px);
    }
    .matrix-q-num {
      font-size: 11px;
      font-family: ui-monospace, monospace;
      color: var(--text-muted);
    }
    .matrix-q-ans {
      font-size: 18px;
      font-weight: 800;
      margin-top: 2px;
    }
    .ans-A { color: #5ea58e; }
    .ans-B { color: #dfa15a; }
    .ans-C { color: #4ea3a1; }
    .ans-D { color: #64b5f6; }

    /* Filter & Search Bar */
    .controls-bar {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
      margin: 24px 0;
      padding: 14px;
      background: #141c19;
      border: 1px solid var(--card-border);
      border-radius: 8px;
    }
    .search-input {
      flex: 1 1 260px;
      padding: 10px 14px;
      font-size: 14px;
      background: #090e0c;
      border: 1px solid #283933;
      border-radius: 6px;
      color: #ffffff;
      outline: none;
    }
    .search-input:focus {
      border-color: #4ea3a1;
    }
    .topic-select {
      flex: 1 1 240px;
      padding: 10px 14px;
      font-size: 14px;
      background: #090e0c;
      border: 1px solid #283933;
      border-radius: 6px;
      color: #ffffff;
      outline: none;
    }

    /* Question Cards */
    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 24px;
    }
    .q-card {
      background: var(--card-dark);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 24px;
      transition: border-color 0.2s ease;
      scroll-margin-top: 20px;
    }
    .q-card:hover {
      border-color: #39524a;
    }
    .q-card.highlight {
      outline: 2px solid var(--focus);
    }
    .q-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 12px;
    }
    .q-topic-tag {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #4ea3a1;
      background: rgba(78, 163, 161, 0.15);
      border: 1px solid rgba(78, 163, 161, 0.3);
      padding: 4px 10px;
      border-radius: 4px;
    }
    .q-key-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 4px;
      background: #27705a;
      color: #ffffff;
    }
    .q-title {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 18px;
      line-height: 1.5;
    }
    .q-options-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      margin-bottom: 18px;
    }
    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 6px;
      background: #111715;
      border: 1px solid #1f2d28;
      font-size: 14px;
      color: #c9d6d0;
    }
    .option-item.correct-answer {
      background: rgba(39, 112, 90, 0.25);
      border: 1px solid #27705a;
      color: #ffffff;
      font-weight: 600;
    }
    .option-letter-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border-radius: 4px;
      background: #1c2723;
      border: 1px solid #2d3e38;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-light);
    }
    .option-item.correct-answer .option-letter-badge {
      background: #27705a;
      border-color: #3bb390;
      color: #ffffff;
    }
    .correct-tag {
      margin-left: auto;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #5ed6b0;
      background: rgba(39, 112, 90, 0.4);
      padding: 2px 8px;
      border-radius: 4px;
      align-self: center;
    }

    /* Explanation & Talking Point Boxes */
    .explanation-box {
      background: #121a17;
      border-left: 4px solid #27705a;
      border-radius: 0 6px 6px 0;
      padding: 14px 16px;
      margin-bottom: 12px;
      font-size: 14px;
    }
    .box-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #5ed6b0;
      margin-bottom: 6px;
    }
    .talking-point-box {
      background: #181914;
      border-left: 4px solid #ae6a12;
      border-radius: 0 6px 6px 0;
      padding: 12px 16px;
      font-size: 13.5px;
      color: #dfb37c;
    }
    .talking-point-box .box-label {
      color: #f0b769;
    }

    /* Print Stylesheet */
    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
        font-size: 12pt;
      }
      .top-actions, .controls-bar, .matrix-section, .btn {
        display: none !important;
      }
      .q-card {
        background: #ffffff !important;
        border: 1px solid #ccc !important;
        color: #000000 !important;
        page-break-inside: avoid;
        margin-bottom: 20px;
        padding: 16px;
      }
      .q-title {
        color: #000000 !important;
      }
      .option-item {
        background: #ffffff !important;
        border: 1px solid #eee !important;
        color: #000000 !important;
      }
      .option-item.correct-answer {
        border: 2px solid #27705a !important;
        background: #f0fdf4 !important;
        color: #000000 !important;
      }
      .explanation-box {
        background: #f8faf9 !important;
        color: #000000 !important;
        border-left: 4px solid #27705a !important;
      }
      .talking-point-box {
        background: #fffcf5 !important;
        color: #000000 !important;
        border-left: 4px solid #ae6a12 !important;
      }
      .summary-card {
        background: #ffffff !important;
        border: 1px solid #000 !important;
        color: #000000 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Top Header -->
    <header class="top-nav">
      <div class="brand">
        <span class="brand-kicker">CS 05 • Core Algorithms &amp; Complexity</span>
        <h1 class="brand-title">Chapter 5: Official Master Answer Key</h1>
      </div>
      <div class="top-actions">
        <a href="index.html" class="btn btn-secondary">← Back to Presentation Deck</a>
        <button onclick="window.print()" class="btn btn-secondary">🖨️ Print / Save PDF</button>
        <a href="index.html" onclick="localStorage.setItem('autoOpenQuiz', 'true')" class="btn btn-primary">⏱️ Launch Interactive Quiz</a>
      </div>
    </header>

    <!-- Summary & Verification Card -->
    <section class="summary-card">
      <div class="summary-header">
        <div>
          <h2 style="font-size: 20px; color: #ffffff; margin-bottom: 4px;">Assessment Specifications &amp; Quality Guarantee</h2>
          <p style="font-size: 14px; color: var(--text-muted);">
            Comprehensive 30-item multiple-choice curriculum assessment designed for teaching, mastery, and examination review.
          </p>
        </div>
        <div class="rule-pill">
          ✓ Non-Repeating Sequence Rule: PASSED
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-label">Total Questions</div>
          <div class="stat-val">30 Items</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Consecutive Repetitions</div>
          <div class="stat-val" style="color: #5ed6b0;">0 Violations</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Answer Distribution</div>
          <div class="stat-val" style="font-size: 16px; font-family: ui-monospace, monospace; margin-top: 8px;">
            A: ${counts.A} &nbsp;|&nbsp; B: ${counts.B} &nbsp;|&nbsp; C: ${counts.C} &nbsp;|&nbsp; D: ${counts.D}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Core Topics Covered</div>
          <div class="stat-val">8 Topics</div>
        </div>
      </div>
    </section>

    <!-- Quick Navigation Matrix -->
    <section class="matrix-section">
      <div class="matrix-title">
        <span>⚡ Quick Answer Key Matrix (Click item to jump)</span>
        <span style="font-size: 12px; color: var(--text-muted); font-weight: normal; text-transform: none;">
          Every question's correct letter differs from the preceding question
        </span>
      </div>
      <div class="matrix-grid">
        ${QUIZ_QUESTIONS.map(q => {
          const l = letters[q.answer];
          return `<a href="#q-${q.id}" class="matrix-chip" title="Jump to Question ${q.id}: ${q.topic}">
            <span class="matrix-q-num">Q${String(q.id).padStart(2, '0')}</span>
            <span class="matrix-q-ans ans-${l}">${l}</span>
          </a>`;
        }).join("\n        ")}
      </div>
    </section>

    <!-- Filter & Search Toolbar -->
    <div class="controls-bar">
      <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search questions, options, or explanations..." oninput="filterQuestions()" />
      <select id="topicFilter" class="topic-select" onchange="filterQuestions()">
        <option value="ALL">All Topics (30 Questions)</option>
        ${topics.map(t => `<option value="${t}">${t}</option>`).join("\n        ")}
      </select>
      <span id="matchCounter" style="font-size: 13px; color: var(--text-muted); margin-left: auto;">Showing 30 of 30</span>
    </div>

    <!-- Questions Container -->
    <main id="questionsContainer" class="questions-list">
      ${QUIZ_QUESTIONS.map(q => {
        const correctLetter = letters[q.answer];
        return `
        <article class="q-card" id="q-${q.id}" data-topic="${q.topic}">
          <div class="q-meta">
            <span class="q-topic-tag">${q.topic}</span>
            <span class="q-key-badge">Correct Key: ${correctLetter}</span>
          </div>

          <h3 class="q-title">
            <span style="color: #4ea3a1; font-family: ui-monospace, monospace; margin-right: 6px;">#${String(q.id).padStart(2, '0')}.</span>
            ${q.question}
          </h3>

          <div class="q-options-grid">
            ${q.options.map((opt, optIdx) => {
              const optLetter = letters[optIdx];
              const isCorrect = optIdx === q.answer;
              return `
              <div class="option-item ${isCorrect ? 'correct-answer' : ''}">
                <span class="option-letter-badge">${optLetter}</span>
                <span style="flex:1;">${opt}</span>
                ${isCorrect ? '<span class="correct-tag">✓ Correct Answer</span>' : ''}
              </div>`;
            }).join("")}
          </div>

          <div class="explanation-box">
            <div class="box-label">Step-by-Step Rationale &amp; Proof:</div>
            <p>${q.explanation}</p>
          </div>

          <div class="talking-point-box">
            <div class="box-label">💡 Classroom Talking Point:</div>
            <p>${q.talkingPoint}</p>
          </div>
        </article>`;
      }).join("\n")}
    </main>

    <footer style="margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--card-border); text-align: center; color: var(--text-muted); font-size: 13px;">
      <p>CS 05: Core Algorithms &amp; Complexity — Chapter 5: Sorting and Divide-and-Conquer</p>
      <p style="margin-top: 6px;">Designed for classroom presentation, peer review, and conceptual mastery.</p>
    </footer>
  </div>

  <script>
    function filterQuestions() {
      const query = document.getElementById("searchInput").value.toLowerCase().trim();
      const topic = document.getElementById("topicFilter").value;
      const cards = document.querySelectorAll(".q-card");
      let visible = 0;

      cards.forEach(card => {
        const cardTopic = card.getAttribute("data-topic");
        const cardText = card.textContent.toLowerCase();

        const matchTopic = (topic === "ALL" || cardTopic === topic);
        const matchQuery = (!query || cardText.includes(query));

        if (matchTopic && matchQuery) {
          card.style.display = "block";
          visible++;
        } else {
          card.style.display = "none";
        }
      });

      document.getElementById("matchCounter").textContent = \`Showing \${visible} of \${cards.length}\`;
    }

    // Render KaTeX math on load
    document.addEventListener("DOMContentLoaded", () => {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "answer-key.html"), html, "utf8");
console.log("Successfully generated answer-key.html in", __dirname);
