"use client";

import { PatientRegistrationForm } from "@/components/PatientRegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Patient Registration</h1>
      <PatientRegistrationForm />
    </div>
  );
}
