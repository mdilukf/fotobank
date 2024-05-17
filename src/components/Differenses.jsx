import {differences } from './data';
import  Button from "./button/Buttom";
import{ useState } from 'react';

export default function Differenses(){
    const [ contentType, setContentType ] =  useState(null)

    function handelClick(type){
      setContentType(type)
    }
  

    return(
        <section>
        <h3>Чем отличаемся от других</h3>

        <Button isActive={contentType=='way'} onClick={() => handelClick('way')}>Привет</Button>
        <Button isActive={contentType=='easy'} onClick={() => handelClick('easy')}>Привет</Button>
        <Button isActive={contentType=='program'} onClick={() => handelClick('program')}>Пока </Button>

        {/* <Button text="button 1"/>
        <Button text="button 2"/> */}
        { contentType ? <p>{differences[contentType]}</p>: <p>Нажми меня</p> }
        
      </section>
    )
}