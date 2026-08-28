export type Status = "submitted" | "under_review" | "approved" | "rejected";

export interface Document {
  id: string;
  name: string;
  verified: boolean;
}

export interface LoanApplication {
  id: string;
  reference: string;
  applicantName: string;
  loanAmount: number;
  status: Status;
  submittedDate: string;
  purpose: string;
  documents: Document[];
}
