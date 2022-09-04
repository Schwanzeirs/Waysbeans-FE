import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-user'
import upload from '../../assets/img/upload.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from 'react-query';
import { Alert } from 'react-bootstrap'
import { API } from '../../config/api'
import { Form } from 'react-bootstrap'

export default function AddProfile() {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        name:"",
        stock:"",
        price:"",
        description:"",
        img:""
    })

    const handleOnChange = (e) => {
        setForm(({
            ...form,
            [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
          }))
  
          if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
        };

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            };

            const formData = new FormData();
            formData.set('address', form.address)
            formData.set('postcode', form.postcode)
            formData.set('address', form.address)
            formData.set('image', form.image[0], form.image[0].name)

            const response = await API.post('/profile', formData, config)

            navigate('/profile')
        } catch (error) {
            const alert = (
                <Alert variant='danger' className='py1'>
                    Failed Add Profile
                </Alert>
            );
            setAlert(alert)
            console.log(error);
        }
    })

    return(
        <>
            <Navbar/>
            <div className='flex'>
                <div className='ml10 mt5'>
                    {alert && alert}
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                    <p className='input-product-txt'>Add Profile</p>
                    <input type="text" name='address' placeholder='Address' onChange={handleOnChange} className='input-product mt1'/>
                    <br />
                    <input type="text" name='postcode' id="" placeholder='Postcode' onChange={handleOnChange} className='input-product mt1'/>
                    <br />
                    <input type="text" name='phone' id="" placeholder='Phone' onChange={handleOnChange} className='input-product mt1'/>
                    <br />
                    <input type="file" hidden id='picture' name='image' onChange={handleOnChange}/>
                    <input type="text" placeholder='Photo Profile' className='input mt1'></input>
                    <label htmlFor='picture' className='label'>
                    <img src={upload} alt="" className='upload-btn'/>
                    </label>
                    <br />
                    <button className='add-product-btn mt3-5 ml6'>Add Product</button>
                    </Form>
                </div>
                <div className='ml10-75 mt5'>
                    <img src={preview} alt="" className='img-preview'/>
                </div>
            </div>
        </>
    );
}