import React,{useState,useEffect} from 'react'
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosInstance';
import { message, Table } from 'antd';
import moment from 'moment';
 


const AdminUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  
  const columns = [
    {
      title:'Name',
      dataIndex: 'name'
    },
    {
      title:'Email',
      dataIndex:'email'
    },
    {
      title:'Role',
      dataIndex:'role'
    },
    {
      title:'Action',
      dataIndex:'action',
      render : (action,record)=> (
        <div className='d-flex gap-3' >
            <p className='underline' >
                Block
            </p>
        </div>
      )
    }
  ]

  const getUsers = async() => { 
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/users/get-all-users');
      console.log(response);
      dispatch(HideLoading());
      if(response.data.success){
        setUsers(response.data.data);
      }else{
        dispatch(HideLoading());
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  


  useEffect(() => { 
    getUsers();
  }, [])
  

  return (
    <div>
      <div className='d-flex justify-content-between' >
        <PageTitle tilte={"Users"}/>
        
      </div>
      <Table columns={columns} dataSource={users} />
      
      
    </div>
  )
}

export default AdminUsers