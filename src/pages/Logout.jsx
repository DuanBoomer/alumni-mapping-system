import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function Logout(){
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify({ type: '', email: '' }));
        navigate("/")
    }, [])
}