import { useState } from "react";
import Modal from "../Modal/Modal";

function TableOwners() {
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar la visibilidad del modal

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
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Ultima visita</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>19449843-8</td>
                    <td>fabian niclous</td>
                    <td>victoria 526 nueva aurora</td>
                    <td>956551422</td>
                    <td>fniclous97@gmail.com</td>
                    <td>2024-05-27</td>
                    <td>
                      <button onClick={handleOpenModal}>Ver mascotas🐶</button>
                    </td>
                  </tr>
                </tbody>
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
