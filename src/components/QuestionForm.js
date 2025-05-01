import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then(onAddQuestion);
  }

  function handleAnswerChange(index, value) {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Prompt:</label>
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <label>Answers:</label>
        {answers.map((ans, idx) => (
          <input
            key={idx}
            value={ans}
            onChange={(e) => handleAnswerChange(idx, e.target.value)}
          />
        ))}

        <label>Correct Answer:</label>
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
        >
          {answers.map((ans, idx) => (
            <option key={idx} value={idx}>
              {ans || `Answer ${idx + 1}`}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default QuestionForm;
