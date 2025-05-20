// components/shared/FormElements.jsx
export const Header = ({ title }) => (
  <div className="flex mb-2 justify-between pr-2 items-center text-white">
    <p className="font-bold text-[20px] text-black">{title}</p>
    <button className="flex cursor-pointer p-[10px] items-center rounded-2xl gap-2 bg-main-dark">Publish</button>
  </div>
);

export const Input = ({ label, placeholder }) => (
  <label className="font-medium text-base text-black">
    {label}
    <input
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      className="mt-2 text-[#545454] px-4 py-3 bg-input rounded-lg w-full outline-none"
    />
  </label>
);

export const Textarea = ({ label, placeholder }) => (
  <label className="font-medium text-base text-black mt-4">
    {label}
    <textarea
      rows={6}
      style={{ resize: "none" }}
      placeholder={placeholder}
      className="mt-2 text-[#545454] px-4 py-3 bg-input rounded-lg w-full outline-none"
    />
  </label>
);
