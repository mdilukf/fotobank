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
import axios from 'axios';
import Card from 'react-bootstrap/Card';



export default function Gallery(){
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
    const [selectimages, setSelectimages] = useState([]);

    const [selectedForm, setForm] = useState(0);
    
    axios.get('http://localhost:5000/selectimg', ).then(res => { 
        setSelectimages(res.data.data.map((item, i)=> {
          return(
            <>
            <div className="galereifoto">
             <img src={`http://localhost:5000/uploadsimg/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
             <Card.Title className="titlefoto">{item.title}</Card.Title>
             <Card.Text className="discriptionfoto">
                {item.description}
                <p>{item.widthFoto}*{item.heightFoto}</p>
                <p className="price">цена: 120р</p>
                <button className="button8">купить</button>
                
            </Card.Text>
             </div>

              {/* <Card style={{ width: '18rem' }}>
             
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
              </>


          )
        }))
      
          }).catch(err => {
          console.log(err);
        })
    return(
        
        <>
        <div className="container">
                    <div className="input-group galerei">
                        <input type="search" className="form-control" placeholder="поиск изображения" aria-label="Search" aria-describedby="search-addon" />
                        <button type="submit" className="btn-galeri color-button" data-mdb-ripple-init>найти</button>
                    </div>
        </div>
        <form className="Auth-form-galeri">
                <select  id="reason" className="control-galerei" value={selectedForm} onChange={e=> setForm(e.target.value)}>
                    <option value="0">Выбрать категорию</option>
                    <option value="1">Красота</option>
                    <option value="2">Еда</option>
                    <option value="3">Животные</option>
                    <option value="4">Люди</option>
                    <option value="5">Города</option>
                    <option value="6">Эстетика</option>

                </select>
                
                
                {selectedForm == 1 ? (
                <>
                   {
                        data.img && <div style={{
                            width: '80%',
                            height: '80%',
                            background: '#111230eb',
                            position: 'fixed',
                            top: '100px',
                            left:'10%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            zIndex: '100'
                        }}>
                            <button  onClick={()=>imgAction()} style={{position: 'absolute', border: '1px solid #ffffff00', top: '10px', right: '50px', color: 'white', fontSize:'30px', background:'#11123000'}}>x</button>
                            <img src={data.img} alt="" style={{width: 'auto', maxWidth: '60%', maxHeight: '60%', position: 'relative', marginLeft: '-40%'}}/>
                            <div className='marcer'></div>
                            <div className='information'>
                                <p>Название</p>
                                <p>описание</p>
                                <ul>
                                    <li>тег</li>
                                    <li>тег</li>
                                    <li>тег</li>
                                </ul>
                                <p>цена</p>
                                <Button className="button">купить</Button>
                                <p>автор</p>
                                <p>размеры</p>
                            </div>
                        </div>
                    }
                    <div className='masor' >
                        <Masonry columnsCount={3} gutter="20px">
                            {images.map((image, i) => (
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
             
                ): selectedForm == 2 ?(
                    <>
                    {
                        data.img && <div style={{
                            width: '80%',
                            height: '80%',
                            background: '#111230eb',
                            position: 'fixed',
                            top: '100px',
                            left:'10%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            zIndex: '100'
                        }}>
                            <button  onClick={()=>imgAction()} style={{position: 'absolute', border: '1px solid #ffffff00', top: '10px', right: '50px', color: 'white', fontSize:'30px', background:'#11123000'}}>x</button>
                            <img src={data.img} alt="" style={{width: 'auto', maxWidth: '60%', maxHeight: '60%', position: 'relative', marginLeft: '-40%'}}/>
                            <div className='marcer'></div>
                            <div className='information'>
                                <p>Название</p>
                                <p>описание</p>
                                <ul>
                                    <li>тег</li>
                                    <li>тег</li>
                                    <li>тег</li>
                                </ul>
                                <p>цена</p>
                                <Button className="button">купить</Button>
                                <p>автор</p>
                                <p>размеры</p>
                            </div>
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
                ): selectedForm == 0 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimages}
                    </Masonry>
                    {/* {
                        data.img && <div style={{
                            width: '80%',
                            height: '80%',
                            background: '#111230eb',
                            position: 'fixed',
                            top: '100px',
                            left:'10%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            zIndex: '100'
                        }}>
                            <button  onClick={()=>imgAction()} style={{position: 'absolute', border: '1px solid #ffffff00', top: '10px', right: '50px', color: 'white', fontSize:'30px', background:'#11123000'}}>x</button>
                            <img src={data.img} alt="" style={{width: 'auto', maxWidth: '60%', maxHeight: '60%', position: 'relative', marginLeft: '-40%'}}/>
                            <div className='marcer'></div>
                            <div className='information'>
                                <p>Название</p>
                                <p>описание</p>
                                <ul>
                                    <li>тег</li>
                                    <li>тег</li>
                                    <li>тег</li>
                                </ul>
                                <p>цена</p>
                                <Button className="button">купить</Button>
                                <p>автор</p>
                                <p>размеры</p>
                            </div>
                        </div>
                    }
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
                    </div> */}
                    
                </>
                ): 
                <p></p>
                    
                }
        </form>

        </>
    )
}