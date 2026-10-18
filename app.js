// CS 05 — Chapter 5: Sorting and Divide-and-Conquer
// Main Application Engine & Interactive Deck Controller

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. DYNAMIC 16:9 VIEWPORT SCALER (Matches cs05-chapter-03.vercel.app)
  // -------------------------------------------------------------------------
  const deckShell = document.getElementById("deckShell");
  
  function updateDeckScale() {
    if (!deckShell) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const baseWidth = 1366;
    const baseHeight = 768;

    const scaleX = windowWidth / baseWidth;
    const scaleY = windowHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);

    deckShell.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  window.addEventListener("resize", updateDeckScale);
  updateDeckScale();

  // -------------------------------------------------------------------------
  // 2. SLIDE RENDERING & POPULATION (Supports 26 Comprehensive Slides)
  // -------------------------------------------------------------------------
  const mainDeck = document.getElementById("mainDeck");

  // If SLIDES_DATA is defined from slides-data.js, populate the deck!
  if (typeof SLIDES_DATA !== "undefined" && Array.isArray(SLIDES_DATA) && SLIDES_DATA.length > 0) {
    if (mainDeck) {
      mainDeck.innerHTML = "";
      SLIDES_DATA.forEach((s, idx) => {
        const slideEl = document.createElement("section");
        slideEl.className = `slide ${idx === 0 ? "active slide-opening" : ""}`;
        slideEl.id = `slide-${s.id}`;
        slideEl.setAttribute("data-title", s.title);
        slideEl.setAttribute("data-id", s.id);
        slideEl.setAttribute("data-type", s.type || "content");

        // Rich speaker notes / classroom talking points
        const notes = s.notes || generateDefaultNotes(s);
        slideEl.setAttribute("data-notes", notes);

        if (s.type === "opening") {
          slideEl.innerHTML = s.content;
        } else {
          slideEl.innerHTML = `
            <div class="slide-header">
              <div class="header-left">
                <p class="kicker">${s.kicker || "CS 05 • Chapter 5"}</p>
                <h2>${s.title}</h2>
              </div>
              <span class="section-chip">${s.section || "Chapter 5"}</span>
            </div>
            <div class="slide-body">
              ${s.content}
            </div>
          `;
        }
        mainDeck.appendChild(slideEl);
      });
    }
  }

  function generateDefaultNotes(s) {
    if (s.id.includes("selection")) {
      return `<strong>Classroom Talking Points for ${s.title}:</strong><br>• Focus on Selection Sort's core mechanism: finding the minimum element from the unsorted subarray and placing it at the front.<br>• Remind students that it always performs n(n-1)/2 comparisons regardless of whether the array is already sorted.<br>• Highlight its primary advantage: at most n-1 swaps, which minimizes memory writes!`;
    } else if (s.id.includes("insertion")) {
      return `<strong>Classroom Talking Points for ${s.title} (GeeksforGeeks):</strong><br>• Use the playing card analogy: picking the 'key' card and sliding larger cards right.<br>• Emphasize adaptivity: Best case is O(n) with n-1 comparisons and 0 shifts on already sorted arrays like [1, 2, 3, 4, 5].<br>• Worst case is O(n²) with n(n-1)/2 shifts on reversed arrays [5, 4, 3, 2, 1].<br>• Auxiliary space is O(1) in-place with only key and j variables.`;
    } else if (s.id.includes("divide") || s.id.includes("merge")) {
      return `<strong>Classroom Talking Points for ${s.title}:</strong><br>• Emphasize the 3 steps: Divide (midpoint split), Conquer (recursive calls down to base cases), Combine (merge).<br>• Point out that the split does zero sorting! All sorting and comparisons happen during linear O(n) merge.<br>• On the recursion tree: Depth is log₂(n), and every level costs c·n. Total work is O(n log n) across all cases!`;
    } else {
      return `<strong>Classroom Talking Points for ${s.title}:</strong><br>• Walk through the keywords and definitions clearly.<br>• Ask students to predict the outcome before revealing each step.`;
    }
  }

  // Auto-render LaTeX formulas with KaTeX if loaded
  function renderMath() {
    if (!window.katex && !window.renderMathInElement) return;

    // 1. Explicitly render formula containers and recursion tree elements
    document.querySelectorAll(".formula, .tree-node, .tree-cost-label, .tree-level-desc, .tree-summary-work, .tree-summary-depth").forEach(el => {
      if (el.querySelector(".katex")) return;
      let text = el.textContent.trim();
      if (!text) return;

      // Clean up common JS string escape artifacts
      text = text
        .replace(/\x08egin/g, "\\begin")
        .replace(/\x09ext/g, "\\text")
        .replace(/\x0Crac/g, "\\frac");

      const hasMathMarkers = text.startsWith("$$") || text.startsWith("$") || text.includes("\\") || text.includes("Theta") || text.includes("log_") || text.includes("T(n)");
      if (hasMathMarkers && window.katex) {
        let cleanMath = text;
        if (cleanMath.startsWith("$$") && cleanMath.endsWith("$$")) {
          cleanMath = cleanMath.slice(2, -2).trim();
        } else if (cleanMath.startsWith("$") && cleanMath.endsWith("$")) {
          cleanMath = cleanMath.slice(1, -1).trim();
        }
        try {
          katex.render(cleanMath, el, {
            displayMode: el.classList.contains("formula"),
            throwOnError: false
          });
        } catch (e) {
          console.warn("KaTeX render error on element:", e);
        }
      }
    });

    // 2. Render all inline and display math across document
    if (window.renderMathInElement) {
      try {
        renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn("KaTeX auto-render error:", e);
      }
    }
  }

  // Initial and subsequent math renders
  renderMath();
  setTimeout(renderMath, 100);
  setTimeout(renderMath, 400);
  window.addEventListener("load", renderMath);

  // -------------------------------------------------------------------------
  // 3. SLIDE NAVIGATION CONTROLS
  // -------------------------------------------------------------------------
  let slides = Array.from(document.querySelectorAll(".slide"));
  let totalSlides = slides.length;
  let currentSlideIndex = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slideSelect = document.getElementById("slideSelect");
  const slideOutput = document.getElementById("slideOutput");
  const progressFill = document.getElementById("progressFill");
  const currentTitleSpan = document.getElementById("currentSlideTitle");

  function populateSlideSelect() {
    if (!slideSelect) return;
    slideSelect.innerHTML = "";
    slides.forEach((slide, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      const title = slide.getAttribute("data-title") || `Slide ${idx + 1}`;
      opt.textContent = `${String(idx + 1).padStart(2, "0")}. ${title}`;
      slideSelect.appendChild(opt);
    });

    slideSelect.addEventListener("change", (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  populateSlideSelect();

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // Transition active class
    slides[currentSlideIndex].classList.remove("active");
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add("active");

    // Update bottom UI
    const paddedNum = String(currentSlideIndex + 1).padStart(2, "0");
    const paddedTotal = String(totalSlides).padStart(2, "0");
    if (slideOutput) slideOutput.textContent = `${paddedNum} / ${paddedTotal}`;
    if (slideSelect) slideSelect.value = currentSlideIndex;

    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    if (progressFill) progressFill.style.width = `${progressPercent}%`;

    const title = slides[currentSlideIndex].getAttribute("data-title") || "";
    if (currentTitleSpan) currentTitleSpan.textContent = title;

    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) {
      if (currentSlideIndex === totalSlides - 1) {
        nextBtn.textContent = "Start Quiz (30 Qs)";
        nextBtn.classList.add("quiz-accent");
      } else {
        nextBtn.textContent = "Next ›";
        nextBtn.classList.remove("quiz-accent");
      }
    }

    // Trigger visualizer initialization if slide contains a simulator
    checkAndInitVisualizers(slides[currentSlideIndex]);

    // Update Speaker Notes
    updateSpeakerNotes();

    // Re-render math if new slide has formulas
    renderMath();
  }

  function checkAndInitVisualizers(slideEl) {
    const slideId = slideEl.getAttribute("data-id") || "";
    if (slideId === "selection-sort-vis" && window.SelectionVis) {
      window.SelectionVis.init();
    } else if (slideId === "insertion-sort-vis" && window.InsertionVis) {
      window.InsertionVis.init();
    } else if (slideId === "merge-sort-vis" && window.MergeVis) {
      window.MergeVis.init();
    } else if (slideId === "sorting-race-sandbox" && window.SortingRace) {
      window.SortingRace.init();
    }
  }

  // Global Deck object for inline slide links (e.g. Deck.goToSlide(3))
  window.Deck = {
    goToSlide,
    nextSlide: () => goToSlide(currentSlideIndex + 1),
    prevSlide: () => goToSlide(currentSlideIndex - 1)
  };

  if (prevBtn) prevBtn.addEventListener("click", () => window.Deck.prevSlide());
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentSlideIndex < totalSlides - 1) {
        window.Deck.nextSlide();
      } else {
        openQuiz();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    const quizOverlay = document.getElementById("quizOverlay");
    const isQuizOpen = quizOverlay && quizOverlay.classList.contains("open");

    if (isQuizOpen) {
      if (e.key === "Escape") closeQuiz();
      return;
    }

    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown" || e.key === "n" || e.key === "N") {
      if (e.key === " " && e.target.tagName === "BUTTON") return;
      if (currentSlideIndex < totalSlides - 1) window.Deck.nextSlide();
      else openQuiz();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "p" || e.key === "P") {
      window.Deck.prevSlide();
    } else if (e.key === "q" || e.key === "Q") {
      openQuiz();
    } else if (e.key === "s" || e.key === "S") {
      toggleSpeakerNotes();
    } else if (e.key === "f" || e.key === "F") {
      toggleFullScreen();
    }
  });

  // Fullscreen Toggle
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  const fullscreenBtn = document.getElementById("fullscreenBtn");
  if (fullscreenBtn) fullscreenBtn.addEventListener("click", toggleFullScreen);

  // -------------------------------------------------------------------------
  // 4. SPEAKER NOTES DRAWER (Classroom Presentation Talking Points)
  // -------------------------------------------------------------------------
  const notesDrawer = document.getElementById("speakerNotesDrawer");
  const notesToggleBtn = document.getElementById("notesToggleBtn");
  const notesCloseBtn = document.getElementById("notesCloseBtn");
  const notesContent = document.getElementById("speakerNotesContent");

  function toggleSpeakerNotes() {
    if (!notesDrawer) return;
    const isOpen = notesDrawer.classList.contains("open");
    if (isOpen) {
      notesDrawer.classList.remove("open");
    } else {
      updateSpeakerNotes();
      notesDrawer.classList.add("open");
    }
  }

  function updateSpeakerNotes() {
    if (!notesContent) return;
    const activeSlide = slides[currentSlideIndex];
    if (!activeSlide) return;
    const notes = activeSlide.getAttribute("data-notes");
    if (notes) {
      notesContent.innerHTML = notes;
    } else {
      notesContent.innerHTML = "<p>Focus on key concepts and definitions shown on screen. Trace through the examples with students.</p>";
    }
  }

  if (notesToggleBtn) notesToggleBtn.addEventListener("click", toggleSpeakerNotes);
  if (notesCloseBtn) notesCloseBtn.addEventListener("click", () => notesDrawer.classList.remove("open"));

  // Checkpoint micro-quiz handler
  window.checkMicroQuiz = function(chkId, choiceIdx) {
    const fb = document.getElementById(`chk${chkId}-feedback`);
    if (!fb) return;
    fb.style.display = "block";
    if (choiceIdx === 1) {
      fb.className = "activity-feedback callout-result";
      fb.innerHTML = "<strong>✓ Correct!</strong> Insertion Sort requires only $O(n)$ time on nearly-sorted data because elements take only a few shifts to find their slots. Selection Sort still performs all $O(n^2)$ comparisons!";
    } else {
      fb.className = "activity-feedback callout-danger";
      fb.innerHTML = "<strong>✕ Incorrect.</strong> Recall that Insertion Sort is adaptive—its inner loop breaks early when elements are already in order, making it run in $O(n)$ on nearly-sorted data!";
    }
    renderMath();
  };

  // -------------------------------------------------------------------------
  // 5. WEB AUDIO SYNTHESIZER (No external assets required!)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTickSound() {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {}
  }

  function playChimeSound(correct = true) {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      if (correct) {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      }
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  }

  function playTimeoutGong() {
    if (!soundEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}
  }

  // -------------------------------------------------------------------------
  // 6. 30-ITEM INTERACTIVE QUIZ WITH 1-MINUTE TIMER PER ITEM
  // -------------------------------------------------------------------------
  const quizOverlay = document.getElementById("quizOverlay");
  const openQuizBtn = document.getElementById("openQuizBtn");
  const closeQuizBtn = document.getElementById("closeQuizBtn");
  const quizSoundToggleBtn = document.getElementById("quizSoundToggle");
  const quizTimerPauseBtn = document.getElementById("quizTimerPause");

  const quizQuestionTitle = document.getElementById("quizQuestionTitle");
  const quizTopicTag = document.getElementById("quizTopicTag");
  const quizOptionsContainer = document.getElementById("quizOptionsContainer");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizFeedbackTitle = document.getElementById("quizFeedbackTitle");
  const quizFeedbackText = document.getElementById("quizFeedbackText");
  const quizFeedbackTip = document.getElementById("quizFeedbackTip");
  const quizPrevBtn = document.getElementById("quizPrevBtn");
  const quizNextBtn = document.getElementById("quizNextBtn");
  const quizCurrentScoreEl = document.getElementById("quizCurrentScore");
  const quizPalette = document.getElementById("quizPalette");
  const quizProgressFill = document.getElementById("quizProgressFill");

  const timerText = document.getElementById("timerText");
  const timerCircleProgress = document.getElementById("timerCircleProgress");

  const quizBody = document.getElementById("quizBody");
  const quizResultsScreen = document.getElementById("quizResultsScreen");

  let quizQuestions = typeof QUIZ_QUESTIONS !== "undefined" ? QUIZ_QUESTIONS : [];
  let currentQuestionIndex = 0;
  let userAnswers = new Array(quizQuestions.length).fill(null);
  let timerInterval = null;
  let timeLeft = 60; // 60 seconds (1 minute) per item!
  let isTimerPaused = false;

  function openQuiz() {
    if (!quizOverlay) return;
    initAudio();
    quizOverlay.classList.add("open");
    if (quizBody) quizBody.style.display = "grid";
    if (quizResultsScreen) quizResultsScreen.classList.remove("show");
    
    buildQuestionPalette();
    loadQuestion(currentQuestionIndex);
  }

  function closeQuiz() {
    if (!quizOverlay) return;
    clearInterval(timerInterval);
    quizOverlay.classList.remove("open");
  }

  if (openQuizBtn) openQuizBtn.addEventListener("click", openQuiz);
  if (closeQuizBtn) closeQuizBtn.addEventListener("click", closeQuiz);

  if (quizSoundToggleBtn) {
    quizSoundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      quizSoundToggleBtn.textContent = soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";
    });
  }

  if (quizTimerPauseBtn) {
    quizTimerPauseBtn.addEventListener("click", () => {
      isTimerPaused = !isTimerPaused;
      quizTimerPauseBtn.textContent = isTimerPaused ? "▶ Resume Timer" : "⏸ Pause Timer";
    });
  }

  function buildQuestionPalette() {
    if (!quizPalette) return;
    quizPalette.innerHTML = "";
    quizQuestions.forEach((q, idx) => {
      const dot = document.createElement("button");
      dot.className = "palette-dot";
      dot.textContent = idx + 1;
      dot.id = `paletteDot-${idx}`;
      dot.title = `Question ${idx + 1}: ${q.topic}`;
      dot.addEventListener("click", () => {
        saveCurrentQuestionTimer();
        loadQuestion(idx);
      });
      quizPalette.appendChild(dot);
    });
    updatePaletteStatus();
  }

  function updatePaletteStatus() {
    quizQuestions.forEach((q, idx) => {
      const dot = document.getElementById(`paletteDot-${idx}`);
      if (!dot) return;
      dot.classList.remove("current", "answered", "wrong");
      if (idx === currentQuestionIndex) {
        dot.classList.add("current");
      }
      if (userAnswers[idx] !== null) {
        if (userAnswers[idx] === q.answer) {
          dot.classList.add("answered");
        } else {
          dot.classList.add("wrong");
        }
      }
    });
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60; // 1 full minute countdown
    isTimerPaused = false;
    if (quizTimerPauseBtn) quizTimerPauseBtn.textContent = "⏸ Pause Timer";
    updateTimerVisual();

    timerInterval = setInterval(() => {
      if (isTimerPaused) return;

      timeLeft--;
      updateTimerVisual();

      // Sound tick in last 5 seconds
      if (timeLeft <= 5 && timeLeft > 0) {
        playTickSound();
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimerExpired();
      }
    }, 1000);
  }

  function updateTimerVisual() {
    if (!timerText || !timerCircleProgress) return;
    timerText.textContent = `${timeLeft}s`;

    const circumference = 100.5;
    const progressFraction = Math.max(0, timeLeft / 60);
    const offset = circumference * (1 - progressFraction);
    timerCircleProgress.style.strokeDashoffset = offset;

    timerCircleProgress.classList.remove("warning", "danger");
    timerText.classList.remove("danger");

    if (timeLeft <= 15) {
      timerCircleProgress.classList.add("danger");
      timerText.classList.add("danger");
    } else if (timeLeft <= 28) {
      timerCircleProgress.classList.add("warning");
    }
  }

  function saveCurrentQuestionTimer() {
    clearInterval(timerInterval);
  }

  function handleTimerExpired() {
    playTimeoutGong();
    if (userAnswers[currentQuestionIndex] === null) {
      userAnswers[currentQuestionIndex] = -1; // timed out
      revealAnswer(currentQuestionIndex, -1, true);
    }
  }

  function loadQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) return;
    currentQuestionIndex = index;
    const q = quizQuestions[index];

    if (quizTopicTag) quizTopicTag.textContent = `Topic: ${q.topic} • Question ${index + 1} of ${quizQuestions.length}`;
    if (quizQuestionTitle) quizQuestionTitle.textContent = q.question;

    const percent = ((index + 1) / quizQuestions.length) * 100;
    if (quizProgressFill) quizProgressFill.style.width = `${percent}%`;

    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.id = `optionBtn-${optIdx}`;
        btn.innerHTML = `
          <span class="option-letter">${letters[optIdx]}</span>
          <span class="option-text">${optText}</span>
        `;
        btn.addEventListener("click", () => handleSelectOption(optIdx));
        quizOptionsContainer.appendChild(btn);
      });
    }

    if (quizFeedback) quizFeedback.classList.remove("show", "wrong");

    if (userAnswers[index] !== null) {
      revealAnswer(index, userAnswers[index], false);
      clearInterval(timerInterval);
      if (timerText) timerText.textContent = "Done";
      if (timerCircleProgress) timerCircleProgress.style.strokeDashoffset = 0;
    } else {
      startTimer();
    }

    if (quizPrevBtn) quizPrevBtn.disabled = index === 0;
    if (quizNextBtn) {
      if (index === quizQuestions.length - 1) {
        quizNextBtn.textContent = "Finish & See Results ›";
      } else {
        quizNextBtn.textContent = "Next Question ›";
      }
    }

    updateScoreDisplay();
    updatePaletteStatus();
  }

  function handleSelectOption(selectedIdx) {
    if (userAnswers[currentQuestionIndex] !== null) return;

    clearInterval(timerInterval);
    userAnswers[currentQuestionIndex] = selectedIdx;
    const q = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIdx === q.answer;

    playChimeSound(isCorrect);
    revealAnswer(currentQuestionIndex, selectedIdx, false);
    updateScoreDisplay();
    updatePaletteStatus();
  }

  function revealAnswer(qIdx, selectedIdx, timedOut = false) {
    const q = quizQuestions[qIdx];
    const isCorrect = selectedIdx === q.answer;

    q.options.forEach((_, idx) => {
      const btn = document.getElementById(`optionBtn-${idx}`);
      if (!btn) return;
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add("correct");
      } else if (idx === selectedIdx) {
        btn.classList.add("incorrect");
      }
    });

    if (quizFeedback) {
      quizFeedback.classList.add("show");
      if (isCorrect) {
        quizFeedback.classList.remove("wrong");
        if (quizFeedbackTitle) quizFeedbackTitle.textContent = "✓ Correct Answer!";
      } else {
        quizFeedback.classList.add("wrong");
        if (quizFeedbackTitle) {
          quizFeedbackTitle.textContent = timedOut 
            ? "⏱ Time's Up! Here is the correct answer:" 
            : "✕ Incorrect. Here is the explanation:";
        }
      }

      if (quizFeedbackText) quizFeedbackText.textContent = q.explanation;
      if (quizFeedbackTip) quizFeedbackTip.textContent = `💡 Classroom Talking Point: ${q.talkingPoint}`;
    }
  }

  function updateScoreDisplay() {
    if (!quizCurrentScoreEl) return;
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const correctCount = userAnswers.filter((a, idx) => a === quizQuestions[idx].answer).length;
    quizCurrentScoreEl.innerHTML = `Score: <strong>${correctCount} / ${answeredCount}</strong> (of 30)`;
  }

  if (quizPrevBtn) {
    quizPrevBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        saveCurrentQuestionTimer();
        loadQuestion(currentQuestionIndex - 1);
      }
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener("click", () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        saveCurrentQuestionTimer();
        loadQuestion(currentQuestionIndex + 1);
      } else {
        showQuizResults();
      }
    });
  }

  function showQuizResults() {
    clearInterval(timerInterval);
    if (quizBody) quizBody.style.display = "none";
    if (quizResultsScreen) {
      quizResultsScreen.classList.add("show");
      
      const total = quizQuestions.length;
      const correct = userAnswers.filter((a, idx) => a === quizQuestions[idx].answer).length;
      const percentage = Math.round((correct / total) * 100);

      const scoreNumber = document.getElementById("resultsScoreNumber");
      const scoreRating = document.getElementById("resultsRating");
      const breakdownTbody = document.getElementById("topicBreakdownTbody");

      if (scoreNumber) {
        scoreNumber.textContent = `${percentage}% (${correct} / ${total})`;
        scoreNumber.className = "results-badge";
        if (percentage >= 80) scoreNumber.classList.add("green");
        else if (percentage >= 60) scoreNumber.classList.add("amber");
        else scoreNumber.classList.add("danger");
      }

      if (scoreRating) {
        if (percentage >= 90) {
          scoreRating.textContent = "Outstanding Mastery! You are ready to present this chapter with confidence in front of the class.";
        } else if (percentage >= 75) {
          scoreRating.textContent = "Great job! Strong grasp of sorting mechanics and Divide-and-Conquer complexity analysis.";
        } else if (percentage >= 50) {
          scoreRating.textContent = "Good foundation. Review the talking points on Merge Sort trees and Insertion Sort shifts.";
        } else {
          scoreRating.textContent = "Needs review. Walk through the slide talking points and re-run the interactive sorting visualizers.";
        }
      }

      if (breakdownTbody) {
        breakdownTbody.innerHTML = "";
        const topicMap = {};
        quizQuestions.forEach((q, idx) => {
          if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, correct: 0 };
          topicMap[q.topic].total++;
          if (userAnswers[idx] === q.answer) topicMap[q.topic].correct++;
        });

        for (const [topic, stats] of Object.entries(topicMap)) {
          const row = document.createElement("tr");
          const pct = Math.round((stats.correct / stats.total) * 100);
          row.innerHTML = `
            <td><strong>${topic}</strong></td>
            <td>${stats.correct} / ${stats.total}</td>
            <td><code style="color: ${pct >= 75 ? 'var(--result)' : pct >= 50 ? 'var(--growth)' : 'var(--danger)'}; font-weight:bold;">${pct}%</code></td>
          `;
          breakdownTbody.appendChild(row);
        }
      }
    }
  }

  const retakeQuizBtn = document.getElementById("retakeQuizBtn");
  if (retakeQuizBtn) {
    retakeQuizBtn.addEventListener("click", () => {
      userAnswers = new Array(quizQuestions.length).fill(null);
      currentQuestionIndex = 0;
      openQuiz();
    });
  }

  const reviewAllQuestionsBtn = document.getElementById("reviewAllQuestionsBtn");
  if (reviewAllQuestionsBtn) {
    reviewAllQuestionsBtn.addEventListener("click", () => {
      if (quizBody) quizBody.style.display = "grid";
      if (quizResultsScreen) quizResultsScreen.classList.remove("show");
      loadQuestion(0);
    });
  }

  // Go to initial slide
  goToSlide(0);

  // Auto-open quiz if launched from Answer Key page
  if (localStorage.getItem("autoOpenQuiz") === "true") {
    localStorage.removeItem("autoOpenQuiz");
    setTimeout(() => {
      openQuiz();
    }, 250);
  }
});

