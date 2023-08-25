import axios from 'axios';
import { useState } from "react"

import './../App.css';
import './../styles/join.css';



export default function Join() {

    let [join_id, setJoinid] = useState('');
    let [join_pw, setJoinpw] = useState('');
    let [joinalert, setJoinalert] = useState('');
    return (
        <>
            <div className='wrap'>

                <h2>JOIN</h2>

                <input placeholder='영문자로 시작하는 6~20자 영소문자 id' type="text" onChange={(e) => {
                    setJoinid(e.target.value)
                    console.log(join_id)
                }} />
                <input placeholder='숫자, 문자로 이루어진 6~12자리의 pw' type="password" onChange={(e) => {
                    setJoinpw(e.target.value)
                    console.log(join_pw)
                }} />

                <span className="join_alert">{joinalert}</span>

                <button className='userjoin_btn' type='submit' onClick={() => {
                    axios({
                        url: 'http://localhost:4000/api/join',
                        method: "post",
                        data: {
                            join_id: join_id,
                            join_pw: join_pw,
                        },
                        // withCredentials: true,
                    })
                        .then((res) => {
                            if (res.data === '가입 완료') {
                                alert(res.data)
                                window.location.href = '/login'
                            } else {
                                setJoinalert(res.data)
                            }
                        })
                        .catch((err) => console.log(err))
                }}>회원가입</button>


            </div>
        </>
    )
}