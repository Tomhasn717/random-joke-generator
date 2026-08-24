const getJokeBtn = document.getElementById('get-joke-btn');
const copyBtn = document.getElementById('copy-btn');
const jokeText = document.getElementById('joke-text');
const loading = document.getElementById('loading');

// API endpoint for jokes
const JOKE_API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Function to fetch a random joke
async function fetchJoke() {
    loading.style.display = 'block';
    getJokeBtn.disabled = true;
    
    try {
        const response = await fetch(JOKE_API_URL);
        const data = await response.json();
        
        // Combine setup and punchline
        const fullJoke = `${data.setup}\n\n${data.punchline}`;
        jokeText.textContent = fullJoke;
        
        loading.style.display = 'none';
        getJokeBtn.disabled = false;
    } catch (error) {
        jokeText.textContent = 'Oops! Failed to load a joke. Try again!';
        console.error('Error fetching joke:', error);
        loading.style.display = 'none';
        getJokeBtn.disabled = false;
    }
}

// Function to copy joke to clipboard
function copyJoke() {
    const jokeContent = jokeText.textContent;
    navigator.clipboard.writeText(jokeContent).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy joke');
    });
}

// Event listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);

// Load a joke on page load
window.addEventListener('load', fetchJoke);