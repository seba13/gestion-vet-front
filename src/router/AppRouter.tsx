import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import FormLogin from "../pages/FormLogin/FormLogin";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context/AuthContext";
import FormPet from "../pages/NewPet/NewPet";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import Pets from "../pages/Pets/Pets";
import Owners from "../pages/Owners/Owners";
import SignupEmployee from "../pages/SignupEmployee/SignupEmployee";
import NewPet from "../pages/NewPet/NewPet";
import PetProfile from "../pages/Owners/PetProfile";

export default function AppRouter() {
  const authContext = useContext(AuthContext)!;
  const { token } = authContext;
  const router = createBrowserRouter([
    {
      path: "/",
      Component: token ? Dashboard : FormLogin,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          path: "/mascotas",
          element: (
            <ProtectedRoute id={1}>
              <Pets></Pets>
            </ProtectedRoute>
          ),
        },
        {
          path: "/nueva-mascota",
          element: (
            <ProtectedRoute id={2}>
              <NewPet></NewPet>
            </ProtectedRoute>
          ),
        },
        {
          path: "/dueños",
          element: (
            <ProtectedRoute id={3}>
              <Owners></Owners>
            </ProtectedRoute>
          ),
        },
        {
          path: "/nuevo-empleado",
          element: (
            <ProtectedRoute id={4}>
              <SignupEmployee></SignupEmployee>
            </ProtectedRoute>
          ),
        },
        {
          path: "/mascota/ver/:idMascota",
          element: (
            <ProtectedRoute id={5}>
              <PetProfile></PetProfile>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
