import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Globe,
    FolderOpen,
    IndianRupee,
    Users,
    TrendingUp,
    AlertTriangle,
    Shield,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
} from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const COLORS = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#F97316',
];

/* ============================
   STATIC CENTRAL DASHBOARD DATA
============================ */
const STATIC_DATA = {
    total_projects: 1240,
    total_states: 36,
    total_budget: 87500000000,
    total_beneficiaries: 4280000,

    in_progress: 540,
    completed: 620,
    delayed: 60,
    not_started: 20,

    state_performance: [
        {
            state_name: 'Tamil Nadu',
            code: 'TN',
            total_projects: 124,
            total_budget: 9500000000,
            completion_rate: 72,
        },
        {
            state_name: 'Maharashtra',
            code: 'MH',
            total_projects: 140,
            total_budget: 11200000000,
            completion_rate: 68,
        },
        {
            state_name: 'Karnataka',
            code: 'KA',
            total_projects: 98,
            total_budget: 7400000000,
            completion_rate: 70,
        },
        {
            state_name: 'Kerala',
            code: 'KL',
            total_projects: 76,
            total_budget: 5600000000,
            completion_rate: 75,
        },
        {
            state_name: 'Uttar Pradesh',
            code: 'UP',
            total_projects: 220,
            total_budget: 16500000000,
            completion_rate: 61,
        },
    ],

    escalations: [
        {
            issue_type: 'Fund Utilization Delay',
            priority: 'High',
            description: 'Utilization certificate pending beyond deadline.',
            state_name: 'Uttar Pradesh',
            project_id: 'UP-HOUSE-019',
        },
        {
            issue_type: 'Construction Delay',
            priority: 'Critical',
            description: 'Project delayed due to contractor issues.',
            state_name: 'Maharashtra',
            project_id: 'MH-ROAD-033',
        },
    ],
};

export default function CentralDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setData(STATIC_DATA);
            setLoading(false);
        }, 400);
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-10 bg-slate-200 rounded w-64 mb-8"></div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="h-80 bg-slate-200 rounded-2xl"></div>
                    <div className="h-80 bg-slate-200 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    const stateChartData = data.state_performance.map((s) => ({
        name: s.code,
        projects: s.total_projects,
        budget: s.total_budget / 10000000,
    }));

    const statusData = [
        { name: 'In Progress', value: data.in_progress },
        { name: 'Completed', value: data.completed },
        { name: 'Delayed', value: data.delayed },
        { name: 'Not Started', value: data.not_started },
    ];

    return (
        <div>
            {/* HEADER */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 p-8 mb-8">
                <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                        <Shield size={20} className="text-white/80" />
                        <span className="text-sm text-white/80">
                            Central Ministry Dashboard
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        National Overview
                    </h1>
                    <p className="text-white/70">
                        PM-AJAY Scheme Monitoring
                    </p>
                </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: 'Total Projects',
                        value: data.total_projects,
                        icon: FolderOpen,
                        color: 'from-blue-500 to-indigo-600',
                        trend: '+12%',
                    },
                    {
                        label: 'States Active',
                        value: data.total_states,
                        icon: Globe,
                        color: 'from-emerald-500 to-teal-600',
                        trend: 'Nationwide',
                    },
                    {
                        label: 'Total Budget',
                        value: formatCurrency(data.total_budget),
                        icon: IndianRupee,
                        color: 'from-purple-500 to-violet-600',
                        trend: '+8%',
                    },
                    {
                        label: 'Beneficiaries',
                        value: formatNumber(data.total_beneficiaries),
                        icon: Users,
                        color: 'from-orange-500 to-amber-600',
                        trend: '+15%',
                    },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="stat-card">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                <Icon size={22} className="text-white" />
                            </div>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {stat.value}
                            </p>
                            <p className="text-xs text-emerald-600 mt-1">
                                <TrendingUp size={12} className="inline" /> {stat.trend}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="font-bold text-lg mb-4">
                        State-wise Projects & Budget
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stateChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="projects" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="budget" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card p-6">
                    <h2 className="font-bold mb-4">Project Status</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" innerRadius={55} outerRadius={80}>
                                {statusData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ALERTS */}
            <div className="glass-card p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" />
                    Active Alerts
                </h2>
                {data.escalations.length === 0 ? (
                    <p className="text-center text-slate-400 py-6">
                        No active alerts
                    </p>
                ) : (
                    <div className="space-y-3">
                        {data.escalations.map((e, i) => (
                            <div key={i} className="p-4 rounded-xl border bg-slate-50">
                                <p className="font-semibold text-slate-700">
                                    {e.issue_type} ({e.priority})
                                </p>
                                <p className="text-xs text-slate-500">
                                    {e.description}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {e.state_name} • {e.project_id}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
