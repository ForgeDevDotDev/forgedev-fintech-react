import { useState } from 'react';
import type { Account } from '../types';
import { formatCents } from '../utils/format';

interface TransferFormProps {
  accounts: Account[];
  loading?: boolean;
  onSubmit: (data: { fromAccountId: string; toAccountId: string; amount: number; description?: string }) => void;
  onCancel: () => void;
}

export default function TransferForm({ accounts, loading, onSubmit, onCancel }: TransferFormProps) {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fromAccountId || !toAccountId) {
      setError('Selecciona ambas cuentas');
      return;
    }

    if (fromAccountId === toAccountId) {
      setError('Las cuentas deben ser diferentes');
      return;
    }

    const amount = Math.round(parseFloat(amountInput) * 100);
    if (isNaN(amount) || amount <= 0) {
      setError('Introduce un importe válido');
      return;
    }

    // TODO: Check if source account has sufficient balance

    onSubmit({
      fromAccountId,
      toAccountId,
      amount,
      description: description || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fromAccount">Cuenta Origen</label>
        <select id="fromAccount" value={fromAccountId} onChange={e => setFromAccountId(e.target.value)} required>
          <option value="">Selecciona una cuenta</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({formatCents(acc.balance)})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="toAccount">Cuenta Destino</label>
        <select id="toAccount" value={toAccountId} onChange={e => setToAccountId(e.target.value)} required>
          <option value="">Selecciona una cuenta</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({formatCents(acc.balance)})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Importe (€)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={amountInput}
          onChange={e => setAmountInput(e.target.value)}
          required
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Concepto de la transferencia"
        />
      </div>

      {error && <p style={{ color: '#d32f2f', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Procesando...' : 'Transferir'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
