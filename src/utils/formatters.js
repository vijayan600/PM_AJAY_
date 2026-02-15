export function formatCurrency(amount) {
    if (amount === null || amount === undefined) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString('en-IN');
}

export function formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getStatusColor(status) {
    const colors = {
        'NOT_STARTED': 'bg-slate-100 text-slate-600',
        'IN_PROGRESS': 'bg-blue-100 text-blue-700',
        'COMPLETED': 'bg-emerald-100 text-emerald-700',
        'DELAYED': 'bg-amber-100 text-amber-700',
        'SUSPENDED': 'bg-red-100 text-red-700',
        'CANCELLED': 'bg-red-100 text-red-700',
        'PENDING': 'bg-slate-100 text-slate-600',
        'SUBMITTED': 'bg-amber-100 text-amber-700',
        'APPROVED': 'bg-emerald-100 text-emerald-700',
        'REJECTED': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-600';
}

export function getStatusLabel(status) {
    return (status || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function getProgressColor(percent) {
    if (percent >= 80) return 'bg-emerald-500';
    if (percent >= 50) return 'bg-blue-500';
    if (percent >= 25) return 'bg-amber-500';
    return 'bg-red-500';
}
