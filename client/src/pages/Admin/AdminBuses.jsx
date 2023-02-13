import React,{useState} from 'react'
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle';

const AdminBuses = () => {
  
  const [showBusForm, setShowBusForm] = useState(false)

  return (
    <div>
      <div className='d-flex justify-content-between' >
        <PageTitle tilte={"Buses"}/>
        <button onClick={()=> setShowBusForm(true)} className='primary-btn' >Add Bus</button>
      </div>
      {showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} />}
    </div>
  )
}

export default AdminBuses