import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-user'
import logo from '../../assets/img/logo.png'
import qr from '../../assets/img/qr.png'
import { API } from '../../config/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Rp from 'rupiah-format';

export default function Profile() {

    const navigate = useNavigate();

    const [dataTrans, setDataTrans] = useState([])
    const [dataProfile,setDataProfile] = useState([])

    useEffect(() => {
        const dataTrans = async () => {
            try {
                const response = await API.get('/transactions')
                setDataTrans(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        dataTrans();
    }, [setDataTrans]);

    useEffect(() => {
        const dataProfile = async () => {
            try {
                const response = await API.get('/profiles')
                setDataProfile(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        dataProfile();
    }, [setDataProfile]);

    return (
        <>
            <Navbar />
            <div className='flex mt3 mb2'>
                <div>
                {dataProfile.map((item,index) => (
                <div key={index}>
                <div>
                    <p className='my-profile'>My Profile</p>
                    <img src={item?.image} alt="" className='profile-pict' />
                </div>
                <div className='ml10'>
                    <p className='profile-name mt5 ml1'>Full Name</p>
                    <p className='profile-value ml1'>{item.user?.name}</p>
                    <p className='profile-name ml1'>Email</p>
                    <p className='profile-value ml1'>{item.user?.email}</p>
                    <p className='profile-name ml1'>Address</p>
                    <p className='profile-value ml1'>{item?.address}</p>
                    <p className='profile-name ml1'>Postcode</p>
                    <p className='profile-value ml1'>{item?.postcode}</p>
                    <p className='profile-name ml1'>Phone</p>
                    <p className='profile-value ml1'>{item?.phone}</p>
                </div>
                </div>
                ))}
                <div className='ml10'>
                    <button className='ml1 profile-btn' onClick={() => navigate('/add-profile')}>Add Profile</button>
                    <button className='ml1 profile-btn'>Update Profile</button>
                </div>
                </div>
                <div>
                    <p className='ml6-75 mt1-5 my-transaction'>My Transaction</p>
                    {dataTrans.map((item, index) => (
                        <div key={index}>
                            {item.cart.map((itm,idx) => (
                            <div className='transaction flex ml6-75'>
                                <img src={itm.product?.image} alt="" className='product-transaction' />
                                <div>
                                    <p className='transaction-title mt1-5'>{itm.product?.name}</p>
                                    <p className='transaction-date mt1-25'><strong></strong></p>
                                    <p className='transaction-price mt1-75'>Price: {Rp.convert(itm.product?.price)}</p>
                                    <p className='transaction-price'>Qty: {itm?.qty}</p>
                                    <p className='transaction-sub mt1'>Sub Total: {Rp.convert(itm?.sub_amount)}</p>
                                </div>
                                <div className='transaction-status-container'>
                                    <img src={logo} alt="" className='transaction-logo mt1-5' />
                                    <br />
                                    <img src={qr} alt="" className='transaction-qr mt0-5' />
                                    <div className='transaction-status mt0-5'>
                                        <p className='transaction-status-txt'>{item?.status}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}