import { styled } from 'styled-components'
import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Footer(){
    return(
        
        <Container fluid style={{background: '#111230', marginTop: '300px', borderTop: "2px solid #bec1e9", boxShadow: "0px -5px 13px 1px #bec1e9", paddingTop: '40px', position: 'absolute', marginBottom: '0px'}} >
            <Container style={{background: '#111230',marginBottom:'0px' }}>
                    <div className="container-fluid text-center text-md-left">
                        <div className="row">
                            <div className="col-md-6 mt-md-0 mt-3">
                                <Navbar.Brand href="#home"><Link to='/' className='font-link4'>collection</Link></Navbar.Brand>
                            </div>


                            <hr className="clearfix w-100 d-md-none pb-0"/>

                            <div className="col-md-3 mb-md-0 mb-3">
                                <ul className="list-unstyled">
                                <Nav.Item className=''>
                                    <Nav.Link href="#"><Link to='/gallery' className='font-link3'>галерея</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1"><Link to='/portfolio' className='font-link3'>портфолио</Link></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2 "><Link to='/about' className='font-link3'>о нас</Link></Nav.Link>
                                </Nav.Item>
                                </ul>
                            </div>

                            <div className="col-md-3 mb-md-0 mb-3">

                                <ul className="list-unstyled">
                                <Nav.Item className=''>
                                    <Nav.Link eventKey="link-3"><Link to='/reference' className='font-link3'>справки</Link></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-4"><Link to='/author' className='font-link3'>авторам</Link></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="link-5"><Link to='/contacts' className='font-link3'>контакты</Link></Nav.Link>
                                </Nav.Item>
                                </ul>
                            </div>
                        </div>
                    </div>
                
            </Container>
        </Container>
     
        
    )
}