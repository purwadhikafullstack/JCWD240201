/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // 'emerald',
      {
        // mytheme: {
        //   primary: '#ff5757',
        //   secondary: '#769afc',
        //   accent: '#96dd11',
        //   neutral: '#15181e',
        //   'base-100': '#ffffff',
        //   info: '#72acf3',
        //   success: '#27e7a1',
        //   warning: '#b6910c',
        //   error: '#e73b32',
        // },
        mytheme: {
          primary: '#e11d48',
          secondary: '#0284c7',
          accent: '#0d9488',
          neutral: '#2a323c',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#fb7185',
        },
      },
    ],
  },
};
