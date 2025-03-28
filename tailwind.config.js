module.exports = {
  purge: ['./index.html', './js/**/*.js'], // Specify paths to HTML and JS files
  safelist: [
    'bg-white', 'dark:bg-gray-900', 'text-gray-900', 'dark:text-gray-100',
    'bg-gray-200', 'dark:bg-gray-800', 'p-4', 'container', 'mx-auto',
    'flex', 'justify-between', 'items-center', 'text-xl', 'font-bold',
    'p-2', 'bg-gray-300', 'dark:bg-gray-700', 'rounded', 'my-8',
    'text-2xl', 'font-semibold', 'mt-2', 'list-disc', 'pl-5', 'text-center',
    'header', 'footer', 'bg-header', 'bg-footer', 'text-header', 'text-footer',
    'py-4', 'px-6', 'text-lg', 'font-medium', 'border-t', 'border-b',
    'border-gray-300', 'dark:border-gray-600', 'text-gray-700', 'dark:text-gray-300',
    'bg-[#4b2e2e]', // Ensure custom background color is included
  ],
  darkMode: 'class', // Enable
