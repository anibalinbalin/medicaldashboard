import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FormSectionProps, Allergy, Medication } from "./types";

export function MedicalInformation({
  formData,
  updateFormData,
  addArrayItem,
  removeArrayItem,
}: FormSectionProps) {
  if (!addArrayItem || !removeArrayItem) return null;

  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Medical Information
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            label="Blood Type"
            type="text"
            value={formData.bloodType}
            onChange={(e) => updateFormData("bloodType", e.target.value)}
          />
          <FormField
            label="Height"
            type="text"
            value={formData.height}
            onChange={(e) => updateFormData("height", e.target.value)}
          />
          <FormField
            label="Weight"
            type="text"
            value={formData.weight}
            onChange={(e) => updateFormData("weight", e.target.value)}
          />
          <FormField
            label="Primary Care Physician"
            type="text"
            value={formData.primaryCarePhysician}
            onChange={(e) =>
              updateFormData("primaryCarePhysician", e.target.value)
            }
          />
          <FormField
            label="Referring Physician"
            type="text"
            value={formData.referringPhysician}
            onChange={(e) =>
              updateFormData("referringPhysician", e.target.value)
            }
          />
        </div>

        {/* Allergies */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Allergies
          </h3>
          {formData.allergies.map((allergy: Allergy, index: number) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <FormField
                label="Allergen"
                type="text"
                value={allergy.allergen}
                onChange={(e) => {
                  const newAllergies = [...formData.allergies];
                  newAllergies[index].allergen = e.target.value;
                  updateFormData("allergies", newAllergies);
                }}
              />
              <FormField
                label="Reaction Type"
                type="text"
                value={allergy.reactionType}
                onChange={(e) => {
                  const newAllergies = [...formData.allergies];
                  newAllergies[index].reactionType = e.target.value;
                  updateFormData("allergies", newAllergies);
                }}
              />
              <div className="flex items-end gap-2">
                <FormField
                  label="Severity"
                  type="text"
                  value={allergy.severity}
                  onChange={(e) => {
                    const newAllergies = [...formData.allergies];
                    newAllergies[index].severity = e.target.value;
                    updateFormData("allergies", newAllergies);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeArrayItem("allergies", index)}
                  className="mb-2"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem("allergies", {
                allergen: "",
                reactionType: "",
                severity: "",
              })
            }
          >
            Add Allergy
          </Button>
        </div>

        {/* Current Medications */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Current Medications
          </h3>
          {formData.currentMedications.map(
            (medication: Medication, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
              >
                <FormField
                  label="Medication Name"
                  type="text"
                  value={medication.name}
                  onChange={(e) => {
                    const newMedications = [...formData.currentMedications];
                    newMedications[index].name = e.target.value;
                    updateFormData("currentMedications", newMedications);
                  }}
                />
                <FormField
                  label="Dosage"
                  type="text"
                  value={medication.dosage}
                  onChange={(e) => {
                    const newMedications = [...formData.currentMedications];
                    newMedications[index].dosage = e.target.value;
                    updateFormData("currentMedications", newMedications);
                  }}
                />
                <FormField
                  label="Frequency"
                  type="text"
                  value={medication.frequency}
                  onChange={(e) => {
                    const newMedications = [...formData.currentMedications];
                    newMedications[index].frequency = e.target.value;
                    updateFormData("currentMedications", newMedications);
                  }}
                />
                <div className="flex items-end gap-2">
                  <FormField
                    label="Prescribing Physician"
                    type="text"
                    value={medication.prescribingPhysician}
                    onChange={(e) => {
                      const newMedications = [...formData.currentMedications];
                      newMedications[index].prescribingPhysician =
                        e.target.value;
                      updateFormData("currentMedications", newMedications);
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeArrayItem("currentMedications", index)}
                    className="mb-2"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem("currentMedications", {
                name: "",
                dosage: "",
                frequency: "",
                prescribingPhysician: "",
              })
            }
          >
            Add Medication
          </Button>
        </div>
      </div>
    </Card>
  );
}
