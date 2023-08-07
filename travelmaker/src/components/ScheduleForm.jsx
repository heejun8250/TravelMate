import { React, useState, forwardRef, useEffect } from 'react'

import Kanbanborad from './Kanbanborad';
import Map from './Map';

// 지역정보
import LocalData from './LocalData';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

const ScheduleForm = () => {
  const localArr = useLocation().state
  const [mapOpen, setMapOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 모달창 노출
  const showMap = () => {
    setMapOpen(true);
  }

  // 데이터 베이스에서 모든 데이터 불러오기
  const [local, setLocal] = useState({})
  const getData = async () => {
    const usersCollectionRef = collection(db, '강원도');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setLocal(data);
  }
  useEffect(()=>{
    getData();
  },[])
  
  // 검색어와 지역 데이터 비교
  const [userInput, setUserInput] = useState("")
  const [search, setSearch] = useState(true)
  const [obj, setObj] = useState()
  let obList = [];
  const searchData = () => {
    obList=[];
    for (let i = 0; i < localArr.length; i++) {
      const localTitle = [localArr[i].title];
      const filterLocal = (query) => {
        return localTitle.filter((el) =>
        el.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1)
      }
      if(filterLocal(userInput).length!=0){
          obList.push(localArr[i])
          console.log(filterLocal(userInput));
      }
      }
      opper();
    }

    const opper = ()=>{
      if (obList.length!=0) {
        setSearch(false);
        setObj(obList);
        console.log('F');
      } else {
        setSearch(true);
        console.log('T');
      }
      console.log(obList);
    }

    // 날짜 길이 설정
    const setDateRan = ()=>{
      sessionStorage.setItem('dateRan', Math.abs(parseInt(endDate.split('-')[2])-parseInt(startDate.split('-')[2])))
      sessionStorage.setItem('startDate', startDate)
      sessionStorage.setItem('endDate', endDate)
      console.log(Math.abs(endDate-startDate));
      window.location.replace('/scheduleform')
    }
    
  return (
    <div className='schedule-container'>
      <nav className='nav-list'>
        <div className="local-select b" onClick={showMap}>지역선택</div>
        {mapOpen && <Map setMapOpen={setMapOpen} />}
        <div className='date-container'>
          <div className='date-box'>
            <p className='date-select'>출발일</p>
            <input type='date'  onChange={(e) => { setStartDate(e.target.value) }}></input>
          </div>
          <div className='date-box'>
            <p className='date-select'>도착일</p>
            <input type='date' onChange={(e) => { setEndDate(e.target.value) }}></input>
          </div>
          <button className='date-create b' onClick={setDateRan}>일정 생성</button>
        </div>
      </nav>
      
      <div className='schedule-box'>
        <div className='info-box'>
          <div className='search-area'>
            <input className='search-box' placeholder='검색어를 입력하세요.' onChange={(e) => { setUserInput(e.target.value) }}></input>
            <button onClick={searchData}>검색</button>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='place-info-area'>
            {search ? 
            <>
              {localArr&&localArr.map(item=><LocalData local={item} key={item.title}/>)}
            </>:
            <>
             {obj&&obj.map(item=><LocalData local={item} key={item.title}/>)}
             </>}
          </div>
        </div>
        <div className='schedule-form'>
          {/* <div className='schedule-list'>day1</div>
          <div className='schedule-list'>+</div> */}
          <Kanbanborad/>
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm