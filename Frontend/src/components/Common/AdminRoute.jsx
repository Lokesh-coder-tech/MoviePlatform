import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // Agar user logged in nahi hai ya role admin nahi hai, toh home bhej do
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;