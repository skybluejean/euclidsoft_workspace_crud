import axios from 'axios';
import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';

function UpdateUser(){

  const{id} = useParams();

  useEffect(()=>{
    axios.get('http://localhost:3001/update'+id)
    .then(res => console.log(res))
    .catch(err=> console.log(err));
  },[])

  return(
          <div className='main-Container-InputBox'>
            <h2 className='title-Design'>Name Card Board</h2>
            {/* 사용자 정보 입력 폼 */}
              <form onSubmit={handleSubmit} className="input-Container">
                <label>Name: </label>
                <input type="text" name="name" onChange={handleChange} value={formData.name} required /><br />
                <label>Job Title: </label>
                <input type="text" name="job_title" onChange={handleChange} value={formData.job_title} /><br />
                <label>Phone Number: </label>
                <input type="text" name="phone_number" onChange={handleChange} value={formData.phone_number} /><br />
                <label>Email: </label>
                <input type="text" name="email" onChange={handleChange} value={formData.email} /><br />
                {/* <label>Image Path: </label>
                <input type="file" name="image_path" className='file-Upload-Size' onChange={handleChange} value={formData.image_path} /><br /> */}
                <button type="submit" className='button-Size-Input'>Upload</button>
              </form>
              <form className='RnD-Container'>
              <button type="revise" className='button-Size'>Revise</button>
              <button type="delete" className='button-Size'>Delete</button>
              </form>
          </div>
  );
}

export default UpdateUser;