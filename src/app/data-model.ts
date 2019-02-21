export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}

export interface AuthActions {
    action: 0 | 1 | 2;
  }