import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import BGImg from '../../assets/images/jwshop.png';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux'
import { set_login as setLogin } from '../../store/actions/AuthAction';
import config from '../../core/config';
import axios from 'axios';
import Loader from '../../components/Loader';
import { loadCartData } from '../../store/actions/CartAction';
function Login({isComponentLogin = false , onClose = ()=>{}}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        emailErr: false,
        password: '',
        passwordErr: false
    });

    const validate = () => {
        let noError = true;
        let tempdata = loginData
        if (loginData.email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(loginData.email)) {
            tempdata = {
                ...tempdata,
                emailErr: true,
            }
        } else {
            tempdata = {
                ...tempdata,
                emailErr: false,

            }
        }

        if (loginData.password == '') {
            tempdata = {
                ...tempdata,
                passwordErr: true,
            }
        } else {
            tempdata = {
                ...tempdata,
                passwordErr: false,
            }
        }

        if (tempdata.emailErr || tempdata.passwordErr) {
            noError = false
        }
        setLoginData(tempdata)
        return noError
    }


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            await axios.post(`${config.apiUrl_v1}/${config.LOGIN_URI}`, {
                email : loginData.email,
                password : loginData.password
            })
            .then(({data}) => {

                if (data.status) {
                    // console.log("DATA", data.data);
                    localStorage.setItem('token', data.token);
                    dispatch(setLogin(data.data.user));
                    dispatch(loadCartData());
                    setIsLoading(false);
                    if(isComponentLogin){
                        onClose();
                    }else{
                        history.push('/');
                    }
                } else {
                    alert(data.message);
                    setIsLoading(false);
                }


            })
            .catch(err => {
                console.log("ERR:", err);
                setIsLoading(false);
            })
            console.log("Success")
        } else {
            console.log("Fail")
        }
    }


    useEffect(() => {

    }, [])

    if (isLoading) {
        return <Loader isAbsolute={isComponentLogin} />
    }


    return (
        <div className='authContainer' style={{padding : isComponentLogin ? "10px" : "10px 40px"}}>
            <Helmet bodyAttributes={{ style: 'background-color : #bf852438' }} />
            <div className='container'>
                <div className="row no-gutters justify-content-center" >
                    <div className='col-lg-11' style={isComponentLogin ? {} : {boxShadow: "0 0 20px 0 #0000001f",}}>
                        <div className='row no-gutters justify-content-center'>
                            <div className={`col-lg-7 ${isComponentLogin ? "d-none" : ''}`}>
                                <div className='authBoxImg' style={{
                                    backgroundImage: `url(${BGImg})`,
                                }}></div>
                            </div>
                            <div className={isComponentLogin ?"col-lg-12" : "col-lg-5"}>
                                <div className={isComponentLogin ? `` : `authBoxFormLogin`}>
                                    <h2 style={{ marginBottom: "2px" }}>Login</h2>
                                    <p className='text-muted' style={{ fontSize: "14px" }}>Enter email address and password to login into your account.</p>
                                    <br />
                                    <form onSubmit={handleSubmitLogin}>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="text" className="form-control" placeholder='Email Address'
                                                    onChange={(e) => {
                                                        setLoginData({
                                                            ...loginData,
                                                            email: e.target.value
                                                        })
                                                    }}
                                                />
                                                {
                                                    loginData.emailErr &&
                                                    <p className='text-error'>Enter a valid email address.</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" placeholder='Password'
                                                    onChange={(e) => {
                                                        setLoginData({
                                                            ...loginData,
                                                            password: e.target.value
                                                        })
                                                    }}
                                                />
                                                {
                                                    loginData.passwordErr &&
                                                    <p className='text-error'>This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group mt-3">
                                            <div className="col-lg-12">
                                                <button type='submit' className='btn btn-accent btn-block'>LOGIN</button>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3' style={{ fontSize: "13px", cursor: "pointer" }} onClick={() => history.push('/register')}>I don't have an account, click to Register</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login