import { useState, useRef } from "react";
import Button from "./button/Buttom";


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


export default function FeedbackSection(){
    const [form, setForm] = useState({
        name: '',
        error: false,
        reason: 'help'
    })

    // const [name, setName] = useState('')
    // const [error, setError] = useState(false)
    // const [reason, setReason] = useState('help')

    function HendelChange(event){
        // setName(event.target.value)
        // setError(event.target.value.trim().length == 0)

        setForm({
            name: event.target.value,
            error: event.target.value.trim().length == 0
        })
    }
    return(
        <section>
            <h3>Регистрация</h3>

            <form>
                <label htmlFor="name">Ваше имя</label>
                <input type="text" className="control" id="name" style={{border: form.error ? '1px solid red': null}} value={form.name} onChange={HendelChange}/>

                <label htmlFor="reason">Прияина обращения</label>
                <select id="reason" className="control" value={form.reason} onChange={(event) => setForm((prev) => ({...prev, reason: event.target.value}))}>
                    <option value="error">Ошибка</option>
                    <option value="help">Нужна помощь</option>
                    <option value="suggest">Предложение</option>
                </select>

                <Button disabled = {form.error} isActive={!form.error}>Отправить </Button>
                <hr />


                <StateVsRef />
            </form>
        </section>
    )
}