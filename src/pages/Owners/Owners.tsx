import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
const handleApiRequest: any = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/titulares-mascota`, {
    method: HttpMethods.GET,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data: any) => {
      return data;
    })
    .catch((error) => {
      // Maneja los errores
      console.error("ACA Error:", error.message);
    });
};
function Owners() {
  const [listOfOwners, setListOfOwners] = useState<IOwner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Llama fetchData con los datos que necesites enviar
  useEffect(() => {
    handleApiRequest()
      .then((result: any) => {
        setListOfOwners(result.data);
      })
      .catch(() => {
        throw new Error("Error en hook");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading && <p>...Cargando datos</p>}
      {listOfOwners && <TableOwners listOfOwners={listOfOwners} />}
    </>
  );
}

export default Owners;
