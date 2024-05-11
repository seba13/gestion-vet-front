import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import FormLogin from "../pages/FormLogin/FormLogin";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context/AuthContext";
import FormPet from "../pages/FormNewPatient/FormNewPatient";

export default function AppRouter() {
  const authContext = useContext(AuthContext)!;
  const { isLogged } = authContext;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLogged && <FormLogin />}>
          <Route index element={<Dashboard />} />
          <Route path="registrar-paciente" element={<FormPet />} />
          <Route path="salir"/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
