import { FormHelperText } from "@mui/material";
import React from "react";

interface InputErrorFormikProps {
  error: string;
}

const InputErrorFormik = ({ error }: InputErrorFormikProps) => {
  return (
    <FormHelperText className=" bg-red-100 bg-opacity-10  rounded-sm text-red-700 p-1 text-sm ">
      {error}
    </FormHelperText>
  );
};

export default InputErrorFormik;
