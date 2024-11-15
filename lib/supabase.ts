import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PatientData } from "@/components/forms/types";

const supabase = createClientComponentClient();

export async function createPatient(formData: PatientData) {
  const { data, error } = await supabase
    .from("patients")
    .insert({
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      date_of_birth: formData.dateOfBirth,
      gender: formData.genderIdentity,
      sex_assigned_at_birth: formData.sexAssignedAtBirth,
      preferred_name: formData.preferredName,
      preferred_pronouns: formData.preferredPronouns,
      ssn: formData.socialSecurityNumber,
      marital_status: formData.maritalStatus,
      preferred_language: formData.preferredLanguage,
      need_interpreter: formData.needInterpreter,

      // Contact Information
      email: formData.email,
      phone: formData.primaryPhone,
      secondary_phone: formData.secondaryPhone,
      address: formData.address.street,
      apartment: formData.address.apartment,
      city: formData.address.city,
      state: formData.address.state,
      zip_code: formData.address.zipCode,
      preferred_contact_method: formData.preferredContactMethod,
      best_time_to_contact: formData.bestTimeToContact,
      communication_preferences: formData.communicationPreferences,

      // Insurance Information
      insurance_provider: formData.primaryInsurance.provider,
      policy_number: formData.primaryInsurance.policyNumber,
      group_number: formData.primaryInsurance.groupNumber,
      primary_insured: formData.primaryInsurance.policyHolderName,
      relationship_to_primary: formData.primaryInsurance.relationshipToPatient,
      policy_holder_dob: formData.primaryInsurance.policyHolderDOB,

      // Medical Information
      blood_type: formData.bloodType,
      height: formData.height,
      weight: formData.weight,
      primary_care_physician: formData.primaryCarePhysician,
      referring_physician: formData.referringPhysician,
      allergies: formData.allergies,
      medications: formData.currentMedications,
      chronic_conditions: formData.chronicConditions,
      previous_surgeries: formData.previousSurgeries,
      immunization_history: formData.immunizationHistory,
      family_medical_history: formData.familyMedicalHistory,
      last_visit_date: formData.lastVisitDate,
      next_scheduled_visit: formData.nextScheduledVisit,

      // Additional Information
      chart_number: formData.chartNumber,
      medical_record_number: formData.medicalRecordNumber,
      patient_portal_status: formData.patientPortalStatus,
      preferred_pharmacy: formData.preferredPharmacy,

      // Privacy & Consent
      hipaa_consent_status: formData.hipaaConsentStatus,
      release_of_information: formData.releaseOfInformation,
      advance_directives_status: formData.advanceDirectivesStatus,
      research_participation: formData.researchParticipation,
      photo_video_consent: formData.photoVideoConsent,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createEmergencyContact(
  contact: {
    fullName: string;
    relationship: string;
    phoneNumber: string;
    address: string;
  },
  patientId: string,
  isPrimary: boolean = false
) {
  const { error } = await supabase.from("emergency_contacts").insert({
    patient_id: patientId,
    name: contact.fullName,
    relationship: contact.relationship,
    phone: contact.phoneNumber,
    address: contact.address,
    is_primary: isPrimary,
  });

  if (error) {
    throw error;
  }
}
