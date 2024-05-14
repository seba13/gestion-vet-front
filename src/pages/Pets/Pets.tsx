// export default Pets;
import { useState, useEffect } from "react";
import TablePets from "../../components/Tables/TablePets";
import useCustomFetch from "../../hooks/useCustomFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { Pet } from "../../interfaces/Pet";
const handleApiRequest: any = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/mascotas`, {
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
function Pets() {
  const [listOfPets, setListOfPets] = useState<Array<Pet>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Llama fetchData con los datos que necesites enviar
  useEffect(() => {
    handleApiRequest()
      .then((result: any) => {
        setListOfPets(result.data);
      })
      .catch(() => {
        throw new Error("Error en hook");
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(listOfPets);
  }, []);
  return (
    <>
      {loading && <div>Cargando...</div>}
      {listOfPets && <TablePets listOfPets={listOfPets}></TablePets>}
    </>
  );
}

export default Pets;
