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
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";

const PaymentDetailsForm = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      bankName: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
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
                    name="accountHolderName"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Account Holder Name "
                    {...field}
                  />
                </FormControl>
                <FormDescription />
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
                    name="ifsc"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter ifsc code "
                    {...field}
                  />
                </FormControl>
                <FormDescription />
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
                    name="accountNumber"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Account Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    name="confirmAccountNumber"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Accounter number Again"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
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
                    name="bankName"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter Bank Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose className="w-full bg-white text-black">
            <Button type="submit ">Submit</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
