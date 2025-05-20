
import React from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { columnData } from '../../../../helper/data';
import { Header, Input, Textarea } from './FormElements';

function ColumnMatchForm() {
  return (
    <div className="flex flex-col rounded-xl border border-main-dark p-3">
      <Header title="Match the Column" />

      <Input label="Heading" placeholder="Match the Capitals with Countries" />
      <Textarea label="Description" />

      <div className="grid mt-4 grid-cols-2 text-[14px] font-medium gap-4">
        {columnData.map((data, index) => (
          <div key={index}>
            <p className="font-semibold">{data.title}</p>
            <div className="p-2 text-[#545454]">
              {[1, 2, 3].map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between border-b border-main-light">
                  <span>{`${data.option} ${item}`}</span>
                  <MdOutlineFileUpload />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default ColumnMatchForm;
