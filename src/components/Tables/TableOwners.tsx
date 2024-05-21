import { useState } from "react";

import ModalComponent, { IModalContent } from "../Modal/ModalComponent";
import { IOwner } from "../../interfaces/Owners";
import ListPets from "../Forms/Lists/ListPets";
import { HttpMethods } from "../../interfaces/httpMethods";
import { NavLink } from "react-router-dom";
import FormUpdateClient from "../Forms/FormUpdateClient";
import TablePets from "./TablePets";

function TableOwners({ owners }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(owners!.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOwners = owners!.slice(indexOfFirstItem, indexOfLastItem);
  const [showModal, setShowModal] = useState({
    show: false,
    content: {},
  });
  const [isEditing, setIsEditing] = useState(false);

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
  const handlerModalFormUpdate = (event: any) => {
    // para cerrar el modal
    setIsEditing(!isEditing);
    setShowModal({ show: event, content: {} });
  };
  const handleOpenModal = async (type: any, idParam: IOwner) => {
    console.log("opening modal: ", type);
    if (type === "editProfile") {
      setIsEditing(!isEditing);
      const filter = currentOwners.filter((owner: IOwner) => {
        return owner.idPersona === idParam.idPersona;
      });
      console.log(filter);
      setShowModal({
        show: !showModal.show,
        content: {
          title: `Editando perfil`,
          body: (
            <FormUpdateClient
              actualOwner={filter}
              showModal={handlerModalFormUpdate}
            />
          ),
        },
      });
    }
    if (type === "petList") {
      const results = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/titular-mascota/rut/${idParam.rut.toString()}/mascotas`,
        {
          method: HttpMethods.GET,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        })
        .catch((error) => {
          console.error("ERROR EN: ", error.message);
        });
      setShowModal({
        show: !showModal.show,
        content: {
          title: "Lista de mascotas",
          body:
            results.data.length > 0 ? (
              // <ListPets list={results.data} />
              <TablePets pets={results.data}></TablePets>
            ) : (
              <div className="text-center">
                <p>Este dueño no cuenta con ninguna mascota registrada.</p>
                <NavLink to={"/nueva-mascota"}>
                  {" "}
                  Ir a Registrar nueva mascota ✅
                </NavLink>
              </div>
            ),
        },
      });
    }
  };
  const handleCloseModal = () => {
    setShowModal({ show: false, content: {} });
  };

  const parseDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const dataTable = currentOwners.map((owner: IOwner, index: number) => (
    <tr key={index} style={{ textTransform: "capitalize" }}>
      <td>
        {owner.rut}-{owner.dv}
      </td>
      <td>{owner.nombre}</td>
      <td>{owner.apellidoPaterno}</td>
      <td>{owner.apellidoMaterno}</td>
      <td>{parseDate(owner.fechaNacimiento)}</td>
      <td>{owner.telefono}</td>
      <td>{owner.sexo}</td>
      <td>{owner.email}</td>
      <td>{owner.direccion}</td>
      <td className="d-flex justify-content-center">
        <button
          className={`btn btn-primary m-1`}
          onClick={() => handleOpenModal("petList", owner)}
        >
          Ver mascotas📋
        </button>
        <button
          className={`btn btn-primary m-1`}
          onClick={() => handleOpenModal("editProfile", owner)}
        >
          Editar✏️
        </button>
      </td>
    </tr>
  ));

  const paginationButtons = (
    <div className={`d-flex col justify-content-center mt-3`}>
      <button
        className="btn btn-primary"
        onClick={handleClickPrevPage}
        disabled={currentPage === 1 || !owners!.length}
      >
        Anterior
      </button>
      {generatePaginationButtons()}
      <button
        className="btn btn-primary"
        onClick={handleClickNextPage}
        disabled={currentPage === totalPages || !owners!.length}
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
                  <th>RUT</th>
                  <th>Nombres</th>
                  <th>Paterno</th>
                  <th>Materno</th>
                  <th>Fecha nacimiento</th>
                  <th>Telefono</th>
                  <th>Sexo</th>
                  <th>Correo</th>
                  <th>Direccion</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>{owners!.length ? dataTable : emptyTable}</tbody>
            </table>
          </div>
        </div>
      </div>
      {paginationButtons}
      {showModal.show && (
        <ModalComponent
          showModal={showModal.show}
          onClose={handleCloseModal}
          modalContent={showModal.content as IModalContent}
        />
      )}
    </div>
  );
}

export default TableOwners;
