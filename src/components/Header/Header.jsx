import { styled } from 'styled-components'
// вот это взять с собой
import React, { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../../hook/useClickOutside';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import TabButton from "../../components/TabButton";
import axios from 'axios';
import Cookies from 'js-cookie';


const HeaderComponent = styled.header`
  width: auto;
  border-bottom: 2px solid #4b4f92;
  box-shadow: 0 20px 20px -19px #4b4f92 ;
`

export default function Header() {
 

  const [selectedForm, setForm] = useState("polzovatel");

  
  function StateVsRef() {
    const input = useRef()
    const [show, setShow] = useState(false)

    function hendleKey(event) {
      if (event.key == 'Enter') {
        setShow(true)
      }
    }


    return (
      <div>
        <h3>Input value: {show && input.current.value}</h3>
        <input ref={input} type="text" className="control" onKeyDown={hendleKey} />
      </div>
    )
  }


  let [authMode, setAuthMode] = useState("signin")
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  const [tab, setTab] = useState('main')

  const [modal, setModal] = useState(false)

  function openModal() {
    setModal(true)
  }

  const [user, setUser] = useState([]);

  const [message, setMessage] = useState(Cookies.get('session'));

  const test = () => {
    axios.get('http://localhost:5000/').then(res => {
      //console.log(res.data.data);
      // console.log(res.data.data[0].email);
      setUser(res.data.data);
    
      //expires: 7 - длительность сессии в днях
      // 0 - это 1 челик в бд ? да
      setMessage(Cookies.get('session'));
      // если создаеть ещё один кук, с именем, то как выводить 2 штуки ? а все понял
      // сори, я забыла что делала ещё переменную, что бы они не путались
      // спасибо огромное что помог с эти есть библиотека uid для генерации session id нет, это для большей защиты ? но если ты хочешь хранить данные в куки такие как username и тд, то используй jwt лучше, хотя всё равно все через сервер идет, так что тут как тебе удобнее
      // лучше бы что бы было, что бы меньше вопросов на защите, но мне бы хотя бы это доделать, потом улучшать, лучше пока сделай оснвоную работу, а потос можно будет и jwt сделать, я не думаю что на защите будут api тестироват, просто скажем что супер пупер защита как в пентагоне :), хахахахах, там есть один норм челек, что не доебывает, а есть вредный, вот и из-за вредного переживаю, все нормально будет, я есле че проверю потом, у меня у самого дыры есть в проекте, но пока надеюсбь времено, конечно временно, времени месяц есть, текст к диплому можно за неделю накатать, так что успеешь , ладно я пошел
      // спасибо ещё раз что помагаешь мне с этим  хехе)
    }).catch(err => {
      console.log(err);
    })
    
  }

  const [sessionId, setSessionId] = useState(null);

  


  return (
    <HeaderComponent>
      <Navbar collapseOnSelect expand="lg" className='navbae'>
        <Container>
          <Nav.Item>
            <Navbar.Brand href="#home"><Link to='/' className='font-link2'>collection</Link></Navbar.Brand>
          </Nav.Item>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav className="d-flex gap-3" activeKey="/home">

              <Nav.Item className=''>
                <Nav.Link href="#"><Link to='/gallery' className='font-link1'>галерея</Link></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1"><Link to='/portfolio' className='font-link1'>портфолио</Link></Nav.Link>
              </Nav.Item>
              <span className=''>{message}</span>
              {/* пока как тест дляотладжки  */}
              {/* если щас закрыть и потом снова открыть, то куки обновиться ? попробуй?*/}
              {/* какие параметры надо переташить в другой файл, что бы так же выводилась инфа  */}
              {/* вот теперь после регистрации в куки устанавлеваетя почта и выводится, ты можешь отправить данное куки на сервер и проверить если такой пользователь в бд */}
              <Nav.Item>
                <Nav.Link eventKey="link-2 "><Link to='/about' className='font-link1'>о нас</Link></Nav.Link>
                {/* {user.length > 0 ? (user.forEach((item, index) => { console.log('item:', item.fulname); })) : (<span>user null</span>)} */}
                {/* по сути теперб можно подставить эти данные в компонент */}
                {/* ты вроде говорил что для этого надо создавать ссесию в консоле, и как вывести только что зарегистрированного человека в другом файле? */}
                {/* после регистрации ты должна сохранить в куки данные(ключ или id сессии) и каждый раз его отправлять на сервер для проверки, в базе данных так же должен быть этот ключ и данные пользователя, щас в вк скину тебе пример */}
              </Nav.Item>
              <Nav.Item>
                {/* {data.length !== null ? (
                  <Button onClick={openModal} className='button1'>{data}</Button>
                ) : (
                  <Button onClick={openModal} className='button1'>войти</Button>
                )} */}
                <Button onClick={openModal} className='button1'><Link to='/registration' className='font-link5'>войти</Link></Button>
                
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderComponent>
  )
}