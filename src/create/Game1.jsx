import React, { useState } from "react";
import axios_instance from "../utils/axios";

function Game1() {
  const [questions, setQuestions] = useState(
    Array(5)
      .fill()
      .map(() => ({
        question_text: "",
        question_type: "quiz",
        points: 0,
        correctIndex: null,
        options: ["", "", "", ""],
      }))
  );

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question_text = value;
    setQuestions(updated);
  };

  const handlePointChange = (index, value) => {
    const updated = [...questions];
    updated[index].points = parseInt(value, 10) || 0; // parse to integer or 0
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerSelect = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctIndex = optIndex;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    // Validation loop
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim()) {
        alert(`Pergunta ${i + 1} precisa ter texto.`);
        return;
      }
      if (!Number.isInteger(q.points) || q.points <= 0) {
        alert(
          `Pergunta ${i + 1} precisa ter pontos válidos (inteiro maior que 0).`
        );
        return;
      }
      if (q.correctIndex === null) {
        alert(
          `Pergunta ${i + 1} precisa ter uma resposta correta selecionada.`
        );
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert(`Pergunta ${i + 1} tem opções vazias.`);
        return;
      }
    }

    const formattedQuestions = questions.map((q) => ({
      question_text: q.question_text.trim(),
      question_type: q.question_type,
      points: q.points,
      options: q.options.map((text, i) => ({
        id: i + 1,
        option_text: text.trim(),
        is_correct: i === q.correctIndex,
      })),
    }));

    try {
      const response = await axios_instance.post("learning/games/", {
        title: "quiz",
        questions: formattedQuestions,
      });
      setQuestions(
        Array(5)
          .fill()
          .map(() => ({
            question_text: "",
            question_type: "quiz",
            points: 0,
            correctIndex: null,
            options: ["", "", "", ""],
          }))
      );
    } catch (error) {
      console.error("Erro ao criar jogo:", error);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex gap-5 mb-3 p-2 text-white">
        <p className="p-[10px] rounded-2xl bg-main-dark">Caixa Cerebral</p>
      </div>

      {questions.map((q, i) => (
        <div key={i}>
          <p className="text-2xl font-bold text-black my-4">
            <span>Pergunta {i + 1}</span>
            <input
              type="text"
              placeholder="Pergunta"
              value={q.question_text}
              onChange={(e) => handleQuestionChange(i, e.target.value)}
              className="mt-2 w-full p-3 bg-input rounded-lg outline-none text-main-dark/70 placeholder:text-main-dark/70"
            />
            <input
              type="number"
              placeholder="Pontos"
              value={q.points}
              onChange={(e) => handlePointChange(i, e.target.value)}
              className="mt-3 w-32 p-3 bg-input rounded-lg outline-none text-sm text-black"
              min={1}
            />
          </p>

          <div className="grid grid-cols-2 lg:flex w-full h-80 lg:h-64 gap-4 justify-between p-3">
            {q.options.map((opt, j) => (
              <div
                key={j}
                className="flex flex-col items-center justify-center text-center h-full cursor-pointer p-4 bg-main-light text-main-dark text-xl lg:text-3xl font-bold rounded-lg"
              >
                <textarea
                  rows={2}
                  placeholder="Opção"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  className="w-full py-3 px-4 rounded-lg border-2 border-input bg-transparent outline-none text-[#545454] placeholder:text-[#545454]"
                  style={{ resize: "none" }}
                />
                <label className="mt-2 text-sm text-black">
                  <input
                    type="radio"
                    name={`correct-${i}`}
                    checked={q.correctIndex === j}
                    onChange={() => handleCorrectAnswerSelect(i, j)}
                    className="mr-2"
                  />
                  Resposta correta
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p
        onClick={handleSubmit}
        className="capitalize w-full p-3 rounded-lg bg-main-dark text-white text-center mt-5 cursor-pointer"
      >
        Criar jogo
      </p>
    </div>
  );
}

export default Game1;
