import { useEffect, useState } from "react";
import ApplicationTable from "../components/ApplicationTable";
import { getApplications } from "../services/api";
import type { LoanApplication } from "../types/loans";

export default function ApplicationListPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Loan Applications</h1>
      <p className="mt-1 text-gray-600">Manage and review submitted loan applications.</p>
      <section className="mt-6 rounded-lg border p-4">
        <ApplicationTable applications={applications} />
      </section>
    </main>
  );
}
