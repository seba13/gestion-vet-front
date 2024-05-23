import { useEffect, useState } from "react";
import { IPrescription } from "../../interfaces/Prescription";
import useFetch from "../../hooks/useFetch";
import ModalComponent from "../Modal/ModalComponent";
import { FormUpdatePrescription } from "../Forms/FormUpdatePrescription";

export const TablePrescriptions = ({
  idFichaIngreso,
}: {
  idFichaIngreso: string;
}) => {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState<IPrescription[]>([]);
  const [filteredPrescription, setFilteredPrescription] =
    useState<IPrescription>({} as IPrescription);
  const [heads, setHeads] = useState([
    "N° Receta",
    "Descripcion",
    "Vigencia",
    "Retencion",
    "Operaciones",
  ]);
  const { fetchData, loading } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/recetas-mascota/ficha-ingreso/${idFichaIngreso}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const onclickEditButton = (row: IPrescription) => {
    setShow(!show);
    setFilteredPrescription(row);
  };
  useEffect(() => {
    if (idFichaIngreso) {
      fetchData().then((results) => {
        console.log(results);
        setRows(results.data);
      });
    }
  }, [idFichaIngreso, loading]);

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
                {rows ? (
                  rows.map((row: IPrescription) => (
                    <tr key={row.idReceta}>
                      <td>{row.idReceta?.split("-")}</td>
                      <td>{row.descripcion}</td>
                      <td>{row.vigencia}</td>
                      <td
                        className={
                          row.retieneReceta === 1 ? "bg-warning" : "bg-success"
                        }
                      >
                        {row.retieneReceta === 1 ? "Retenida" : "Liberada"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => onclickEditButton(row)}
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>Cargando datos...</td>
                  </tr>
                )}
              </tbody>
            </table>
            {show && (
              <ModalComponent
                showModal={show}
                onClose={() => setShow(false)}
                modalContent={{
                  title: "Editar receta✏️🧾",
                  body: (
                    <>
                      <FormUpdatePrescription
                        prescription={filteredPrescription}
                        formSaved={() => {
                          setTimeout(() => {
                            setShow(false);
                          }, 2000);
                        }}
                      />
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
