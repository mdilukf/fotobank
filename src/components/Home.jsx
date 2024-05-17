import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import Modal from './Modal/Modal';
import logo1 from '../img/div-container.jpg'
import logo2 from '../img/eda.jpg'
import logo3 from '../img/chivot (1).jpg'
import logo4 from '../img/ludi.jpg'
import logo5 from '../img/город.jpg'
import logo6 from '../img/estetic.jpg'
import logo7 from '../img/fotograf.jpg'
import {Button} from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'
// import {Ripple, initMDB} from "mdb-ui-kit";
// initMDB({ Ripple });
import { useClickOutside } from '../hook/useClickOutside';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'
import axios from 'axios';

const HeaderComponent = styled.header`
  width: auto;
  background: #000000;
`


export default function Home(){

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

  const [selectedForm, setForm] = useState(1);

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
    const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
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

  const [data, setData] = useState(null);

  let dataTest = {
    id: 1,
    name: 2
  }

  const [message, setMessage] = useState('null');
  const [user, setUser] = useState([]);

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
    axios.get('http://localhost:5000/login', { params: {email, password} }
    ).then(res => {
      setMessage(res.data.message);
      console.log(res);
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
    return(
        <>
            <div className="jumbotron1">
                <div className="container">
                    <h1 className="display-3"> Коллекция фотографий и портфолий мастров </h1>
                    <div className="input-group">
                        <input type="search" className="form-control" placeholder="поиск изображения"  aria-label="Search" aria-describedby="search-addon" />
                        <button type="submit" className="btn color-button" data-mdb-ripple-init>найти</button>
                    </div>
                </div>
            </div>
            {/* то есть достаточно обявить в одном вайле и потом достаточно 2 строчек?  Вечня беда с раскладкой у меня) Cookies.get('session') если что я могу и так расщивровать */}

            <div className='gallerea'>
                <div className='gallerea-div'>
                    <h2>Галерея</h2>
                    <div className='div-columns'>
                        <div className="row justify-content-sm-center">
                            <div className="col-sm-auto custom">
                                <div className='container-div-1'>
                                    <img src={logo1} alt="картинка" className='container-div'/>
                                    <p><Link to='/gallery' className='font-link2'>красота</Link></p>
                                </div>
                            </div>
                            <div className="col-sm-auto custom">
                                <div className='margin-div'>
                                    <div className='container-div-1'>
                                        <img src={logo2} alt="картинка" className='container-div'/>
                                        <p><Link to='/gallery' className='font-link2'>еда</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto custom">
                                <div className='container-div-1'>
                                    <img src={logo3} alt="картинка" className='container-div'/>
                                    <p><a href="#">животные</a></p>
                                </div>
                            </div>
                            <div className="col-sm-auto custom">
                                <div className='container-div-1'>
                                    <img src={logo4} alt="картинка" className='container-div'/>
                                    <p><a href="#">люди</a></p>
                                </div>
                            </div>
                            <div className="col-sm-auto custom">
                                <div className='margin-div'>
                                    <div className='container-div-1'>
                                        <img src={logo5} alt="картинка" className='container-div'/>
                                        <p><a href="#">города</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto custom">
                                <div className='container-div-1'>
                                    <img src={logo6} alt="картинка" className='container-div'/>
                                    <p><a href="#">эстетика</a></p>
                                </div>
                           </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className='o-nas'>
                <div className="jumbotron2">
                    <div className="container">
                        <h1 className="display-4"> Фотобак collection </h1>
                        <h4 className="display-5">Огромное количество стоковых фотографий по приемлимым ценам </h4>
                        <div className="input-group">
                            <Button className='button-1'><Link to='/about' className='font-link2'>о фотобанке</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center d-flex">
                <div className="col-4  justify-content-center d-flex">
                <div className='container-img'>
                        <img src={logo7} alt="картинка" className='img-fotograf'/>
                        <h1>выплаты авторам регулярно</h1>
                </div>
                </div>
                <div className="col-4 justify-content-center d-flex">
                <div className='container-div-2'>
                    <p>Получай доход со своих работ с нами</p>
                    <Button  onClick={openModal} className='button1'>
                      <Link to='/registration'>присоединиться</Link></Button>
                    
                </div>
                </div>
            </div>
            
            <div className='fotograf'>
                <div className='fotograf-div'>
                    <h2>Фотографы которые вам понравятся </h2>
                    <div className='div-columns'>
                        <div className="row justify-content-center">
                            <div className="col-sm-auto col-lg-4">
                                <div className='container-div-3'>
                                <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto col-lg-4">
                                <div className='margin-div'>
                                    <div className='container-div-3'>
                                    <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto col-lg-4">
                                <div className='container-div-3'>
                                <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto col-lg-4">
                                <div className='container-div-3'>
                                <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto col-lg-4">
                                <div className='margin-div'>
                                    <div className='container-div-3'>
                                    <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-auto col-lg-4">
                                <div className='container-div-3'>
                                <div className='container-img-1'>
                                        <img src={logo7} alt="картинка" className='img-fotograf-1'/>
                                        <h1>имя автора</h1>
                                    </div>
                                </div>
                           </div>
                        </div>   
                    </div>
                </div>
            </div>

        </>
    )
}