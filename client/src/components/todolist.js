
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../styles/todolist.css'

export default function Todolist({userid}) {

    let [todotext, setTodotext] = useState('')
    let [showtodo, setShowtodo] = useState([])
    let [todoalert, setTodoalert] = useState('해야 할 일을 입력하세요')
    let [startday, setStartday] = useState('')
    let [endday, setEndday] = useState('')

    useEffect(() => {
        axios('http://localhost:4000/api/todo')
            .then((res) => {
                if (res.data.length === 0) {
                    setShowtodo([])
                } else {
                    let copy = [...res.data]
                    setShowtodo(copy)
                }
            })
    }, [])

    return (
        <div className='wrap'>
            <h2>Todolist</h2>
            <div className="todo_add">
                <p className='alert_p'>{todoalert}</p>


                {/* 기간 선택창 */}
                <p>
                    start : <input id='start_date' type="date" onChange={(e) => {
                        setStartday(e.target.value)
                    }} />

                    end : <input id='end_date' type="date" onChange={(e) => {
                        setEndday(e.target.value)
                    }} />
                </p>

                {/* 해야할 일 입력창 */}
                <p className='add_box'>
                    <input id='text_input' maxLength={50} type="text" onChange={(e) => {
                        setTodotext(e.target.value)
                    }} />
                    <button className='todo_add_btn' onClick={() => {
                        if (todotext !== '' && startday !== '' && endday !== '') {

                            if (userid === '비회원') {
                                alert('로그인이 필요합니다')
                            } else {
                                axios({
                                    url: 'http://localhost:4000/api/todo/todoadd',
                                    method: 'post',
                                    data: {
                                        todotext: todotext,
                                        startday: startday,
                                        endday: endday,
                                        writer: userid,
                                    }
                                })
                                    .then((res) => {
                                        let copy = [...showtodo]
                                        copy.unshift(res.data)
                                        setShowtodo(copy)
                                        setTodotext('')
                                        window.location.href = '/todolist'
                                    })
                            }

                        }

                        else {
                            setTodoalert('내용과 기간을 작성해주세요')
                        }
                    }}>add</button>
                </p>


            </div>


            <List setShowtodo={setShowtodo} showtodo={showtodo} userid={userid} />
        </div>

    )
}

function List({ showtodo, userid, setShowtodo }) {
    let [activelist, setActivelist] = useState('내글만보기')

    return (
        <ul className="todo_list">

            {userid === '비회원' ? null
                :
                <p className='showbtn_box'>
                    <button onClick={() => {

                        if (activelist === '내글만보기') {

                            let newArray = []
                            showtodo.map((a, i) => {
                                if (a.writer === userid) {
                                    newArray.push(a)
                                    setShowtodo(newArray)
                                }
                            })
                            setActivelist('전체보기')

                        } else {
                            axios('http://localhost:4000/api/todo')
                                .then((res) => {
                                    if (res.data.length === 0) {
                                        setShowtodo([])
                                    } else {
                                        let copy = [...res.data]
                                        setShowtodo(copy)
                                    }
                                })
                            setActivelist('내글만보기')
                        }

                    }}>{activelist}</button>
                </p>
            }

            {showtodo.map((a, i) => {
                return (

                    <li className='todo_item' key={i}>
                        <span>작성자 : {a.writer === userid ? `${userid} (내가 쓴 글)` : a.writer}</span>
                        {a.writer === userid ?
                            <>
                                <Link className='edit_img' to={`/todoedit/${a.num}`}>
                                    <img src={process.env.PUBLIC_URL + '/write.png'} />
                                </Link>


                                <button className='edit_img'><img src={process.env.PUBLIC_URL + '/delete.png'} onClick={() => {
                                    let userconfirm = window.confirm("정말 삭제하시겠습니까?");
                                    if (userconfirm) {
                                        axios({
                                            url: 'http://localhost:4000/api/todo/tododelete',
                                            method: 'post',
                                            data: {
                                                _id: a._id
                                            }
                                        })
                                            .then((res) => {
                                                alert(res.data)
                                                window.location.href = '/todolist'
                                            })
                                            .catch((err) => { console.log(err) })
                                    }
                                }} /></button>
                            </>
                            :
                            null
                        }
                        <br />
                        <span>기간: {a.startday} ~ {a.endday}</span><br />
                        <span className="todo">{a.todoitem}</span>


                    </li>

                )
            })}
        </ul>
    )
}


