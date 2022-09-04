import '../assets/css/Style.css'
import logo from '../assets/img/logo.png'
import cart from '../assets/img/cart.png'
import profile from '../assets/img/profile.png'
import { useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'; 
import user from '../assets/img/user.png'
import logout from '../assets/img/logout.png'
import { useContext } from 'react'
import { Usercontext } from '../assets/context/user-context'


export default function DropdownUser() {
    const photo = <img className='profile' src={profile} alt=''/>

    const navigate = useNavigate();

    const [state, dispatch] = useContext(Usercontext)

    const  Logout = () => {
        dispatch({
            type: 'LOG_OUT'
        })
        navigate('/')
    }

    return(
        <>
            <div className='Navbar'>
                <img src={logo} alt="" className='logo' onClick={ () => navigate('/main') }/>
                <img src={cart} alt="" className='cart' onClick={ () => navigate('/cart') }/>
                <NavDropdown title={photo}>
                    <NavDropdown.Item onClick={ () => navigate('/profile') }>
                        <img src={user} alt="" className='dropdown-logo mr1'/>Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={Logout}>
                        <img src={logout} alt="" className='dropdown-logo mr1'/>Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
    );
}