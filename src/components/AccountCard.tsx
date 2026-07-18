import type { Account } from '../types';
import { formatCents } from '../utils/format';

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const typeLabels: Record<string, string> = {
    checking: 'Corriente',
    savings: 'Ahorro',
    credit: 'Crédito',
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        opacity: account.isActive ? 1 : 0.5,
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{account.name}</h3>
        <span style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: account.type === 'checking' ? '#e3f2fd' : account.type === 'savings' ? '#e8f5e9' : '#fce4ec',
          color: account.type === 'checking' ? '#1565c0' : account.type === 'savings' ? '#2e7d32' : '#c62828',
        }}>
          {typeLabels[account.type] || account.type}
        </span>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#999', marginBottom: '1rem', fontFamily: 'monospace' }}>
        {account.iban}
      </p>
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: account.balance < 0 ? '#d32f2f' : '#333',
      }}>
        {formatCents(account.balance)}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#999' }}>
        <span>{account.currency}</span>
        <span>{account.type}</span>
      </div>
    </div>
  );
}
