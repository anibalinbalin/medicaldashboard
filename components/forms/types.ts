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

export interface AestheticFamilyHistory {
  hasSurgeries: boolean;
  hasPathologicalScarring: boolean;
  hasAtopy: boolean;
  otherSkinConditions: string;
}

export interface PatientData {
  // Basic Demographics
  fecha: string;
  nombreApellido: string;
  fechaNacimiento: string;
  edad: number;
  estadoCivil: string;
  nacionalidad: string;
  documento: string;
  direccion: string;
  localidad: string;
  celular: string;
  mail: string;

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
  motivoConsulta: string;
  antecedentesFamiliares: string;
  antecedentesFamiliaresEsteticos: AestheticFamilyHistory;
  antecedentesPersonales: string;
  peso: string;
  altura: string;
  imc: string;
  grupoSanguineo: string;
  heridasCicatrices: string;
  ultimaVacunaAntitetanica: string;
  antecedentesPsiquiatricos: string;
  alergiasHipersensibilidad: string;
  medicacionActual: string;
  productosFarmacoesteticos: string;
  bloodType: string;
  height: string;
  weight: string;
  primaryCarePhysician: string;
  referringPhysician: string;

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

  // Aesthetic Family History
  hasSurgeries: boolean;
  cirugiasNotes: string;
  hasPathologicalScarring: boolean;
  pathologicalScarringNotes: string;
  hasAtopias: boolean;
  atopiasNotes: string;

  // Heridas y Cicatrices
  hasScarsOrWounds: boolean;
  scarsOrWoundsNotes: string;

  // Psychiatric History
  hasPsychiatricHistory: boolean;
  antecedentesPsiquiatricos: string;

  // Personal Medical History
  hasPersonalAntecedents: boolean;
  antecedentesPersonales: string;

  // Allergies
  alergiasHipersensibilidad: string;

  // Current Medication
  hasCurrentMedication: boolean;
  medicacionActual: string;

  // Pharmaceutical Products
  hasPharmaceuticalProducts: boolean;
  productosFarmacoesteticos: string;

  // Habits
  isSmoker: boolean;
  smokingDetails?: string;
  consumesAlcohol: boolean;
  alcoholDetails?: string;
  doesExercise: boolean;
  exerciseDetails?: string;
  hasSleepIssues: boolean;
  sleepDetails?: string;
  hasSpecialDiet: boolean;
  dietDetails?: string;

  // Sleep Quality
  sleepQuality: boolean;
  sleepQualityNotes?: string;
  difficultyFallingAsleep: boolean;
  timeToFallAsleep?: string;
  wakesUpAtNight: boolean;
  timesWakingUp?: string;
  wakesUpEarly: boolean;
  wakesUpEarlyNotes?: string;
  sleepsDuringInactivity: boolean;
  sleepsDuringInactivityNotes?: string;
  sleepsDuringActivity: boolean;
  sleepsDuringActivityNotes?: string;

  // Aesthetic Treatments
  hasAestheticTreatments: boolean;
  wasSatisfied?: boolean;
  treatmentDate?: string;
  treatmentLocation?: string;
  treatmentProposal?: string;

  // Laboratory and Complementary Studies
  hasLabStudies: boolean;
  labStudiesNotes?: string;

  // Evolution
  hasEvolution: boolean;
  evolutionNotes?: string;
}

export interface FormSectionProps {
  formData: PatientData;
  updateFormData: (path: string, value: any) => void;
  addArrayItem?: (path: string, item: any) => void;
  removeArrayItem?: (path: string, index: number) => void;
}

export interface MedicalInformationData {
  // ... other fields
  aestheticAntecedents: string[];  // Add this field
  grupoSanguineo: string;
}

export const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export type BloodType = typeof BLOOD_TYPES[number];

export const medicalInformationSchema = z.object({
  // ... other fields
  hasScarsOrWounds: z.boolean().default(false),
  scarsOrWoundsNotes: z.string().optional(),
  // ... other fields
});
