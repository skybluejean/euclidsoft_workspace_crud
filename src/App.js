
///////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './client/MainBoxContainer.css'
import './client/InputBox.css';
import './client/Card.css';
import './client/ButtonForR&D.css';

//import { useNavigate } from 'react-router-dom';

const App = () => {
    const [userInfo, setUserInfo] = useState([{
      name : "",
      job_title : "",
      phone_number : "",
      email : ""
    }]);
    // const [formData, setFormData] = useState({
    //     name: '',
    //     job_title: '',
    //     phone_number: '',
    //     email: ''
    // });

    //const navigate = useNavigate();

    // useEffect(() => {
    //     // 서버로부터 사용자 목록을 가져옴
    //     axios.get('http://localhost:3001/')  // 서버 주소에 맞게 수정
    //         .then(response => setUserInfo(response.data))
    //         .catch(error => console.error('Error fetching users:', error));
    // }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
      const fetchAllUserInfo = async() => {
        try{
          const res = await axios.get('http://localhost:3001/');
          setUserInfo(res.data);
        }catch(err){
          console.log(err);
        }
      };
      fetchAllUserInfo();
    }, []);

    /*
    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터를 서버로 전송
        axios.post('http://localhost:3001/', formData)  // 서버 주소에 맞게 수정
            .then(response => {
                console.log(response.data);
                //navigate('/');
                
                // 사용자 목록을 갱신
                axios.get('http://localhost:3001/')  // 서버 주소에 맞게 수정
                    .then(response => setUserInfo(response.data))
                    .catch(error => console.error('Error fetching users:', error));
                
            })
            .catch(error => console.error('Error creating user:', error));
    };
    */

    const handleSubmit = async (e) =>{
      e.preventDefault();
      /*
      //alert("Submited!!!");
      try{
        await axios.post('http://localhost:3001/', userInfo);
        console.log('Success!!!');
      }catch(err){
        console.log(err);
      }
      */
      axios.post('http://localhost:3001/', userInfo)  // 서버 주소에 맞게 수정
      .then(response => {
          console.log(response.data);
          //navigate('/');
          
          // 사용자 목록을 갱신
          axios.get('http://localhost:3001/')  // 서버 주소에 맞게 수정
              .then(response => setUserInfo(response.data))
              .catch(error => console.error('Error fetching users:', error));
          
      })
      .catch(error => console.error('Error creating user:', error));
    }

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    const handleChange = (e) => {
      setUserInfo((prev) => ([{ ...prev, [e.target.name]: e.target.value}]));
    };

    const handleDelete = async (id) => {
      try{
        await axios.delete(`http://localhost:3001/${id}`);
        window.location.reload()
      }catch(err){
        console.log(err);
      }
    }

    return (
        <div className='main-Container'>
          <div className='main-Container-InputBox'>
            <h2 className='title-Design-Input'>Name Card Information Input</h2>
            {/* 사용자 정보 입력 폼 */}
              <form onSubmit={handleSubmit} className="input-Container">
                <div className='label-Input-Container'>
                <label className='input-Label-Design'>이름: </label>
                <input type="text" className='input-Size' name="name" onChange={handleChange} value={userInfo.name} required /><br />
                </div>
                <div className='label-Input-Container'>
                <label className='input-Label-Design'>직업(직위): </label>
                <input type="text" className='input-Size' name="job_title" onChange={handleChange} value={userInfo.job_title} /><br />
                </div>
                <div className='label-Input-Container'>
                <label className='input-Label-Design'>전화번호: </label>
                <input type="text" className='input-Size' name="phone_number" onChange={handleChange} value={userInfo.phone_number} /><br />
                </div>
                <div className='label-Input-Container'>
                <label className='input-Label-Design'>이메일: </label>
                <input type="text" className='input-Size' name="email" onChange={handleChange} value={userInfo.email} required /><br />
                </div>
                {/* <label>Image Path: </label>
                <input type="file" name="image_path" className='file-Upload-Size' onChange={handleChange} value={formData.image_path} /><br /> */}
                <button type="submit" className='button-Size-Input'>등록</button>
                <button type="submit" className='button-Size-Input'>재등록</button>
              </form>
              {/* <form className='RnD-Container'>
              <button type="revise" className='button-Size'>Revise</button>
              <button type="delete" className='button-Size'>Delete</button>
              </form> */}
          </div>

            {/* 사용자 목록 출력 */}
            <div className='main-Container-CardList'>
            <h2 className='title-Design-View'>Name Card List</h2>
              {userInfo.map(user => (
                <div key={user.id}>
                  <div className='card-editButton-Container'>
                    <div className='card-Container'>
                      {/* <p>ID: {user.id}</p> */}
                      {/* <img src={user.image_path} className='thumnail-size' alt="thumnail"/> */}
                      <p className='name'>{user.name}</p>
                      <p className='job-title'>직업(직위): {user.job_title}</p>
                      <p className='contact-info'>핸드폰 번호: {user.phone_number}</p>
                      <p className='contact-info'>Email: {user.email}</p>
                    </div>
                    <form className='RnD-Container'>
                      <button type="revise" className='button-Size'>수정</button>
                      {/* <button type="delete" className='button-Size'>삭제</button> */}
                      <button type="delete" className='button-Size' onClick={e => handleDelete(user.id)}>삭제</button>
                    </form>
                  </div>
                </div>
            ))}
              </div>
        </div>
    );
};

export default App;