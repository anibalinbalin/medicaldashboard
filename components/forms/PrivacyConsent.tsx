import { Card } from "../ui/card";
import { FormSectionProps } from "./types";

export function PrivacyConsent({ formData, updateFormData }: FormSectionProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Privacy & Consent
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hipaaConsent"
            checked={formData.hipaaConsentStatus}
            onChange={(e) =>
              updateFormData("hipaaConsentStatus", e.target.checked)
            }
            className="rounded border-input bg-background text-primary"
          />
          <label
            htmlFor="hipaaConsent"
            className="text-sm text-muted-foreground"
          >
            I acknowledge that I have received and reviewed the HIPAA Privacy
            Notice
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="releaseInfo"
            checked={formData.releaseOfInformation}
            onChange={(e) =>
              updateFormData("releaseOfInformation", e.target.checked)
            }
            className="rounded border-input bg-background text-primary"
          />
          <label
            htmlFor="releaseInfo"
            className="text-sm text-muted-foreground"
          >
            I authorize the release of my medical information as needed for
            treatment
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="advanceDirectives"
            checked={formData.advanceDirectivesStatus}
            onChange={(e) =>
              updateFormData("advanceDirectivesStatus", e.target.checked)
            }
            className="rounded border-input bg-background text-primary"
          />
          <label
            htmlFor="advanceDirectives"
            className="text-sm text-muted-foreground"
          >
            I have provided information about my advance directives
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="researchParticipation"
            checked={formData.researchParticipation}
            onChange={(e) =>
              updateFormData("researchParticipation", e.target.checked)
            }
            className="rounded border-input bg-background text-primary"
          />
          <label
            htmlFor="researchParticipation"
            className="text-sm text-muted-foreground"
          >
            I am interested in participating in research studies
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="photoConsent"
            checked={formData.photoVideoConsent}
            onChange={(e) =>
              updateFormData("photoVideoConsent", e.target.checked)
            }
            className="rounded border-input bg-background text-primary"
          />
          <label
            htmlFor="photoConsent"
            className="text-sm text-muted-foreground"
          >
            I consent to the taking of photographs/videos for medical
            documentation
          </label>
        </div>
      </div>
    </Card>
  );
}
