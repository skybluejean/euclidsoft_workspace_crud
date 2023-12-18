// //import React, { useState } from "react";
// import React from 'react';
// import './InputBox.css';
// import './Card.css';
// import './MainBoxContainer.css';
// import './Card.js';
// import Axios from "axios";


// /*
// const submitTest = () => {
//     Axios.get("http://localhost:8000/", {}).then(() => {
//         alert("등록 완료!");
//     });
// };
// */


// const Board = ({
//   id,
//   userName,
//   userJob,
//   userPhone,
//   userEmail,
//   userThumnail
// }: {
//   id: number;
//   userName: string;
//   userJob: string;
//   userPhone: string;
//   userEmail: string;
// }) => {
//  /* return (
//       <tr>
//           <td>
//               <input type="checkbox"></input>
//           </td>
//           <td>{id}</td>
//           <td>{title}</td>
//           <td>{registerId}</td>
//           <td>{registerDate}</td>
//       </tr>
//   );*/
//   return (
//     <div className='card-Container'>
//       <div className='name'>
//         <h2>{userName}</h2>
//       </div>
//       <div>
//         <p className='job-title'>{userJob}</p>
//       </div>
//       <div className='contact-info'>
//         <p>{userPhone}</p>
//       </div>
//       <div className='contact-info'>
//         <p>{userEmail}</p>
//       </div>
//     </div>
//   );
// };


// const InputBox = () => {
//   /*
//   const [inputs, setInputs] = useState({
//     name: "",
//     job: "",
//     phone:"",
//     email:""
//   });
  
//   const { name, job, phone, email } = inputs; // 비구조화 할당을 통해 값 추출
  
//   const displayText = (e) => {
//     const { value, name } = e.target; // e.target에서 value와 name 추출
//     setInputs({
//       ...inputs, // 기존의 input 객체를 복사(불변성을 위해)
//       [name]: value, // name 키를 가진 값을 value 로 변경
//     });
//   };
  
  
//   const onReset = (e) => {
//     setInputs({
//       name: "",
//       job: "",
//       phone:"",
//       email:""
//     });
//   };
//  */
  
//   /*

//   return (
//     <div>
//       <input name="id" onChange={displayText} value={id} placeholder="아이디" />
//       <input
//         name="nickname"
//         onChange={displayText}
//         value={nickname}
//         placeholder="닉네임"
//       />
//       <button onClick={onReset}>초기화</button>
//       <div>
//         <b>
//           값 : {id}({nickname})
//         </b>
//       </div>
//     </div>
//   );

//   */

//   return (
//     <div className="input-Container">
//       <InputName/>
//       <InputJob/>
//       <InputPhone/>
//       <InputEmail/>
//       <ImageUpload/>
//       <UploadCardButton/>
//     </div>
//   );
// };

// const InputName = () =>{
//   return(
//     <div>
//       <b>이름 : </b>
//       {/* <input name="name" onChange={displayText} value={name} placeholder="이름" /> */}
//       <input placeholder="이름" />
//     </div>
//   )
// }

// const InputJob = () =>{
//   return(
//     <div>
//       <b>직업(직위) : </b>
//       {/* <input name="job" onChange={displayText} value={job} placeholder="직업(직위)"/> */}
//       <input placeholder="직업(직위)"/>
//     </div>
//   )
// }

// const InputPhone = () =>{
//   return(
//     <div>
//       <b>핸드폰 : </b>
//       {/* <input name="phone" onChange={displayText} value={phone} placeholder="전화번호"/> */}
//       <input placeholder="전화번호"/>
//     </div>
//   )
// }

// const InputEmail = () =>{
//   return(
//     <div>
//       <b>이메일 : </b>
//       {/* <input name="email" onChange={displayText} value={email} placeholder="이메일"/> */}
//       <input placeholder="이메일"/>
//     </div>
//   )
// }

// const ImageUpload = ()=> {
//   /*
//   const [uploadImgUrl, setUploadImgUrl] = useState("");

//   const onchangeImageUpload = (e)=> {
//      const {files} = e.target;
//      const uploadFile = files[0];
//      const reader = new FileReader();
//      reader.readAsDataURL(uploadFile);
//      reader.onloadend = ()=> {
//      setUploadImgUrl(reader.result);
//   }
// }
// */
//   return(
//     <div className='file-Upload-Size'>
//       <b>썸네일 : </b>
//       <input type = "file" accept = "image/*"/>
//     </div>
//   )
// }

// const UploadCardButton = () =>{

//   const uploadData = (e) => {
  
//   }

//   return(
//     <div>
//       <button className='button-Size' onClick={submitTest}>Upoload Card</button>
//     </div>
//   )
// }

// export default InputBox;


import React, { Component } from 'react';
import Axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const InputBox = () => {
  return (
    <div className="input-Container">
      <InputName />
      <InputJob />
      <InputPhone />
      <InputEmail />
    </div>
  );
};

const InputName = ({ handleInputChange }) => {
  return (
    <div>
      <b>이름 : </b>
      <input
        name="name"
        onChange={handleInputChange}
        placeholder="이름"
      />
    </div>
  );
};

const InputJob = ({ handleInputChange }) => {
  return (
    <div>
      <b>직업(직위) : </b>
      <input
        name="jobTitle"
        onChange={handleInputChange}
        placeholder="직업(직위)"
      />
    </div>
  );
};

const InputPhone = ({ handleInputChange }) => {
  return (
    <div>
      <b>핸드폰 : </b>
      <input
        name="phone"
        onChange={handleInputChange}
        placeholder="전화번호"
      />
    </div>
  );
};

const InputEmail = ({ handleInputChange }) => {
  return (
    <div>
      <b>이메일 : </b>
      <input
        name="email"
        onChange={handleInputChange}
        placeholder="이메일"
      />
    </div>
  );
};

class BoardList extends Component {
  state = {
    boardList: [],
    formData: {
      name: '',
      jobTitle: '',
      phone: '',
      email: '',
    },
  };

  getList = () => {
    Axios.get("http://localhost:3001/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    const { boardList, formData } = this.state;
    return (
      <div>
        <InputBox handleInputChange={this.handleInputChange} />
        <Table striped bordered hover>
          {/* ... 이하 생략 ... */}
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}

export default BoardList;
