import React , {useState } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Masonry from "react-responsive-masonry"
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo1 from '../img/div-container.jpg'
import logo2 from '../img/eda.jpg'
import logo3 from '../img/chivot (1).jpg'
import logo4 from '../img/ludi.jpg'
import logo5 from '../img/город.jpg'
import logo6 from '../img/estetic.jpg'
import logo10 from '../img/Дизайн без названия.png'
import Modal from './Modal/Modal';
import axios from 'axios'
import Card from 'react-bootstrap/Card';

const imagess = [
    logo1,
    logo2,
    logo3,
    logo6,
    logo5,
    logo6,
]
const images = [
    logo1,
    logo2,
    logo3,
]
const imager = [
    logo4,
    logo5,
    logo6,
]


export default function Portfolio(){
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
    const [portvolio, setPortvolio] = useState([]);
    const [selectpoisk, setSelectpoisk] = useState([]);

    const [selectedForm, setForm] = useState(0);
    axios.get('http://localhost:5000/selectportvolio').then(res => { 
        setPortvolio(res.data.data.map((item, i)=> {
        return(
        <>
        <div className="galereifoto">
        <img src={`http://localhost:5000/uploadsportvolio/${item.img}`} alt="" className="portvolioimg" />
        <Card.Title className="titlefoto">{item.name} {item.fulname}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.sity}
                    <p>{item.ptint}</p>
                    <p>Для просмотра портфолиа, перейдите по ссылке</p>
                <a href={`${item.link}`} className="linkportvolio">{item.link}</a>
                    
                </Card.Text>
        </div>
        </>

    )
  }))

    }).catch(err => {
    console.log(err);
  })

  const [poist, setPoist] = useState('')
  const zapros = (e)=>{
    setPoist(e.target.value)
    console.log(poist);
  }
  const test = () => {

    axios.get('http://localhost:5000/poisk', { params: { poist} }
    ).then(res => {
        setSelectpoisk(res.data.data.map((item, i)=> {
            return(
            <>
            <div className="galereifoto">
            <img src={`http://localhost:5000/poisk/${item.img}`} alt="" className="portvolioimg" />
            <Card.Title className="titlefoto">{item.name} {item.fulname}</Card.Title>
                     <Card.Text className="discriptionfoto">
                        {item.sity}
                        <p>{item.ptint}</p>
                        <p>Для просмотра портфолиа, перейдите по ссылке</p>
                    <a href={`${item.link}`} className="linkportvolio">{item.link}</a>
                        
                    </Card.Text>
            </div>
            </>
    
        )
      }))
    }).catch(err => {
      console.error(err);
      console.log(err);
    })
    
  }
    return(
        
        <>
        <div className="container">
                    <div className="input-group galerei">
                        <input type="search" className="form-control" placeholder="поиск изображения" aria-label="Search" aria-describedby="search-addon" onChange={zapros} value={poist}/>
                        <button type="submit" className="btn-galeri color-button" data-mdb-ripple-init onClick={test}>найти</button>
                    </div>
        </div>
        
                <>
                <Masonry columnsCount={3} gutter="20px" style={{marginLeft: '50px'}}>
                    {selectpoisk}
                </Masonry>
                <Masonry columnsCount={3} gutter="20px" style={{marginLeft: '50px'}}>
                    {portvolio}
                </Masonry>

                   
                </>
             
    

        </>
    )
}