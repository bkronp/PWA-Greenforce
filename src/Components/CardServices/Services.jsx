import React, { useEffect } from 'react'
import {
    Container,
    Card,
    Row,
    Col
} from 'react-bootstrap'
import {
    AiOutlineDribbble,
    AiOutlineFileText,
    AiOutlineGift,
    AiOutlineCloud
} from 'react-icons/ai'

import Styles from '../../css/style.module.css'

import  'aos/dist/aos.css' ;
import Aos from 'aos';

const Services = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <>
            <div>
                <Container className='p-5' data-aos="fade-up">
                    <Card.Title className='text-center'>
                        <h2>SERVICIOS</h2>
                    </Card.Title>
                    <Card.Text className='text-center py-3' style={{fontSize:'18px'}}>
                        Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.
                        Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
                        Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
                    </Card.Text>
                    <Row className='row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4  g-4' data-aos="zoom-in">
                        <Col className={Styles.animat}>
                            <Card border="light" className={`${Styles.fond} ${'p-3 mb-5 bg-white rounded'}`}>
                                <Card.Body>
                                    <AiOutlineDribbble
                                        style={{ width: "35", height: "35", color: '#00B078' }}
                                    />
                                 
                                        <Card.Title
                                            className='pt-3'
                                            style={{ color: '#00B078' }}
                                        >
                                            Card title
                                        </Card.Title>
                                    <Card.Text>
                                        Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className={Styles.animat}>
                            <Card border="light" className={`${Styles.fond} ${'p-3 mb-5 bg-white rounded'}`}>
                                <Card.Body>
                                    <AiOutlineFileText
                                        style={{ width: "35", height: "35", color: '#00B078' }}
                                    />
                                    <Card.Title
                                        className='pt-3'
                                        style={{ color: '#00B078' }}
                                    >
                                        Card title
                                    </Card.Title>
                                    <Card.Text>
                                        Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className={Styles.animat}>
                            <Card border="light" className={`${Styles.fond} ${'p-3 mb-5 bg-white rounded'}`}>
                                <Card.Body>
                                    <AiOutlineGift
                                        style={{ width: "35", height: "35", color: '#00B078' }}
                                    />
                                    <Card.Title
                                        className='pt-3'
                                        style={{ color: '#00B078' }}
                                    >
                                        Card title
                                    </Card.Title>
                                    <Card.Text>
                                        Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className={Styles.animat}>
                            <Card border="light" className={`${Styles.fond} ${'p-3 mb-5 bg-white rounded'}`}>
                                <Card.Body>
                                    <AiOutlineCloud
                                        style={{ width: "35", height: "35", color: '#00B078' }}
                                    />
                                    <Card.Title
                                        className='pt-3'
                                        style={{ color: '#00B078' }}
                                    >
                                        Card title
                                    </Card.Title>
                                    <Card.Text>
                                        Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Services