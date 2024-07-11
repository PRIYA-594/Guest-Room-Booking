import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Book from './screens/Book';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Admin from './screens/Admin';
import Landing from './screens/Landing';
import AdminAccess from './screens/AdminAccess';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path='/book/:roomid/:fromdate/:todate' exact element={<Book />} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/profile' exact element={<Profile/>}/>
          <Route path='/admin' exact element={<Admin/>}/>
          <Route path="/" exact element={<Landing/>}/>
          <Route path="/adminAccess" exact element={<AdminAccess/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
