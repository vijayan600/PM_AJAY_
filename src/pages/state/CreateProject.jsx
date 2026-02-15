import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PlusCircle,
    Building2,
    IndianRupee,
    Calendar,
    Users,
    Send
} from 'lucide-react';

export default function CreateProject() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Dummy agencies (frontend only)
    const agencies = [
        { id: '1', name: 'PWD Department', agency_type: 'Government' },
        { id: '2', name: 'Rural Development Agency', agency_type: 'State' },
        { id: '3', name: 'Urban Local Body', agency_type: 'ULB' }
    ];

    const [form, setForm] = useState({
        name: '',
        description: '',
        block_taluk: '',
        implementing_agency_id: '',
        total_budget: '',
        centre_share: '',
        state_share: '',
        start_date: '',
        end_date: '',
        duration_months: '',
        target_beneficiaries: ''
    });

    const handleChange = (field, value) => {
        const updated = { ...form, [field]: value };

        // Auto calculate budget split
        if (field === 'total_budget') {
            const budget = parseFloat(value) || 0;
            updated.centre_share = (budget * 0.6).toFixed(2);
            updated.state_share = (budget * 0.4).toFixed(2);
        }

        // Auto calculate duration
        if (field === 'start_date' || field === 'end_date') {
            if (updated.start_date && updated.end_date) {
                const diff =
                    (new Date(updated.end_date) - new Date(updated.start_date)) /
                    (1000 * 60 * 60 * 24 * 30);
                updated.duration_months = Math.max(1, Math.round(diff));
            }
        }

        setForm(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.implementing_agency_id || !form.total_budget) {
            alert('Please fill required fields');
            return;
        }

        setLoading(true);

        // Frontend-only submit
        console.log('Created Project (Frontend Only):', {
            ...form,
            total_budget: Number(form.total_budget),
            centre_share: Number(form.centre_share),
            state_share: Number(form.state_share),
            target_beneficiaries: Number(form.target_beneficiaries || 0),
            duration_months: Number(form.duration_months || 0)
        });

        setTimeout(() => {
            setLoading(false);
            alert('Project created successfully (frontend only)');
            navigate('/state/projects');
        }, 800);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-3">
                    <PlusCircle className="text-saffron-500" />
                    Create New Project
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Set up a new project and assign to an implementing agency
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                {/* Basic Info */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-navy-500" />
                        Basic Information
                    </h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Project Name *"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="input-field"
                            required
                        />

                        <textarea
                            placeholder="Project Description"
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="input-field !h-24 resize-none"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Block / Taluk"
                                value={form.block_taluk}
                                onChange={(e) => handleChange('block_taluk', e.target.value)}
                                className="input-field"
                            />

                            <select
                                value={form.implementing_agency_id}
                                onChange={(e) =>
                                    handleChange('implementing_agency_id', e.target.value)
                                }
                                className="input-field"
                                required
                            >
                                <option value="">Select Implementing Agency *</option>
                                {agencies.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name} ({a.agency_type})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Budget */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <IndianRupee size={18} className="text-purple-500" />
                        Budget Allocation
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="number"
                            placeholder="Total Budget *"
                            value={form.total_budget}
                            onChange={(e) => handleChange('total_budget', e.target.value)}
                            className="input-field"
                            required
                        />

                        <input
                            type="number"
                            value={form.centre_share}
                            className="input-field bg-slate-50"
                            readOnly
                        />

                        <input
                            type="number"
                            value={form.state_share}
                            className="input-field bg-slate-50"
                            readOnly
                        />
                    </div>
                </div>

                {/* Timeline */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Calendar size={18} className="text-emerald-500" />
                        Timeline
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                            type="date"
                            value={form.start_date}
                            onChange={(e) => handleChange('start_date', e.target.value)}
                            className="input-field"
                            required
                        />

                        <input
                            type="date"
                            value={form.end_date}
                            onChange={(e) => handleChange('end_date', e.target.value)}
                            className="input-field"
                            required
                        />

                        <input
                            type="number"
                            value={form.duration_months}
                            className="input-field bg-slate-50"
                            readOnly
                        />
                    </div>
                </div>

                {/* Beneficiaries */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users size={18} className="text-blue-500" />
                        Target Beneficiaries
                    </h2>

                    <input
                        type="number"
                        placeholder="Target Beneficiaries"
                        value={form.target_beneficiaries}
                        onChange={(e) =>
                            handleChange('target_beneficiaries', e.target.value)
                        }
                        className="input-field max-w-xs"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-success flex items-center gap-2 !px-8 !py-3.5"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send size={18} /> Create Project
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-outline !px-8 !py-3.5"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
