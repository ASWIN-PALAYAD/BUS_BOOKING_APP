import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './resources/global.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<ProtectedRoute> <Home/> </ProtectedRoute>} />
        <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />
        <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
