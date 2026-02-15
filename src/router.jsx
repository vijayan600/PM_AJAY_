import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import SearchProjects from './pages/public/SearchProjects';
import ProjectDetail from './pages/public/ProjectDetail';

// Auth
import Login from './pages/auth/Login';

// Agency pages
import AgencyDashboard from './pages/agency/Dashboard';
import AgencyProjects from './pages/agency/MyProjects';
import UploadProgress from './pages/agency/UploadProgress';

// State pages
import StateDashboard from './pages/state/Dashboard';
import StateProjects from './pages/state/AllProjects';
import CreateProject from './pages/state/CreateProject';
import ApprovalQueue from './pages/state/ApprovalQueue';

// Central pages
import CentralDashboard from './pages/central/Dashboard';
import StatePerformance from './pages/central/StatePerformance';
import FundOversight from './pages/central/FundOversight';

function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/" />;
    return children;
}

export default function AppRouter() {
    return (
        <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<SearchProjects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Agency Portal */}
            <Route path="/agency" element={
                <ProtectedRoute allowedRoles={['AGENCY', 'ADMIN']}>
                    <DashboardLayout role="AGENCY" />
                </ProtectedRoute>
            }>
                <Route index element={<AgencyDashboard />} />
                <Route path="projects" element={<AgencyProjects />} />
                <Route path="upload-progress" element={<UploadProgress />} />
            </Route>

            {/* State Portal */}
            <Route path="/state" element={
                <ProtectedRoute allowedRoles={['STATE_OFFICER', 'ADMIN']}>
                    <DashboardLayout role="STATE_OFFICER" />
                </ProtectedRoute>
            }>
                <Route index element={<StateDashboard />} />
                <Route path="projects" element={<StateProjects />} />
                <Route path="create-project" element={<CreateProject />} />
                <Route path="approvals" element={<ApprovalQueue />} />
            </Route>

            {/* Central Portal */}
            <Route path="/central" element={
                <ProtectedRoute allowedRoles={['CENTRAL_OFFICER', 'ADMIN']}>
                    <DashboardLayout role="CENTRAL_OFFICER" />
                </ProtectedRoute>
            }>
                <Route index element={<CentralDashboard />} />
                <Route path="states" element={<StatePerformance />} />
                <Route path="funds" element={<FundOversight />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
