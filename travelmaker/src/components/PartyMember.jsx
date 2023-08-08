import React, { useEffect, useState } from 'react'
import MapParty from './MapParty';


function PartyMember() {
  const localName = sessionStorage.getItem('localName')
  const [mapOpen, setMapOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 지역선택 모달창 노출
  const showMap = () => {
    setMapOpen(true);
  }

  const matchNum = sessionStorage.getItem('matchNum')
  let matchUsers = [];
  for (let i = 0; i < matchNum; i++) {
    matchUsers.push(sessionStorage.getItem(`matchUsers${i}`))
  }
  console.log(matchUsers);

  const [allOrRec, setAllOrRec] = useState(true); // 전체보기 혹은 추천보기
  const all = () => { setAllOrRec(true); } // 전체보기
  const rec = () => {
    setAllOrRec(false);
  } // 추천보기

  return (
    <div className='detail-container'>
      <div className='detail-box'>
        <div className='recommend-menu'>
          <div className='recommend-select'>
            <input id='my_t' type="radio" name="my_sch" onClick={all} />
            <label className='my_text b' for='my_t' >전체보기</label>
            <input id='my_s' type="radio" name="my_sch" onClick={rec} />
            <label className='my_text b' for='my_s'>추천보기</label>
          </div>
        </div>

        <div className='detail-application'>
          <div className='detail-select'>
            <div className="member-local-select b" onClick={showMap}>지역선택</div>
            {mapOpen && <MapParty setMapOpen={setMapOpen} />}
            <div className='date-container'>
              <div className="date-box">
                <p className="date-select">출발일</p>
                <input type='date'></input>
              </div>
              <div className="date-box">
                <p className="date-select">도착일</p>
                <input type='date'></input>
              </div>
            </div>
          </div>
        </div>
        <div>선택한 지역 : {localName}</div>
        <div className='detail-form'>
          {allOrRec ?
            <div className='detail-list'>
              <div>전체일정</div>
              <div>작성자</div>
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
            </div>
            :
            <>
              {matchUsers.map((id) => {
                return (<div className='detail-list'>
                  <div>{id}</div>
                  <div>내용</div>
                  <div>내용</div>
                  <div>내용</div>
                </div>)
              })}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default PartyMember