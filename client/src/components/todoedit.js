
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../App.css'
import './../styles/todolist.css';

export default function Todoedit() {

    let { id } = useParams();
    let [todo, setTodo] = useState([{}]);

    useEffect(() => {
        axios({
            url: 'http://localhost:4000/api/todoedit',
            method: 'post',
            data: {
                todo_id: id
            }
        })
            .then((res) => {
                let copy = [{ ...res.data }]
                setTodo(copy)
                console.log(copy)
            })
    }, [])

    return (

        <div className='todo_wrap wrap'>
            <div className='todo_input_box content_box'>
                <h2>TODO EDIT</h2>

                <textarea maxLength='50' placeholder='text' onChange={(e) => {
                    setTodo([{num: todo[0].num, todoitem: e.target.value}])
                }} defaultValue={todo[0].todoitem} />

                <button className='todo_btn' onClick={() => {
                    axios({
                        url: 'http://localhost:4000/api/todoedit/todochange',
                        method: 'post',
                        data: {
                            todo: todo,
                        }
                    })
                        .then((res) => {
                            alert(`${res.data}`)
                            window.location.href = '/'
                        })
                }} type="submit">수정하기</button>
            </div>

        </div>








    )
}