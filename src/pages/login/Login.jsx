import React, { useContext, useState } from 'react';
import { FaEyeSlash, FaGoogle} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useTitle from '../../hook/useTitle';

const Login = () => {
    const {signIn, signInGoogle} = useContext(AuthContext);
    const [show, setShow] = useState();
    const [error , setError] =useState("");
    const [success, setSuccess] =useState("");
    useTitle("Login");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

   
    const handleLogin =(event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        setError('')
        setSuccess('');

        signIn(email, password)
        .then(result => {
            const user = result.user;
            navigate(from, {replace: true});
            console.log("login page", user);
            setSuccess("User Successfully Login!!");
            form.reset();
        })
        .catch(error =>{
            setError(error.message);
        })
    }
    const handlerSignInGoogle = () => {
        signInGoogle()
        .then(()=>{})
        .catch(error => {
            setError(error.message);
        })
    }
    return (
        <div>
            <div className="  bg-base-200 my-14">
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-16'>
                    <div className='h-[500px] md:pl-36 flex justify-center items-center'>
                        <img className='h-[350px]' src="https://i.ibb.co/VSjd4JG/login-removebg-preview.png" alt="" />
                    </div>
                    <div className=' md:mr-36 shadow-2xl my-2 border mt-4'>
                        <div className="hero-content flex-col ">
                            <div className="text-center mt-4">
                                <h1 className="text-5xl font-bold">Login</h1>

                            </div>
                            <div className="card  w-full">
                                <div className="card-body">
                                    <p className='text-center text-xl text-warning'>{error}</p>
                                    <p className='text-center text-xl text-success'>{success}</p>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control ">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>

                                            <div className='form-control relative'> <input type={show ? 'text' : "password"} name='password' placeholder="password" className="input input-bordered" required /></div>
                                            <p onClick={() => setShow(!show)}>
                                                {
                                                    show ? <FaEyeSlash className='absolute top-[165px] right-16'></FaEyeSlash> : <FaEyeSlash className='absolute top-[170px] right-16'></FaEyeSlash>
                                                }
                                            </p>
                                            {/* <label className="label">
                                                <p onClick={handlerForgotPassword} className="label-text-alt link link-hover">Forgot password?</p>
                                            </label> */}
                                        </div>
                                        <div className="form-control mt-6">

                                            <input className="btn btn-primary" type="submit" value="Login" />
                                        </div>
                                    </form>
                                    <button onClick={handlerSignInGoogle} className="border-emerald-400 border-2 p-2 rounded-lg my-3 ">
                                        <small className='text-lg inline-flex items-center gap-2'><FaGoogle className='text-neutral-600'></FaGoogle>Google SignIn </small>
                                    </button>
                                    <p className='text-center'>Have an account? <Link to="/register" className='text-red-500' >Please Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;