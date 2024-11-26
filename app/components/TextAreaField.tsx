import React from 'react';

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, placeholder, rows = 3, value, onChange, ...rest }) => {
  return (
    <div>
      <label
        className="text-lg font-semibold font-seasons"
        style={{ textShadow: "0 0 20px #FCCC73" }}
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-[#FFFFFF80] font-harmonia text-lg font-normal focus:outline-none w-full h-full rounded-3xl"
        {...rest}
      />
    </div>
  );
};

export default TextAreaField;