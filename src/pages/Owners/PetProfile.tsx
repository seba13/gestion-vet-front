import { useParams } from "react-router-dom";
import TablePets from "../../components/Tables/TablePets";
import { useEffect, useState } from "react";
import { Pet } from "../../interfaces/Pet";

// Mueve la declaración de función handleFetch fuera del componente
const handleFetch = async (parametro) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/mascota/${parametro}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("error en: ", error.message);
  }
};
const PetProfile = () => {
  const { idMascota = "" } = useParams();
  const [petInformation, setPetInformation] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await handleFetch(idMascota);
      setPetInformation([response.data]);
      console.log("pet info: ", petInformation);
      setIsLoading(false);
    };

    fetchData();
  }, [idMascota]);

  return (
    <>
      {isLoading && <p className="p text-center">Cargando datos....</p>}
      {!isLoading && !petInformation && (
        <p className="p text-center">Al parecer hubo un error..</p>
      )}
      {!isLoading && petInformation && <TablePets pets={petInformation} />}
    </>
  );
};

export default PetProfile;
