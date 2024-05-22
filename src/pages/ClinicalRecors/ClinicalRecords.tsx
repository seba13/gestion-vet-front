import { useEffect, useState } from "react";
import { TableMedicalRecords } from "../../components/Tables/TableMedicalRecords";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";

export const ClinicalRecords = () => {
  const [rows, setRows] = useState<IMedicalRecord[]>([] as IMedicalRecord[]);
  const [heads] = useState([
    "N° Ficha Clinica",
    "ID Mascota",
    "Tipo de atencion",
    "Fecha de atencion",
    "Enfermedades",
    "Peso KG",
    "Observaciones",
    "Operaciones",
  ]);
  const { fetchData, loading, setLoading } = useFetch(
    `${import.meta.env.VITE_API_URL}/fichas-clinicas`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  useEffect(() => {
    fetchData().then((data) => {
      setRows(data.data);
    });
  }, [loading]);
  const handleUpdate = () => {
    setLoading(!loading);
  };
  return (
    <>
      {loading && <p className="text-center">Cargando datos...</p>}{" "}
      {!loading && (
        <TableMedicalRecords
          rows={rows}
          heads={heads}
          handleUpdate={handleUpdate}
        ></TableMedicalRecords>
      )}
    </>
  );
};
