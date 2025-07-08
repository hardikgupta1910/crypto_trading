import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CopyIcon,
  DollarSign,
  DownloadIcon,
  ShuffleIcon,
  UploadIcon,
  WalletIcon,
} from "lucide-react";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Wallet = () => {
  return (
    <div className="flex flex-col items-center max-h-[600px] overflow-y-auto ">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={35} className="" />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-200 text-sm">#A475Ed</p>
                    <CopyIcon
                      size={20}
                      className="cursor-pointer hover:text-slate-300"
                    />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon className="w-6 h-6 cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">2000</span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-25 w-25 hover:text-gray-400 cursor-pointer
                  flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md"
                  >
                    <DownloadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-slate-800">
                  <DialogHeader>
                    <DialogTitle>Top up your wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-25 w-25 hover:text-gray-400 cursor-pointer 
                  flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md"
                  >
                    <UploadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-slate-800">
                  <DialogHeader>
                    <DialogTitle>Request withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-25 w-25 hover:text-gray-400 cursor-pointer
                  flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md"
                  >
                    <ShuffleIcon />
                    <span className="text-sm mt-2"> Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Transfer to other wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className="py-5 pt-10 ">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold"> History</h1>
            <UpdateIcon className="h-5 w-5 cursor-pointer p-0 hover:text-gray-400" />
          </div>
          <div className=" space-y-3 pr-2">
            {[1, 1, 1, 1, 1, 1, 1, 1].map((Item, i) => (
              <div key={i}>
                <Card className="px-5 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          <ShuffleIcon className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h1 className="font-medium leading-none">Buy Asset</h1>
                        <p className="text-sm text-gray-500">2025-06-05</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-green-500 text-base font-semibold">
                        9999
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
