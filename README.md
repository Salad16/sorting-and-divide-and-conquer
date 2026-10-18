# CS 05 — Chapter 5: Sorting and Divide-and-Conquer

Interactive classroom presentation deck, step-by-step sorting visualizer, and 30-item timed quiz with 1-minute countdown timer per question.

Directly based on the aesthetic and architecture of [cs05-chapter-03.vercel.app](https://cs05-chapter-03.vercel.app/), with Topic 4 grounded in the [GeeksforGeeks Insertion Sort Time & Space Complexity Guide](https://www.geeksforgeeks.org/dsa/time-and-space-complexity-of-insertion-sort-algorithm/).

---

## 🎯 Chapter Overview & Topics Covered

1. **Selection Sort Algorithm**
   - Core concept: Repeatedly finding the minimum in the unsorted subarray and swapping it to the front.
   - Keywords: `Minimum Element`, `Two Subarrays`, `In-Place Swap`, `Unstable (Long-Range Swaps)`.
   - Classroom Analogy: Finding the shortest student in a lineup and swapping them to front.
   - Live interactive simulator included.

2. **Selection Sort Time Complexity**
   - Exact mathematical derivation: $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$ comparisons.
   - Best Case: $O(n^2)$ (no early-exit condition; always inspects all elements).
   - Average Case: $O(n^2)$.
   - Worst Case: $O(n^2)$.
   - Swaps: At most $n - 1$ swaps ($O(n)$ writes—minimizes write operations on EEPROM/Flash).
   - Auxiliary Space: $O(1)$ in-place.

3. **Insertion Sort Algorithm**
   - Core concept: Builds the sorted array one element at a time by picking a `key` and sliding larger elements to the right.
   - Keywords: `Playing Card Analogy`, `Key Element`, `Right Shift / Slide`, `Adaptive`, `Online`, `Stable`.
   - Classroom Analogy: Sorting playing cards in your hand as each card is dealt.
   - Live interactive simulator included.

4. **Insertion Sort Time Complexity (GeeksforGeeks Reference)**
   - **Best Case ($O(n)$)**: Occurs when array is already sorted (e.g. `[1, 2, 3, 4, 5]`). Performs $n - 1$ comparisons and **0 shifts**!
   - **Average Case ($O(n^2)$)**: Random order. Each element moves through half of the sorted subarray. Shifts $\approx \frac{n(n-1)}{4} \approx \frac{n^2}{4}$.
   - **Worst Case ($O(n^2)$)**: Reverse sorted (e.g. `[5, 4, 3, 2, 1]`). Work: $1 + 2 + \dots + (n-1) = \frac{n(n-1)}{2}$.
   - **Auxiliary Space ($O(1)$)**: In-place, uses only scalar variables (`key` and `j`).

5. **Recursion and Divide-and-Conquer**
   - The 3 Pillars:
     1. **Divide**: Break problem into smaller subproblems.
     2. **Conquer**: Recursively solve subproblems (or directly solve base cases).
     3. **Combine**: Merge solutions into the overall solution.
   - Base Case rule: Prevents call stack overflow.
   - Recurrence relations: $T(n) = aT(n/b) + f(n)$.

6. **Merge Sort Algorithm**
   - Midpoint division down to single-element arrays (which are trivially sorted).
   - The two-pointer linear merge procedure: $O(n)$ work.
   - Stability guarantee: Condition `L[i] <= R[j]` ensures earlier identical elements take precedence.

7. **Merge Sort Recursion Tree and Time Complexity**
   - Recursion Tree Anatomy:
     - Depth / Height: $\log_2 n$ levels.
     - Work per level: Exactly $c \cdot n$ at every level.
     - Total Work: $\log_2 n \times c \cdot n = \Theta(n \log n)$ across Best, Average, and Worst cases!
   - Master Theorem Case 2 derivation: $T(n) = 2T(n/2) + \Theta(n) \implies \Theta(n \log n)$.
   - Space Complexity: $O(n)$ auxiliary buffer space.

8. **Comparing and Choosing Sorting Algorithms**
   - Master Decision Matrix comparing Time, Auxiliary Space, Stability, and In-Place attributes.
   - When to pick Insertion Sort (small $n < 50$, nearly sorted data, online stream).
   - When to pick Selection Sort (write cycle minimization).
   - When to pick Merge Sort (guaranteed $O(n \log n)$, stable sorting, linked lists).
   - Real-world capstone: **Timsort** (hybrid of Merge Sort + Insertion Sort used in Python and Java).

---

## ⏱ 30-Item Interactive Quiz with 1-Minute Timer

- **30 Balanced Questions**: Covering conceptual definitions, arithmetic series derivations, edge cases, stability proofs, and practical decisions.
- **60-Second Countdown Timer**:
  - Circular SVG timer ring with color changes (green $\to$ amber $\to$ red pulse).
  - Web Audio tick sound in the final 5 seconds and chime on answer.
  - "Pause Timer" button for teacher explanations during class.
- **Instant Explanations**: Includes dedicated **Classroom Talking Points** for each question.
- **Final Analytics Scorecard**: Percentage score, letter grade, and topic-by-topic mastery breakdown table.

---

## 🚀 How to Run & Present

### Method 1: Direct File Opening
Double-click `index.html` in file explorer or open it directly in Chrome, Edge, Safari, or Firefox:
```text
file:///C:/Users/alicf/.gemini/antigravity/scratch/cs05-chapter-05/index.html
```
No installation, npm build, or internet connection required! Everything is fully offline-capable.

### Method 2: Local HTTP Server (Optional)
```powershell
cd C:\Users\alicf\.gemini\antigravity\scratch\cs05-chapter-05
python -m http.server 3000
# or: npx serve
```
Then navigate to `http://localhost:3000`.

### Keyboard Shortcuts for Classroom Presenting
- `Right Arrow` / `Space` / `N`: Next slide
- `Left Arrow` / `P`: Previous slide
- `S`: Toggle Classroom Speaker Notes / Talking Points
- `Q`: Open 30-Item Timed Quiz
- `F`: Toggle Fullscreen Presentation Mode
- `Esc`: Close Quiz or Speaker Notes
