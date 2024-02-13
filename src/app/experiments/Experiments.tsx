import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ScienceIcon from "@mui/icons-material/Science";

const Experiments = () => {
  const defaultLabel = () => {
    return (
      <div className="pt-5">
        <Card className="pt-4">
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              This section is used for experimentation purposes into Navika{" "}
              <ScienceIcon />
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <div>{defaultLabel()}</div>
    </>
  );
};

export default Experiments;
