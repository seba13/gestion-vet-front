import { useState, useEffect } from "react";
import TablePets from "../../components/Tables/TablePets";
import data from "../../example.json";
import { Pet } from "../../interfaces/Pet";
import InputSearch from "../../components/InputSearch/InputSearch";
function Pets() {
  const [listOfPets, setListOfPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  useEffect(() => {
    setListOfPets(data.mascotas as Pet[]);
    setFilteredPets(data.mascotas as Pet[]);
  }, []);

  const handleReturnValue = (searchValue: string) => {
    if (searchValue === "") {
      setFilteredPets(listOfPets);
    } else {
      const filtered = listOfPets.filter((pet) =>
        pet.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPets(filtered);
    }
  };
  return (
    <>
      <TablePets listOfPets={filteredPets} />
    </>
  );
}

export default Pets;
