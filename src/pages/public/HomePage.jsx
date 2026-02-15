import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Building2, Heart, GraduationCap, Stethoscope, Wheat, Users,
    TrendingUp, MapPin, IndianRupee, ArrowRight, Search, Shield,
    Eye, BarChart3, ChevronRight, Zap, Globe
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

/* ============================
   ANIMATED COUNTER
============================ */
function AnimatedCounter({ end, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end]);

    return (
        <span>
            {prefix}
            {typeof end === 'number' && end >= 10000000
                ? formatNumber(count)
                : count.toLocaleString('en-IN')}
            {suffix}
        </span>
    );
}

/* ============================
   ICON MAP
============================ */
const componentIcons = {
    Infrastructure: Building2,
    'Welfare Schemes': Heart,
    'Training Programs': GraduationCap,
    'Health Services': Stethoscope,
    'Agricultural Support': Wheat,
    'Social Services': Users,
};

/* ============================
   STATIC DATA
============================ */
const STATS = {
    total_projects: 1240,
    total_states: 36,
    total_budget: 87500000000,
    total_beneficiaries: 4280000,
};

const STATES = [
    { id: 1, name: 'Tamil Nadu', code: 'TN', total_projects: 124, completion_rate: 72 },
    { id: 2, name: 'Maharashtra', code: 'MH', total_projects: 140, completion_rate: 68 },
    { id: 3, name: 'Karnataka', code: 'KA', total_projects: 98, completion_rate: 70 },
    { id: 4, name: 'Kerala', code: 'KL', total_projects: 76, completion_rate: 75 },
    { id: 5, name: 'Uttar Pradesh', code: 'UP', total_projects: 220, completion_rate: 61 },
    { id: 6, name: 'Rajasthan', code: 'RJ', total_projects: 84, completion_rate: 66 },
];

const COMPONENTS = [
    {
        id: 1,
        name: 'Infrastructure',
        description: 'Roads, housing, and civic infrastructure projects',
        total_projects: 420,
        budget_allocated: 28000000000,
        color: '#3B82F6',
    },
    {
        id: 2,
        name: 'Welfare Schemes',
        description: 'Social welfare and upliftment programs',
        total_projects: 310,
        budget_allocated: 19500000000,
        color: '#EF4444',
    },
    {
        id: 3,
        name: 'Training Programs',
        description: 'Skill development and training initiatives',
        total_projects: 190,
        budget_allocated: 9800000000,
        color: '#10B981',
    },
];

const RECENT_PROJECTS = [
    {
        id: 1,
        project_id: 'TN-ROAD-001',
        name: 'Road Development Project',
        state_name: 'Tamil Nadu',
        district_name: 'Chennai',
        status: 'IN_PROGRESS',
        progress_percent: 65,
        total_budget: 4500000,
        actual_beneficiaries: 12000,
        component_color: '#3B82F6',
    },
    {
        id: 2,
        project_id: 'MH-HOUSE-014',
        name: 'Affordable Housing Scheme',
        state_name: 'Maharashtra',
        district_name: 'Pune',
        status: 'COMPLETED',
        progress_percent: 100,
        total_budget: 7200000,
        actual_beneficiaries: 8500,
        component_color: '#10B981',
    },
    {
        id: 3,
        project_id: 'KA-SKILL-009',
        name: 'Skill Development Program',
        state_name: 'Karnataka',
        district_name: 'Bengaluru',
        status: 'IN_PROGRESS',
        progress_percent: 48,
        total_budget: 3200000,
        actual_beneficiaries: 6400,
        component_color: '#F59E0B',
    },
];

export default function HomePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 600);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-saffron-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/80 text-sm">
                        Loading PM-AJAY Platform...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* HERO */}
            <section className="relative bg-gradient-hero overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                        <Shield size={14} className="text-saffron-400" />
                        <span className="text-white/90 text-sm">
                            Government of India Initiative
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold font-display text-white mb-6">
                        PM-AJAY <br />
                        <span className="gradient-text-hero">
                            Digital Platform
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Tracking and managing government welfare schemes with
                        complete transparency.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <Link
                            to="/projects"
                            className="px-8 py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-bold rounded-2xl"
                        >
                            <Search size={18} /> Explore Projects
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-2xl"
                        >
                            Portal Login
                        </Link>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                        {[
                            { label: 'Total Projects', value: STATS.total_projects },
                            { label: 'States Covered', value: STATS.total_states },
                            { label: 'Total Budget', value: STATS.total_budget, isCurrency: true },
                            { label: 'Beneficiaries', value: STATS.total_beneficiaries },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <p className="text-slate-400 text-sm">
                                    {s.label}
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {s.isCurrency
                                        ? formatCurrency(s.value)
                                        : <AnimatedCounter end={s.value} />}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPONENTS */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {COMPONENTS.map((c) => {
                            const Icon = componentIcons[c.name] || Building2;
                            return (
                                <div
                                    key={c.id}
                                    className="p-6 rounded-2xl bg-white shadow-card"
                                >
                                    <Icon size={28} style={{ color: c.color }} />
                                    <h3 className="font-bold text-lg mt-4">
                                        {c.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        {c.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* RECENT PROJECTS */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">
                        Recent Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {RECENT_PROJECTS.map((p) => (
                            <div
                                key={p.id}
                                className="p-6 rounded-2xl bg-white border shadow-card"
                            >
                                <h3 className="font-bold">{p.name}</h3>
                                <p className="text-sm text-slate-500">
                                    {p.state_name} • {p.district_name}
                                </p>
                                <div className="mt-4">
                                    <div className="h-2 bg-slate-100 rounded-full">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${p.progress_percent}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs mt-1">
                                        {p.progress_percent}% complete
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATES */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STATES.map((s) => (
                            <div
                                key={s.id}
                                className="p-4 rounded-xl bg-white/5 border border-white/10"
                            >
                                <h4 className="text-white font-bold">
                                    {s.name}
                                </h4>
                                <p className="text-xs text-slate-400">
                                    {s.total_projects} projects
                                </p>
                                <p className="text-xs text-emerald-400">
                                    {s.completion_rate}% completion
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Track Government Projects Transparently
                </h2>
                <Link
                    to="/projects"
                    className="px-8 py-4 bg-navy-500 text-white rounded-2xl font-bold"
                >
                    <Search size={18} /> Search Projects
                </Link>
            </section>
        </div>
    );
}

function FolderIcon(props) {
    return <Building2 {...props} />;
}
