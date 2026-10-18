/* ==========================================================================
   CS 05 — Chapter 5: Sorting and Divide-and-Conquer
   Interactive Algorithm Simulation Engine
   ========================================================================== */

// Helper to render array bars
function renderArrayBars(containerId, array, states = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  const maxVal = Math.max(...array, 100);

  array.forEach((val, idx) => {
    const barWrap = document.createElement("div");
    barWrap.className = "array-bar-wrapper";

    const bar = document.createElement("div");
    bar.className = "array-bar";
    const heightPercent = Math.max(18, (val / maxVal) * 90);
    bar.style.height = `${heightPercent}px`;
    bar.textContent = val;

    // Apply specific classes
    if (states.sorted && states.sorted.includes(idx)) {
      bar.classList.add("sorted");
    } else if (states.minIdx === idx) {
      bar.classList.add("min-found");
    } else if (states.comparing && states.comparing.includes(idx)) {
      bar.classList.add("comparing");
    } else if (states.current === idx) {
      bar.classList.add("current");
    } else if (states.keyIdx === idx) {
      bar.classList.add("key-item");
    }

    const indexLabel = document.createElement("div");
    indexLabel.className = "array-index";
    indexLabel.textContent = `[${idx}]`;

    barWrap.appendChild(bar);
    barWrap.appendChild(indexLabel);
    container.appendChild(barWrap);
  });
}

// -------------------------------------------------------------
// 1. Selection Sort Simulator
// -------------------------------------------------------------
const SelectionVis = {
  originalArray: [29, 10, 14, 37, 13, 42, 8],
  array: [],
  steps: [],
  stepIndex: 0,
  timer: null,

  init() {
    this.array = [...this.originalArray];
    this.generateSteps();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  randomize() {
    this.stop();
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Math.floor(Math.random() * 85) + 10);
    }
    this.originalArray = arr;
    this.init();
  },

  generateSteps() {
    const a = [...this.originalArray];
    const n = a.length;
    this.steps = [];

    let comparisons = 0;
    let swaps = 0;
    const sorted = [];

    // Initial state
    this.steps.push({
      arr: [...a],
      i: 0,
      j: null,
      minIdx: 0,
      sorted: [...sorted],
      comp: comparisons,
      swaps: swaps,
      status: "Initial array loaded. Ready to begin outer iteration i = 0."
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      this.steps.push({
        arr: [...a],
        i: i,
        j: null,
        minIdx: minIdx,
        sorted: [...sorted],
        comp: comparisons,
        swaps: swaps,
        status: `Starting pass i = ${i}. Set tentative minimum index min_idx = ${i} (value: ${a[minIdx]}).`
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        const isNewMin = a[j] < a[minIdx];
        this.steps.push({
          arr: [...a],
          i: i,
          j: j,
          minIdx: minIdx,
          comparing: [j, minIdx],
          sorted: [...sorted],
          comp: comparisons,
          swaps: swaps,
          status: `Comparing A[${j}] (${a[j]}) with current min A[${minIdx}] (${a[minIdx]}). ${isNewMin ? "Found smaller element!" : "No change."}`
        });

        if (isNewMin) {
          minIdx = j;
          this.steps.push({
            arr: [...a],
            i: i,
            j: j,
            minIdx: minIdx,
            sorted: [...sorted],
            comp: comparisons,
            swaps: swaps,
            status: `Updated min_idx = ${minIdx} (value: ${a[minIdx]}).`
          });
        }
      }

      if (minIdx !== i) {
        swaps++;
        const temp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = temp;
        this.steps.push({
          arr: [...a],
          i: i,
          j: null,
          minIdx: i,
          sorted: [...sorted],
          comp: comparisons,
          swaps: swaps,
          status: `Swapped A[${i}] and A[${minIdx}]. Element ${a[i]} is now placed in its final sorted position!`
        });
      } else {
        this.steps.push({
          arr: [...a],
          i: i,
          j: null,
          minIdx: i,
          sorted: [...sorted],
          comp: comparisons,
          swaps: swaps,
          status: `Element ${a[i]} is already at min_idx = ${i}. No swap needed.`
        });
      }

      sorted.push(i);
    }
    sorted.push(n - 1);

    this.steps.push({
      arr: [...a],
      i: n - 1,
      j: null,
      minIdx: null,
      sorted: [...sorted],
      comp: comparisons,
      swaps: swaps,
      status: `Selection Sort complete! Array fully sorted with ${comparisons} comparisons and ${swaps} swaps.`
    });
  },

  renderCurrentStep() {
    const s = this.steps[this.stepIndex];
    if (!s) return;

    renderArrayBars("sel-array-stage", s.arr, {
      current: s.i,
      minIdx: s.minIdx,
      comparing: s.comparing,
      sorted: s.sorted
    });

    const elI = document.getElementById("sel-metric-i");
    const elJ = document.getElementById("sel-metric-j");
    const elMin = document.getElementById("sel-metric-min");
    const elComp = document.getElementById("sel-metric-comp");
    const elSwaps = document.getElementById("sel-metric-swaps");
    const elStatus = document.getElementById("sel-status-text");

    if (elI) elI.textContent = s.i;
    if (elJ) elJ.textContent = s.j !== null ? s.j : "-";
    if (elMin) elMin.textContent = s.minIdx !== null ? s.minIdx : "-";
    if (elComp) elComp.textContent = s.comp;
    if (elSwaps) elSwaps.textContent = s.swaps;
    if (elStatus) elStatus.textContent = s.status;
  },

  step() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
      this.renderCurrentStep();
    } else {
      this.stop();
    }
  },

  prev() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
      this.renderCurrentStep();
    }
  },

  reset() {
    this.stop();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  togglePlay() {
    if (this.timer) {
      this.stop();
    } else {
      if (this.stepIndex >= this.steps.length - 1) {
        this.stepIndex = 0;
      }
      this.timer = setInterval(() => {
        if (this.stepIndex < this.steps.length - 1) {
          this.step();
        } else {
          this.stop();
        }
      }, 550);
      const btn = document.getElementById("sel-btn-play");
      if (btn) btn.textContent = "Pause";
    }
  },

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const btn = document.getElementById("sel-btn-play");
    if (btn) btn.textContent = "Play";
  }
};

