import { useEffect, useState } from "react";
import { ITable } from "../../interfaces/Table";
import { Tratamiento } from "../../interfaces/Tratamiento";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { parseDate } from "../../utils/utils";
import ModalComponent from "../Modal/ModalComponent";

export const TableTreatments = ({ selectedId }: ITable) => {
  const [show, setShow] = useState(false);
  const { fetchData, loading } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/tratamientos-mascotas/ficha-clinica/${selectedId}`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const [heads] = useState([
    "ID Tratamiento",
    "Tipo",
    "Descripcion",
    "Coste",
    "Fecha",
    "Operaciones",
  ]);
  const [rows, setRows] = useState([]);
  const buttonClickEditTreatment = (row: Tratamiento) => {
    setShow(!show);
    console.log({ row });
  };
  useEffect(() => {
    if (selectedId) {
      fetchData().then((data) => {
        console.log({ data });
        setRows(data.data);
      });
    }
  }, [loading, selectedId]);
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
                  rows.map((row: Tratamiento, index: number) => (
                    <tr key={row.idTratamiento} className="text-center">
                      <td>{index + 1}</td>
                      <td>{row.tipo}</td>
                      <td>{row.descripcion}</td>
                      <td className="text-start">$ {row.costo}</td>
                      <td>{parseDate(row.fecha)}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => buttonClickEditTreatment(row)}
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <b>
                        No existen tratamientos registrados a la ficha
                        medica💊📝.
                      </b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {show && (
              <ModalComponent
                showModal={show}
                onClose={() => setShow(false)}
                modalContent={{
                  title: "Editar tratamiento✏️💊",
                  size: "s",
                  body: (
                    <>
                      <h1>ok</h1>
                    </>
                  ),
                }}
              ></ModalComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
