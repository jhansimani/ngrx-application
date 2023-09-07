import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  users: User[];
}

export const inititialState: AuthState = {
  user: null,
  users: [],
};
