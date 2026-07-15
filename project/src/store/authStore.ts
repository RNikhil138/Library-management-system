import { create } from 'zustand';

interface UserProfile {
  fullName: string;
  email: string;
  mobile: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: UserProfile | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (profile: { username: string; password: string; fullName: string; email: string; mobile: string }) => boolean;
  updatePassword: (oldPassword: string, newPassword: string) => boolean;
}

const defaultUsers = {
  admin: { 
    username: 'admin', 
    password: 'admin', 
    role: 'admin' as const,
    fullName: 'Admin User',
    email: 'admin@library.com',
    mobile: '1234567890'
  },
  user: { 
    username: 'user', 
    password: 'user', 
    role: 'user' as const,
    fullName: 'Demo User',
    email: 'user@library.com',
    mobile: '9876543210'
  },
};

// Store registered users (in memory for demo purposes)
let registeredUsers: Record<string, typeof defaultUsers.user> = {};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (username, password) => {
    // Check default users first
    const defaultUser = Object.values(defaultUsers).find(
      (u) => u.username === username && u.password === password
    );

    if (defaultUser) {
      const { password: _, ...userProfile } = defaultUser;
      set({ user: userProfile });
      return true;
    }

    // Check registered users
    const registeredUser = registeredUsers[username];
    if (registeredUser && registeredUser.password === password) {
      const { password: _, ...userProfile } = registeredUser;
      set({ user: userProfile });
      return true;
    }

    return false;
  },
  logout: () => set({ user: null }),
  register: (profile) => {
    if (defaultUsers[profile.username] || registeredUsers[profile.username]) {
      return false; // Username already exists
    }

    registeredUsers[profile.username] = {
      ...profile,
      role: 'user',
    };
    return true;
  },
  updatePassword: (oldPassword: string, newPassword: string) => {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser) return false;

    const user = registeredUsers[currentUser.username];
    if (user && user.password === oldPassword) {
      registeredUsers[currentUser.username] = {
        ...user,
        password: newPassword
      };
      return true;
    }
    return false;
  }
}));

export default useAuthStore;