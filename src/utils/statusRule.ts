import type { Status } from "../types/loans";

const STATUS_TRANSITIONS: Record<Status, Status[]> = {
  submitted: ["under_review"],
  under_review: ["approved", "rejected"],
  approved: [],
  rejected: [],
};

export const getAllowedTransitions = (status: Status): Status[] => {
  return STATUS_TRANSITIONS[status];
};

export const canTransition = (from: Status, to: Status): boolean => {
  return STATUS_TRANSITIONS[from].includes(to);
};
