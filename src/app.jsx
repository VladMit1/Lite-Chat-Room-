import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './app.css';

export const App = () => {
   const [count, setCount] = useState(0);
   const [apiInfo, setApiInfo] = useState(null);

   useEffect(() => {
      fetch('/api/v1')
         .then((data) => data.json())
         .then((data) => setApiInfo(data));
   }, []);

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Hello Vite + React!</p>
            <p>
               <button
                  type="button"
                  onClick={() => setCount((count) => count + 1)}
               >
                  count is: {count}
               </button>
            </p>
            <p>
               Edit <code>app.jsx</code> and save to test HMR updates.
            </p>
            {apiInfo && (
               <ul>
                  {Object.keys(apiInfo).map((key) => (
                     <li key={key}>
                        {key.toUpperCase()}: {apiInfo[key]}
                     </li>
                  ))}
               </ul>
            )}
            <p>
               <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Learn React
               </a>
               {' | '}
               <a
                  className="App-link"
                  href="https://vitejs.dev/guide/features.html"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Vite Docs
               </a>
            </p>
         </header>
      </div>
   );
};