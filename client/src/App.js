import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom';
import axios from "axios"
import Navigation from './nav'
import Calendar from './components/calendar';
import Memo from './components/memo';
import Memoedit from './components/memoedit';
import Todolist from './components/todolist';
import Login from './components/login';
import Join from './components/join';
import Mypage from './components/mypage';
import Todoedit from './components/todoedit';
import './App.css';


function App() {
  let [userid, setUserid] = useState('');

  useEffect(() => {
    axios({
        url: 'http://localhost:4000/api/login',
        method: 'post',
        data: {
            input_id: 'testuser1',
            input_pw: 'testuser1',
        },
        withCredentials: true,
    })
        .then((res) => {
          setUserid(res.data)
            console.log('login =>', res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])

  return (
    <div className="App">
      <Navigation userid={userid}/>
      <Routes>
        <Route path="/" element={<Todolist userid={userid}/>} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/memoedit" element={<Memoedit />} />
        <Route path="/memoedit/:id" element={<Memoedit />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/todoedit" element={<Todoedit />} />
        <Route path="/todoedit/:id" element={<Todoedit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/*" element={<Not404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;

function Not404() {
  return (
    <div className='wrap' id='page404'>없는 페이지입니다.<br />Not found (404)</div>
  )
}