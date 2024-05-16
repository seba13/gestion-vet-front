import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
import useFetch from "../../hooks/useFetch";
// const handleApiRequest: any = () => {
//   return fetch(`${import.meta.env.VITE_API_URL}/titulares-mascota`, {
//     method: HttpMethods.GET,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data: any) => {
//       return data;
//     })
//     .catch((error) => {
//       // Maneja los errores
//       console.error("ACA Error:", error.message);
//     });
// };
const defaultProps = {
  method: HttpMethods.GET,
  headers: {
    "Content-Type": "application/json",
  },
};
function Owners() {
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/titulares-mascota`,
    defaultProps
  );
  const [ownersData, setOwnersData] = useState<IOwner[]>([]);

  useEffect(() => {
    if (data && data.data) {
      console.log(data);

      setOwnersData(data.data);
    }
    if (error) {
      console.error("Error: ", error);
    }
  }, [loading, error]);

  return (
    <>
      {loading && !error && <p>...Cargando datos</p>}
      {error && <p>Lo sentimos! hubo un error :( ❌: {error.message}</p>}
      {!loading && !error && data && <TableOwners owners={ownersData} />}
    </>
  );
}

export default Owners;
