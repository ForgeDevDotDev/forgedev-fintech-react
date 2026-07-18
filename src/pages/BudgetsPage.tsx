import { useEffect } from 'react';
import { useBudgetsStore } from '../stores/budgets';
import BudgetChart from '../components/BudgetChart';

export default function BudgetsPage() {
  const { budgets, loading, error, fetchBudgets } = useBudgetsStore();

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // TODO: Add charts library (e.g. recharts or chart.js)
  // For now we just use the BudgetChart component which is a simple progress bar

  return (
    <div>
      <h1>Presupuestos</h1>

      {error && <div className="card"><p className="text-danger">Error: {error}</p></div>}

      {/* Missing loading state — should show a spinner here */}
      {!loading && budgets.length === 0 && !error && (
        <div className="card text-center">
          <p>No hay presupuestos creados.</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
        {budgets.map(budget => (
          <div key={budget.id} className="card">
            <BudgetChart budget={budget} />
          </div>
        ))}
      </div>
    </div>
  );
}
