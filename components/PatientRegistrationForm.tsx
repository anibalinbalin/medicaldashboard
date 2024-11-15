"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { PatientData } from "./forms/types";
import { BasicDemographics } from "./forms/BasicDemographics";
import { MedicalInformation } from "./forms/MedicalInformation";
import { PrivacyConsent } from "./forms/PrivacyConsent";
import { createPatient, createEmergencyContact } from "@/lib/supabase";
import { supabase } from "@/lib/supabase-auth";

export function PatientRegistrationForm() {
  const initialFormData = {
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

    // Contact Information
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
    commonAllergies: [] as string[],

    // Add these missing fields
    motivoConsulta: "",
    antecedentesFamiliares: "",
    antecedentesFamiliaresEsteticos: {
      hasSurgeries: false,
      hasPathologicalScarring: false,
      hasAtopy: false,
      otherSkinConditions: ""
    },
    antecedentesPersonales: "",
    peso: "",
    altura: "",
    imc: "",
    grupoSanguineo: "",
    heridasCicatrices: "",
    ultimaVacunaAntitetanica: "",
    antecedentesPsiquiatricos: "",
    alergiasHipersensibilidad: "",
    medicacionActual: "",
    productosFarmacoesteticos: "",
  };

  const [formData, setFormData] = useState<PatientData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Calculate age from fecha de nacimiento
  useEffect(() => {
    if (formData.fechaNacimiento) {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      updateFormData("edad", age);
    }
  }, [formData.fechaNacimiento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Create patient record
      const patient = await createPatient(formData);

      // Create emergency contacts
      if (formData.primaryEmergencyContact.fullName) {
        await createEmergencyContact(
          formData.primaryEmergencyContact,
          patient.id
        );
      }

      if (formData.secondaryEmergencyContact.fullName) {
        await createEmergencyContact(
          formData.secondaryEmergencyContact,
          patient.id
        );
      }

      setSuccess(true);
      // Reset form
      setFormData(initialFormData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar los datos del paciente"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const updateFormData = (path: string, value: any) => {
    setFormData((prev: PatientData) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, item: any) => {
    setFormData((prev: PatientData) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = [
        ...current[keys[keys.length - 1]],
        item,
      ];
      return newData;
    });
  };

  const removeArrayItem = (path: string, index: number) => {
    setFormData((prev: PatientData) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter(
        (_: any, i: number) => i !== index
      );
      return newData;
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="flex justify-end">
        <Button onClick={handleSignOut} variant="outline" className="mb-4">
          Cerrar Sesión
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-md p-4 mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 rounded-md p-4 mb-4">
            ¡Registro de paciente completado exitosamente!
          </div>
        )}

        <BasicDemographics
          formData={formData}
          updateFormData={updateFormData}
        />
        <MedicalInformation
          formData={formData}
          updateFormData={updateFormData}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
        <PrivacyConsent formData={formData} updateFormData={updateFormData} />

        {/* Form submission */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isSubmitting ? "Enviando..." : "Enviar Registro"}
          </Button>
        </div>
      </form>
    </div>
  );
}
