
import logo7 from '../img/3.jpg'
import Cookies from 'js-cookie'

import ModalShop from './Modal/ModalShop';
import { useState } from 'react'
import Masonry from "react-responsive-masonry"
import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function LichKabinetPolzovat(){


  
    
    function StateVsRef(){
        const input = useRef()
        const [show, setShow] = useState(false)
    
        function hendleKey(event){
            if(event.key == 'Enter'){
                setShow(true)
            }
        }
    
    
        return(
            <div>
                <h3>Input value: {show && input.current.value}</h3>
                <input ref={input} type="text" className="control" onKeyDown={hendleKey} />
            </div>
        )
    }


  
  const [tab, setTab]=useState('main')

    const [data, setData] =useState({img: '', i:0})

    const viewImage = (img, i) =>{
        setData({img, i})
    }
    const imgAction =(action) =>{
        let i = data.i;
        if(!action){
            setData({img: '', i:0})
        }
    }
    const[cardOpen, setCardOpen] = useState(false)

    const [modal, setModal] = useState(false)

    function openModal(){
        setModal(true)
    }
    const [user, setUser] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const session = Cookies.get('session');
        setSessionId(session);
        if (session) {
          axios.get('http://localhost:5000/checkSession', { params: { sessionId: session } }).then(res => {
            console.log(res);
            setUser(res.data.data[0]);
          }).catch(err => {
            console.log(err);
          });
        } else {
          setUser(null);
        }
      }, [user]);
    return(
        <>
        <div className='osnova-kabinet'>
            <div className='lichkabinet-polzovatel'>
                <h1 className='lich-fotograf'>{user ? user.name : null }</h1>
                <span>{ user ? user.fulname : null }</span>  
                
                <ul>
                    <li><h1 className='lich-polzovat'>{user ? user.number : null}</h1></li>
                   
            </ul>     
            
            

            
            <button className='button5' >
                <Link to='/korzina'>перейти в корзину</Link>
                </button>

            
            {cardOpen && (
                <div className='shop-car'>

                </div>
            )}
            
            </div>
   
            </div>
      
       
      
        </>
    )
}