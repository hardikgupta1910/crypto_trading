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
import { register } from "@/State/Auth/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    // resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(register(data));
    console.log(data);
  };
  return (
    <div className="w-full mb-4">
      <h1 className="text-xl font-bold text-center pb-3">
        {" "}
        Create New Account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName</FormLabel>
                <FormControl>
                  <Input
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="Enter email  "
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
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
          <Button className="bg-white text-black w-full hover:bg-gray-400">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
