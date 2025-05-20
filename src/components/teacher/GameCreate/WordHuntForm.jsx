import React from 'react';
import WordHuntBoard from './WordHuntBoard'; // Adjust path if needed
import { Header, Input, Textarea } from './FormElements';

function WordHuntForm() {
  return (
    <div className="flex flex-col rounded-xl border border-main-dark p-3">
      <Header title="Word Hunt" />

      <Input label="Heading" placeholder="Search for Animals" />
      <Textarea label="Description" />

      <p className="mt-4 mb-2 font-semibold">Create Boards</p>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-3">
          <WordHuntBoard index={index} />
        </div>
      ))}
    </div>
  );
}


export default WordHuntForm;
