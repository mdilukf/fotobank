import { useEffect, useState } from 'react'
import '../TeachenSection.css'

export default function TaechenSection(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emaeiError, setEmailError]=useState('Email не должен быть пустым')
  const [passwordError, setPasswordError]=useState('Пароль не должен быть пустым')
  const [formValid, setFoemValid] = useState(false)

  useEffect(()=>{
    if(emaeiError || passwordError){
      setFoemValid(false)
    }
    else{
      setFoemValid(true)
    }
  }, [emaeiError, passwordError])

  const blurHandle = (e) =>{
    switch(e.target.name){
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
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
        setPasswordError('Пароль не должен быть пустым')
      }
    }else{
      setPasswordError('')
    }
  }

    return(
        <section>
          <div className="Auth-form-container">
                    <form className="Auth-form">
                      <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Вход</h3>
                        <div className="form-group mt-3">
                          {(emailDirty && emaeiError) && <div style={{color: 'red', background: 'none'}}>{emaeiError}</div>}
                          <label>Ваш email</label>
                          <input onChange={e => emailHendler(e)} value={email} onBlur={e=>blurHandle(e)} type="email" className="form-control mt-1" name='email' id='email'
                          />
                        </div>
                        <div className="form-group mt-3">
                        {(passwordDirty && passwordError) && <div style={{color: 'red', background: 'none'}}>{passwordError}</div>}
                          <label>Пароль</label>
                          <input onChange={e=>paswordHendler(e)} value={password} onBlur={e=>blurHandle(e)} type="password" className="form-control mt-1" name='password' id='password'
                          />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                          <button disabled={!formValid} type="submit" className="btn btn-primary">
                            войти
                          </button>
                        </div>
                        <p className="text-center mt-2">
                          забыли <a href="#">пароль?</a>
                        </p>
                      </div>
                    </form>
                  </div>
        </section>
    )
}