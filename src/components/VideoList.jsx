import '../TeachenSection.css'
import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

export function VideoList(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [fulname, setFulname] = useState('')
  const [sity, setSity] = useState('')
  const [print, setPrint] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [fulnameDirty, setFullnameDirty] = useState(false)
  const [numberDirty, setNumberDirty] = useState(false)
  const [sityDirty, setSityDirty] = useState(false)
  const [printDirty, setPrintDirty] = useState(false)
  const [nameError, setNameError]=useState('Поле не должен быть пустым')
  const [passwordError, setPasswordError]=useState('Пароль не должен быть пустым')
  const [emaeiError, setEmailError]=useState('Email не должен быть пустым')
  const [fulnameError, setFulnameError]=useState('Поле не должен быть пустым')
  const [numberError, setNumberError]=useState('Поле не должен быть пустым')
  const [sityError, setSityError]=useState('Поле не должен быть пустым')
  const [printError, setPrintError]=useState('Поле не должен быть пустым')
  const [formValid, setFoemValid] = useState(false)

  useEffect(()=>{
    if(emaeiError || passwordError || nameError || fulnameError|| numberError){
      setFoemValid(false)
    }
    else{
      setFoemValid(true)
    }
  }, [emaeiError, passwordError, nameError, fulnameError, numberError])

  const blurHandle = (e) =>{
    switch(e.target.name){
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
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
  const emailHendler = (e)=>{
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Некоректный email')
    }
    else{
      setEmailError("")
    }
  }
  const paswordHendler = (e) =>{
    setPassword(e.target.value)
    if(e.target.value.length <8 ){
      setPasswordError('Недопустимое количество символов')
      if(!e.target.value){
        setPasswordError('Поле не должено быть пустым')
      }
    }else{
      setPasswordError('')
    }
  }
  const sityHendler = (e) =>{
    setSity(e.target.value)
    if(e.target.value.length <2 ){
      setSityError('Введите полное название города')
      if(!e.target.value){
        setSityError('Поле не должено быть пустым')
      }
    }else{
      setSityError('')
    }
  }
  const printHendler = (e) =>{
    setPrint(e.target.value)
    if(e.target.value.length <10 ){
      setPrintError('Минимальное количество символов 10')
      if(!e.target.value){
        setPrintError('Поле не должено быть пустым')
      }
    }else{
      setPrintError('')
    }
  }
  const nameHendler = (e) =>{
    setName(e.target.value)
    if(e.target.value.length <3 ){
      setNameError('Введите полное имя')
      if(!e.target.value){
        setNameError('Поле не должено быть пустым')
      }
    }else{
      setNameError('')
    }
  }
  const fulnameHendler = (e) =>{
    setFulname(e.target.value)
    if(e.target.value.length <3 ){
      setFulnameError('Введите полную фамилию')
      if(!e.target.value){
        setFulnameError('Поле не должено быть пустым')
      }
    }else{
      setFulnameError('')
    }
  }
  const numberHendler = (e) =>{
    setNumber(e.target.value)
    const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    if(!re.test(e.target.value)){
        setNumberError('Неверный телефон')

    }else{
      setNumberError('')
    }
  }
    
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
    function HendelChange(event){
        // setName(event.target.value)
        // setError(event.target.value.trim().length == 0)

        setForm({
            name: event.target.value,
            error: event.target.value.trim().length == 0
        })
    }
    

    // const [form, setForm] = useState({
    //     name: '',
    //     error: false,
    //     reason: 'help'
    // })
    const [selectedForm, setForm] = useState(3);

    return(
        <>
            <div className="Auth-form-container">
                              <form className="Auth-form">
                                <div className="Auth-form-content">
                                  <h3 className="Auth-form-title">Регистрация</h3>
                                  <div className="form-group mt-3">
                                  {(nameDirty && nameError) && <div style={{color: 'red', background: 'none'}}>{nameError}</div>}
                                    <label>Имя</label>
                                    <input onChange={e => nameHendler(e)} value={name} type="text" className="form-control mt-1" name='name' id='name' onBlur={e=>blurHandle(e)}/>
                                  </div>
                                  <div className="form-group mt-3">
                                  {(fulnameDirty && fulnameError) && <div style={{color: 'red', background: 'none'}}>{fulnameError}</div>}
                                    <label>Фамилия</label>
                                    <input onChange={e => fulnameHendler(e)} value={fulname} type="text" className="form-control mt-1" name='fulname' id='fulname' onBlur={e=>blurHandle(e)}/>
                                  </div>
                                  <div className="form-group mt-3">
                                  {(numberDirty && numberError) && <div style={{color: 'red', background: 'none'}}>{numberError}</div>}
                                    <label>Телефон</label>
                                    <input onChange={e => numberHendler(e)} value={number} type="tel" className="form-control mt-1" name='number' id='number' onBlur={e=>blurHandle(e)}/>
                                  </div>
                                  <div className="form-group mt-3">
                                  {(emailDirty && emaeiError) && <div style={{color: 'red', background: 'none'}}>{emaeiError}</div>}
                                    <label>Email</label>
                                    <input onChange={e => emailHendler(e)} value={email} onBlur={e=>blurHandle(e)} type="email" className="form-control mt-1" name='email' id='email'/>
                                  </div>
                                  <div className="form-group mt-3">
                                  {(passwordDirty && passwordError) && <div style={{color: 'red', background: 'none'}}>{passwordError}</div>}
                                    <label>Пароль</label>
                                    <input onChange={e=>paswordHendler(e)} value={password} onBlur={e=>blurHandle(e)} type="password" className="form-control mt-1" name='password' id='password'/>
                                  </div>
                                  <label htmlFor="reason" >Выберете свою роль</label>
                                        <select style={{background: 'rgba(0, 0, 0, 0.505)', marginTop: '10px'}} id="reason" className="control" value={selectedForm} onChange={e=> setForm(e.target.value)}>
                                            <option value="1">Пользователь</option>
                                            <option value="2">Фотограф</option>
                                        </select>
                                        {selectedForm == 2 ? (
                                          <>
                                          <div className="form-group mt-3">
                                          {(sityDirty && sityError) && <div style={{color: 'red', background: 'none'}}>{sityError}</div>}
                                            <label>Город</label>
                                            <input onChange={e=>sityHendler(e)} value={sity}
                                              type="text" className="form-control mt-1" name='sity' id='sity' onBlur={e=>blurHandle(e)}/>
                                          </div>
                                          <div className="form-group mt-3">
                                          {(printDirty && printError) && <div style={{color: 'red', background: 'none'}}>{printError}</div>}
                                            <label>Описание</label>
                                            <input onChange={e=> printHendler(e)} value={print}
                                              type="text" className="form-control mt-1" name='print' id='print' onBlur={e=>blurHandle(e)}/>
                                          </div>
                                          <div className="form-group mt-3">
                                          <label className="form-label input-foto" for="customFile">Загрузите фотографию</label>
                                          <input type="file" className="form-control input-foto" id="customFile4" />
                                          </div>
                                          
                                      </>
                                        ):
                                        <p></p>
                                        }
                                        
                                  <div className="d-grid gap-2 mt-3">
                                    <button disabled={!formValid} type="submit" className="btn btn-primary">
                                    <Link to='/about' className='font-link2'>
                                      войти
                                      </Link>
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
            
        </>
    )
}