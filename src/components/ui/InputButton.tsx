import { Button } from "@mui/material";
import React from "react";

interface InputButton {
  value: string;
}
const InputButton = ({ value }: InputButton) => {
  return (
    <Button
      type="submit"
      fullWidth
      className="bg-blue-700"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {value}
    </Button>
  );
};

export default InputButton;
