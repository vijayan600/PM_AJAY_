import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, MapPin, IndianRupee, X
} from 'lucide-react';
import {
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  getProgressColor
} from '../../utils/formatters';

/* ================== STATIC DATA ================== */

const STATES = [
  { id: 'TN', name: 'Tamil Nadu' },
  { id: 'KA', name: 'Karnataka' },
];

const COMPONENTS = [
  { id: 'INFRA', name: 'Infrastructure' },
  { id: 'SKILL', name: 'Skill Development' },
];

const PROJECTS = [
  {
    id: 1,
    project_id: 'PMJ-001',
    name: 'SC Housing Project',
    state: 'TN',
    state_name: 'Tamil Nadu',
    district_name: 'Chennai',
    component: 'INFRA',
    component_name: 'Infrastructure',
    component_color: '#3B82F6',
    status: 'IN_PROGRESS',
    progress_percent: 55,
    total_budget: 25000000,
  },
  {
    id: 2,
    project_id: 'PMJ-002',
    name: 'Skill Training Centre',
    state: 'KA',
    state_name: 'Karnataka',
    district_name: 'Bengaluru',
    component: 'SKILL',
    component_name: 'Skill Development',
    component_color: '#10B981',
    status: 'COMPLETED',
    progress_percent: 100,
    total_budget: 18000000,
  },
];

/* ================== COMPONENT ================== */

export default function SearchProjects() {
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    state: '',
    component: '',
    status: '',
  });

  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({ search: '', state: '', component: '', status: '' });

  const filteredProjects = PROJECTS.filter(p => {
    return (
      (!filters.search ||
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.project_id.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.state || p.state === filters.state) &&
      (!filters.component || p.component === filters.component) &&
      (!filters.status || p.status === filters.status)
    );
  });

  const activeFilterCount =
    [filters.state, filters.component, filters.status].filter(Boolean).length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">
          Explore Projects
        </h1>
        <p className="text-slate-500">
          Search and filter government projects
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={e => updateFilter('search', e.target.value)}
            placeholder="Search by project name or ID..."
            className="input-field !pl-11"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-outline !px-4 flex items-center gap-2 ${
            activeFilterCount > 0 ? '!bg-navy-500 !text-white' : ''
          }`}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={filters.state}
              onChange={e => updateFilter('state', e.target.value)}
              className="input-field"
            >
              <option value="">All States</option>
              {STATES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={filters.component}
              onChange={e => updateFilter('component', e.target.value)}
              className="input-field"
            >
              <option value="">All Components</option>
              {COMPONENTS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={e => updateFilter('status', e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-red-500 flex items-center gap-1"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <Search size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group rounded-2xl bg-white border border-slate-100 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="h-1.5" style={{ backgroundColor: project.component_color }} />
              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  <span className="text-xs font-mono bg-slate-100 px-2 rounded">
                    {project.project_id}
                  </span>
                  <span className={`badge ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                  <MapPin size={14} /> {project.state_name}
                </p>
                <div className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-bold">{project.progress_percent}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div
                      className={`h-full ${getProgressColor(project.progress_percent)}`}
                      style={{ width: `${project.progress_percent}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <IndianRupee size={14} />
                    {formatCurrency(project.total_budget)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {project.component_name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
