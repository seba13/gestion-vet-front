import { NavLink } from "react-router-dom";
import { Pet } from "../../../interfaces/Pet";

export const ListPetsMR = ({
  list,
  handleClickSubmit,
}: {
  list: Pet[];
  handleClickSubmit: (idMascota: string) => void;
}) => {
  console.log(list);
  return (
    <>
      <ol className="d-flex flex-column gap-3 align-items-center list-group">
        {list.map((pet: Pet) => (
          <li
            key={pet.idMascota}
            className={`d-flex justify-content-between list-group-item list-group-item-secondary align-items-start`}
          >
            <div className="">
              <p>
                <b>Nombre:</b> {pet.nombreMascota}
                <br />
                <b>Especie:</b> {pet.especie}
              </p>
            </div>

            <div className=" ms-5">
              <button
                className="btn btn-primary w-10"
                onClick={() => handleClickSubmit(pet.idMascota.toString())}
              >
                Ingresar ficha
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
