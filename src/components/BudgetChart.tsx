import type { Budget } from '../types';
import { formatCents } from '../utils/format';

interface BudgetChartProps {
  budget: Budget;
}

export default function BudgetChart({ budget }: BudgetChartProps) {
  const percentage = budget.percentage || 0;
  const isOver = percentage > 100;
  const barColor = isOver ? '#d32f2f' : percentage > 80 ? '#ff9800' : '#4caf50';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{budget.category?.name || 'Categoría'}</h3>
        <span style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>{budget.period}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>Gastado</span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{formatCents(budget.spent || 0)}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>Límite</span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{formatCents(budget.limit)}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>Restante</span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: (budget.remaining || 0) < 0 ? '#d32f2f' : '#333' }}>
            {formatCents(budget.remaining || 0)}
          </span>
        </div>
      </div>

      {/* Simple progress bar — TODO: replace with a real chart library */}
      <div style={{
        height: '8px',
        background: '#eee',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '0.5rem',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(percentage, 100)}%`,
          background: barColor,
          borderRadius: '4px',
          transition: 'width 0.3s ease',
        }} />
      </div>

      <p style={{
        fontSize: '0.85rem',
        textAlign: 'center',
        color: isOver ? '#d32f2f' : '#666',
        fontWeight: isOver ? 600 : 400,
      }}>
        {Math.round(percentage)}% utilizado
      </p>
    </div>
  );
}
