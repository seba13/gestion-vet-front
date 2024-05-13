import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import FormLogin from "../pages/FormLogin/FormLogin";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context/AuthContext";
import FormPet from "../pages/FormNewPatient/FormNewPatient";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import Pets from "../pages/Pets/Pets";

export default function AppRouter() {
  const authContext = useContext(AuthContext)!;
  const { token } = authContext;

  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={!token && <FormLogin />}>
  //           <Route index element={<Dashboard />} />
  //           <Route path="registrar-paciente" element={<FormPet />} />
  //           <Route path="salir" />
  //           <Route path="*" element={<NotFound />} />
  //         </Route>
  //       </Routes>
  //     </Router>
  //   );
  // }

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
              <FormPet></FormPet>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
