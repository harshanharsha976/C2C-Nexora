type User = {
  username: string;
  password: string;
};

export const users: User[] = [];

// NEW: track logged-in user
export let currentUser: User | null = null;

export const setCurrentUser = (user: User | null) => {
  currentUser = user;
};
