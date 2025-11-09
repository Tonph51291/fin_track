// Cấu hình API - Chỉ cần thay đổi BASE_URL ở đây để đổi địa chỉ server
export const API_CONFIG = {
  BASE_URL: 'http://10.0.2.2:3000/api',
  TIMEOUT: 10000,
  API_VERSION: '1.0.0',
};

// Cấu hình ứng dụng
export const APP_CONFIG = {
  BUILD_VERSION: '1.0.0',
  BUILD_NUMBER: 1,
};

// Hàm tiện ích để tạo URL đầy đủ cho API endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Hàm tiện ích để tạo URL đầy đủ cho hình ảnh
export const getImageUrl = (relativePath: string): string => {
  return `${API_CONFIG.BASE_URL}${relativePath}`;
};
