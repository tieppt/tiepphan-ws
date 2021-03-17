export interface IUser {
  id: string;
  name: string;
  role: IUserRole;
}

export enum IUserRole {
  Admin = 'admin',
  User = 'user'
}
