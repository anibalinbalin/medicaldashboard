"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  insurance_provider: string;
  primary_care_physician: string;
  created_at: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const { data, error } = await supabase
          .from("patients")
          .select(
            "id, first_name, last_name, date_of_birth, email, phone, insurance_provider, primary_care_physician, created_at"
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        setPatients(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching patients"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, [supabase]);

  const handleEdit = (patientId: string) => {
    router.push(`/patients/${patientId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading patients...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {patients.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No patients found</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Insurance Provider</TableHead>
                <TableHead>Primary Care Physician</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.first_name} {patient.last_name}
                  </TableCell>
                  <TableCell>
                    {new Date(patient.date_of_birth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.insurance_provider}</TableCell>
                  <TableCell>{patient.primary_care_physician}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(patient.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
