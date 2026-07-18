import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountsStore } from '../stores/accounts';
import TransferForm from '../components/TransferForm';
import api from '../api';
import type { Transfer } from '../types';
import { formatCents } from '../utils/format';

export default function TransferPage() {
  const navigate = useNavigate();
  const { accounts, fetchAccounts } = useAccountsStore();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
    api.getTransfers()
      .then(res => setTransfers(res.data))
      .catch(err => console.error('Failed to fetch transfers', err));
  }, [fetchAccounts]);

  const handleSubmit = async (data: { fromAccountId: string; toAccountId: string; amount: number; description?: string }) => {
    setLoading(true);
    try {
      const res = await api.createTransfer(data);
      setTransfers(prev => [res.data, ...prev]);
      // Refresh accounts to show updated balances
      await fetchAccounts();
    } catch (err: any) {
      // FIXME: Should show error to user, not just console.error
      console.error('Transfer failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const statusClass = (status: string) => {
    if (status === 'completed') return 'badge-success';
    if (status === 'pending') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div>
      <h1>Transferencia</h1>

      <div className="card">
        <TransferForm
          accounts={accounts}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>

      <h2 className="mt-3">Transferencias Recientes</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Origen</th>
              <th>Destino</th>
              <th className="text-right">Importe</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map(t => (
              <tr key={t.id}>
                <td>{t.createdAt.split('T')[0]}</td>
                <td>{t.fromAccount?.name || '—'}</td>
                <td>{t.toAccount?.name || '—'}</td>
                <td className="text-right">{formatCents(t.amount)}</td>
                <td><span className={`badge ${statusClass(t.status)}`}>{t.status}</span></td>
              </tr>
            ))}
            {transfers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">No hay transferencias</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
