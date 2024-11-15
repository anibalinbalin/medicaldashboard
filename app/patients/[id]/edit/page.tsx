"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { BasicDemographics } from "../../../../components/forms/BasicDemographics";
import { MedicalInformation } from "../../../../components/forms/MedicalInformation";
import { PrivacyConsent } from "../../../../components/forms/PrivacyConsent";
import {
  PatientData,
  Allergy,
  Medication,
  Surgery,
  Insurance,
  Pharmacy,
} from "../../../../components/forms/types";

export default function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [formData, setFormData] = useState<PatientData>({
    // Basic Demographics (Spanish)
    fecha: "",
    nombreApellido: "",
    fechaNacimiento: "",
    edad: 0,
    estadoCivil: "",
    nacionalidad: "",
    documento: "",
    direccion: "",
    localidad: "",
    celular: "",
    mail: "",

    // Rest of the form fields
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    address: {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
    },
    preferredContactMethod: "",
    bestTimeToContact: "",
    communicationPreferences: [],
    primaryEmergencyContact: {
      fullName: "",
      relationship: "",
      phoneNumber: "",
      address: "",
    },
    secondaryEmergencyContact: {
      fullName: "",
      relationship: "",
      phoneNumber: "",
      address: "",
    },
    primaryInsurance: {
      provider: "",
      policyNumber: "",
      groupNumber: "",
      policyHolderName: "",
      relationshipToPatient: "",
      policyHolderDOB: "",
    },
    bloodType: "",
    height: "",
    weight: "",
    primaryCarePhysician: "",
    referringPhysician: "",
    allergies: [],
    currentMedications: [],
    chronicConditions: [],
    previousSurgeries: [],
    immunizationHistory: [],
    familyMedicalHistory: [],
    appointmentHistory: [],
    lastVisitDate: "",
    nextScheduledVisit: "",
    preferredAppointmentTimes: [],
    preferredPaymentMethod: "",
    defaultPaymentCard: "",
    outstandingBalance: 0,
    financialAssistanceStatus: "",
    patientId: "",
    registrationDate: "",
    lastUpdatedDate: "",
    chartNumber: "",
    medicalRecordNumber: "",
    patientPortalStatus: "",
    preferredPharmacy: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    hipaaConsentStatus: false,
    releaseOfInformation: false,
    advanceDirectivesStatus: false,
    researchParticipation: false,
    photoVideoConsent: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const updateFormData = (path: string, value: any) => {
    setFormData((prevData: PatientData) => {
      const newData = { ...prevData };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, item: any) => {
    setFormData((prevData: PatientData) => {
      const newData = { ...prevData };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = [...current[lastKey], item];
      return newData;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    setFormData((prevData: PatientData) => {
      const newData = { ...prevData };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      current[lastKey] = current[lastKey].filter(
        (_: any, i: number) => i !== index
      );
      return newData;
    });
  };

  useEffect(() => {
    async function fetchPatient() {
      try {
        // Fetch patient data
        const { data: patientData, error: patientError } = await supabase
          .from("patients")
          .select("*")
          .eq("id", id)
          .single();

        if (patientError) throw patientError;

        // Fetch emergency contacts
        const { data: emergencyContactsData, error: emergencyError } =
          await supabase
            .from("emergency_contacts")
            .select("*")
            .eq("patient_id", id);

        if (emergencyError) throw emergencyError;

        const primaryContact = emergencyContactsData?.find((c) => c.is_primary);
        const secondaryContact = emergencyContactsData?.find(
          (c) => !c.is_primary
        );

        // Parse complex types from JSON strings if necessary
        const allergies = Array.isArray(patientData.allergies)
          ? patientData.allergies.map((a: string): Allergy => {
              try {
                return JSON.parse(a) as Allergy;
              } catch {
                return { allergen: a, reactionType: "", severity: "" };
              }
            })
          : [];

        const medications = Array.isArray(patientData.medications)
          ? patientData.medications.map((m: string): Medication => {
              try {
                return JSON.parse(m) as Medication;
              } catch {
                return {
                  name: m,
                  dosage: "",
                  frequency: "",
                  prescribingPhysician: "",
                };
              }
            })
          : [];

        const surgeries = Array.isArray(patientData.previous_surgeries)
          ? patientData.previous_surgeries.map((s: string): Surgery => {
              try {
                return JSON.parse(s) as Surgery;
              } catch {
                return { procedureType: s, date: "", performingPhysician: "" };
              }
            })
          : [];

        // Map database fields to form data
        setFormData({
          ...formData,
          // Basic Demographics (Spanish)
          fecha: patientData.fecha || "",
          nombreApellido: patientData.nombre_apellido || "",
          fechaNacimiento: patientData.fecha_nacimiento || "",
          edad: patientData.edad || 0,
          estadoCivil: patientData.estado_civil || "",
          nacionalidad: patientData.nacionalidad || "",
          documento: patientData.documento || "",
          direccion: patientData.direccion || "",
          localidad: patientData.localidad || "",
          celular: patientData.celular || "",
          mail: patientData.mail || "",

          // Rest of the form fields...
          email: patientData.email || "",
          primaryPhone: patientData.phone || "",
          address: {
            street: patientData.address || "",
            city: patientData.city || "",
            state: patientData.state || "",
            zipCode: patientData.zip_code || "",
            apartment: "",
          },

          primaryInsurance: {
            provider: patientData.insurance_provider || "",
            policyNumber: patientData.policy_number || "",
            groupNumber: patientData.group_number || "",
            policyHolderName: patientData.primary_insured || "",
            relationshipToPatient: patientData.relationship_to_primary || "",
            policyHolderDOB: "",
          },

          primaryCarePhysician: patientData.primary_care_physician || "",
          allergies,
          currentMedications: medications,
          previousSurgeries: surgeries,
          chronicConditions: patientData.medical_conditions || [],

          primaryEmergencyContact: primaryContact
            ? {
                fullName: primaryContact.name || "",
                relationship: primaryContact.relationship || "",
                phoneNumber: primaryContact.phone || "",
                address: primaryContact.address || "",
              }
            : formData.primaryEmergencyContact,
          secondaryEmergencyContact: secondaryContact
            ? {
                fullName: secondaryContact.name || "",
                relationship: secondaryContact.relationship || "",
                phoneNumber: secondaryContact.phone || "",
                address: secondaryContact.address || "",
              }
            : formData.secondaryEmergencyContact,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al cargar los datos del paciente"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPatient();
  }, [id, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Convert complex types to JSON strings for storage
      const allergiesJson = formData.allergies.map((a: Allergy) =>
        JSON.stringify(a)
      );
      const medicationsJson = formData.currentMedications.map((m: Medication) =>
        JSON.stringify(m)
      );
      const surgeriesJson = formData.previousSurgeries.map((s: Surgery) =>
        JSON.stringify(s)
      );

      // Update patient record
      const { error: patientError } = await supabase
        .from("patients")
        .update({
          // Basic Demographics (Spanish)
          fecha: formData.fecha,
          nombre_apellido: formData.nombreApellido,
          fecha_nacimiento: formData.fechaNacimiento,
          edad: formData.edad,
          estado_civil: formData.estadoCivil,
          nacionalidad: formData.nacionalidad,
          documento: formData.documento,
          direccion: formData.direccion,
          localidad: formData.localidad,
          celular: formData.celular,
          mail: formData.mail,

          // Rest of the fields...
          email: formData.email,
          phone: formData.primaryPhone,
          address: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zip_code: formData.address.zipCode,

          insurance_provider: formData.primaryInsurance.provider,
          policy_number: formData.primaryInsurance.policyNumber,
          group_number: formData.primaryInsurance.groupNumber,
          primary_insured: formData.primaryInsurance.policyHolderName,
          relationship_to_primary:
            formData.primaryInsurance.relationshipToPatient,

          allergies: allergiesJson,
          medications: medicationsJson,
          medical_conditions: formData.chronicConditions,
          previous_surgeries: surgeriesJson,
          primary_care_physician: formData.primaryCarePhysician,
        })
        .eq("id", id);

      if (patientError) throw patientError;

      // Update emergency contacts
      if (formData.primaryEmergencyContact) {
        const { error: primaryContactError } = await supabase
          .from("emergency_contacts")
          .upsert({
            patient_id: id,
            is_primary: true,
            name: formData.primaryEmergencyContact.fullName,
            relationship: formData.primaryEmergencyContact.relationship,
            phone: formData.primaryEmergencyContact.phoneNumber,
            address: formData.primaryEmergencyContact.address,
          });

        if (primaryContactError) throw primaryContactError;
      }

      if (formData.secondaryEmergencyContact) {
        const { error: secondaryContactError } = await supabase
          .from("emergency_contacts")
          .upsert({
            patient_id: id,
            is_primary: false,
            name: formData.secondaryEmergencyContact.fullName,
            relationship: formData.secondaryEmergencyContact.relationship,
            phone: formData.secondaryEmergencyContact.phoneNumber,
            address: formData.secondaryEmergencyContact.address,
          });

        if (secondaryContactError) throw secondaryContactError;
      }

      setSuccess(true);
      router.push("/patients");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar los cambios"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Editar Información del Paciente
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          ¡La información del paciente se actualizó exitosamente!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <BasicDemographics
              formData={formData}
              updateFormData={updateFormData}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </Card>
          <Card>
            <MedicalInformation
              formData={formData}
              updateFormData={updateFormData}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </Card>
          <Card>
            <PrivacyConsent
              formData={formData}
              updateFormData={updateFormData}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </Card>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/patients")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
