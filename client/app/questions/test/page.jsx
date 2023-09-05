"use client";
import React, { useState } from "react";
import Question from "@/app/components/Questions";

function generateRandomQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];

  return `${num1} ${operator} ${num2}`;
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(
    generateRandomQuestion()
  );

  const handleNextQuestion = () => {
    setCurrentQuestion(generateRandomQuestion());
  };

  return (
    <div className="App">
      <h1>Arithmetic Quiz</h1>
      <Question question={currentQuestion} />
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
