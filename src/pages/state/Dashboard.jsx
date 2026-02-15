import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FolderOpen,
    CheckCircle2,
    AlertTriangle,
    IndianRupee,
    Clock,
    TrendingUp,
    PlusCircle,
    ClipboardCheck,
    Building2
} from 'lucide-react';
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import { formatCurrency, getStatusColor, getStatusLabel } from '../../utils/formatters';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

/* ---------------- MOCK DATA ---------------- */
const mockData = {
    state_name: 'Tamil Nadu',
    total_projects: 24,
    in_progress: 12,
    completed: 8,
    delayed: 3,
    not_started: 1,
    total_budget: 125000000,
    pending_approvals: 2,

    monthly_progress: [
        { month: 'Jul', projects: 2, funds: 5 },
        { month: 'Aug', projects: 4, funds: 9 },
        { month: 'Sep', projects: 6, funds: 14 },
        { month: 'Oct', projects: 8, funds: 18 },
        { month: 'Nov', projects: 10, funds: 23 },
        { month: 'Dec', projects: 12, funds: 28 },
    ],

    recent_projects: [
        {
            id: 1,
            name: 'School Building Construction',
            project_id: 'TN-EDU-001',
            status: 'IN_PROGRESS',
            component_color: '#3B82F6'
        },
        {
            id: 2,
            name: 'Primary Health Centre Upgrade',
            project_id: 'TN-HLT-004',
            status: 'COMPLETED',
            component_color: '#10B981'
        },
        {
            id: 3,
            name: 'Road Development Project',
            project_id: 'TN-INF-010',
            status: 'DELAYED',
            component_color: '#EF4444'
        },
    ],

    top_agencies: [
        { name: 'ABC Constructions', total_projects: 6, performance_score: 88 },
        { name: 'BuildWell Infra', total_projects: 5, performance_score: 82 },
        { name: 'National Works Ltd', total_projects: 4, performance_score: 78 },
    ],
};
/* ------------------------------------------------ */

export default function StateDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API delay
        setTimeout(() => {
            setData(mockData);
            setLoading(false);
        }, 600);
    }, []);

    if (loading) return <DashboardSkeleton />;

    const statusData = [
        { name: 'In Progress', value: data.in_progress },
        { name: 'Completed', value: data.completed },
        { name: 'Delayed', value: data.delayed },
        { name: 'Not Started', value: data.not_started },
    ].filter(s => s.value > 0);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display text-slate-800">
                        State Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {data.state_name} — Project Management Overview
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link to="/state/create-project" className="btn-saffron text-sm flex items-center gap-2">
                        <PlusCircle size={16} /> New Project
                    </Link>
                    <Link to="/state/approvals" className="btn-outline text-sm flex items-center gap-2">
                        <ClipboardCheck size={16} /> Approvals
                        {data.pending_approvals > 0 && (
                            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                {data.pending_approvals}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                    { label: 'Total Projects', value: data.total_projects, icon: FolderOpen, color: 'from-blue-500 to-indigo-600' },
                    { label: 'In Progress', value: data.in_progress, icon: Clock, color: 'from-amber-500 to-orange-600' },
                    { label: 'Completed', value: data.completed, icon: CheckCircle2, color: 'from-emerald-500 to-teal-600' },
                    { label: 'Delayed', value: data.delayed, icon: AlertTriangle, color: 'from-red-500 to-rose-600' },
                    { label: 'Total Budget', value: formatCurrency(data.total_budget), icon: IndianRupee, color: 'from-purple-500 to-violet-600' },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="stat-card">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <Icon size={18} className="text-white" />
                            </div>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                            <p className="text-xl font-bold text-slate-800 font-display">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-6 font-display">Monthly Progress</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={data.monthly_progress}>
                            <defs>
                                <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="projects" stroke="#3B82F6" fill="url(#colorProjects)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-6 font-display">Status Breakdown</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" innerRadius={50} outerRadius={75}>
                                {statusData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Projects & Agencies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-4 font-display">Recent Projects</h3>
                    <div className="space-y-3">
                        {data.recent_projects.map(p => (
                            <div key={p.id} className="flex items-center gap-3">
                                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: p.component_color }}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{p.name}</p>
                                    <p className="text-xs text-slate-500">{p.project_id}</p>
                                </div>
                                <span className={`badge ${getStatusColor(p.status)}`}>
                                    {getStatusLabel(p.status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-4 font-display flex items-center gap-2">
                        <Building2 size={18} /> Top Agencies
                    </h3>
                    <div className="space-y-3">
                        {data.top_agencies.map((a, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">{a.name}</p>
                                    <p className="text-xs text-slate-500">{a.total_projects} projects</p>
                                </div>
                                <span className="text-emerald-600 font-bold">{a.performance_score}/100</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-5 gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>
                ))}
            </div>
        </div>
    );
}
