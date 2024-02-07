// "use client";
// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Backdrop } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/src/redux/store";
// import { toogleUserProfileForm } from "@/src/redux/features/user-slice";

// const style = {
//   position: "absolute" as "absolute",
//   top: "25%",
//   right: "10%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function Profile() {
//   const userState = useSelector((state: RootState) => state.User);
//   const isOpen = userState.showShownUserProfileForm ? true : false;
//   const dispatch = useDispatch<AppDispatch>();

//   return (
//     <div>
//       <Modal
//         open={isOpen}
//         onClose={() => dispatch(toogleUserProfileForm())}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         closeAfterTransition
//         BackdropComponent={(props) => (
//           <Backdrop
//             {...props}
//             style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
//           />
//         )}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <div className="flex justify-end pt-16 pr-10 border-none border-0">
//           <Box className="w-30 p-3 bg-slate-100 rounded-md shadow-2xl">
//             {/* <Box sx={style}> */}
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Text in a modal
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               Duis mollis, est non commodo luctus,
//             </Typography>
//           </Box>
//         </div>
//       </Modal>
//     </div>
//   );
// }

'use client'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { toogleUserProfileForm } from "@/src/redux/features/user-slice";



export default function Profile() {
  const userState = useSelector((state: RootState) => state.User);
  const isOpen = userState.showShownUserProfileForm ? true : false;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => dispatch(toogleUserProfileForm())}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0)'
            },
          },
        }}
      >
        <Fade in={isOpen}>
        <div className="flex justify-end pt-14 pr-8 border-none border-0">
          <div className="w-30 p-3 bg-blue-100 rounded-md shadow-2xl">
             <Typography id="modal-modal-title" variant="h6" component="h2">
               Text in a modal
             </Typography>
             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               Duis mollis, est non commodo luctus,
             </Typography>
           </div>
         </div>
        </Fade>
      </Modal>
    </div>
  );
}