import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import LocalStorageService from './LocalStorageService';
import { Role, Vacation } from '../types';
import store from '../Store';
import { logout } from '../Store/user.slice';

const BASE_URL = 'http://localhost:4000/api/';
const DOMAIN = 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const TOKEN_LS_KEY = 'token';
const ROLE_LS_KEY = 'role';

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = LocalStorageService.get(TOKEN_LS_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

type AuthUser = {
  email: string;
  password: string;
};

type UserModel = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const HttpService = {
  async register(user: UserModel): Promise<Role> {
    try {
      const response: AxiosResponse<any, any> = await axiosInstance.post('/auth/register', user);

      const { token, role } = response.data;

      if (token && role) {
        LocalStorageService.set(TOKEN_LS_KEY, token);
        LocalStorageService.set(ROLE_LS_KEY, role);
      } else {
        throw new Error('Login failed');
      }

      if (role !== 'User' && role !== 'Admin') {
        throw new Error('Role provided not recognized: ' + role);
      }

      return role;
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:59 ~ register ~ error', error);
      return 'User';
    }
  },
  async login({ email, password }: AuthUser): Promise<Role> {
    try {
      const result: AxiosResponse<any, any> = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      if (!result?.data) {
        throw new Error('no data!');
      }

      const { token, role } = result.data;

      if (token && role) {
        LocalStorageService.set(TOKEN_LS_KEY, token);
        LocalStorageService.set(ROLE_LS_KEY, role);
      } else {
        throw new Error('Login failed');
      }

      if (role !== 'User' && role !== 'Admin') {
        throw new Error('Role provided not recognized: ' + role);
      }

      return role;
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:17 ~ login ~ error', error);
      return 'User';
    }
  },
  async getAllVacationsForUser(): Promise<Vacation[]> {
    try {
      const result: AxiosResponse<Vacation[]> = await axiosInstance.get('/users/vacations');

      return result.data.map((v) => ({
        ...v,
        imageName: DOMAIN + v.imageName,
      }));
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:17 ~ login ~ error', error);
      return [];
    }
  },
  async getAllVacationsForAdmin(): Promise<Vacation[]> {
    try {
      const result: AxiosResponse<Vacation[]> = await axiosInstance.get('/admin/vacations');

      return result.data.map((v) => ({
        ...v,
        imageName: DOMAIN + v.imageName,
      }));
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:17 ~ login ~ error', error);
      return [];
    }
  },
  async DeleteVacation(vacationId: number | string): Promise<boolean> {
    try {
      const result: AxiosResponse<Vacation[]> = await axiosInstance.delete(
        '/admin/vacations/' + vacationId
      );
      console.log('🚀 ~ file: HttpService.ts:133 ~ DeleteVacation ~ result', result);
      return true;
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:139 ~ DeleteVacation ~ error', error);
      return false;
    }
  },
  async UpdateVacation(vacation: Vacation): Promise<boolean> {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      await axiosInstance.put('/admin/vacations/' + vacation.vacationId, vacation, config);

      return true;
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:132 ~ UpdateVacation ~ error', error);
      return false;
    }
  },
  async AddVacation(vacation: Vacation): Promise<boolean> {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      await axiosInstance.post('/admin/vacations', vacation, config);
      return true;
    } catch (error) {
      console.error('🚀 ~ file: HttpService.ts:132 ~ UpdateVacation ~ error', error);
      return false;
    }
  },
  async ToggleFollow(vacationId: string | number) {
    try {
      await axiosInstance.post('/users/follow/' + vacationId);
      return true;
    } catch (error) {
      return false;
    }
  },
  async ToggleUnFollow(vacationId: string | number) {
    try {
      await axiosInstance.delete(`/users/follow/${vacationId}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default HttpService;
