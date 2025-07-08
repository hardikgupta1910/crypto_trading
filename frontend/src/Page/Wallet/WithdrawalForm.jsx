// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React from "react";

// const WithdrawalForm = () => {
//   const [amount, setAmount] = React.useState("");

//   const handleChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleSubmit = () => {
//     console.log(amount);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-6 rounded-md bg-slate-900 text-white space-y-6">
//       <div className="flex justify-between text-xl font-bold">
//         <p>Available balance</p>
//         <p>$9000</p>

//         <div className="text-center space-y-3">
//           <h1>Enter Withdrawal amount</h1>

//           <div className="flex items-center justify-center">
//             <Input
//               onChange={handleChange}
//               value={amount}
//               className=" py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
//               placeholder="$9999"
//               type="number"
//             />
//           </div>
//         </div>
//         <div>
//           <p className="pb-2">Transfer to </p>
//           <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
//             <img className="h-8 w-8" src="public\images\bank.webp" alt="" />
//             <div>
//               <p className="text-xl font-bold">YES Bank</p>
//               <p className="text-xs">**********1475 </p>
//             </div>
//           </div>
//         </div>
//         <Button onClick={handleSubmit} className="w-full py-7 text-xl">
//           {" "}
//           Withdrawal
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default WithdrawalForm;

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

const WithdrawalForm = () => {
  const [amount, setAmount] = React.useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log(amount);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-md bg-slate-900 text-white space-y-6">
      <div className="flex justify-between text-xl font-bold">
        <p>Available balance</p>
        <p>$9000</p>
      </div>

      <div className="text-center space-y-3">
        <h1>Enter Withdrawal amount</h1>

        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="py-7 border-none outline-none text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>

      <div>
        <p className="pb-2">Transfer to </p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md bg-slate-800">
          <img className="h-8 w-8" src="/images/bank.webp" alt="Bank" />
          <div>
            <p className="text-xl font-bold">YES Bank</p>
            <p className="text-xs">**********1475</p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7 text-xl bg-gray-200 text-black"
        >
          Withdrawal
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
