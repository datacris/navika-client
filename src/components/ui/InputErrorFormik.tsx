import React from "react";

interface InputErrorFormikProps {
  error: string;
}

const InputErrorFormik = ({ error }: InputErrorFormikProps) => {
  return (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-sm w-full">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );
};

export default InputErrorFormik;
