// Type definitions for the Fintech domain

export interface Account {
  id: string;
  userId: string;
  name: string;
  iban: string;
  balance: number; // in cents
  currency: string;
  type: 'checking' | 'savings' | 'credit';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  categoryId?: string;
  amount: number; // in cents, positive = credit, negative = debit
  description: string;
  date: string;
  merchant?: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
  createdAt: string;
  account?: Account;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Budget {
  id: string;
  accountId: string;
  categoryId: string;
  limit: number; // in cents
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  account?: Account;
  category?: Category;
  spent?: number;
  remaining?: number;
  percentage?: number;
}

export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number; // in cents
  description?: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
  createdAt: string;
  fromAccount?: Account;
  toAccount?: Account;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: string;
  ipAddress?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
