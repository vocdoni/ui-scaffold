import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'

const ProtectedRoutes = () => {
  const { signerAddress } = useAuth()

  return signerAddress ? <Outlet /> : <Navigate to='/' replace={true} />
}

export default ProtectedRoutes
