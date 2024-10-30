export interface EmergencyContact {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  address: string;
}

export interface Insurance {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  policyHolderName: string;
  relationshipToPatient: string;
  policyHolderDOB: string;
}

export interface Address {
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Allergy {
  allergen: string;
  reactionType: string;
  severity: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribingPhysician: string;
}

export interface Surgery {
  procedureType: string;
  date: string;
  performingPhysician: string;
}

export interface Appointment {
  dateTime: string;
  providerSeen: string;
  visitType: string;
  reasonForVisit: string;
}

export interface Pharmacy {
  name: string;
  address: string;
  phoneNumber: string;
}

export interface PatientData {
  // Basic Demographics
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  genderIdentity: string;
  sexAssignedAtBirth: string;
  preferredName: string;
  preferredPronouns: string;
  socialSecurityNumber: string;
  maritalStatus: string;
  preferredLanguage: string;
  needInterpreter: boolean;

  // Contact Information
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  address: Address;
  preferredContactMethod: string;
  bestTimeToContact: string;
  communicationPreferences: string[];

  // Emergency Contacts
  primaryEmergencyContact: EmergencyContact;
  secondaryEmergencyContact: EmergencyContact;

  // Insurance Information
  primaryInsurance: Insurance;
  secondaryInsurance?: Insurance;
  workersComp?: {
    caseNumber: string;
    dateOfInjury: string;
    employerInfo: string;
  };

  // Medical Information
  bloodType: string;
  height: string;
  weight: string;
  primaryCarePhysician: string;
  referringPhysician: string;
  allergies: Allergy[];
  currentMedications: Medication[];
  chronicConditions: string[];
  previousSurgeries: Surgery[];
  immunizationHistory: string[];
  familyMedicalHistory: string[];

  // Visit Information
  appointmentHistory: Appointment[];
  lastVisitDate: string;
  nextScheduledVisit: string;
  preferredAppointmentTimes: string[];

  // Billing Information
  preferredPaymentMethod: string;
  defaultPaymentCard: string;
  billingAddress?: Address;
  outstandingBalance: number;
  financialAssistanceStatus: string;

  // Administrative
  patientId: string;
  registrationDate: string;
  lastUpdatedDate: string;
  chartNumber: string;
  medicalRecordNumber: string;
  patientPortalStatus: string;
  preferredPharmacy: Pharmacy;

  // Privacy & Consent
  hipaaConsentStatus: boolean;
  releaseOfInformation: boolean;
  advanceDirectivesStatus: boolean;
  researchParticipation: boolean;
  photoVideoConsent: boolean;
}

export interface FormSectionProps {
  formData: PatientData;
  updateFormData: (path: string, value: any) => void;
  addArrayItem?: (path: string, item: any) => void;
  removeArrayItem?: (path: string, index: number) => void;
}
