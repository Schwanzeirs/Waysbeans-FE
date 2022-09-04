import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-admin'
import upload from '../../assets/img/upload.png'
import { useState } from 'react'

export default function Update() {

    const [preview, setPreview] = useState(null)
    const [updateProduct, setUpdateProduct] = useState({
        name:"",
        stock:"",
        price:"",
        description:"",
        img:""
    })

    const handleOnChange = (e) => {
        setUpdateProduct(({
            ...updateProduct,
            [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
          }))
  
          if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
        };

    return(
        <>
            <Navbar/>
            <div className='flex'>
                <div className='ml10 mt5'>
                    <p className='input-product-txt'>Update Product</p>
                    <input type="text" placeholder='Name'className='input-product mt1'/>
                    <br />
                    <input type="text" name="" id="" placeholder='Stock'className='input-product mt1'/>
                    <br />
                    <input type="text" name="" id="" placeholder='Price'className='input-product mt1'/>
                    <br />
                    <textarea name="" id="" placeholder='Description Product' className='input-description-product mt1'></textarea>
                    <br />
                    <input type="file" hidden id='picture'onChange={handleOnChange}/>
                    <input type="text" placeholder='Photo Product' className='input mt1'></input>
                    <label htmlFor='picture' className='label'>
                    <img src={upload} alt="" className='upload-btn'/>
                    </label>
                    <br />
                    <button className='add-product-btn mt3-5 ml6'>Update Product</button>
                </div>
                <div className='ml10-75 mt5'>
                    <img src={preview} alt="" className='img-preview'/>
                </div>
            </div>
        </>
    );
}