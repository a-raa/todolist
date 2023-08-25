// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom'
// import Memoedit from './memoedit';
// import './../App.css';
// import './../styles/memo.css';

// export default function Memoadd() {
//     let [memotext, setMemotext] = useState('')
//     let [memoalert, setMemoalert] = useState('')
//     let [showmemo, setShowmemo] = useState([])
    
//     return (
//         <div className='memo_wrap wrap'>
//             <h2>MEMO ADD</h2>
//             <div className='memo_input_box content_box'>

//                 <textarea maxLength='100' placeholder='text' onChange={(e) => {
//                     setMemotext(e.target.value)
//                 }} />

//                 <button className='memo_btn' type="submit" onClick={() => {
//                     if (memotext !== '') {
//                         //post 요청
//                         axios({
//                             url: 'http://localhost:4000/api/memo/memoadd',
//                             method: 'post',
//                             data: {
//                                 memotext: memotext,
//                             }
//                         })
//                             .then((res) => {
//                                 let copy = [...showmemo];
//                                 copy.unshift(res.data)
//                                 setShowmemo(copy)
//                                 alert('저장 완료')
//                             })
//                         //------------------------------
//                         setMemoalert('')
//                     } else {
//                         setMemoalert('제목과 내용을 작성해주세요')
//                     }
//                 }}>저장하기</button>
//             </div>

//         </div>
//     )
// }

