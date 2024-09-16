import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Assuming the entry file for react-barcode-reader is located at
      // node_modules/react-barcode-reader/dist/index.js
      // Adjust the path according to the actual location and file name
      'react-barcode-reader': path.resolve(__dirname, 'node_modules/react-barcode-reader/lib/index.js'),
    },
  },
});