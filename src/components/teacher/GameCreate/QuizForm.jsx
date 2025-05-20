import React, { useState } from 'react';
import { Select, Option, Radio } from "@material-tailwind/react";
import { MdOutlineFileUpload } from "react-icons/md";
import { quizData } from '../../../../helper/data';
import { Header, Input, Textarea } from './FormElements';

function QuizForm() {
  const [value, setValue] = useState(3);

  return (
    <div className="flex p-3 flex-col rounded-xl border border-main-dark">
      <Header title="Quiz" />

      <Input label="Heading" placeholder="Text to Video Converter" />
      <Textarea label="Description" />

      <div className="mb-4">
        <p className='mb-1'>Minimum correct answers to complete game</p>
        <Select value={value} onChange={val => setValue(val)} labelProps={{ className: "before:content-none after:content-none" }} className="border-none bg-input outline-none">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Option key={num} value={num}>{num}</Option>
          ))}
        </Select>
      </div>

      {quizData.map((quiz, index) => (
        <div key={index}>
          <p className="font-semibold">{quiz.title}</p>
          <div className="p-2 text-[#545454]">
            <p className="border-b border-main-light">{quiz.ques}</p>
            {[1, 2, 3, 4].map((option, optIndex) => (
              <div key={optIndex} className="flex border-b border-main-light justify-between">
                <Radio label={`${quiz.option} ${option}:`} name={`question-${index}`} />
                <MdOutlineFileUpload />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default QuizForm;
