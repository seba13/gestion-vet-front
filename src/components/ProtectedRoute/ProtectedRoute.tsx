import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const { validateSession, logout, handleChangeSession } =
    useContext(AuthContext)!;
  const navigate = useNavigate();

  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    validateSession().then((valid: boolean) => {
      setValidSession(valid);
      if (valid) {
        handleChangeSession();
      } else {
        logout();
        navigate("/");
      }
    });
  }, [id]);

  // return token ? children : <Navigate to={"/"} />;

  return <>{validSession && children}</>;
};
