import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

type TLoginData = {
  email: string;
  password: string;
};
const Login = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<TLoginData>();

  const handleLogin = async (info: TLoginData) => {
    const res = await login(info).unwrap();
    if (res.success) {
      toast.success("Login successfully");
      dispatch(setUser({ user: res.data?.user, token: res.data?.accessToken }));
      switch (res.data.user.role) {
        case "superAdmin":
          navigate("/");
          break;
        case "manager":
          navigate("/");
          break;
        default:
          navigate("/sales-management");
      }
    }
  };
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='w-full max-w-md p-8 space-y-3 border rounded-xl'>
        <h1 className='text-lg font-bold '>Welcome back to Product management!</h1>
        <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
          <label htmlFor='email'>
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
            <Input {...register("password")} placeholder='Your password' type='password' />
          </label>
          {error && <p style={{ color: "red" }}> Invalid Credential </p>}
          <Button type='submit' className='w-full'>
            Login
          </Button>

          <p>
            Don&apos;t have an account?{" "}
            <Link
              to={"/register"}
              style={{
                color: "#228BE6",
                opacity: "80%",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
