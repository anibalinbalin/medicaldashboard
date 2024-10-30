import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";

export function EmergencyContacts({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Emergency Contacts
      </h2>
      <div className="space-y-6">
        {/* Primary Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Primary Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              type="text"
              required
              value={formData.primaryEmergencyContact.fullName}
              onChange={(e) =>
                updateFormData(
                  "primaryEmergencyContact.fullName",
                  e.target.value
                )
              }
            />
            <FormField
              label="Relationship to Patient"
              type="text"
              required
              value={formData.primaryEmergencyContact.relationship}
              onChange={(e) =>
                updateFormData(
                  "primaryEmergencyContact.relationship",
                  e.target.value
                )
              }
            />
            <FormField
              label="Phone Number"
              type="tel"
              required
              value={formData.primaryEmergencyContact.phoneNumber}
              onChange={(e) =>
                updateFormData(
                  "primaryEmergencyContact.phoneNumber",
                  e.target.value
                )
              }
            />
            <FormField
              label="Address"
              type="text"
              value={formData.primaryEmergencyContact.address}
              onChange={(e) =>
                updateFormData(
                  "primaryEmergencyContact.address",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Secondary Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Secondary Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              type="text"
              value={formData.secondaryEmergencyContact.fullName}
              onChange={(e) =>
                updateFormData(
                  "secondaryEmergencyContact.fullName",
                  e.target.value
                )
              }
            />
            <FormField
              label="Relationship to Patient"
              type="text"
              value={formData.secondaryEmergencyContact.relationship}
              onChange={(e) =>
                updateFormData(
                  "secondaryEmergencyContact.relationship",
                  e.target.value
                )
              }
            />
            <FormField
              label="Phone Number"
              type="tel"
              value={formData.secondaryEmergencyContact.phoneNumber}
              onChange={(e) =>
                updateFormData(
                  "secondaryEmergencyContact.phoneNumber",
                  e.target.value
                )
              }
            />
            <FormField
              label="Address"
              type="text"
              value={formData.secondaryEmergencyContact.address}
              onChange={(e) =>
                updateFormData(
                  "secondaryEmergencyContact.address",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
