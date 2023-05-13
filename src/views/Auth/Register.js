import React ,{useState, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import BGImg from '../../assets/images/jwshop.png';
import Helmet from 'react-helmet';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../core/config';
import Loader from '../../components/Loader';
import { set_login as setLogin } from '../../store/actions/AuthAction';
import { Toast } from 'primereact/toast';

function Register() {
    const [registerData, setRegisterData] = useState({
        email: '',
        emailErr: false,
        phone: '',
        phoneErr: false,
        name: '',
        nameErr: false,
        password: '',
        passwordErr: false,
        c_password: '',
        c_passwordErr: false,
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef(null);
    const validate = () => {
        let noError = true;
        let tempdata = registerData
        if (registerData.email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(registerData.email)) {
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

        if (registerData.phone == '') {
            tempdata = {
                ...tempdata,
                phoneErr: true,
            }
        } else {
            tempdata = {
                ...tempdata,
                phoneErr: false,
            }
        }
        if (registerData.password == '') {
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
        if (registerData.name == '') {
            tempdata = {
                ...tempdata,
                nameErr: true,
            }
        } else {
            tempdata = {
                ...tempdata,
                nameErr: false,
            }
        }
        if (registerData.c_password !== registerData.password) {
            tempdata = {
                ...tempdata,
                c_passwordErr: true,
            }
        } else {
            tempdata = {
                ...tempdata,
                c_passwordErr: false,
            }
        }

        if (tempdata.emailErr || 
            tempdata.passwordErr ||
            tempdata.nameErr ||
            tempdata.phoneErr ||
            tempdata.c_passwordErr 
            ) {
            noError = false
        }
        setRegisterData(tempdata)
        return noError
    }
    const handleRegisterLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            await axios.post(`${config.apiUrl_v1}/${config.REGISTER_URI}`, {
                email : registerData.email,
                password : registerData.password,
                name : registerData.name,
                phone : registerData.phone,
                c_password : registerData.c_password,
            })
            .then(({data}) => {

                if (data.status) {
                    // // console.log("DATA", data.data);
                    localStorage.setItem('token', data.token);
                    dispatch(setLogin(data.data.user))
                    setIsLoading(false);
                    toast.current.show({severity:'success', summary: 'Success', detail: data.message, life: 3000});
                    history.push('/');
                } else {
                    setIsLoading(false);
                    toast.current.show({severity:'error', summary: 'Error Message', detail: data.message, life: 3000});
                }


            })
            .catch(err => {
                setIsLoading(false);
                let errorArray = err.response.data.errors
                let errorText = ""
                for(var i of errorArray){
                    errorText += Object.values(i)[0] + '\n'
                }
                alert(errorText)
                console.log("ERR:", err);
            })
            console.log("Success")
        } else {
            console.log("Fail")
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='authContainer'>
        <Toast ref={toast} />
            <Helmet bodyAttributes={{ style: 'background-color : #bf852438' }} />
            <div className='container'>
                <div className="row no-gutters justify-content-center" >
                    <div className='col-lg-11' style={{
                        boxShadow: "0 0 20px 0 #0000001f",
                    }}>
                        <div className='row no-gutters justify-content-center'>
                            <div className="col-lg-7">
                                <div className='authBoxImg' style={{
                                    backgroundImage: `url(${BGImg})`,
                                }}></div>
                            </div>
                            <div className="col-lg-5">
                                <div className='authBoxFormRegister'>
                                    <h2 style={{ marginBottom: "2px" }}>Create Account</h2>
                                    <p className='text-muted' style={{ fontSize: "14px" }}>Fillup the below from and proceed to register.</p>
                                    <form onSubmit={handleRegisterLogin} >
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                <input onChange={(e)=>setRegisterData({...registerData,name : e.target.value})} value={registerData.name}  type="text" className="form-control" placeholder='Full Name' />
                                                {
                                                    registerData.nameErr &&  
                                                    <p className='text-error'>This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="phone" className="form-label">Phone or Mobile</label>
                                                <input onChange={(e)=>setRegisterData({...registerData,phone : e.target.value})} value={registerData.phone}  type="text" className="form-control" placeholder='Phone or Mobile' />
                                                {
                                                    registerData.phoneErr &&  
                                                    <p className='text-error'>This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input onChange={(e)=>setRegisterData({...registerData,email : e.target.value})} value={registerData.email}  type="text" className="form-control" placeholder='Email Address' />
                                                {
                                                    registerData.emailErr &&  
                                                    <p className='text-error'>Please enter valid email !</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input onChange={(e)=>setRegisterData({...registerData,password : e.target.value})} value={registerData.password}  type="password" className="form-control" placeholder='Password' />
                                                {
                                                    registerData.passwordErr &&  
                                                    <p className='text-error'>This field is required!</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-lg-12">
                                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                                <input onChange={(e)=>setRegisterData({...registerData,c_password : e.target.value})} value={registerData.c_password}  type="password" className="form-control" placeholder='Confirm Password' />
                                                {
                                                    registerData.c_passwordErr &&  
                                                    <p className='text-error'>Confirm password not matched !</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="row form-group mt-3">
                                            <div className="col-lg-12">
                                                <button className='btn btn-accent btn-block'>Register</button>
                                            </div>
                                        </div>
                                        <p className='text-center mt-3' style={{ fontSize: "13px", cursor: "pointer" }} onClick={() => history.push('/login')}>Already 've an account, click to login</p>
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

export default Register