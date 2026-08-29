import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { getApplicationByRefId } from "../services/api";
import { formatCurrency, formatDate } from "../utils/format";
import ErrorState from "../components/ErrorState";
import Header from "../components/Header";

import { canTransition } from "../utils/statusRule";
import type { LoanApplication, Status } from "../types/loans";
import { Toast } from "../components/Toast";

const statusOptions = [
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const ApplicationDetail = () => {
  const { reference } = useParams<{ reference: string }>();
  const [application, setApplication] = useState<LoanApplication>();
  const [status, setStatus] = useState<Status>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) return;

    const loadApplication = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getApplicationByRefId(reference);
        setApplication(data);
        setStatus(data.status);
        setToastMessage(null);
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
      .then((data) => {
        setApplication(data);
        setStatus(data.status);
        setToastMessage(null);
      })
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
    <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Application not found
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        The application you’re looking for doesn’t exist or may have been
        removed.
      </p>
    </div>
  ) : (
    <div className="mt-6 max-w-5xl rounded-lg border bg-white p-6">
      <div className="flex items-end justify-between gap-8 border-b pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Loan Application
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Application Details</h2>
        </div>
        <div className="w-56 shrink-0">
          <Dropdown
            label="Status"
            value={status ?? application.status}
            options={statusOptions}
            onChange={(nextStatus) => {
              const currentStatus = status ?? application.status;
              const typedNextStatus = nextStatus as Status;

              if (canTransition(currentStatus, typedNextStatus)) {
                setStatus(typedNextStatus);
                setToastMessage(null);
                return;
              }

              setToastMessage(
                `The application cannot move from ${statusOptions.find((option) => option.value === currentStatus)?.label} to ${statusOptions.find((option) => option.value === typedNextStatus)?.label}.`,
              );
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(280px,0.85fr)] gap-8 pt-6">
        <section>
          <h3 className="mb-4 text-base font-semibold">
            Application Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Reference" value={application.reference} readOnly />
            <Input
              label="Applicant"
              value={application.applicantName}
              readOnly
            />
            <Input
              label="Loan Amount"
              value={formatCurrency(application.loanAmount)}
              readOnly
            />
            <Input
              label="Submitted Date"
              value={formatDate(application.submittedDate)}
              readOnly
            />
            <div className="col-span-2">
              <Input label="Purpose" value={application.purpose} readOnly />
            </div>
          </div>
        </section>

        <section className="border-l pl-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold">Documents</h3>
            <span className="text-xs text-gray-500">
              {application.documents.length} documents
            </span>
          </div>
          {application.documents.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">
              No documents available.
            </p>
          ) : (
            <div className="mt-3 divide-y rounded border">
              {application.documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {document.name}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      document.verified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {document.verified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );

  return (
    <main className="p-6">
      <Header
        title="Loan Applications"
        description="Manage and review submitted loan applications."
        linkLabel="Back to Applications"
        linkTo="/"
      />
      {content}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
};

export default ApplicationDetail;
