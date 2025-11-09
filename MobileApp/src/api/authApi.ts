import {AuthResponse, LoginPayload, RegisterPayload} from '../types/user';
import {api} from './api';

export const authApi = {
  register: (data: RegisterPayload) =>
    api.post<AuthResponse>('/users/register', data),

  login: (data: LoginPayload) => api.post<AuthResponse>('/users/login', data),
};
