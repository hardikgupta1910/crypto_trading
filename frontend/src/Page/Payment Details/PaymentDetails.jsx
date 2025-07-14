// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import PaymentDetailsForm from "./PaymentDetailsForm";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentDetails } from "@/State/Withdrawal/Action";

// const PaymentDetails = () => {
//   const { withdrawal } = useSelector((store) => store);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
//     const jwt = localStorage.getItem("jwt");
//     if (jwt) {
//       dispatch(getPaymentDetails({ jwt }));
//     }
//   }, [dispatch]);

//   return (
//     <div className="px-28">
//       <h1 className="text-3xl font-bold py-10"> Payment Details</h1>

//       {/* true means user already added payment details and he cannot add more and opposite with false*/}
//       {withdrawal.paymentDetails ? (
//         // <Card>
//         //   <CardHeader>
//         //     <CardTitle>YES Bank</CardTitle>
//         //     <CardDescription>A/C No : ************1475</CardDescription>
//         //   </CardHeader>
//         //   <CardContent>
//         //     <div className="flex items-center">
//         //       <p className="w-32"> A/C Holder :</p>
//         //       <p className="text-gray-400"> Hardik</p>
//         //     </div>
//         //     <div className="flex items-center">
//         //       <p className="w-32"> IFSC</p>
//         //       <p className=" text-gray-400"> : YESB00007</p>
//         //     </div>
//         //   </CardContent>
//         // </Card>
//         <Card>
//           <CardHeader>
//             {/* <CardTitle>{withdrawal.paymentDetails.bankName}</CardTitle>
//             <CardDescription>
//               A/C No : ****{withdrawal.paymentDetails.accountNumber.slice(-4)}
//             </CardDescription> */}
//             <CardTitle>
//               {withdrawal.paymentDetails?.bankName || "Bank Name"}
//             </CardTitle>
//             <CardDescription>
//               A/C No : ****
//               {withdrawal.paymentDetails?.accountNumber
//                 ? withdrawal.paymentDetails.accountNumber.slice(-4)
//                 : "XXXX"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center">
//               <p className="w-32"> A/C Holder :</p>
//               <p className="text-gray-400">
//                 {withdrawal.paymentDetails.accountHolderName}
//               </p>
//             </div>
//             <div className="flex items-center">
//               <p className="w-32"> IFSC</p>
//               <p className="text-gray-400">{withdrawal.paymentDetails.ifsc}</p>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Dialog>
//           <DialogTrigger>
//             <Button className="py-6 bg-white text-black mt-2">
//               Add Payment Details
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader className="bg-slate-950">
//               <DialogTitle>Payment Details</DialogTitle>
//             </DialogHeader>
//             <PaymentDetailsForm />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default PaymentDetails;

// ------------------ SECOND ONE  --------------------

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import React, { useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import PaymentDetailsForm from "./PaymentDetailsForm";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentDetails } from "@/State/Withdrawal/Action";

// const PaymentDetails = () => {
//   const { withdrawal, loading } = useSelector((store) => store.withdrawal);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt");
//     if (jwt) {
//       dispatch(getPaymentDetails({ jwt }));
//     }
//   }, [dispatch]);

//   const paymentDetails = withdrawal?.paymentDetails;

//   return (
//     <div className="px-28">
//       <h1 className="text-3xl font-bold py-10">Payment Details</h1>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : paymentDetails ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>{paymentDetails?.bankName || "Bank Name"}</CardTitle>
//             <CardDescription>
//               A/C No : ****
//               {paymentDetails?.accountNumber
//                 ? paymentDetails.accountNumber.slice(-4)
//                 : "XXXX"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="flex items-center">
//               <p className="w-32">A/C Holder :</p>
//               <p className="text-gray-400">
//                 {paymentDetails?.accountHolderName || "N/A"}
//               </p>
//             </div>
//             <div className="flex items-center">
//               <p className="w-32">IFSC :</p>
//               <p className="text-gray-400">{paymentDetails?.ifsc || "N/A"}</p>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Dialog>
//           {/* <DialogTrigger asChild>
//             <Button className="py-6 bg-white text-black mt-2">
//               Add Payment Details
//             </Button>
//           </DialogTrigger> */}
//           <DialogTrigger asChild>
//             <Button
//               className="py-6 bg-white text-black mt-2"
//               data-radix-dialog-close={false}
//             >
//               Add Payment Details
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader className="bg-slate-950">
//               <DialogTitle className="text-white">Payment Details</DialogTitle>
//             </DialogHeader>
//             <PaymentDetailsForm />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default PaymentDetails;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  // const { withdrawal, loading } = useSelector((store) => store.withdrawal);
  const { paymentDetails, loading } = useSelector((store) => store.withdrawal);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // manually control dialog open/close

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getPaymentDetails({ jwt }));
    }
  }, [dispatch]);

  // const paymentDetails = withdrawal?.paymentDetails;

  // called from child on success
  const handleSuccess = () => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
    setOpen(false); // close dialog
  };

  return (
    <div className="px-28">
      <h1 className="text-3xl font-bold py-10">Payment Details</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : paymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle>{paymentDetails?.bankName || "Bank Name"}</CardTitle>
            <CardDescription>
              A/C No : ****
              {paymentDetails?.accountNumber
                ? paymentDetails.accountNumber.slice(-4)
                : "XXXX"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center">
              <p className="w-32">A/C Holder :</p>
              <p className="text-gray-400">
                {paymentDetails?.accountHolderName || "N/A"}
              </p>
            </div>
            <div className="flex items-center">
              <p className="w-32">IFSC :</p>
              <p className="text-gray-400">{paymentDetails?.ifsc || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="py-6 bg-white text-black mt-2">
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="bg-slate-950">
              <DialogTitle className="text-white">Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
