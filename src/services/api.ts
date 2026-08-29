import data from "../data/applications.json";
import type { LoanApplication, Status } from "../types/loans";
import { canTransition } from "../utils/statusRule";

const shouldFail = import.meta.env.VITE_API_SHOULD_FAIL === "true";
const STORAGE_KEY = "loan-applications";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const readApplications = (): LoanApplication[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    const initialApplications = structuredClone(data as LoanApplication[]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialApplications));
    return initialApplications;
  }

  try {
    return JSON.parse(stored) as LoanApplication[];
  } catch {
    const initialApplications = structuredClone(data as LoanApplication[]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialApplications));
    return initialApplications;
  }
};

export const getApplications = async (): Promise<LoanApplication[]> => {
  await delay(500);
  if (shouldFail) {
    throw new Error("Mock API failure");
  }
  return readApplications();
};

export const getApplicationByRefId = async (
  reference: string,
): Promise<LoanApplication | undefined> => {
  await delay(500);
  if (shouldFail) {
    throw new Error("Mock API failure");
  }
  return readApplications().find((app) => app.reference === reference);
};

export const updateApplicationStatus = async (
  reference: string,
  nextStatus: Status,
): Promise<LoanApplication> => {
  await delay(500);
  if (shouldFail) {
    throw new Error("Mock API failure");
  }

  const applications = readApplications();
  const application = applications.find((app) => app.reference === reference);

  if (!application) {
    throw new Error("Application not found");
  }

  if (!canTransition(application.status, nextStatus)) {
    throw new Error("Invalid status transition");
  }

  const updatedApplication = { ...application, status: nextStatus };
  const updatedApplications = applications.map((app) =>
    app.reference === reference ? updatedApplication : app,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
  return updatedApplication;
};
