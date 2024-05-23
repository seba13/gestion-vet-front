import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

import {
  ClinicalRecord,
  Treatment,
  AdmissionRecord,
  PetHistory,
} from "../../interfaces/PetHistory";
import "./PetHistoryMedModal.css";

interface PetHistoryMedModalProps {
  idMascota: string;
}

const fetchClinicalRecord = async (idMascota: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/ficha-clinica/mascota/${idMascota}`
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar el registro clínico:", error);
    throw error;
  }
};

// OBTENER RECETAS MEDICAS MASCOTA POR IdFichaIngreso
// GET /recetas-mascota/ficha-ingreso/:idFichaIngreso
const fetchRecentPrescriptions = async (idFichaIngreso: string) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/recetas-mascota/ficha-ingreso/${idFichaIngreso}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar las recetas recientes:", error);
    throw error;
  }
};

// OBTENER TRATAMIENTOS MASCOTA POR ID FICHA CLINICA
// GET /tratamientos-mascotas/ficha-clinica/:idFichaClinica
const fetchRecentTreatments = async (idFichaClinica: string) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/tratamientos-mascotas/ficha-clinica/${idFichaClinica}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los tratamientos recientes:", error);
    throw error;
  }
};

// OBTENER FICHA INGRESO POR idFichaIngreso
// GET /ficha-ingreso/:idFichaIngreso
const fetchAdmissionRecords = async (idFichaClinica: string) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/ficha-ingreso/Ficha-clinica/${idFichaClinica}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los registros de admisión:", error);
    throw error;
  }
};

const PetHistoryMedModal: React.FC<PetHistoryMedModalProps> = ({
  idMascota,
}) => {
  const [clinicalRecord, setClinicalRecord] = useState<ClinicalRecord[]>([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState<PetHistory[]>(
    []
  );
  const [recentTreatments, setRecentTreatments] = useState<Treatment[]>([]);
  const [admissionRecords, setAdmissionRecords] = useState<AdmissionRecord[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clinicalRecordData = await fetchClinicalRecord(idMascota);
        setClinicalRecord(clinicalRecordData);

        if (clinicalRecordData.length > 0) {
          const idFichaClinica = clinicalRecordData[0].idFichaClinica;
          const recentPrescriptionsData = await fetchRecentPrescriptions(
            idFichaClinica
          );
          const recentTreatmentsData = await fetchRecentTreatments(
            idFichaClinica
          );
          const admissionRecordsData = await fetchAdmissionRecords(
            idFichaClinica
          );

          setRecentPrescriptions(recentPrescriptionsData);
          setRecentTreatments(recentTreatmentsData);
          setAdmissionRecords(admissionRecordsData);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
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
            <Accordion.Header>Listado Ficha Clínica</Accordion.Header>
            <Accordion.Body>
              {clinicalRecord.map((record, index) => (
                <Accordion key={index} className="mb-3">
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header>
                      Ficha Clínica #{index + 1} - {record.fechaIngreso}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        <strong>Fecha de Ingreso:</strong> {record.fechaIngreso}
                      </p>
                      <p>
                        <strong>Enfermedades:</strong> {record.enfermedades}
                      </p>
                      <p>
                        <strong>Peso:</strong> {record.peso} kg
                      </p>
                      <p>
                        <strong>Observaciones:</strong> {record.observaciones}
                      </p>
                      <p>
                        <strong>Antecedentes:</strong> {record.antecedentes}
                      </p>
                      <p>
                        <strong>ID Ficha Clínica:</strong>{" "}
                        {record.idFichaClinica}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
              <h6>Ficha de Ingreso</h6>
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
        </Accordion>
      )}
    </div>
  );
};

export default PetHistoryMedModal;
