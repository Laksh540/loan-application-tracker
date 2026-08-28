import { useEffect, useMemo, useState } from "react";
import Table, { Column } from "../components/Table";
import { getApplications } from "../services/api";
import type { LoanApplication, Status } from "../types/loans";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { formatCurrency, formatDate } from "../utils/format";
import { StatusBadge } from "../components/Badge";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];
export default function ApplicationListPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = app.applicantName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Loan Applications</h1>
      <p className="mt-1 text-gray-600">
        Manage and review submitted loan applications.
      </p>
      <div className="mt-6 flex max-w-2xl gap-4">
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Search by applicant..."
        />
        <Dropdown
          value={statusFilter}
          options={statusOptions}
          onChange={(value) => setStatusFilter(value as Status | "all")}
        />
      </div>
      <section className="mt-6 rounded-lg border p-4">
        <Table data={filteredApplications}>
          <Column field="reference" header="Reference" />
          <Column field="applicantName" header="Applicant" />
          <Column
            field="loanAmount"
            header="Amount"
            body={(row) => formatCurrency(row.loanAmount)}
          />
          <Column
            field="status"
            header="Status"
            body={(row) => <StatusBadge status={row.status} />}
          />
          <Column
            field="submittedDate"
            header="Submitted Date"
            body={(row) => formatDate(row.submittedDate)}
          />
        </Table>
      </section>
    </main>
  );
}
