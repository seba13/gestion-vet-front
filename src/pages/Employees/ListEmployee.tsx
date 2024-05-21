import { useEffect, useState } from "react";
import TableEmployee from "../../components/Tables/TableEmployee";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IEmployee } from "../../interfaces/Employee";

export const ListEmployee = () => {
  const [rows, setRows] = useState<Array<IEmployee>>([]);
  const [heads] = useState<string[]>([
    "Rut",
    "Nombres",
    "Paterno",
    "Materno",
    "Fecha nacimiento",
    "Direccion",
    "Telefono",
    "Correo",
    "Sexo",
    "Estado",
    "Cargo",
    "Especialidad",
    "Operaciones",
  ]);
  const { loading, fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/empleados`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  useEffect(() => {
    fetchData().then((result) => {
      setRows(result.data);
    });
  }, []);

  return (
    <>
      {loading && <p className="p text-center">Cargando datos...</p>}
      {!loading && <TableEmployee heads={heads} rows={rows} />}
    </>
  );
};
