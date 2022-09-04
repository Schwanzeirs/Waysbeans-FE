import '../assets/css/Style.css'
import profile from '../assets/img/profile.png'
import { useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'; 
import admin from '../assets/img/admin.png'
import logout from '../assets/img/logout.png'
import { useContext } from 'react'
import { Usercontext } from '../assets/context/user-context'

export default function DropdownAdmin() {
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
                <NavDropdown title={photo} className='dropdown-admin'>
                    <NavDropdown.Item onClick={ () => navigate('/add-product') }>
                        <img src={admin} alt="" className='dropdown-logo mr1'/>Add Product
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={ () => navigate('/list-product') }>
                        <img src={admin} alt="" className='dropdown-logo mr1'/>List Product
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