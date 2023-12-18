import React from 'react';
import './Card.css'; // CSS 파일을 import 합니다.
import './MainBoxContainer.css'

const Card = () => {
  return (
    <div className='card-Container'>
      <CardThumnail/>
      <CardInfoName/>
      <CardInfoJob/>
      <CardContactPhone/>
      <CardContactEmail/>
    </div>
  );
};

const CardInfoName = () =>{
    return(
      <div className='name'>
        <h2>Jin Her</h2>
      </div>
    )
}

const CardInfoJob = () =>{
  return(
    <div>
      <p className='job-title'>Developer</p>
    </div>
  )
}

const CardContactPhone = () =>{
  return(
    <div className='contact-info'>
        <p>Phone : 010-2627-7336</p>
    </div>
  )
}

const CardContactEmail = () =>{
  return(
    <div className='contact-info'>
        <p>E-mail : herj@euclidsoft.co.kr</p>
    </div>
  )
}

const CardThumnail = () =>{
  return(
   <div>
    <img className='thumnail-size' src={process.env.PUBLIC_URL + '/imagesFromNaver.jpg'}/>
  </div>
  )
}

export default Card;
