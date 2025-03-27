// Add interactivity with JavaScript if needed

const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('bg-gray-100')) {
        body.classList.remove('bg-gray-100', 'text-gray-900');
        body.classList.add('bg-gray-900', 'text-gray-100');
    } else {
        body.classList.remove('bg-gray-900', 'text-gray-100');
        body.classList.add('bg-gray-100', 'text-gray-900');
    }
});