import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import MainLayout from './Components/LayoutArea/MainLayout/MainLayout';
import interceptor from './Utils/interceptors';
import { holidaysStore } from './Redux/HolidaysState';

interceptor.create();
console.log('Interceptor Created'); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={holidaysStore}> {/* Wrap your app with Provider */}
      <MainLayout />
    </Provider>
  </BrowserRouter>
);