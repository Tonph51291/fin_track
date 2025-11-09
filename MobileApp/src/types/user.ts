// ==== Kiểu dữ liệu người dùng ====
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // optional, thường không trả về từ API
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
  token: string | null;
}

// ==== Kiểu dữ liệu khi đăng ký ====
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// ==== Kiểu dữ liệu khi đăng nhập ====
export interface LoginPayload {
  email: string;
  password: string;
}

// ==== Kiểu phản hồi từ server khi đăng ký / đăng nhập ====
export interface AuthResponse {
  user: User;
  token: string;
}
