import React from "react";

interface InputButton {
  value: string;
}
const InputButton = ({ value }: InputButton) => {
  return (
    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
      value={value}
    />
  );
};

export default InputButton;
