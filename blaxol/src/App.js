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
import PageNotFound from './Components/PageNotFound';
import Proposal1 from './Components/Proposal1';
import Proposal2 from './Components/Proposal2';
import Receipt from './Components/Receipt';


function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [alert,setAlert] = useState(null)
  
  
  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },5000)
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
            {!isLoggedIn && <Route path="/login" element={<Login showAlert={showAlert}/>} />}
            {/* Display the content if the user is logged in */}
            {isLoggedIn && (
              <>
                <Route exact path="/"  element={<RfpWorker  />} />
                <Route exact path="/create-admin" element={<CreateAdmin  showAlert={showAlert}/>} />
                <Route exact path="/create-user" element={<CreateUser    showAlert={showAlert}/>} />
                <Route exact path="/invoice" element={<Invoice   />} />
                <Route path="*" element={<PageNotFound/>} />
                <Route exact path="/generate1" element={<Proposal1  showAlert={showAlert}/>} />
                <Route exact path="/generate2" element={<Proposal2    showAlert={showAlert}/>} />
                <Route exact path="/generate3" element={<Receipt  showAlert={showAlert}/>} />

                
                
              </>
            )}
          </Routes>
        </Router>
      </NoteState>


    

    </>
  );
}

export default App;
