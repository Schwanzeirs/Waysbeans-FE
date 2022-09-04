import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-user'
import bin from '../../assets/img/bin.png'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import Rp from 'rupiah-format';

export default function Cart() {

    const navigate = useNavigate();

    const [dataCart,setDataCart] = useState([]);

    useEffect(() => {
        const dataCart = async () => {
            try {
                const response = await API.get('cart-id')
                setDataCart(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        dataCart();
    }, [setDataCart]);

    let totalQty = 0
    dataCart.forEach((item) => {
        totalQty += item?.qty
    })

    let Total = 0
    dataCart.forEach((item) => {
        Total += item.product?.price * item?.qty
    })

    let handleDelete = async (id) => {
        await API.delete(`/cart/` + id);
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    let handleIncrement = async (id, qty, price) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        }
        const newQty = qty + 1
        const newSub = newQty * price
        const body = JSON.stringify({
            qty : newQty,
            sub_amount : newSub
        })
        await API.patch(`/cart/${id}`, body, config)
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    let handleDecrement = async (id, qty, price) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        }
        const newQty = qty - 1
        const newSub = newQty * price
        const body = JSON.stringify({
            qty : newQty,
            sub_amount : newSub
        })
        await API.patch(`/cart/${id}`, body, config)
        const response = await API.get('cart-id')
        setDataCart(response.data.data)
    }

    const data = {
        status: "pending",
        amount: Total
    }

    console.log(Total);

    const handleSubmit = useMutation(async (e) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const body = JSON.stringify(data);
        const response = await API.patch("/transaction", body, config);
        const token = response.data.data.token;

        window.snap.pay(token, {
            onSuccess: function (result) {
                console.log(result);
                navigate("/profile");
            },
            onPending: function (result) {
                console.log(result);
            },
            onError: function () {
                alert("you closed the popup without finishing the payment");
            },
        });
    })

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidTransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidTransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className='flex'>
                <div className='cart-left'>
                    <p className='my-cart'>My Cart</p>
                    <p className='review-cart'>Review Your Order</p>
                    <div className='line mb2' />
                    {dataCart.map((item, index) => (
                    <div className='flex' key={index}>
                        <img src={item.product?.image} alt="" className='mb1 cart-img' />
                        <div>
                            <p className='ml1'>{item.product?.name}</p>
                            <div className='flex'>
                                <button className='counter-btn ml1' onClick={() => handleDecrement(item.id, item.qty, item.product.price)}>-</button>
                                <div className='cart-counter ml1 mt0-5'>{item?.qty}</div>
                                <button className='counter-btn ml1' onClick={() => handleIncrement(item.id, item.qty, item.product.price)}>+</button>
                            </div>
                        </div>
                        <div className='cart-order-right'>
                            <p>{Rp.convert(item.product?.price)}</p>
                            <img src={bin} alt="" className='bin ml4' onClick={() => handleDelete(item?.id)}/>
                        </div>
                    </div>
                    ))}
                    <div className='line mb1' />
                </div>
                <div className='cart-right'>
                    <div className='lines' />
                    <div className='flex'>
                        <div>
                            <p className='cart-txt mt1'>Subtotal</p>
                            <p className='cart-txt'>Qty</p>
                        </div>
                        <div className='sub-cart-detail'>
                            <p className='cart-txt mt1'>{Rp.convert(Total)}</p>
                            <p className='cart-txt-qty'>{totalQty}</p>
                        </div>
                    </div>
                    <div className='lines' />
                    <div className='flex'>
                        <p className='cart-total mt1'>Total</p>
                        <p className='cart-total-txt mt1'>{Rp.convert(Total)}</p>
                    </div>
                    <button className='pay-btn mt1' onClick={(e) => handleSubmit.mutate(e)}>
                        <p className='pay-btn-txt'>Pay</p>
                    </button>
                </div>
            </div>
        </>
    );
}