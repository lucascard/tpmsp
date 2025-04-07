// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (app) {
  app.document.addEventListener('DOMContentLoaded', () => {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    app.document.head.appendChild(style);
  });
}

// Ignore React Router errors
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('You cannot render a <Router> inside another <Router>')) {
    return false;
  }
  return true;
}); 