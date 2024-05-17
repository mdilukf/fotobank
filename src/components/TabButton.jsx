import Button from "./button/Buttom"

export default function TabButton({active, onChenge}){
    return(
        <section style={{marginTop: '15px'}}>
            <Button isActive={active == 'main'} onClick={() => onChenge('main')} >Вход</Button>
            <Button isActive={active == 'feedbeck'} onClick={() => onChenge('feedbeck')} >Регистрация</Button>
        </section>
    )
}