import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
import useFetch from "../../hooks/useFetch";

function Owners() {
  const [ownersData, setOwnersData] = useState<IOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState(""); // Guarda el propietario seleccionado para mostrar en el modal
  const { error, loading, fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/titulares-mascota`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  useEffect(() => {
    fetchData().then((result) => {
      setOwnersData(result.data);
    });
  }, []);

  return (
    <>
      {loading && <p className="p text-center">Cargando datos....</p>}
      {!loading && !ownersData && (
        <p className="p text-center">Al parecer hubo un error..</p>
      )}
      {!loading && !error && ownersData && <TableOwners owners={ownersData} />}
    </>
  );
}

export default Owners;
