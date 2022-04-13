import React, { useEffect } from 'react'

import Image1 from '../../Resources/Marca/Alibio.png'
import Image2 from '../../Resources/Marca/Bida.png'
import Image3 from '../../Resources/Marca/Consorcios.png'
import Image4 from '../../Resources/Marca/Ecojal.png'
import Image5 from '../../Resources/Marca/Greenforce.png'
import Image6 from '../../Resources/Marca/SuperCosecha.png'
import Image7 from '../../Resources/Marca/Naturalis.png'
import Image8 from '../../Resources/Marca/Kalan.png'

import Styles from '../../css/style.module.css'

import  'aos/dist/aos.css' ;
import Aos from 'aos';

const Customers = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    let data = [
        {
            id: '1',
            imgSrc: Image1,
        },
        {
            id: '2',
            imgSrc: Image2,
        },
        {
            id: '3',
            imgSrc: Image3,
        },
        {
            id: '4',
            imgSrc: Image4,
        },
        {
            id: '5',
            imgSrc: Image5,
        },
        {
            id: '6',
            imgSrc: Image6,
        },
        {
            id: '7',
            imgSrc: Image7,
        },
        {
            id: '8',
            imgSrc: Image8,
        }
    ]

    return (
        <>
            
                <div className={Styles.container}>
                    {data.map((item, index) => {
                        return (
                            <div className={Styles.contImg} key={index} data-aos="zoom-in">
                                <img src={item.imgSrc} />
                            </div>
                        )
                    })}
                </div>
            
        </>
    )
}

export default Customers