export type AuthState = {
  isAuthenticated: boolean;
  userName: string | null;
};

export const authStore: AuthState = {
  isAuthenticated: false,
  userName: null,
};

export default authStore;
