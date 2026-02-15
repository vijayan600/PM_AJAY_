import { create } from 'zustand';

const HARDCODED_USERS = {
  'central@pmajay.gov.in': {
    full_name: 'Central Officer',
    role: 'CENTRAL_OFFICER',
  },
  'state.tn@pmajay.gov.in': {
    full_name: 'State Officer',
    role: 'STATE_OFFICER',
  },
  'agency@abcconstruction.in': {
    full_name: 'Agency User',
    role: 'AGENCY',
  },
};

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: localStorage.getItem('isAuth') === 'true',
  isLoading: false,

  login: (email, password) => {
    const userData = HARDCODED_USERS[email];

    if (!userData) {
      throw new Error('Invalid email');
    }

    const user = {
      email,
      full_name: userData.full_name,
      role: userData.role,
    };

    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('user', JSON.stringify(user));

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    return user;
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
