import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ProtectedRoutes = () => {
  const { isConnected } = useAccount();

  return isConnected ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoutes;
