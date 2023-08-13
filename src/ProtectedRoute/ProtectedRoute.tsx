
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode;
  }
  

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("bookcart_token")
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            return navigate('/login')
        } 
    },[navigate, token])

    if(token){
        return <>{children}</>
    }
  
}

export default ProtectedRoute