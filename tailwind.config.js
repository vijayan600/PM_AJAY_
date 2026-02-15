/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                saffron: { 50: '#FFF8F0', 100: '#FFF0DB', 200: '#FFE0B8', 300: '#FFCF8F', 400: '#FFBE66', 500: '#FF9933', 600: '#E67A00', 700: '#B35F00', 800: '#804400', 900: '#4D2900' },
                navy: { 50: '#E8EDF5', 100: '#C5D0E6', 200: '#8BA1CD', 300: '#5172B4', 400: '#2E4F8E', 500: '#000080', 600: '#000070', 700: '#000058', 800: '#000040', 900: '#000028' },
                forest: { 50: '#E8F5E9', 100: '#C8E6C9', 200: '#A5D6A7', 300: '#81C784', 400: '#66BB6A', 500: '#138808', 600: '#0F6B06', 700: '#0B4F05', 800: '#073303', 900: '#041A02' },
                ashoka: { 500: '#000080' },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-govt': 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
                'gradient-hero': 'linear-gradient(135deg, #0a0e27 0%, #1a1f4e 30%, #2d1b69 60%, #1a1f4e 100%)',
                'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'pulse-slow': 'pulse 3s infinite',
                'counter': 'counter 2s ease-out',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                slideInRight: { '0%': { transform: 'translateX(20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
                float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
                'glow-saffron': '0 0 20px rgba(255, 153, 51, 0.3)',
                'glow-navy': '0 0 20px rgba(0, 0, 128, 0.3)',
            },
        },
    },
    plugins: [],
};
