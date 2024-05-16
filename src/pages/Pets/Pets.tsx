import { useState, useEffect } from "react";
import TablePets from "../../components/Tables/TablePets";
import useFetch from "../../hooks/useFetch";
import { Pet } from "../../interfaces/Pet";
import { HttpMethods } from "../../interfaces/httpMethods";

function Pets() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/mascotas`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const [petsData, setPetsData] = useState<Pet[]>([]);

  useEffect(() => {
    if (data && data.data) {
      console.log(data);
      setPetsData(data.data);
    }
    if (error) {
      console.error("Error: ", error);
    }
  }, [loading, error]);

  return (
    <>
      {loading && <p>Cargando datos...</p>}
      {error && <p>Error al cargar la información: {error}</p>}
      {!error && !loading && <TablePets pets={petsData} />}
    </>
  );
}

export default Pets;
