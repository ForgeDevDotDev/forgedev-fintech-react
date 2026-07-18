import { useEffect, useState } from 'react';
import api from '../api';
import type { AuditLog } from '../types';

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 20;

  useEffect(() => {
    setLoading(true);
    api.getAuditLogs(page, limit)
      .then(res => setLogs(res.data.data))
      .catch(err => console.error('Failed to fetch audit logs', err))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1>Registro de Auditoría</h1>

      <div className="card">
        {loading && <p className="text-center">Cargando...</p>}

        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Entidad</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                {/* FIXME: inconsistent date formatting */}
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td>{log.user?.name || 'Sistema'}</td>
                <td>{log.action}</td>
                <td>{log.entity || '—'}</td>
                <td>{log.ipAddress || '—'}</td>
              </tr>
            ))}
            {logs.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="text-center">No hay registros de auditoría</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button
            className="btn btn-secondary"
            disabled={page <= 1}
            onClick={() => setPage(p => p - 1)}
          >
            ← Anterior
          </button>
          <span style={{ fontSize: '0.875rem', color: '#666' }}>Página {page}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setPage(p => p + 1)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
