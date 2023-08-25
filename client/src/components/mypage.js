import axios from "axios"
import { useEffect, useState } from "react"

import './../App.css';
import './../styles/mypage.css';


export default function Mypage () {
    let [userid, setUserid] = useState('');

    useEffect(() => {
        axios({
            url:'http://localhost:4000/api/mypage',
            method: 'get',
            withCredentials: true,
        })
        .then((res) => {
            setUserid(res.data)
        })
    })


    return (
        <div className="wrap">
            <h2>MY PAGE</h2>
            <p>반갑습니다! "{userid}"님</p>
            <button className="logout_btn" onClick={() => {
                axios({
                    url:'http://localhost:4000/logout',
                    method: 'get',
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(1)
                    alert('로그아웃 되었습니다')
                    window.location.href = '/'
                })
            }}>LOGOUT</button>
        </div>
    )
}