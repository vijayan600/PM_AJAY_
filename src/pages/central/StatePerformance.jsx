import { useState, useEffect } from 'react';
import {
    Globe,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

/* ============================
   STATIC STATE PERFORMANCE DATA
============================ */
const STATIC_STATES = [
    {
        id: 1,
        state_name: 'Tamil Nadu',
        code: 'TN',
        total_projects: 124,
        total_budget: 9500000000,
        completion_rate: 72,
        in_progress: 38,
        completed: 79,
        delayed: 7,
    },
    {
        id: 2,
        state_name: 'Maharashtra',
        code: 'MH',
        total_projects: 140,
        total_budget: 11200000000,
        completion_rate: 68,
        in_progress: 52,
        completed: 81,
        delayed: 7,
    },
    {
        id: 3,
        state_name: 'Karnataka',
        code: 'KA',
        total_projects: 98,
        total_budget: 7400000000,
        completion_rate: 70,
        in_progress: 28,
        completed: 64,
        delayed: 6,
    },
    {
        id: 4,
        state_name: 'Kerala',
        code: 'KL',
        total_projects: 76,
        total_budget: 5600000000,
        completion_rate: 75,
        in_progress: 18,
        completed: 55,
        delayed: 3,
    },
    {
        id: 5,
        state_name: 'Uttar Pradesh',
        code: 'UP',
        total_projects: 220,
        total_budget: 16500000000,
        completion_rate: 61,
        in_progress: 96,
        completed: 112,
        delayed: 12,
    },
    {
        id: 6,
        state_name: 'Rajasthan',
        code: 'RJ',
        total_projects: 84,
        total_budget: 6100000000,
        completion_rate: 66,
        in_progress: 31,
        completed: 48,
        delayed: 5,
    },
];

export default function StatePerformance() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('completion_rate');

    /* ============================
       STATIC LOAD
    ============================ */
    useEffect(() => {
        setTimeout(() => {
            setStates(STATIC_STATES);
            setLoading(false);
        }, 400);
    }, []);

    const sorted = [...states].sort(
        (a, b) => (b[sortBy] || 0) - (a[sortBy] || 0)
    );

    const chartData = sorted.slice(0, 10).map((s) => ({
        name: s.code,
        completion: s.completion_rate,
    }));

    return (
        <div>
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-3">
                    <Globe className="text-blue-500" /> State Performance
                </h1>
                <p className="text-slate-500 text-sm">
                    Compare performance metrics across all states
                </p>
            </div>

            {/* SORT BAR */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-slate-500">Sort by:</span>
                {[
                    { key: 'completion_rate', label: 'Completion' },
                    { key: 'total_projects', label: 'Projects' },
                    { key: 'total_budget', label: 'Budget' },
                ].map((s) => (
                    <button
                        key={s.key}
                        onClick={() => setSortBy(s.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            sortBy === s.key
                                ? 'bg-navy-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* CHART */}
            <div className="glass-card p-6 mb-8">
                <h3 className="font-bold text-slate-800 mb-6 font-display">
                    Completion Rate by State
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                        />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="completion"
                            fill="#10B981"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* STATE CARDS */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-48 bg-slate-200 rounded-2xl animate-pulse"
                        ></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.map((state, i) => (
                        <div
                            key={state.id}
                            className="glass-card p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xs font-bold">
                                        #{i + 1}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">
                                        {state.state_name}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {state.code}
                                    </p>
                                </div>
                                {state.completion_rate >= 50 ? (
                                    <TrendingUp
                                        size={16}
                                        className="text-emerald-500 ml-auto"
                                    />
                                ) : (
                                    <TrendingDown
                                        size={16}
                                        className="text-red-500 ml-auto"
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-slate-50 text-center">
                                    <p className="text-xs text-slate-500">
                                        Projects
                                    </p>
                                    <p className="text-lg font-bold text-slate-800 font-display">
                                        {state.total_projects}
                                    </p>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-50 text-center">
                                    <p className="text-xs text-slate-500">
                                        Budget
                                    </p>
                                    <p className="text-lg font-bold text-slate-800 font-display">
                                        {formatCurrency(
                                            state.total_budget
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-500">
                                        Completion
                                    </span>
                                    <span
                                        className={`font-bold ${
                                            state.completion_rate >= 50
                                                ? 'text-emerald-600'
                                                : 'text-amber-600'
                                        }`}
                                    >
                                        {state.completion_rate}%
                                    </span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${
                                            state.completion_rate >= 50
                                                ? 'bg-emerald-500'
                                                : 'bg-amber-500'
                                        }`}
                                        style={{
                                            width: `${state.completion_rate}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Active
                                    </p>
                                    <p className="text-sm font-bold text-blue-600">
                                        {state.in_progress}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Done
                                    </p>
                                    <p className="text-sm font-bold text-emerald-600">
                                        {state.completed}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Delayed
                                    </p>
                                    <p className="text-sm font-bold text-red-600">
                                        {state.delayed}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
