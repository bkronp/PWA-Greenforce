import React from 'react'
import {
    Nav,
    Navbar,
    NavDropdown,
    Container,
    Button
} from 'react-bootstrap';

import logo from '../../Resources/Greenforce.png'

const HeaderNav = () => {
    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                variant="light"
            >
                <Container>
                    <Navbar.Brand href='/'>
                        <img
                            alt=""
                            src={logo}
                            width="90"
                            height="60"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand
                        className='h1'
                    >
                        GREENFORCE
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse
                        id="responsive-navbar-nav">
                        <Nav
                            className="me-auto">
                            <Nav.Link
                                href="/"
                                className='h6'
                            >
                                INICIO
                            </Nav.Link>
                            <Nav.Link
                                href="/mision-vision"
                                className='h6'
                            >
                                MISIÓN Y VISIÓN
                            </Nav.Link>
                            <NavDropdown
                                title="SOLUCIONES"
                                id="collasible-nav-dropdown"
                                className='h6'
                            >
                                <NavDropdown.Item
                                    href="/nutricion-vegetal/1">
                                    Productos
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item
                                    href="/proteccion-cultivos/2">
                                    Protección de Cultivos
                                </NavDropdown.Item> */}
                            </NavDropdown>
                            <Nav.Link
                                href="/gallery"
                                className='h6'
                            >
                                GALERIA
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Button
                                className='rounded-pill h5'
                                variant="outline-dark"
                                href='/contact'>
                                CONTACTO
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderNav