import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import Bus from '../components/Bus';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  const getBuses = async() => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get('/api/buses/get-all-buses');
      dispatch(HideLoading());
      if(response.data.success){
        setBuses(response.data.data);
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
    getBuses();
  }, [])


  return (
    <div>
      {/* filter area */}
      <div>

      </div>

      {/* display buses */}
      <div>
        <Row>
          {buses?.map((bus)=>(
            <Col lg={12} xs={24} sm={24} >
               <Bus bus={bus} />
            </Col>
            
          ))}
        </Row>
      </div>

    </div>
  )
}

export default Home