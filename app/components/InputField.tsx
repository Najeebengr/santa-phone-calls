import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string ;
  placeholder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraStyles?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, value, onChange, extraStyles, ...rest }) => {
  return (
    <div className={`w-full ${extraStyles}`}>
      <label
        className="text-lg font-semibold font-seasons"
        style={{ textShadow: "0 0 20px #FCCC73" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-[#554735] border-[1px] border-[#827E4B] my-2 py-2.5 px-4 text-white placeholder:text-white font-harmonia text-lg font-normal focus:outline-none w-full rounded-full"
        {...rest}
      />
    </div>
  );
};

export default InputField;