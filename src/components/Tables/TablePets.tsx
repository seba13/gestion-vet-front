import { useState } from "react";
import { Pet, PetList } from "../../interfaces/Pet";
import FormUpdatePet from "../Forms/FormUpdatePet";
import PetProfileModal from "../PetProfileModal/PetProfileModal";
import ModalComponent from "../Modal/ModalComponent";
import { NavLink } from "react-router-dom";
import { title } from "process";
import { FormNewTreatment } from "../Forms/FormNewPrescription";

function TablePets({ pets }: PetList) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pets!.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPets = pets!.slice(indexOfFirstItem, indexOfLastItem);
  const [showModalPetList, setShowModalPetList] = useState<{
    show: boolean;
    content: {
      title: string;
      body: React.ReactNode;
    };
  }>({ show: false, content: { title: "", body: null } });
  const [showPetProfileModal, setShowPetProfileModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModalPrescription, setShowModalPrescription] = useState(false);

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

  const handlerModalFormUpdate = (event: boolean) => {
    // para cerrar el modal
    setIsEditing(!isEditing);
    setShowModalPetList({ show: event, content: { title: "", body: null } });
  };

  const handleOpenModal = (type: string, idParam?: string) => {
    console.log("opening modal: ", type);
    if (type === "edit") {
      setIsEditing(!isEditing);
      const filter = currentPets.filter((pet: Pet) => {
        return pet.idMascota.toString() === idParam;
      });

      setShowModalPetList({
        show: true,
        content: {
          title: `Editando mascota: ${filter[0].nombreMascota}`,
          body: (
            <FormUpdatePet
              actualPet={filter}
              showModal={handlerModalFormUpdate}
            />
          ),
        },
      });
    }

    if (type === "profile") {
      setSelectedPetId(idParam || "");
      setShowPetProfileModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModalPetList({ show: false, content: { title: "", body: null } });
  };

  const dataTable = currentPets.map((pet: Pet, index) => (
    <tr key={index} style={{ textTransform: "capitalize" }}>
      <td>{pet.nombreMascota}</td>
      <td>{pet.raza || "No definido"}</td>

      <td className="d-flex justify-content-center">
        <button
          className={`btn btn-success m-1`}
          onClick={() => handleOpenModal("profile", pet.idMascota.toString())}
        >
          📋
        </button>
        <button
          className={`btn btn-warning m-1`}
          onClick={() => handleOpenModal("edit", pet.idMascota.toString())}
        >
          ✏️
        </button>

        <NavLink
          className={"btn btn-primary m-1"}
          to={`/ficha-clinica/registrar/${pet.idMascota.toString()}`}
        >
          📝
        </NavLink>
      </td>
    </tr>
  ));

  const paginationButtons = (
    <div className={`d-flex col justify-content-center mt-3`}>
      <button
        className="btn btn-primary"
        onClick={handleClickPrevPage}
        disabled={currentPage === 1 || !pets!.length}
      >
        Anterior
      </button>
      {generatePaginationButtons()}
      <button
        className="btn btn-primary"
        onClick={handleClickNextPage}
        disabled={currentPage === totalPages || !pets!.length}
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
                  <th>Nombre</th>
                  <th>Raza</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>{pets!.length ? dataTable : emptyTable}</tbody>
            </table>
          </div>
        </div>
      </div>
      {paginationButtons}
      {showModalPetList.show && (
        <ModalComponent
          showModal={showModalPetList.show}
          onClose={handleCloseModal}
          modalContent={showModalPetList.content}
        />
      )}
      {selectedPetId && (
        <PetProfileModal
          idMascota={selectedPetId}
          show={showPetProfileModal}
          onHide={() => setShowPetProfileModal(false)}
        />
      )}
    </div>
  );
}

export default TablePets;
