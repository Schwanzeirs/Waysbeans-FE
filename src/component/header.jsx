import '../assets/css/Style.css'
import logo from '../assets/img/logo.png'
import Login from './modal';

export default function Header() {

    return (
        <>
            <div className='Navbar'>
                <img src={logo} alt="" className='logo' />
                <Login />
            </div>
        </>
    );
}