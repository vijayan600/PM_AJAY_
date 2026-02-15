import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FolderOpen,
    Clock,
    CheckCircle2,
    IndianRupee,
    Upload,
    FileText,
    Bell,
} from 'lucide-react';
import {
    formatCurrency,
    getStatusColor,
    getStatusLabel,
    getProgressColor,
} from '../../utils/formatters';

/* ============================
   STATIC DASHBOARD DATA
============================ */
const STATIC_DASHBOARD_DATA = {
    total_projects: 12,
    in_progress: 7,
    completed: 5,
    total_budget: 12500000,

    projects: [
        {
            id: 1,
            name: 'Road Development Project',
            state_name: 'Tamil Nadu',
            project_id: 'TN-ROAD-001',
            status: 'IN_PROGRESS',
            progress_percent: 65,
            component_color: '#10B981',
        },
        {
            id: 2,
            name: 'Housing Scheme Phase II',
            state_name: 'Tamil Nadu',
            project_id: 'TN-HOUSE-002',
            status: 'COMPLETED',
            progress_percent: 100,
            component_color: '#6366F1',
        },
        {
            id: 3,
            name: 'Water Supply Upgrade',
            state_name: 'Kerala',
            project_id: 'KL-WATER-004',
            status: 'IN_PROGRESS',
            progress_percent: 40,
            component_color: '#F59E0B',
        },
    ],

    notifications: [
        {
            id: 1,
            title: 'Progress Due',
            message: 'Upload monthly progress report before 30th.',
            is_read: false,
        },
        {
            id: 2,
            title: 'Project Approved',
            message: 'Housing Scheme Phase II has been approved.',
            is_read: true,
        },
    ],
};

export default function AgencyDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ============================
       STATIC DATA LOADING
    ============================ */
    useEffect(() => {
        setTimeout(() => {
            setData(STATIC_DASHBOARD_DATA);
            setLoading(false);
        }, 400); // keeps skeleton animation
    }, []);

    if (loading) return <DashboardSkeleton />;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display text-slate-800">
                    Agency Dashboard
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Manage your assigned projects and upload progress reports
                </p>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: 'Total Projects',
                        value: data.total_projects,
                        icon: FolderOpen,
                        color: 'from-blue-500 to-indigo-600',
                    },
                    {
                        label: 'In Progress',
                        value: data.in_progress,
                        icon: Clock,
                        color: 'from-amber-500 to-orange-600',
                    },
                    {
                        label: 'Completed',
                        value: data.completed,
                        icon: CheckCircle2,
                        color: 'from-emerald-500 to-teal-600',
                    },
                    {
                        label: 'Total Budget',
                        value: formatCurrency(data.total_budget),
                        icon: IndianRupee,
                        color: 'from-purple-500 to-violet-600',
                    },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={i}
                            className="stat-card animate-slide-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div
                                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
                            >
                                <Icon size={18} className="text-white" />
                            </div>
                            <p className="text-sm text-slate-500">
                                {stat.label}
                            </p>
                            <p className="text-xl font-bold text-slate-800 font-display">
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ================= PROJECT LIST ================= */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-slate-800 text-lg font-display">
                                My Projects
                            </h2>
                            <Link
                                to="/agency/projects"
                                className="text-sm text-navy-500 hover:text-navy-600 font-semibold"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {data.projects.slice(0, 5).map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div
                                        className="w-2 h-10 rounded-full"
                                        style={{
                                            backgroundColor:
                                                project.component_color,
                                        }}
                                    ></div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-slate-800 text-sm truncate">
                                            {project.name}
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            {project.state_name} •{' '}
                                            {project.project_id}
                                        </p>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <span
                                            className={`badge ${getStatusColor(
                                                project.status
                                            )}`}
                                        >
                                            {getStatusLabel(project.status)}
                                        </span>

                                        <div className="mt-2 w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
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
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= ACTIONS + NOTIFICATIONS ================= */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h2 className="font-bold text-slate-800 text-lg font-display mb-4">
                            Quick Actions
                        </h2>

                        <div className="space-y-3">
                            <Link
                                to="/agency/upload-progress"
                                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 hover:border-emerald-200"
                            >
                                <Upload
                                    size={20}
                                    className="text-emerald-600"
                                />
                                <div>
                                    <p className="font-semibold text-emerald-800 text-sm">
                                        Upload Progress
                                    </p>
                                    <p className="text-xs text-emerald-600">
                                        Submit monthly report
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/agency/projects"
                                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200"
                            >
                                <FileText
                                    size={20}
                                    className="text-blue-600"
                                />
                                <div>
                                    <p className="font-semibold text-blue-800 text-sm">
                                        View Projects
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        Project details & milestones
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {data.notifications.length > 0 && (
                        <div className="glass-card p-6">
                            <h2 className="font-bold text-slate-800 text-lg font-display mb-4 flex items-center gap-2">
                                <Bell size={18} /> Notifications
                            </h2>

                            <div className="space-y-3">
                                {data.notifications.slice(0, 4).map((n) => (
                                    <div
                                        key={n.id}
                                        className={`p-3 rounded-lg border text-sm ${
                                            n.is_read
                                                ? 'bg-white border-slate-100'
                                                : 'bg-blue-50 border-blue-100'
                                        }`}
                                    >
                                        <p className="font-semibold text-slate-700 text-xs">
                                            {n.title}
                                        </p>
                                        <p className="text-slate-500 text-xs mt-0.5">
                                            {n.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ============================
   SKELETON (UNCHANGED)
============================ */
function DashboardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-72 mb-8"></div>
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-28 bg-slate-200 rounded-2xl"
                    ></div>
                ))}
            </div>
            <div className="h-64 bg-slate-200 rounded-2xl"></div>
        </div>
    );
}
