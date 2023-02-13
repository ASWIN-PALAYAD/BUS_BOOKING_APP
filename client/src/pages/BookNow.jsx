import { Col, message, Row } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const BookNow = () => {
    const dispatch = useDispatch();
    const [bus, setBus] = useState(null);
    const params = useParams();
    const [selectedSeats, setSelectedSeats] = useState([])



    const getBus = async() => {
        try {
          dispatch(ShowLoading());
          const response = await axiosInstance.post('/api/buses/get-bus-by-id',{
            _id:params.id
          });
          dispatch(HideLoading());
          if(response.data.success){
            setBus(response.data.data);
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
        getBus();
      }, [])
  return (
    <div>
        {bus && (
            <Row className='mt-3' gutter={20}>
            {/*  bus deatails area */}
            <Col lg={12} xs={24} sm={24} >
                <h1 className="text-xl text-secondary">{bus.name}</h1>
                <h1 className="text-md">{bus.from} - {bus.to}</h1>
                <hr />
                <div className='flex flex-col gap-1' >
                    <h1 className='text-lg'><b>Journey Date :</b> {bus.journeyDate} </h1>
                    <div className="text-lg"><b>Fare : ${bus.fare}/-</b></div>
                    <div className="text-lg"><b>Departure Time : {bus.departure}</b></div>
                    <div className="text-lg"><b>Arrival Time : {bus.arrival}</b></div>
                </div>
                <hr />
                <div className='flex flex-col gap-2 mt-2' >
                    <h1 className='text-2xl' > 
                        <b>Selected Seats</b>: {selectedSeats.join(',')}
                    </h1>
                    <h1 className='text-2xl'>Fare : <b>$ {bus.fare*selectedSeats.length}</b></h1>
                    <button className='secondary-btn mt-3' >Book Now</button>
                </div>
            </Col>

            {/* seat selection area */}
            <Col lg={12} xs={24} sm={24} >
                <SeatSelection selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bus={bus} />
            </Col>
        </Row>
        )}
    </div>
  )
}

export default BookNow