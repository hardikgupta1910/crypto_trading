// import React, { useState } from "react";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@radix-ui/react-dialog";

// const AccountVerificationForm = () => {
//   const [value, setValue] = useState("");
//   const handleSubmit = () => {
//     console.log(value);
//   };
//   return (
//     <div className="flex justify-center">
//       <div className="space-y-5 mt-10 w-full">
//         <div className="flex justify-between items-center">
//           <p>Email:</p>
//           <p className="text-gray-500">cryptrix@gmail.com</p>
//           <Dialog>
//             <DialogTrigger>
//               <Button className={"bg-white text-black"}>Sent OTP</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Enter OTP</DialogTitle>
//                 <div className="py-5 flex gap-10 justify-center items-center">
//                   <InputOTP onChange={(value) => setValue(value)} maxLength={6}>
//                     <InputOTPGroup>
//                       <InputOTPSlot index={0} />
//                       <InputOTPSlot index={1} />
//                       <InputOTPSlot index={2} />
//                     </InputOTPGroup>
//                     <InputOTPSeparator />
//                     <InputOTPGroup>
//                       <InputOTPSlot index={3} />
//                       <InputOTPSlot index={4} />
//                       <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                   </InputOTP>
//                   <DialogClose>
//                     <Button
//                       onClick={handleSubmit}
//                       className={"bg-white text-black w-[10rem]"}
//                     >
//                       {" "}
//                       Submit
//                     </Button>
//                   </DialogClose>
//                 </div>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountVerificationForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "@/State/Auth/Action"; // Import your Redux actions
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const AccountVerificationForm = () => {
  // --- Component State ---
  // Local state to hold the OTP value from the input field.
  const [value, setValue] = useState("");

  // --- Redux Hooks ---
  // The 'dispatch' function is used to send actions to your Redux store.
  const dispatch = useDispatch();
  // The 'useSelector' hook gets the current state from your Redux store.
  const { auth } = useSelector((store) => store);

  // --- Handler Functions ---
  // This function is called when the user clicks the "Verify" button.
  const handleSubmit = () => {
    // It dispatches the 'verifyOtp' action with the session ID from the Redux state
    // and the OTP value the user typed.
    if (auth.session) {
      dispatch(verifyOtp({ id: auth.session, otp: value }));
    } else {
      console.error("No 2FA session found to verify.");
    }
  };

  // This function is called when the user clicks "Resend OTP".
  const handleResendOtp = () => {
    // It dispatches the 'resendOtp' action with the current session ID.
    if (auth.session) {
      dispatch(resendOtp(auth.session));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-center pb-5">An OTP has been sent to your email.</p>

      {/* --- Main Content Area --- */}
      <div className="py-5 flex flex-col gap-5 justify-center items-center w-full">
        <InputOTP
          value={value}
          onChange={(value) => setValue(value)}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {/* --- Verify Button --- */}
        <Button
          onClick={handleSubmit}
          className="bg-white text-black w-full mt-5"
          // The button is disabled while a request is loading or if the OTP is not 6 digits.
          disabled={auth.loading || value.length < 6}
        >
          {auth.loading ? "Verifying..." : "Verify"}
        </Button>

        {/* --- Resend OTP Section --- */}
        <div className="text-center">
          <p className="text-sm">Didn't receive the code?</p>
          <Button
            variant="ghost"
            onClick={handleResendOtp}
            disabled={auth.loading}
            className="text-blue-400 hover:text-blue-600"
          >
            {auth.loading ? "Sending..." : "Resend OTP"}
          </Button>
        </div>

        {/* --- Error Display --- */}
        {/* If there's an error in the Redux state, it will be displayed here. */}
        {auth.error && (
          <p className="text-red-500 text-center mt-2">{auth.error}</p>
        )}
      </div>
    </div>
  );
};

export default AccountVerificationForm;
