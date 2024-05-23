import { useState } from "react";
import { IPrescription } from "../../interfaces/Prescription";
import useFetch from "../../hooks/useFetch";

export const TablePrescriptions = () => {
  const [rows, setRows] = useState<IPrescription[]>([]);
  const [heads, setHeads] = useState(["1", "2", "2", "2"]);
  const { fetchData } = useFetch(`${import.meta.env.API_VITE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center ">
              <thead className="table-light">
                <tr>
                  {heads.map((head: string, index: number) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((row: IPrescription) => (
                    <tr key={row.idReceta}>
                      <td>1</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>Cargando datos...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
