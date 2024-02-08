"use client";
import React, { Dispatch, SetStateAction } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { toogleUserProfileForm } from "@/src/redux/features/user-slice";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface ProfileProps {
  setIsUserSigningOut: Dispatch<SetStateAction<boolean>>;
}

const Profile = ({ setIsUserSigningOut }: ProfileProps) => {
  const userState = useSelector((state: RootState) => state.User);
  const isOpen = userState.showShownUserProfileForm ? true : false;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Modal
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => dispatch(toogleUserProfileForm())}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: {
              backgroundColor: "rgba(0, 0, 0, 0)",
            },
          },
        }}
      >
        <Fade in={isOpen}>
          <div className="flex justify-end pt-14 pr-8 border-none">
            <div className="w-30 p-3 bg-blue-100 rounded-md shadow-2xl">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus,
              </Typography>
              <Button
                className="bg-blue-500"
                onClick={() => setIsUserSigningOut(true)}
                endIcon={<ExitToAppIcon />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Profile;
