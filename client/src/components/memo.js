import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../App.css';
import './../styles/memo.css';

export default function Memo() {
    let [showmemo, setShowmemo] = useState([])
    let [memotext, setMemotext] = useState('')
    let [memoalert, setMemoalert] = useState('메모를 입력하세요')

    //저장된 메모 요청 api
    useEffect(() => {
        axios('http://localhost:4000/api/memo')
            .then(res => {
                if (res.data.length === 0) {
                    setShowmemo([])
                } else {
                    let copy = [...res.data]
                    console.log(copy)
                    setShowmemo(copy)
                }
            })
    }, [])

    return (
        <div className='memo_wrap wrap'>
            <h2>MEMO</h2>

            <div className='memo_add'>
                <input maxLength='100' value={memotext} placeholder={memoalert} onChange={(e) => {
                    setMemotext(e.target.value)
                }} />
                <button className='memo_add_btn' type="submit" onClick={() => {
                    if (memotext !== '') {
                        //post 요청
                        axios({
                            url: 'http://localhost:4000/api/memo/memoadd',
                            method: 'post',
                            data: {
                                memotext: memotext,
                            }
                        })
                            .then((res) => {
                                let copy = [...showmemo];
                                copy.unshift(res.data)
                                setShowmemo(copy)
                                setMemotext('')
                                alert('저장 완료')
                            })
                        //------------------------------
                    } else {
                        setMemoalert('내용을 작성해주세요')
                    }
                }}>add</button>
            </div>

            <div className='memo_result'>
                {showmemo.map((a, i) => {
                    return (
                        <div className='memo_box' key={i}>
                            <div className='memo_date'>
                                <p>날짜 : {a.date}</p>
                                <p>
                                    {/* 글수정 링크 */}
                                    <Link to={`/memoedit/${a.num}`}>
                                        <img src={process.env.PUBLIC_URL + '/write.png'} />
                                    </Link>

                                    {/* 글삭제 버튼 */}
                                    <button type="submit" className='delete_btn' onClick={() => {
                                        let userconfirm = window.confirm("정말 삭제하시겠습니까?");
                                        if (userconfirm) {
                                            axios({
                                                url: 'http://localhost:4000/api/memo/memodelete',
                                                method: 'post',
                                                data: { _id: a._id }
                                            })
                                                .then((res) => {
                                                    let copy = [...showmemo]
                                                    copy.splice(i, 1)
                                                    setShowmemo(copy)
                                                })
                                            alert('삭제 되었습니다')
                                        }
                                    }}><img src={process.env.PUBLIC_URL + '/delete.png'} /></button>
                                </p>

                            </div>
                            <div className='memo_text'>
                                {a.text}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

