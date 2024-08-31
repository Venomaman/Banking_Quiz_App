export type Question = {
  question: string;
  answer: number;
};
// Generate perfect squares up to 10,000
const perfectSquares = Array.from(
  { length: 100 },
  (_, i) => (i + 10) ** 2
).filter((num) => num <= 10000);

// Generate perfect cubes up to 1,000,000
const perfectCubes = Array.from({ length: 100 }, (_, i) => (i + 5) ** 3).filter(
  (num) => num <= 100000
);

export const generateQuestions = (numQuestions: number = 10) => {
  const operations = ["sqaure", "cube", "sqrt", "cubrt", "multiply"] as const;
  const questions: Question[] = [];

  for (let i = 0; i < numQuestions; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 100) + 1; //random num btw 1 and 100
    let num2: number | undefined;
    let question: string;
    let answer: number;

    switch (operation) {
      case "sqaure":
        question = `SQUARE of ${num1} is?`;
        answer = num1 ** 2; //(**) donate power of num1
        break;
      case "cube":
        question = `CUBE of ${num1} is?`;
        answer = num1 ** 3;
        break;
      case "sqrt":
        // Choose a perfect square <= 10,000
        const sqrtNum =
          perfectSquares[Math.floor(Math.random() * perfectSquares.length)];
        question = `What is the square root of ${sqrtNum}?`;
        answer = Math.sqrt(sqrtNum);
        break;
      case "cubrt":
        // Choose a perfect cube <= 1,000,000
        const cbrtNum =
          perfectCubes[Math.floor(Math.random() * perfectCubes.length)];
        question = `What is the cube root of ${cbrtNum}?`;
        answer = Math.cbrt(cbrtNum);
        break;
      case "multiply":
        num2 = Math.floor(Math.random() * 100) + 1;
        question = `What is ${num1} multiplied by ${num2}?`;
        answer = num1 * num2;
        break;
      default:
        throw new Error("Unknown operation");
    }

    questions.push({ question, answer });
  }
  return questions;
};
