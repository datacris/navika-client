import { FormHelperText, TextField } from "@mui/material";
import React from "react";

interface InputFormikProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: any;
  errors?: any;
  small?: boolean;
}
const InputFormik = (props: InputFormikProps) => {
  const {
    id,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    touched,
    errors,
    small,
  } = props;
  return (
    <>
      <TextField
        size={small ? "small" : "medium"}
        margin="normal"
        fullWidth
        type={type}
        id={id}
        label={placeholder}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && errors && (
        <FormHelperText className="bg-red-500 bg-opacity-20 rounded-sm p-1 text-sm">
          {errors}
        </FormHelperText>
      )}
    </>
  );
};

export default InputFormik;
