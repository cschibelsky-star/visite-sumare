import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        sumare: {
          green: '#1A6B2F',
          yellow: '#F5C000',
          cream: '#FFF8DF',
          ink: '#12351E',
          soft: '#EDF7EF'
        }
      },
      borderRadius: {
        sumare: '16px'
      },
      boxShadow: {
        sumare: '0 16px 40px rgba(26, 107, 47, 0.14)'
      }
    }
  },
  plugins: []
};

export default config;
