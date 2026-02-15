import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        try {
            const user = login(email, password);

            toast.success(`Welcome, ${user.full_name}!`);

            if (user.role === 'AGENCY') navigate('/agency');
            else if (user.role === 'STATE_OFFICER') navigate('/state');
            else if (user.role === 'CENTRAL_OFFICER') navigate('/central');
        } catch (err) {
            toast.error('Invalid login email');
        }
    };

    const demoAccounts = [
        { email: 'central@pmajay.gov.in', role: 'Central Officer', color: 'from-purple-500 to-violet-600' },
        { email: 'state.tn@pmajay.gov.in', role: 'State Officer (TN)', color: 'from-blue-500 to-indigo-600' },
        { email: 'agency@abcconstruction.in', role: 'Agency', color: 'from-emerald-500 to-teal-600' },
    ];

    return (
        <div className="min-h-screen flex">
            {/* LEFT PANEL (UNCHANGED) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden items-center justify-center">
                {/* ... NO CHANGES HERE ... */}
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    <Link to="/" className="text-sm text-slate-500 hover:text-navy-600 mb-8 inline-flex items-center gap-1">
                        ← Back to Home
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-display text-slate-800 mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Sign in to access your portal</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field !pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field !pl-11 !pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2">
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>

                    {/* DEMO ACCOUNTS (UNCHANGED UI) */}
                    <div className="mt-10">
                        <p className="text-sm text-slate-400 text-center mb-4">
                            Quick Demo Login (password: <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">password123</code>)
                        </p>
                        <div className="space-y-2">
                            {demoAccounts.map(acc => (
                                <button
                                    key={acc.email}
                                    onClick={() => { setEmail(acc.email); setPassword('password123'); }}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-navy-300 hover:bg-slate-50"
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center`}>
                                        <Shield size={14} className="text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-semibold">{acc.role}</p>
                                        <p className="text-xs text-slate-400">{acc.email}</p>
                                    </div>
                                    <ArrowRight size={14} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
