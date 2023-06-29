export const TODO_FILTER_TYPES = ["ALL", "COMPLETED", "ACTIVE"] as const;

export type TodoFilterType = (typeof TODO_FILTER_TYPES)[number]; // default is "ALL"
