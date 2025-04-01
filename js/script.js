// Add interactivity with JavaScript if needed

// Note: Always ensure that code is correct and tested before finalizing changes.
// This includes verifying syntax, functionality, and integration with other parts of the project.

// Enable the random quote generation code
fetch('data/quotes.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteContainer = document.getElementById('randomQuote');
        if (quoteContainer) {
            quoteContainer.innerHTML = `"${randomQuote.quote}" - ${randomQuote.author}`;
        }
    })
    .catch(error => {
        console.error('Error fetching quotes:', error);
    });

// Method to popup an alert message
function showAlert(message) {
    alert(message);
}

// Commenting out the background code
/*
document.addEventListener('DOMContentLoaded', () => {
    const images = [
        './assets/images/BNP_Trail.jpg',
        './assets/images/BM_Cove.png',
        './assets/images/BM_Trail.png'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const mainElement = document.querySelector('main');
    if (mainElement) {
        const img = new Image();
        img.src = randomImage;
        img.onload = () => {
            heroSection.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('${randomImage}')`;
        };
    }
});
*/