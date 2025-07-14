// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   addPaymentDetails,
//   getPaymentDetails,
// } from "@/State/Withdrawal/Action";
// import { DialogClose } from "@radix-ui/react-dialog";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";

// const PaymentDetailsForm = () => {
//   const dispatch = useDispatch();

//   const form = useForm({
//     resolver: "",
//     defaultValues: {
//       accountHolderName: "",
//       ifsc: "",
//       confirmAccountNumber: "",
//       accountNumber: "",
//       bankName: "",
//     },
//   });
//   const onSubmit = async (data) => {
//     // dispatch(
//     //   addPaymentDetails({
//     //     paymentDetails: data,
//     //     jwt: localStorage.getItem("jwt"),
//     //   })
//     // );

//     // // Option 1: Dispatch getPaymentDetails to refresh store from backend
//     // dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
//     // console.log(data);
//     const jwt = localStorage.getItem("jwt");

//     await dispatch(
//       addPaymentDetails({
//         paymentDetails: data,
//         jwt,
//       })
//     );

//     await dispatch(getPaymentDetails({ jwt }));

//     console.log("Payment details submitted:", data);

//     // Close dialog manually
//     const closeButton = document.querySelector("[data-radix-dialog-close]");
//     if (closeButton) closeButton.click();
//   };
//   return (
//     <div className="px-10 py-2">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="accountHolderName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Holder Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="accountHolderName"
//                     className="border w-full border-gray-700 p-5"
//                     placeholder="Enter Account Holder Name "
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="ifsc"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>IFSC Code</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="ifsc"
//                     className="border w-full border-gray-700 p-5"
//                     placeholder="Enter ifsc code "
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="accountNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Account Number</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="accountNumber"
//                     className="border w-full border-gray-700 p-5"
//                     placeholder="Enter Account Number"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="confirmAccountNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel> Confirm Account Number</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="confirmAccountNumber"
//                     className="border w-full border-gray-700 p-5"
//                     placeholder="Enter Accounter number Again"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="bankName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Bank Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     name="bankName"
//                     className="border w-full border-gray-700 p-5"
//                     placeholder="Enter Bank Name"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <DialogClose asChild>
//             <Button
//               type="submit"
//               className="w-full bg-white text-black px-4 py-3 rounded-md font-semibold"
//             >
//               Submit
//             </Button>
//           </DialogClose>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default PaymentDetailsForm;

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addPaymentDetails,
  getPaymentDetails,
} from "@/State/Withdrawal/Action";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const PaymentDetailsForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      confirmAccountNumber: "",
      accountNumber: "",
      bankName: "",
    },
  });

  const onSubmit = async (data) => {
    const jwt = localStorage.getItem("jwt");

    await dispatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt,
      })
    );

    if (onSuccess) {
      onSuccess(); // parent will re-fetch & close
    }

    console.log("Payment details submitted:", data);
  };

  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Account Holder Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter IFSC Code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Re-enter Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Bank Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-white text-black px-4 py-3 rounded-md font-semibold"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
