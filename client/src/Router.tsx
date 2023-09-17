import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default Routing;
