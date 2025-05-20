
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.info("App rendering - AuthProvider will be initialized");
createRoot(document.getElementById("root")!).render(<App />);
