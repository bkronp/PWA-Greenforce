import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Card,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import { BsCheck2All } from "react-icons/bs";
import { Parallax } from 'react-parallax'

import  'aos/dist/aos.css' ;
import Aos from 'aos';

const AboutUs = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <>
            <Container className='p-5' data-aos="fade-up">
                <Card.Title className='text-center fw-bolder'>
                    SOBRE NOSOTROS
                </Card.Title>
                <Row className='row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2'>
                    <Col>
                        <Card.Body className='text-justify'>
                            <p style={{fontSize:'18px'}}>
                                Somos una Empresa Mexicana dedicada a la comercialización,
                                distribución y asesoría  de productos orgánicos y ecológicos para
                                satisfacer y superar las necesidades actuales del campo mexicano.
                            </p>

                            <p style={{fontSize:'18px'}}> <BsCheck2All style={{ color: '#39c0ed' }} /> Ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                            <p style={{fontSize:'18px'}}> <BsCheck2All style={{ color: '#39c0ed' }} /> Duis aute irure dolor in reprehenderit in voluptate velit</p>
                            <p style={{fontSize:'18px'}}> <BsCheck2All style={{ color: '#39c0ed' }} /> Ullamco laboris nisi ut aliquip ex ea commodo consequa</p>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Text style={{fontSize:'18px'}}>
                                Ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui oficia deserunt mollit anim id est laborum.
                            </Card.Text>
                            <Button href='/mision-vision' className='rounded-pill mx-2' variant="outline-success" style={{ borderColor: '#00B078' }}>
                                Ver más
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
            <div>
                <Parallax blur={{ min: -15, max: 15 }} bgImage='https://images.unsplash.com/photo-1537762029476-ea26cf099074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' strength={-300}>
                    <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Card.Body className='text-justify'>
                                    <h2>Para nostros es.</h2>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur.
                                        Excepteur sint occaecat cupidatat non proident,
                                        sunt in culpa qui oficia deserunt mollit anim id est laborum.
                                    </p>
                                    <style jsx>{`
                                    p{
                                        color: #ffff;
                                        font-weigh: bold;
                                        font-size: 20px;
                                    }
                                    h2{
                                        color: #ffff;
                                    }
                                    `}
                                    </style>
                                </Card.Body>
                            </Col>
                            <Col className='p-5' xs={6} md={4}>
                                <Card.Body>
                                    <Button href='/nutricion-vegetal/1' className='rounded-pill' rounded variant="outline-light">
                                        Saber mas
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Container>
                </Parallax>
            </div>
        </>
    )
}

export default AboutUs