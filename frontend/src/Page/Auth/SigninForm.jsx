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
import { login } from "@/State/Auth/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    // resolver: "",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(login({ data, navigate }));
    console.log(data);
  };
  return (
    <div className="w-full mb-4">
      <h1 className="text-xl font-bold text-center pb-3"> Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

export default SigninForm;
