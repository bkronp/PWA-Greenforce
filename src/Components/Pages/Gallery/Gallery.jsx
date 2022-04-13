import React from 'react'
import LayoutPage from "../../Layouts/LayoutMain/Layout";
import GalleryAdd from '../../../Gallery/Gallery';
import Banner from '../../../Resources/banners/bannerPrincipal.png'

const Gallery = () => {
    return (
        <>
            <LayoutPage>
                <GalleryAdd />
            </LayoutPage>
        </>
    )
}

export default Gallery