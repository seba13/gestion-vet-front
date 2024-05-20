import { EstadosCita, IAppointment } from "../../../interfaces/Appointment";

export const ListComponent = ({ data }: any) => {
  return (
    <>
      <ol className="d-flex flex-column gap-3 align-items-center">
        {data.map((appointment: IAppointment, index: number) => (
          <li key={index}>
            <span>Fecha: {appointment.fechaCitaMedica}</span>
            <span>Hora: {appointment.horaCitaMedica}</span>
            <span>Estado Cita: {EstadosCita[appointment.idEstadoCita]}</span>
          </li>
        ))}
      </ol>
    </>
  );
};
