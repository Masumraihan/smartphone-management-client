import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  const { pathname } = useLocation();

  if (!token) {
    return <Navigate to={"/login"} replace={true} state={{ from: pathname }} />;
  }

  return <>{children}</>;
};

export default Protected;
