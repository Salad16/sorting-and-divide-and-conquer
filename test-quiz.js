const { QUIZ_QUESTIONS } = require("./quiz-data.js");
console.log("Total questions:", QUIZ_QUESTIONS.length);
const letters = ["A", "B", "C", "D"];
let prev = null;
let violations = 0;
const counts = { A: 0, B: 0, C: 0, D: 0 };

QUIZ_QUESTIONS.forEach((q, idx) => {
  const letter = letters[q.answer];
  counts[letter]++;
  const prevLetter = prev;
  if (prev !== null && letter === prev) {
    console.error(`Violation at Q${q.id} (idx ${idx}): letter ${letter} repeated from Q${q.id - 1}!`);
    violations++;
  }
  console.log(`Q${String(q.id).padStart(2, '0')}: [${letter}] (Prev: ${prevLetter || 'None'}) -> ${q.options[q.answer].slice(0, 50)}...`);
  prev = letter;
});

console.log("\n--- DISTRIBUTION ---");
console.log(counts);
console.log("Violations:", violations);

if (violations === 0 && QUIZ_QUESTIONS.length === 30) {
  console.log("\n>>> SUCCESS: All 30 questions verified. Absolutely zero consecutive repeating answer letters! <<<");
} else {
  console.error("\n>>> FAILED validation! <<<");
  process.exit(1);
}
