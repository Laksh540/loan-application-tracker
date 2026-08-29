import { useEffect, useMemo, useState } from "react";
import Table, { Column } from "../components/Table";
import { getApplications } from "../services/api";
import type { LoanApplication, Status } from "../types/loans";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { formatCurrency, formatDate } from "../utils/format";
import { StatusBadge } from "../components/Badge";
import { TableLoadingState } from "../components/TableLoadingState";
import { Link } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import { TableEmptyState } from "../components/TableEmptyState";
import Header from "../components/Header";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchApplications = async (isRetry = false) => {
    if (isRetry) {
      setLoading(true);
    }

    setError(null);

    try {
      const data = await getApplications();
      setApplications(data);
    } catch {
      setError("Failed to load loan applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadApplications = async () => {
      setError(null);

      try {
        const data = await getApplications();
        setApplications(data);
      } catch {
        setError("Failed to load loan applications.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <main className="p-6">
      <Header
        title="Loan Applications"
        description="Manage and review submitted loan applications."
      />
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
        {loading ? (
          <TableLoadingState />
        ) : error ? (
          <ErrorState
            title="Something went wrong"
            message={error}
            onRetry={() => fetchApplications(true)}
          />
        ) : (
          <Table
            data={filteredApplications}
            emptyMessage={
              <TableEmptyState
                title="No applications found"
                description="Try adjusting your search or status filter."
              />
            }
          >
            <Column
              field="reference"
              header="Reference"
              body={(row) => (
                <Link
                  to={`/applications/${row.reference}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {row.reference}
                </Link>
              )}
            />
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
        )}
      </section>
    </main>
  );
}
