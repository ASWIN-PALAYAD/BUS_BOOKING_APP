import React,{useState,useEffect} from 'react'
import BusForm from '../components/BusForm';
import PageTitle from '../components/PageTitle';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import { message, Table } from 'antd';
import moment from 'moment';
import { render } from 'react-dom';

const Bookings = () => {

    const [bookings, setBookings] = useState([])
    const dispatch = useDispatch();

    const columns = [
        {
            title:"Bus Name",
            dataIndex:'name',
            key:'bus',
        },
        {
            title:"Bus Number",
            dataIndex:'number',
            key:'bus'
        },
        {
            title:"Journey Date",
            dataIndex:'journeyDate',
        },
        {
            title:"Journey Time",
            dataIndex:'departure',
            
        },
        {
            title:"Seats",
            dataIndex:'seats',
        },
        {
            title:'Action',
            dataIndex:'action',
            render: (text,record)=> (
                <div>
                    <h1 className="text-md underline">Print Ticket</h1>
                </div>
            )
        }
    ]
    

    const getBookings = async() => {
        try {
          dispatch(ShowLoading());
          const response = await axiosInstance.get('/api/bookings/get-bookings-by-user-id');
          console.log(response);
          dispatch(HideLoading());
          if(response.data.success){
            const mappedData = response.data.data.map((booking)=> {
                return {
                    ...booking,
                    ...booking.bus,
                    ...booking.user,
                    key:booking._id
                }
            })
            console.log(mappedData);
            setBookings(mappedData);
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
        getBookings();
      }, [])
      

  return (
    <div>
        <PageTitle tilte={'Bookings'} />
        <Table dataSource={bookings} columns={columns} />
    </div>
  )
}

export default Bookings