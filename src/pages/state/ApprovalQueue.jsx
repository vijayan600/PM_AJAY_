import { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock
} from 'lucide-react';
import { stateAPI } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';

export default function ApprovalQueue() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUpdate, setSelectedUpdate] = useState(null);

  // ✅ decision & remarks stored per update
  const [formState, setFormState] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    stateAPI
      .getPendingApprovals()
      .then(d => {
        setApprovals(d.approvals || d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateForm = (id, changes) => {
    setFormState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...changes
      }
    }));
  };

  const handleApproval = async (updateId) => {
    const current = formState[updateId];

    if (!current?.decision) {
      return toast.error('Please select a decision');
    }

    setSubmitting(true);
    try {
      await stateAPI.submitApproval({
        progress_update_id: updateId,
        decision: current.decision,
        remarks: current.remarks || ''
      });

      toast.success(`Update ${current.decision.toLowerCase()}`);
      setApprovals(prev => prev.filter(a => a.id !== updateId));
      setSelectedUpdate(null);

      // clear only this form
      setFormState(prev => {
        const copy = { ...prev };
        delete copy[updateId];
        return copy;
      });
    } catch (err) {
      toast.error(err?.message || 'Approval failed');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-slate-800 flex items-center gap-3">
          <ClipboardCheck className="text-saffron-500" /> Approval Queue
        </h1>
        <p className="text-slate-500 text-sm">
          Review and approve progress updates from implementing agencies
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : approvals.length === 0 ? (
        <div className="text-center py-20">
          <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-600">All caught up!</h3>
          <p className="text-slate-400">No pending approvals</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map(update => {
            const form = formState[update.id] || {};
            return (
              <div key={update.id} className="glass-card overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {update.project_id}
                        </span>
                        <span className="badge badge-warning">
                          <Clock size={10} className="mr-1" /> Pending Review
                        </span>
                        <span className="text-xs text-slate-400">
                          Submitted {formatDate(update.submitted_at)}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-800 mb-1">
                        {update.project_name}
                      </h3>

                      <p className="text-sm text-slate-500 mb-3">
                        by {update.agency_name}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-slate-50 text-center">
                          <p className="text-xs text-slate-500">Progress</p>
                          <p className="font-bold">
                            {update.previous_percent}% → {update.progress_percent}%
                          </p>
                        </div>

                        {update.fund_requested && (
                          <div className="p-2 rounded-lg bg-purple-50 text-center">
                            <p className="text-xs text-purple-500">
                              Fund Requested
                            </p>
                            <p className="font-bold text-purple-800">
                              {formatCurrency(update.fund_requested)}
                            </p>
                          </div>
                        )}
                      </div>

                      {update.remarks && (
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg italic">
                          “{update.remarks}”
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setSelectedUpdate(
                          selectedUpdate === update.id ? null : update.id
                        )
                      }
                      className="btn-outline !px-4 !py-2 text-sm flex items-center gap-1"
                    >
                      <MessageSquare size={14} /> Review
                    </button>
                  </div>
                </div>

                {selectedUpdate === update.id && (
                  <div className="border-t border-slate-100 bg-slate-50 p-6 animate-slide-up">
                    <div className="max-w-lg space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Decision *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              value: 'APPROVED',
                              label: 'Approve',
                              icon: CheckCircle2,
                              style:
                                'border-emerald-300 bg-emerald-50 text-emerald-700'
                            },
                            {
                              value: 'REJECTED',
                              label: 'Reject',
                              icon: XCircle,
                              style:
                                'border-red-300 bg-red-50 text-red-700'
                            }
                          ].map(opt => {
                            const Icon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() =>
                                  updateForm(update.id, {
                                    decision: opt.value
                                  })
                                }
                                className={`p-3 rounded-xl border-2 flex items-center gap-2 font-semibold text-sm transition-all ${
                                  form.decision === opt.value
                                    ? opt.style
                                    : 'border-slate-200 bg-white text-slate-500'
                                }`}
                              >
                                <Icon size={18} /> {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Remarks
                        </label>
                        <textarea
                          value={form.remarks || ''}
                          onChange={(e) =>
                            updateForm(update.id, {
                              remarks: e.target.value
                            })
                          }
                          className="input-field !h-20 resize-none"
                        />
                      </div>

                      <button
                        onClick={() => handleApproval(update.id)}
                        disabled={submitting}
                        className={`${
                          form.decision === 'APPROVED'
                            ? 'btn-success'
                            : 'btn-danger'
                        } flex items-center gap-2 !px-6`}
                      >
                        {submitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Submit Decision'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
