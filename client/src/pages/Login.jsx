import React from 'react';
import '../resources/auth.css'
import {Form, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async(values) => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post('/api/users/login',values);
            dispatch(HideLoading())
            if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem('token',response.data.data)
                window.location.href='/'
            }else{
                message.error(response.data.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)       

        }
    }




  return (
    <div className='h-screen d-flex justify-content-center align-items-center auth '>
        <div className='w-400 card p-3'>
            <h1 className='text-lg'>SheyBus - Login</h1>
            <hr />
            <Form layout='vertical' onFinish={onFinish} >
                
                <Form.Item label='email' name='email' > 
                    <input type='email' />
                </Form.Item>
                <Form.Item label='password' name='password' >
                    <input type='password' />
                </Form.Item>

                <div className="d-flex justify-content-between align-items-center my-3">
                    <Link to='/register'>Click here to Register</Link>
                    <button type='submit' className="secondary-btn ">Login</button>
                </div>
                
            </Form>
        </div >
    </div >
  )
}

export default Login