// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import CreateAdmin from './Components/CreateAdmin';
import CreateUser from './Components/CreateUser';
import Invoice from './Components/Invoice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './context/temp/NoteState';
import RfpWorker from './Components/RfpWorker'
import Alert from './Components/Alert';
import Login from './Components/Login';
import { useState } from 'react';

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },2000)
  }
  return (
    
    <>
    
    {/* <Navbar/>
    <CreateAdmin/>
    <CreateUser/>
    <Invoice/> */}
    
    <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            {/* Display the Login component if the user is not logged in */}
            {!isLoggedIn && <Route path="/" element={<Login showAlert={showAlert}/>} />}
            {/* Display the content if the user is logged in */}
            {isLoggedIn && (
              <>
                <Route exact path="/home" element={<RfpWorker />} />
                <Route exact path="/create-admin" element={<CreateAdmin showAlert={showAlert}/>} />
                <Route exact path="/create-user" element={<CreateUser showAlert={showAlert}/>} />
                <Route exact path="/invoice" element={<Invoice />} />
              </>
            )}
          </Routes>
        </Router>
      </NoteState>


    

    </>
  );
}

export default App;
