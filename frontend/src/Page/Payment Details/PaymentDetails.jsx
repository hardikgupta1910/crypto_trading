import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";

const PaymentDetails = () => {
  return (
    <div className="px-28">
      <h1 className="text-3xl font-bold py-10"> Payment Details</h1>

      {/* true means user already added payment details and he cannot add more and opposite with false*/}
      {false ? (
        <Card>
          <CardHeader>
            <CardTitle>YES Bank</CardTitle>
            <CardDescription>A/C No : ************1475</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32"> A/C Holder :</p>
              <p className="text-gray-400"> Hardik</p>
            </div>
            <div className="flex items-center">
              <p className="w-32"> IFSC</p>
              <p className=" text-gray-400"> : YESB00007</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="py-6 bg-white text-black mt-2">
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="bg-slate-950">
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
