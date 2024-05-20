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
    const [selectimagesbeauty, setSelectimagesbeauty] = useState([]);
    const [selectimageseat, setSelectimageseat] = useState([]);
    const [selectimagesanimals, setSelectimagesanimals] = useState([]);
    const [selectimagespipls, setSelectimagespipls] = useState([]);
    const [selectimagessity, setSelectimagessity] = useState([]);
    const [selectimagesaesthetics, setSelectimagesaesthetics] = useState([]);

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
              </>


          )
        }))
      
          }).catch(err => {
          console.log(err);
        });
        axios.get('http://localhost:5000/selectimgbeauty', ).then(res => { 
            setSelectimagesbeauty(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimgbeauty/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
                  </>
    
    
              )
            }))
          
              }).catch(err => {
              console.log(err);
            })
            axios.get('http://localhost:5000/selectimgeat', ).then(res => { 
            setSelectimageseat(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimgeat/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
                  </>
    
    
              )
            }))
          
              }).catch(err => {
              console.log(err);
            })
            axios.get('http://localhost:5000/selectimganimals', ).then(res => { 
            setSelectimagesanimals(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimganimals/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
                  </>
    
    
              )
            }))
          
              }).catch(err => {
              console.log(err);
            })
            axios.get('http://localhost:5000/selectimgpipls', ).then(res => { 
            setSelectimagespipls(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimgpipls/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
                  </>    
              )
            }))
          
              }).catch(err => {
              console.log(err);
            })
            axios.get('http://localhost:5000/selectimgsity', ).then(res => { 
            setSelectimagessity(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimgsity/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
                  </>    
              )
            }))
          
              }).catch(err => {
              console.log(err);
            })
            axios.get('http://localhost:5000/selectimgaesthetics', ).then(res => { 
            setSelectimagesaesthetics(res.data.data.map((item, i)=> {
              return(
                <>
                <div className="galereifoto">
                 <img src={`http://localhost:5000/uploadsimgaesthetics/${item.img}`} alt="" className='fotowithgalerei'  style={{width: '500px'}}/>
                 <Card.Title className="titlefoto">{item.title}</Card.Title>
                 <Card.Text className="discriptionfoto">
                    {item.description}
                    <p>{item.widthFoto}*{item.heightFoto}</p>
                    <p className="price">цена: 120р</p>
                    <button className="button8">купить</button>
                    
                </Card.Text>
                 </div>
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
                
                
                {selectedForm == 0 ? (
                <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimages}
                    </Masonry>
             
                    
                </>
             
                ): selectedForm == 1 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimagesbeauty}
                    </Masonry>
                    
                    
                </>
                ): selectedForm == 2 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimageseat}
                    </Masonry>

                    
                </>
                ): selectedForm == 3 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimagesanimals}
                    </Masonry>
                </>
                ): selectedForm == 4 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimagespipls}
                    </Masonry>
                </>
                ): selectedForm == 5 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimagessity}
                    </Masonry>
                </>
                ): selectedForm == 6 ?(
                    <>
                    <Masonry columnsCount={3} gutter="20px" style={{width: '1830px'}}>
                        {selectimagesaesthetics}
                    </Masonry>
                </>
                ): <p></p>
                    
                }
        </form>

        </>
    )
}