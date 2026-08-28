import type { LoanApplication } from "../types/loans";

type Props = {
  applications: LoanApplication[];
};

export default function ApplicationTable({ applications }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Reference</th>
            <th className="p-3">Applicant</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Submitted Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{app.reference}</td>
              <td className="p-3">{app.applicantName}</td>
              <td className="p-3">{app.loanAmount}</td>
              <td className="p-3">{app.status}</td>
              <td className="p-3">{app.submittedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
