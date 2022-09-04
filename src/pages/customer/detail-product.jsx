import '../../assets/css/Detail.css'
import Navbar from '../../component/navbar-user'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rp from 'rupiah-format';
import { API } from '../../config/api';
import { useMutation } from 'react-query';
import { Alert } from 'react-bootstrap';

export default function Detail() {

    const navigate = useNavigate();

    const params = useParams();

    const [dataProduct, setDataProduct] = useState([])

    const [alert,setAlert] = useState(null);

    const dataproduct = async () => {
        try {
            const response = await API.get('/product/' + params.id)
            setDataProduct(response.data.data)
        } catch (error) {
            console.log(error);
        }   
    };
    useEffect(() => {
        dataproduct();
    }, []);

    let qty = 1;
    let sub = dataProduct?.price
    console.log(sub);

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-Type':'application/json'
                },
            };

            await API.post('/transaction', config)

            const body = JSON.stringify({
                product_id: parseInt(params.id),
                qty: qty,
                sub_amount: sub
            })

            await API.post('/cart', body, config)

            navigate('/cart')
        } catch (error) {
            const alert = (
                <Alert variant='danger'>
                    Failed add to Cart
                </Alert>
            );
            setAlert(alert)
            console.log(error);
        }
    });

    return (
        <>
            <Navbar />
            {alert && alert}
            <div className='container'>
                <div className='pict-container'>
                    <img src={dataProduct?.image} alt="" className='pict' />
                </div>
                <div className='content-container'>
                    <p className='title'>{dataProduct?.name}</p>
                    <p className='stock'>Stock : {dataProduct?.stock}</p>
                    <p className='content'>{dataProduct.description}</p>
                    <p className='price'>{Rp.convert(dataProduct.price)}</p>
                    <button className='cart-btn' onClick={(e) => handleSubmit.mutate(e)}>
                        <p className='cart-btn-txt'>Add Cart</p>
                    </button>
                </div>
            </div>
        </>
    );
}