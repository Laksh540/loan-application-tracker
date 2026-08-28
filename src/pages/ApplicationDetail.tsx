import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { getApplicationByRefId } from "../services/api";
import { formatCurrency, formatDate } from "../utils/format";
import ErrorState from "../components/ErrorState";
import type { LoanApplication } from "../types/loans";

const statusOptions = [
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const ApplicationDetail = () => {
  const { reference } = useParams<{ reference: string }>();
  const [application, setApplication] = useState<LoanApplication>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) return;

    const loadApplication = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getApplicationByRefId(reference);
        setApplication(data);
      } catch {
        setError("Failed to load application details.");
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [reference]);

  const onRetry = () => {
    if (!reference) return;

    setLoading(true);
    setError(null);

    getApplicationByRefId(reference)
      .then(setApplication)
      .catch(() => setError("Failed to load application details."))
      .finally(() => setLoading(false));
  };

  const content = loading ? (
    <div
      className="mt-6 grid max-w-2xl gap-4"
      aria-label="Loading application details"
    >
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
      <div className="h-10 animate-pulse rounded border bg-gray-100" />
    </div>
  ) : error ? (
    <ErrorState
      title="Something went wrong"
      message={error}
      onRetry={onRetry}
    />
  ) : !application ? (
    <div>Application not found.</div>
  ) : (
    <div className="mt-6 grid max-w-2xl gap-4">
      <Input value={application.reference} readOnly />
      <Input value={application.applicantName} readOnly />
      <Input value={formatCurrency(application.loanAmount)} readOnly />
      <Dropdown value={application.status} options={statusOptions} disabled />
      <Input value={formatDate(application.submittedDate)} readOnly />
      <Input value={application.purpose} readOnly />
    </div>
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-3">Application Detail</h1>
      {content}
    </main>
  );
};

export default ApplicationDetail;
