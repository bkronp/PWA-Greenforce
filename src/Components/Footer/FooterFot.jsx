import React from 'react'

import {
    BsFillHouseDoorFill,
    BsEnvelopeFill,
    BsFillTelephoneFill
} from "react-icons/bs";
import GrayLogo from '../../Resources/logo.png'

const FooterFot = () => {
    return (
        <>
            <div className='pt-4' style={{ backgroundColor: 'rgb(38, 129, 68)' }}>
                <section >
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-4'>
                            <div className='col-md-3 col-lg-4 col-xl-3 ' >
                                <img src={GrayLogo}
                                    width="200"
                                    height="150"
                                    style={{ display: 'block', margin: 'auto' }}
                                />
                            </div>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color:'#F7FAF8 ' }}>
                                    GreenFerce
                                </h6>
                                <p style={{ color:'#F7FAF8 ', textAlign:'justify'}}>
                                Somos una Empresa Mexicana dedicada a la comercialización, 
                                distribución y asesoría de productos orgánicos y ecológicos 
                                para satisfacer y superar las necesidades actuales del campo mexicano
                                </p>
                            </div>

                            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color:'#F7FAF8 ' }}>SOBRE NOSOTROS</h6>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <a href='/' className='text-reset'>
                                        INICIO
                                    </a>
                                </p>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <a href='/nutricion-vegetal/1' className='text-reset'>
                                        PRODUCTO
                                    </a>
                                </p>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <a href='/contact' className='text-reset'>
                                        CONTACTO
                                    </a>
                                </p>
                            </div>

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' style={{ color:'#F7FAF8 ' }}>CONTACTO</h6>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <BsFillHouseDoorFill /> Av de los Pirules, 111-A, Cd Granja, Zapopan JAL
                                </p>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <BsEnvelopeFill />
                                    info@example.com
                                </p>
                                <p style={{ color:'#F7FAF8 ' }}>
                                    <BsFillTelephoneFill /> +333440 5552
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className='text-center p-4' style={{ backgroundColor: 'rgb(30, 99, 53) ', color:'#F7FAF8 '}} >
                © 2022 Derechos Reservados:
                <a className='text-reset fw-bold' href='#' style={{ color:'#F7FAF8 ' }}>
                    GreenForce.com
                </a>
            </div>
        </>
    )
}

export default FooterFot