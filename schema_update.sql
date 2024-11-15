-- Rename existing columns to Spanish names
ALTER TABLE patients 
  RENAME COLUMN first_name TO nombre_apellido;

-- Add new Spanish columns
ALTER TABLE patients 
  ADD COLUMN fecha DATE,
  ADD COLUMN fecha_nacimiento DATE,
  ADD COLUMN edad INTEGER,
  ADD COLUMN estado_civil TEXT,
  ADD COLUMN nacionalidad TEXT,
  ADD COLUMN documento TEXT,
  ADD COLUMN direccion TEXT,
  ADD COLUMN localidad TEXT,
  ADD COLUMN celular TEXT,
  ADD COLUMN mail TEXT;

-- Drop old columns that are no longer needed
ALTER TABLE patients 
  DROP COLUMN last_name,
  DROP COLUMN date_of_birth,
  DROP COLUMN marital_status;

-- Update indexes for new column names
DROP INDEX IF EXISTS idx_patients_name;
CREATE INDEX IF NOT EXISTS idx_patients_nombre ON patients(nombre_apellido);

-- Update existing data (if needed)
UPDATE patients 
SET fecha_nacimiento = date_of_birth,
    edad = EXTRACT(YEAR FROM age(date_of_birth)),
    estado_civil = marital_status,
    direccion = address,
    mail = email;
