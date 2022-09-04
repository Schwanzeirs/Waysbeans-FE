import '../assets/css/Style.css'
import { useState, useContext  } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { Usercontext } from '../assets/context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/api';

export default function Login() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    // Register function integrated with back-end
    const [formRegister, setFormRegister] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [alertRegister, setAlertRegister] = useState(null);

    const { name, email, password } = formRegister;

    const handleChangeRegister = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value,
        })
    }

    const handleRegister = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const body = JSON.stringify(formRegister)

            const response = await API.post('/register', body, config);

            if (response?.status === 200) {
                const alertSuccess = (
                    <Alert variant='success' className='py1'>
                        Success Register
                    </Alert>
                );
            setAlertRegister(alertSuccess)
            }
        } catch (error) {
            const alertFailed = (
                <Alert variant='danger' className='py1'>
                    Failed Register
                </Alert>
            );
            setAlertRegister(alertFailed)
            console.log(Error);
        }
    });

    // Login function integrated with back-end
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    })

    const [alertLogin, setAlertLogin] = useState(null);

    const { emailLogin, passwordLogin } = formLogin;

    const handleChangeLogin = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                },
            };

            const body = JSON.stringify(formLogin)

            const response = await API.post('/login', body, config)

            if (response?.status === 200) {
                dispatch({
                    type: 'LOG_IN',
                    payload: response.data.data
                })

                console.log(response);

                if (response.data.data.status === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/main')
                }
            }
        } catch (error) {
            const alertFailedLogin = (
                <Alert variant='danger' className='py1'>
                    Failed Login
                </Alert>
            );
            setAlertLogin(alertFailedLogin);
            console.log(error);
        }
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [state, dispatch] = useContext(Usercontext)

    function SwitchModal() {
        if (show) {
            setShow(false)
            setShowRegister(true)
        } else {
            setShowRegister(false)
            setShow(true)
        }
    }

    return (
        <>
            <button className='login-btn' onClick={handleShow}>
                <p className='login-txt'>
                    Login
                </p>
            </button>

            <button className='register-btn' onClick={handleShowRegister}>
                <p className='register-txt'>
                    Register
                </p>
            </button>

            {/* Modal Login */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body >
                    {alertLogin && alertLogin}
                    <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleLogin.mutate(e)}>
                        <h2 className='mt2 ml1 mb1 modal-title'>Login</h2>
                        <input
                            type="email"
                            id="email" name="email"
                            placeholder="Email"
                            className='modal-input'
                            onChange={handleChangeLogin}
                            value={emailLogin}
                        />
                        <input
                            type="password"
                            id="password" name="password"
                            placeholder="Password"
                            className='modal-input'
                            onChange={handleChangeLogin}
                            value={passwordLogin}
                        />
                        <button type="submit" className='modal-btn'>
                            Login
                        </button>
                        <p className='ml6 mt1'>
                            Doesn't have an account ? Click <strong onClick={SwitchModal} className='switch-btn'>Here</strong>
                        </p>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal Register */}
            <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Body>
                    {alertRegister && alertRegister}
                    <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleRegister.mutate(e) }>
                        <h2 className='mt2 ml1 mb1 modal-title'>Register</h2>
                        <input
                            type="email"
                            id="email" name="email"
                            placeholder="Email"
                            className='modal-input'
                            onChange={handleChangeRegister}
                            value={email}
                        />
                        <input
                            type="password"
                            id="password" name="password"
                            placeholder="Password"
                            className='modal-input'
                            onChange={handleChangeRegister}
                            value={password}
                        />
                        <input
                            type="text"
                            id="name" name="name"
                            placeholder="Full Name"
                            className='modal-input'
                            onChange={handleChangeRegister}
                            value={name}
                        />
                        <button className='modal-btn' type="submit">
                            Register
                        </button>
                        <p className='ml6 mt1'>
                            Already have an account ? Click <strong onClick={SwitchModal} className='switch-btn'>Here</strong>
                        </p>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}