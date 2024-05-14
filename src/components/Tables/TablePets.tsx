import { useState } from "react";
import { PetList, Pet } from "../../interfaces/Pet";
import Modal from "../Modal/Modal";

function TablePets({ listOfPets }: PetList) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar la visibilidad del modal
  const itemsPerPage = 10;
  const totalPages = Math.ceil(listOfPets!.length / itemsPerPage);
  // const [petInformation, setPetInformation] = useState<any | null>(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPets = listOfPets!.slice(indexOfFirstItem, indexOfLastItem);

  //
  const emptyTable = (
    <tr>
      <td colSpan={8}>No existen datos</td>
    </tr>
  );
  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClickPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClickPage(i)}
          className={
            currentPage === i ? `btn btn-primary m-1` : "btn btn-secondary m-1"
          }
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handleOpenModal = () => {
    // const [filteredPet] = listOfPets!.filter((pet) => {
    //   return pet.id === petId;
    // });
    // setPetInformation(filteredPet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const data = currentPets.map((pet: Pet) => (
    <tr key={pet.idMascota} style={{ textTransform: "capitalize" }}>
      <td>{pet.idMascota}</td>
      <td>{pet.nombreMascota}</td>
      <td>{pet.edadMascota}</td>
      <td>{pet.especie}</td>
      <td>{pet.raza === "undefined" ? pet.raza : "desconocida"}</td>
      <td>{pet.genero}</td>
      <td className="d-flex justify-content-center">
        <button
          className={`btn btn-success m-1`}
          onClick={() => handleOpenModal()} // Pasamos el id de la mascota al hacer clic
        >
          📋
        </button>
        <button className={`btn btn-warning m-1`}>✏️</button>
        <button className={`btn btn-danger m-1`}>✖️</button>
      </td>
    </tr>
  ));
  const paginationButtons = (
    <div className={`d-flex col justify-content-center mt-3`}>
      <button
        className="btn btn-primary"
        onClick={handleClickPrevPage}
        disabled={currentPage === 1 || !listOfPets!.length}
      >
        Anterior
      </button>
      {generatePaginationButtons()}
      <button
        className="btn btn-primary"
        onClick={handleClickNextPage}
        disabled={currentPage === totalPages || !listOfPets!.length}
      >
        Siguiente
      </button>
    </div>
  );
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>N°ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Genero</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>{listOfPets!.length ? data : emptyTable}</tbody>
            </table>
          </div>
        </div>
      </div>
      {paginationButtons}
      {
        <Modal
          showModal={showModal}
          onClose={handleCloseModal}
          modalContent={{
            title: "Mi modal reutilizable",
            body: "ola ola khaces",
          }}
        />
      }
    </div>
  );
}

export default TablePets;
