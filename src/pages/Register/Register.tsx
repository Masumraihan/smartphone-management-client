import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { handleSubmit, register } = useForm<TRegisterData>();
  const [userRegister, { error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegister = async (data: TRegisterData) => {
    const res = await userRegister(data).unwrap();

    if (res?.success) {
      toast.success("Register successfully");
      navigate("/login");
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='w-full max-w-md p-8 space-y-3 border rounded-xl'>
        <h1 className='text-lg font-bold '>Welcome to product management!</h1>
        <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
          <label htmlFor='name' className='block'>
            <span className='inline-block mb-1 font-semibold'>Password</span>
            <Input {...register("name")} placeholder='Your Name' type='text' required />
          </label>
          <label htmlFor='email' className='block'>
            <span className='inline-block mb-1 font-semibold'>Email</span>
            <Input
              {...register("email")}
              placeholder='hello@gmail.com'
              type='email'
              required
              id='email'
            />
          </label>
          <label htmlFor='password' className='block'>
            <span className='inline-block mb-1 font-semibold'>Password</span>
            <Input
              {...register("password")}
              //label='Password'
              placeholder='Your password'
              type='password'
              required
            />
          </label>
          {error && <p style={{ color: "red" }}>Please provide valid credentials</p>}
          <Button type='submit' className='w-full'>
            Login
          </Button>

          <p className='text-sm'>
            already have an account?{" "}
            <Link
              to={"/login"}
              style={{
                color: "#228BE6",
                opacity: "80%",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