// -------------------------------------------------------------
// 2. Insertion Sort Simulator
// -------------------------------------------------------------
const InsertionVis = {
  originalArray: [38, 12, 44, 7, 26, 19, 5],
  array: [],
  steps: [],
  stepIndex: 0,
  timer: null,

  init() {
    this.array = [...this.originalArray];
    this.generateSteps();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  randomize() {
    this.stop();
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Math.floor(Math.random() * 85) + 10);
    }
    this.originalArray = arr;
    this.init();
  },

  generateSteps() {
    const a = [...this.originalArray];
    const n = a.length;
    this.steps = [];

    let comparisons = 0;
    let shifts = 0;
    const sorted = [0];

    this.steps.push({
      arr: [...a],
      i: 1,
      j: null,
      keyVal: a[1],
      keyIdx: 1,
      sorted: [...sorted],
      comp: comparisons,
      shifts: shifts,
      status: `Initial state: Index 0 (${a[0]}) is trivial sorted prefix. Preparing to insert element at index 1.`
    });

    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;

      this.steps.push({
        arr: [...a],
        i: i,
        j: j,
        keyVal: key,
        keyIdx: i,
        sorted: [...sorted],
        comp: comparisons,
        shifts: shifts,
        status: `Picked up key = ${key} at index ${i}. Scanning sorted prefix to its left.`
      });

      while (j >= 0) {
        comparisons++;
        const shouldShift = a[j] > key;

        this.steps.push({
          arr: [...a],
          i: i,
          j: j,
          keyVal: key,
          comparing: [j],
          sorted: [...sorted],
          comp: comparisons,
          shifts: shifts,
          status: `Comparing key (${key}) with A[${j}] (${a[j]}). ${shouldShift ? `${a[j]} > ${key}: Shift right!` : `${a[j]} <= ${key}: Found insertion slot!`}`
        });

        if (shouldShift) {
          a[j + 1] = a[j];
          shifts++;
          this.steps.push({
            arr: [...a],
            i: i,
            j: j - 1,
            keyVal: key,
            sorted: [...sorted],
            comp: comparisons,
            shifts: shifts,
            status: `Shifted A[${j}] (${a[j]}) rightward to position ${j + 1}.`
          });
          j--;
        } else {
          break;
        }
      }

      a[j + 1] = key;
      sorted.push(i);

      this.steps.push({
        arr: [...a],
        i: i,
        j: null,
        keyVal: key,
        sorted: [...sorted],
        comp: comparisons,
        shifts: shifts,
        status: `Inserted key (${key}) into vacant position ${j + 1}. Prefix A[0..${i}] is now sorted.`
      });
    }

    this.steps.push({
      arr: [...a],
      i: n - 1,
      j: null,
      keyVal: "-",
      sorted: Array.from({ length: n }, (_, idx) => idx),
      comp: comparisons,
      shifts: shifts,
      status: `Insertion Sort complete! Sorted with ${comparisons} comparisons and ${shifts} shifts.`
    });
  },

  renderCurrentStep() {
    const s = this.steps[this.stepIndex];
    if (!s) return;

    renderArrayBars("ins-array-stage", s.arr, {
      current: s.i,
      keyIdx: s.keyIdx,
      comparing: s.comparing,
      sorted: s.sorted
    });

    const elI = document.getElementById("ins-metric-i");
    const elKey = document.getElementById("ins-metric-key");
    const elJ = document.getElementById("ins-metric-j");
    const elComp = document.getElementById("ins-metric-comp");
    const elShifts = document.getElementById("ins-metric-shifts");
    const elStatus = document.getElementById("ins-status-text");

    if (elI) elI.textContent = s.i;
    if (elKey) elKey.textContent = s.keyVal !== undefined ? s.keyVal : "-";
    if (elJ) elJ.textContent = s.j !== null && s.j !== undefined ? s.j : "-";
    if (elComp) elComp.textContent = s.comp;
    if (elShifts) elShifts.textContent = s.shifts;
    if (elStatus) elStatus.textContent = s.status;
  },

  step() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
      this.renderCurrentStep();
    } else {
      this.stop();
    }
  },

  prev() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
      this.renderCurrentStep();
    }
  },

  reset() {
    this.stop();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  togglePlay() {
    if (this.timer) {
      this.stop();
    } else {
      if (this.stepIndex >= this.steps.length - 1) {
        this.stepIndex = 0;
      }
      this.timer = setInterval(() => {
        if (this.stepIndex < this.steps.length - 1) {
          this.step();
        } else {
          this.stop();
        }
      }, 550);
      const btn = document.getElementById("ins-btn-play");
      if (btn) btn.textContent = "Pause";
    }
  },

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const btn = document.getElementById("ins-btn-play");
    if (btn) btn.textContent = "Play";
  }
};

