"use client";
import React, { Dispatch, SetStateAction } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { toogleUserProfileForm } from "@/src/redux/features/user-slice";
import { Avatar, Button } from "@mui/material";
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
          <div className="flex w-full justify-end pt-14 pr-8 border-none">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 w-80">
              <div className="bg-blue-100 p-4 h-20"></div>
              <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Avatar
                  className="w-16 h-16 rounded-full border-2 border-white"
                  alt="Remy Sharp"
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1707402731~exp=1707403331~hmac=595461489c31a9ac54e00f14eed83b202eb2bfb7b8251d6086fd64d9c589bada"
                  sx={{ width: 56, height: 56 }}
                />
              </div>
              <div className="p-4 mt-4 h-80">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Button
                  className="bg-blue-100"
                  onClick={() => setIsUserSigningOut(true)}
                  endIcon={<ExitToAppIcon />}
                >
                  Sign Out
                </Button>
              </div>
            </div>

          
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Profile;
