import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LocalDetail from './LocalDetail';

const LocalData = ({local}) => {

    const [detailOpen, setDetailOpen] = useState(false); // 맵 모달창 노출 여부 state

    // 모달창 노출
    const showMap = () => {
      setDetailOpen(true);
    }

  return (
    <div className='place-info-box'>
      {detailOpen && <LocalDetail setDetailOpen={setDetailOpen} local={local}/>}
        <p onClick={showMap}>{local.title}</p>
        <img src={local.image} width='100%' onClick={showMap}></img>
    </div>
  )
}

export default LocalData