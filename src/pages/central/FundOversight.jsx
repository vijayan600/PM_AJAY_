import { useState, useEffect } from 'react';
import {
    IndianRupee,
    Wallet,
    PiggyBank,
    ArrowUpRight,
    AlertCircle,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

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
   STATIC FUND DATA
============================ */
const STATIC_DATA = {
    total_allocated: 87500000000,
    total_released: 64200000000,
    total_spent: 51800000000,

    monthly_funds: [
        { month: 'Jul', allocated: 50, released: 30, spent: 25 },
        { month: 'Aug', allocated: 65, released: 45, spent: 35 },
        { month: 'Sep', allocated: 80, released: 55, spent: 45 },
        { month: 'Oct', allocated: 100, released: 70, spent: 60 },
        { month: 'Nov', allocated: 120, released: 85, spent: 70 },
        { month: 'Dec', allocated: 145, released: 100, spent: 85 },
    ],

    state_funds: [
        {
            state_name: 'Tamil Nadu',
            allocated_amount: 9500000000,
            released_amount: 7200000000,
            spent_amount: 6800000000,
        },
        {
            state_name: 'Maharashtra',
            allocated_amount: 11200000000,
            released_amount: 8600000000,
            spent_amount: 7900000000,
        },
        {
            state_name: 'Karnataka',
            allocated_amount: 7400000000,
            released_amount: 5600000000,
            spent_amount: 5100000000,
        },
        {
            state_name: 'Uttar Pradesh',
            allocated_amount: 16500000000,
            released_amount: 11200000000,
            spent_amount: 9800000000,
        },
        {
            state_name: 'Kerala',
            allocated_amount: 5600000000,
            released_amount: 4200000000,
            spent_amount: 3950000000,
        },
    ],
};

export default function FundOversight() {
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
                        <div
                            key={i}
                            className="h-32 bg-slate-200 rounded-2xl"
                        ></div>
                    ))}
                </div>
                <div className="h-80 bg-slate-200 rounded-2xl"></div>
            </div>
        );
    }

    const utilizationRate = Math.round(
        (data.total_spent / data.total_allocated) * 100
    );

    const stateUtilization = data.state_funds.map((s) => ({
        name: s.state_name.substring(0, 3).toUpperCase(),
        utilization: Math.round(
            (s.spent_amount / s.allocated_amount) * 100
        ),
    }));

    return (
        <div>
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-3">
                    <IndianRupee className="text-purple-500" /> Fund Oversight
                </h1>
                <p className="text-slate-500 text-sm">
                    National fund allocation, release, and utilization tracking
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: 'Total Allocated',
                        value: formatCurrency(data.total_allocated),
                        icon: Wallet,
                        color: 'from-blue-500 to-indigo-600',
                        subtext: 'Centre + State share',
                    },
                    {
                        label: 'Total Released',
                        value: formatCurrency(data.total_released),
                        icon: ArrowUpRight,
                        color: 'from-emerald-500 to-teal-600',
                        subtext: `${Math.round(
                            (data.total_released / data.total_allocated) * 100
                        )}% of allocated`,
                    },
                    {
                        label: 'Total Spent',
                        value: formatCurrency(data.total_spent),
                        icon: PiggyBank,
                        color: 'from-purple-500 to-violet-600',
                        subtext: `${utilizationRate}% utilization`,
                    },
                    {
                        label: 'Pending Release',
                        value: formatCurrency(
                            data.total_allocated - data.total_released
                        ),
                        icon: AlertCircle,
                        color: 'from-amber-500 to-orange-600',
                        subtext: 'Awaiting release',
                    },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="stat-card">
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
                            >
                                <Icon size={22} className="text-white" />
                            </div>
                            <p className="text-sm text-slate-500">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-slate-800 font-display">
                                {stat.value}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                {stat.subtext}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* MONTHLY FLOW */}
                <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-6 font-display">
                        Monthly Fund Flow (₹ Cr)
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={data.monthly_funds}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="allocated"
                                stroke="#3B82F6"
                                fillOpacity={0.2}
                                fill="#3B82F6"
                            />
                            <Area
                                type="monotone"
                                dataKey="released"
                                stroke="#10B981"
                                fillOpacity={0.2}
                                fill="#10B981"
                            />
                            <Area
                                type="monotone"
                                dataKey="spent"
                                stroke="#8B5CF6"
                                fill="none"
                                strokeDasharray="5 5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* STATE UTILIZATION */}
                <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-800 mb-6 font-display">
                        State-wise Utilization (%)
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={stateUtilization}
                            layout="vertical"
                        >
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="utilization">
                                {stateUtilization.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* STATE TABLE */}
            <div className="table-container">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 font-display">
                        State-wise Fund Details
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="table-header">State</th>
                                <th className="table-header">Allocated</th>
                                <th className="table-header">Released</th>
                                <th className="table-header">Spent</th>
                                <th className="table-header">Utilization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.state_funds.map((s, i) => {
                                const util = Math.round(
                                    (s.spent_amount /
                                        s.allocated_amount) *
                                        100
                                );
                                return (
                                    <tr
                                        key={i}
                                        className="border-t border-slate-50 hover:bg-slate-50/50"
                                    >
                                        <td className="table-cell font-semibold">
                                            {s.state_name}
                                        </td>
                                        <td className="table-cell">
                                            {formatCurrency(
                                                s.allocated_amount
                                            )}
                                        </td>
                                        <td className="table-cell text-emerald-600">
                                            {formatCurrency(
                                                s.released_amount
                                            )}
                                        </td>
                                        <td className="table-cell text-purple-600">
                                            {formatCurrency(
                                                s.spent_amount
                                            )}
                                        </td>
                                        <td className="table-cell">
                                            {util}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
