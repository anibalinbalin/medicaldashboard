import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";

export function InsuranceInformation({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Insurance Information
      </h2>
      <div className="space-y-6">
        {/* Primary Insurance */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Primary Insurance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Insurance Provider"
              type="text"
              required
              value={formData.primaryInsurance.provider}
              onChange={(e) =>
                updateFormData("primaryInsurance.provider", e.target.value)
              }
            />
            <FormField
              label="Policy Number"
              type="text"
              required
              value={formData.primaryInsurance.policyNumber}
              onChange={(e) =>
                updateFormData("primaryInsurance.policyNumber", e.target.value)
              }
            />
            <FormField
              label="Group Number"
              type="text"
              value={formData.primaryInsurance.groupNumber}
              onChange={(e) =>
                updateFormData("primaryInsurance.groupNumber", e.target.value)
              }
            />
            <FormField
              label="Policy Holder Name"
              type="text"
              required
              value={formData.primaryInsurance.policyHolderName}
              onChange={(e) =>
                updateFormData(
                  "primaryInsurance.policyHolderName",
                  e.target.value
                )
              }
            />
            <FormField
              label="Relationship to Patient"
              type="text"
              required
              value={formData.primaryInsurance.relationshipToPatient}
              onChange={(e) =>
                updateFormData(
                  "primaryInsurance.relationshipToPatient",
                  e.target.value
                )
              }
            />
            <FormField
              label="Policy Holder DOB"
              type="date"
              required
              value={formData.primaryInsurance.policyHolderDOB}
              onChange={(e) =>
                updateFormData(
                  "primaryInsurance.policyHolderDOB",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Secondary Insurance (Optional) */}
        {formData.secondaryInsurance && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Secondary Insurance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Insurance Provider"
                type="text"
                value={formData.secondaryInsurance.provider}
                onChange={(e) =>
                  updateFormData("secondaryInsurance.provider", e.target.value)
                }
              />
              <FormField
                label="Policy Number"
                type="text"
                value={formData.secondaryInsurance.policyNumber}
                onChange={(e) =>
                  updateFormData(
                    "secondaryInsurance.policyNumber",
                    e.target.value
                  )
                }
              />
              <FormField
                label="Group Number"
                type="text"
                value={formData.secondaryInsurance.groupNumber}
                onChange={(e) =>
                  updateFormData(
                    "secondaryInsurance.groupNumber",
                    e.target.value
                  )
                }
              />
              <FormField
                label="Policy Holder Name"
                type="text"
                value={formData.secondaryInsurance.policyHolderName}
                onChange={(e) =>
                  updateFormData(
                    "secondaryInsurance.policyHolderName",
                    e.target.value
                  )
                }
              />
              <FormField
                label="Relationship to Patient"
                type="text"
                value={formData.secondaryInsurance.relationshipToPatient}
                onChange={(e) =>
                  updateFormData(
                    "secondaryInsurance.relationshipToPatient",
                    e.target.value
                  )
                }
              />
              <FormField
                label="Policy Holder DOB"
                type="date"
                value={formData.secondaryInsurance.policyHolderDOB}
                onChange={(e) =>
                  updateFormData(
                    "secondaryInsurance.policyHolderDOB",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        )}

        {/* Workers Compensation (Optional) */}
        {formData.workersComp && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Workers Compensation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Case Number"
                type="text"
                value={formData.workersComp.caseNumber}
                onChange={(e) =>
                  updateFormData("workersComp.caseNumber", e.target.value)
                }
              />
              <FormField
                label="Date of Injury"
                type="date"
                value={formData.workersComp.dateOfInjury}
                onChange={(e) =>
                  updateFormData("workersComp.dateOfInjury", e.target.value)
                }
              />
              <FormField
                label="Employer Information"
                type="text"
                value={formData.workersComp.employerInfo}
                onChange={(e) =>
                  updateFormData("workersComp.employerInfo", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
