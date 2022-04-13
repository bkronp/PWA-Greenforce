import React, {useState} from 'react'
import Img1 from '../Resources/gallery/img01.jpeg'
import Img2 from '../Resources/gallery/img02.jpeg'
import Img3 from '../Resources/gallery/img03.jpeg'
import Img4 from '../Resources/gallery/img04.jpeg'
import Img5 from '../Resources/gallery/img05.jpeg'
import Img6 from '../Resources/gallery/img06.jpeg'

import Styles from '../css/style.module.css'

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import { Gallery, Item } from "react-photoswipe-gallery";

const GalleryAdd = () => {


    const [data, setData] = useState([
        {
            id: '1',
            imgSrc: Img1,
        },
        {
            id: '2',
            imgSrc: Img2,
        },
        {
            id: '3',
            imgSrc: Img3,
        },
        {
            id: '4',
            imgSrc: Img4,
        },
        {
            id: '5',
            imgSrc: Img5,
        },
        {
            id: '6',
            imgSrc: Img6,
        },
        {
            id: '7',
            imgSrc: Img1,
        },

    ])
    return (
        <Gallery>
            <div className={Styles.gallery}>
                {data.map((item, index) => {
                    return (
                        <div className={Styles.pics} key={index}>
                            <Item
                                original={item.imgSrc}
                                thumbnail={item.imgSrc}
                                width="1000"
                                height="768"
                            >
                                {({ ref, open }) => (
                                    <div className={Styles.row}>
                                        <img
                                        src={item.imgSrc}
                                        style={{ width: '100%' }}
                                        ref={ref}
                                        onClick={open} />
                                    </div>
                                )}
                            </Item>
                        </div>
                    )
                })}
            </div>
        </Gallery>

    )
}

export default GalleryAdd