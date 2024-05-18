import { styled } from 'styled-components'
// вот это взять с собой
import React, { useState, useEffect, useRef } from 'react'
import { useClickOutside } from '../../hook/useClickOutside';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import TabButton from "../../components/TabButton";
import LichKabinetPolzovat from "../../components/LichKabinetPolzovat";

import axios from 'axios';
import Cookies from 'js-cookie'


const HeaderComponent = styled.header`
  width: auto;
  border-bottom: 2px solid #4b4f92;
  box-shadow: 0 20px 20px -19px #4b4f92 ;
`

export default function Header() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailreg, setEmailreg] = useState('')
  const [passwordreg, setPasswordreg] = useState('')
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [fulname, setFulname] = useState('')
  const [sity, setSity] = useState('')
  const [print, setPrint] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailregDirty, setEmailregDirty] = useState(false)
  const [passwordregDirty, setPasswordregDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [fulnameDirty, setFullnameDirty] = useState(false)
  const [numberDirty, setNumberDirty] = useState(false)
  const [sityDirty, setSityDirty] = useState(false)
  const [printDirty, setPrintDirty] = useState(false)
  const [nameError, setNameError] = useState('Поле не должен быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым')
  const [emaeiError, setEmailError] = useState('Email не должен быть пустым')
  const [passwordregError, setPasswordregError] = useState('Пароль не должен быть пустым')
  const [emaeiregError, setEmailregError] = useState('Email не должен быть пустым')
  const [fulnameError, setFulnameError] = useState('Поле не должен быть пустым')
  const [numberError, setNumberError] = useState('Поле не должен быть пустым')
  const [sityError, setSityError] = useState('Поле не должен быть пустым')
  const [printError, setPrintError] = useState('Поле не должен быть пустым')
  const [formValidOne, setFoemValidOne] = useState(false)
  const [formValidTwo, setFoemValidTwo] = useState(false)

  const [selectedForm, setForm] = useState("polzovatel");

  useEffect(() => {
    if (emaeiError || passwordError) {
      setFoemValidOne(false)
    }
    else {
      setFoemValidOne(true)
    }
  }, [emaeiError, passwordError])

  useEffect(() => {
    if (emaeiregError || passwordregError || nameError || fulnameError || numberError) {
      setFoemValidTwo(false)
    }
    else {
      setFoemValidTwo(true)
    }
  }, [emaeiregError, passwordregError, nameError, fulnameError, numberError])

  const blurHandle = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'emailreg':
        setEmailregDirty(true)
        break
      case 'passwordreg':
        setPasswordregDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
      case 'fulname':
        setFullnameDirty(true)
        break
      case 'number':
        setNumberDirty(true)
        break
      case 'sity':
        setSityDirty(true)
        break
      case 'print':
        setPrintDirty(true)
        break
    }
  }
  const emailHendler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некоректный email')
    }
    else {
      setEmailError("")
    }
  }
  const paswordHendler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordError('Недопустимое количество символов')
      if (!e.target.value) {
        setPasswordError('Пароль не должен быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }
  const emailregHendler = (e) => {
    setEmailreg(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailregError('Некоректный email')
    }
    else {
      setEmailregError("")
    }
  }
  const paswordregHendler = (e) => {
    setPasswordreg(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordregError('Недопустимое количество символов')
      if (!e.target.value) {
        setPasswordregError('Пароль не должен быть пустым')
      }
    } else {
      setPasswordregError('')
    }
  }
  const sityHendler = (e) => {
    setSity(e.target.value)
    if (e.target.value.length < 2) {
      setSityError('Введите полное название города')
      if (!e.target.value) {
        setSityError('Пароль не должен быть пустым')
      }
    } else {
      setSityError('')
    }
  }
  const printHendler = (e) => {
    setPrint(e.target.value)
    if (e.target.value.length < 10) {
      setPrintError('Минимальное количество символов 10')
      if (!e.target.value) {
        setPrintError('Пароль не должен быть пустым')
      }
    } else {
      setPrintError('')
    }
  }
  const nameHendler = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 3) {
      setNameError('Введите полное имя')
      if (!e.target.value) {
        setNameError('Пароль не должен быть пустым')
      }
    } else {
      setNameError('')
    }
  }
  const fulnameHendler = (e) => {
    setFulname(e.target.value)
    if (e.target.value.length < 3) {
      setFulnameError('Введите полную фамилию')
      if (!e.target.value) {
        setFulnameError('Пароль не должен быть пустым')
      }
    } else {
      setFulnameError('')
    }
  }
  const numberHendler = (e) => {
    setNumber(e.target.value)
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!re.test(e.target.value)) {
      setNumberError('Неверный телефон')

    } else {
      setNumberError('')
    }
  }

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
      console.log(email);
      Cookies.set('name', name, { expires: 7 })
      Cookies.set('fulname', fulname, { expires: 7 })
      Cookies.set('numder', number, { expires: 7 })
      Cookies.set('sity', sity, { expires: 7 })
      Cookies.set('print', print, { expires: 7 })
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
    axios.get('http://localhost:5000/user', { params: { name, fulname, number, emailreg, passwordreg, selectedForm, sity, print } }
    ).then(res => {
      setMessage(res.data.message);
      console.log(res);

    }).catch(err => {
      console.error(err);
      setMessage(Cookies.get('session'));
      console.log(err.response.data.message);
    })
    axios.get('http://localhost:5000/login', { params: { email, password } }
    ).then(res => {
      setMessage(res.data.message);
      console.log(res);
      Cookies.set('session', res.data.sessionId, { expires: 7 })
      Cookies.set('name', name, { expires: 7 })
      Cookies.set('fulname', fulname, { expires: 7 })
      Cookies.set('numder', number, { expires: 7 })
      Cookies.set('sity', sity, { expires: 7 })
      Cookies.set('print', print, { expires: 7 })

    }).catch(err => {
      console.error(err);
      setMessage(Cookies.get('session'));
      console.log(err.response.data.message);
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
                <Button onClick={openModal} className='button1'>
                  <Link to='/kabinet' className='font-link5'>
                  кабинет
                  </Link>
                </Button>
                
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderComponent>
  )
}