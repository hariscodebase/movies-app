import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: 'd6d9d7451bf97d1a033fa971b3db9749',
  plugins: [new BugsnagPluginReact()]
})


const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    
  </React.StrictMode>
);

