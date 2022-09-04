import '../assets/css/Style.css'
import DropdownUser from './dropdown-user'


export default function Navbar() {

    return(
        <>
            <div className='Navbar'>
                <DropdownUser/>
            </div>
        </>
    );
}