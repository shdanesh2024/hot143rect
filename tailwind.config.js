/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation:{
      pulsate:' pulsate 2000ms ease-out infinite',
      'stop-pulsat': 'stop-pulsate 0.3s'
    },
    keyframes:{
      pulsate: {
        '0%': {  transform: 'scale(1)',
          opacity: 0.8},
          '66%': {transform: 'scale(2)',
            opacity: 0}
      },
      'stop-pulsat': {
        from: {
          opacity: 0.4
        },
        to:{
          transform: 'scale(2)',
          opacity: 0
        }
      }
    }
  },
  plugins: [],
}