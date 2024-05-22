import { useState, useEffect } from "react";
import {
  ClinicalRecord,
  Treatment,
  AdmissionRecord,
  PetHistory,
} from "../../interfaces/PetHistory";
import { IAppointment, EstadosCita } from "../../interfaces/Appointment";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

interface PetHistoryMedModalProps {
  idMascota: string;
}

const fetchClinicalRecord = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/clinical-record/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchRecentPrescriptions = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/recent-prescriptions/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchRecentTreatments = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/recent-treatments/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchAdmissionRecords = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admission-records/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchAppointments = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/appointments/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const PetHistoryMedModal: React.FC<PetHistoryMedModalProps> = ({
  idMascota,
}) => {
  const [clinicalRecord, setClinicalRecord] = useState<ClinicalRecord | null>(
    null
  );
  const [recentPrescriptions, setRecentPrescriptions] = useState<PetHistory[]>(
    []
  );
  const [recentTreatments, setRecentTreatments] = useState<Treatment[]>([]);
  const [admissionRecords, setAdmissionRecords] = useState<AdmissionRecord[]>(
    []
  );
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicalRecordData = await fetchClinicalRecord(idMascota);
        const recentPrescriptionsData = await fetchRecentPrescriptions(
          idMascota
        );
        const recentTreatmentsData = await fetchRecentTreatments(idMascota);
        const admissionRecordsData = await fetchAdmissionRecords(idMascota);
        const appointmentsData = await fetchAppointments(idMascota);

        setClinicalRecord(clinicalRecordData.data);
        setRecentPrescriptions(recentPrescriptionsData.data);
        setRecentTreatments(recentTreatmentsData.data);
        setAdmissionRecords(admissionRecordsData.data);
        setAppointments(appointmentsData.data);
      } catch (error: any) {
        console.error("Error al cargar los datos:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idMascota]);

  return (
    <div>
      {isLoading ? (
        <p className="text-center">Cargando datos...</p>
      ) : (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ficha Clínica</Accordion.Header>
            <Accordion.Body>
              {clinicalRecord && (
                <div>
                  <p>
                    <strong>Fecha de Ingreso:</strong>{" "}
                    {clinicalRecord.fechaIngreso}
                  </p>
                  <p>
                    <strong>Enfermedades:</strong> {clinicalRecord.enfermedades}
                  </p>
                  <p>
                    <strong>Peso:</strong> {clinicalRecord.peso} kg
                  </p>
                  <p>
                    <strong>Observaciones:</strong>{" "}
                    {clinicalRecord.observaciones}
                  </p>
                  <p>
                    <strong>Antecedentes:</strong> {clinicalRecord.antecedentes}
                  </p>
                  <p>
                    <strong>ID Ficha Clínica:</strong>{" "}
                    {clinicalRecord.idFichaClinica}
                  </p>
                </div>
              )}
              <h6>Ficha</h6>
              {admissionRecords.map((record, index) => (
                <div key={index}>
                  <p>
                    <strong>Síntomas:</strong> {record.sintomas}
                  </p>
                  <p>
                    <strong>Antecedentes:</strong> {record.antecedentes}
                  </p>
                  <p>
                    <strong>Diagnóstico:</strong> {record.diagnostico}
                  </p>
                  <p>
                    <strong>Fecha de Ingreso:</strong> {record.fechaIngreso}
                  </p>
                  <p>
                    <strong>Fecha de Alta:</strong> {record.fechaAlta}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {record.observaciones}
                  </p>
                  <p>
                    <strong>Temperatura:</strong> {record.temperatura} °C
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Recetas Recientes</Accordion.Header>
            <Accordion.Body>
              {recentPrescriptions.map((prescription, index) => (
                <div key={index}>
                  <p>
                    <strong>Medicamento:</strong> {prescription.description}
                  </p>
                  <p>
                    <strong>Veterinario:</strong> {prescription.vetName}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {prescription.date}
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Tratamientos Recientes</Accordion.Header>
            <Accordion.Body>
              {recentTreatments.map((treatment, index) => (
                <div key={index}>
                  <p>
                    <strong>Descripción:</strong> {treatment.descripcion}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {treatment.fecha}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {treatment.tipo}
                  </p>
                  <p>
                    <strong>Costo:</strong> ${treatment.costo}
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Fichas de Ingreso</Accordion.Header>
            <Accordion.Body>
              {admissionRecords.map((record, index) => (
                <div key={index}>
                  <p>
                    <strong>Síntomas:</strong> {record.sintomas}
                  </p>
                  <p>
                    <strong>Antecedentes:</strong> {record.antecedentes}
                  </p>
                  <p>
                    <strong>Diagnóstico:</strong> {record.diagnostico}
                  </p>
                  <p>
                    <strong>Fecha de Ingreso:</strong> {record.fechaIngreso}
                  </p>
                  <p>
                    <strong>Fecha de Alta:</strong> {record.fechaAlta}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {record.observaciones}
                  </p>
                  <p>
                    <strong>Temperatura:</strong> {record.temperatura} °C
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default PetHistoryMedModal;
