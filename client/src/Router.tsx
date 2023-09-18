import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/admin/Dashboard';
import AddHoliday from './components/pages/admin/AddHoliday';
import EditHoliday from './components/pages/admin/EditHoliday';

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/addHoliday" element={<AddHoliday />} />
      <Route path="/editHoliday" element={<EditHoliday />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default Routing;
