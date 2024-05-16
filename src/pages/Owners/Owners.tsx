import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
import useFetch from "../../hooks/useFetch";
import ModalListPets from "../../components/Modal/ModalListPets";
import { PetList } from "../../interfaces/Pet";

function Owners() {
  const [ownersData, setOwnersData] = useState<IOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState(""); // Guarda el propietario seleccionado para mostrar en el modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<PetList>({ pets: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/titulares-mascota`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  useEffect(() => {
    if (data && data.data) {
      setOwnersData(data.data);
    }
    if (error) {
      console.error("Error en hook: ", error);
    }
  }, [loading, error]);

  useEffect(() => {
    const findPets = () => {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/titular-mascota/rut/${selectedOwner}/mascotas`,
        {
          method: HttpMethods.GET,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          console.log(data.data);
          setModalContent(data);
          setShowModal(true);
        })
        .catch((err) => {
          console.error("ERROR: ", err.message);
        });
    };
    if (isLoading) {
      findPets();
    }
  }, [selectedOwner]);
  const onClickButton = (rutOwner: string) => {
    setIsLoading(true);
    setSelectedOwner(rutOwner);
    // setShowModal(true);
  };

  const closeModal = () => {
    // Cierra el modal y restablece el propietario seleccionado
    setShowModal(false);
    setSelectedOwner("");
  };
  return (
    <>
      {!loading && !error && data && (
        <TableOwners owners={ownersData} onClickButton={onClickButton} />
      )}
      {showModal && selectedOwner && (
        <ModalListPets
          showModal={true}
          onClose={closeModal}
          modalContent={modalContent}
        />
      )}
    </>
  );
}

export default Owners;
