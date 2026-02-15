import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    LayoutDashboard, FolderOpen, Upload, ClipboardCheck, PlusCircle, Users,
    Building2, BarChart3, IndianRupee, AlertTriangle, LogOut, Bell, ChevronLeft,
    Menu, Globe, Settings
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const sidebarConfig = {
    AGENCY: {
        title: 'Agency Portal',
        color: 'from-emerald-600 to-teal-700',
        links: [
            { to: '/agency', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/agency/projects', icon: FolderOpen, label: 'My Projects' },
            { to: '/agency/upload-progress', icon: Upload, label: 'Upload Progress' },
        ],
    },
    STATE_OFFICER: {
        title: 'State Portal',
        color: 'from-blue-600 to-indigo-700',
        links: [
            { to: '/state', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/state/projects', icon: FolderOpen, label: 'All Projects' },
            { to: '/state/create-project', icon: PlusCircle, label: 'Create Project' },
            { to: '/state/approvals', icon: ClipboardCheck, label: 'Approvals' },
        ],
    },
    CENTRAL_OFFICER: {
        title: 'Central Portal',
        color: 'from-purple-600 to-violet-700',
        links: [
            { to: '/central', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/central/states', icon: BarChart3, label: 'State Performance' },
            { to: '/central/funds', icon: IndianRupee, label: 'Fund Oversight' },
        ],
    },
    ADMIN: {
        title: 'Admin Portal',
        color: 'from-slate-700 to-slate-900',
        links: [
            { to: '/central', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/central/states', icon: BarChart3, label: 'State Performance' },
            { to: '/central/funds', icon: IndianRupee, label: 'Fund Oversight' },
        ],
    },
};

export default function DashboardLayout({ role }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    const config = sidebarConfig[role] || sidebarConfig.AGENCY;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b ${config.color} text-white
        transition-all duration-300 flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

                {/* Logo area */}
                <div className={`p-4 border-b border-white/10 ${collapsed ? 'px-3' : ''}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg font-display">अ</span>
                        </div>
                        {!collapsed && (
                            <div className="animate-fade-in">
                                <h2 className="font-bold text-sm font-display">{config.title}</h2>
                                <p className="text-[10px] text-white/60">PM-AJAY Platform</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {config.links.map(link => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;
                        return (
                            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                                className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
                                title={collapsed ? link.label : ''}>
                                <Icon size={20} className="flex-shrink-0" />
                                {!collapsed && <span>{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                <div className="p-3 border-t border-white/10 space-y-1">
                    <Link to="/" className="sidebar-link" title={collapsed ? 'Public Site' : ''}>
                        <Globe size={20} className="flex-shrink-0" />
                        {!collapsed && <span>Public Site</span>}
                    </Link>
                    <button onClick={handleLogout} className="sidebar-link w-full" title={collapsed ? 'Logout' : ''}>
                        <LogOut size={20} className="flex-shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {/* Top bar */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 h-16 flex items-center px-4 lg:px-8 justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
                            <Menu size={20} />
                        </button>
                        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <ChevronLeft size={20} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-500 to-navy-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{user?.full_name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-slate-700">{user?.full_name || 'User'}</p>
                                <p className="text-[10px] text-slate-500">{user?.designation || user?.role}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}
        </div>
    );
}
