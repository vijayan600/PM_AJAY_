import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router';

export default function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" toastOptions={{
                duration: 4000,
                style: { borderRadius: '12px', background: '#1e293b', color: '#f8fafc', fontSize: '14px' },
            }} />
            <AppRouter />
        </BrowserRouter>
    );
}
