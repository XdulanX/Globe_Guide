import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';


// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>  
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
