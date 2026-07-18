import { Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import TransferPage from './pages/TransferPage';
import BudgetsPage from './pages/BudgetsPage';
import AuditLogPage from './pages/AuditLogPage';

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transacciones</Link>
        <Link to="/transfer">Transferir</Link>
        <Link to="/budgets">Presupuestos</Link>
        <Link to="/audit-logs">Auditoría</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/audit-logs" element={<AuditLogPage />} />
        </Routes>
      </main>
    </div>
  );
}
