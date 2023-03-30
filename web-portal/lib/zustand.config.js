import { create } from 'zustand';
import { auth } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = create((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

onAuthStateChanged(auth, (user) => {
  useAuth.setState({ user, loading: false });
}, (error) => {
  useAuth.setState({ error, loading: false });
});

export { useAuth };
