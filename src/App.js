
import './App.css';
import Home from './components/Home/Home';
import { useState } from 'react';
import { createContext } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Student from './components/Student/Student';
import Food from './components/Food/Food';
import ServeFood from './components/ServeFood/ServeFood';


export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    image: "",
    fullName: "",
    roleName: "",
    signedIn: false,
    district: [],
    zone: {},
    area: {},
    sideBar: false,
    profileImg:"",
    login: "",
    time: "",
    roleID: 0,
    baseUrl: "http://127.0.0.1:8000/",
    dashboardData: null,
    sAdminBar: false,
    editDistrictStatus: false,
    editAreaStatus: false,
    editZoneStatus: false,
    editDistrictPositionStatus: false,
    clubEditStatus: {
      editClubInfoStatus: false,
      editClubBoardStatuts: false,
      editSuestSpeakerStatus: false,
      editClassification: false,
    },
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     
     <Router>
          <Routes>
          <Route path="/food" element={<Food />}>
            {/* <Food /> */}
          </Route>
          <Route path="/student" element={<Student />}>
            {/* <Food /> */}
          </Route>
          <Route path="/serveFood" element={<ServeFood />}>
            {/* <Food /> */}
          </Route>
          {/* <Route path="/student">
            <Student />
          </Route> */}
          
          <Route exact path="/" element={<Home />}>
            {/* <Home /> */}
          </Route>
          </Routes>
        </Router>
          
     </UserContext.Provider>
  );
}

export default App;
