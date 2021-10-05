import { User } from '../entities/user';

export interface UserRepository {
  Register(payload: User): Promise<any>;
  Login(payload: User): Promise<any>;
  ForgotPassword(payload: User): Promise<any>;
  ResetPassword(payload: User): Promise<any>;
  SocialLogin(payload: User): Promise<any>;
}
