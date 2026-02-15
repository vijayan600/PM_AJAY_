import { useState, useEffect } from 'react';
import { Upload, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';

/* ============================
   STATIC PROJECT DATA
============================ */
const STATIC_PROJECTS = [
    {
        id: 1,
        project_id: 'TN-ROAD-001',
        name: 'Road Development Project',
        milestones: [
            { id: 1, milestone_number: 1, name: 'Foundation Work' },
            { id: 2, milestone_number: 2, name: 'Road Laying' },
        ],
    },
    {
        id: 2,
        project_id: 'TN-HOUSE-002',
        name: 'Housing Scheme Phase II',
        milestones: [
            { id: 3, milestone_number: 1, name: 'Site Preparation' },
            { id: 4, milestone_number: 2, name: 'Construction' },
        ],
    },
];

export default function UploadProgress() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedMilestone, setSelectedMilestone] = useState('');
    const [form, setForm] = useState({
        progress_percent: '',
        remarks: '',
        fund_requested: '',
        fund_request_justification: '',
    });
    const [submitting, setSubmitting] = useState(false);

    /* ============================
       STATIC LOAD
    ============================ */
    useEffect(() => {
        setTimeout(() => {
            setProjects(STATIC_PROJECTS);
            setLoading(false);
        }, 300);
    }, []);

    const project = projects.find(
        (p) => p.id === Number(selectedProject)
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedProject) {
            toast.error('Please select a project');
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            toast.success('Progress update submitted successfully!');
            setForm({
                progress_percent: '',
                remarks: '',
                fund_requested: '',
                fund_request_justification: '',
            });
            setSelectedProject('');
            setSelectedMilestone('');
            setSubmitting(false);
        }, 800);
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display text-slate-800">
                    Upload Progress Report
                </h1>
                <p className="text-slate-500 text-sm">
                    Submit monthly progress updates for your projects
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                {/* ================= PROJECT SELECTION ================= */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText size={18} className="text-navy-500" /> Select Project
                    </h2>

                    <select
                        value={selectedProject}
                        onChange={(e) => {
                            setSelectedProject(e.target.value);
                            setSelectedMilestone('');
                        }}
                        className="input-field"
                        required
                    >
                        <option value="">Choose a project...</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.project_id} — {p.name}
                            </option>
                        ))}
                    </select>

                    {project?.milestones && (
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Milestone (optional)
                            </label>
                            <select
                                value={selectedMilestone}
                                onChange={(e) => setSelectedMilestone(e.target.value)}
                                className="input-field"
                            >
                                <option value="">Not milestone-specific</option>
                                {project.milestones.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        Milestone {m.milestone_number}: {m.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* ================= PROGRESS DETAILS ================= */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Upload size={18} className="text-emerald-500" /> Progress Details
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Current Progress (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={form.progress_percent}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        progress_percent: e.target.value,
                                    })
                                }
                                placeholder="e.g. 45"
                                className="input-field"
                                required
                            />

                            {form.progress_percent && (
                                <div className="mt-2 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                form.progress_percent
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Work Description / Remarks
                            </label>
                            <textarea
                                value={form.remarks}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        remarks: e.target.value,
                                    })
                                }
                                placeholder="Describe work completed this month..."
                                className="input-field !h-32 resize-none"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* ================= FUND REQUEST ================= */}
                <div className="glass-card p-6">
                    <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-purple-500 font-bold text-lg">₹</span>
                        Fund Request (Optional)
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Amount Requested (₹)
                            </label>
                            <input
                                type="number"
                                value={form.fund_requested}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fund_requested: e.target.value,
                                    })
                                }
                                placeholder="e.g. 5000000"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">
                                Justification
                            </label>
                            <textarea
                                value={form.fund_request_justification}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fund_request_justification: e.target.value,
                                    })
                                }
                                placeholder="Explain the fund requirement..."
                                className="input-field !h-24 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ================= SUBMIT ================= */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-success flex items-center gap-2 !px-8 !py-3.5"
                >
                    {submitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Send size={18} /> Submit Progress Report
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
