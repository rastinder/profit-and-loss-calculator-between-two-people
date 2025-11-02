
export enum User {
  RAS = 'Ras',
  SUKA = 'Suka',
}

export enum TransactionType {
  EXPENSE = 'Expense',
  INCOME = 'Income',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  user: User; // Who paid (expense) or received (income)
  date: Date;
}

export interface Settlement {
  id: string;
  from: User;
  to: User;
  amount: number;
  date: Date;
}

export type HistoryItem = Transaction | Settlement;

export const isSettlement = (item: HistoryItem): item is Settlement => {
  return 'from' in item && 'to' in item;
};
