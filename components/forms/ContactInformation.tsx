import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";

export function ContactInformation({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Primary Phone"
          type="tel"
          required
          value={formData.primaryPhone || ""}
          onChange={(e) => updateFormData("primaryPhone", e.target.value)}
        />
        <FormField
          label="Secondary Phone"
          type="tel"
          value={formData.secondaryPhone || ""}
          onChange={(e) => updateFormData("secondaryPhone", e.target.value)}
        />
        <FormField
          label="Email Address"
          type="email"
          required
          value={formData.email || ""}
          onChange={(e) => updateFormData("email", e.target.value)}
        />
        <FormField
          label="Street Address"
          type="text"
          required
          value={formData.address?.street || ""}
          onChange={(e) => updateFormData("address.street", e.target.value)}
        />
        <FormField
          label="Apartment/Unit"
          type="text"
          value={formData.address?.apartment || ""}
          onChange={(e) => updateFormData("address.apartment", e.target.value)}
        />
        <FormField
          label="City"
          type="text"
          required
          value={formData.address?.city || ""}
          onChange={(e) => updateFormData("address.city", e.target.value)}
        />
        <FormField
          label="State"
          type="text"
          required
          value={formData.address?.state || ""}
          onChange={(e) => updateFormData("address.state", e.target.value)}
        />
        <FormField
          label="ZIP Code"
          type="text"
          required
          value={formData.address?.zipCode || ""}
          onChange={(e) => updateFormData("address.zipCode", e.target.value)}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Preferred Contact Method
          </label>
          <select
            className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={formData.preferredContactMethod || ""}
            onChange={(e) =>
              updateFormData("preferredContactMethod", e.target.value)
            }
          >
            <option value="">Select Contact Method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="text">Text Message</option>
          </select>
        </div>
        <FormField
          label="Best Time to Contact"
          type="text"
          value={formData.bestTimeToContact || ""}
          onChange={(e) => updateFormData("bestTimeToContact", e.target.value)}
        />
      </div>
    </Card>
  );
}
