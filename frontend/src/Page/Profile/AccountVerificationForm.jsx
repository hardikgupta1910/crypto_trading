import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const AccountVerificationForm = () => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    console.log(value);
  };
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        <div className="flex justify-between items-center">
          <p>Email:</p>
          <p className="text-gray-500">cryptrix@gmail.com</p>
          <Dialog>
            <DialogTrigger>
              <Button className={"bg-white text-black"}>Sent OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
                <div className="py-5 flex gap-10 justify-center items-center">
                  <InputOTP onChange={(value) => setValue(value)} maxLength={6}>
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
                  <DialogClose>
                    <Button
                      onClick={handleSubmit}
                      className={"bg-white text-black w-[10rem]"}
                    >
                      {" "}
                      Submit
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
