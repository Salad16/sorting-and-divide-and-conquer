/* ==========================================================================
   CS 05 — Chapter 5: Sorting and Divide-and-Conquer
   Slides Content Database
   ========================================================================== */

const SLIDES_DATA = [
  // -------------------------------------------------------------
  // SLIDE 1: Opening Title Slide
  // -------------------------------------------------------------
  {
    id: "opening",
    section: "Overview",
    sectionId: "sec-overview",
    kicker: "CS 05 • Algorithms & Complexity • Chapter 5",
    title: "Sorting and Divide-and-Conquer",
    type: "opening",
    content: `
      <div class="opening-layout">
        <div class="opening-left">
          <p class="kicker">CS 05 • Algorithms & Complexity • Chapter 5</p>
          <h1>Sorting &amp; <em>Divide-and-Conquer</em></h1>
          <p class="opening-lead">
            From elementary quadratic incremental algorithms to optimal logarithmic recursion trees.
            Discover how problem decomposition breaks the $O(n^2)$ barrier.
          </p>
          <div class="course-meta">
            <span>8 Core Sections</span>
            <span>Live Interactive Simulations</span>
            <span>Asymptotic Derivations</span>
          </div>
        </div>
        <div class="opening-right">
          <div class="chapter-thread">
            <div class="chapter-thread-item" onclick="Deck.goToSlide(3)">
              <span>01</span>
              <p>Selection Sort Algorithm</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(6)">
              <span>02</span>
              <p>Selection Sort Complexity</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(8)">
              <span>03</span>
              <p>Insertion Sort Algorithm</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(11)">
              <span>04</span>
              <p>Insertion Sort Complexity</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(14)">
              <span>05</span>
              <p>Recursion &amp; Divide-and-Conquer</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(16)">
              <span>06</span>
              <p>Merge Sort Algorithm</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(20)">
              <span>07</span>
              <p>Recursion Tree &amp; Complexity</p>
            </div>
            <div class="chapter-thread-item" onclick="Deck.goToSlide(24)">
              <span>08</span>
              <p>Comparing &amp; Choosing Algorithms</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 2: Learning Outcomes
  // -------------------------------------------------------------
  {
    id: "learning-outcomes",
    section: "Overview",
    sectionId: "sec-overview",
    kicker: "Chapter Roadmap",
    title: "What You Will Master in Chapter 5",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Core Analytical Goals</span>
          <h3>From Intuition to Rigorous Proof</h3>
          <p>By the end of this chapter, you will be able to analyze, prove, trace, and implement sorting mechanisms using asymptotic frameworks.</p>
          <div class="pipeline" style="margin-top: 20px;">
            <div class="pipeline-item actual">Incremental<br>Scanning</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-item growth">Inversion<br>Shifting</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-item result">Recursive<br>Halving</div>
          </div>
          <div class="callout callout-actual" style="margin-top: auto;">
            <span>Formal Definition</span>
            <p><strong>Input:</strong> A sequence of $n$ numbers $\\langle a_1, a_2, \\dots, a_n \\rangle$.<br>
            <strong>Output:</strong> A permutation $\\langle a'_1, a'_2, \\dots, a'_n \\rangle$ such that $a'_1 \\le a'_2 \\le \\dots \\le a'_n$.</p>
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">Checklist of Competencies</span>
          <ol style="margin-top: 10px;">
            <li class="reveal-unit is-visible" style="margin-bottom: 14px;">
              <strong>Loop Invariant Analysis:</strong> State and prove correctness invariants for incremental algorithms.
            </li>
            <li class="reveal-unit" style="margin-bottom: 14px;">
              <strong>Arithmetic Series Summation:</strong> Derive exact comparison counts $\\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2}$ yielding $\\Theta(n^2)$.
            </li>
            <li class="reveal-unit" style="margin-bottom: 14px;">
              <strong>Adaptive Behavior:</strong> Explain why Insertion Sort achieves $\\Theta(n)$ best-case while Selection Sort remains stuck in $\\Theta(n^2)$.
            </li>
            <li class="reveal-unit" style="margin-bottom: 14px;">
              <strong>Divide-and-Conquer Recurrences:</strong> Construct recursion trees to prove Merge Sort achieves optimal $\\Theta(n \\log n)$ time.
            </li>
            <li class="reveal-unit">
              <strong>Engineering Trade-offs:</strong> Select the optimal algorithm based on cache locality, stability, in-place memory, and dataset order.
            </li>
          </ol>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 3: Key Properties of Sorting
  // -------------------------------------------------------------
  {
    id: "sorting-properties",
    section: "Fundamentals",
    sectionId: "sec-overview",
    kicker: "Taxonomy & Vocabulary",
    title: "Crucial Properties of Sorting Algorithms",
    type: "content",
    content: `
      <div class="three-column-grid">
        <div class="panel">
          <div class="definition definition-actual">
            <strong>In-Place Sorting</strong>
            <p>An algorithm sorts <em>in-place</em> if the numbers are rearranged inside the original input array with at most $O(1)$ auxiliary memory.</p>
          </div>
          <p style="font-size: 16px; color: var(--muted);">Does not allocate an auxiliary array proportional to $n$. Memory consumption remains constant regardless of array size.</p>
          <div class="formula formula-actual" style="margin-top: auto;">Auxiliary Space: $O(1)$</div>
        </div>

        <div class="panel">
          <div class="definition definition-growth">
            <strong>Stability</strong>
            <p>A sorting algorithm is <em>stable</em> if elements with equal keys preserve their relative order from the original input sequence.</p>
          </div>
          <p style="font-size: 16px; color: var(--muted);">Vital when sorting records with multiple fields (e.g., sorting by First Name after already sorting by Last Name).</p>
          <div class="formula formula-growth" style="margin-top: auto;">$K_i = K_j \\implies i < j \\to i' < j'$</div>
        </div>

        <div class="panel">
          <div class="definition definition-result">
            <strong>Adaptivity</strong>
            <p>An algorithm is <em>adaptive</em> if its running time improves naturally when the input array is already partially or fully sorted.</p>
          </div>
          <p style="font-size: 16px; color: var(--muted);">Takes advantage of pre-existing order to skip comparisons and data movements (e.g. Insertion Sort drops to linear time).</p>
          <div class="formula formula-result" style="margin-top: auto;">Best Time: $\\Theta(n)$ vs $\\Theta(n^2)$</div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 4: Topic 1 — Selection Sort: The Algorithm
  // -------------------------------------------------------------
  {
    id: "selection-sort-concept",
    section: "Selection Sort",
    sectionId: "sec-selection",
    kicker: "Topic 1 • Selection Sort Algorithm",
    title: "Selection Sort: The Incremental Minimum Strategy",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Algorithmic Intuition</span>
          <h3>Repeated Selection of the Global Minimum</h3>
          <p>Selection Sort divides the array into two logical sections: a <strong>sorted prefix</strong> on the left, and an <strong>unsorted suffix</strong> on the right.</p>
          <div class="pipeline" style="margin: 18px 0;">
            <div class="pipeline-item result" style="flex: 0.8;">Sorted Prefix<br><small>$A[0..i-1]$</small></div>
            <div class="pipeline-arrow">|</div>
            <div class="pipeline-item actual" style="flex: 1.4;">Unsorted Suffix<br><small>$A[i..n-1]$</small></div>
          </div>
          <ol style="font-size: 17px; line-height: 1.5;">
            <li>Find the smallest element in the unsorted suffix $A[i..n-1]$.</li>
            <li>Swap that minimum element with the item currently at index $i$.</li>
            <li>Advance the partition boundary $i$ by 1.</li>
            <li>Repeat for $i = 0, 1, \\dots, n-2$.</li>
          </ol>
          <div class="callout callout-actual" style="margin-top: auto;">
            <span>Loop Invariant</span>
            <p>At the start of each iteration $i$, subarray $A[0..i-1]$ contains the $i$ smallest elements of the entire array, in sorted order.</p>
          </div>
        </div>

        <div class="code-block-wrapper">
          <div class="code-header">
            <span>selection_sort.py</span>
            <span>Python 3 Implementation</span>
          </div>
          <pre class="code-block"><code><span class="kw">def</span> <span class="fn">selection_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="comment"># Outer loop advances sorted boundary</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n - <span class="num">1</span>):
        min_idx = i
        <span class="comment"># Inner loop finds minimum in unsorted suffix</span>
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i + <span class="num">1</span>, n):
            <span class="kw">if</span> arr[j] &lt; arr[min_idx]:
                min_idx = j
        
        <span class="comment"># Swap the found minimum into position i</span>
        <span class="kw">if</span> min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    <span class="kw">return</span> arr</code></pre>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 5: Selection Sort Execution Trace
  // -------------------------------------------------------------
  {
    id: "selection-sort-trace",
    section: "Selection Sort",
    sectionId: "sec-selection",
    kicker: "Topic 1 • Concrete Execution",
    title: "Step-by-Step Execution Trace for n = 5",
    type: "content",
    content: `
      <div class="split-layout-wide-right">
        <div class="panel">
          <span class="prompt-label">Trace Analysis</span>
          <h3>Array: [29, 10, 14, 37, 13]</h3>
          <p>Observe how exactly one element transitions into its final sorted position at the end of each outer pass.</p>
          <div class="definition definition-growth">
            <strong>Key Observation: Minimal Swaps</strong>
            <p>Notice that Selection Sort executes at most <strong>1 swap per outer iteration</strong>, totaling at most $n-1$ swaps overall.</p>
          </div>
          <div class="callout callout-danger" style="margin-top: auto;">
            <span>Instability Trap</span>
            <p>Selection sort is inherently <strong>unstable</strong>. Long-distance swaps can leapfrog identical keys (e.g. $[2_a, 2_b, 1] \\to [1, 2_b, 2_a]$).</p>
          </div>
        </div>

        <div class="panel">
          <table class="trace-table">
            <thead>
              <tr>
                <th>Pass (i)</th>
                <th>Subarray State</th>
                <th>Min Found</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Start</td>
                <td><code>[29, 10, 14, 37, 13]</code></td>
                <td>-</td>
                <td>Initial input</td>
              </tr>
              <tr class="highlight">
                <td>i = 0</td>
                <td><code>[<strong>10</strong> | 29, 14, 37, 13]</code></td>
                <td>10 (idx 1)</td>
                <td>Swap A[0] with A[1]</td>
              </tr>
              <tr>
                <td>i = 1</td>
                <td><code>[10, <strong>13</strong> | 14, 37, 29]</code></td>
                <td>13 (idx 4)</td>
                <td>Swap A[1] with A[4]</td>
              </tr>
              <tr class="highlight">
                <td>i = 2</td>
                <td><code>[10, 13, <strong>14</strong> | 37, 29]</code></td>
                <td>14 (idx 2)</td>
                <td>Already in place</td>
              </tr>
              <tr>
                <td>i = 3</td>
                <td><code>[10, 13, 14, <strong>29</strong> | 37]</code></td>
                <td>29 (idx 4)</td>
                <td>Swap A[3] with A[4]</td>
              </tr>
              <tr class="highlight">
                <td>End</td>
                <td><code>[10, 13, 14, 29, 37]</code></td>
                <td>-</td>
                <td>Array is fully sorted!</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 14px; color: var(--muted); margin: 6px 0 0;">Total Comparisons: 4 + 3 + 2 + 1 = 10 comparisons. Total Swaps: 3 swaps.</p>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 6: Selection Sort Live Visualizer
  // -------------------------------------------------------------
  {
    id: "selection-sort-vis",
    section: "Selection Sort",
    sectionId: "sec-selection",
    kicker: "Topic 1 • Interactive Simulator",
    title: "Selection Sort: Live Interactive Visualizer",
    type: "interactive-selection",
    content: `
      <div class="visualizer-card" id="selection-vis-card">
        <div class="vis-header">
          <div class="vis-title">Interactive Array Simulation</div>
          <div class="vis-metrics">
            <span>Pass (i): <strong id="sel-metric-i">0</strong></span>
            <span>Comparing (j): <strong id="sel-metric-j">-</strong></span>
            <span>Min Idx: <strong id="sel-metric-min">0</strong></span>
            <span>Comparisons: <strong id="sel-metric-comp">0</strong></span>
            <span>Swaps: <strong id="sel-metric-swaps">0</strong></span>
          </div>
        </div>

        <div class="array-stage" id="sel-array-stage">
          <!-- Dynamically populated by visualizer.js -->
        </div>

        <div class="vis-status-text" id="sel-status-text">
          Ready. Click 'Next Step' or 'Play' to observe Selection Sort scan for the minimum.
        </div>

        <div class="vis-controls">
          <button class="primary" id="sel-btn-step" onclick="SelectionVis.step()">Next Step (Space)</button>
          <button id="sel-btn-play" onclick="SelectionVis.togglePlay()">Play / Pause</button>
          <button id="sel-btn-reset" onclick="SelectionVis.reset()">Reset</button>
          <button id="sel-btn-random" onclick="SelectionVis.randomize()">New Random Array</button>
          <span style="margin-left: auto; font-size: 13px; color: var(--muted);">Speed: 500ms</span>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 7: Topic 2 — Selection Sort Time Complexity
  // -------------------------------------------------------------
  {
    id: "selection-complexity-math",
    section: "Selection Sort",
    sectionId: "sec-selection",
    kicker: "Topic 2 • Mathematical Derivation",
    title: "Selection Sort: Exact Comparison Counting",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">Formal Cost Analysis</span>
          <h3>Summation of the Inner Loop</h3>
          <p>Let $n$ be the size of the array. The outer loop index $i$ ranges from $0$ up to $n - 2$.</p>
          <p>For each outer index $i$, the inner loop $j$ compares $arr[j]$ against $arr[min\\_idx]$ for all $j$ from $i + 1$ to $n - 1$.</p>
          <div class="formula formula-actual">
            $$\\text{Comparisons at step } i = n - 1 - i$$
          </div>
          <p>Summing across all $n-1$ outer iterations:</p>
          <div class="formula formula-growth">
            $$C(n) = \\sum_{i=0}^{n-2} (n - 1 - i) = (n - 1) + (n - 2) + \\dots + 2 + 1$$
          </div>
          <p>This is the standard arithmetic series of the first $n-1$ positive integers!</p>
        </div>

        <div class="panel">
          <span class="prompt-label">Closed-Form Evaluation</span>
          <div class="definition definition-result">
            <strong>Closed Form Solution</strong>
            <p>Using Gauss's triangular summation formula $\\sum_{k=1}^{m} k = \\frac{m(m+1)}{2}$ with $m = n - 1$:</p>
          </div>
          <div class="formula formula-result" style="font-size: 20px; text-align: center;">
            $$C(n) = \\frac{(n-1)n}{2} = \\frac{1}{2}n^2 - \\frac{1}{2}n$$
          </div>
          <div class="callout callout-actual" style="margin-top: 14px;">
            <span>Asymptotic Classification</span>
            <p>The leading quadratic term dominates. Therefore:<br>
            <strong>$C(n) = \\Theta(n^2)$ Comparisons.</strong></p>
          </div>
          <div class="callout callout-growth" style="margin-top: 10px;">
            <span>Swap Count</span>
            <p>At most $1$ swap per outer loop: $S(n) \\le n - 1 = O(n)$ swaps.</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 8: Selection Sort: Best, Average, Worst Case
  // -------------------------------------------------------------
  {
    id: "selection-cases",
    section: "Selection Sort",
    sectionId: "sec-selection",
    kicker: "Topic 2 • Asymptotic Profile",
    title: "Why Selection Sort Is Non-Adaptive: All Cases $\\Theta(n^2)$",
    type: "content",
    content: `
      <div class="three-column-grid">
        <div class="panel">
          <div class="definition definition-actual">
            <strong>Best-Case Scenario</strong>
            <p>Array already sorted: <code>[1, 2, 3, 4, 5]</code></p>
          </div>
          <p>The algorithm <strong>still</strong> must examine every element in the unsorted suffix to confirm no smaller value exists!</p>
          <div class="formula formula-actual">Comparisons: $\\frac{n(n-1)}{2}$</div>
          <div class="formula formula-actual">Time: $\\Theta(n^2)$</div>
          <p style="font-size: 14px; color: var(--muted);">0 actual swaps performed, but all comparisons still happen.</p>
        </div>

        <div class="panel">
          <div class="definition definition-growth">
            <strong>Average-Case Scenario</strong>
            <p>Arbitrary random permutation of numbers</p>
          </div>
          <p>On average, the minimum index updates occasionally during the inner loop scan. The loop bounds remain completely unaltered.</p>
          <div class="formula formula-growth">Comparisons: $\\frac{n(n-1)}{2}$</div>
          <div class="formula formula-growth">Time: $\\Theta(n^2)$</div>
          <p style="font-size: 14px; color: var(--muted);">Expected swaps: $\\approx n - 1$.</p>
        </div>

        <div class="panel">
          <div class="definition definition-danger">
            <strong>Worst-Case Scenario</strong>
            <p>Array in reverse sorted order</p>
          </div>
          <p>Every single step scans the full suffix; the current minimum variable updates on almost every comparison.</p>
          <div class="formula formula-danger">Comparisons: $\\frac{n(n-1)}{2}$</div>
          <div class="formula formula-danger">Time: $\\Theta(n^2)$</div>
          <p style="font-size: 14px; color: var(--muted);">Maximum comparisons + $n - 1$ swaps.</p>
        </div>
      </div>
      <div class="callout callout-actual" style="margin-top: 18px;">
        <span>The Key Lesson</span>
        <p>Selection Sort has <strong>blind comparisons</strong>. Because its loop boundaries do not terminate early, its Best, Worst, and Average case running times are all identical: $\\Theta(n^2)$.</p>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 9: Topic 3 — Insertion Sort: The Algorithm
  // -------------------------------------------------------------
  {
    id: "insertion-sort-concept",
    section: "Insertion Sort",
    sectionId: "sec-insertion",
    kicker: "Topic 3 • Insertion Sort Algorithm",
    title: "Insertion Sort: The Card Player's Insertion Strategy",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Algorithmic Intuition</span>
          <h3>Sorting Hand of Cards</h3>
          <p>Imagine holding cards in your hand. You pick up the next card (the <strong>key</strong>), compare it against cards to the left, and shift larger cards one position to the right until you find its correct insertion slot.</p>
          <div class="definition definition-growth">
            <strong>Incremental Invariant</strong>
            <p>At the start of iteration $i$, the subarray $A[0..i-1]$ consists of the elements originally in $A[0..i-1]$, but sorted.</p>
          </div>
          <ol style="font-size: 16px; line-height: 1.45;">
            <li>Pick $key = A[i]$ where $i = 1, 2, \\dots, n-1$.</li>
            <li>Compare $key$ with $A[j]$ moving backwards from $j = i-1$.</li>
            <li>While $j \\ge 0$ and $A[j] > key$, shift $A[j]$ to $A[j+1]$.</li>
            <li>Place $key$ into its vacated position at $A[j+1]$.</li>
          </ol>
        </div>

        <div class="code-block-wrapper">
          <div class="code-header">
            <span>insertion_sort.py</span>
            <span>Python 3 Implementation</span>
          </div>
          <pre class="code-block"><code><span class="kw">def</span> <span class="fn">insertion_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="comment"># Outer loop processes each key from index 1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, n):
        key = arr[i]
        j = i - <span class="num">1</span>
        
        <span class="comment"># Move elements greater than key one position ahead</span>
        <span class="kw">while</span> j &gt;= <span class="num">0</span> <span class="kw">and</span> arr[j] &gt; key:
            arr[j + <span class="num">1</span>] = arr[j]  <span class="comment"># Shift right</span>
            j -= <span class="num">1</span>
            
        <span class="comment"># Insert key into open position</span>
        arr[j + <span class="num">1</span>] = key
    <span class="kw">return</span> arr</code></pre>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 10: Insertion Sort Execution Trace
  // -------------------------------------------------------------
  {
    id: "insertion-sort-trace",
    section: "Insertion Sort",
    sectionId: "sec-insertion",
    kicker: "Topic 3 • Concrete Execution",
    title: "Tracing Insertion Sort: Keys and Shifting",
    type: "content",
    content: `
      <div class="split-layout-wide-right">
        <div class="panel">
          <span class="prompt-label">Execution Trace</span>
          <h3>Array: [5, 2, 4, 6, 1, 3]</h3>
          <p>Unlike Selection Sort which scans forward, Insertion Sort looks backward and shifts elements rightward.</p>
          <div class="callout callout-result">
            <span>Stability Guarantee</span>
            <p>Insertion Sort is <strong>stable</strong>! Because the condition is <code>arr[j] > key</code> (strict inequality), an element is never shifted past an identical key.</p>
          </div>
          <div class="callout callout-actual" style="margin-top: 14px;">
            <span>In-Place Memory</span>
            <p>Auxiliary Space: $O(1)$ extra space needed (only the temporary <code>key</code> and loop index <code>j</code>).</p>
          </div>
        </div>

        <div class="panel">
          <table class="trace-table">
            <thead>
              <tr>
                <th>Step (i)</th>
                <th>Key</th>
                <th>Shifts Executed</th>
                <th>Array State After Step</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Start</td>
                <td>-</td>
                <td>-</td>
                <td><code>[5, 2, 4, 6, 1, 3]</code></td>
              </tr>
              <tr class="highlight">
                <td>i = 1</td>
                <td><code>2</code></td>
                <td>5 shifts right</td>
                <td><code>[<strong>2, 5</strong>, 4, 6, 1, 3]</code></td>
              </tr>
              <tr>
                <td>i = 2</td>
                <td><code>4</code></td>
                <td>5 shifts right</td>
                <td><code>[<strong>2, 4, 5</strong>, 6, 1, 3]</code></td>
              </tr>
              <tr class="highlight">
                <td>i = 3</td>
                <td><code>6</code></td>
                <td>0 shifts (6 > 5)</td>
                <td><code>[<strong>2, 4, 5, 6</strong>, 1, 3]</code></td>
              </tr>
              <tr>
                <td>i = 4</td>
                <td><code>1</code></td>
                <td>6, 5, 4, 2 shift right</td>
                <td><code>[<strong>1, 2, 4, 5, 6</strong>, 3]</code></td>
              </tr>
              <tr class="highlight">
                <td>i = 5</td>
                <td><code>3</code></td>
                <td>6, 5, 4 shift right</td>
                <td><code>[<strong>1, 2, 3, 4, 5, 6</strong>]</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 11: Insertion Sort Live Visualizer
  // -------------------------------------------------------------
  {
    id: "insertion-sort-vis",
    section: "Insertion Sort",
    sectionId: "sec-insertion",
    kicker: "Topic 3 • Interactive Simulator",
    title: "Insertion Sort: Live Interactive Visualizer",
    type: "interactive-insertion",
    content: `
      <div class="visualizer-card" id="insertion-vis-card">
        <div class="vis-header">
          <div class="vis-title">Interactive Insertion Simulation</div>
          <div class="vis-metrics">
            <span>Pass (i): <strong id="ins-metric-i">1</strong></span>
            <span>Key Value: <strong id="ins-metric-key">-</strong></span>
            <span>Comparing (j): <strong id="ins-metric-j">-</strong></span>
            <span>Comparisons: <strong id="ins-metric-comp">0</strong></span>
            <span>Shifts: <strong id="ins-metric-shifts">0</strong></span>
          </div>
        </div>

        <div class="array-stage" id="ins-array-stage">
          <!-- Dynamically populated by visualizer.js -->
        </div>

        <div class="vis-status-text" id="ins-status-text">
          Ready. Click 'Next Step' or 'Play' to watch elements shift and insert into the sorted prefix.
        </div>

        <div class="vis-controls">
          <button class="primary" id="ins-btn-step" onclick="InsertionVis.step()">Next Step (Space)</button>
          <button id="ins-btn-play" onclick="InsertionVis.togglePlay()">Play / Pause</button>
          <button id="ins-btn-reset" onclick="InsertionVis.reset()">Reset</button>
          <button id="ins-btn-random" onclick="InsertionVis.randomize()">New Random Array</button>
          <span style="margin-left: auto; font-size: 13px; color: var(--muted);">Adaptive &amp; In-Place</span>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // SLIDE 12: Topic 4 — Insertion Sort Time Complexity: Best Case (GFG)
  // -------------------------------------------------------------
  {
    id: "insertion-best-case",
    section: "Insertion Sort",
    sectionId: "sec-insertion",
    kicker: "Topic 4 • GeeksforGeeks Reference Analysis",
    title: "Insertion Sort Complexity: Best-Case O(n)",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <div class="callout callout-actual">
            <span>GeeksforGeeks Foundation</span>
            <p>"Insertion Sort is a simple sorting algorithm that builds the sorted array one element at a time. It takes an element from the unsorted part and inserts it into its correct position in the sorted part. The time taken depends on how elements are arranged."</p>
          </div>
          <h3>Best Case: Already Sorted Array</h3>
          <p>Occurs when array is already in ascending order: e.g., <code>[1, 2, 3, 4, 5]</code>.</p>
          <ul style="font-size: 16px; line-height: 1.55;">
            <li>Each element is compared only once with the item immediately before it.</li>
            <li>It is already in its correct position: <strong>zero shifts required</strong>!</li>
            <li>For $n$ elements, performs exactly $n - 1$ comparisons.</li>
          </ul>
          <div class="formula formula-result">
            $$\\text{Best-Case Time Complexity: } O(n)$$
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">GeeksforGeeks Complexity Matrix</span>
          <table class="editorial-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Comparisons / Shifts</th>
                <th>Time Complexity</th>
                <th>Auxiliary Space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Best Case</strong></td>
                <td><code>n - 1</code></td>
                <td><code style="color:var(--result);">O(n)</code></td>
                <td><code>O(1)</code></td>
              </tr>
              <tr>
                <td><strong>Average Case</strong></td>
                <td><code>≈ n² / 4</code></td>
                <td><code style="color:var(--growth);">O(n²)</code></td>
                <td><code>O(1)</code></td>
              </tr>
              <tr>
                <td><strong>Worst Case</strong></td>
                <td><code>n(n - 1) / 2</code></td>
                <td><code style="color:var(--danger);">O(n²)</code></td>
                <td><code>O(1)</code></td>
              </tr>
            </tbody>
          </table>

          <div class="definition definition-result" style="margin-top: 14px;">
            <strong>GFG Auxiliary Space Note</strong>
            <p>Insertion Sort sorts in place: uses only a few scalar variables such as <code>key</code> and <code>j</code>. Extra memory remains constant: <strong>O(1) Auxiliary Space</strong>.</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 13: Insertion Sort: Worst & Average Case (GFG)
  // -------------------------------------------------------------
  {
    id: "insertion-worst-average",
    section: "Insertion Sort",
    sectionId: "sec-insertion",
    kicker: "Topic 4 • Worst & Average Case Analysis (GFG)",
    title: "Reverse Order & Average Shifts: O(n²)",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">GFG Worst-Case Analysis</span>
          <h3>Array in Reverse Order: [5, 4, 3, 2, 1]</h3>
          <p>Each new element must be compared with and shifted past <strong>all</strong> elements before it in the sorted subarray.</p>
          <div class="formula formula-danger">
            $$\\text{Total Work} = 1 + 2 + 3 + \\dots + (n - 1) = \\frac{n(n - 1)}{2}$$
          </div>
          <p>The dominant term is $n^2$, therefore:</p>
          <div class="formula formula-danger">
            $$\\text{Worst-Case Time Complexity: } O(n^2)$$
          </div>
          <p style="color: var(--muted); font-size: 14px;">All $n(n-1)/2$ inversions must be shifted one by one.</p>
        </div>

        <div class="panel">
          <span class="prompt-label">GFG Average-Case Analysis</span>
          <h3>Random Order Input</h3>
          <p>For each element, Insertion Sort compares and shifts some elements in the sorted portion.</p>
          <ul style="font-size: 16px; line-height: 1.55;">
            <li>On average, each element moves through <strong>about half</strong> of the elements in the sorted portion.</li>
            <li>Total shifts are approximately: <strong>$n(n - 1) / 4 \\approx n^2 / 4$</strong>.</li>
            <li>This grows proportionally to $n^2$.</li>
          </ul>
          <div class="formula formula-growth">
            $$\\text{Average-Case Time Complexity: } O(n^2)$$
          </div>
          <div class="callout callout-result" style="margin-top: 10px;">
            <span>Classroom Talking Point</span>
            <p>"Highlight this to the class: Insertion Sort is adaptive—it transitions smoothly from $O(n)$ up to $O(n^2)$ depending on how sorted the array already is!"</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 14: Checkpoint: Selection vs Insertion Sort
  // -------------------------------------------------------------
  {
    id: "checkpoint-sel-ins",
    section: "Checkpoint",
    sectionId: "sec-insertion",
    kicker: "Formative Assessment",
    title: "Quick Check: Selection Sort vs. Insertion Sort",
    type: "quiz-interactive",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">Conceptual Micro-Check</span>
          <h3>Analyze the Behavior on Nearly Sorted Data</h3>
          <p>Suppose you are given an array of $n = 10{,}000$ integers where only $3$ elements are out of place. Which algorithm is overwhelmingly superior, and why?</p>
          
          <div class="choice-buttons" id="chk1-choices">
            <button onclick="checkMicroQuiz(1, 0)">
              <strong>A.</strong> Selection Sort, because it executes fewer swaps ($O(n)$ swaps vs shifts).
            </button>
            <button onclick="checkMicroQuiz(1, 1)">
              <strong>B.</strong> Insertion Sort, because it is adaptive and terminates inner loops in near $O(n)$ time.
            </button>
            <button onclick="checkMicroQuiz(1, 2)">
              <strong>C.</strong> Both are identical because both are quadratic $O(n^2)$ algorithms.
            </button>
          </div>

          <div class="activity-feedback" id="chk1-feedback" style="display: none;"></div>
        </div>

        <div class="panel">
          <span class="prompt-label">Direct Comparison Card</span>
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Selection Sort</th>
                <th>Insertion Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Best-Case Time</td>
                <td class="mono">$\\Theta(n^2)$</td>
                <td class="mono" style="color: var(--result);">$\\Theta(n)$</td>
              </tr>
              <tr>
                <td>Worst-Case Time</td>
                <td class="mono">$\\Theta(n^2)$</td>
                <td class="mono">$\\Theta(n^2)$</td>
              </tr>
              <tr>
                <td>Stable?</td>
                <td><span class="badge-tag badge-no">No</span></td>
                <td><span class="badge-tag badge-yes">Yes</span></td>
              </tr>
              <tr>
                <td>Adaptive?</td>
                <td><span class="badge-tag badge-no">No</span></td>
                <td><span class="badge-tag badge-yes">Yes</span></td>
              </tr>
              <tr>
                <td>Memory Auxiliary</td>
                <td class="mono">$O(1)$</td>
                <td class="mono">$O(1)$</td>
              </tr>
            </tbody>
          </table>
          <div class="callout callout-actual" style="margin-top: auto;">
            <span>The $O(n^2)$ Ceiling</span>
            <p>Both algorithms suffer a worst-case barrier of $\\Theta(n^2)$. Can we break this barrier? Enter <strong>Divide-and-Conquer</strong>!</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 15: Topic 5 — Recursion and Divide-and-Conquer
  // -------------------------------------------------------------
  {
    id: "divide-conquer-paradigm",
    section: "Divide & Conquer",
    sectionId: "sec-divide",
    kicker: "Topic 5 • Algorithmic Paradigms",
    title: "Recursion and the Divide-and-Conquer Paradigm",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Core Paradigm</span>
          <h3>Breaking the Quadratic Barrier</h3>
          <p>Incremental algorithms build the solution one element at a time (linear progress). <strong>Divide-and-Conquer</strong> solves a problem by breaking it into subproblems of the same type.</p>
          
          <div class="pipeline" style="margin: 20px 0;">
            <div class="pipeline-item actual">1. DIVIDE<br><small>Split problem</small></div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-item growth">2. CONQUER<br><small>Solve recursively</small></div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-item result">3. COMBINE<br><small>Merge solutions</small></div>
          </div>

          <div class="definition definition-actual">
            <strong>Base Case vs. Recursive Step</strong>
            <p><strong>Base Case:</strong> When subproblem size is sufficiently small (e.g., $n \\le 1$), solve directly with zero or constant work.</p>
            <p><strong>Recursive Step:</strong> When $n > 1$, split into subproblems, recurse, and combine.</p>
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">Why Does Splitting Save Work?</span>
          <div class="definition definition-growth">
            <strong>The Mathematical Revelation</strong>
            <p>Consider the cost function $f(n) = n^2$.</p>
          </div>
          <div class="formula formula-danger">
            $$\\text{One problem of size } n: \\quad n^2$$
          </div>
          <div class="formula formula-result">
            $$\\text{Two subproblems of size } \\frac{n}{2}: \\quad 2 \\times \\left(\\frac{n}{2}\\right)^2 = 2 \\times \\frac{n^2}{4} = \\frac{n^2}{2}$$
          </div>
          <p style="font-size: 17px; line-height: 1.45;">
            Splitting the work into two halves <strong>cuts the quadratic burden in half</strong>!
            If we continue dividing recursively all the way down, the sum of work across all levels shrinks from $n^2$ down to $n \\log n$!
          </p>
          <div class="callout callout-result" style="margin-top: auto;">
            <span>The Key Insight</span>
            <p>Divide-and-conquer turns a tall quadratic pyramid of comparisons into a balanced logarithmic tree.</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 16: Topic 6 — Merge Sort: The Algorithm
  // -------------------------------------------------------------
  {
    id: "merge-sort-concept",
    section: "Merge Sort",
    sectionId: "sec-mergesort",
    kicker: "Topic 6 • Merge Sort Algorithm",
    title: "Merge Sort: Divide, Conquer, and Combine",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Three Steps</span>
          <h3>John von Neumann's Masterpiece (1945)</h3>
          <ol style="font-size: 17px; line-height: 1.55;">
            <li>
              <strong>Divide:</strong> Find index $q = \\lfloor (p + r) / 2 \\rfloor$ dividing array $A[p..r]$ into two subarrays $A[p..q]$ and $A[q+1..r]$. Work: $O(1)$.
            </li>
            <li>
              <strong>Conquer:</strong> Recursively sort $A[p..q]$ and $A[q+1..r]$ using <code>merge_sort</code>.
            </li>
            <li>
              <strong>Combine:</strong> Merge the two sorted subarrays back into a single sorted subarray $A[p..r]$. Work: $\\Theta(n)$.
            </li>
          </ol>
          <div class="definition definition-result" style="margin-top: 14px;">
            <strong>Base Case</strong>
            <p>When $p \\ge r$, the subarray contains at most 1 element. An array of size 0 or 1 is already sorted by definition!</p>
          </div>
        </div>

        <div class="code-block-wrapper">
          <div class="code-header">
            <span>merge_sort.py</span>
            <span>Recursive Formulation</span>
          </div>
          <pre class="code-block"><code><span class="kw">def</span> <span class="fn">merge_sort</span>(arr, p, r):
    <span class="comment"># Base case: 1 or 0 elements</span>
    <span class="kw">if</span> p &gt;= r:
        <span class="kw">return</span>
        
    <span class="comment"># 1. DIVIDE: Compute midpoint</span>
    q = (p + r) // <span class="num">2</span>
    
    <span class="comment"># 2. CONQUER: Recursively sort left and right</span>
    <span class="fn">merge_sort</span>(arr, p, q)
    <span class="fn">merge_sort</span>(arr, q + <span class="num">1</span>, r)
    
    <span class="comment"># 3. COMBINE: Merge sorted halves</span>
    <span class="fn">merge</span>(arr, p, q, r)</code></pre>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 17: Topic 6 — The Linear Merge Step
  // -------------------------------------------------------------
  {
    id: "merge-step-procedure",
    section: "Merge Sort",
    sectionId: "sec-mergesort",
    kicker: "Topic 6 • The Linear Engine",
    title: "The Linear Merge Step: $\\Theta(n)$ Two-Pointer Technique",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">Merging Two Sorted Arrays</span>
          <h3>Two Pointers Moving in Lockstep</h3>
          <p>Given two already-sorted sequences $L$ and $R$, how fast can we combine them into a single sorted sequence?</p>
          <ul style="font-size: 16px; line-height: 1.45;">
            <li>Place pointer $i$ at start of $L$, pointer $j$ at start of $R$.</li>
            <li>Compare $L[i]$ with $R[j]$.</li>
            <li>Copy the smaller element to destination array; advance its pointer.</li>
            <li>When one list is exhausted, copy remaining elements of the other list directly.</li>
          </ul>
          <div class="formula formula-result">
            $$\\text{Total Comparisons} \\le |L| + |R| - 1 < n$$
          </div>
          <div class="callout callout-result" style="margin-top: auto;">
            <span>Linear Running Time</span>
            <p>Every comparison places at least one element into its final destination. Thus, the Merge procedure runs in strictly <strong>linear time $\\Theta(n)$</strong>.</p>
          </div>
        </div>

        <div class="code-block-wrapper">
          <div class="code-header">
            <span>merge_procedure.py</span>
            <span>Two-Pointer Combine</span>
          </div>
          <pre class="code-block"><code><span class="kw">def</span> <span class="fn">merge</span>(arr, p, q, r):
    left = arr[p:q + <span class="num">1</span>]    <span class="comment"># copy left half</span>
    right = arr[q + <span class="num">1</span>:r + <span class="num">1</span>] <span class="comment"># copy right half</span>
    
    i = j = <span class="num">0</span>
    k = p
    
    <span class="kw">while</span> i &lt; <span class="fn">len</span>(left) <span class="kw">and</span> j &lt; <span class="fn">len</span>(right):
        <span class="kw">if</span> left[i] &lt;= right[j]: <span class="comment"># &lt;= preserves stability!</span>
            arr[k] = left[i]
            i += <span class="num">1</span>
        <span class="kw">else</span>:
            arr[k] = right[j]
            j += <span class="num">1</span>
        k += <span class="num">1</span>
        
    <span class="comment"># Copy any remaining elements</span>
    <span class="kw">while</span> i &lt; <span class="fn">len</span>(left):
        arr[k] = left[i]; i += <span class="num">1</span>; k += <span class="num">1</span>
    <span class="kw">while</span> j &lt; <span class="fn">len</span>(right):
        arr[k] = right[j]; j += <span class="num">1</span>; k += <span class="num">1</span></code></pre>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 18: Merge Sort Live Visualizer
  // -------------------------------------------------------------
  {
    id: "merge-sort-vis",
    section: "Merge Sort",
    sectionId: "sec-mergesort",
    kicker: "Topic 6 • Interactive Simulator",
    title: "Merge Sort: Live Interactive Visualizer",
    type: "interactive-merge",
    content: `
      <div class="visualizer-card" id="merge-vis-card">
        <div class="vis-header">
          <div class="vis-title">Interactive Merge Sort Simulation</div>
          <div class="vis-metrics">
            <span>Recursive Depth: <strong id="merge-metric-depth">0</strong></span>
            <span>Active Range [p..r]: <strong id="merge-metric-range">[0..7]</strong></span>
            <span>Comparisons: <strong id="merge-metric-comp">0</strong></span>
            <span>Merges Done: <strong id="merge-metric-merges">0</strong></span>
          </div>
        </div>

        <div class="array-stage" id="merge-array-stage">
          <!-- Dynamically populated by visualizer.js -->
        </div>

        <div class="vis-status-text" id="merge-status-text">
          Ready. Click 'Next Step' or 'Play' to watch Merge Sort subdivide and weave sorted subarrays together.
        </div>

        <div class="vis-controls">
          <button class="primary" id="merge-btn-step" onclick="MergeVis.step()">Next Step (Space)</button>
          <button id="merge-btn-play" onclick="MergeVis.togglePlay()">Play / Pause</button>
          <button id="merge-btn-reset" onclick="MergeVis.reset()">Reset</button>
          <button id="merge-btn-random" onclick="MergeVis.randomize()">New Random Array</button>
          <span style="margin-left: auto; font-size: 13px; color: var(--muted);">Guaranteed $O(n \\log n)$</span>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 19: Topic 7 — Merge Sort Recursion Tree
  // -------------------------------------------------------------
  {
    id: "recursion-tree-anatomy",
    section: "Recursion Tree",
    sectionId: "sec-tree",
    kicker: "Topic 7 • Recursion Tree Anatomy",
    title: "Visualizing the Merge Sort Recursion Tree",
    type: "content",
    content: `
      <div class="split-layout-wide-right">
        <div class="panel">
          <span class="prompt-label">The Recurrence Relation</span>
          <h3>Formulating the Cost</h3>
          <p>For an input array of size $n$, the running time recurrence is:</p>
          <div class="formula formula-actual">
            $$T(n) = \\begin{cases} c_0 & \\text{if } n = 1 \\\\ 2T(n/2) + cn & \\text{if } n > 1 \\end{cases}$$
          </div>
          <p>Where $cn$ represents the time taken to divide the array and merge the two sorted halves.</p>
          <div class="definition definition-growth">
            <strong>Recursion Tree Method</strong>
            <p>Each node in the tree represents the non-recursive merge cost $cn$ incurred at that specific subproblem.</p>
          </div>
        </div>

        <div class="recursion-tree-container">
          <div class="tree-level">
            <span class="tree-level-desc">Level 0 (Root, size $n$)</span>
            <div class="tree-nodes">
              <div class="tree-node">$cn$</div>
            </div>
            <div class="tree-cost-label">Cost: $cn$</div>
          </div>

          <div class="tree-level">
            <span class="tree-level-desc">Level 1 (2 nodes, size $n/2$)</span>
            <div class="tree-nodes">
              <div class="tree-node">$c(n/2)$</div>
              <div class="tree-node">$c(n/2)$</div>
            </div>
            <div class="tree-cost-label">Cost: $cn$</div>
          </div>

          <div class="tree-level">
            <span class="tree-level-desc">Level 2 (4 nodes, size $n/4$)</span>
            <div class="tree-nodes">
              <div class="tree-node">$c(n/4)$</div>
              <div class="tree-node">$c(n/4)$</div>
              <div class="tree-node">$c(n/4)$</div>
              <div class="tree-node">$c(n/4)$</div>
            </div>
            <div class="tree-cost-label">Cost: $cn$</div>
          </div>

          <div class="tree-level tree-level-leaves">
            <span class="tree-level-desc">Level $d$ (Leaves, size 1)</span>
            <div class="tree-nodes">
              <div class="tree-node leaf">$c_0$</div>
              <div class="tree-node leaf">$c_0$</div>
              <span class="tree-ellipsis">... $n$ leaves ...</span>
              <div class="tree-node leaf">$c_0$</div>
              <div class="tree-node leaf">$c_0$</div>
            </div>
            <div class="tree-cost-label">Cost: $c_0 \\cdot n$</div>
          </div>

          <div class="tree-summary-footer">
            <span class="tree-summary-depth">Total Tree Depth: $\\log_2 n + 1$ levels</span>
            <span class="tree-summary-work">Total Work: $cn \\cdot (\\log_2 n + 1) = \\Theta(n \\log n)$</span>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 20: Merge Sort Level-by-Level Summation
  // -------------------------------------------------------------
  {
    id: "tree-math-derivation",
    section: "Recursion Tree",
    sectionId: "sec-tree",
    kicker: "Topic 7 • Time Complexity Derivation",
    title: "Deriving the Master Cost: $c \\cdot n \\log_2 n$",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">Level-by-Level Work Analysis</span>
          <h3>Why Every Level Sums to $cn$</h3>
          <p>Let level $j$ range from $0$ up to $d = \\log_2 n$:</p>
          <ul style="font-size: 15px; line-height: 1.45; margin: 0; padding-left: 20px;">
            <li>Number of nodes at level $j$: $2^j$.</li>
            <li>Subproblem size at level $j$: $\\frac{n}{2^j}$.</li>
            <li>Merge cost per node at level $j$: $c \\cdot \\left(\\frac{n}{2^j}\\right)$.</li>
          </ul>
          <div class="formula formula-actual">
            $$\\text{Total work at level } j = 2^j \\times c\\left(\\frac{n}{2^j}\\right) = cn$$
          </div>
          <p style="font-size: 14px; margin: 0;">Notice the cancellation! The factor of $2^j$ nodes cancels the $\\frac{1}{2^j}$ fraction of array size!</p>
          <div class="callout callout-result" style="margin-top: auto;">
            <span>The Equal-Work Phenomenon</span>
            <p>Every single level of the Merge Sort recursion tree performs exactly $cn$ total units of work!</p>
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">Tree Depth &amp; Final Summation</span>
          <h3>How Many Levels Exist?</h3>
          <p>The array size is halved at each level until it reaches size 1:</p>
          <div class="formula formula-growth">
            $$\\frac{n}{2^d} = 1 \\implies 2^d = n \\implies d = \\log_2 n$$
          </div>
          <p style="font-size: 14px; margin: 0;">Including level 0, there are exactly $\\log_2 n + 1$ levels in total.</p>
          <div class="formula formula-result">
            $$T(n) = \\sum_{j=0}^{\\log_2 n} cn = cn \\cdot (\\log_2 n + 1) = cn \\log_2 n + cn$$
          </div>
          <div class="callout callout-actual" style="margin-top: auto;">
            <span>Rigorous Conclusion</span>
            <p><strong>$T(n) = \\Theta(n \\log n)$</strong> across Best, Average, AND Worst cases!</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 21: Master Theorem Verification & Space Trade-off
  // -------------------------------------------------------------
  {
    id: "master-theorem-space",
    section: "Recursion Tree",
    sectionId: "sec-tree",
    kicker: "Topic 7 • Theoretical Frameworks",
    title: "Master Theorem & The $\\Theta(n)$ Auxiliary Memory Cost",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">Verification via Master Theorem</span>
          <h3>Standard Form: $T(n) = aT(n/b) + f(n)$</h3>
          <p style="margin: 0;">For Merge Sort: $a = 2$, $b = 2$, and $f(n) = cn = \\Theta(n^1)$.</p>
          <div class="formula formula-actual">
            $$\\log_b a = \\log_2 2 = 1$$
          </div>
          <p style="margin: 0;">Compare $f(n) = \\Theta(n)$ with $n^{\\log_b a} = n^1$:</p>
          <div class="formula formula-result">
            $$f(n) = \\Theta(n^{\\log_b a}) \\implies \\text{Case 2 of Master Theorem applies!}$$
          </div>
          <p style="margin: 0;">Case 2 yields:</p>
          <div class="formula formula-result">
            $$T(n) = \\Theta(n^{\\log_b a} \\log n) = \\Theta(n \\log n)$$
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">The Critical Trade-Off</span>
          <h3>Space Complexity: $O(n)$ Auxiliary Memory</h3>
          <div class="definition definition-danger">
            <strong>Merge Sort is NOT In-Place for Arrays</strong>
            <p>During the merge procedure, copying the two subarrays into temporary memory buffers requires $\\Theta(n)$ extra space.</p>
          </div>
          <p style="font-size: 14px; line-height: 1.4; margin: 0;">
            Although recursion stack depth is only $\\Theta(\\log n)$, the auxiliary array allocated during merging scales linearly with $n$.
          </p>
          <div class="callout callout-actual" style="margin-top: auto;">
            <span>Linked Lists vs Arrays</span>
            <p>Merge sort can be implemented in $O(1)$ extra space on <strong>Linked Lists</strong> by pointer manipulations, making it the premier choice for linked list sorting!</p>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 22: Topic 8 — Comparing Sorting Algorithms
  // -------------------------------------------------------------
  {
    id: "comparison-master-matrix",
    section: "Comparison",
    sectionId: "sec-compare",
    kicker: "Topic 8 • Master Comparison Matrix",
    title: "Comparing the Sorting Algorithms",
    type: "content",
    content: `
      <div class="panel" style="height: 100%;">
        <span class="prompt-label">Comprehensive Asymptotic &amp; Practical Metrics</span>
        <table class="matrix-table" style="margin-top: 10px;">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Best Case</th>
              <th>Average Case</th>
              <th>Worst Case</th>
              <th>Aux Space</th>
              <th>Stable?</th>
              <th>In-Place?</th>
              <th>Adaptive?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Selection Sort</strong></td>
              <td class="mono">$\\Theta(n^2)$</td>
              <td class="mono">$\\Theta(n^2)$</td>
              <td class="mono">$\\Theta(n^2)$</td>
              <td class="mono">$\\Theta(1)$</td>
              <td><span class="badge-tag badge-no">No</span></td>
              <td><span class="badge-tag badge-yes">Yes</span></td>
              <td><span class="badge-tag badge-no">No</span></td>
            </tr>
            <tr>
              <td><strong>Insertion Sort</strong></td>
              <td class="mono" style="color: var(--result);">$\\Theta(n)$</td>
              <td class="mono">$\\Theta(n^2)$</td>
              <td class="mono">$\\Theta(n^2)$</td>
              <td class="mono">$\\Theta(1)$</td>
              <td><span class="badge-tag badge-yes">Yes</span></td>
              <td><span class="badge-tag badge-yes">Yes</span></td>
              <td><span class="badge-tag badge-yes">Yes</span></td>
            </tr>
            <tr style="background: #fdfaf2;">
              <td><strong>Merge Sort</strong></td>
              <td class="mono" style="color: var(--actual);">$\\Theta(n \\log n)$</td>
              <td class="mono" style="color: var(--actual);">$\\Theta(n \\log n)$</td>
              <td class="mono" style="color: var(--actual);">$\\Theta(n \\log n)$</td>
              <td class="mono" style="color: var(--danger);">$\\Theta(n)$</td>
              <td><span class="badge-tag badge-yes">Yes</span></td>
              <td><span class="badge-tag badge-no">No*</span></td>
              <td><span class="badge-tag badge-no">No</span></td>
          </tbody>
        </table>
        <div class="callout callout-actual" style="margin-top: 20px;">
          <span>The Theoretical Optimum</span>
          <p>Any comparison-based sorting algorithm requires at least $\\Omega(n \\log n)$ comparisons in the worst case! Merge Sort achieves this theoretical lower bound asymptotically.</p>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 23: Topic 8 — Decision Tree: Choosing the Right Algorithm
  // -------------------------------------------------------------
  {
    id: "choosing-algorithms-guide",
    section: "Comparison",
    sectionId: "sec-compare",
    kicker: "Topic 8 • Practical Engineering Guide",
    title: "Engineering Decision Guide: Which One to Choose?",
    type: "content",
    content: `
      <div class="three-column-grid">
        <div class="panel">
          <div class="definition definition-actual">
            <strong>Choose Insertion Sort If:</strong>
          </div>
          <ul style="font-size: 16px; line-height: 1.45; padding-left: 20px;">
            <li>$n$ is small ($n \\le 16–32$). Constant factors are microscopic and cache locality is phenomenal.</li>
            <li>The array is already nearly sorted (runs in linear $O(n)$ time).</li>
            <li>You need online sorting (data arrives in a live stream).</li>
          </ul>
          <div class="formula formula-actual" style="margin-top: auto;">Small $n$ or Low Inversions</div>
        </div>

        <div class="panel">
          <div class="definition definition-result">
            <strong>Choose Merge Sort If:</strong>
          </div>
          <ul style="font-size: 16px; line-height: 1.45; padding-left: 20px;">
            <li>Guaranteed worst-case $O(n \\log n)$ performance is required (no pathological slow downs).</li>
            <li>Stability is strictly required.</li>
            <li>Sorting linked lists or external datasets on disk.</li>
          </ul>
          <div class="formula formula-result" style="margin-top: auto;">Stability &amp; Strict Guarantees</div>
        </div>

        <div class="panel">
          <div class="definition definition-growth">
            <strong>Real-World Hybrid: Timsort</strong>
          </div>
          <p style="font-size: 16px; line-height: 1.4;">
            Used in <strong>Python</strong> (<code>list.sort()</code>) and <strong>Java</strong> (<code>Arrays.sort()</code>):
          </p>
          <p style="font-size: 15px; color: var(--muted);">
            Combines <strong>Merge Sort</strong> for massive datasets with <strong>Insertion Sort</strong> for small chunks (runs of size 32–64). Achieves $O(n)$ best case and $O(n \\log n)$ worst case!
          </p>
          <div class="formula formula-growth" style="margin-top: auto;">Merge Sort + Insertion Sort</div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 24: Sorting Lab / Algorithm Race Simulator
  // -------------------------------------------------------------
  {
    id: "sorting-race-sandbox",
    section: "Interactive Lab",
    sectionId: "sec-compare",
    kicker: "Interactive Sandbox",
    title: "Algorithm Race Benchmark: Selection vs Insertion vs Merge",
    type: "interactive-race",
    content: `
      <div class="panel" style="height: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <span class="prompt-label">Live Benchmark Simulator</span>
            <h3 style="margin: 0;">Test on Different Array Distributions</h3>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="primary" onclick="RaceLab.runBenchmark('random')">Random Array</button>
            <button onclick="RaceLab.runBenchmark('sorted')">Already Sorted</button>
            <button onclick="RaceLab.runBenchmark('reversed')">Reverse Sorted</button>
            <button onclick="RaceLab.runBenchmark('nearly_sorted')">Nearly Sorted (90%)</button>
          </div>
        </div>

        <div class="three-column-grid" style="height: calc(100% - 90px);">
          <div class="visualizer-card" style="padding: 14px;">
            <div class="vis-title">Selection Sort</div>
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 6px;">$\\Theta(n^2)$ comparisons always</div>
            <div id="race-sel-status" style="font-family: ui-monospace; font-size: 14px; background: #ede8dc; padding: 10px;">
              Comparisons: <strong>0</strong><br>
              Swaps: <strong>0</strong><br>
              Operations: <strong>0</strong>
            </div>
            <div class="array-stage" id="race-sel-stage" style="height: 90px; margin-top: 10px;"></div>
          </div>

          <div class="visualizer-card" style="padding: 14px;">
            <div class="vis-title">Insertion Sort</div>
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 6px;">Adaptive $\\Theta(n)$ best, $\\Theta(n^2)$ worst</div>
            <div id="race-ins-status" style="font-family: ui-monospace; font-size: 14px; background: #ede8dc; padding: 10px;">
              Comparisons: <strong>0</strong><br>
              Shifts: <strong>0</strong><br>
              Operations: <strong>0</strong>
            </div>
            <div class="array-stage" id="race-ins-stage" style="height: 90px; margin-top: 10px;"></div>
          </div>

          <div class="visualizer-card" style="padding: 14px;">
            <div class="vis-title">Merge Sort</div>
            <div style="font-size: 13px; color: var(--muted); margin-bottom: 6px;">$\\Theta(n \\log n)$ guaranteed</div>
            <div id="race-merge-status" style="font-family: ui-monospace; font-size: 14px; background: #ede8dc; padding: 10px;">
              Comparisons: <strong>0</strong><br>
              Copies/Merges: <strong>0</strong><br>
              Operations: <strong>0</strong>
            </div>
            <div class="array-stage" id="race-merge-stage" style="height: 90px; margin-top: 10px;"></div>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 25: Master Chapter Review
  // -------------------------------------------------------------
  {
    id: "chapter-review",
    section: "Review",
    sectionId: "sec-review",
    kicker: "Chapter Synthesis",
    title: "Master Chapter Synthesis: Core Concepts",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Core Synthesis</span>
          <h3>What Every Computer Scientist Must Retain</h3>
          <ol style="font-size: 16px; line-height: 1.55;">
            <li>
              <strong>Selection Sort:</strong> Minimal data motion ($O(n)$ swaps), but blind quadratic comparisons ($\\Theta(n^2)$ always).
            </li>
            <li>
              <strong>Insertion Sort:</strong> Sensitive to input structure! Linear time on sorted arrays ($\\Theta(n)$), quadratic on reversed arrays ($\\Theta(n^2)$). Total shifts equal inversion count.
            </li>
            <li>
              <strong>Divide-and-Conquer:</strong> Divide into subproblems, conquer recursively, combine. Halving reduces quadratic sums into balanced trees.
            </li>
            <li>
              <strong>Merge Sort:</strong> Master example of divide-and-conquer. Level cost is always $cn$, tree depth is $\\log_2 n$, yielding optimal $\\Theta(n \\log n)$ at the cost of $\\Theta(n)$ auxiliary space.
            </li>
          </ol>
        </div>

        <div class="panel" style="justify-content: center; align-items: center; text-align: center;">
          <span class="prompt-label">Interactive Mastery Assessment</span>
          <h3 style="font-size: 32px; margin-bottom: 12px;">Test Your Knowledge</h3>
          <p style="font-size: 18px; max-width: 440px; margin: 0 auto 24px;">
            Take the 30-question comprehensive classroom review quiz covering all 8 topics with step-by-step mathematical explanations.
          </p>
          <button class="primary" style="font-size: 18px; padding: 14px 28px; background: var(--actual); color: #fff; border-color: var(--actual);" onclick="QuizManager.openQuizModal()">
            Launch Chapter 5 Master Quiz (Press Q)
          </button>
          <div class="shortcuts-hint" style="margin-top: 28px;">
            <span>Shortcuts:</span>
            <span><kbd>←</kbd> <kbd>→</kbd> Navigate</span>
            <span><kbd>O</kbd> Overview</span>
            <span><kbd>Q</kbd> Quiz</span>
            <span><kbd>F</kbd> Fullscreen</span>
          </div>
        </div>
      </div>
    `
  },

  // -------------------------------------------------------------
  // SLIDE 26: Bridge to Chapter 6
  // -------------------------------------------------------------
  {
    id: "bridge-next",
    section: "Conclusion",
    sectionId: "sec-review",
    kicker: "Looking Ahead",
    title: "Looking Ahead: Theoretical Limits & Lower Bounds",
    type: "content",
    content: `
      <div class="split-layout">
        <div class="panel">
          <span class="prompt-label">The Natural Question</span>
          <h3>Can We Beat the $\\Theta(n \\log n)$ Barrier?</h3>
          <p>Merge Sort achieves $\\Theta(n \\log n)$ across all cases. Does a faster comparison-based sorting algorithm exist?</p>
          <div class="definition definition-actual">
            <strong>Optimality of Divide-and-Conquer</strong>
            <p>By dividing the array evenly in half at each step, Merge Sort guarantees a balanced recursion tree of depth $\\log_2 n$ with linear work per level.</p>
          </div>
          <div class="definition definition-result">
            <strong>Permutations &amp; Decision Trees</strong>
            <p>Every comparison sort makes binary decisions; distinguishing all $n!$ possible permutations inherently demands at least $\\Omega(n \\log n)$ comparisons.</p>
          </div>
        </div>

        <div class="panel">
          <span class="prompt-label">Theoretical Limit</span>
          <div class="callout callout-growth">
            <span>The $\\Omega(n \\log n)$ Decision Tree Lower Bound</span>
            <p>In Chapter 6, we will mathematically prove using binary decision trees that <strong>any comparison-based sorting algorithm requires at least $\\Omega(n \\log n)$ comparisons</strong> in the worst case!</p>
          </div>
          <p style="font-size: 15px; line-height: 1.45; margin-top: 14px;">
            Merge Sort already achieves this fundamental lower bound! You now understand optimal comparison-based sorting.
          </p>
          <div style="margin-top: auto; padding: 14px 18px; background: #e8edea; border-left: 6px solid var(--result); border-radius: 4px;">
            <strong>Chapter 5 Complete!</strong>
            <p style="margin: 4px 0 0; font-size: 14px; color: var(--muted);">Review slides using the navigation bar below or open the Overview grid (Key O).</p>
          </div>
        </div>
      </div>
    `
  }
];
