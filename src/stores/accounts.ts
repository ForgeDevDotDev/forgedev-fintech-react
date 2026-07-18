import { create } from 'zustand';
import type { Account } from '../types';
import api from '../api';

interface AccountsState {
  accounts: Account[];
  currentAccount: Account | null;
  loading: boolean;
  error: string | null;
  fetchAccounts: (userId?: string) => Promise<void>;
  fetchAccount: (id: string) => Promise<void>;
  createAccount: (data: Partial<Account> & { initialBalance?: number }) => Promise<Account>;
  updateAccount: (id: string, data: Partial<Account>) => Promise<Account>;
  deleteAccount: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useAccountsStore = create<AccountsState>((set, get) => ({
  accounts: [],
  currentAccount: null,
  loading: false,
  error: null,

  fetchAccounts: async (userId?: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.getAccounts(userId);
      set({ accounts: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch accounts', loading: false });
    }
  },

  fetchAccount: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.getAccount(id);
      set({ currentAccount: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch account', loading: false });
    }
  },

  createAccount: async (data) => {
    try {
      const res = await api.createAccount(data);
      set({ accounts: [...get().accounts, res.data] });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to create account' });
      throw err;
    }
  },

  updateAccount: async (id, data) => {
    try {
      const res = await api.updateAccount(id, data);
      const accounts = get().accounts.map(a => a.id === id ? res.data : a);
      set({ accounts });
      return res.data;
    } catch (err: any) {
      set({ error: err.message || 'Failed to update account' });
      throw err;
    }
  },

  deleteAccount: async (id) => {
    try {
      await api.deleteAccount(id);
      set({ accounts: get().accounts.filter(a => a.id !== id) });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete account' });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
