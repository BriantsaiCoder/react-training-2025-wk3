import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // 開發環境與其他部署(EX:IIS),生產環境路徑
  base: process.env.NODE_ENV === 'production' ? '/react-training-2025-wk3/' : '/',
  plugins: [react()],
});
