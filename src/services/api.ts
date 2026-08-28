import data from "../data/applications.json";
import type { LoanApplication } from "../types/loans";
const shouldFail = import.meta.env.VITE_API_SHOULD_FAIL === "true";

const applications = data as LoanApplication[];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getApplications = async (): Promise<LoanApplication[]> => {
  await delay(500);
  if (shouldFail) {
    throw new Error("Mock API failure");
  }
  return applications;
};

export const getApplicationByRefId = async (
  reference: string,
): Promise<LoanApplication | undefined> => {
  await delay(500);
  if (shouldFail) {
    throw new Error("Mock API failure");
  }
  return applications.find((app) => app.reference === reference);
};
