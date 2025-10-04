// import "./Auth.css";
// import React from "react";
// import SignupForm from "./SignupForm";
// import { Button } from "@/components/ui/button";
// import { useLocation, useNavigate } from "react-router-dom";
// import ForgotPasswordForm from "./ForgotPasswordForm";
// import SigninForm from "./SigninForm";

// const Auth = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   return (
//     <div className=" h-screen relative authContainer ">
//       <div className="absolute inset-0 bg-black/40">
//         <div
//           className="bgBlure absolute top-1/2 left-1/2 transform
//   -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center
//   items-center h-[35rem] w-[30rem] rounded-md z-50 bg-transparent
//   bg-opacity-50 shadow-2xl shadow-white px-10 "
//         >
//           <h1 className="text-6xl font-bold pb-4">Cryptrix</h1>

//           {location.pathname == "/signup" ? (
//             <section className="w-full">
//               <SignupForm />
//               <div className="flex items-center justify-center">
//                 <span>already have an account? </span>
//                 <Button
//                   onClick={() => navigate("/signin")}
//                   variant="ghost"
//                   className="hover:bg-neutral-600 rounded-none"
//                 >
//                   Signin
//                 </Button>
//               </div>
//               <div className="">
//                 <Button
//                   onClick={() => navigate("/forgot-password")}
//                   variant="outline"
//                   className="w-full hover:bg-neutral-600 rounded-none "
//                 >
//                   Forgot Password
//                 </Button>
//               </div>
//             </section>
//           ) : location.pathname == "/forgot-password" ? (
//             <section className="w-full">
//               <ForgotPasswordForm />
//               <div className="flex items-center justify-center mt-2">
//                 <span>Back tp Login </span>
//                 <Button
//                   onClick={() => navigate("/signin")}
//                   variant="ghost"
//                   className="hover:bg-neutral-600 rounded-none"
//                 >
//                   Signin
//                 </Button>
//               </div>
//             </section>
//           ) : (
//             <section className="w-full">
//               <SigninForm />
//               <div className="flex items-center justify-center">
//                 <span>don't have an account? </span>
//                 <Button
//                   onClick={() => navigate("/signup")}
//                   variant="ghost"
//                   className="hover:bg-neutral-600 rounded-none"
//                 >
//                   Signup
//                 </Button>
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

import "./Auth.css";
import React from "react";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";
// STEP 1: Import the new verification form
// import AccountVerificationForm from "./AccountVerificationForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className=" h-screen relative authContainer ">
      <div className="absolute inset-0 bg-black/40">
        <div
          className="bgBlure absolute top-1/2 left-1/2 transform
 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center
 items-center h-[35rem] w-[30rem] rounded-md z-50 bg-transparent
 bg-opacity-50 shadow-2xl shadow-white px-10 "
        >
          <h1 className="text-6xl font-bold pb-4">Cryptrix</h1>

          {/* --- Render Signup Form --- */}
          {location.pathname == "/signup" ? (
            <section className="w-full">
              <SignupForm />
              <div className="flex items-center justify-center">
                <span>already have an account? </span>
                <Button
                  onClick={() => navigate("/signin")}
                  variant="ghost"
                  className="hover:bg-neutral-600 rounded-none"
                >
                  Signin
                </Button>
              </div>
              {/* This Forgot Password button might be better on the sign-in page */}
              <div className="">
                <Button
                  onClick={() => navigate("/forgot-password")}
                  variant="outline"
                  className="w-full hover:bg-neutral-600 rounded-none "
                >
                  Forgot Password
                </Button>
              </div>
            </section>
          ) : // --- Render Forgot Password Form ---
          location.pathname == "/forgot-password" ? (
            <section className="w-full">
              <ForgotPasswordForm />
              <div className="flex items-center justify-center mt-2">
                <span>Back to Login </span>
                <Button
                  onClick={() => navigate("/signin")}
                  variant="ghost"
                  className="hover:bg-neutral-600 rounded-none"
                >
                  Signin
                </Button>
              </div>
            </section>
          ) : // STEP 2: Add a new condition for the 2FA verification route
          location.pathname == "/verify-2fa" ? (
            <section className="w-full">
              <h2 className="text-xl font-bold text-center pb-5">
                Two-Factor Authentication
              </h2>
              <AccountVerificationForm />
            </section>
          ) : (
            // --- Render Signin Form (Default) ---
            <section className="w-full">
              <SigninForm />
              <div className="flex items-center justify-center">
                <span>don't have an account? </span>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="ghost"
                  className="hover:bg-neutral-600 rounded-none"
                >
                  Signup
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
