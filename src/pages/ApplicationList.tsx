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
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

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
  const [sortKey, setSortKey] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSort = (key: "date" | "amount") => {
    if (sortKey === key) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection(key === "date" ? "desc" : "asc");
  };

  const renderSortHeader = (label: string, key: "date" | "amount") => {
    const isActive = sortKey === key;

    return (
      <button
        type="button"
        onClick={() => handleSort(key)}
        aria-label={`Sort by ${label}`}
        className="flex items-center gap-1 rounded font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {label}
        {isActive ? (
          sortDirection === "asc" ? (
            <ArrowUp size={16} />
          ) : (
            <ArrowDown size={16} />
          )
        ) : (
          <ArrowUpDown size={16} className="text-gray-400" />
        )}
      </button>
    );
  };

  const filteredApplications = useMemo(() => {
    const filtered = applications.filter((app) => {
      const matchesSearch = app.applicantName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const comparison =
        sortKey === "amount"
          ? a.loanAmount - b.loanAmount
          : new Date(a.submittedDate).getTime() -
            new Date(b.submittedDate).getTime();

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [applications, search, statusFilter, sortKey, sortDirection]);

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
              header={renderSortHeader("Amount", "amount")}
              body={(row) => formatCurrency(row.loanAmount)}
            />
            <Column
              field="status"
              header="Status"
              body={(row) => <StatusBadge status={row.status} />}
            />
            <Column
              field="submittedDate"
              header={renderSortHeader("Submitted Date", "date")}
              body={(row) => formatDate(row.submittedDate)}
            />
          </Table>
        )}
      </section>
    </main>
  );
}
