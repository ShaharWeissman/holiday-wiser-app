import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './Components/LayoutArea/MainLayout/MainLayout';
import interceptor from './Utils/interceptors';

interceptor.create();
console.log('Interceptor Created'); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);

