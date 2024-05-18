import { NavLink } from "react-router-dom";
import { Pet } from "../../../interfaces/Pet";

function ListPets({ list }: any) {
  console.log(list);
  return (
    <>
      <ol className="d-flex flex-column gap-3 align-items-center">
        {list.map((pet: Pet, index: number) => (
          <li key={index} className="">
            {pet.nombreMascota} - {pet.especie} - {pet.raza}
            <button className="btn btn-primary">
              <NavLink
                to={`${import.meta.env.VITE_APP_BASE_URL}/mascota/ver/${
                  pet.idMascota
                }`}
              >
                👁️
              </NavLink>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default ListPets;
