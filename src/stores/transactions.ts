import { create } from 'zustand';
import type { Transaction } from '../types';
import api from '../api';

interface TransactionsState {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  filters: {
    accountId: string | null;
    categoryId: string | null;
    startDate: string | null;
    endDate: string | null;
    status: string | null;
  };
  fetchTransactions: () => Promise<void>;
  createTransaction: (data: Partial<Transaction>) => Promise<Transaction>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<Transaction>;
  deleteTransaction: (id: string) => Promise<void>;
  setFilter: (key: string, value: string | null) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
  loading: false,
  error: null,
  filters: {
    accountId: null,
    categoryId: null,
    startDate: null,
    endDate: null,
    status: null,
  },

  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const state = get();
      const params: any = {
        page: state.page,
        limit: state.limit,
      };
      if (state.filters.accountId) params.accountId = state.filters.accountId;
      if (state.filters.categoryId) params.categoryId = state.filters.categoryId;
      if (state.filters.startDate) params.startDate = state.filters.startDate;
      if (state.filters.endDate) params.endDate = state.filters.endDate;
      if (state.filters.status) params.status = state.filters.status;

      const res = await api.getTransactions(params);
      set({
        transactions: res.data.data,
        total: res.data.pagination.total,
        totalPages: res.data.pagination.totalPages,
        loading: false,
      });
    } catch (err: any) {
      // FIXME: inconsistent error handling — sometimes we set error, sometimes we don't
      set({ error: err.message || 'Failed to fetch transactions', loading: false });
    }
  },

  createTransaction: async (data) => {
    try {
      const res = await api.createTransaction(data);
      set({ transactions: [res.data, ...get().transactions] });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to create transaction' });
      throw err;
    }
  },

  updateTransaction: async (id, data) => {
    try {
      const res = await api.updateTransaction(id, data);
      const transactions = get().transactions.map(t => t.id === id ? res.data : t);
      set({ transactions });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to update transaction' });
      throw err;
    }
  },

  deleteTransaction: async (id) => {
    try {
      await api.deleteTransaction(id);
      set({ transactions: get().transactions.filter(t => t.id !== id) });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete transaction' });
      throw err;
    }
  },

  setFilter: (key, value) => {
    // BUG: Setting a filter doesn't reset to page 1
    set(state => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  setPage: (page) => set({ page }),

  resetFilters: () => set({
    filters: {
      accountId: null,
      categoryId: null,
      startDate: null,
      endDate: null,
      status: null,
    },
    page: 1,
  }),
}));
