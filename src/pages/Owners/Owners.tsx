import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
import useFetch from "../../hooks/useFetch";

function Owners() {
  const [ownersData, setOwnersData] = useState<IOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState(""); // Guarda el propietario seleccionado para mostrar en el modal
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/titulares-mascota`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  useEffect(() => {
    if (data && data.data) {
      setOwnersData(data.data);
    }
    if (error) {
      console.error("Error en hook: ", error);
    }
  }, [loading, error]);

  return (
    <>
      {loading && <p className="p text-center">Cargando datos....</p>}
      {!loading && !data && (
        <p className="p text-center">Al parecer hubo un error..</p>
      )}
      {!loading && !error && data && <TableOwners owners={ownersData} />}
    </>
  );
}

export default Owners;
