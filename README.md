# Static Website

This is a fully responsive and accessible static website built with HTML5, Tailwind CSS, and Vanilla JavaScript. It includes a dark mode toggle and is designed to be mobile-first.

## Project Structure
```
/index.html
/css/styles.css
/js/script.js
/assets/images/
```

## Features
- Responsive design using Tailwind CSS
- Dark mode toggle with JavaScript
- Accessible layout with semantic HTML

## Setup Instructions

### Option 1: Using Tailwind CSS CDN
1. The project already includes the Tailwind CSS CDN in `index.html`. No additional setup is required.

### Option 2: Using PostCSS Build
1. Install Node.js and npm if not already installed.
2. Run the following commands in the project directory:
   ```bash
   npm init -y
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```
3. Configure `tailwind.config.js` to include your content paths:
   ```javascript
   module.exports = {
       content: ['./index.html', './js/**/*.js'],
       theme: {
           extend: {},
       },
       plugins: [],
   };
   ```
4. Add the following to `postcss.config.js`:
   ```javascript
   module.exports = {
       plugins: {
           tailwindcss: {},
           autoprefixer: {},
       },
   };
   ```
5. Add the Tailwind directives to `css/styles.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
6. Build the CSS:
   ```bash
   npx tailwindcss -i ./css/styles.css -o ./css/styles.css --watch
   ```

## Deployment Instructions

### Deploy to GitHub Pages
1. Push your project to a GitHub repository.
2. Go to the repository settings and enable GitHub Pages under the "Pages" section.
3. Select the branch and folder (e.g., `main` and `/root`) to deploy.

### Deploy to Netlify
1. Create a Netlify account at [Netlify](https://www.netlify.com/).
2. Drag and drop your project folder into the Netlify dashboard.
3. Alternatively, connect your GitHub repository to Netlify for automatic deployment.

## Notes
- Replace placeholder text and images in the project with your actual content.
- Ensure all accessibility features are tested before going live.

## Updates
- Updated the header bar color to an earthy tone and ensured text color matches the theme.