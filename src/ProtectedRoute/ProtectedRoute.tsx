
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            return navigate('/login')
        } 
    },[navigate, token])

    if(token){
        return children
    }
  
}

export default ProtectedRoute