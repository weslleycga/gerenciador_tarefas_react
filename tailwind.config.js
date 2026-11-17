/** @type {import('tailwindcss').Config} */
export default {
  // "content" diz ao Tailwind onde procurar as classes usadas.
  // Só as classes encontradas nesses arquivos entram no CSS final.
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
