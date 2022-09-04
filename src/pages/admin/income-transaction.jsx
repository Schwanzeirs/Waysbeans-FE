import '../../assets/css/Style.css'
import Navbar from '../../component/navbar-admin'
import data from '../../assets/dummy/transaction'
import { useState } from 'react';


export default function Transaction() {

    const [datas] = useState(data)

    return(
        <>
            <Navbar/>
            <div className='mt5 ml3-5'>
                <p className='income-table'>Income transaction</p>
                <table className='ml8-75'>
                    <thead className='bg-brown'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Product Order</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item,index) => (
                        <tr key={index}>
                            <td>{item?.no}</td>
                            <td>{item?.name}</td>
                            <td>{item?.address}</td>
                            <td>{item?.postcode}</td>
                            <td>{item?.product}</td>
                            <td>{item?.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}