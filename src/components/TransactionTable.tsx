import type { Transaction } from '../types';
import { formatCents, formatDate } from '../utils/format';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  compact?: boolean;
}

export default function TransactionTable({ transactions, loading, compact }: TransactionTableProps) {
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Cargando transacciones...</div>;
  }

  const statusClass = (status: string) => {
    if (status === 'completed') return 'badge-success';
    if (status === 'pending') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <table>
      <thead>
        <tr>
          {!compact && <th>Cuenta</th>}
          <th>Fecha</th>
          <th>Descripción</th>
          {!compact && <th>Comercio</th>}
          <th>Categoría</th>
          <th className="text-right">Importe</th>
          {!compact && <th>Estado</th>}
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.id}>
            {!compact && <td>{tx.account?.name || '—'}</td>}
            {/* FIXME: inconsistent date formatting — should use formatDate consistently */}
            <td>{new Date(tx.date).toLocaleDateString('es-ES')}</td>
            <td>{tx.description}</td>
            {!compact && <td>{tx.merchant || '—'}</td>}
            <td>
              {tx.category ? (
                <span style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  background: tx.category.color || '#ccc',
                  color: '#fff',
                }}>
                  {tx.category.name}
                </span>
              ) : '—'}
            </td>
            <td className={`text-right ${tx.amount < 0 ? 'text-danger' : 'text-success'}`}>
              {formatCents(tx.amount)}
            </td>
            {!compact && (
              <td>
                <span className={`badge ${statusClass(tx.status)}`}>{tx.status}</span>
              </td>
            )}
          </tr>
        ))}
        {transactions.length === 0 && (
          <tr>
            <td colSpan={compact ? 4 : 6} className="text-center">No hay transacciones</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
