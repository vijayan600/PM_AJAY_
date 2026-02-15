import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

export default function PublicLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/projects', label: 'Projects' },
    ];

    const getDashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'AGENCY') return '/agency';
        if (user.role === 'STATE_OFFICER') return '/state';
        if (user.role === 'CENTRAL_OFFICER' || user.role === 'ADMIN') return '/central';
        return '/';
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top tricolor bar */}
            <div className="h-1 flex">
                <div className="flex-1 bg-saffron-500"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-forest-500"></div>
            </div>

            {/* Header */}
            <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center shadow-lg group-hover:shadow-glow-navy transition-all">
                                <span className="text-white font-bold text-lg lg:text-xl font-display">अ</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg lg:text-xl font-bold font-display text-navy-600">PM-AJAY</h1>
                                <p className="text-[10px] lg:text-xs text-slate-500 -mt-0.5">Digital Platform</p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map(link => (
                                <Link key={link.to} to={link.to}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === link.to
                                            ? 'bg-navy-500/10 text-navy-600'
                                            : 'text-slate-600 hover:text-navy-600 hover:bg-slate-50'
                                        }`}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right section */}
                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link to={getDashboardLink()} className="btn-primary text-sm !px-4 !py-2">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link to="/login" className="btn-primary text-sm !px-4 !py-2">
                                    Login
                                </Link>
                            )}
                            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-slate-100 bg-white p-4 animate-slide-up">
                        {navLinks.map(link => (
                            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center">
                                    <span className="text-white font-bold font-display">अ</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold font-display">PM-AJAY Digital Platform</h3>
                                    <p className="text-xs text-slate-500">Government of India</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Pradhan Mantri Anusuchit Jaati Abhyudaya Yojana — empowering communities through transparent project management.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/projects" className="hover:text-saffron-400 transition-colors">All Projects</Link></li>
                                <li><Link to="/login" className="hover:text-saffron-400 transition-colors">Portal Login</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>Ministry of Social Justice & Empowerment</li>
                                <li>Shastri Bhawan, New Delhi — 110001</li>
                                <li>helpdesk@pmajay.gov.in</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs">© 2024 PM-AJAY Digital Platform. Government of India. All rights reserved.</p>
                        <div className="h-1 w-24 flex rounded-full overflow-hidden">
                            <div className="flex-1 bg-saffron-500"></div>
                            <div className="flex-1 bg-white"></div>
                            <div className="flex-1 bg-forest-500"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
