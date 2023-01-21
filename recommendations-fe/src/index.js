import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavbarComponent from './components/NavbarComponent';
import FooterComponents from './components/FooterComponents';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavbarComponent/>
    <App />
    <FooterComponents/>
  </React.StrictMode>
);


