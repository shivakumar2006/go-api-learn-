import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Content from './pages/Content';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
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
