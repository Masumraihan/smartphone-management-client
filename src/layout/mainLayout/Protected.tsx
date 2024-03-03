/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

type TProtectedProps = {
  children: ReactNode;
  roles: string[];
};

const Protected = ({ children, roles }: TProtectedProps) => {
  const token = useAppSelector(useCurrentToken);

  const { pathname } = useLocation();
  let user;
  if (token) {
    user = jwtDecode(token) as any;
  }

  if (!token) {
    console.log(false);
    return <Navigate to={"/login"} replace={true} />;
  }

  if (!roles.includes(user?.role)) {
    return <Navigate to={"/login"} replace={true} state={{ from: pathname }} />;
  }

  return <>{children}</>;
};

export default Protected;
