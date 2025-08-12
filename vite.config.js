import { resolve } from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        cart: resolve(__dirname, 'cart/index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        order: resolve(__dirname, 'order/index.html'),
        'product-detail': resolve(__dirname, 'product-detail/index.html'),
        reviews: resolve(__dirname, 'reviews/index.html'),
        'thank-you': resolve(__dirname, 'thankyou/index.html'), // Corrected path
      },
    },
  },
});