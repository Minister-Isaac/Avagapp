import React, { useState } from "react";
import axios_instance from "../utils/axios";

function Game2() {
  const [questions, setQuestions] = useState(
    Array(5)
      .fill()
      .map(() => ({
        question_text: "",
        question_type: "fill_in_the_blank",
        points: "",
        correct_answer: "",
      }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = field === "points" ? Number(value) : value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      await axios_instance.post("learning/games/", {
        title: "fill_in_the_blank",
        questions,
      });
      setQuestions(
        Array(5)
          .fill()
          .map(() => ({
            question_text: "",
            question_type: "fill_in_the_blank",
            points: "",
            correct_answer: "",
          }))
      );
    } catch (error) {
      console.error("Erro ao criar jogo:", error);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex gap-5 mb-3 p-2 text-white">
        <p className="p-[10px] rounded-2xl bg-main-dark">Preencha a Lacuna</p>
      </div>

      {questions.map((q, i) => (
        <div key={i}>
          <p className="text-2xl font-bold text-black my-4">
            <span>Pergunta {i + 1}</span>
            <input
              type="text"
              placeholder="Pergunta"
              value={q.question_text}
              onChange={(e) => handleChange(i, "question_text", e.target.value)}
              className="mt-2 w-full p-3 bg-input rounded-lg outline-none text-main-dark/70 placeholder:text-main-dark/70"
            />
            <input
              type="number"
              placeholder="Pontos"
              value={q.points}
              onChange={(e) => handleChange(i, "points", e.target.value)}
              className="mt-3 w-32 p-3 bg-input rounded-lg outline-none text-sm text-black"
            />
          </p>

          <div className="grid grid-cols-1 lg:flex gap-4 p-3 items-center">
            <span className="text-black font-medium">Resposta:</span>
            <input
              type="text"
              placeholder="Resposta"
              value={q.correct_answer}
              onChange={(e) =>
                handleChange(i, "correct_answer", e.target.value)
              }
              className="w-full lg:w-[30%] p-3 bg-input rounded-lg outline-none text-main-dark/70 placeholder:text-main-dark/70"
            />
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

export default Game2;
