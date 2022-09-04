import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-admin'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api'


export default function List() {

    const [dataProduct, setDataProduct] = useState([]);

    useEffect(() => {
        const dataProduct = async () => {
            try {
                const response = await API.get('/products')
                setDataProduct(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        dataProduct();
    }, [setDataProduct])

    const navigate = useNavigate()

    let handleDelete = async (id) => {
        await API.delete(`/product/` + id)
        const response = await API.get('/products')
        setDataProduct(response.data.data)
    }

    return(
        <>
            <Navbar/>
            <div className='mt5 ml3-5'>
                <p className='income-table'>List Product</p>
                <table className='table'>
                    <thead className='bg-brown'>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProduct.map((item,index) => (
                        <tr key={index}>
                            <td>{item?.id}</td>
                            <td><img src={item?.image} alt="" className='table-img ml4'/></td>
                            <td>{item?.name}</td>
                            <td>{item?.stock}</td>
                            <td>{item?.price}</td>
                            <td>{item?.description}</td>
                            <td><button className='delete-btn ml0-5' onClick={() => handleDelete(item?.id)}>Delete</button><button className='update-btn ml0-5' onClick={ () => navigate('/update-product')}>Update</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}