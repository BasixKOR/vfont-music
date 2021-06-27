module.exports = {
  purge: [
    'src/**/*.{ts,tsx}'
  ],
  jit: true,
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        spotify: {
          '500': '#1db954',
          '600': '#1ed760'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
