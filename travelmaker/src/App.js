// css 불러오기
import './components/css/Header.css';
import './components/css/Main.css';
import './components/css/Select.css';
import './components/css/Common.css';
import './components/css/Schedule.css';
import './components/css/Login.css';
import './components/css/Preference.css';
import './components/css/Membership.css';
import './components/css/Myschedule.css';
import './components/css/Recommend.css';
import './components/css/Information.css';
import './components/css/Application.css';
import './components/css/Scheduledetail.css';

// 컴포넌트 불러오기
import Header from './components/Header';
import Main from './components/Main'
import Select from './components/Select';
import ScheduleForm from './components/ScheduleForm'
import Recommend from './components/Recommend';
import Login from './components/Login';
import Preference from './components/Preference';
import Membership from './components/Membership';
import Myschedule from './components/Myschedule';
import Information from './components/Information';
import Application from './components/Application'
import Scheduledetail from './components/Scheduledetail';


import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/select' element={<Select />}></Route>
        <Route path='/scheduleform' element={<ScheduleForm />}></Route>
        <Route path='/recommend' element={<Recommend />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/preference' element={<Preference />}></Route>
        <Route path='/membership' element={<Membership />}></Route>
        <Route path='/myschedule' element={<Myschedule />}></Route>
        <Route path='/information' element={<Information />}></Route>
        <Route path='/application' element={<Application />}></Route>
        <Route path='/scheduledetail' element={<Scheduledetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
