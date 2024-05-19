import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import FormLogin from "../pages/Forms/FormLogin";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import Pets from "../pages/Pets/Pets";
import Owners from "../pages/Owners/Owners";
import SignupEmployee from "../pages/Employees/SignupEmployee";
import NewPet from "../pages/NewPet/NewPet";
import PetProfile from "../pages/Owners/PetProfile";
import SignupNewClient from "../pages/SignupNewClient/SignupNewClient";
import UpdateEmployee from "../pages/Employees/UpdateEmployee";
import UserProfilePage from "../pages/UserProfilePage/UserProfile";

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
          path: "/actualizar-empleado",
          element: (
            <ProtectedRoute id={5}>
              <UpdateEmployee></UpdateEmployee>
            </ProtectedRoute>
          ),
        },
        {
          path: "/mascota/ver/:idMascota",
          element: (
            <ProtectedRoute id={6}>
              <PetProfile></PetProfile>
            </ProtectedRoute>
          ),
        },
        {
          path: "/registrar/titular-mascota",
          element: (
            <ProtectedRoute id={7}>
              <SignupNewClient></SignupNewClient>
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-profile",
          element: (
            <ProtectedRoute id={8}>
              <UserProfilePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
