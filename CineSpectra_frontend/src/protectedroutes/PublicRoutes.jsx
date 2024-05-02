import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function PublicRoutes() {
    const token = useAuth()
    return token ? <Navigate to='/' replace/> : <Outlet />
}

export default PublicRoutes