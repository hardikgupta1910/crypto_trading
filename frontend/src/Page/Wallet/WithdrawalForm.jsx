import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getWalletTransactions } from "@/State/Wallet/Action";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const WithdrawalForm = () => {
  const [amount, setAmount] = React.useState("");
  const dispatch = useDispatch();
  const { wallet, withdrawal } = useSelector((store) => store);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  // const handleSubmit = () => {
  //   dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
  //   console.log(amount);
  // };

  const handleSubmit = async () => {
    // const jwt = localStorage.getItem("jwt");
    // const walletId = wallet.userWallet?.id;

    // await dispatch(
    //   withdrawalRequest({
    //     amount,
    //     jwt,
    //   })
    // );

    // if (walletId) {
    //   dispatch(getWalletTransactions({ jwt, walletId }));
    // }

    const jwt = localStorage.getItem("jwt");
    const walletId = wallet.userWallet?.id;

    try {
      await dispatch(
        withdrawalRequest({
          amount,
          jwt,
        })
      );

      // Refresh wallet transaction history
      if (walletId) {
        dispatch(getWalletTransactions({ jwt, walletId }));
      }
    } catch (error) {
      console.error("Withdrawal failed:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-md bg-slate-900 text-white space-y-6">
      <div className="flex justify-between text-xl font-bold">
        <p>Available balance</p>
        <p>${wallet.userWallet?.balance ?? 0}</p>
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
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {withdrawal.paymentDetails?.accountNumber}
            </p>
          </div>
        </div>
      </div>
      <DialogClose asChild>
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
