import '../assets/css/Style.css'
import logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import DropdownAdmin from './dropdown-admin'


export default function Admin() {

    const navigate = useNavigate();

    return(
        <>
            <div className='Navbar'>
                <img src={logo} alt="" className='logo' onClick={ () => navigate('/admin') }/>
                <DropdownAdmin />
            </div>
        </>
    );
}