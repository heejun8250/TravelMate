import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MyscheduleForm from './MyscheduleForm';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'



const Myschedule = () => {
  const nick = sessionStorage.getItem('nick');
  const selectMy = sessionStorage.getItem('select_my')
  const [myOrApp, setMyOrApp] = useState(true);
  
  // 게시판 정보 받아오기
  const [scheduleData, setScheduleData] = useState({})
  const getSchData = async (e) => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setScheduleData(data);
  }

  useEffect(()=>{
    getSchData();
  },[])

  useEffect(() => {
    if (selectMy != null) {
      setMyOrApp(true)
    } else {
      setMyOrApp(false)
      sessionStorage.setItem('select_my', 'my')
    }
  }, [])

  const my = () => {
    setMyOrApp(true);
  }
  const app = () => {
    setMyOrApp(false);
    sessionStorage.setItem('select_my', 'my')
  }

  const [schData, setSchData] = useState([]);
  const searchSchedule = ()=>{
    let dataList = [];
    try{
    for(let i=0; i<scheduleData.length; i++){
      if(scheduleData[i].userNick === nick){
        dataList.push(scheduleData[i])
      }
    }
    setSchData(dataList);
    // console.log(dataList)
    }catch{
      console.log("이상무!");
    }
  }

  useEffect(()=>{
    searchSchedule();
    console.log(schData);
  },[scheduleData])

  return (
    <div className='my-schedule-container'>
      <div className='my-schedule-box'>
        <div className='my-schedule-menu'>
          <div className='my-schedule-select'>
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" onClick={my} />
              <label className='my-sche-btn b' for='my_t' >내가 등록한 일정</label>
              <input id='my_s' type="radio" name="my_sch" onClick={app} />
              <label className='my-sche-btn btn-b b' for='my_s'>신청자 목록</label>
            </div>

          </div>
        </div>
        {/* 클래스명에 detail 붙은 디자인은 PartyMember.css에 있음 */}
        {myOrApp&&myOrApp ? 
        <div className='my-schedule-form'>
        {schData.map(item=><MyscheduleForm schData={item} key={item.title}/>)}
        </div> :
          <div className='my-schedule-form'>
            <div className='my-schedule-list'>
              <div className='detail-list-title'>태녕이와 함께하는 행복하고 즐거운 여행</div>
              <div className='apply-list'>신청한 사람 ▼</div>
              <div className="apllicant-box">
                {/* 이름 15명 까지만 */}
                <div className='applicant'>김도운</div>
                <div className='applicant'>국지호</div>
                <div className='applicant'>임영찬</div>
                <div className='applicant'>이강휘</div>
                <div className='applicant'>김원영</div>
              </div>
            </div>
            <div className='my-schedule-list'>
              <div className='detail-list-title'>제목</div>
              <div className='apply-list'>신청한 사람 ▼</div>
              <div className="apllicant-box">
                <div className='applicant'>정태녕</div>
                <div className='applicant'>김도운</div>
              </div>
            </div>    
          </div>}
      </div>
    </div>
  )
}

export default Myschedule