import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Content from './pages/Content';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {

  const location = useLocation();

  const hideLayout = ["/signup", "/login"].includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<Signup />} />
        <Route path='/content' element={<Content />} />
      </Routes>
    </>
  )
}

export default App;
