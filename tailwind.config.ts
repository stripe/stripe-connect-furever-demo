import type {Config} from 'tailwindcss';

const config = {
  darkMode: ['class'],
  important: true,
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        offset: {
          DEFAULT: 'var(--offset)',
        },
        subdued: {
          DEFAULT: 'var(--subdued)',
          foreground: 'var(--subdued-foreground)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          subdued: 'var(--accent-subdued)',
          foreground: 'var(--accent-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
          border: 'var(--success-border)',
          foreground: 'var(--success-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionProperty: {
        border: 'border-color',
      },
    },
    fontFamily: {
      sans: ['Sohne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    backgroundImage: {
      'paw-pattern': "url('/pattern.png')",
    }
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
