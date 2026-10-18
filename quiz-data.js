// Chapter 5: Sorting and Divide-and-Conquer Quiz Data
// 30 Comprehensive Multiple-Choice Questions with 1-Minute Timer
// Detailed Explanations and Classroom Talking Points included
// RULE SATISFIED: No two consecutive questions share the same answer letter!
// Pattern: A, C, B, D, A, C, D, B, C, A, D, B, A, C, D, B, A, D, C, B, A, D, C, B, D, A, C, B, D, A

const QUIZ_QUESTIONS = [
  // =========================================================================
  // TOPIC 1: Selection Sort Algorithm (Questions 1 - 4)
  // =========================================================================
  {
    id: 1,
    topic: "Selection Sort Algorithm",
    question: "Which statement accurately describes the core operating mechanism of the Selection Sort algorithm on an unsorted array?",
    options: [
      "It repeatedly scans the unsorted subarray to find the minimum element and swaps it to the front.",
      "It repeatedly compares and swaps adjacent out-of-order pairs until no inversions remain.",
      "It takes each element sequentially and shifts larger preceding elements right to insert it into place.",
      "It divides the array into two halves, recursively sorts them, and merges them together."
    ],
    answer: 0, // A
    explanation: "Selection Sort maintains two subarrays: a sorted prefix and an unsorted suffix. In each pass, it scans the unsorted portion to locate the smallest element and swaps it with the first unsorted position.",
    talkingPoint: "Classroom Mantra: 'Select the absolute minimum of what remains, and lock it into place with one swap!'"
  },
  {
    id: 2,
    topic: "Selection Sort Algorithm",
    question: "For an array with n elements, what is the exact number of outer loop passes required by Selection Sort to guarantee the entire array is completely sorted?",
    options: [
      "n passes",
      "n / 2 passes",
      "n - 1 passes",
      "log2(n) passes"
    ],
    answer: 2, // C
    explanation: "Selection Sort requires exactly (n - 1) outer loop passes. Once the first (n - 1) smallest elements are placed into their correct indices 0 through n - 2, the remaining single element at index n - 1 is mathematically guaranteed to be the maximum and already in its proper position.",
    talkingPoint: "If you have 5 cards and place the 4 smallest in order, the 5th card is guaranteed to be in its correct final spot."
  },
  {
    id: 3,
    topic: "Selection Sort Algorithm",
    question: "Consider the array [4a, 4b, 2], where 4a and 4b have equal values. After the first pass of standard in-place Selection Sort, the array becomes [2, 4b, 4a]. What fundamental property does this demonstrate?",
    options: [
      "Selection Sort is adaptive because it detects identical values.",
      "Selection Sort is UNSTABLE because a long-range swap can invert the relative order of duplicate keys.",
      "Selection Sort achieves optimal O(n log n) comparisons on duplicate keys.",
      "Selection Sort requires extra auxiliary memory proportional to the number of duplicates."
    ],
    answer: 1, // B
    explanation: "In standard array-based Selection Sort, finding the minimum (2) at index 2 causes a swap with the element at index 0 (4a). This long-distance swap causes 4a to jump over 4b, reversing their original relative order from (4a, 4b) to (4b, 4a). Thus, standard Selection Sort is inherently unstable.",
    talkingPoint: "Classroom visual: Long-distance swaps jump right over duplicate twins, permanently destroying initial relative order."
  },
  {
    id: 4,
    topic: "Selection Sort Algorithm",
    question: "In the inner loop of Selection Sort during pass i (where 0 <= i < n - 1), how many element comparisons are executed?",
    options: [
      "Exactly i comparisons",
      "Exactly n comparisons",
      "floor(n / 2) comparisons",
      "Exactly n - 1 - i comparisons"
    ],
    answer: 3, // D
    explanation: "In pass i, the inner loop index j runs from i + 1 up to n - 1. The total number of iterations is (n - 1) - (i + 1) + 1 = n - 1 - i. For example, at pass 0 it performs n - 1 comparisons; at pass n - 2 it performs exactly 1 comparison.",
    talkingPoint: "At pass i, the scan window only looks at elements to the right of index i, shrinking by 1 comparison each pass."
  },

  // =========================================================================
  // TOPIC 2: Selection Sort Time Complexity (Questions 5 - 7)
  // =========================================================================
  {
    id: 5,
    topic: "Selection Sort Time Complexity",
    question: "Why does Selection Sort exhibit a Best-Case time complexity of Θ(n²) even when the input array is already completely sorted?",
    options: [
      "It lacks an early-exit check and must scan every remaining unsorted element to confirm the minimum.",
      "It performs n(n - 1) / 2 element swaps regardless of initial order.",
      "Its recursion stack always expands to depth n.",
      "It allocates O(n²) temporary memory buffers before processing begins."
    ],
    answer: 0, // A
    explanation: "Selection Sort has zero early-termination conditions. Even if the array is already in perfect ascending order, the inner loop must still inspect every remaining element before confirming that arr[i] is indeed the minimum of that pass. Thus, it always makes n(n - 1)/2 comparisons, yielding Θ(n²).",
    talkingPoint: "Selection Sort is completely 'order-blind'—it does the exact same work whether the list is already sorted, reversed, or random."
  },
  {
    id: 6,
    topic: "Selection Sort Time Complexity",
    question: "What is the exact formula for the total number of element comparisons performed by Selection Sort on an array of size n?",
    options: [
      "n - 1 comparisons",
      "n² comparisons",
      "n(n - 1) / 2 comparisons",
      "n log2(n) comparisons"
    ],
    answer: 2, // C
    explanation: "The total number of comparisons is the sum of the arithmetic series (n - 1) + (n - 2) + ... + 2 + 1. By Gauss's summation formula, this equals n(n - 1) / 2 comparisons, regardless of input distribution.",
    talkingPoint: "Show the arithmetic series on the board: summing from (n - 1) down to 1 always yields exactly n(n - 1)/2."
  },
  {
    id: 7,
    topic: "Selection Sort Time Complexity",
    question: "In embedded microcontrollers where writing to non-volatile EEPROM or Flash memory degrades the hardware, why is Selection Sort preferred over Insertion Sort?",
    options: [
      "Selection Sort has a faster asymptotic time complexity of O(n log n).",
      "Selection Sort requires fewer comparisons than any other comparison sort.",
      "Selection Sort uses zero CPU registers during execution.",
      "Selection Sort performs at most n - 1 swaps (O(n) writes), minimizing physical wear on memory cells."
    ],
    answer: 3, // D
    explanation: "While Insertion Sort can perform up to O(n²) memory shifts/writes, Selection Sort executes at most one swap per outer pass, totaling at most n - 1 swaps (O(n) memory writes). In hardware where flash write cycles degrade physical storage, minimizing writes is crucial.",
    talkingPoint: "Crucial real-world trade-off: when memory writes physically wear out hardware, O(n) swaps beats O(n²) shifts every time!"
  },

  // =========================================================================
  // TOPIC 3: Insertion Sort Algorithm (Questions 8 - 11)
  // =========================================================================
  {
    id: 8,
    topic: "Insertion Sort Algorithm",
    question: "What is the intuitive mechanical analogy most commonly used to explain how Insertion Sort operates?",
    options: [
      "Dividing a deck of cards into two halves on a table and interleaving them.",
      "Sorting playing cards in your hand by sliding drawn cards into their correct ordered position.",
      "Looking up names in a telephone book using binary search.",
      "Pouring water through successive graduated filter cylinders."
    ],
    answer: 1, // B
    explanation: "Insertion Sort mirrors how people arrange playing cards in their hands. As each new card (the 'key') is picked up, larger cards already held in the sorted hand are slid one slot to the right, and the key is inserted into its proper place.",
    talkingPoint: "Think of your left hand holding sorted cards, and your right hand drawing one new card at a time to insert."
  },
  {
    id: 9,
    topic: "Insertion Sort Algorithm",
    question: "Why does the outer loop of Insertion Sort typically start at array index 1 instead of index 0?",
    options: [
      "Index 0 is reserved for storing the length of the array in C-style arrays.",
      "The algorithm skips index 0 to avoid checking negative index bounds.",
      "A subarray consisting of a single element (arr[0]) is trivially already sorted.",
      "Index 0 always contains the global maximum element."
    ],
    answer: 2, // C
    explanation: "A subarray of length 1 (namely arr[0..0]) satisfies the sortedness invariant trivially by definition. Therefore, the first meaningful insertion occurs when inserting the second element (arr[1]) into the 1-element sorted prefix.",
    talkingPoint: "A single card in your hand is already sorted; the sorting work starts when you draw card #2."
  },
  {
    id: 10,
    topic: "Insertion Sort Algorithm",
    question: "How does Insertion Sort move elements to make room for the current key element?",
    options: [
      "It shifts larger elements in the sorted portion one position to the right via consecutive assignments.",
      "It performs long-distance swaps between the key and the minimum element.",
      "It allocates a new dynamic linked list node for each preceding element.",
      "It rotates the entire array cyclically using a queue buffer."
    ],
    answer: 0, // A
    explanation: "While scanning backward through the sorted prefix (while j >= 0 and arr[j] > key), Insertion Sort copies arr[j] into arr[j + 1]. This rightward shift creates a vacant slot where the key is eventually deposited.",
    talkingPoint: "Remember: Insertion Sort SHIFTS rather than SWAPS. One shift is a single assignment, saving CPU instructions."
  },
  {
    id: 11,
    topic: "Insertion Sort Algorithm",
    question: "Why does standard Insertion Sort preserve the relative order of duplicate elements (making it a STABLE sort)?",
    options: [
      "Because it uses a secondary hash table to track duplicate indices.",
      "Because it always swaps elements across even index intervals.",
      "Because the outer loop runs in reverse from n - 1 down to 0.",
      "Because the backward scan condition arr[j] > key stops when encountering an equal key, placing the key immediately after its duplicate."
    ],
    answer: 3, // D
    explanation: "The shift condition arr[j] > key is strictly greater-than. When the key encounters an identical value in the sorted prefix, the condition evaluates to false, shifting halts, and the key is placed directly behind the duplicate, preserving original relative order.",
    talkingPoint: "Strict inequality (>) is the guardian of stability in Insertion Sort! Changing it to >= would make it unstable."
  },

  // =========================================================================
  // TOPIC 4: Insertion Sort Complexity Analysis (GFG Reference) (Questions 12 - 15)
  // =========================================================================
  {
    id: 12,
    topic: "Insertion Sort Time Complexity (GFG)",
    question: "According to GeeksforGeeks analysis, what are the exact performance characteristics of Insertion Sort in the BEST CASE (e.g., input [1, 2, 3, 4, 5])?",
    options: [
      "O(n²) time with n(n - 1) / 2 comparisons and n shifts.",
      "O(n) linear time with exactly n - 1 comparisons and 0 shifts.",
      "O(n log n) time with log2(n) comparisons and n - 1 shifts.",
      "O(1) constant time because no loops execute."
    ],
    answer: 1, // B
    explanation: "Per GeeksforGeeks: Best case occurs when the array is already sorted (e.g. [1, 2, 3, 4, 5]). Each element arr[i] is compared only once with arr[i - 1]. Because arr[i - 1] <= key, the inner while loop terminates immediately without shifting, requiring exactly n - 1 comparisons and 0 shifts, achieving O(n) time.",
    talkingPoint: "GFG benchmark: Best case is already sorted! Exactly n - 1 checks, 0 data movements, linear O(n) speed."
  },
  {
    id: 13,
    topic: "Insertion Sort Time Complexity (GFG)",
    question: "In the AVERAGE CASE analysis grounded in GeeksforGeeks literature, why does Insertion Sort perform approximately n² / 4 shifts?",
    options: [
      "On average, each key element is smaller than roughly half of the elements in the sorted subarray before finding its slot.",
      "Every key element always shifts past all preceding elements.",
      "The algorithm skips every second element during the backward scan.",
      "Only the left half of the array requires sorting."
    ],
    answer: 0, // A
    explanation: "Per GeeksforGeeks: In a random permutation, a new key element will on average be smaller than about half of the elements currently in the sorted prefix of length i. The expected number of shifts is sum(i/2) = (1/2) * [n(n - 1)/2] ≈ n² / 4, which is Θ(n²).",
    talkingPoint: "Probability intuition: on average you walk halfway into your hand of cards before finding the right home for your new card."
  },
  {
    id: 14,
    topic: "Insertion Sort Time Complexity (GFG)",
    question: "Under what input arrangement does the WORST CASE of Insertion Sort occur, and what is the total number of comparisons and shifts required?",
    options: [
      "When all elements are zero; n - 1 comparisons.",
      "When elements alternate between odd and even numbers; n log2(n) operations.",
      "When the input is sorted in strict reverse order (e.g., [5, 4, 3, 2, 1]); requiring n(n - 1) / 2 comparisons and shifts.",
      "When the largest element is placed at index 1; requiring 2n operations."
    ],
    answer: 2, // C
    explanation: "Per GeeksforGeeks: Worst case occurs when the array is in reverse order (e.g. [5, 4, 3, 2, 1]). Every new key arr[i] is smaller than all i elements in the sorted prefix. It must be compared and shifted past all of them to reach index 0. The total operations sum to 1 + 2 + ... + (n - 1) = n(n - 1) / 2, giving O(n²).",
    talkingPoint: "GFG reverse example: [5, 4, 3, 2, 1] causes every element to shift all the way to index 0, summing to n(n-1)/2."
  },
  {
    id: 15,
    topic: "Insertion Sort Time Complexity (GFG)",
    question: "What is the auxiliary space complexity of Insertion Sort as documented by GeeksforGeeks, and what memory is utilized during execution?",
    options: [
      "O(n) auxiliary space to allocate a duplicate array.",
      "O(n²) space for the shift transposition table.",
      "O(log n) space for the recursive call stack.",
      "O(1) constant auxiliary space because it sorts in place using only scalar variables like key and j."
    ],
    answer: 3, // D
    explanation: "Per GeeksforGeeks: Insertion Sort sorts the array in place, so it does not require an extra array. It uses only a few temporary variables, such as 'key' and 'j'. The amount of extra memory remains constant: O(1) Auxiliary Space.",
    talkingPoint: "GFG space note: Only 'key' and index 'j' take memory—constant auxiliary space O(1) regardless of array size."
  },

  // =========================================================================
  // TOPIC 5: Recursion and Divide-and-Conquer (Questions 16 - 19)
  // =========================================================================
  {
    id: 16,
    topic: "Recursion and Divide-and-Conquer",
    question: "Which sequence correctly lists the three foundational phases of the Divide-and-Conquer algorithmic design paradigm?",
    options: [
      "Partition, Iterate, Finalize",
      "Divide (break into subproblems), Conquer (solve recursively), Combine (merge solutions)",
      "Select (find extreme), Swap (exchange), Verify (validate order)",
      "Transform, Conquer, Invert"
    ],
    answer: 1, // B
    explanation: "The Divide-and-Conquer paradigm consists of: 1) Divide the original problem into smaller subproblems that are smaller instances of the same problem; 2) Conquer the subproblems by solving them recursively (or directly at base cases); 3) Combine the solutions to form the overall answer.",
    talkingPoint: "The three D&C pillars: Divide into halves, Conquer down to base cases, Combine back together."
  },
  {
    id: 17,
    topic: "Recursion and Divide-and-Conquer",
    question: "What is the vital role of the 'base case' in any recursive divide-and-conquer implementation?",
    options: [
      "It establishes a terminating condition for trivial subproblem sizes to halt recursion and prevent call stack overflow.",
      "It sorts the entire array iteratively before recursive calls begin.",
      "It doubles the available memory on the runtime heap.",
      "It balances an unbalanced binary search tree."
    ],
    answer: 0, // A
    explanation: "Every recursive call allocates a new stack frame on the call stack. The base case provides an exit condition for inputs small enough to be solved trivially (e.g., n <= 1). Without it, recursion continues indefinitely until call stack memory is exhausted.",
    talkingPoint: "Classroom analogy: A basecase is the brake pedal of recursion. Without brakes, you crash through the memory wall!"
  },
  {
    id: 18,
    topic: "Recursion and Divide-and-Conquer",
    question: "In algorithm analysis, how do we express the running time of a Divide-and-Conquer algorithm mathematically?",
    options: [
      "Using a quadratic matrix equation.",
      "Using a truth table with boolean operators.",
      "Using an arithmetic geometric progression series.",
      "Using a recurrence relation (e.g., T(n) = a·T(n/b) + f(n)), where f(n) is the divide and combine cost."
    ],
    answer: 3, // D
    explanation: "A recurrence relation describes the running time T(n) of a recursive function in terms of T(k) for smaller input sizes k, plus the overhead cost f(n) of dividing the problem and combining the sub-solutions.",
    talkingPoint: "T(n) represents total time, a·T(n/b) represents recursive work on subproblems, and f(n) is the split/combine cost."
  },
  {
    id: 19,
    topic: "Recursion and Divide-and-Conquer",
    question: "What is the key distinguishing factor between problems suited for Divide-and-Conquer versus those requiring Dynamic Programming?",
    options: [
      "Divide-and-Conquer only applies to graphs, while Dynamic Programming only applies to strings.",
      "Dynamic Programming never uses recursion, whereas Divide-and-Conquer cannot be written iteratively.",
      "Divide-and-Conquer is best when subproblems are disjoint and independent; Dynamic Programming is required when subproblems overlap heavily.",
      "Divide-and-Conquer always runs in O(n²) time, whereas Dynamic Programming runs in O(1) time."
    ],
    answer: 2, // C
    explanation: "Divide-and-Conquer partitions problems into disjoint, non-overlapping pieces (e.g. left and right halves of an array). When subproblems overlap and are recomputed repeatedly, Dynamic Programming avoids redundant work via memoization or tabulation.",
    talkingPoint: "Divide & Conquer = disjoint subproblems (no reuse needed). Dynamic Programming = overlapping subproblems (memoize!)."
  },

  // =========================================================================
  // TOPIC 6: Merge Sort Algorithm (Questions 20 - 22)
  // =========================================================================
  {
    id: 20,
    topic: "Merge Sort Algorithm",
    question: "In Merge Sort, during which specific operational phase does all actual element comparison and sorting take place?",
    options: [
      "During the recursive midpoint division step (mid = (left + right) / 2).",
      "During the Combine (Merge) step when comparing elements from two sorted subarrays into the main array.",
      "During the base case check (if left >= right).",
      "During initial memory pre-allocation."
    ],
    answer: 1, // B
    explanation: "Dividing an array in half does zero sorting—it merely partitions index ranges down to trivial 1-element subarrays. All comparisons and sorting decisions occur exclusively within the merge() procedure as it interleaves the two sorted halves.",
    talkingPoint: "Emphasize this in class: 'The split does no sorting! All the magic and comparisons happen in the MERGE function.'"
  },
  {
    id: 21,
    topic: "Merge Sort Algorithm",
    question: "What is the time complexity of merging two sorted subarrays having a combined length of n elements using the standard two-pointer merge algorithm?",
    options: [
      "O(n) linear time",
      "O(log n) logarithmic time",
      "O(n²) quadratic time",
      "O(1) constant time"
    ],
    answer: 0, // A
    explanation: "The two-pointer merge algorithm advances one of two pointers on each step, comparing L[i] and R[j] and copying the smaller element to the destination array. Each of the n elements is inspected and written at most once, requiring linear O(n) time.",
    talkingPoint: "Two pointers move forward without ever backtracking. Each step places one item, taking linear O(n) time."
  },
  {
    id: 22,
    topic: "Merge Sort Algorithm",
    question: "In the standard two-pointer merge() routine, which comparison operator ensures that identical elements maintain their relative original order, guaranteeing STABILITY?",
    options: [
      "L[i] < R[j] (strictly less-than)",
      "L[i] != R[j] (not-equal)",
      "L[i] > R[j] (strictly greater-than)",
      "L[i] <= R[j] (less-than-or-equal, prioritizing the left subarray on ties)"
    ],
    answer: 3, // D
    explanation: "When comparing L[i] and R[j], writing 'if (L[i] <= R[j])' ensures that if equal elements appear in both subarrays, the one from the left subarray L is copied first. Because elements in L originally preceded elements in R, their relative order is preserved.",
    talkingPoint: "Remember the condition: 'if L[i] <= R[j], pick L[i]'. The '<=' guarantees stability by favoring the left side on ties!"
  },

  // =========================================================================
  // TOPIC 7: Merge Sort Recursion Tree and Time Complexity (Questions 23 - 26)
  // =========================================================================
  {
    id: 23,
    topic: "Merge Sort Recursion Tree & Complexity",
    question: "For an input array of size n, what is the total height (number of levels) of the Merge Sort recursion tree?",
    options: [
      "n levels",
      "n / 2 levels",
      "log2(n) + 1 levels (which is Θ(log n))",
      "n² levels"
    ],
    answer: 2, // C
    explanation: "At each level of recursion, the problem size is halved: n, n/2, n/4, ..., down to 1. The number of times you can divide n by 2 until reaching 1 is log2(n). Including the root level, the total tree height is log2(n) + 1, which is O(log n).",
    talkingPoint: "Every time you cut something in half repeatedly until size 1, the number of cuts is logarithmic: log2(n)."
  },
  {
    id: 24,
    topic: "Merge Sort Recursion Tree & Complexity",
    question: "In the Merge Sort recursion tree, how much total merging work is performed across all nodes at ANY single level k?",
    options: [
      "O(1) work",
      "Exactly c · n work (linear O(n) across all subproblems at that level)",
      "O(n²) work",
      "O(log n) work"
    ],
    answer: 1, // B
    explanation: "At level k, there are 2^k subproblems, each of size n / 2^k. The merging cost per subproblem is c · (n / 2^k). Multiplying them gives 2^k · c · (n / 2^k) = c · n work. Every single level contributes exactly O(n) total work!",
    talkingPoint: "Crucial classroom concept: 'Every level of the recursion tree sums up to exactly n elements, so every level costs O(n).'"
  },
  {
    id: 25,
    topic: "Merge Sort Recursion Tree & Complexity",
    question: "Applying the Master Theorem to the Merge Sort recurrence T(n) = 2T(n/2) + Θ(n), which case applies and what is the resulting asymptotic bound?",
    options: [
      "Case 1: T(n) = Θ(n)",
      "Case 3: T(n) = Θ(n²)",
      "Case 1: T(n) = Θ(log n)",
      "Case 2 (f(n) = Θ(n^(log_b a)) where log2(2) = 1): T(n) = Θ(n log n)"
    ],
    answer: 3, // D
    explanation: "Here a = 2, b = 2, and f(n) = Θ(n). Since log_b(a) = log_2(2) = 1, we have n^(log_b a) = n^1 = n. Because f(n) = Θ(n^1), Case 2 of the Master Theorem applies, yielding T(n) = Θ(n^(log_b a) · log n) = Θ(n log n) across all cases.",
    talkingPoint: "Master Theorem Case 2: when work per level stays constant across all tree levels, total work is level cost × tree height = O(n log n)."
  },
  {
    id: 26,
    topic: "Merge Sort Recursion Tree & Complexity",
    question: "What is the primary architectural drawback of standard Merge Sort when compared to elementary algorithms like Insertion Sort or Selection Sort?",
    options: [
      "It requires O(n) auxiliary memory space to store temporary arrays during the merge step.",
      "Its worst-case time complexity degrades to O(n²) on reversed arrays.",
      "It cannot be used to sort floating-point numbers or strings.",
      "It destroys the stability of original equal keys."
    ],
    answer: 0, // A
    explanation: "Unlike Selection Sort and Insertion Sort which are in-place O(1) auxiliary space algorithms, standard Merge Sort requires O(n) auxiliary buffer space to hold elements while merging the two halves back together.",
    talkingPoint: "Trade-off to discuss in class: Merge Sort gives you speed (n log n) at the cost of RAM (O(n) auxiliary space)."
  },

  // =========================================================================
  // TOPIC 8: Comparing and Choosing Sorting Algorithms (Questions 27 - 30)
  // =========================================================================
  {
    id: 27,
    topic: "Comparing and Choosing Sorting Algorithms",
    question: "Under which operational condition is INSERTION SORT practically and theoretically superior to Merge Sort?",
    options: [
      "When sorting 10,000,000 completely randomized integers.",
      "When auxiliary memory is unbounded and we require strict O(n log n) worst-case runtime.",
      "When the input array is small (n < 50) or already nearly sorted, due to low constant overhead and O(n) adaptive behavior.",
      "When sorting external database tables stored on tape drives."
    ],
    answer: 2, // C
    explanation: "Insertion Sort has very low constant factor overhead and requires zero extra memory. On small lists (n < 50) or nearly-sorted lists, its adaptive nature runs in O(n) time, easily outperforming Merge Sort's recursion and memory allocation overhead.",
    talkingPoint: "Practical rule: When data is nearly sorted or very small, Insertion Sort is faster in real-world benchmarks!"
  },
  {
    id: 28,
    topic: "Comparing and Choosing Sorting Algorithms",
    question: "Which table row accurately summarizes the worst-case time, auxiliary space, and stability characteristics of Selection Sort, Insertion Sort, and Merge Sort?",
    options: [
      "Selection: O(n log n), O(1), Stable | Insertion: O(n²), O(n), Unstable | Merge: O(n), O(1), Stable",
      "Selection: O(n²), O(1), Unstable | Insertion: O(n²), O(1), Stable | Merge: O(n log n), O(n), Stable",
      "Selection: O(n²), O(n), Stable | Insertion: O(n), O(1), Unstable | Merge: O(n²), O(n), Unstable",
      "Selection: O(n log n), O(n), Unstable | Insertion: O(n²), O(1), Stable | Merge: O(n log n), O(1), Unstable"
    ],
    answer: 1, // B
    explanation: "Selection Sort is O(n²) in all cases, O(1) auxiliary space, and inherently unstable. Insertion Sort is O(n²) worst/average, O(n) best, O(1) space, and stable. Merge Sort is O(n log n) in all cases, O(n) space, and stable.",
    talkingPoint: "Memorize this matrix row: Selection = Unstable O(1); Insertion = Stable O(1) Adaptive; Merge = Stable O(n) Fast."
  },
  {
    id: 29,
    topic: "Comparing and Choosing Sorting Algorithms",
    question: "Why is Merge Sort particularly well-suited for sorting singly linked lists compared to arrays?",
    options: [
      "Linked lists eliminate the need to find the midpoint of the list.",
      "Linked lists allow Selection Sort to achieve O(n log n) time.",
      "Linked lists make Insertion Sort run in O(1) worst-case time.",
      "Merging linked lists only requires updating node pointers, achieving O(1) auxiliary space without allocating extra arrays."
    ],
    answer: 3, // D
    explanation: "In an array, merging requires allocating an auxiliary buffer of size n to avoid overwriting data. In a linked list, elements can be spliced and merged simply by rewiring 'next' pointers in place, dropping the auxiliary space overhead to O(1) (excluding recursive stack frames).",
    talkingPoint: "Linked lists + Merge Sort = match made in heaven! Fast O(n log n) without the O(n) array memory penalty."
  },
  {
    id: 30,
    topic: "Comparing and Choosing Sorting Algorithms",
    question: "How do modern production sorting engines (such as Python's sorted() and Java's Arrays.sort()) combine Insertion Sort and Merge Sort in TIMSORT?",
    options: [
      "They identify natural ordered 'runs' and use Insertion Sort on small chunks (n <= 32 or 64), then combine the sorted runs using an optimized Merge Sort.",
      "They run Selection Sort first, and switch to Merge Sort only if an error occurs.",
      "They use Insertion Sort for odd numbers and Merge Sort for even numbers.",
      "They execute Merge Sort until the tree reaches depth 2, then discard the recursion."
    ],
    answer: 0, // A
    explanation: "Real-world sorting algorithms like Timsort (used in Python and Java) are hybrid algorithms. They detect pre-existing sorted 'runs', sort small subarrays using Insertion Sort (which is blazingly fast for small sizes), and combine them using Merge Sort.",
    talkingPoint: "Capstone lesson: Why learn both? Because the world's most popular sorting engine, Timsort, combines Merge Sort + Insertion Sort!"
  }
];

// Export for module or browser window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_QUESTIONS };
}
