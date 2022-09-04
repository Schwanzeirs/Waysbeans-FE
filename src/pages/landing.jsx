import '../assets/css/Style.css'
import logo from '../assets/img/logo.png'
import Header from '../component/header';
import waves from '../assets/img/waves.png'
import png from '../assets/img/Rectangle.png'
import { useState, useEffect } from 'react';
import { API } from '../config/api';

export default function Landing() {

    const [dataProduct, setDataProduct] = useState([]);

    useEffect(() => {
        const dataProduct = async () => {
            try {
                const response = await API.get('/products');
                setDataProduct(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        dataProduct();
    }, [setDataProduct])

    return(
        <>
            <Header/>
            <div className='rectangle'>
                <img src={logo} alt="" className='logo-rectangle' />
                <p className='header-txt'>BEST QUALITY COFFEE BEANS</p>
                <p className='content-txt'>Quality freshly roasted coffee made just for you.<br/>
                Pour, brew and enjoy</p>
                <img src={waves} alt="" className='waves'/>
                <img src={png} alt="" className='rect-img' />
            </div>
            <div className='card-container'>
            {dataProduct.map((item, index) => (
                <div key={index} className='card'>
                    <img src={item?.image} alt="" className='card-img'/>
                    <p className='card-title'>{item?.name}</p>
                    <p className='card-price'>Rp.{item?.price}</p>
                    <p className='card-stock'>Stock : {item?.stock}</p>
                </div>
            ))}
            </div>
        </>
    );
}