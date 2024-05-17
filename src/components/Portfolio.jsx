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

    const [selectedForm, setForm] = useState(0);
    
    return(
        
        <>
        <div className="container">
                    <div className="input-group galerei">
                        <input type="search" className="form-control" placeholder="поиск изображения" aria-label="Search" aria-describedby="search-addon" />
                        <button type="submit" className="btn-galeri color-button" data-mdb-ripple-init>найти</button>
                    </div>
        </div>
        
                <>
                   {
                        data.img && <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#111230eb',
                            position: 'fixed',
                            top: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            zIndex: '100'
                            }}>
                            <button  onClick={()=>imgAction()} style={{position: 'absolute', border: '1px solid #ffffff00', top: '10px', right: '50px', color: 'white', fontSize:'30px', background:'#11123000'}}>x</button>
                            
                            <div className='osnova-portfolio'>
                            <div className='portvolio'>
                            <img src={data.img} alt="" style={{width: 'auto', maxWidth: '60%', maxHeight: '60%', position: 'relative', marginLeft: '-20%'}}/>
                                <h1 className='lich-polzovat'>Иия</h1>
                                <span>Фамилия</span>  
                                <input type="text" placeholder='ссылка на ваше портфолио' style={{background: '#ffffff94', color: 'black', borderRadius: '13px', width: '470px', marginLeft: '0', height: '40px'}}/>
                                <ul>
                                    <li><h1 className='lich-polzovat'>Номер телефона</h1></li>
                                    <li><h2 className='lich-polzovat'>Город</h2></li>
                                    <li><h2 className='lich-polzovat'>описание</h2></li>
                            </ul>     
                           
                            </div>
                        </div>
                    
                        {/* <div className='cartins-portvolio'>
                      
                                    <div className='masor' >
                                        <Masonry columnsCount={3} gutter="20px">
                                            {imagess.map((image, i) => (
                                            <img
                                                key={i}
                                                src={image}
                                                style={{width: "100%", display: "block", cursor: 'pointer'}}
                                                onClick={()=> viewImage(image, i)}
                                            />
                                            ))}
                                        </Masonry>
                                    </div>
                        </div> */}

        </div>
                    }
                                    <div className='masor' >
                                        <Masonry columnsCount={3} gutter="20px">
                                            {imager.map((image, i) => (
                                            <img
                                                key={i}
                                                src={image}
                                                style={{width: "100%", display: "block", cursor: 'pointer'}}
                                                onClick={()=> viewImage(image, i)}
                                            />
                                            ))}
                                        </Masonry>
                                    </div>
                                    
                </>
             
    

        </>
    )
}