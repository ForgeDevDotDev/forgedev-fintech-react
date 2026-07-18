import axios from 'axios';
import type { Account, Transaction, Category, Budget, Transfer, AuditLog, PaginatedResponse } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// TODO: Add auth token interceptor
// FIXME: No error handling interceptor

export default {
  // Accounts
  getAccounts(userId?: string) {
    return api.get<Account[]>('/accounts', { params: { userId } });
  },
  getAccount(id: string) {
    return api.get<Account>(`/accounts/${id}`);
  },
  createAccount(data: Partial<Account> & { initialBalance?: number }) {
    return api.post<Account>('/accounts', data);
  },
  updateAccount(id: string, data: Partial<Account>) {
    return api.put<Account>(`/accounts/${id}`, data);
  },
  deleteAccount(id: string) {
    return api.delete(`/accounts/${id}`);
  },
  getAccountBalance(id: string) {
    return api.get<{ balance: number; currency: string }>(`/accounts/${id}/balance`);
  },

  // Transactions
  getTransactions(params?: {
    page?: number;
    limit?: number;
    accountId?: string;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }) {
    return api.get<PaginatedResponse<Transaction>>('/transactions', { params });
  },
  getTransaction(id: string) {
    return api.get<Transaction>(`/transactions/${id}`);
  },
  createTransaction(data: Partial<Transaction>) {
    return api.post<Transaction>('/transactions', data);
  },
  updateTransaction(id: string, data: Partial<Transaction>) {
    return api.put<Transaction>(`/transactions/${id}`, data);
  },
  deleteTransaction(id: string) {
    return api.delete(`/transactions/${id}`);
  },

  // Transfers
  getTransfers(accountId?: string) {
    return api.get<Transfer[]>('/transfers', { params: { accountId } });
  },
  createTransfer(data: { fromAccountId: string; toAccountId: string; amount: number; description?: string }) {
    return api.post<Transfer>('/transfers', data);
  },

  // Budgets
  getBudgets(accountId?: string) {
    return api.get<Budget[]>('/budgets', { params: { accountId } });
  },
  getBudget(id: string) {
    return api.get<Budget>(`/budgets/${id}`);
  },
  createBudget(data: Partial<Budget>) {
    return api.post<Budget>('/budgets', data);
  },
  updateBudget(id: string, data: Partial<Budget>) {
    return api.put<Budget>(`/budgets/${id}`, data);
  },
  deleteBudget(id: string) {
    return api.delete(`/budgets/${id}`);
  },

  // Categories
  getCategories() {
    return api.get<Category[]>('/categories');
  },
  getCategory(id: string) {
    return api.get<Category>(`/categories/${id}`);
  },
  createCategory(data: Partial<Category>) {
    return api.post<Category>('/categories', data);
  },
  updateCategory(id: string, data: Partial<Category>) {
    return api.put<Category>(`/categories/${id}`, data);
  },
  deleteCategory(id: string) {
    return api.delete(`/categories/${id}`);
  },

  // Audit logs
  getAuditLogs(page?: number, limit?: number) {
    return api.get<PaginatedResponse<AuditLog>>('/audit-logs', { params: { page, limit } });
  },
};

export { api };
