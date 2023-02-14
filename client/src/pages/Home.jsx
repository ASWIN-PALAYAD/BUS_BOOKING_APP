import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import Bus from '../components/Bus';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({})

  const getBuses = async() => {
    let tempFilters = {}
    Object.keys(filters).forEach((key)=>{
      if(filters[key]){
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post('/api/buses/get-all-buses', {filters : tempFilters});
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
      <div className='my-3 card-sm px-2 py-3' >
        <Row gutter={10} align='center'>
          <Col lg={6} sm={25} >
            <input type="text" 
                   placeholder='From' 
                   value={filters.from}
                   onChange={(e)=>setFilters({...filters,from:e.target.value}) }
            />
          </Col>
          <Col lg={6} sm={25} >
            <input type="text" 
                   placeholder='To' 
                   value={filters.to}
                   onChange={(e)=>setFilters({...filters,to:e.target.value}) }
            />
          </Col>
          <Col lg={6} sm={25} >
            <input type="date" 
                   placeholder='Date' 
                   value={filters.journeyDate}
                   onChange={(e)=>setFilters({...filters,journeyDate:e.target.value}) }
            />
          </Col>
          <Col lg={6} sm={24} >
            <div className="d-flex gap-2">
            <button className='primary-btn' onClick={()=> getBuses()} >Filter</button>
            <button className='secondary-btn' 
                    onClick={()=> setFilters({
                      from:'',
                      to:'',
                      journeyDate:''
                    })} >Clear</button>
            </div>
          </Col>
        </Row>
      </div>

      {/* display buses */}
      <div>
        <Row>
          {buses?.filter(bus => bus.status === 'Yet To Start').map((bus)=>(
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