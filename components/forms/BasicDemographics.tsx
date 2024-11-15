import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";
import { PhoneInput } from "../ui/phone-input";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";

export function BasicDemographics({
  formData,
  updateFormData,
}: FormSectionProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Datos Demográficos Básicos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Fecha*</Label>
          <DatePicker
            date={formData.fecha ? new Date(formData.fecha) : undefined}
            onSelect={(date) => updateFormData("fecha", date?.toISOString().split('T')[0])}
            placeholder="Seleccione fecha"
            className="w-full"
          />
        </div>
        <FormField
          label="Nombre y Apellido"
          type="text"
          required
          value={formData.nombreApellido}
          onChange={(e) => updateFormData("nombreApellido", e.target.value)}
        />
        <div className="space-y-2">
          <Label>Fecha de nacimiento*</Label>
          <DatePicker
            date={formData.fechaNacimiento ? new Date(formData.fechaNacimiento) : undefined}
            onSelect={(date) => updateFormData("fechaNacimiento", date?.toISOString().split('T')[0])}
            placeholder="Seleccione fecha de nacimiento"
            className="w-full"
          />
        </div>
        <FormField label="Edad" type="number" readOnly value={formData.edad} />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Estado Civil
          </label>
          <select
            className="w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm ring-offset-background focus:ring-2 focus:ring-ring"
            value={formData.estadoCivil}
            onChange={(e) => updateFormData("estadoCivil", e.target.value)}
          >
            <option value="">Seleccionar Estado Civil</option>
            <option value="soltero">Soltero/a</option>
            <option value="casado">Casado/a</option>
            <option value="divorciado">Divorciado/a</option>
            <option value="viudo">Viudo/a</option>
          </select>
        </div>
        <FormField
          label="Nacionalidad"
          type="text"
          value={formData.nacionalidad}
          onChange={(e) => updateFormData("nacionalidad", e.target.value)}
        />
        <FormField
          label="Documento"
          type="text"
          required
          value={formData.documento}
          onChange={(e) => updateFormData("documento", e.target.value)}
        />
        <FormField
          label="Dirección"
          type="text"
          required
          value={formData.direccion}
          onChange={(e) => updateFormData("direccion", e.target.value)}
        />
        <FormField
          label="Localidad"
          type="text"
          required
          value={formData.localidad}
          onChange={(e) => updateFormData("localidad", e.target.value)}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Celular
          </label>
          <PhoneInput
            value={formData.celular}
            onChange={(value) => updateFormData("celular", value)}
            defaultCountry="UY"
          />
        </div>
        <FormField
          label="Mail"
          type="email"
          required
          value={formData.mail}
          onChange={(e) => updateFormData("mail", e.target.value)}
        />
      </div>
    </Card>
  );
}
