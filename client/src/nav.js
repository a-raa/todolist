import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/nav.css';
import { Link } from 'react-router-dom';


export default function Navigation({userid}) {

    return (
        <header style={{ backgroundImage: 'url(./../1.jpg)' }}>
            <h1><Link to="/">SCHEDULE APP</Link></h1>
            <nav>
                <MenuBox userid={userid} />
            </nav>
        </header>
    )
}

function MenuBox({ userid }) {
    return (
        <div className='menu_box'>
            <Link to="/memo">Memo</Link>
            <Link to="/calendar">Calendar</Link>
            {
                userid === '비회원' ?
                    <Link to="/login">Login</Link>
                    :
                    <Link to="/mypage">MyPage</Link>
            }
        </div>
    )

}