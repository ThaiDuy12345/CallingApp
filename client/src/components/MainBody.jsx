import React, { useState, useEffect } from 'react'
import { ChatUserRender } from '../models/Account'
import { GroupUserRender } from '../models/Account'
import { Routes, Route, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { io } from 'socket.io-client'
import axios from 'axios'
export default function MainBody() {
    const [messageState, setMessageState] = useState(true)
    const [chatState, setChatState] = useState(0)
    const [allAccounts, setAllAccounts] = useState([])
    const [allGroups, setAllGroups] = useState([
        { _id: 'G1', name: 'Những người bạn tào lao'},
        { _id: 'G2', name: 'Động phát thanh sài gòn'}
    ])
    useEffect(() => {
        axios.get("http://localhost:5000/api/Account/getAllAccount").then(res => {
            setAllAccounts(res.data)
        })
        axios.get("http://localhost:5000/api/Group/getAllGroup").then(res => {
            setAllGroups(res.data)
        })
        console.log(localStorage.getItem('AccountID'))
    }, []);
    function ChatDMRender(){
        let { id } = useParams();
        const socket = io("ws://localhost:5000")
        const name = allAccounts.find(account => account._id === id).name
        return(
            <div className="w-100 h-100 m-0 p-0 text-light">
                <div className="w-100 center m-0 p-0" style={{height:'15%',boxShadow:'0px 5px 5px #000316'}}>
                    <div className="w-75 text-start">
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        &nbsp; <b>{name}</b>
                    </div>
                </div>
                <div className="w-100 center m-0 p-0" style={{height:'70%'}}>
                    <div className="w-75 text-start">
                        
                    </div>
                </div>
                <div className="w-100 center m-0 p-0" style={{height:'15%'}}>
                    <div className="text-start" style={{width:'95%'}}>
                        <input className="p-1 fw-bold rounded" style={{width:'85%',background:'none', border:'0.5px solid white'}}/>
                        <button className="text-center text-light" style={{width:'15%',background:'none', border:'none'}}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                    </div>
                </div>
            </div>
        )
    }
    function ChatGroupRender(){
        let { id } = useParams();
        const socket = io("ws://localhost:5000")
        const name = allGroups.find(group => group._id === id).name
        return(
            <div className="w-100 h-100 m-0 p-0 text-light">
                <div className="w-100 center m-0 p-0" style={{height:'15%',boxShadow:'0px 5px 5px #000316'}}>
                    <div className="w-75 text-start">
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        &nbsp; <b>{name}</b>
                    </div>
                </div>
                <div className="w-100 center m-0 p-0" style={{height:'70%'}}>
                    <div className="w-75 text-start">
                        
                    </div>
                </div>
                <div className="w-100 center m-0 p-0" style={{height:'15%'}}>
                    <div className="text-start" style={{width:'95%'}}>
                        <input className="p-1 fw-bold rounded" style={{width:'85%',background:'none', border:'0.5px solid white'}}/>
                        <button className="text-center text-light" style={{width:'15%',background:'none', border:'none'}}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></button>
                    </div>
                </div>
            </div>
        )
    }
    function MainRender(){
        return(
            <div className="col-12 row p-0 m-0 center h-100 text-light">
                <div className="text-center fs-4">
                    <FontAwesomeIcon style={{fontSize:'100px'}} icon="fa-solid fa-check" />
                    <br/>Xin hãy tạo một chat mới
                </div>
            </div>
        )
    }
    function DMRender(){
        return(
            <>
                {allAccounts.map(Account => <ChatUserRender key={Account._id} object={Account}/>)}
            </>
        )
    }
    function GroupRender(){
        return(
            <>
                {allGroups.map(Group => <GroupUserRender key={Group._id} object={Group}/>)}
            </>
        )
    }
    return (
        <div className="MainBody w-50 m-auto center" style={{height: '100vh'}}>
            <div className="MainApp w-100 h-50 row m-0 p-0">
                <div className="col-4 h-100 row m-0 p-0">
                    <div className="navigativeButton col-12 row m-0 p-0" style={{height:'20%'}}>
                        <button onClick={() => setMessageState(true)} className="col-6 m-0 center h-100 fs-6 text-secondary fw-bold text-center" style={{border:'none', background:'none'}}>DMS</button>
                        <button onClick={() => setMessageState(false)} className="col-6 m-0 center h-100 fs-6 text-secondary fw-bold text-center" style={{border:'none', background:'none'}}>Group</button>
                    </div>
                    <div className="col-12 m-0 p-0 text-light" style={{height:'80%', overflow:'auto'}}>
                        {messageState === true? <DMRender/>:<GroupRender/>}
                    </div>
                </div>
                <div className="col-8 h-100 border-start row m-0 p-0">
                    <Routes>
                        <Route path="/" element={<MainRender/>}/>
                        <Route path="/message/dm/:id" element={<ChatDMRender/>}/>
                        <Route path="/message/g/:id" element={<ChatGroupRender/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
