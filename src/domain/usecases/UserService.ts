import { User } from '../entities/user';
import { UserRepository } from '../repositories/UserRepository';

export class UserServiceImpl {
  userRepo: UserRepository;

  constructor(ir: UserRepository) {
    this.userRepo = ir;
  }

  async Register(payload: User): Promise<any> {
    return this.userRepo.Register(payload);
  }
  async Login(payload: User): Promise<any> {
    return this.userRepo.Login(payload);
  }
  async ForgotPassword(payload: User): Promise<any> {
    return this.userRepo.ForgotPassword(payload);
  }
  async ResetPassword(payload: User): Promise<any> {
    return this.userRepo.ResetPassword(payload);
  }
  async SocialLogin(payload: User): Promise<any> {
    return this.userRepo.SocialLogin(payload);
  }
}
