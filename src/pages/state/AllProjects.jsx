import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  getProgressColor,
} from '../../utils/formatters';

/* ================= STATIC PROJECT DATA ================= */

const STATE_PROJECTS = [
  {
    id: '1',
    project_id: 'PMJ-TN-001',
    name: 'SC Housing Scheme',
    district_name: 'Chennai',
    agency_name: 'ABC Constructions',
    total_budget: 25000000,
    progress_percent: 60,
    status: 'IN_PROGRESS',
  },
  {
    id: '2',
    project_id: 'PMJ-TN-002',
    name: 'Skill Training Program',
    district_name: 'Coimbatore',
    agency_name: 'Skill India Org',
    total_budget: 18000000,
    progress_percent: 100,
    status: 'COMPLETED',
  },
  {
    id: '3',
    project_id: 'PMJ-TN-003',
    name: 'Drinking Water Project',
    district_name: 'Madurai',
    agency_name: 'Water Works Dept',
    total_budget: 12000000,
    progress_percent: 25,
    status: 'IN_PROGRESS',
  },
];

/* ================= COMPONENT ================= */

export default function StateProjects() {
  const [projects] = useState(STATE_PROJECTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = projects.filter(p => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.project_id.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      !statusFilter || p.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">
            All Projects
          </h1>
          <p className="text-slate-500 text-sm">
            Manage and monitor all state projects
          </p>
        </div>
        <Link to="/state/create-project" className="btn-saffron text-sm">
          + New Project
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input-field !pl-11"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="input-field !w-auto min-w-[150px]"
        >
          <option value="">All Status</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="DELAYED">Delayed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-container overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Project ID</th>
              <th className="table-header">Name</th>
              <th className="table-header">Agency</th>
              <th className="table-header">Budget</th>
              <th className="table-header">Progress</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr
                key={p.id}
                className="border-t border-slate-50 hover:bg-slate-50/50"
              >
                <td className="table-cell">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {p.project_id}
                  </span>
                </td>

                <td className="table-cell">
                  <Link
                    to={`/projects/${p.id}`}
                    className="font-semibold text-slate-800 hover:text-navy-600"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {p.district_name}
                  </p>
                </td>

                <td className="table-cell text-sm">{p.agency_name}</td>

                <td className="table-cell font-semibold text-sm">
                  {formatCurrency(p.total_budget)}
                </td>

                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                      <div
                        className={`h-full rounded-full ${getProgressColor(
                          p.progress_percent
                        )}`}
                        style={{ width: `${p.progress_percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold">
                      {p.progress_percent}%
                    </span>
                  </div>
                </td>

                <td className="table-cell">
                  <span className={`badge ${getStatusColor(p.status)}`}>
                    {getStatusLabel(p.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}
