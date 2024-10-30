import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";

export function BasicDemographics({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Basic Demographics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          label="First Name"
          type="text"
          required
          value={formData.firstName}
          onChange={(e) => updateFormData("firstName", e.target.value)}
        />
        <FormField
          label="Middle Name"
          type="text"
          value={formData.middleName}
          onChange={(e) => updateFormData("middleName", e.target.value)}
        />
        <FormField
          label="Last Name"
          type="text"
          required
          value={formData.lastName}
          onChange={(e) => updateFormData("lastName", e.target.value)}
        />
        <FormField
          label="Date of Birth"
          type="date"
          required
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
        />
        <FormField label="Age" type="number" readOnly value={formData.age} />
        <FormField
          label="Gender Identity"
          type="text"
          value={formData.genderIdentity}
          onChange={(e) => updateFormData("genderIdentity", e.target.value)}
        />
        <FormField
          label="Sex Assigned at Birth"
          type="text"
          value={formData.sexAssignedAtBirth}
          onChange={(e) => updateFormData("sexAssignedAtBirth", e.target.value)}
        />
        <FormField
          label="Preferred Name"
          type="text"
          value={formData.preferredName}
          onChange={(e) => updateFormData("preferredName", e.target.value)}
        />
        <FormField
          label="Preferred Pronouns"
          type="text"
          value={formData.preferredPronouns}
          onChange={(e) => updateFormData("preferredPronouns", e.target.value)}
        />
        <FormField
          label="Social Security Number"
          type="password"
          required
          className="bg-transparent"
          value={formData.socialSecurityNumber}
          onChange={(e) =>
            updateFormData("socialSecurityNumber", e.target.value)
          }
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Marital Status
          </label>
          <select
            className="w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm ring-offset-background focus:ring-2 focus:ring-ring"
            value={formData.maritalStatus}
            onChange={(e) => updateFormData("maritalStatus", e.target.value)}
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <FormField
          label="Preferred Language"
          type="text"
          value={formData.preferredLanguage}
          onChange={(e) => updateFormData("preferredLanguage", e.target.value)}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Need Interpreter?
          </label>
          <select
            className="w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm ring-offset-background focus:ring-2 focus:ring-ring"
            value={formData.needInterpreter ? "true" : "false"}
            onChange={(e) =>
              updateFormData("needInterpreter", e.target.value === "true")
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