// -------------------------------------------------------------
// 3. Merge Sort Simulator
// -------------------------------------------------------------
const MergeVis = {
  originalArray: [38, 27, 43, 3, 9, 82, 10, 19],
  array: [],
  steps: [],
  stepIndex: 0,
  timer: null,

  init() {
    this.array = [...this.originalArray];
    this.generateSteps();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  randomize() {
    this.stop();
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(Math.floor(Math.random() * 85) + 10);
    }
    this.originalArray = arr;
    this.init();
  },

  generateSteps() {
    const a = [...this.originalArray];
    this.steps = [];
    let comparisons = 0;
    let mergesDone = 0;

    this.steps.push({
      arr: [...a],
      depth: 0,
      range: "[0..7]",
      comp: comparisons,
      merges: mergesDone,
      status: "Initial array. MergeSort begins with problem of size n = 8."
    });

    const merge = (arr, p, q, r, depth) => {
      const left = arr.slice(p, q + 1);
      const right = arr.slice(q + 1, r + 1);

      this.steps.push({
        arr: [...arr],
        depth: depth,
        range: `[${p}..${r}]`,
        comparing: Array.from({ length: r - p + 1 }, (_, k) => p + k),
        comp: comparisons,
        merges: mergesDone,
        status: `Merging sorted halves Left [${left.join(", ")}] and Right [${right.join(", ")}].`
      });

      let i = 0, j = 0, k = p;
      while (i < left.length && j < right.length) {
        comparisons++;
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        k++;
      }
      while (i < left.length) { arr[k] = left[i]; i++; k++; }
      while (j < right.length) { arr[k] = right[j]; j++; k++; }

      mergesDone++;
      this.steps.push({
        arr: [...arr],
        depth: depth,
        range: `[${p}..${r}]`,
        sorted: Array.from({ length: r - p + 1 }, (_, idx) => p + idx),
        comp: comparisons,
        merges: mergesDone,
        status: `Merged range [${p}..${r}] successfully: [${arr.slice(p, r + 1).join(", ")}].`
      });
    };

    const sort = (arr, p, r, depth) => {
      if (p >= r) return;
      const q = Math.floor((p + r) / 2);

      this.steps.push({
        arr: [...arr],
        depth: depth,
        range: `[${p}..${r}]`,
        comp: comparisons,
        merges: mergesDone,
        status: `Dividing range [${p}..${r}] into [${p}..${q}] and [${q+1}..${r}].`
      });

      sort(arr, p, q, depth + 1);
      sort(arr, q + 1, r, depth + 1);
      merge(arr, p, q, r, depth);
    };

    sort(a, 0, a.length - 1, 1);

    this.steps.push({
      arr: [...a],
      depth: 0,
      range: "[0..7]",
      sorted: [0,1,2,3,4,5,6,7],
      comp: comparisons,
      merges: mergesDone,
      status: `Merge Sort complete! Array fully sorted in Theta(n log n) with ${comparisons} comparisons.`
    });
  },

  renderCurrentStep() {
    const s = this.steps[this.stepIndex];
    if (!s) return;

    renderArrayBars("merge-array-stage", s.arr, {
      sorted: s.sorted,
      comparing: s.comparing
    });

    const elDepth = document.getElementById("merge-metric-depth");
    const elRange = document.getElementById("merge-metric-range");
    const elComp = document.getElementById("merge-metric-comp");
    const elMerges = document.getElementById("merge-metric-merges");
    const elStatus = document.getElementById("merge-status-text");

    if (elDepth) elDepth.textContent = s.depth;
    if (elRange) elRange.textContent = s.range;
    if (elComp) elComp.textContent = s.comp;
    if (elMerges) elMerges.textContent = s.merges;
    if (elStatus) elStatus.textContent = s.status;
  },

  step() {
    if (this.stepIndex < this.steps.length - 1) {
      this.stepIndex++;
      this.renderCurrentStep();
    } else {
      this.stop();
    }
  },

  prev() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
      this.renderCurrentStep();
    }
  },

  reset() {
    this.stop();
    this.stepIndex = 0;
    this.renderCurrentStep();
  },

  togglePlay() {
    if (this.timer) {
      this.stop();
    } else {
      if (this.stepIndex >= this.steps.length - 1) {
        this.stepIndex = 0;
      }
      this.timer = setInterval(() => {
        if (this.stepIndex < this.steps.length - 1) {
          this.step();
        } else {
          this.stop();
        }
      }, 700);
      const btn = document.getElementById("merge-btn-play");
      if (btn) btn.textContent = "Pause";
    }
  },

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const btn = document.getElementById("merge-btn-play");
    if (btn) btn.textContent = "Play";
  }
};

