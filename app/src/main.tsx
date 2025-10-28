import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { spotifyAuth } from './services/spotify'

// Handle Spotify OAuth callback BEFORE router initialization
// This prevents HashRouter from interpreting the OAuth hash as a route
const hash = window.location.hash;
if (hash && hash.includes('access_token')) {
  const tokens = spotifyAuth.parseTokensFromHash();
  if (tokens) {
    spotifyAuth.saveTokens(tokens);
  }
  // Clear the OAuth hash and redirect to home
  window.location.hash = '#/';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
