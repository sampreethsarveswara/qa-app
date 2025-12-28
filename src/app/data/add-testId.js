const fs = require('fs');

// Load your original file
const questions = require('./test.json');

const QUESTIONS_PER_TEST = 60;

const updated = questions.map((q, index) => {
  let testId = Math.floor(index / QUESTIONS_PER_TEST) + 1;

  // cap to 4 tests
  if (testId > 4) testId = 4;

  return {
    ...q,
    testId,
  };
});

fs.writeFileSync('questions-with-testId.json', JSON.stringify(updated, null, 2), 'utf-8');

console.log('✅ testId assigned successfully');
