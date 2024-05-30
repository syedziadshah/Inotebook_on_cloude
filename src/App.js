import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navibar from './component/Navibar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {
  const[alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
  setAlert({
    msg:message,
    type:type
  });
  setTimeout(()=>{
    setAlert(null)
  },1500);
  }
  return (
    <div className="App">
    <NoteState>
      <Router>
        <Navibar />
        <Alert message="i am working on the react it very amazing "/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home showAlert={showAlert } />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert } />} />
          <Route path="/signup" element={<Signup showAlert={showAlert } />} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
