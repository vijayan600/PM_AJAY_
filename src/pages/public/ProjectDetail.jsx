import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Calendar, IndianRupee, Users, Building2,
  CheckCircle2, Clock, Image, ArrowLeft
} from 'lucide-react';
import {
  formatCurrency,
  formatNumber,
  formatDate,
  getStatusColor,
  getStatusLabel
} from '../../utils/formatters';

/* ================= STATIC PROJECT DATA ================= */

const PROJECTS = [
  {
    id: '1',
    project_id: 'PMJ-001',
    name: 'SC Housing Development Project',
    description: 'Construction of permanent houses for SC beneficiaries.',
    status: 'IN_PROGRESS',
    progress_percent: 65,
    component_name: 'Infrastructure',
    component_color: '#3B82F6',
    state_name: 'Tamil Nadu',
    district_name: 'Chennai',
    agency_name: 'ABC Constructions',
    start_date: '2023-01-01',
    end_date: '2024-12-31',
    duration_months: 24,

    total_budget: 25000000,
    centre_share: 15000000,
    state_share: 10000000,
    total_allocated: 25000000,
    total_released: 15000000,
    total_spent: 12000000,

    target_beneficiaries: 500,
    actual_beneficiaries: 320,

    sc_beneficiaries: 320,
    st_beneficiaries: 0,
    obc_beneficiaries: 0,
    general_beneficiaries: 0,
    male_beneficiaries: 180,
    female_beneficiaries: 140,

    villages_covered: ['Village A', 'Village B'],
    block_taluk: 'Ambattur',
    created_by: 'State Officer - TN',

    milestones: [
      {
        id: 1,
        milestone_number: 1,
        name: 'Foundation Work',
        status: 'COMPLETED',
        target_date: '2023-03-31',
        completion_date: '2023-03-20',
        budget_allocation: 5000000,
      },
      {
        id: 2,
        milestone_number: 2,
        name: 'Structure Construction',
        status: 'IN_PROGRESS',
        target_date: '2023-12-31',
        budget_allocation: 10000000,
      },
    ],

    financials: [
      {
        id: 1,
        milestone_id: 1,
        allocated_amount: 5000000,
        released_amount: 5000000,
        spent_amount: 4800000,
        utilization_percent: 96,
      },
      {
        id: 2,
        milestone_id: 2,
        allocated_amount: 10000000,
        released_amount: 7000000,
        spent_amount: 6000000,
        utilization_percent: 60,
      },
    ],

    photos: [
      { id: 1, caption: 'Foundation completed' },
      { id: 2, caption: 'Structure under construction' },
    ],
  },
];

/* ================= COMPONENT ================= */

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'financials', label: 'Financials' },
    { id: 'beneficiaries', label: 'Beneficiaries' },
  ];

  return (
    <div className="page-container">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 mb-6">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* HEADER */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                {project.project_id}
              </span>
              <span className={`badge ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="text-slate-500 mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex gap-1"><MapPin size={14} /> {project.state_name}</span>
              <span className="flex gap-1"><Building2 size={14} /> {project.agency_name}</span>
              <span className="flex gap-1"><Calendar size={14} /> {formatDate(project.start_date)} – {formatDate(project.end_date)}</span>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">{project.progress_percent}%</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Overall Progress</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Total Budget" value={formatCurrency(project.total_budget)} icon={IndianRupee} />
        <Stat label="Funds Released" value={formatCurrency(project.total_released)} icon={IndianRupee} />
        <Stat label="Beneficiaries" value={`${project.actual_beneficiaries} / ${project.target_beneficiaries}`} icon={Users} />
        <Stat label="Duration" value={`${project.duration_months} months`} icon={Clock} />
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-8 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold ${
              activeTab === t.id ? 'bg-white shadow text-navy-600' : 'text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="glass-card p-6">
          <p><b>Block / Taluk:</b> {project.block_taluk}</p>
          <p><b>Villages:</b> {project.villages_covered.join(', ')}</p>
          <p><b>Centre Share:</b> {formatCurrency(project.centre_share)}</p>
          <p><b>State Share:</b> {formatCurrency(project.state_share)}</p>
        </div>
      )}

      {/* MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          {project.milestones.map(m => (
            <div key={m.id} className="glass-card p-4 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                {m.status === 'COMPLETED' ? <CheckCircle2 className="text-emerald-500" /> : m.milestone_number}
              </div>
              <div>
                <p className="font-bold">{m.name}</p>
                <p className="text-sm text-slate-500">Target: {formatDate(m.target_date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FINANCIALS */}
      {activeTab === 'financials' && (
        <div className="glass-card p-6">
          <p><b>Allocated:</b> {formatCurrency(project.total_allocated)}</p>
          <p><b>Released:</b> {formatCurrency(project.total_released)}</p>
          <p><b>Spent:</b> {formatCurrency(project.total_spent)}</p>
        </div>
      )}

      {/* BENEFICIARIES */}
      {activeTab === 'beneficiaries' && (
        <div className="glass-card p-6">
          <p>SC: {formatNumber(project.sc_beneficiaries)}</p>
          <p>Male: {formatNumber(project.male_beneficiaries)}</p>
          <p>Female: {formatNumber(project.female_beneficiaries)}</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <Icon size={18} />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
