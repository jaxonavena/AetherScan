import { createRoot } from 'react-dom/client'
import ErrorBoundary from './ErrorBound.jsx';
import '../assets/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
