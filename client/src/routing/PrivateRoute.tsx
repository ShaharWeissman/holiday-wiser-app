import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Store';
import { Role } from '../types';

type Props = {
  children: any;
  role: Role;
  // children: React.ReactNode
  // children: string | JSX.Element | JSX.Element[] | XX
};

const PrivateRoute = ({ children, role }: Props) => {
  const isLoggedIn = useAppSelector((state) => state?.auth.isLoggedIn);
  const storedRole = useAppSelector((state) => state?.auth.role);
  console.log('🚀 ~ file: PrivateRoute.tsx:16 ~ PrivateRoute ~ role', { storedRole, role });
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoggedIn) {
    if (role != storedRole) {
      navigate(-1);
    }

    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
