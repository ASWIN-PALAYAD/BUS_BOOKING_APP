import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { SetUser } from '../redux/userSllice';

const ProtectedRoute = ({children}) => {

  const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const validateToken = async() => {
        try {
            const response = await axios.post('/api/users/get-user-by-id',{},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                setLoading(false)
                dispatch(SetUser(response.data.data))
            }else{
                setLoading(false)
                localStorage.removeItem('token');
                message.error(response.data.message)
                navigate('/login')
            }
        } catch (error) {
            setLoading(false)
            localStorage.removeItem('token');
            message.error(error.message)
            navigate('/login')
        }
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
        validateToken()
      }else{
        navigate('/login')
      }
    }, [])
    

  return (
    <div>
        {loading ? <div>...loading</div> : <div>{children}</div>}
    </div>
  )
}

export default ProtectedRoute