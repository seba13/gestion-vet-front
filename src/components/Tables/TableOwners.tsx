import { useState } from "react";
import Modal from "../Modal/Modal";
import { IOwner } from "../../interfaces/Owners";
function TableOwners({ listOfOwners }: any) {
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar la visibilidad del modal

  const data = listOfOwners.map((owner: IOwner, index: number) => {
    return (
      <tr key={index} style={{ textTransform: "capitalize" }}>
        <td>
          {owner.rut}-{owner.dv}
        </td>
        <td>
          {owner.nombre} {owner.apellidoPaterno} {owner.apellidoMaterno}
        </td>
        <td>{owner.direccion}</td>
        <td>{owner.telefono}</td>
        <td>{owner.email}</td>
        <td>{owner.sexo === "m" ? "femenino" : "masculino"}</td>
        <td>{owner.fechaNacimiento}</td>
        <td className="d-flex justify-content-center">
          <button
            className={`btn btn-success m-1`}
            onClick={() => handleOpenModal()} // Pasamos el id de la mascota al hacer clic
          >
            📋Ver mascotas
          </button>
        </td>
      </tr>
    );
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="table-responsive ">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead className="table-light">
                  <tr>
                    <th>RUT</th>
                    <th>Nombre completo</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Correo</th>
                    <th>Genero</th>
                    <th>Fec Nacimiento</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>{data}</tbody>
              </table>
              {
                <Modal
                  showModal={showModal}
                  onClose={handleCloseModal}
                  modalContent={{
                    title: "Lista de mascotas",
                    body: "perrito, un gatito, un cocodrilo",
                  }}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableOwners;
