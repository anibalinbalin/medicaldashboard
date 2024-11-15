import { useState } from 'react';
import { FormField } from "../ui/form-field";
import { Card } from "../ui/card";
import { FormSectionProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "../ui/date-picker";
import { FacialFeatureSelector } from '../facial-features/FacialFeatureSelector';

const aestheticAntecedents = [
  'Cirugías estéticas',
  'Cicatrización patológica',
  'Acné',
  'Atopías',
  'Dermatitis',
  'Rosácea',
  'Melasma',
  'Vitiligo',
  'Psoriasis',
  'Otras condiciones cutáneas'
];

const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const

export function MedicalInformation({
  formData,
  updateFormData,
}: FormSectionProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <Card className="p-6 bg-card text-card-foreground">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Información Médica
      </h2>
      <div className="space-y-6">
        {/* Current Consultation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Motivo de Consulta Actual
          </h3>
          <FormField
            label="Motivo de Consulta"
            type="textarea"
            value={formData.motivoConsulta}
            onChange={(e) => updateFormData("motivoConsulta", e.target.value)}
          />
        </div>

        {/* Family History */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Antecedentes Familiares
          </h3>
          <FormField
            label="Antecedentes Familiares"
            type="textarea"
            value={formData.antecedentesFamiliares}
            onChange={(e) =>
              updateFormData("antecedentesFamiliares", e.target.value)
            }
          />
        </div>

        {/* Aesthetic Family History */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Antecedentes Familiares (Estéticos)
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Cirugías */}
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Cirugías</Label>
                  <p className="text-sm text-muted-foreground">
                    Indique si hay antecedentes familiares de cirugías
                  </p>
                </div>
                <Switch
                  checked={formData.hasSurgeries}
                  onCheckedChange={(checked) => updateFormData("hasSurgeries", checked)}
                />
              </div>

              {formData.hasSurgeries && (
                <div className="mt-2">
                  <Textarea
                    placeholder="Describa las cirugías..."
                    value={formData.cirugiasNotes}
                    onChange={(e) => updateFormData("cirugiasNotes", e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            {/* Cicatrización patológica Acné */}
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Cicatrización patológica Acné</Label>
                  <p className="text-sm text-muted-foreground">
                    Indique si hay antecedentes de cicatrización patológica o acné
                  </p>
                </div>
                <Switch
                  checked={formData.hasPathologicalScarring}
                  onCheckedChange={(checked) => updateFormData("hasPathologicalScarring", checked)}
                />
              </div>

              {formData.hasPathologicalScarring && (
                <div className="mt-2">
                  <Textarea
                    placeholder="Describa la cicatrización patológica o acné..."
                    value={formData.pathologicalScarringNotes}
                    onChange={(e) => updateFormData("pathologicalScarringNotes", e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            {/* Atopías */}
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Atopías</Label>
                  <p className="text-sm text-muted-foreground">
                    Indique si hay antecedentes familiares de atopías
                  </p>
                </div>
                <Switch
                  checked={formData.hasAtopias}
                  onCheckedChange={(checked) => updateFormData("hasAtopias", checked)}
                />
              </div>

              {formData.hasAtopias && (
                <div className="mt-2">
                  <Textarea
                    placeholder="Describa las atopías..."
                    value={formData.atopiasNotes}
                    onChange={(e) => updateFormData("atopiasNotes", e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            {/* Otras condiciones cutáneas */}
            <FormField
              label="Otras condiciones cutáneas"
              type="textarea"
              value={formData.otrasCondicionesCutaneas}
              onChange={(e) => updateFormData("otrasCondicionesCutaneas", e.target.value)}
            />
          </div>
        </div>

        {/* Personal Medical History */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Antecedentes Personales del Paciente
          </h3>
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Antecedentes Personales</Label>
                <p className="text-sm text-muted-foreground">
                  Indique si el paciente tiene antecedentes personales relevantes
                </p>
              </div>
              <Switch
                checked={formData.hasPersonalAntecedents}
                onCheckedChange={(checked) => updateFormData("hasPersonalAntecedents", checked)}
              />
            </div>

            {formData.hasPersonalAntecedents && (
              <div className="mt-2">
                <Textarea
                  placeholder="Describa los antecedentes personales..."
                  value={formData.antecedentesPersonales}
                  onChange={(e) => updateFormData("antecedentesPersonales", e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Physical Measurements */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Medidas Físicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Peso"
              type="text"
              value={formData.peso}
              onChange={(e) => updateFormData("peso", e.target.value)}
            />
            <FormField
              label="Altura"
              type="text"
              value={formData.altura}
              onChange={(e) => updateFormData("altura", e.target.value)}
            />
            <FormField
              label="IMC"
              type="text"
              value={formData.imc}
              onChange={(e) => updateFormData("imc", e.target.value)}
            />
          </div>
        </div>

        {/* Additional Medical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Grupo Sanguíneo</label>
            <Select 
              value={formData.grupoSanguineo || ''} 
              onValueChange={(value) => updateFormData("grupoSanguineo", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione grupo sanguíneo" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Última vacuna antitetánica</Label>
            <DatePicker
              date={formData.ultimaVacunaAntitetanica ? new Date(formData.ultimaVacunaAntitetanica) : undefined}
              onSelect={(date) => updateFormData("ultimaVacunaAntitetanica", date?.toISOString().split('T')[0])}
              placeholder="Seleccione fecha"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Heridas y Cicatrices</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente tiene heridas o cicatrices relevantes
              </p>
            </div>
            <Switch
              checked={formData.hasScarsOrWounds}
              onCheckedChange={(checked) => updateFormData("hasScarsOrWounds", checked)}
            />
          </div>

          {formData.hasScarsOrWounds && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa las heridas o cicatrices..."
                value={formData.scarsOrWoundsNotes}
                onChange={(e) => updateFormData("scarsOrWoundsNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Antecedentes psiquiátricos</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente tiene antecedentes psiquiátricos
              </p>
            </div>
            <Switch
              checked={formData.hasPsychiatricHistory}
              onCheckedChange={(checked) => updateFormData("hasPsychiatricHistory", checked)}
            />
          </div>

          {formData.hasPsychiatricHistory && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa los antecedentes psiquiátricos..."
                value={formData.antecedentesPsiquiatricos}
                onChange={(e) => updateFormData("antecedentesPsiquiatricos", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Allergies */}
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Alergias e hipersensibilidad</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente tiene alergias o hipersensibilidad
              </p>
            </div>
            <Switch
              checked={formData.hasAllergies}
              onCheckedChange={(checked) => updateFormData("hasAllergies", checked)}
            />
          </div>

          {formData.hasAllergies && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa las alergias e hipersensibilidad..."
                value={formData.alergiasHipersensibilidad}
                onChange={(e) => updateFormData("alergiasHipersensibilidad", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Current Medication */}
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Medicación actual</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente toma medicación actualmente
              </p>
            </div>
            <Switch
              checked={formData.hasCurrentMedication}
              onCheckedChange={(checked) => updateFormData("hasCurrentMedication", checked)}
            />
          </div>

          {formData.hasCurrentMedication && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa la medicación actual..."
                value={formData.medicacionActual}
                onChange={(e) => updateFormData("medicacionActual", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Pharmaceutical Products */}
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Productos farmacoestéticos</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente usa productos farmacoestéticos actualmente
              </p>
            </div>
            <Switch
              checked={formData.hasPharmaceuticalProducts}
              onCheckedChange={(checked) => updateFormData("hasPharmaceuticalProducts", checked)}
            />
          </div>

          {formData.hasPharmaceuticalProducts && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa los productos farmacoestéticos que usa..."
                value={formData.productosFarmacoesteticos}
                onChange={(e) => updateFormData("productosFarmacoesteticos", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        <FacialFeatureSelector 
          onFeatureSelect={setSelectedFeature}
          selectedFeature={selectedFeature}
        />
      </div>

      {/* Habits Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Hábitos
        </h3>
        <div className="space-y-4">
          {/* Smoking */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Tabaquismo</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente fuma
              </p>
            </div>
            <Switch
              checked={formData.isSmoker}
              onCheckedChange={(checked) => updateFormData("isSmoker", checked)}
            />
          </div>

          {formData.isSmoker && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa la frecuencia y cantidad..."
                value={formData.smokingDetails}
                onChange={(e) => updateFormData("smokingDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Alcohol */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Consumo de alcohol</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente consume alcohol
              </p>
            </div>
            <Switch
              checked={formData.consumesAlcohol}
              onCheckedChange={(checked) => updateFormData("consumesAlcohol", checked)}
            />
          </div>

          {formData.consumesAlcohol && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa la frecuencia y cantidad..."
                value={formData.alcoholDetails}
                onChange={(e) => updateFormData("alcoholDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Physical Activity */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Actividad física</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente realiza actividad física
              </p>
            </div>
            <Switch
              checked={formData.doesExercise}
              onCheckedChange={(checked) => updateFormData("doesExercise", checked)}
            />
          </div>

          {formData.doesExercise && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa el tipo de actividad y frecuencia..."
                value={formData.exerciseDetails}
                onChange={(e) => updateFormData("exerciseDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Sleep Pattern */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Patrón de sueño</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente tiene problemas de sueño
              </p>
            </div>
            <Switch
              checked={formData.hasSleepIssues}
              onCheckedChange={(checked) => updateFormData("hasSleepIssues", checked)}
            />
          </div>

          {formData.hasSleepIssues && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa los patrones o problemas de sueño..."
                value={formData.sleepDetails}
                onChange={(e) => updateFormData("sleepDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Diet */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Alimentación</Label>
              <p className="text-sm text-muted-foreground">
                Indique si el paciente sigue alguna dieta especial
              </p>
            </div>
            <Switch
              checked={formData.hasSpecialDiet}
              onCheckedChange={(checked) => updateFormData("hasSpecialDiet", checked)}
            />
          </div>

          {formData.hasSpecialDiet && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa los hábitos alimenticios o dieta especial..."
                value={formData.dietDetails}
                onChange={(e) => updateFormData("dietDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Sueño
        </h3>
        <div className="space-y-4">
          {/* Duerme bien */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Duerme bien durante la noche?</Label>
            </div>
            <Switch
              checked={formData.sleepQuality}
              onCheckedChange={(checked) => updateFormData("sleepQuality", checked)}
            />
          </div>

          {formData.sleepQuality && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa su calidad de sueño..."
                value={formData.sleepQualityNotes}
                onChange={(e) => updateFormData("sleepQualityNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Dificultad para dormir */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Tiene dificultad para conciliar el sueño?</Label>
            </div>
            <Switch
              checked={formData.difficultyFallingAsleep}
              onCheckedChange={(checked) => updateFormData("difficultyFallingAsleep", checked)}
            />
          </div>

          {formData.difficultyFallingAsleep && (
            <div className="mt-2">
              <FormField
                label="Si tiene dificultad indique cuanto tiempo tarda en dormirse"
                type="text"
                value={formData.timeToFallAsleep}
                onChange={(e) => updateFormData("timeToFallAsleep", e.target.value)}
              />
            </div>
          )}

          {/* Se despierta durante la noche */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Se despierta durante la noche?</Label>
            </div>
            <Switch
              checked={formData.wakesUpAtNight}
              onCheckedChange={(checked) => updateFormData("wakesUpAtNight", checked)}
            />
          </div>

          {formData.wakesUpAtNight && (
            <div className="mt-2">
              <FormField
                label="¿Cuántas veces?"
                type="text"
                value={formData.timesWakingUp}
                onChange={(e) => updateFormData("timesWakingUp", e.target.value)}
              />
            </div>
          )}

          {/* Se despierta antes de las 6:00 AM */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Se despierta antes de las 6:00 AM?</Label>
            </div>
            <Switch
              checked={formData.wakesUpEarly}
              onCheckedChange={(checked) => updateFormData("wakesUpEarly", checked)}
            />
          </div>

          {formData.wakesUpEarly && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa a qué hora se despierta y otros detalles relevantes..."
                value={formData.wakesUpEarlyNotes}
                onChange={(e) => updateFormData("wakesUpEarlyNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Se duerme durante inactividad */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Se duerme durante el día, si permanece inactivo/a?</Label>
            </div>
            <Switch
              checked={formData.sleepsDuringInactivity}
              onCheckedChange={(checked) => updateFormData("sleepsDuringInactivity", checked)}
            />
          </div>

          {formData.sleepsDuringInactivity && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa en qué situaciones ocurre y con qué frecuencia..."
                value={formData.sleepsDuringInactivityNotes}
                onChange={(e) => updateFormData("sleepsDuringInactivityNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          {/* Se duerme durante actividad */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">
                ¿Se duerme durante el día, a pesar de realizar actividades que requieren su atención?
              </Label>
            </div>
            <Switch
              checked={formData.sleepsDuringActivity}
              onCheckedChange={(checked) => updateFormData("sleepsDuringActivity", checked)}
            />
          </div>

          {formData.sleepsDuringActivity && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa en qué actividades ocurre y con qué frecuencia..."
                value={formData.sleepsDuringActivityNotes}
                onChange={(e) => updateFormData("sleepsDuringActivityNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Tratamientos Estéticos Previos
        </h3>
        <div className="space-y-4">
          {/* Recibió tratamiento */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Recibió algún tratamiento estético?</Label>
            </div>
            <Switch
              checked={formData.hasAestheticTreatments}
              onCheckedChange={(checked) => updateFormData("hasAestheticTreatments", checked)}
            />
          </div>

          {formData.hasAestheticTreatments && (
            <>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">¿Quedó conforme?</Label>
                </div>
                <Switch
                  checked={formData.wasSatisfied}
                  onCheckedChange={(checked) => updateFormData("wasSatisfied", checked)}
                />
              </div>

              {formData.wasSatisfied && (
                <div className="space-y-4">
                  <FormField
                    label="Fecha del tratamiento"
                    type="date"
                    value={formData.treatmentDate}
                    onChange={(e) => updateFormData("treatmentDate", e.target.value)}
                  />
                  
                  <Textarea
                    placeholder="¿Dónde se realizó el tratamiento?"
                    value={formData.treatmentLocation}
                    onChange={(e) => updateFormData("treatmentLocation", e.target.value)}
                    className="mt-2"
                  />

                  <Textarea
                    placeholder="Propuesta del tratamiento..."
                    value={formData.treatmentProposal}
                    onChange={(e) => updateFormData("treatmentProposal", e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Laboratory Studies Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Laboratorio y estudios complementarios
        </h3>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Tiene estudios de laboratorio?</Label>
            </div>
            <Switch
              checked={formData.hasLabStudies}
              onCheckedChange={(checked) => updateFormData("hasLabStudies", checked)}
            />
          </div>

          {formData.hasLabStudies && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa los estudios de laboratorio y resultados..."
                value={formData.labStudiesNotes}
                onChange={(e) => updateFormData("labStudiesNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* Evolution Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Evolución
        </h3>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">¿Hay notas de evolución?</Label>
            </div>
            <Switch
              checked={formData.hasEvolution}
              onCheckedChange={(checked) => updateFormData("hasEvolution", checked)}
            />
          </div>

          {formData.hasEvolution && (
            <div className="mt-2">
              <Textarea
                placeholder="Describa la evolución del paciente..."
                value={formData.evolutionNotes}
                onChange={(e) => updateFormData("evolutionNotes", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
