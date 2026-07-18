import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTransactionsStore } from '../stores/transactions';
import { useAccountsStore } from '../stores/accounts';
import api from '../api';
import TransactionTable from '../components/TransactionTable';
import FilterBar from '../components/FilterBar';
import type { Category } from '../types';

export default function TransactionsPage() {
  const [searchParams] = useSearchParams();
  const {
    transactions, loading, page, totalPages,
    filters, fetchTransactions, setFilter, setPage, resetFilters,
  } = useTransactionsStore();
  const { accounts, fetchAccounts } = useAccountsStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const accountId = searchParams.get('accountId');
    if (accountId) {
      setFilter('accountId', accountId);
    }
    fetchAccounts();
    fetchTransactions();
  }, []);
  // BUG: Missing dependencies in useEffect — fetchTransactions and setFilter
  // are not in the dep array, which means the effect won't re-run when they change
  // Also, fetchTransactions should be called when filters change

  useEffect(() => {
    // Fetch categories for filter dropdown
    api.getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories', err));
  }, []);

  const handleFilterChange = (key: string, value: string | null) => {
    setFilter(key, value);
    // BUG: Should reset to page 1 here, but setFilter doesn't do it
    fetchTransactions();
  };

  const handleReset = () => {
    resetFilters();
    fetchTransactions();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchTransactions();
  };

  return (
    <div>
      <h1>Transacciones</h1>

      <FilterBar
        filters={filters}
        accounts={accounts}
        categories={categories}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="card">
        <TransactionTable transactions={transactions} loading={loading} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            className="btn btn-secondary"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            ← Anterior
          </button>
          <span style={{ fontSize: '0.875rem', color: '#666' }}>
            Página {page} de {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
