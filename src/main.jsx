import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
       
        <BrowserRouter basename="/my-portfolio">

            <App />

        </BrowserRouter>
    </StrictMode>,
);
