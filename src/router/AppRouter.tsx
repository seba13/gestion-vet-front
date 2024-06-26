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
import { ListEmployee } from "../pages/Employees/ListEmployee";
import { Appointment } from "../pages/Appointment/Appointment";
import { NewClinicalRecord } from "../pages/ClinicalRecords/NewClinicalRecord";
import { ClinicalRecords } from "../pages/ClinicalRecords/ClinicalRecords";
import { EntryForm } from "../pages/EntryForms/EntryForm";
import { Prescriptions } from "../pages/Prescriptions/Prescriptions";

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
          path: "/ver-empleados",
          element: (
            <ProtectedRoute id={5}>
              <ListEmployee></ListEmployee>
            </ProtectedRoute>
          ),
        },
        {
          path: "/actualizar-empleado/:idPersona",
          element: (
            <ProtectedRoute id={6}>
              <UpdateEmployee></UpdateEmployee>
            </ProtectedRoute>
          ),
        },
        {
          path: "/mascota/ver/:idMascota",
          element: (
            <ProtectedRoute id={7}>
              <PetProfile></PetProfile>
            </ProtectedRoute>
          ),
        },
        {
          path: "/registrar/titular-mascota",
          element: (
            <ProtectedRoute id={8}>
              <SignupNewClient></SignupNewClient>
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-profile",
          element: (
            <ProtectedRoute id={9}>
              <UserProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/citas",
          element: (
            <ProtectedRoute id={10}>
              <Appointment></Appointment>
            </ProtectedRoute>
          ),
        },
        {
          path: "/citas/agendar/:idMascota",
          element: (
            <ProtectedRoute id={11}>
              <Appointment></Appointment>
            </ProtectedRoute>
          ),
        },
        {
          path: "/citas/editar/:idCitaMedica",
          element: (
            <ProtectedRoute id={12}>
              <Appointment></Appointment>
            </ProtectedRoute>
          ),
        },
        {
          path: "/ficha-clinica/registrar/:idMascota",
          element: (
            <ProtectedRoute id={13}>
              <NewClinicalRecord></NewClinicalRecord>
            </ProtectedRoute>
          ),
        },
        {
          path: "/ficha-clinica/registrar",
          element: (
            <ProtectedRoute id={14}>
              <NewClinicalRecord></NewClinicalRecord>
            </ProtectedRoute>
          ),
        },
        {
          path: "/fichas-clinicas/ver",
          element: (
            <ProtectedRoute id={15}>
              <ClinicalRecords></ClinicalRecords>
            </ProtectedRoute>
          ),
        },
        {
          path: "/receta-mascota",
          element: (
            <ProtectedRoute id={16}>
              <Prescriptions></Prescriptions>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
