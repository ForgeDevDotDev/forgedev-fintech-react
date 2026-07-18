import { create } from 'zustand';
import type { Budget } from '../types';
import api from '../api';

interface BudgetsState {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  fetchBudgets: (accountId?: string) => Promise<void>;
  createBudget: (data: Partial<Budget>) => Promise<Budget>;
  updateBudget: (id: string, data: Partial<Budget>) => Promise<Budget>;
  deleteBudget: (id: string) => Promise<void>;
}

export const useBudgetsStore = create<BudgetsState>((set, get) => ({
  budgets: [],
  loading: false,
  error: null,

  fetchBudgets: async (accountId?: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.getBudgets(accountId);
      set({ budgets: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch budgets', loading: false });
    }
  },

  createBudget: async (data) => {
    try {
      const res = await api.createBudget(data);
      set({ budgets: [...get().budgets, res.data] });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to create budget' });
      throw err;
    }
  },

  updateBudget: async (id, data) => {
    try {
      const res = await api.updateBudget(id, data);
      const budgets = get().budgets.map(b => b.id === id ? res.data : b);
      set({ budgets });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to update budget' });
      throw err;
    }
  },

  deleteBudget: async (id) => {
    try {
      await api.deleteBudget(id);
      set({ budgets: get().budgets.filter(b => b.id !== id) });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete budget' });
      throw err;
    }
  },
}));
