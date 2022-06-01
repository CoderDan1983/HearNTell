import React from 'react'; //* react 18 asks for this, but it didn't work with strict mode so I removed strict mode.
import ReactDOM from 'react-dom/client'; //'react-dom' (standard, but now depreciated : ) )
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production'){
  disableReactDevTools(); //* untested, because I may not have react dev tools in the first place! :D
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={ <App /> } />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

/* <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={ <App /> } />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode> */

//Note (from https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)
//StrictMode has gotten stricter in React 18.  If your app isn't working under the new system, try unwrapping
//the code's strict mode! :D 

// ReactDOM.render( //* this code is actually depreciated now :)
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );









// import React from 'react'; //* this is the code from the tutorial.  It still works, but is outdated for React18
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { AuthProvider } from './context/AuthProvider';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<App />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );