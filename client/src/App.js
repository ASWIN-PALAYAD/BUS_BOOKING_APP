import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './resources/global.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome'
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';



function App() {

  const {loading} = useSelector(state => state.alerts) 
  return (
    <div>
      { loading && <Loader/>}
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element= {<ProtectedRoute> <Home/> </ProtectedRoute>} />
          <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />
          <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>} />

          <Route path='/Admin' element= {<ProtectedRoute> <AdminHome/> </ProtectedRoute>} />
          <Route path='/Admin/buses' element= {<ProtectedRoute> <AdminBuses/> </ProtectedRoute>} />
          <Route path='/Admin/users' element= {<ProtectedRoute> <AdminUsers/> </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
