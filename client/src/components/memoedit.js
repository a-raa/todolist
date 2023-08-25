
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../App.css'
import './../styles/memo.css';

export default function Memoedit() {

    let { id } = useParams();
    let [memo, setMemo] = useState([{}]);

    useEffect(() => {
        axios({
            url: 'http://localhost:4000/api/memoedit',
            method: 'post',
            data: {
                memo_id: id
            }
        })
            .then((res) => {
                let copy = [{ ...res.data }]
                setMemo(copy)
            })
    }, [])

    return (

        <div className='memo_wrap wrap'>
            <div className='memo_input_box content_box'>
                <h2>MEMO EDIT</h2>

                <textarea maxLength='50' placeholder='text' onChange={(e) => {
                    setMemo([{ _id: memo[0]._id, num: memo[0].num, title: memo[0].title, text: e.target.value }])
                }} defaultValue={memo[0].text} />

                <button className='memo_btn' onClick={() => {
                    axios({
                        url: 'http://localhost:4000/api/memoedit/memochange',
                        method: 'post',
                        data: {
                            memo: memo,
                        }
                    })
                        .then((res) => {
                            alert(`${res.data}`)
                            window.location.href = '/memo'
                        })
                }} type="submit">수정하기</button>
            </div>

        </div>








    )
}