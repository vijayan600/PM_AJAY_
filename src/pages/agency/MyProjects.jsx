import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, IndianRupee, Search } from 'lucide-react';
import {
    formatCurrency,
    formatDate,
    getStatusColor,
    getStatusLabel,
    getProgressColor,
} from '../../utils/formatters';

/* ============================
   STATIC PROJECT DATA
============================ */
const STATIC_PROJECTS = [
    {
        id: 1,
        project_id: 'TN-ROAD-001',
        name: 'Road Development Project',
        state_name: 'Tamil Nadu',
        status: 'IN_PROGRESS',
        progress_percent: 65,
        end_date: '2025-06-30',
        total_budget: 4500000,
        component_color: '#10B981',
    },
    {
        id: 2,
        project_id: 'TN-HOUSE-002',
        name: 'Housing Scheme Phase II',
        state_name: 'Tamil Nadu',
        status: 'COMPLETED',
        progress_percent: 100,
        end_date: '2024-12-31',
        total_budget: 7200000,
        component_color: '#6366F1',
    },
    {
        id: 3,
        project_id: 'KL-WATER-004',
        name: 'Water Supply Upgrade',
        state_name: 'Kerala',
        status: 'IN_PROGRESS',
        progress_percent: 40,
        end_date: '2025-03-15',
        total_budget: 3800000,
        component_color: '#F59E0B',
    },
];

export default function AgencyProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    /* ============================
       STATIC DATA LOAD
    ============================ */
    useEffect(() => {
        setTimeout(() => {
            setProjects(STATIC_PROJECTS);
            setLoading(false);
        }, 300);
    }, []);

    const filtered = projects.filter(
        (p) =>
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.project_id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-display text-slate-800">
                        My Projects
                    </h1>
                    <p className="text-slate-500 text-sm">
                        All projects assigned to your agency
                    </p>
                </div>
            </div>

            <div className="relative w-full max-w-md mb-6">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="input-field !pl-11"
                />
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-24 bg-slate-200 rounded-2xl animate-pulse"
                        ></div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500">No projects found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((project) => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="block glass-card p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div
                                    className="w-2 h-full min-h-[40px] rounded-full hidden sm:block"
                                    style={{
                                        backgroundColor:
                                            project.component_color ||
                                            '#3B82F6',
                                    }}
                                ></div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                            {project.project_id}
                                        </span>
                                        <span
                                            className={`badge ${getStatusColor(
                                                project.status
                                            )}`}
                                        >
                                            {getStatusLabel(project.status)}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-800 group-hover:text-navy-600 transition-colors">
                                        {project.name}
                                    </h3>

                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />{' '}
                                            {project.state_name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> Due:{' '}
                                            {formatDate(project.end_date)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <IndianRupee size={14} />{' '}
                                            {formatCurrency(
                                                project.total_budget
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right flex-shrink-0">
                                    <div className="text-2xl font-bold font-display text-slate-800">
                                        {project.progress_percent}%
                                    </div>
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
                                        <div
                                            className={`h-full rounded-full ${getProgressColor(
                                                project.progress_percent
                                            )}`}
                                            style={{
                                                width: `${project.progress_percent}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
