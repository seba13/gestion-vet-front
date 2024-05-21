import React, { useEffect, useState } from "react";
import { TableAppointments } from "../../components/Tables/TableAppointments";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IAppointment } from "../../interfaces/Appointment";
export const Appointment: React.ComponentType = () => {
  const [isUpdated, setIsUpdated] = useState(true);
  const { data, loading, fetchData, setLoading } = useFetch(
    `${import.meta.env.VITE_API_URL}/citas-medicas`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  useEffect(() => {
    if (isUpdated) {
      fetchData().then((result) => {
        setRows(result.data);
        setIsUpdated(false);
      });
    }

    // setRows(data.data);
  }, [isUpdated]);

  const handleUpdate = () => {
    if (!isUpdated) {
      setIsUpdated(true);
    }
  };
  const [rows, setRows] = useState<Array<IAppointment>>([]);
  const [heads] = useState<string[]>([
    "N° Cita",
    "Fecha Cita",
    "Hora Cita",
    "Estado cita",
    "Operaciones",
  ]);

  return (
    <>
      {loading && <p className="p text-center">Cargando datos....</p>}
      {!loading && data && (
        <TableAppointments
          heads={heads}
          rows={rows}
          handleUpdate={handleUpdate}
        ></TableAppointments>
      )}

      {!loading && !data && (
        <h1 className="text-center">Error al cargar la informacion.</h1>
      )}
    </>
  );
};
