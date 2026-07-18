import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountsStore } from '../stores/accounts';
import { useTransactionsStore } from '../stores/transactions';
import AccountCard from '../components/AccountCard';
import TransactionTable from '../components/TransactionTable';
import { formatCents } from '../utils/format';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { accounts, loading, error, fetchAccounts } = useAccountsStore();
  const { transactions, fetchTransactions } = useTransactionsStore();

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, []);

  const totalBalance = useMemo(() => accounts.reduce((sum, a) => sum + a.balance, 0), [accounts]);
  const activeCount = useMemo(() => accounts.filter(a => a.isActive).length, [accounts]);
  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);

  const monthlyTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });
  }, [transactions]);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Panel Principal</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3>Balance Total</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>{formatCents(totalBalance)}</p>
        </div>
        <div className="card">
          <h3>Cuentas Activas</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>{activeCount}</p>
        </div>
        <div className="card">
          <h3>Transacciones del Mes</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>{monthlyTransactions.length}</p>
        </div>
      </div>

      <h2>Mis Cuentas</h2>
      {loading && <div className="card"><p>Cargando cuentas...</p></div>}
      {error && <div className="card"><p className="text-danger">Error: {error}</p></div>}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {accounts.map(account => (
            <div key={account.id} onClick={() => navigate(`/transactions?accountId=${account.id}`)}>
              <AccountCard account={account} />
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-3">Transacciones Recientes</h2>
      <div className="card">
        <TransactionTable transactions={recentTransactions} compact />
      </div>
    </div>
  );
}
