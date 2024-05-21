import { useState, useEffect } from "react";
import { IAppointment, EstadosCita } from "../../interfaces/Appointment";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";

interface PetCitasModalProps {
  idMascota: string;
}

const fetchAppointments = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/appointments/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const PetCitasModal: React.FC<PetCitasModalProps> = ({ idMascota }) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchAppointments(idMascota);
        setAppointments(response.data);
      } catch (error: any) {
        console.error("Error al cargar las citas: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idMascota]);

  const formatEstadoCita = (estado: EstadosCita) => {
    switch (estado) {
      case EstadosCita.Agendado:
        return "Agendado";
      case EstadosCita.Cancelado:
        return "Cancelado";
      case EstadosCita.Finalizado:
        return "Finalizado";
      default:
        return "Ninguno";
    }
  };

  return (
    <div>
      {isLoading && <p className="text-center">Cargando citas....</p>}
      {!isLoading && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Médico</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.idCitaMedica}>
                <td>
                  {format(new Date(appointment.fechaCitaMedica), "dd/MM/yyyy")}
                </td>
                <td>{appointment.horaCitaMedica}</td>
                <td>{formatEstadoCita(appointment.idEstadoCita)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PetCitasModal;
