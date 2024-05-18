import { useEffect, useState } from "react";
import TableOwners from "../../components/Tables/TableOwners";
import { HttpMethods } from "../../interfaces/httpMethods";
import { IOwner } from "../../interfaces/Owners";
import useFetch from "../../hooks/useFetch";
import ModalListPets from "../../components/Forms/Lists/ListPets";
import { PetList } from "../../interfaces/Pet";
import FormUpdateClient from "../../components/Forms/FormUpdateClient";

function Owners() {
  const [ownersData, setOwnersData] = useState<IOwner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState(""); // Guarda el propietario seleccionado para mostrar en el modal
  // const [showModal, setShowModal] = useState(false);
  // const [modalContent, setModalContent] = useState<PetList>({ pets: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModalEditOwner, setShowModalEditOwner] = useState({
    show: false,
    content: {},
  });
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

  return (
    <>{!loading && !error && data && <TableOwners owners={ownersData} />}</>
  );
}

export default Owners;
