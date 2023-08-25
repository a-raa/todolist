import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import './../App.css';
import './../styles/login.css';

export default function Login() {

    let [input_id, setUserinput_id] = useState('')
    let [input_pw, setUserinput_pw] = useState('')
    let [alert, setAlert] = useState('')

    return (
        <>

            <div className="login_box wrap">

                <h2>LOGIN</h2>

                <span className="join_box">아이디가 없으신가요? 
                <Link to="/join" className="join_btn">JOIN</Link>
                </span>

                <input onChange={(e) => { setUserinput_id(e.target.value) }} placeholder="아이디를 입력하세요" />
                <input onChange={(e) => { setUserinput_pw(e.target.value) }} placeholder="비밀번호 입력하세요" type="password"/>

                <span className="login_alert">{alert}</span>

                <button onClick={() => {
                    axios({
                        url: 'http://localhost:4000/api/login',
                        method: 'post',
                        data: {
                            input_id: input_id,
                            input_pw: input_pw,
                        },
                        withCredentials: true,
                    })
                        .then((res) => {
                            console.log('user id =>', res.data)
                            window.location.href = "/login"
                        })
                        .catch((err) => {
                            setAlert('아이디와 비밀번호를 확인해주세요')
                        })
                }} type="submit" className="login_btn">SIGN UP</button>



            </div>
        </>


    );
}