// -------------------------------------------------------------
// 4. Algorithm Race Simulator
// -------------------------------------------------------------
const RaceLab = {
  runBenchmark(type) {
    const n = 12;
    let base = [];

    if (type === 'random') {
      for (let i = 0; i < n; i++) base.push(Math.floor(Math.random() * 80) + 15);
    } else if (type === 'sorted') {
      for (let i = 0; i < n; i++) base.push(10 + i * 7);
    } else if (type === 'reversed') {
      for (let i = 0; i < n; i++) base.push(95 - i * 7);
    } else if (type === 'nearly_sorted') {
      for (let i = 0; i < n; i++) base.push(10 + i * 7);
      // swap 2 pairs
      [base[3], base[4]] = [base[4], base[3]];
      [base[9], base[10]] = [base[10], base[9]];
    }

    // Benchmark Selection Sort
    let selComp = 0, selSwaps = 0;
    const selArr = [...base];
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        selComp++;
        if (selArr[j] < selArr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        selSwaps++;
        [selArr[i], selArr[minIdx]] = [selArr[minIdx], selArr[i]];
      }
    }

    // Benchmark Insertion Sort
    let insComp = 0, insShifts = 0;
    const insArr = [...base];
    for (let i = 1; i < n; i++) {
      const key = insArr[i];
      let j = i - 1;
      while (j >= 0) {
        insComp++;
        if (insArr[j] > key) {
          insArr[j + 1] = insArr[j];
          insShifts++;
          j--;
        } else {
          break;
        }
      }
      insArr[j + 1] = key;
    }

    // Benchmark Merge Sort
    let mergeComp = 0, mergeCopies = 0;
    const mergeArr = [...base];
    const mSort = (arr, p, r) => {
      if (p >= r) return;
      const q = Math.floor((p + r) / 2);
      mSort(arr, p, q);
      mSort(arr, q + 1, r);
      
      const left = arr.slice(p, q + 1);
      const right = arr.slice(q + 1, r + 1);
      mergeCopies += left.length + right.length;

      let i = 0, j = 0, k = p;
      while (i < left.length && j < right.length) {
        mergeComp++;
        if (left[i] <= right[j]) {
          arr[k] = left[i++];
        } else {
          arr[k] = right[j++];
        }
        k++;
      }
      while (i < left.length) arr[k++] = left[i++];
      while (j < right.length) arr[k++] = right[j++];
    };
    mSort(mergeArr, 0, n - 1);

    // Update UI
    const elSel = document.getElementById("race-sel-status");
    if (elSel) {
      elSel.innerHTML = `Comparisons: <strong>${selComp}</strong><br>Swaps: <strong>${selSwaps}</strong><br>Total Ops: <strong>${selComp + selSwaps}</strong>`;
    }
    renderArrayBars("race-sel-stage", selArr, { sorted: Array.from({length: n}, (_, i) => i) });

    const elIns = document.getElementById("race-ins-status");
    if (elIns) {
      elIns.innerHTML = `Comparisons: <strong>${insComp}</strong><br>Shifts: <strong>${insShifts}</strong><br>Total Ops: <strong>${insComp + insShifts}</strong>`;
    }
    renderArrayBars("race-ins-stage", insArr, { sorted: Array.from({length: n}, (_, i) => i) });

    const elMerge = document.getElementById("race-merge-status");
    if (elMerge) {
      elMerge.innerHTML = `Comparisons: <strong>${mergeComp}</strong><br>Buffer Copies: <strong>${mergeCopies}</strong><br>Total Ops: <strong>${mergeComp + mergeCopies}</strong>`;
    }
    renderArrayBars("race-merge-stage", mergeArr, { sorted: Array.from({length: n}, (_, i) => i) });
  }
};
