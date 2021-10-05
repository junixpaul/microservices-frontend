import { UserRepository } from '../../domain/repositories/UserRepository';
import { request } from 'ice';
import { Message } from '@alifd/next';
import { appHistory } from '@ice/stark';

export class UserRepositoryImpl implements UserRepository {
  async Register(payload) {
    const res = await request({
      url: 'http://localhost:3000/api/users/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password,
        mobile: payload.mobile,
      } },

    });

    if (res._id) {
      Message.success('Register successful\n');
      appHistory.push('/login');
    } else {
      Message.error('Something went wrong. Please try again.');
    }

    return res;
  }

  async Login(payload) {
    const res = await request({
      url: 'http://localhost:3000/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        email: payload.email,
        password: payload.password,
      } },
    });

    if (res.status === 'Success') {
      Message.success('login successful\n');
      appHistory.push('/');
    } else {
      Message.error('Unable to login. Check Email and Password\n');
    }
    return res;
  }

  async ForgotPassword(payload) {
    const res = await request({
      url: 'http://localhost:3000/api/users/forgotPassword',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        email: payload.email,
      } },
    });
    if (res.status === 'not found') {
      Message.error('Email not found. Please use your past email.\n');
      appHistory.push('/forgotPassword');
    } else {
      Message.error('Something went wrong. Please try again\n');
      appHistory.push('/forgotPassword');
    }
    return res;
  }

  async ResetPassword(payload) {
    const res = await request({
      url: 'http://localhost:3000/api/users/resetPassword',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        email: payload.email,
        code: payload.code,
        password: payload.new_password,
      } },
    });

    if (res.status === 'Success') {
      Message.success('Password successfully updated.\n');
      appHistory.push('/login');
    } else {
      Message.error('Something went wrong. Please try again\n');
    }

    return res;
  }

  async SocialLogin(payload) {
    const res = await request({
      url: 'http://localhost:3000/api/users/socialLogin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: { user: {
        email: payload.profileObj.email,
        token: payload.tokenId,
        type: payload.type,
      }},
    });
    if (res.status === 'success') {
      Message.success('login successful.\n');
      appHistory.push('/');
    } else {
      Message.error('Something went wrong. Please try again\n');
    }

    return res;
  }
}
