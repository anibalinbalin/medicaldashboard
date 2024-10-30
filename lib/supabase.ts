import {
  PatientData,
  EmergencyContact as FormEmergencyContact,
} from "@/components/forms/types";
import { supabase } from "./supabase-auth";

export interface DatabasePatient {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  ssn: string;
  marital_status: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  insurance_provider: string;
  policy_number: string;
  group_number: string;
  primary_insured: string;
  relationship_to_primary: string;
  allergies: string[];
  medications: string[];
  medical_conditions: string[];
  primary_care_physician: string;
  last_physical_exam: string | null;
}

export interface DatabaseEmergencyContact {
  id: string;
  patient_id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string | null;
  address: string;
  created_at: string;
}

// Helper function to convert form data to database format
function convertFormToPatientData(
  formData: PatientData
): Omit<DatabasePatient, "id" | "created_at"> {
  return {
    first_name: formData.firstName,
    last_name: formData.lastName,
    date_of_birth: formData.dateOfBirth,
    gender: formData.genderIdentity,
    ssn: formData.socialSecurityNumber,
    marital_status: formData.maritalStatus,
    email: formData.email,
    phone: formData.primaryPhone,
    address: `${formData.address.street}${
      formData.address.apartment ? ` ${formData.address.apartment}` : ""
    }`,
    city: formData.address.city,
    state: formData.address.state,
    zip_code: formData.address.zipCode,
    insurance_provider: formData.primaryInsurance.provider,
    policy_number: formData.primaryInsurance.policyNumber,
    group_number: formData.primaryInsurance.groupNumber,
    primary_insured: formData.primaryInsurance.policyHolderName,
    relationship_to_primary: formData.primaryInsurance.relationshipToPatient,
    allergies: formData.allergies.map((a) => a.allergen),
    medications: formData.currentMedications.map((m) => m.name),
    medical_conditions: formData.chronicConditions,
    primary_care_physician: formData.primaryCarePhysician,
    last_physical_exam: null, // This field isn't in the current form
  };
}

// Helper function to convert form emergency contact to database format
function convertFormToEmergencyContact(
  contact: FormEmergencyContact,
  patientId: string
): Omit<DatabaseEmergencyContact, "id" | "created_at"> {
  return {
    patient_id: patientId,
    name: contact.fullName,
    relationship: contact.relationship,
    phone: contact.phoneNumber,
    email: null, // This field isn't in the current form
    address: contact.address,
  };
}

// Database helper functions
export async function createPatient(formData: PatientData) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error("Not authenticated");
  }

  const patientData = convertFormToPatientData(formData);
  const { data, error } = await supabase
    .from("patients")
    .insert([patientData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createEmergencyContact(
  contact: FormEmergencyContact,
  patientId: string
) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error("Not authenticated");
  }

  const contactData = convertFormToEmergencyContact(contact, patientId);
  const { data, error } = await supabase
    .from("emergency_contacts")
    .insert([contactData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPatient(patientId: string) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("patients")
    .select(
      `
      *,
      emergency_contacts (*)
    `
    )
    .eq("id", patientId)
    .single();

  if (error) throw error;
  return data;
}

export async function updatePatient(
  patientId: string,
  updates: Partial<DatabasePatient>
) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("patients")
    .update(updates)
    .eq("id", patientId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePatient(patientId: string) {
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", patientId);

  if (error) throw error;
  return true;
}
