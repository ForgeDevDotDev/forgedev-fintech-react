import type { Account, Category } from '../types';

interface FilterBarProps {
  filters: {
    accountId: string | null;
    categoryId: string | null;
    startDate: string | null;
    endDate: string | null;
    status: string | null;
  };
  accounts: Account[];
  categories: Category[];
  onFilterChange: (key: string, value: string | null) => void;
  onReset: () => void;
}

export default function FilterBar({ filters, accounts, categories, onFilterChange, onReset }: FilterBarProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Cuenta</label>
        <select
          value={filters.accountId || ''}
          onChange={e => onFilterChange('accountId', e.target.value || null)}
          style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }}
        >
          <option value="">Todas</option>
          {accounts.map(acc => (
            <option key={acc.id} value={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Categoría</label>
        <select
          value={filters.categoryId || ''}
          onChange={e => onFilterChange('categoryId', e.target.value || null)}
          style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }}
        >
          <option value="">Todas</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Estado</label>
        <select
          value={filters.status || ''}
          onChange={e => onFilterChange('status', e.target.value || null)}
          style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }}
        >
          <option value="">Todos</option>
          <option value="completed">Completado</option>
          <option value="pending">Pendiente</option>
          <option value="failed">Fallido</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Desde</label>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={e => onFilterChange('startDate', e.target.value || null)}
          style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>Hasta</label>
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={e => onFilterChange('endDate', e.target.value || null)}
          style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.875rem' }}
        />
      </div>

      <button className="btn btn-secondary" onClick={onReset}>Limpiar filtros</button>
    </div>
  );
}
